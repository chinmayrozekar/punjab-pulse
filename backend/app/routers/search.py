from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, or_, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.news import NewsArticle
from app.schemas import NewsItem, NewsList

router = APIRouter(prefix="/api/search", tags=["search"])


@router.get("", response_model=NewsList)
async def search(
    q: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    pattern = f"%{q}%"
    filters = or_(
        NewsArticle.title.ilike(pattern),
        NewsArticle.description.ilike(pattern),
    )

    total = (await db.execute(
        select(func.count(NewsArticle.id)).where(filters)
    )).scalar() or 0

    result = await db.execute(
        select(NewsArticle)
        .where(filters)
        .order_by(NewsArticle.published_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    )
    articles = result.scalars().all()

    return NewsList(
        items=[NewsItem.model_validate(a) for a in articles],
        total=total,
        page=page,
        page_size=page_size,
    )
