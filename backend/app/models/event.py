from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(500), nullable=False)
    description = Column(Text, nullable=True)
    location = Column(String(300), nullable=False)
    district = Column(String(100), nullable=True)
    event_date = Column(DateTime(timezone=True), nullable=False)
    category = Column(String(50), nullable=False, default="Events")
    submitted_by = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
