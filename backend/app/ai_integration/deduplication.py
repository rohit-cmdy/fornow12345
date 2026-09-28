from app.ai_integration.schemas.ai_event import AIEvent
from app.core.config import settings


class EventDeduplicator:
    def __init__(self):
        self.dedup_seconds = settings.EVENT_DEDUP_SECONDS
        self._last: dict[tuple, object] = {}

    def is_duplicate(self, event: AIEvent) -> bool:
        key = (event.camera_id, event.zone, event.event_type, event.tracking_id)
        last_time = self._last.get(key)
        if last_time is not None:
            if abs((event.timestamp - last_time).total_seconds()) <= self.dedup_seconds:
                return True
        self._last[key] = event.timestamp
        return False


deduplicator = EventDeduplicator()
