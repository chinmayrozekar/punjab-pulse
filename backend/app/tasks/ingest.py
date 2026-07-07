from app.fetchers.rss import fetch_all_rss
from app.fetchers.newsapi import fetch_from_gnews
from app.database import async_session
from app.models.news import NewsArticle
from sqlalchemy import select


async def ingest_all():
    articles = []
    articles.extend(await fetch_all_rss())
    articles.extend(await fetch_from_gnews())

    if not articles:
        return 0

    async with async_session() as db:
        existing_result = await db.execute(
            select(NewsArticle.source_url).where(
                NewsArticle.source_url.in_({a.source_url for a in articles})
            )
        )
        existing_urls = set(existing_result.scalars().all())

        new_articles = [a for a in articles if a.source_url not in existing_urls]
        if not new_articles:
            return 0

        db.add_all(new_articles)
        await db.commit()

    return len(new_articles)
