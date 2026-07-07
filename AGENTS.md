# Abhijeet Tripathi's Punjab Pulse — Agent/Developer Handoff Document

## Project Overview
A news and events aggregator focused on Punjab (India). Aggregates from major news sites and free news APIs, plus community-submitted events.

## Tech Stack
- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Python + FastAPI
- **Database**: PostgreSQL (Supabase/Neon-ready)

No Docker, Redis, queue, or search-engine service — deliberately simplified to plain Postgres + a Python process + a Node process, run directly.

## Key Constraints
- Zero-cost / free-tier only
- Multilingual: English + Hindi + Punjabi (Gurmukhi)
- Ethical scraping (descriptive User-Agent, public data only)

## Features Built
1. Live News Feed — infinite scroll, filters (District, Category)
2. Search — Postgres `ILIKE` search over title/description
3. Events calendar (local + user-submitted)
4. Sources page (newspapers)
5. Community submissions (local events)
6. Dark mode + mobile-first responsive

## Data Sources
- RSS feeds: Ajit, Tribune, Rozana Spokesman, etc. (`backend/app/fetchers/rss.py`)
- GNews API, keyed on Punjab keywords (`backend/app/fetchers/newsapi.py`)

## Project Structure
```
/
├── frontend/          # Next.js 15
├── backend/           # FastAPI
├── .env.example
└── README.md
```

## Current State
- Backend and frontend are scaffolded and functional.
- `ingest_all()` (`backend/app/tasks/ingest.py`) pulls RSS + GNews and writes new articles to Postgres, but nothing calls it on a schedule yet — run it manually or wire up a cron/scheduled job when ready.
