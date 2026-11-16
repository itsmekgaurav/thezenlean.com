"use client";

import { useEffect, useState } from "react";

// The app's own time-of-day skies. As a section with data-sky scrolls into the middle of the screen,
// its sky fades in behind the whole page, so scrolling the site is the day passing.
const SKIES = ["night", "morning", "afternoon", "evening"] as const;
type Sky = (typeof SKIES)[number];

export function SkyBackdrop() {
  const [sky, setSky] = useState<Sky>("night");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-sky]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setSky((e.target as HTMLElement).dataset.sky as Sky);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="sky" aria-hidden="true">
      {SKIES.map((s) => (
        <div key={s} className={`sky-layer${s === sky ? " on" : ""}`} style={{ backgroundImage: `url(/sky/${s}.webp)` }} />
      ))}
      <div className="sky-shade" />
    </div>
  );
}
