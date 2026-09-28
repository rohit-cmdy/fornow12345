from sqlalchemy import Column, DateTime, Float, Integer, String, Text, func
from sqlalchemy.orm import relationship

from app.core.database import Base


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    camera_id = Column(String(64), index=True, nullable=False)
    zone = Column(String(128), index=True, nullable=False)
    risk_score = Column(Float, nullable=False)
    severity = Column(String(32), index=True, nullable=False)
    status = Column(String(32), default="open", index=True, nullable=False)
    summary = Column(Text, nullable=False)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)

    events = relationship("AIEventModel", back_populates="incident")
    alerts = relationship("Alert", back_populates="incident")
