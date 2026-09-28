from app.ai_integration.deduplication import deduplicator
from app.ai_integration.event_normalizer import EventNormalizer
from app.ai_integration.incident_service import IncidentService
from app.events.models import AIEventModel


class IntegrationService:
    @staticmethod
    def process_ai_output(db, model_source, model_output, camera_id, zone, timestamp=None, tracking_id=None):
        event = EventNormalizer.normalize(
            model_source=model_source,
            model_output=model_output,
            camera_id=camera_id,
            zone=zone,
            timestamp=timestamp,
            tracking_id=tracking_id,
        )

        if deduplicator.is_duplicate(event):
            return {"status": "deduplicated", "message": "Duplicate event ignored"}

        row = AIEventModel(
            camera_id=event.camera_id,
            zone=event.zone,
            event_type=event.event_type,
            source=event.source,
            confidence=event.confidence,
            tracking_id=event.tracking_id,
            timestamp=event.timestamp,
            metadata_=event.metadata,
        )
        db.add(row)
        db.commit()
        db.refresh(row)

        incident = IncidentService.process_event(db, row, event)
        return {
            "status": "success",
            "event_id": row.id,
            "incident_id": incident.id,
            "risk_score": incident.risk_score,
            "severity": incident.severity,
            "summary": incident.summary,
        }
