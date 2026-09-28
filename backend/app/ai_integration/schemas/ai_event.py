from datetime import datetime, timezone
from typing import Any, Dict, Optional

from pydantic import BaseModel, ConfigDict, Field


def to_naive(dt: datetime) -> datetime:
    if dt.tzinfo is not None:
        return dt.astimezone(timezone.utc).replace(tzinfo=None)
    return dt


class AIEvent(BaseModel):
    camera_id: str
    zone: str
    event_type: str
    source: str
    confidence: float = Field(ge=0.0, le=1.0)
    timestamp: datetime
    tracking_id: Optional[str] = None
    metadata: dict[str, Any] = Field(default_factory=dict)

    model_config = ConfigDict(from_attributes=True)


def make_ai_event(
    camera_id: str,
    zone: str,
    event_type: str,
    source: str,
    confidence: float,
    timestamp: Optional[datetime] = None,
    tracking_id: Optional[str] = None,
    metadata: Optional[Dict[str, Any]] = None,
) -> AIEvent:
    if timestamp is None:
        timestamp = datetime.now(timezone.utc)
    elif isinstance(timestamp, str):
        timestamp = datetime.fromisoformat(timestamp.replace("Z", "+00:00"))
    timestamp = to_naive(timestamp)

    return AIEvent(
        camera_id=str(camera_id),
        zone=zone,
        event_type=str(event_type).lower().strip(),
        source=source,
        confidence=float(confidence),
        timestamp=timestamp,
        tracking_id=tracking_id,
        metadata=metadata or {},
    )
