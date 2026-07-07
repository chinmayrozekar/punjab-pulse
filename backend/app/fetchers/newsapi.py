import asyncio
import httpx
from datetime import datetime, timezone

from app.classify import classify
from app.config import settings
from app.models.news import NewsArticle

PUNJAB_KEYWORDS = [
    "Punjab", "Chandigarh", "Amritsar", "Ludhiana", "Jalandhar",
    "Patiala", "Bathinda", "Mohali", "Punjab politics", "Punjab news",
]


async def _fetch_keyword(client: httpx.AsyncClient, keyword: str) -> list[NewsArticle]:
    articles = []
    try:
        resp = await client.get(
            "https://gnews.io/api/v4/search",
            params={
                "q": keyword,
                "lang": "en",
                "country": "in",
                "max": 5,
                "apikey": settings.gnews_key,
            },
        )
        resp.raise_for_status()
        data = resp.json()
        for item in data.get("articles", []):
            published = datetime.now(timezone.utc)
            if item.get("publishedAt"):
                published = datetime.fromisoformat(
                    item["publishedAt"].replace("Z", "+00:00")
                )
            title = item.get("title", "")[:500]
            description = (item.get("description") or "")[:1000] or None
            category, district, language = classify(title, description)
            articles.append(NewsArticle(
                title=title,
                description=description,
                source=item.get("source", {}).get("name", "GNews"),
                source_url=item.get("url", ""),
                image_url=item.get("image", None),
                category=category,
                district=district,
                language=language,
                published_at=published,
            ))
    except Exception:
        pass
    return articles


async def fetch_from_gnews() -> list[NewsArticle]:
    if not settings.gnews_key:
        return []

    async with httpx.AsyncClient(timeout=15) as client:
        results = await asyncio.gather(
            *(_fetch_keyword(client, keyword) for keyword in PUNJAB_KEYWORDS[:3])
        )
    return [article for articles in results for article in articles]
