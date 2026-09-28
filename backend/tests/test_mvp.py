from datetime import datetime, timedelta, timezone

from app.ai_integration.deduplication import EventDeduplicator
from app.ai_integration.fusion_engine import fusion_engine
from app.ai_integration.risk_engine import RiskEngine
from app.ai_integration.schemas.ai_event import AIEvent
from app.core.security import get_password_hash, verify_password


def _event(event_type, source, confidence, extra_seconds=0, camera="1", zone="Lobby"):
    return AIEvent(
        camera_id=camera,
        zone=zone,
        event_type=event_type,
        source=source,
        confidence=confidence,
        timestamp=datetime(2026, 9, 23, 12, 0, 0, tzinfo=timezone.utc) + timedelta(seconds=extra_seconds),
    )


def test_password_is_hashed():
    hashed = get_password_hash("mypassword123")
    assert hashed != "mypassword123"
    assert verify_password("mypassword123", hashed) is True
    assert verify_password("wrong", hashed) is False


def test_normal_event_is_zero_risk():
    score, severity = RiskEngine.calculate_risk([_event("normal", "video", 0.99)])
    assert score == 0.0
    assert severity == "normal"


def test_weapon_plus_gunshot_is_critical():
    fused = fusion_engine.fuse_events([
        _event("weapon", "video", 0.92, camera="2", zone="Parking Area"),
        _event("fighting", "video", 0.84, 1, camera="2", zone="Parking Area"),
        _event("gunshot", "audio", 0.89, 2, camera="2", zone="Parking Area"),
    ])
    assert fused["severity"] == "critical"
    assert fused["risk_score"] >= 70


def test_dedup_blocks_same_event_within_2_seconds():
    dedup = EventDeduplicator()
    first = _event("weapon", "video", 0.91, camera="2", zone="Parking Area")
    second = _event("weapon", "video", 0.92, 0.4, camera="2", zone="Parking Area")
    third = _event("weapon", "video", 0.93, 3, camera="2", zone="Parking Area")
    assert dedup.is_duplicate(first) is False
    assert dedup.is_duplicate(second) is True
    assert dedup.is_duplicate(third) is False
