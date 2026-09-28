from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel, ConfigDict, Field


class EventResponse(BaseModel):
    id: int
    incident_id: Optional[int] = None
    camera_id: str
    zone: str
    event_type: str
    source: str
    confidence: float
    tracking_id: Optional[str] = None
    timestamp: datetime
    metadata: dict[str, Any] = Field(default_factory=dict)
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

    @classmethod
    def from_row(cls, row) -> "EventResponse":
        return cls(
            id=row.id,
            incident_id=row.incident_id,
            camera_id=row.camera_id,
            zone=row.zone,
            event_type=row.event_type,
            source=row.source,
            confidence=row.confidence,
            tracking_id=row.tracking_id,
            timestamp=row.timestamp,
            metadata=row.metadata_ or {},
            created_at=row.created_at,
        )


class EventIngestRequest(BaseModel):
    model_source: str
    model_output: dict[str, Any]
    camera_id: str
    zone: str
    timestamp: Optional[datetime] = None
    tracking_id: Optional[str] = None
