"use client";

// The camera for variation F. The page is complete static HTML without this file: every element starts
// in its final, readable state, and nothing waits for an observer to become visible. This component adds
// motion only when JavaScript runs AND the reader has not asked for reduced motion:
//   - desktop (> 900px): Lenis smooth scroll, pinned and scrubbed scenes (opening, the turn, the film).
//   - phone (<= 900px): no pinning, lighter parallax, each contrast pair dissolves as it crosses the screen.
// It also sets data-motion on the root, which the CSS uses for layouts that only make sense in motion
// (the usual line and Zen Lean's line stacked in one place so one can dissolve into the other).

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const fmtCount = (v: number, fmt: string) => {
  const n = Math.round(v);
  if (fmt === "pct") return `${n}%`;
  if (fmt === "hm") return `${Math.floor(n / 60)} h ${n % 60} m`;
  return n.toLocaleString("en-US");
};

export default function Cinema({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const one = (f: string) => root.querySelector<HTMLElement>(`[data-f="${f}"]`);
    const all = (f: string, scope: ParentNode = root) => Array.from(scope.querySelectorAll<HTMLElement>(`[data-f="${f}"]`));

    // ---------- The film: muted, looping, playing only while it is on screen ----------
    const video = one("film-video") as HTMLVideoElement | null;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let io: IntersectionObserver | undefined;
    if (video) {
      const tall = video.dataset.posterTall;
      if (tall && window.matchMedia("(max-width: 700px)").matches) video.poster = tall;
      if (!reduce.matches) {
        // Cinematic by default: no controls, plays in view, pauses off-screen. With reduced motion the
        // controls stay and nothing plays until the reader presses play.
        video.removeAttribute("controls");
        video.muted = true;
        io = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting) video.play().catch(() => video.setAttribute("controls", ""));
            else video.pause();
          },
          { threshold: 0.2 },
        );
        io.observe(video);
      }
    }

    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        phone: "(max-width: 900px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const desktop = Boolean(ctx.conditions?.desktop);
        root.dataset.motion = desktop ? "full" : "lite";

        // Smooth scroll, driven by GSAP's ticker so ScrollTrigger and Lenis share one clock.
        const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        const raf = (t: number) => lenis.raf(t * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        const vh = () => window.innerHeight;

        // ---------- 1. Opening shot: a slow dolly into the night forest while dawn begins ----------
        const hero = one("hero");
        if (hero) {
          const tl = gsap.timeline({
            defaults: { ease: "none", duration: 1 },
            scrollTrigger: desktop
              ? { trigger: hero, start: "top top", end: () => `+=${Math.round(vh() * 1.1)}`, pin: true, scrub: 1, invalidateOnRefresh: true }
              : { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
          });
          const k = desktop ? 1 : 0.55; // lighter parallax on a phone
          tl.to(one("h-sky"), { scale: 1 + 0.05 * k, yPercent: -1.5 * k }, 0)
            .fromTo(one("h-dawn"), { opacity: 0 }, { opacity: desktop ? 0.94 : 0.8, ease: "power1.in" }, 0)
            .to(one("h-moon"), { yPercent: -5 * k, opacity: 0, scale: 0.96 }, 0)
            .fromTo(one("h-glow"), { opacity: 0 }, { opacity: 1 }, 0.1)
            .to(one("h-ridges"), { scale: 1 + 0.1 * k, yPercent: 1.6 * k }, 0)
            .to(one("h-mist1"), { xPercent: -6, opacity: 0.55 }, 0)
            .to(one("h-trees"), { scale: 1 + 0.26 * k, yPercent: 6 * k }, 0)
            .to(one("h-mist2"), { xPercent: 8, scale: 1.2, opacity: 0.25 }, 0);
          if (desktop) {
            tl.fromTo(one("h-phone"), { rotationX: 16, rotationY: -14, rotation: 2, y: 0 }, { rotationX: 0, rotationY: -4, rotation: 0, y: -46, ease: "power2.out" }, 0)
              .fromTo(one("h-back"), { y: 0, rotation: 0 }, { y: -18, rotation: 2, ease: "power2.out" }, 0)
              .to(one("h-pull"), { y: -120, ease: "power1.out" }, 0)
              .to(one("h-copy"), { y: -36, ease: "power1.in" }, 0.2);
          } else {
            tl.to(one("h-phone"), { y: -40 }, 0).to(one("h-back"), { y: 10 }, 0).to(one("h-pull"), { y: -70 }, 0);
          }
        }

        // ---------- 2. The turn: each usual line dissolves, Zen Lean's rises in its place ----------
        const contrast = one("contrast");
        if (contrast) {
          const cells = all("c-cell", contrast);
          const cold = one("c-cold");
          const dawn = one("c-dawn");
          const dissolve = (tl: gsap.core.Timeline, cell: HTMLElement, at: number) => {
            const usual = cell.querySelector('[data-f="c-usual"]');
            const zen = cell.querySelector('[data-f="c-zen"]');
            const dot = cell.querySelector('[data-f="c-dot"]');
            tl.to(usual, { opacity: 0, y: 26, scale: 0.97, filter: "grayscale(1) blur(10px)", duration: 0.6, ease: "power2.in" }, at)
              .fromTo(zen, { opacity: 0, y: 34, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }, at + 0.38)
              .fromTo(dot, { opacity: 0.25, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }, at + 0.4);
          };
          if (desktop) {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: contrast, start: "top top", end: () => `+=${Math.round(vh() * 2.6)}`, pin: true, scrub: 0.9, invalidateOnRefresh: true },
            });
            tl.to({}, { duration: 0.5 }, 0);
            cells.forEach((c, i) => dissolve(tl, c, 0.5 + i * 0.95));
            const end = 0.5 + cells.length * 0.95 + 0.4;
            tl.fromTo(cold, { opacity: 0.93 }, { opacity: 0, ease: "power1.inOut", duration: end - 0.6 }, 0.3)
              .fromTo(dawn, { opacity: 0.25 }, { opacity: 1, ease: "none", duration: end - 0.3 }, 0.3)
              .to(one("c-ridges"), { yPercent: 2, scale: 1.04, ease: "none", duration: end }, 0)
              .to({}, { duration: 0.6 }, end);
          } else {
            gsap.fromTo(cold, { opacity: 0.93 }, { opacity: 0.1, ease: "none", scrollTrigger: { trigger: contrast, start: "top 60%", end: "bottom bottom", scrub: 0.5 } });
            gsap.fromTo(dawn, { opacity: 0.25 }, { opacity: 1, ease: "none", scrollTrigger: { trigger: contrast, start: "top 60%", end: "bottom bottom", scrub: 0.5 } });
            cells.forEach((c) => {
              const tl = gsap.timeline({ scrollTrigger: { trigger: c, start: "top 78%", end: "top 32%", scrub: 0.5 } });
              dissolve(tl, c, 0);
            });
          }
        }

        // ---------- 3. The film: a phone-sized screen opens into a full, letterboxed frame ----------
        const film = one("film");
        const cam = one("film-cam");
        if (film && cam) {
          if (desktop) {
            const startScale = () => Math.min(0.56, (window.innerWidth * 0.5) / cam.offsetWidth);
            const tl = gsap.timeline({
              scrollTrigger: { trigger: film, start: "top top", end: () => `+=${Math.round(vh() * 1.5)}`, pin: true, scrub: 1, invalidateOnRefresh: true },
            });
            tl.fromTo(cam, { scale: startScale, rotationX: 14, rotation: -1.5, yPercent: 9 }, { scale: 1, rotationX: 0, rotation: 0, yPercent: 0, ease: "power2.inOut", duration: 1 }, 0)
              .fromTo(one("film-head"), { opacity: 1, y: 0 }, { opacity: 0, y: -40, ease: "power1.in", duration: 0.3 }, 0.08)
              .fromTo(one("film-bezel"), { opacity: 1 }, { opacity: 0, ease: "none", duration: 0.3 }, 0.6)
              .fromTo(all("film-bar"), { scaleY: 0 }, { scaleY: 1, ease: "power2.out", duration: 0.25 }, 0.78)
              .fromTo(one("film-caption"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.25 }, 0.9)
              .to({}, { duration: 0.35 }, 1.15);
          } else {
            gsap.fromTo(cam, { scale: 0.84, rotationX: 12, y: 30 }, { scale: 1, rotationX: 0, y: 0, ease: "power2.out", scrollTrigger: { trigger: cam, start: "top bottom", end: "center 55%", scrub: 0.6 } });
          }
        }

        // ---------- 4. The rules: numbers count up, real screens slide in with depth ----------
        all("p-card").forEach((card) => {
          const phone = card.querySelector<HTMLElement>('[data-f="p-phone"]');
          if (phone) {
            gsap.fromTo(
              phone,
              { y: desktop ? 150 : 90, rotationX: 24, scale: 0.9, opacity: 0.2 },
              { y: 0, rotationX: 0, scale: 1, opacity: 1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 92%", end: "top 30%", scrub: 0.7 } },
            );
          }
        });
        root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          const to = Number(el.dataset.count);
          const fmt = el.dataset.fmt ?? "int";
          if (!to) return;
          // React's dev StrictMode runs this effect twice, so the final text is remembered on the element
          // rather than read back from a DOM the first run already reset to zero.
          const final = (el.dataset.final ??= el.textContent ?? "");
          // Only reset a number the reader cannot see yet; one already on screen keeps its final value.
          if (el.getBoundingClientRect().top < window.innerHeight) return;
          el.textContent = fmtCount(0, fmt);
          const o = { v: 0 };
          gsap.to(o, {
            v: to,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
            onUpdate: () => {
              el.textContent = fmtCount(o.v, fmt);
            },
            onComplete: () => {
              el.textContent = final;
            },
          });
        });

        // ---------- 5. Less logging: the afternoon sky and the two phones at different depths ----------
        const less = one("less");
        if (less) {
          const st = { trigger: less, start: "top bottom", end: "bottom top", scrub: 0.6 };
          gsap.fromTo(one("less-sky"), { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: st });
          gsap.fromTo(one("less-front"), { y: desktop ? 110 : 50 }, { y: desktop ? -90 : -30, ease: "none", scrollTrigger: { ...st } });
          gsap.fromTo(one("less-back"), { y: desktop ? -30 : -10 }, { y: desktop ? 50 : 20, ease: "none", scrollTrigger: { ...st } });
        }

        // ---------- 6. Kai: the evening sky drifts, and the four notes arrive one after another ----------
        const panel = one("kai-panel");
        if (panel) {
          gsap.fromTo(one("kai-sky"), { yPercent: -6, scale: 1.08 }, { yPercent: 6, scale: 1.08, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: 0.6 } });
          gsap.from(all("kai-line", panel), {
            opacity: 0,
            y: 18,
            filter: "blur(6px)",
            duration: 0.45,
            stagger: 0.14,
            ease: "power3.out",
            clearProps: "filter",
            scrollTrigger: { trigger: panel, start: "top 72%", once: true },
          });
        }

        // ---------- 7. Closing: the camera rises over the ridges into a full sunrise ----------
        const close = one("close");
        if (close) {
          const tl = gsap.timeline({
            defaults: { ease: "none", duration: 1 },
            scrollTrigger: { trigger: close, start: "top bottom", end: "bottom bottom", scrub: 1 },
          });
          tl.fromTo(one("z-sky"), { yPercent: -3 }, { yPercent: 0 }, 0)
            .fromTo(one("z-sun"), { opacity: 0.15, scale: 0.6 }, { opacity: 1, scale: 1.15, ease: "power1.out" }, 0)
            .fromTo(one("z-ridges"), { yPercent: -3 }, { yPercent: 1.5 }, 0)
            .fromTo(one("z-mist"), { yPercent: -2, opacity: 0.9 }, { yPercent: 3, opacity: 0.6 }, 0)
            .fromTo(one("z-trees"), { yPercent: -8 }, { yPercent: 6 }, 0)
            .fromTo(all("z-line"), { opacity: 0, y: 46, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", ease: "power3.out", duration: 0.4, stagger: 0.12 }, 0.25)
            .fromTo(all("z-after"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: "power3.out", duration: 0.3, stagger: 0.08 }, 0.55);
        }

        ScrollTrigger.refresh();

        return () => {
          gsap.ticker.remove(raf);
          gsap.ticker.lagSmoothing(500, 33);
          lenis.destroy();
          delete root.dataset.motion;
          root.querySelectorAll<HTMLElement>("[data-final]").forEach((el) => {
            el.textContent = el.dataset.final ?? el.textContent;
          });
        };
      },
    );

    // Images and fonts change heights after load; re-measure the pins once everything has settled.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      io?.disconnect();
      mm.revert();
    };
  }, [rootId]);

  return null;
}
