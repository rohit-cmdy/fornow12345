from sqlalchemy.orm import Session

from app.ai_integration.fusion_engine import fusion_engine
from app.ai_integration.risk_engine import RiskEngine
from app.ai_integration.schemas.ai_event import AIEvent, to_naive
from app.alerts.models import Alert
from app.events.models import AIEventModel
from app.incidents.models import Incident


def _to_dto(row: AIEventModel) -> AIEvent:
    return AIEvent(
        camera_id=row.camera_id,
        zone=row.zone,
        event_type=row.event_type,
        source=row.source,
        confidence=row.confidence,
        timestamp=row.timestamp,
        tracking_id=row.tracking_id,
        metadata=row.metadata_ or {},
    )


class IncidentService:
    @staticmethod
    def process_event(db: Session, event_row: AIEventModel, event: AIEvent) -> Incident:
        open_incidents = (
            db.query(Incident)
            .filter(
                Incident.status == "open",
                Incident.camera_id == event.camera_id,
                Incident.zone == event.zone,
            )
            .all()
        )

        matched = None
        for incident in open_incidents:
            if fusion_engine.can_correlate(
                incident.camera_id, incident.zone, incident.start_time, incident.end_time, event
            ):
                matched = incident
                break

        if matched:
            event_row.incident_id = matched.id
            db.flush()
            linked = db.query(AIEventModel).filter(AIEventModel.incident_id == matched.id).all()
            fused = fusion_engine.fuse_events([_to_dto(e) for e in linked])
            matched.risk_score = fused["risk_score"]
            matched.severity = fused["severity"]
            matched.summary = fused["summary"]
            matched.end_time = max(to_naive(matched.end_time), to_naive(event.timestamp))
            incident = matched
        else:
            score, severity = RiskEngine.calculate_risk([event])
            event_time = to_naive(event.timestamp)
            incident = Incident(
                camera_id=event.camera_id,
                zone=event.zone,
                risk_score=score,
                severity=severity,
                status="open",
                summary=fusion_engine.generate_summary([event]),
                start_time=event_time,
                end_time=event_time,
            )
            db.add(incident)
            db.flush()
            event_row.incident_id = incident.id

        if incident.severity in ("warning", "critical"):
            existing = db.query(Alert).filter(Alert.incident_id == incident.id).first()
            if existing:
                existing.severity = incident.severity
                existing.message = incident.summary
            else:
                db.add(
                    Alert(
                        incident_id=incident.id,
                        alert_type=event.event_type,
                        severity=incident.severity,
                        message=incident.summary,
                    )
                )

        db.commit()
        db.refresh(incident)
        return incident
