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

    // ---------- Feature reels: each approved film plays only while it is on screen ----------
    // preload="none" means nothing downloads until a reel is near; with reduced motion the controls
    // stay and nothing plays by itself.
    const reels = all("reel") as HTMLVideoElement[];
    let reelIo: IntersectionObserver | undefined;
    if (reels.length && !reduce.matches) {
      reels.forEach((v) => {
        v.removeAttribute("controls");
        v.muted = true;
      });
      reelIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const v = e.target as HTMLVideoElement;
            if (e.isIntersecting) v.play().catch(() => v.setAttribute("controls", ""));
            else v.pause();
          });
        },
        { threshold: 0.35 },
      );
      reels.forEach((v) => reelIo!.observe(v));
    }

    // ---------- App cards (Widgets.tsx): rings fill, bars grow and numbers count when they arrive ----------
    // A card is armed (drawn empty) only here, so without JavaScript or with reduced motion it is finished.
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-w]"));
    let cardIo: IntersectionObserver | undefined;
    if (cards.length && !reduce.matches) {
      cards.forEach((c) => c.setAttribute("data-arm", ""));
      cardIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const c = e.target as HTMLElement;
            c.setAttribute("data-on", "");
            cardIo!.unobserve(c);
            c.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => {
              const to = Number(n.dataset.count);
              const dec = Number(n.dataset.dec ?? 0);
              const o = { v: 0 };
              n.textContent = (0).toFixed(dec);
              gsap.to(o, { v: to, duration: 1.5, delay: 0.15, ease: "power3.out", onUpdate: () => { n.textContent = o.v.toFixed(dec); } });
            });
          });
        },
        { threshold: 0.4 },
      );
      cards.forEach((c) => cardIo!.observe(c));
    }

    // The fasting countdown is live: it ticks down once a second, as it does in the app. With reduced
    // motion it stays still.
    const clocks = Array.from(root.querySelectorAll<HTMLElement>("[data-clock]"));
    let tick: number | undefined;
    if (clocks.length && !reduce.matches) {
      const pad = (n: number) => String(n).padStart(2, "0");
      tick = window.setInterval(() => {
        clocks.forEach((c) => {
          let t = Number(c.dataset.clock) - 1;
          if (t < 0) t = 6998;
          c.dataset.clock = String(t);
          c.textContent = `${pad(Math.floor(t / 3600))}:${pad(Math.floor((t % 3600) / 60))}:${pad(t % 60)}`;
        });
      }, 1000);
    }

    // ---------- Feature chips: the one for the chapter you are reading is lit ----------
    const chips = all("chip");
    const setChip = (id: string) => chips.forEach((c) => c.setAttribute("aria-current", String(c.getAttribute("href") === `#${id}`)));
    let chipIo: IntersectionObserver | undefined;
    if (chips.length) {
      const targets = chips.map((c) => document.getElementById((c.getAttribute("href") ?? "").slice(1))).filter(Boolean) as HTMLElement[];
      chipIo = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setChip(e.target.id)),
        { rootMargin: "-45% 0px -50% 0px" },
      );
      targets.forEach((t) => chipIo!.observe(t));
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
        // anchors: the feature chips glide to their chapter, landing below the nav and the chip bar.
        const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, anchors: { offset: -112 } });
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
              .fromTo(one("h-back"), { y: 0, rotation: 0 }, { y: -90, rotation: -2, ease: "power2.out" }, 0)
              .to(one("h-pull"), { y: -60, ease: "power1.out" }, 0)
              .to(one("h-copy"), { y: -36, ease: "power1.in" }, 0.2);
          } else {
            tl.to(one("h-phone"), { y: -40 }, 0).to(one("h-back"), { y: -20 }, 0).to(one("h-pull"), { y: -30 }, 0);
          }
        }

        // ---------- 2. The turn: each usual line dissolves, Zen Lean's rises in its place ----------
        const contrast = one("contrast");
        if (contrast) {
          const cells = all("c-cell", contrast);
          const cold = one("c-cold");
          const dawn = one("c-dawn");
          // Opacity and transform only. The first cut animated blur filters on twelve cards over a
          // scrubbed sky and stuttered on a real trackpad (the owner, 17 Nov).
          const dissolve = (tl: gsap.core.Timeline, cell: HTMLElement, at: number) => {
            const usual = cell.querySelector('[data-f="c-usual"]');
            const zen = cell.querySelector('[data-f="c-zen"]');
            const dot = cell.querySelector('[data-f="c-dot"]');
            tl.to(usual, { opacity: 0, y: 22, scale: 0.97, duration: 0.5, ease: "power2.in" }, at)
              .fromTo(zen, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, at + 0.32)
              .fromTo(dot, { opacity: 0.25, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }, at + 0.34);
          };
          if (desktop) {
            // One moment at a time: it arrives, the usual line gives way to Zen Lean's, it holds, it leaves.
            const pips = all("c-pip", contrast);
            const step = 2.2;
            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: { trigger: contrast, start: "top top", end: () => `+=${Math.round(vh() * 0.75 * cells.length)}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
            });
            gsap.set(cells.slice(1), { opacity: 0, y: 40 });
            cells.forEach((c, i) => {
              const t = i * step;
              if (i > 0) tl.to(c, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, t);
              dissolve(tl, c, t + 0.45);
              if (pips[i]) tl.to(pips[i], { scaleX: 1, duration: step - 0.2 }, t);
              if (i < cells.length - 1) tl.to(c, { opacity: 0, y: -40, duration: 0.4, ease: "power2.in" }, t + step - 0.4);
            });
            const end = cells.length * step;
            tl.fromTo(cold, { opacity: 0.93 }, { opacity: 0, ease: "power1.inOut", duration: end * 0.8 }, 0)
              .fromTo(dawn, { opacity: 0.25 }, { opacity: 1, duration: end }, 0)
              .to(one("c-ridges"), { yPercent: 2, scale: 1.04, duration: end }, 0)
              .to({}, { duration: 0.6 }, end);
          } else {
            gsap.fromTo(cold, { opacity: 0.93 }, { opacity: 0.1, ease: "none", scrollTrigger: { trigger: contrast, start: "top 60%", end: "bottom bottom", scrub: 0.5 } });
            gsap.fromTo(dawn, { opacity: 0.25 }, { opacity: 1, ease: "none", scrollTrigger: { trigger: contrast, start: "top 60%", end: "bottom bottom", scrub: 0.5 } });
            // Phone: the two lines stay stacked, never overlapping. The usual line fades back as you reach
            // it and Zen Lean's rises beneath it (overlapping text mid-dissolve was unreadable at 390px).
            cells.forEach((c) => {
              const tl = gsap.timeline({ scrollTrigger: { trigger: c, start: "top 80%", end: "top 40%", scrub: 0.5 } });
              tl.to(c.querySelector('[data-f="c-usual"]'), { opacity: 0.4, duration: 1 }, 0)
                .fromTo(c.querySelector('[data-f="c-zen"]'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0.2)
                .fromTo(c.querySelector('[data-f="c-dot"]'), { opacity: 0.25 }, { opacity: 1, duration: 0.6 }, 0.4);
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
              .fromTo(one("film-head"), { opacity: 1, y: 0 }, { opacity: 0, y: -60, ease: "power1.in", duration: 0.22 }, 0.02)
              .fromTo(one("film-bezel"), { opacity: 1 }, { opacity: 0, ease: "none", duration: 0.3 }, 0.6)
              .fromTo(all("film-bar"), { scaleY: 0 }, { scaleY: 1, ease: "power2.out", duration: 0.25 }, 0.78)
              .fromTo(one("film-caption"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.25 }, 0.9)
              .to({}, { duration: 0.35 }, 1.15);
          } else {
            gsap.fromTo(cam, { scale: 0.84, rotationX: 12, y: 30 }, { scale: 1, rotationX: 0, y: 0, ease: "power2.out", scrollTrigger: { trigger: cam, start: "top bottom", end: "center 55%", scrub: 0.6 } });
          }
        }

        // ---------- 3b. Feature chapters: the reel drifts against the text, the sky drifts slowest ----------
        all("chapter").forEach((ch) => {
          const st = { trigger: ch, start: "top bottom", end: "bottom top", scrub: 0.6 };
          const reel = ch.querySelector('[data-f="ch-reel"]');
          const sky = ch.firstElementChild;
          if (reel) gsap.fromTo(reel, { y: desktop ? 90 : 40 }, { y: desktop ? -90 : -40, ease: "none", scrollTrigger: st });
          if (sky) gsap.fromTo(sky, { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { ...st } });
        });

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
            duration: 0.45,
            stagger: 0.14,
            ease: "power3.out",
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
            .fromTo(all("z-line"), { opacity: 0, y: 46 }, { opacity: 1, y: 0, ease: "power3.out", duration: 0.28, stagger: 0.07 }, 0.12)
            .fromTo(all("z-after"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: "power3.out", duration: 0.2, stagger: 0.05 }, 0.32);
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
      reelIo?.disconnect();
      chipIo?.disconnect();
      cardIo?.disconnect();
      if (tick) window.clearInterval(tick);
      mm.revert();
    };
  }, [rootId]);

  return null;
}
