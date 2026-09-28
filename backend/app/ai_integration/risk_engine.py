from typing import List, Tuple

from app.ai_integration.schemas.ai_event import AIEvent
from app.core.config import settings


WEIGHTS = {
    "gunshot": 55.0,
    "weapon": 50.0,
    "fighting": 40.0,
    "alarm": 35.0,
    "glass_breaking": 30.0,
    "scream": 30.0,
    "aggressive_shouting": 25.0,
    "falling": 25.0,
    "running": 20.0,
    "normal": 0.0,
}


class RiskEngine:
    @staticmethod
    def calculate_risk(events: List[AIEvent]) -> Tuple[float, str]:
        threats = [e for e in events if e.event_type != "normal"]
        if not threats:
            return 0.0, "normal"

        base = max(WEIGHTS.get(e.event_type, 20.0) * e.confidence for e in threats)
        types = {e.event_type for e in threats}
        sources = {e.source for e in threats}

        extra = 0.0
        if {"video", "audio"}.issubset(sources):
            extra += 20.0
        if "weapon" in types and "gunshot" in types:
            extra += 15.0
        if "weapon" in types and "fighting" in types:
            extra += 10.0

        score = min(100.0, round(base + extra, 1))
        if score >= settings.RISK_THRESHOLD_CRITICAL:
            return score, "critical"
        if score >= settings.RISK_THRESHOLD_WARNING:
            return score, "warning"
        return score, "normal"
