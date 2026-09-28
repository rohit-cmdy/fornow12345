from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, JSON, String, func
from sqlalchemy.orm import relationship

from app.core.database import Base


class AIEventModel(Base):
    __tablename__ = "ai_events"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id", ondelete="SET NULL"), nullable=True, index=True)
    camera_id = Column(String(64), index=True, nullable=False)
    zone = Column(String(128), index=True, nullable=False)
    event_type = Column(String(64), index=True, nullable=False)
    source = Column(String(32), nullable=False)
    confidence = Column(Float, nullable=False)
    tracking_id = Column(String(64), nullable=True)
    timestamp = Column(DateTime, nullable=False, index=True)
    metadata_ = Column("metadata", JSON, nullable=True)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)

    incident = relationship("Incident", back_populates="events")
