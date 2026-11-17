"use client";

import { useEffect, useState } from "react";

// The masthead carries today's date and an edition number (day of the year), like a real paper.
// The page is statically rendered, so the server value would freeze at build time; the client
// replaces it on mount. The fallback is the day this variation was set.
type Edition = { date: string; short: string; no: number };

const FALLBACK: Edition = { date: "Tuesday, 17 November 2026", short: "17 Nov 2026", no: 321 };

function today(): Edition {
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  const no = Math.floor((d.getTime() - start.getTime()) / 86_400_000);
  const date = d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).replace(/,/g, "");
  const [weekday, ...rest] = date.split(" ");
  const short = d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return { date: `${weekday}, ${rest.join(" ")}`, short, no };
}

export function EditionDate({ variant = "date" }: { variant?: "date" | "short" | "no" }) {
  const [ed, setEd] = useState<Edition>(FALLBACK);
  useEffect(() => setEd(today()), []);
  const text = variant === "no" ? `No. ${ed.no}` : variant === "short" ? ed.short : ed.date;
  return <span suppressHydrationWarning>{text}</span>;
}
