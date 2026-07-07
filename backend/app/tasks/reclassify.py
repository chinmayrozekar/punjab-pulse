from sqlalchemy import select

from app.classify import classify
from app.database import async_session
from app.models.news import NewsArticle


async def reclassify_all() -> int:
    updated = 0
    async with async_session() as db:
        result = await db.execute(select(NewsArticle))
        for article in result.scalars().all():
            category, district, language = classify(article.title, article.description)
            if (category, district, language) != (article.category, article.district, article.language):
                article.category = category
                article.district = district
                article.language = language
                updated += 1
        await db.commit()
    return updated
