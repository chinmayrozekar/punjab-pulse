from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, func, desc
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.news import NewsArticle
from app.schemas import NewsItem, NewsList

router = APIRouter(prefix="/api/news", tags=["news"])


@router.get("", response_model=NewsList)
async def get_news(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    category: str | None = None,
    district: str | None = None,
    language: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    query = select(NewsArticle)
    count_query = select(func.count(NewsArticle.id))

    if category:
        query = query.where(NewsArticle.category == category)
        count_query = count_query.where(NewsArticle.category == category)
    if district:
        query = query.where(NewsArticle.district == district)
        count_query = count_query.where(NewsArticle.district == district)
    if language:
        query = query.where(NewsArticle.language == language)
        count_query = count_query.where(NewsArticle.language == language)

    total_result = await db.execute(count_query)
    total = total_result.scalar() or 0

    query = query.order_by(desc(NewsArticle.published_at))
    query = query.offset((page - 1) * page_size).limit(page_size)

    result = await db.execute(query)
    articles = result.scalars().all()

    return NewsList(
        items=[NewsItem.model_validate(a) for a in articles],
        total=total,
        page=page,
        page_size=page_size,
    )
