from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.event import Event
from app.schemas import EventItem

router = APIRouter(prefix="/api/events", tags=["events"])


@router.get("")
async def get_events(
    district: str | None = None,
    month: int | None = None,
    year: int | None = None,
    db: AsyncSession = Depends(get_db),
):
    query = select(Event)

    if district:
        query = query.where(Event.district == district)

    result = await db.execute(query.order_by(Event.event_date))
    events = result.scalars().all()

    return [EventItem.model_validate(e) for e in events]


@router.post("", status_code=201)
async def create_event(event: EventItem, db: AsyncSession = Depends(get_db)):
    db_event = Event(**event.model_dump(exclude={"id", "created_at"}))
    db.add(db_event)
    await db.commit()
    await db.refresh(db_event)
    return EventItem.model_validate(db_event)
