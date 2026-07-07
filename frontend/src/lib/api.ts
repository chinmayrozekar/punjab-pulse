const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface NewsItem {
  id: number;
  title: string;
  description: string | null;
  content: string | null;
  source: string;
  source_url: string;
  image_url: string | null;
  category: string;
  district: string | null;
  language: string;
  published_at: string;
  created_at: string | null;
}

export interface NewsListResponse {
  items: NewsItem[];
  total: number;
  page: number;
  page_size: number;
}

export async function getNews(params: {
  page?: number;
  page_size?: number;
  category?: string;
  district?: string;
  language?: string;
}): Promise<NewsListResponse> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", String(params.page));
  if (params.page_size) searchParams.set("page_size", String(params.page_size));
  if (params.category) searchParams.set("category", params.category);
  if (params.district) searchParams.set("district", params.district);
  if (params.language) searchParams.set("language", params.language);

  const res = await fetch(`${API_URL}/api/news?${searchParams}`);
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export async function searchNews(q: string, page = 1): Promise<NewsListResponse> {
  const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(q)}&page=${page}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}
