from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload

from app.auth.models import User
from app.core.database import get_db
from app.core.security import get_current_user
from app.events.schemas import EventResponse
from app.incidents.models import Incident
from app.incidents.schemas import IncidentResponse, IncidentUpdate

router = APIRouter(prefix="/incidents", tags=["Incidents"])


def _to_response(incident: Incident) -> IncidentResponse:
    return IncidentResponse(
        id=incident.id,
        camera_id=incident.camera_id,
        zone=incident.zone,
        risk_score=incident.risk_score,
        severity=incident.severity,
        status=incident.status,
        summary=incident.summary,
        start_time=incident.start_time,
        end_time=incident.end_time,
        created_at=incident.created_at,
        events=[EventResponse.from_row(e) for e in incident.events],
    )


@router.get("", response_model=list[IncidentResponse])
def list_incidents(
    status: str | None = Query(None),
    severity: str | None = None,
    camera_id: str | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(Incident).options(joinedload(Incident.events))
    if status:
        query = query.filter(Incident.status == status)
    if severity:
        query = query.filter(Incident.severity == severity)
    if camera_id:
        query = query.filter(Incident.camera_id == camera_id)
    return [_to_response(i) for i in query.order_by(Incident.created_at.desc()).all()]


@router.get("/{incident_id}", response_model=IncidentResponse)
def get_incident(incident_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    incident = (
        db.query(Incident)
        .options(joinedload(Incident.events))
        .filter(Incident.id == incident_id)
        .first()
    )
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    return _to_response(incident)


@router.patch("/{incident_id}", response_model=IncidentResponse)
def update_incident(
    incident_id: int,
    payload: IncidentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    incident.status = payload.status
    db.commit()
    db.refresh(incident)
    return _to_response(incident)
