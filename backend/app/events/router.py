from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.ai_integration.integration_service import IntegrationService
from app.auth.models import User
from app.core.database import get_db
from app.core.security import get_current_user
from app.events.models import AIEventModel
from app.events.schemas import EventIngestRequest, EventResponse

router = APIRouter(prefix="/events", tags=["Events"])


@router.post("/ingest")
def ingest_event(payload: EventIngestRequest, db: Session = Depends(get_db)):
    return IntegrationService.process_ai_output(
        db=db,
        model_source=payload.model_source,
        model_output=payload.model_output,
        camera_id=payload.camera_id,
        zone=payload.zone,
        timestamp=payload.timestamp,
        tracking_id=payload.tracking_id,
    )


@router.get("", response_model=list[EventResponse])
def list_events(
    camera_id: str | None = None,
    event_type: str | None = None,
    limit: int = Query(50, le=200),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(AIEventModel)
    if camera_id:
        query = query.filter(AIEventModel.camera_id == camera_id)
    if event_type:
        query = query.filter(AIEventModel.event_type == event_type.lower())
    rows = query.order_by(AIEventModel.timestamp.desc()).limit(limit).all()
    return [EventResponse.from_row(r) for r in rows]


@router.get("/{event_id}", response_model=EventResponse)
def get_event(event_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    row = db.query(AIEventModel).filter(AIEventModel.id == event_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Event not found")
    return EventResponse.from_row(row)
