"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { KAI_NOTE } from "./Cards";

gsap.registerPlugin(ScrollTrigger);

// The whole site is one day under the app's own sky. This component owns every moving thing:
// smooth scrolling, the sky (four time-of-day paintings, stars, a sun that rises), the pinned day
// where each card plays its own moment, and the reveals after it. With reduced motion it does
// nothing at all and the markup's finished states are what people see.

const SEGMENTS = ["sleep", "checkin", "meals", "water", "activity", "fasting", "kai"] as const;
const SKY_OF: Record<(typeof SEGMENTS)[number], "night" | "morning" | "afternoon" | "evening"> = {
  sleep: "night", checkin: "morning", meals: "morning", water: "afternoon", activity: "afternoon", fasting: "evening", kai: "night",
};
const RING = 2 * Math.PI * 46;
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const clock = (s: number) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = Math.floor(s % 60);
  return [h, m, x].map((v) => String(v).padStart(2, "0")).join(":");
};

export function Experience({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current!;
    if (reduced) {
      el.classList.add("is-static");
      return;
    }
    el.classList.add("is-live");

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const stopStars = startStars(el.querySelector<HTMLCanvasElement>("canvas.stars")!);

    const ctx = gsap.context(() => {
      const sky = (name: string) => el.querySelector(`.sky-layer[data-sky="${name}"]`);

      // ---- Hero: night becomes dawn while the headline lifts away ---------------------------
      const hero = gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "+=90%", scrub: 0.6, pin: true } });
      hero
        .to(".hero-copy", { yPercent: -18, opacity: 0, ease: "none" }, 0)
        .to(".sun", { yPercent: -120, scale: 1.25, ease: "power1.out" }, 0)
        .to(sky("morning"), { opacity: 0.35, ease: "none" }, 0.25) // first light only: 5:52 AM is still before sunrise
        .to("canvas.stars", { opacity: 0.55, ease: "none" }, 0.2)
        .to(".float.f1", { y: "-75vh", rotate: -10, ease: "none" }, 0)
        .to(".float.f2", { y: "-55vh", x: "6vw", rotate: 6, ease: "none" }, 0)
        .to(".float.f3", { y: "-110vh", rotate: 12, ease: "none" }, 0)
        .to(".sun", { opacity: 0, ease: "none" }, 0.75);

      // Idle drift on the floating cards, independent of scroll.
      gsap.utils.toArray<HTMLElement>(".float-inner").forEach((f, i) =>
        gsap.to(f, { y: i % 2 ? -14 : 14, rotate: i % 2 ? 1.5 : -1.5, duration: 3.6 + i, ease: "sine.inOut", yoyo: true, repeat: -1 }),
      );

      // ---- The day: pinned, one moment per segment --------------------------------------------
      const day = gsap.timeline({
        scrollTrigger: { trigger: ".day", start: "top top", end: `+=${SEGMENTS.length * 115}%`, scrub: 0.8, pin: true, anticipatePin: 1 },
        defaults: { ease: "power2.out" },
      });
      gsap.set(".moment-text, .stage .app-card", { autoAlpha: 0 });
      gsap.set(".stage .app-card", { y: 90, rotateX: 14, scale: 0.94, filter: "blur(6px)" });

      SEGMENTS.forEach((seg, i) => {
        const at = i * 10; // each segment is ten units of timeline
        const card = `.stage [data-card="${seg}"]`;
        const text = `.moment-text[data-text="${seg}"]`;
        const prev = i > 0 ? SEGMENTS[i - 1] : null;

        // sky for this hour
        ["night", "morning", "afternoon", "evening"].forEach((n) =>
          day.to(sky(n), { opacity: n === SKY_OF[seg] ? 1 : seg === "sleep" && n === "morning" ? 0.35 : 0, duration: 3, ease: "none" }, at),
        );
        day.to("canvas.stars", { opacity: SKY_OF[seg] === "night" ? 0.9 : SKY_OF[seg] === "evening" ? 0.25 : 0, duration: 3, ease: "none" }, at);

        // the day-line on the left fills to this hour
        day.to(".dayline-fill", { scaleY: (i + 1) / SEGMENTS.length, duration: 2, ease: "none" }, at);
        day.to(`.dayline li:nth-child(${i + 1})`, { color: "#f2f5ff", duration: 0.5 }, at);
        day.to(`.dayline li:nth-child(${i + 1}) .dl-dot`, { scale: 1.5, background: "var(--sun-b)", boxShadow: "0 0 14px var(--sun-b)", duration: 0.5 }, at);

        if (prev) {
          day.to(`.stage [data-card="${prev}"]`, { autoAlpha: 0, y: -70, rotateX: -10, scale: 0.95, filter: "blur(6px)", duration: 2, ease: "power2.in" }, at - 1);
          day.to(`.moment-text[data-text="${prev}"]`, { autoAlpha: 0, y: -30, duration: 1.5, ease: "power2.in" }, at - 1);
        }
        day.fromTo(text, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 2 }, at + 0.5);
        day.to(card, { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)", duration: 2.5, ease: "power3.out" }, at + 0.5);

        const play = at + 2.5;
        counts(day, card, play);
        rings(day, card, play);
        if (seg === "sleep") day.from(`${card} [data-bar]`, { scaleY: 0, transformOrigin: "bottom", stagger: 0.08, duration: 1 }, play);
        if (seg === "checkin")
          day.from(`${card} [data-chip]`, { scale: 0.6, autoAlpha: 0, stagger: 0.6, duration: 0.8, ease: "back.out(2)" }, play)
             .to(`${card} [data-chip]`, { boxShadow: "0 0 0 1.5px rgba(92,225,255,0.55), 0 10px 30px rgba(92,225,255,0.18)", stagger: 0.6, duration: 0.6 }, play + 0.4);
        if (seg === "meals")
          day.fromTo(`${card} [data-scan]`, { top: "-10%", autoAlpha: 1 }, { top: "105%", duration: 2.2, ease: "none" }, play)
             .to(`${card} [data-scan]`, { autoAlpha: 0, duration: 0.3 }, play + 2.2)
             .from(`${card} [data-tag]`, { scale: 0.4, autoAlpha: 0, duration: 0.8, ease: "back.out(2.4)" }, play + 2.2)
             .from(`${card} [data-macro]`, { y: 24, autoAlpha: 0, stagger: 0.25, duration: 0.8 }, play + 2.4)
             .from(`${card} [data-budget]`, { width: 0, duration: 1.4 }, play + 2.4);
        if (seg === "water")
          day.from(`${card} [data-water]`, { height: "0%", duration: 3, ease: "power2.out" }, play)
             .to(`${card} [data-tap]`, { scale: 0.9, duration: 0.25, yoyo: true, repeat: 1 }, play - 0.2);
        if (seg === "activity") day.from(`${card} .act-list p`, { x: 24, autoAlpha: 0, stagger: 0.3, duration: 0.8 }, play + 0.6);
        if (seg === "fasting") {
          const cd = el.querySelector<HTMLElement>(`${card} [data-countdown]`)!;
          const o = { s: 2 * 3600 + 30 * 60 };
          cd.textContent = clock(o.s);
          day.to(o, { s: 1 * 3600 + 56 * 60 + 39, duration: 3, ease: "power1.out", onUpdate: () => { cd.textContent = clock(o.s); } }, play)
             .from(`${card} [data-fastbar]`, { width: "55%", duration: 3 }, play)
             .from(`${card} [data-stage]`, { autoAlpha: 0.25, x: 12, stagger: 0.55, duration: 0.6 }, play + 0.3)
             .from(`${card} [data-stage] .st-dot`, { background: "rgba(255,255,255,0.25)", boxShadow: "none", stagger: 0.55, duration: 0.6 }, play + 0.3);
        }
        if (seg === "kai") {
          const t = el.querySelector<HTMLElement>(`${card} [data-type]`)!;
          const o = { n: 0 };
          t.textContent = "";
          day.to(o, { n: KAI_NOTE.length, duration: 4.5, ease: "none", onUpdate: () => { t.textContent = KAI_NOTE.slice(0, Math.round(o.n)); } }, play);
        }
      });
      day.to({}, { duration: 4 }); // hold the last moment before the pin releases

      // ---- After the day: reveals ----------------------------------------------------------------
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((r) =>
        gsap.from(r, { y: 60, autoAlpha: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: r, start: "top 85%" } }),
      );
      gsap.from(".principle", { y: 80, autoAlpha: 0, rotateX: 18, stagger: 0.12, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".principles-grid", start: "top 80%" } });
      gsap.from(".widget", { scale: 0.7, autoAlpha: 0, y: 40, stagger: 0.08, duration: 0.9, ease: "back.out(1.6)", scrollTrigger: { trigger: ".widget-wall", start: "top 80%" } });
      gsap.to(".widget-wall", { yPercent: -8, ease: "none", scrollTrigger: { trigger: ".widgets", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".finale-icon", { scale: 0.6, rotate: -12, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, ease: "back.out(1.7)", duration: 1.4, scrollTrigger: { trigger: ".finale", start: "top 75%" } });
      ["night", "morning", "afternoon", "evening"].forEach((n) =>
        gsap.to(sky(n), { opacity: n === "night" ? 1 : 0, ease: "none", scrollTrigger: { trigger: ".after", start: "top 80%", end: "top 30%", scrub: true } }),
      );
      gsap.to("canvas.stars", { opacity: 1, ease: "none", scrollTrigger: { trigger: ".after", start: "top 80%", end: "top 30%", scrub: true } });
    }, el);

    // Pointer tilt on the principle cards: small, so it reads as depth rather than a gimmick.
    const tilts = Array.from(el.querySelectorAll<HTMLElement>(".principle"));
    const onMove = (e: PointerEvent) => {
      const c = e.currentTarget as HTMLElement, r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(c, { rotateY: x * 8, rotateX: -y * 8, duration: 0.5, ease: "power2.out" });
      c.style.setProperty("--gx", `${(x + 0.5) * 100}%`); c.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
    };
    const onLeave = (e: PointerEvent) => gsap.to(e.currentTarget as HTMLElement, { rotateY: 0, rotateX: 0, duration: 0.9, ease: "power3.out" });
    tilts.forEach((t) => { t.addEventListener("pointermove", onMove); t.addEventListener("pointerleave", onLeave); });

    return () => {
      tilts.forEach((t) => { t.removeEventListener("pointermove", onMove); t.removeEventListener("pointerleave", onLeave); });
      ctx.revert();
      stopStars();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <div ref={root} className="experience">{children}</div>;

  // Count every [data-count] in a card from its data-from (or zero) to its data-to.
  function counts(tl: gsap.core.Timeline, card: string, at: number) {
    const root = document.querySelectorAll<HTMLElement>(`${card} [data-count]`);
    root.forEach((n) => {
      const to = Number(n.dataset.to), from = Number(n.dataset.from ?? 0), o = { v: from };
      n.textContent = fmt(from); // start where the count starts, not at the answer
      tl.to(o, { v: to, duration: 2.2, ease: "power2.out", onUpdate: () => { n.textContent = fmt(o.v); } }, at);
    });
  }
  function rings(tl: gsap.core.Timeline, card: string, at: number) {
    document.querySelectorAll<SVGCircleElement>(`${card} [data-ring]`).forEach((c) => {
      const pct = Number(c.dataset.pct);
      tl.fromTo(c, { strokeDashoffset: RING }, { strokeDashoffset: RING * (1 - pct), duration: 2.4, ease: "power2.out" }, at);
    });
  }
}

// A field of stars that twinkle; drawn once per frame on one canvas, paused when hidden.
function startStars(canvas: HTMLCanvasElement) {
  const g = canvas.getContext("2d")!;
  let w = 0, h = 0, raf = 0;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const stars = Array.from({ length: 260 }, () => ({ x: Math.random(), y: Math.random() * 0.75, r: Math.random() * 1.3 + 0.2, p: Math.random() * Math.PI * 2, s: 0.4 + Math.random() * 1.4 }));
  const size = () => { w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = w * dpr; canvas.height = h * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0); };
  size();
  window.addEventListener("resize", size);
  const draw = (t: number) => {
    g.clearRect(0, 0, w, h);
    for (const s of stars) {
      const a = 0.35 + 0.65 * Math.abs(Math.sin(s.p + (t / 1000) * s.s));
      g.globalAlpha = a; g.fillStyle = "#ffffff";
      g.beginPath(); g.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2); g.fill();
    }
    raf = requestAnimationFrame(draw);
  };
  raf = requestAnimationFrame(draw);
  return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
}
