from datetime import datetime
from typing import List

from app.ai_integration.risk_engine import RiskEngine
from app.ai_integration.schemas.ai_event import AIEvent, to_naive
from app.core.config import settings


class FusionEngine:
    def __init__(self):
        self.window = settings.FUSION_TIME_WINDOW_SECONDS

    def can_correlate(self, camera_id: str, zone: str, start: datetime, end: datetime, event: AIEvent) -> bool:
        if str(camera_id) != str(event.camera_id):
            return False
        if zone.lower() != event.zone.lower():
            return False
        event_time = to_naive(event.timestamp)
        start = to_naive(start)
        end = to_naive(end)
        if event_time < start:
            return (start - event_time).total_seconds() <= self.window
        if event_time > end:
            return (event_time - end).total_seconds() <= self.window
        return True

    def generate_summary(self, events: List[AIEvent]) -> str:
        types = sorted({e.event_type for e in events if e.event_type != "normal"})
        if not types:
            return "Routine activity"
        zone = events[0].zone
        if "weapon" in types and "gunshot" in types:
            return f"Weapon and gunshot detected in {zone}"
        if "weapon" in types:
            return f"Weapon detected in {zone}"
        if "gunshot" in types:
            return f"Gunshot detected in {zone}"
        if "fighting" in types:
            return f"Fighting detected in {zone}"
        return f"{', '.join(types)} detected in {zone}"

    def fuse_events(self, events: List[AIEvent]) -> dict:
        events = sorted(events, key=lambda e: e.timestamp)
        score, severity = RiskEngine.calculate_risk(events)
        return {
            "camera_id": events[0].camera_id,
            "zone": events[0].zone,
            "risk_score": score,
            "severity": severity,
            "summary": self.generate_summary(events),
            "start_time": events[0].timestamp,
            "end_time": events[-1].timestamp,
        }


fusion_engine = FusionEngine()
