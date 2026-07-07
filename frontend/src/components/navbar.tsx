"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Feed" },
  { href: "/search", label: "Search" },
  { href: "/events", label: "Events" },
  { href: "/sources", label: "Sources" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="sticky top-0 z-50 border-b border-[hsl(var(--border))]/70 bg-[hsl(var(--background))]/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-baseline gap-1.5 text-[15px] tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          <span className="font-light text-muted-foreground">Abhijeet Tripathi&apos;s</span>
          <span className="font-semibold">Punjab Pulse</span>
        </Link>

        <div className="flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[13px] font-medium tracking-wide text-muted-foreground/80 transition-colors duration-200 hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 text-muted-foreground/80 transition-colors duration-200 hover:text-foreground"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="h-[15px] w-[15px]" /> : <Moon className="h-[15px] w-[15px]" />}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
