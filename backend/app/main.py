import asyncio
import logging
from contextlib import asynccontextmanager
from datetime import datetime, timedelta, timezone

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import engine, Base
from app.routers import news, events, search
from app.tasks.ingest import ingest_all

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("punjab_pulse.ingest")


async def run_ingest():
    try:
        added = await ingest_all()
        logger.info("Ingest run complete: %d new articles", added)
    except Exception:
        logger.exception("Ingest run failed")


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    scheduler = AsyncIOScheduler()
    first_run = datetime.now(timezone.utc) + timedelta(minutes=settings.ingest_interval_minutes)
    scheduler.add_job(
        run_ingest,
        "interval",
        minutes=settings.ingest_interval_minutes,
        next_run_time=first_run,
    )
    scheduler.start()
    asyncio.create_task(run_ingest())

    yield

    scheduler.shutdown(wait=False)
    await engine.dispose()


app = FastAPI(
    title="Abhijeet Tripathi's Punjab Pulse API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(news.router)
app.include_router(events.router)
app.include_router(search.router)


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.post("/api/ingest")
async def trigger_ingest(x_ingest_secret: str = Header(default="")):
    if not settings.ingest_trigger_secret or x_ingest_secret != settings.ingest_trigger_secret:
        raise HTTPException(status_code=403, detail="Invalid or missing ingest secret")
    added = await ingest_all()
    return {"added": added}
