from sqlalchemy import Column, Integer, String, Text, DateTime, Index
from sqlalchemy.sql import func

from app.database import Base


class NewsArticle(Base):
    __tablename__ = "news_articles"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(500), nullable=False)
    description = Column(Text, nullable=True)
    content = Column(Text, nullable=True)
    source = Column(String(100), nullable=False)
    source_url = Column(String(1000), nullable=False, unique=True)
    image_url = Column(String(1000), nullable=True)
    category = Column(String(50), nullable=False, default="General")
    district = Column(String(100), nullable=True)
    language = Column(String(10), nullable=False, default="en")
    published_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        Index("ix_news_published_at", published_at.desc()),
        Index("ix_news_category", category),
        Index("ix_news_district", district),
        Index("ix_news_language", language),
    )
