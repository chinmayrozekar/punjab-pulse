import { ExternalLink } from "lucide-react";

const SOURCES = [
  {
    name: "Rozana Spokesman",
    type: "Newspaper",
    url: "https://www.rozanaspokesman.com",
    description: "Prominent Punjabi newspaper",
  },
  {
    name: "Indian Express",
    type: "Newspaper · Chandigarh",
    url: "https://indianexpress.com/section/cities/chandigarh/",
    description: "National English daily, Chandigarh desk",
  },
  {
    name: "Hindustan Times",
    type: "Newspaper · Chandigarh",
    url: "https://www.hindustantimes.com/cities/chandigarh-news",
    description: "National English daily, Chandigarh desk",
  },
  {
    name: "Amar Ujala",
    type: "Newspaper · Hindi",
    url: "https://www.amarujala.com/punjab",
    description: "Leading Hindi-language daily, Punjab edition",
  },
  {
    name: "ABP Sanjha",
    type: "Broadcast",
    url: "https://news.abplive.com/topic/punjab",
    description: "Punjab-focused news channel and portal",
  },
];

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-14 text-[2.75rem] font-semibold leading-[1.05] tracking-tightest">
        Sources
      </h1>

      <div className="grid gap-3 sm:grid-cols-2">
        {SOURCES.map((source) => (
          <a
            key={source.name}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl p-5 shadow-subtle transition-all duration-200 ease-zen hover:shadow-elevated"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-semibold tracking-tight group-hover:text-punjab-600 dark:group-hover:text-punjab-400">
                {source.name}
              </h3>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/60" />
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              {source.description}
            </p>
            <span className="mt-3 inline-block text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
              {source.type}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
