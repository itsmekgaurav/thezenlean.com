"use client";

import { useEffect } from "react";

// One behaviour: as you scroll, the sky behind the page moves from night towards morning. It writes a
// single number, --m (0 = night, 1 = full morning), onto the root. Without JS the page stays at night,
// which is still a complete, readable page.
export default function MorningClient() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-morning-root]");
    if (!root) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      // Night holds through the hero, pre-dawn in the middle, full morning for the last stretch.
      const t = Math.min(1, Math.max(0, (p - 0.08) / 0.8));
      const m = t * t * (3 - 2 * t);
      root.style.setProperty("--m", m.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
