# Abhijeet Tripathi's Punjab Pulse

News and events aggregator focused on Punjab, India. Aggregates from major news sites and free news APIs, with a community submissions page for local events.

## Tech Stack

| Layer     | Technology                                    |
| --------- | --------------------------------------------- |
| Frontend  | Next.js 15 + TypeScript + Tailwind CSS        |
| Backend   | Python + FastAPI                              |
| Database  | PostgreSQL 16                                 |

## Quick Start

Requires Python 3.12+, Node 20+, and a running PostgreSQL instance.

```bash
# 1. Clone and enter
git clone <repo-url> punjab-pulse
cd punjab-pulse

# 2. Copy environment file
cp .env.example .env
# Edit .env to set DATABASE_URL and API keys

# 3. Backend
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# 4. Frontend (in a separate terminal)
cd frontend
npm install
npm run dev

# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

## Project Structure

```
├── frontend/              # Next.js 15 app
│   └── src/
│       ├── app/           # Pages (feed, search, events, sources, submit)
│       ├── components/    # Shared components (navbar, news-card)
│       └── lib/           # API client, utilities
├── backend/               # FastAPI app
│   └── app/
│       ├── models/        # SQLAlchemy models
│       ├── routers/       # API routes (news, events, search)
│       ├── fetchers/      # RSS & news API fetchers
│       ├── schemas/       # Pydantic schemas
│       └── tasks/         # Ingestion (run manually or via a scheduled job)
└── .env.example           # Environment template
```

## API Endpoints

| Method | Path             | Description          |
| ------ | ---------------- | -------------------- |
| GET    | /api/health      | Health check          |
| GET    | /api/news        | Paginated news feed  |
| GET    | /api/search?q=   | Search news articles |
| GET    | /api/events      | Events calendar      |
| POST   | /api/events      | Submit new event     |

## Ethical Scraping

- Identifies with a descriptive User-Agent
- Public sources only

## License

MIT
