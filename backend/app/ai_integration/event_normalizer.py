from app.ai_integration.adapters.action_adapter import ActionAdapter
from app.ai_integration.adapters.audio_adapter import AudioAdapter
from app.ai_integration.adapters.weapon_adapter import WeaponAdapter
from app.ai_integration.schemas.ai_event import AIEvent


class EventNormalizer:
    @staticmethod
    def normalize(model_source: str, model_output: dict, camera_id: str, zone: str, timestamp=None, tracking_id=None) -> AIEvent:
        source = model_source.lower().strip()
        kwargs = {
            "raw": model_output,
            "camera_id": camera_id,
            "zone": zone,
            "timestamp": timestamp,
            "tracking_id": tracking_id,
        }
        if source in ("weapon", "yolo", "object"):
            return WeaponAdapter.to_ai_event(**kwargs)
        if source in ("action", "lstm"):
            return ActionAdapter.to_ai_event(**kwargs)
        if source in ("audio", "crnn"):
            return AudioAdapter.to_ai_event(**kwargs)
        raise ValueError(f"Unknown model_source: {model_source}. Use weapon, action, or audio.")
