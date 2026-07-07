**Here is a highly effective, detailed prompt you can copy-paste directly into Claude (Claude 3.5 Sonnet or Opus recommended):**

---

**You are an expert full-stack Python + Next.js developer. Build a complete, production-ready starter for a Punjab-specific real-time news and events web application.**

### Project Requirements
**App Name**: Punjab Pulse (or suggest a good name)

**Core Goal**: A clean, fast webapp that aggregates real-time news, trends, and events focused on Punjab (India) from major sources + unconventional sources (X/Twitter trends, public Telegram channels, community forwards).

### Key Constraints
- **Zero unnecessary costs** — Use only free/open-source tools and generous free tiers.
- **Self-host friendly** — Provide full Docker Compose setup.
- **GitHub-first** — Structure the repo so it can be easily deployed from GitHub.
- **Multilingual** — Support English + Hindi + Punjabi (Gurmukhi) content. 

### Tech Stack (Strictly Follow)
- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Python + FastAPI
- **Database**: PostgreSQL (with Supabase/Neon in mind)
- **Cache/Queue**: Redis + RQ or Celery
- **Search**: Meilisearch
- **Realtime**: Server-Sent Events (SSE)
- **Deployment**: Docker Compose + GitHub Actions + Cloudflare Pages (frontend) + Railway/Fly.io (backend)

### Main Features to Implement
1. **Live News Feed** with infinite scroll, filters (District, Category: Politics, Agriculture, Crime, Sports, Events, Religion, etc.), language toggle.
2. **Real-time updates** for breaking news.
3. **Search** with Meilisearch (full-text + semantic).
4. **Trending Section** (pulled from X).
5. **Events Calendar** (local + user-submitted).
6. **Sources Page** showing major newspapers + Telegram channels.
7. **Community Submissions** (for WhatsApp forwards, local events).
8. **Dark mode + Mobile-first** responsive design.

### Data Sources (Implement Fetchers)
- RSS feeds from major Punjab news sites (Ajit, Tribune, Rozana Spokesman, etc.)
- Free news APIs (NewsData.io, Currents, GNews) with Punjab keywords
- X/Twitter trends and keyword search (use Tweepy or requests)
- Public Telegram channels via Telethon (provide example for 2-3 channels)
- User-submitted content

### Project Structure
Create a monorepo with:
- `/frontend` (Next.js)
- `/backend` (FastAPI)
- Root `docker-compose.yml`
- Clear README with setup instructions

### Deliverables I Expect
1. Complete folder structure with all important files.
2. `docker-compose.yml` ready for local development.
3. Full backend code (models, routers, fetchers, tasks).
4. Key frontend pages + components (feed, search, layout).
5. Environment variables template (.env.example).
6. Setup & deployment instructions (GitHub → Cloudflare + Railway).
7. Ethical notes for scraping (delays, User-Agents, public data only).

**Start by outputting the complete project structure and docker-compose.yml, then proceed file by file. Make it clean, well-commented, and production-ready. Use best practices for security and performance.**

---

**How to use this prompt:**
- Paste it into Claude.
- After it generates the first part (structure + docker), reply with: **"Continue with the backend models and main.py"** or **"Now generate the frontend feed page"**.
- You can iterate step-by-step.

Would you like me to improve this prompt further (make it shorter, add specific features, or split it into multiple prompts)?