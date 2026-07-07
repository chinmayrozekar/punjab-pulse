from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class NewsItem(BaseModel):
    id: Optional[int] = None
    title: str
    description: Optional[str] = None
    content: Optional[str] = None
    source: str
    source_url: str
    image_url: Optional[str] = None
    category: str
    district: Optional[str] = None
    language: str = "en"
    published_at: datetime
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class NewsList(BaseModel):
    items: list[NewsItem]
    total: int
    page: int
    page_size: int


class EventItem(BaseModel):
    id: Optional[int] = None
    title: str
    description: Optional[str] = None
    location: str
    district: Optional[str] = None
    event_date: datetime
    category: str = "Events"
    submitted_by: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}
