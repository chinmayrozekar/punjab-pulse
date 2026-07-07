"use client";

import { useEffect, useState, useCallback } from "react";
import { getNews, type NewsItem } from "@/lib/api";
import { NewsCard } from "@/components/news-card";

const CATEGORIES = [
  "All", "Politics", "Agriculture", "Crime", "Sports", "Events", "Religion",
];

export default function FeedPage() {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getNews({
        page,
        page_size: 20,
        category: category === "All" ? undefined : category,
      });
      if (page === 1) {
        setArticles(data.items);
      } else {
        setArticles((prev) => [...prev, ...data.items]);
      }
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, category]);

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const hasMore = articles.length < total;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-14">
        <h1 className="text-[2.75rem] font-semibold leading-[1.05] tracking-tightest">
          Live News Feed
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Real-time updates from across Punjab
        </p>
      </div>

      <div className="mb-12 flex flex-wrap gap-x-7 gap-y-3 border-b border-border pb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`relative pb-3 text-[13px] font-medium tracking-wide transition-colors duration-200 ${
              category === cat
                ? "text-foreground"
                : "text-muted-foreground/70 hover:text-foreground"
            }`}
          >
            {cat}
            {category === cat && (
              <span className="absolute inset-x-0 -bottom-[17px] h-px bg-foreground" />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {!loading && articles.length === 0 && (
        <p className="py-16 text-center text-[14px] text-muted-foreground">
          No articles yet in this category.
        </p>
      )}

      {hasMore && (
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={loading}
            className="rounded-full border border-border px-7 py-2.5 text-[13px] font-medium tracking-wide transition-colors duration-200 hover:bg-muted disabled:opacity-40"
          >
            {loading ? "Loading…" : "Show more"}
          </button>
        </div>
      )}
    </div>
  );
}
