import type { NewsItem } from "@/lib/api";
import { formatDate } from "@/lib/utils";

interface NewsCardProps {
  article: NewsItem;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="group -mx-4 rounded-2xl px-4 py-5 transition-colors duration-200 ease-zen hover:bg-muted/60">
      <div className="flex items-start gap-5">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] text-muted-foreground/80">
            <span className="font-semibold uppercase tracking-wide text-punjab-600 dark:text-punjab-400">
              {article.category}
            </span>
            {article.district && (
              <>
                <span className="text-muted-foreground/40">·</span>
                <span>{article.district}</span>
              </>
            )}
            <span className="text-muted-foreground/40">·</span>
            <span>{article.source}</span>
            <span className="text-muted-foreground/40">·</span>
            <span>{formatDate(article.published_at)}</span>
          </div>
          <a
            href={article.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[17px] font-semibold leading-snug tracking-tight transition-colors duration-200 group-hover:text-punjab-600 dark:group-hover:text-punjab-400"
          >
            {article.title}
          </a>
          {article.description && (
            <p className="mt-1.5 line-clamp-2 text-[14px] leading-relaxed text-muted-foreground">
              {article.description}
            </p>
          )}
        </div>
        {article.image_url && (
          <img
            src={article.image_url}
            alt=""
            className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
          />
        )}
      </div>
    </article>
  );
}
