"use client";

import { useEffect } from "react";

// Two small behaviours, nothing else: the nav's time rail fills as you scroll down the page, and the
// arrow buttons move the day track by one moment. Everything renders fully without this script.
export default function DayClient() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-day-root]");
    if (!root) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty("--day-p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const track = document.querySelector<HTMLElement>("[data-day-track]");
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-day-step]"));
    const onClick = (e: Event) => {
      if (!track) return;
      const dir = Number((e.currentTarget as HTMLElement).dataset.dayStep);
      const card = track.querySelector<HTMLElement>("li");
      const step = card ? card.offsetWidth + 24 : 400;
      track.scrollBy({ left: dir * step, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    };
    buttons.forEach((b) => b.addEventListener("click", onClick));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      buttons.forEach((b) => b.removeEventListener("click", onClick));
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
