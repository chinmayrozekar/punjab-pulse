"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function SubmitPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    event_date: "",
  });
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          category: "Community",
          event_date: new Date(form.event_date).toISOString(),
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-[2rem] font-semibold tracking-tightest text-punjab-600 dark:text-punjab-400">
          Thank you
        </h1>
        <p className="mt-2 text-[15px] text-muted-foreground">
          Your event has been submitted for review.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl bg-muted px-4 py-2.5 text-[14px] outline-none ring-1 ring-transparent transition-shadow duration-200 focus:ring-punjab-500/40";

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-3 text-[2.75rem] font-semibold leading-[1.05] tracking-tightest">
        Submit an event
      </h1>
      <p className="mb-12 text-[15px] leading-relaxed text-muted-foreground">
        Share local events, fairs, or community gatherings happening in your area.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-muted-foreground">Event Title</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-muted-foreground">Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-muted-foreground">Location</label>
          <input
            type="text"
            required
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-muted-foreground">Date</label>
          <input
            type="date"
            required
            value={form.event_date}
            onChange={(e) => setForm({ ...form, event_date: e.target.value })}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-foreground py-3 text-[14px] font-medium text-background transition-opacity duration-200 hover:opacity-85"
        >
          Submit Event
        </button>
      </form>
    </div>
  );
}
