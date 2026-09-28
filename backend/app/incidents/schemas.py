from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict

from app.events.schemas import EventResponse


class IncidentResponse(BaseModel):
    id: int
    camera_id: str
    zone: str
    risk_score: float
    severity: str
    status: str
    summary: str
    start_time: datetime
    end_time: datetime
    created_at: datetime
    events: list[EventResponse] = []

    model_config = ConfigDict(from_attributes=True)


class IncidentUpdate(BaseModel):
    status: Literal["open", "acknowledged", "resolved"]
