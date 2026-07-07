import asyncio
import feedparser
import httpx
from datetime import datetime, timezone

from app.classify import classify
from app.models.news import NewsArticle

RSS_FEEDS = {
    "Rozana Spokesman": "https://www.rozanaspokesman.com/rss_feed/",
    "Indian Express (Chandigarh)": "https://indianexpress.com/section/cities/chandigarh/feed/",
    "Hindustan Times (Chandigarh)": "https://www.hindustantimes.com/feeds/rss/cities/chandigarh-news/rssfeed.xml",
    "Amar Ujala (Punjab)": "https://www.amarujala.com/rss/punjab.xml",
    "ABP Sanjha (Punjab)": "https://news.abplive.com/topic/punjab/feed",
}

HEADERS = {
    "User-Agent": "PunjabPulse/1.0 (news aggregator; contact@example.com)"
}

# ABP Sanjha's Punjab feed interleaves recurring lottery-result posts with real news.
SPAM_TITLE_PATTERNS = ("lottery sambad",)


def is_spam(title: str) -> bool:
    lowered = title.lower()
    return any(pattern in lowered for pattern in SPAM_TITLE_PATTERNS)


def parse_rss_entry(entry: dict, source: str) -> NewsArticle | None:
    try:
        published = datetime.now(timezone.utc)
        if "published_parsed" in entry and entry.published_parsed:
            published = datetime(*entry.published_parsed[:6], tzinfo=timezone.utc)

        title = entry.get("title", "")[:500]
        if is_spam(title):
            return None
        description = entry.get("summary", "")[:1000] or None
        category, district, language = classify(title, description)

        return NewsArticle(
            title=title,
            description=description,
            source=source,
            source_url=entry.get("link", ""),
            image_url=None,
            category=category,
            district=district,
            language=language,
            published_at=published,
        )
    except Exception:
        return None


async def fetch_rss_feed(source: str, url: str) -> list[NewsArticle]:
    articles = []
    try:
        async with httpx.AsyncClient(headers=HEADERS, timeout=30) as client:
            resp = await client.get(url)
            resp.raise_for_status()
            feed = feedparser.parse(resp.text)
            for entry in feed.entries[:20]:
                article = parse_rss_entry(entry, source)
                if article:
                    articles.append(article)
    except Exception:
        pass
    return articles


async def fetch_all_rss() -> list[NewsArticle]:
    results = await asyncio.gather(
        *(fetch_rss_feed(source, url) for source, url in RSS_FEEDS.items())
    )
    return [article for articles in results for article in articles]
