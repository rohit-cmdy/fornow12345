from app.ai_integration.schemas.ai_event import AIEvent, make_ai_event


class AudioAdapter:
    @staticmethod
    def to_ai_event(raw: dict, camera_id: str, zone: str, timestamp=None, tracking_id=None) -> AIEvent:
        extra = {k: v for k, v in raw.items() if k not in ("event_type", "confidence")}
        return make_ai_event(
            camera_id=camera_id,
            zone=zone,
            event_type=raw["event_type"],
            source="audio",
            confidence=raw["confidence"],
            timestamp=timestamp,
            tracking_id=tracking_id,
            metadata=extra,
        )
