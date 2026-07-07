"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface EventItem {
  id: number;
  title: string;
  description: string | null;
  location: string;
  district: string | null;
  event_date: string;
  category: string;
  submitted_by: string | null;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/events`)
      .then((res) => res.json())
      .then(setEvents)
      .catch(console.error);
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-14">
        <h1 className="text-[2.75rem] font-semibold leading-[1.05] tracking-tightest">
          Events
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Local events, fairs, and gatherings across Punjab
        </p>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="-mx-4 rounded-2xl px-4 py-5 transition-colors duration-200 hover:bg-muted/60">
            <div className="mb-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] text-muted-foreground/80">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{formatDate(event.event_date)}</span>
              <span className="text-muted-foreground/40">·</span>
              <MapPin className="h-3.5 w-3.5" />
              <span>{event.location}</span>
              {event.district && (
                <>
                  <span className="text-muted-foreground/40">·</span>
                  <span>{event.district}</span>
                </>
              )}
            </div>
            <h3 className="text-[17px] font-semibold tracking-tight">{event.title}</h3>
            {event.description && (
              <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                {event.description}
              </p>
            )}
          </div>
        ))}

        {events.length === 0 && (
          <p className="py-16 text-center text-[14px] text-muted-foreground">
            No events listed yet. Check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
