"use client";

import { useState } from "react";
import { searchNews, type NewsListResponse } from "@/lib/api";
import { NewsCard } from "@/components/news-card";
import { Search, Loader2 } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NewsListResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await searchNews(query);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-10 text-[2.75rem] font-semibold leading-[1.05] tracking-tightest">
        Search
      </h1>

      <form onSubmit={handleSearch} className="mb-12 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Punjab news…"
            className="w-full rounded-full bg-muted py-3 pl-11 pr-4 text-[14px] outline-none ring-1 ring-transparent transition-shadow duration-200 focus:ring-punjab-500/40"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-foreground px-6 text-[13px] font-medium text-background transition-opacity duration-200 hover:opacity-85 disabled:opacity-40"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </button>
      </form>

      {results && (
        <div>
          <p className="mb-4 text-[13px] text-muted-foreground">
            {results.total} results found
          </p>
          <div className="space-y-3">
            {results.items.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
