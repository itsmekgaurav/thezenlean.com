import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import type { CSSProperties } from "react";
import s from "./f.module.css";
import Cinema from "./Cinema";
import { FAQ, GUIDES, KAI_NOTES, PAIRS, PROMISES, STORE, type Hue, type Usual } from "./data";

// Variation F, "Without the guilt", cinematic cut. Same story, copy and claims as E. What changes is the
// camera. The brief's emotion is relief, so the page is shot as one day: it opens in the app's night
// forest, dawn warms the sky while you read the headline, the "usual" tracking language dissolves into
// Zen Lean's words as the morning comes up, the real "One day" film plays full frame, and the page ends
// rising into tomorrow's sunrise. Every animated layer is the app's own wallpaper, cut into depth.
//
// Motion contract: everything below renders complete and readable as static HTML. Cinema.tsx adds the
// scroll camera only when JavaScript runs and the reader has not asked for reduced motion.
const round = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800", "900"], variable: "--f-nunito", display: "swap" });

export const metadata: Metadata = {
  title: "Zen Lean: a calorie tracker without the guilt",
  description:
    "A calm calorie tracker for iPhone and Apple Watch. AI photo meals, fasting, sleep and recovery, and Kai, a coach who tells you the truth kindly.",
  robots: { index: false, follow: false },
};

const ROOT_ID = "zen-f";
const hueVar = (h: Hue) => ({ "--hue": `var(--${h})` }) as CSSProperties;

function Phone({ shot, alt, className, priority, sizes = "(max-width: 900px) 60vw, 340px" }: { shot: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <figure className={`${s.phone} ${className ?? ""}`}>
      <span className={s.island} aria-hidden="true" />
      <img
        src={`/shots/today/${shot}-660.webp`}
        srcSet={`/shots/today/${shot}-660.webp 660w, /shots/today/${shot}-1320.webp 1320w`}
        sizes={sizes}
        width={660}
        height={1434}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </figure>
  );
}

function Store({ size = "lg" }: { size?: "lg" | "sm" }) {
  return (
    <a className={`${s.store} ${size === "sm" ? s.storeSm : ""}`} href={STORE}>
      <svg viewBox="0 0 384 512" aria-hidden="true" className={s.apple}>
        <path
          fill="currentColor"
          d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
        />
      </svg>
      {size === "sm" ? "Download" : "Download on the App Store"}
    </a>
  );
}

// The app's own Kai glyph: a four-point sparkle with a small plus, as drawn beside every Kai line.
function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`${s.sparkle} ${className ?? ""}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      <path d="M10 5.5c.6 3.6 2 5 5.6 5.6-3.6.6-5 2-5.6 5.6-.6-3.6-2-5-5.6-5.6 3.6-.6 5-2 5.6-5.6z" />
      <path d="M18 2.5v4M16 4.5h4" />
    </svg>
  );
}

function KaiLine({ text, where, hue, compact }: { text: string; where?: string; hue?: Hue; compact?: boolean }) {
  return (
    <blockquote className={`${s.kaiLine} ${compact ? s.kaiCompact : ""}`} style={hue ? hueVar(hue) : undefined}>
      <Sparkle />
      <div>
        <p>{text}</p>
        {where && <cite>{where}</cite>}
      </div>
    </blockquote>
  );
}

function UsualFrag({ u }: { u: Usual }) {
  return (
    <div className={`${s.frag} ${s[`frag_${u.kind}`]}`} aria-label={`${u.label}: ${u.value}. ${u.note}`}>
      <span className={s.fragLabel}>{u.label}</span>
      <span className={s.fragValue}>
        {u.value}
        {u.kind === "score" && <em className={s.fragVerdict}>{u.verdict}</em>}
      </span>
      {u.kind === "over" && (
        <span className={s.fragBar} aria-hidden="true">
          <i />
        </span>
      )}
      {u.kind === "streak" && (
        <span className={s.fragDays} aria-hidden="true">
          {Array.from({ length: 7 }, (_, i) => (
            <i key={i} className={i === 6 ? s.fragMiss : undefined} />
          ))}
        </span>
      )}
      <span className={s.fragNote}>{u.note}</span>
    </div>
  );
}

// One depth layer of a sky scene. Every layer of a scene shares the same box, so the cut pieces line up
// exactly at rest; Cinema.tsx moves each box at its own speed. The layers are cut from the app's own
// time-of-day wallpapers (public/parallax, made from the onboarding originals).
function Layer({ name, f, eager, children, className }: { name?: string; f: string; eager?: boolean; children?: React.ReactNode; className?: string }) {
  return (
    <div className={`${s.layer} ${className ?? ""}`} data-f={f} aria-hidden="true">
      {name && (
        <img
          src={`/parallax/${name}.webp`}
          srcSet={`/parallax/${name}-m.webp 853w, /parallax/${name}.webp 1706w, /parallax/${name}-xl.webp 3412w`}
          sizes="(max-width: 900px) 940px, max(100vw, 112vh)"
          width={1706}
          height={2000}
          alt=""
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      )}
      {children}
    </div>
  );
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Zen Lean",
    operatingSystem: "iOS",
    applicationCategory: "HealthApplication",
    description:
      "A calm calorie tracker for iPhone and Apple Watch with AI photo meals, intermittent fasting, sleep and recovery, and Kai, a coach who writes a short daily note.",
    url: "https://thezenlean.com",
    downloadUrl: STORE,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function VariationF() {
  return (
    <div id={ROOT_ID} className={`${s.root} ${round.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Cinema rootId={ROOT_ID} />

      <header className={s.navWrap}>
        <nav className={s.nav} aria-label="Main">
          <a className={s.brand} href="/v/f">
            <img src="/icon-512.png" alt="" width={34} height={34} />
            Zen Lean
          </a>
          <ul className={s.navLinks}>
            <li><a href="/features">Features</a></li>
            <li><a href="/how-it-works">How it works</a></li>
            <li><a href="/science">Science</a></li>
            <li><a href="/guides">Guides</a></li>
            <li><a href="/support">Support</a></li>
          </ul>
          <Store size="sm" />
        </nav>
      </header>

      <main>
        {/* ---------- Opening shot: night forest, dawn begins as you read ---------- */}
        <section className={s.hero} aria-labelledby="hero-title" data-f="hero">
          <div className={s.scene} aria-hidden="true">
            <div className={s.sceneIntro}>
              <Layer f="h-sky" name="night-sky" eager />
              <Layer f="h-dawn" name="dawn-sky" eager className={s.dawnLayer} />
              <Layer f="h-moon" name="night-moon" eager />
              <Layer f="h-glow" className={s.horizonGlow} />
              <Layer f="h-ridges" name="night-ridges" eager />
              <Layer f="h-mist1" className={s.mistFar} />
              <Layer f="h-trees" name="night-trees" eager />
              <Layer f="h-mist2" className={s.mistNear} />
            </div>
            <div className={s.heroShade} />
          </div>

          <div className={`${s.wrap} ${s.heroGrid}`}>
            <div className={s.heroCopy} data-f="h-copy">
              <p className={`${s.eyebrow} ${s.in1}`}>If you quit counting calories, it was not you.</p>
              <h1 id="hero-title" className={s.h1}>
                <span className={s.line}><span className={s.in2}>Calorie tracking,</span></span>{" "}
                <span className={s.line}><span className={`${s.soft} ${s.in3}`}>without the guilt.</span></span>
              </h1>
              <p className={`${s.lede} ${s.in4}`}>
                Most calorie counters feel like a test you keep failing. Zen Lean shows food, fasting, sleep and
                movement in one calm picture, and Kai, a coach who has read your data, tells you the truth kindly.
              </p>
              <div className={`${s.ctaRow} ${s.in5}`}>
                <Store />
                <span className={s.fine}>Monthly or yearly subscription. iPhone and Apple Watch, iOS 17 or later.</span>
              </div>
              <ul className={`${s.heroPromises} ${s.in6}`}>
                <li style={hueVar("activity")}><span className={s.dot} aria-hidden="true" />No guilt when you miss a day</li>
                <li style={hueVar("nutrition")}><span className={s.dot} aria-hidden="true" />No target below 1,200 kcal</li>
                <li style={hueVar("recovery")}><span className={s.dot} aria-hidden="true" />No chat to keep up with</li>
              </ul>
            </div>
            <div className={s.heroStage}>
              <div className={s.heroBackRig} data-f="h-back">
                <div className={s.heroRiseLate}>
                  <Phone shot="sleep" alt="Zen Lean Sleep card scored 77, Good, after 5h 51m asleep, with the Kai line Some rest is still rest. Go easy on yourself today." className={s.heroBack} />
                </div>
              </div>
              <div className={s.heroRig} data-f="h-phone">
                <div className={s.heroRise}>
                  <Phone shot="insights" alt="Zen Lean Insights: a 23 of 7 day solid streak, a 14 of 16 hour fast in progress, and Kai's note: You moved well, but calories ran high several days this week. Small portions can close the gap." className={s.heroFront} priority />
                </div>
              </div>
              <div className={s.heroPull} data-f="h-pull">
                <div className={s.in7}>
                  <KaiLine text="You moved well, but calories ran high several days this week. Small portions can close the gap." where="Kai, this week" hue="nutrition" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- The turn: the usual words dissolve into Zen Lean's as the morning comes up ---------- */}
        <section id="tone" className={s.contrast} aria-labelledby="contrast-title" data-f="contrast">
          <div className={s.scene} aria-hidden="true">
            <div className={s.sceneSticky}>
              <Layer f="c-sky" name="night-sky" />
              <Layer f="c-dawn" name="dawn-sky" />
              <Layer f="c-ridges" name="dawn-ridges" />
              <div className={s.cold} data-f="c-cold" />
              <div className={s.cShade} />
            </div>
          </div>
          <div className={`${s.wrap} ${s.cStage}`}>
            <div className={s.head}>
              <div>
                <p className={s.kicker}>Why people quit</p>
                <h2 id="contrast-title" className={s.h2}>Same day. Different words.</h2>
              </div>
              <p className={s.sub}>
                A 2025 UCL and Loughborough study read 58,881 posts about fitness and calorie apps. People wrote
                about shame, disappointment and the effort of logging, and about goals with no grounding in health
                guidance. Here is the difference in tone, moment by moment.
              </p>
            </div>

            <ol className={s.cGrid} aria-label="What tracking apps usually say, next to what Zen Lean says">
              {PAIRS.map((p) => (
                <li key={p.moment} className={s.cCell} style={hueVar(p.hue)} data-f="c-cell">
                  <p className={s.cMoment}>
                    <span className={s.dot} aria-hidden="true" data-f="c-dot" />
                    {p.moment}
                  </p>
                  <div className={s.slot}>
                    <div className={s.usualWrap} data-f="c-usual">
                      <span className={s.slotTag}>What tracking usually sounds like</span>
                      <UsualFrag u={p.usual} />
                    </div>
                    <div className={s.zenWrap} data-f="c-zen">
                      <span className={s.slotTag}>What Zen Lean says</span>
                      <div className={s.zenCard}>
                        {p.kai ? <Sparkle /> : <span className={s.zenDot} aria-hidden="true" />}
                        <div>
                          <p>{p.zen}</p>
                          <span>{p.source}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className={s.cPips} aria-hidden="true">
              {PAIRS.map((p) => (
                <i key={p.moment}><b data-f="c-pip" /></i>
              ))}
            </div>
            <p className={s.cFoot}>
              The grey lines are a composite of language common across tracking apps, drawn for this page, with
              the &minus;700 kcal target quoted from the study. Zen Lean&rsquo;s lines are quoted word for word
              from its screens.
            </p>
          </div>
        </section>

        {/* ---------- The film: one real day, full frame ---------- */}
        <section className={s.film} aria-labelledby="film-title" data-f="film">
          <div className={s.filmStage}>
            <div className={s.filmHead} data-f="film-head">
              <p className={s.kicker}>One day, in twenty seconds</p>
              <h2 id="film-title" className={s.h2}>One question, every morning: how am I today?</h2>
            </div>
            <div className={s.filmCam} data-f="film-cam">
              <div className={s.filmDevice}>
                <span className={s.filmBezel} data-f="film-bezel" aria-hidden="true" />
                <video
                  className={s.filmVideo}
                  data-f="film-video"
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  poster="/film/one-day-16x9.jpg"
                  data-poster-tall="/film/one-day-9x16.jpg"
                  aria-label="The Zen Lean film, One day: a misty dawn forest asks How am I today?, Kai reads your night on the Insights screen, a meal is snapped and estimated, the day adds up on Meals, and the end card reads Zen Lean, food, fasting and recovery in one calm picture."
                >
                  <source src="/film/one-day-9x16.mp4" type="video/mp4" media="(max-width: 700px)" />
                  <source src="/film/one-day-16x9.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            <span className={`${s.bar} ${s.barTop}`} data-f="film-bar" aria-hidden="true" />
            <span className={`${s.bar} ${s.barBottom}`} data-f="film-bar" aria-hidden="true" />
            <p className={s.filmCaption} data-f="film-caption">
              The real app, one day: how you slept, your fast hour by hour, a meal from a photo, and the day in one calm picture.
            </p>
          </div>
        </section>

        {/* ---------- How it keeps the promise ---------- */}
        <section id="science" className={s.promises} aria-labelledby="promise-title">
          <div className={s.wrap}>
            <div className={s.head}>
              <div>
                <p className={s.kicker}>How it stays kind and honest</p>
                <h2 id="promise-title" className={s.h2}>Kind does not mean telling you what you want to hear.</h2>
              </div>
              <p className={s.sub}>
                When calories run high, Kai says so. What Zen Lean will not do is shame you, push you somewhere
                unsafe, or hand you a score it has not earned. Five rules are built in. You can change your goal.
                You cannot talk it past these.
              </p>
            </div>
            <ol className={s.pGrid}>
              {PROMISES.map((p) => (
                <li key={p.n} className={s.pCard} style={hueVar(p.hue)} data-f="p-card">
                  <div className={s.pText}>
                    <span className={s.pN}>
                      <span className={s.dot} aria-hidden="true" />
                      Rule {p.n}
                    </span>
                    <p className={s.pBig}>
                      <span data-count={p.count?.to} data-fmt={p.count?.fmt}>{p.big}</span>
                      {p.unit && <small> {p.unit}</small>}
                    </p>
                    <h3 className={s.h3}>{p.title}</h3>
                    <p className={s.pBody}>{p.body}</p>
                    {p.line && <KaiLine text={p.line} hue={p.hue} compact />}
                  </div>
                  <div className={s.pShot}>
                    <div className={s.pRig} data-f="p-phone">
                      <Phone shot={p.shot} alt={p.alt} sizes="(max-width: 900px) 70vw, 300px" />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <p className={s.formulas}>
              <strong>Named formulas.</strong> Mifflin-St Jeor for BMR and TDEE. Karvonen for heart rate zones. The
              FRIEND registry for Fitness Age. Keytel 2005 for workout calories. WHO cutoffs for BMI.
            </p>
          </div>
        </section>

        {/* ---------- Less logging ---------- */}
        <section id="features" className={s.less} aria-labelledby="less-title" data-f="less">
          <div className={s.lessSkyClip} aria-hidden="true">
            <div className={s.lessSky} data-f="less-sky" />
          </div>
          <div className={`${s.wrap} ${s.lessGrid}`}>
            <div>
              <p className={s.kicker}>Less data entry</p>
              <h2 id="less-title" className={s.h2}>The logging that made you quit, mostly gone.</h2>
              <p className={s.sub}>
                Typing every ingredient into a search box is the part people give up on. So Zen Lean asks for as
                little as it can.
              </p>
              <ol className={s.lessList}>
                <li style={hueVar("nutrition")}>
                  <span className={s.lessN}>1</span>
                  <div>
                    <h3>A photo of your plate.</h3>
                    <p>Calories, protein, carbs, fat and fibre, estimated for you to check and adjust. Ten photo analyses a day. This oatmeal bowl with banana: 380 kcal, with 1,708 left of a 2,088 budget.</p>
                  </div>
                </li>
                <li style={hueVar("recovery")}>
                  <span className={s.lessN}>3</span>
                  <div>
                    <h3>Three taps in the morning.</h3>
                    <p>Energy, body, mood. That is the whole check-in. Your taps sit beside overnight Recovery and never rewrite it.</p>
                    <div className={s.tapCrop}>
                      <img src="/shots/today/checkin-660.webp" alt="The three check-in taps on Zen Lean: Energy Good, Body Okay, Mood Good" width={660} height={1434} loading="lazy" />
                    </div>
                  </div>
                </li>
                <li style={hueVar("sleep")}>
                  <span className={s.lessN}>0</span>
                  <div>
                    <h3>Extra devices to wear.</h3>
                    <p>The Watch you already own measures sleep, resting heart rate, HRV and workouts through Apple Health. Start a 16:8 fast from your wrist. No second wearable, no second subscription.</p>
                  </div>
                </li>
              </ol>
            </div>
            <div className={s.lessStage}>
              <div className={s.lessBackRig} data-f="less-back">
                <Phone shot="fasting" alt="Zen Lean Fasting on a 16:8 fast, 01:56:39 remaining at hour 14, fat burn rising, and the line You're in a steady stretch. Hydrate and keep your usual rhythm." className={s.lessBack} />
              </div>
              <div className={s.lessFrontRig} data-f="less-front">
                <Phone shot="meals" alt="Zen Lean Meals: 1,708 kcal left today, 380 eaten of a 2,088 budget, macro bars, 3 of 8 glasses of water, and an oatmeal bowl with banana logged at 380 kcal" className={s.lessFront} />
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Kai ---------- */}
        <section id="kai" className={s.kai} aria-labelledby="kai-title">
          <div className={`${s.wrap} ${s.kaiGrid}`}>
            <div>
              <p className={s.kicker}>Kai, your coach</p>
              <h2 id="kai-title" className={s.h2}>Kai reports. Kai never nags.</h2>
              <p className={s.sub}>
                Kai reads your sleep, heart, recovery, check-in, meals, fasting, workouts and water, then writes a
                short note grounded in your numbers. There is no chat. Nothing to answer, nothing to keep up with.
              </p>
              <ul className={s.wont}>
                <li><strong>No guilt.</strong> A rough night gets a kind line, not a lecture.</li>
                <li><strong>No cheerleading.</strong> A green ring you did not earn is not kindness.</li>
                <li><strong>No streak shame.</strong> No guilt when you miss a day. Start again where you are.</li>
                <li><strong>No conversation.</strong> Kai writes notes. You read them when you open the app.</li>
              </ul>
            </div>
            <div className={s.kaiPanel} data-f="kai-panel">
              <div className={s.kaiPanelSky} data-f="kai-sky" aria-hidden="true" />
              <p className={s.kaiPanelHead}>Four things Kai wrote on one morning</p>
              {KAI_NOTES.map((n) => (
                <div key={n.where} data-f="kai-line">
                  <KaiLine text={n.text} where={n.where} hue={n.hue} />
                </div>
              ))}
              <p className={s.tiny}>Quoted word for word from the app screens on this page.</p>
            </div>
          </div>
        </section>

        {/* ---------- Privacy ---------- */}
        <section className={s.privacy} aria-labelledby="privacy-title">
          <div className={`${s.wrap} ${s.privacyGrid}`}>
            <div>
              <p className={s.kicker}>Privacy</p>
              <h2 id="privacy-title" className={s.h2Sm}>Your day is yours.</h2>
            </div>
            <ul className={s.privacyList}>
              <li><strong>No ads.</strong> Not in the app, not anywhere.</li>
              <li><strong>Never sold.</strong> Your data, to anyone, for any reason.</li>
              <li><strong>Stats you can switch off.</strong> Usage stats are anonymous, and one switch turns them off.</li>
              <li><strong>Delete means delete.</strong> Close your account and everything goes.</li>
            </ul>
          </div>
        </section>

        {/* ---------- Guides ---------- */}
        <section id="guides" className={s.guides} aria-labelledby="guides-title">
          <div className={s.wrap}>
            <div className={s.head}>
              <div>
                <p className={s.kicker}>Guides</p>
                <h2 id="guides-title" className={s.h2}>Read before you start again.</h2>
              </div>
              <a className={s.textLink} href="/guides">All guides &#8594;</a>
            </div>
            <ul className={s.guideGrid}>
              {GUIDES.map((g) => (
                <li key={g.slug} className={g.featured ? s.guideFeatured : undefined} style={hueVar(g.hue)}>
                  <a className={s.guide} href={`/guides/${g.slug}`}>
                    <span className={s.guideTopic}>
                      <span className={s.dot} aria-hidden="true" />
                      {g.topic}
                    </span>
                    <h3>{g.title}</h3>
                    <p>{g.dek}</p>
                    <span className={s.guideMore} aria-hidden="true">Read the guide &#8594;</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section id="faq" className={s.faq} aria-labelledby="faq-title">
          <div className={`${s.wrap} ${s.faqGrid}`}>
            <div>
              <p className={s.kicker}>Questions</p>
              <h2 id="faq-title" className={s.h2}>Asked before you download.</h2>
              <p className={s.sub}>
                Anything else, write to <a href="mailto:hello@thezenlean.com">hello@thezenlean.com</a>. A person
                answers.
              </p>
            </div>
            <div className={s.faqList}>
              {FAQ.map((f, i) => (
                <details key={f.q} open={i < 2}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Closing: the camera rises into tomorrow's sunrise ---------- */}
        <section className={s.closing} aria-labelledby="close-title" data-f="close">
          <div className={s.scene} aria-hidden="true">
            <Layer f="z-sky" name="dawn-sky" className={s.closeLayer}>
              <span className={s.sun} data-f="z-sun" />
            </Layer>
            <Layer f="z-ridges" name="dawn-ridges" className={s.closeLayer} />
            <Layer f="z-mist" className={`${s.closeLayer} ${s.mistDawn}`} />
            <Layer f="z-trees" name="dawn-trees" className={s.closeLayer} />
            <div className={s.closeShade} />
          </div>
          <div className={`${s.wrap} ${s.closeInner}`}>
            <h2 id="close-title" className={s.closeTitle}>
              <span className={s.closeLine1} data-f="z-line">Tomorrow morning, read how you are.</span>{" "}
              <span className={`${s.soft} ${s.closeLine2}`} data-f="z-line">Not how you failed.</span>
            </h2>
            <div className={s.closeKai} data-f="z-after">
              <KaiLine text="Some rest is still rest. Go easy on yourself today." where="Kai, after a short night" hue="sleep" />
            </div>
            <div className={`${s.ctaRow} ${s.ctaCenter}`} data-f="z-after">
              <Store />
              <span className={s.fine}>Free to download. Monthly or yearly subscription after setup.</span>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.wrap}>
          <div className={s.footGrid}>
            <div className={s.footBrand}>
              <a className={s.brand} href="/v/f">
                <img src="/icon-512.png" alt="" width={34} height={34} />
                Zen Lean
              </a>
              <p>Health tracking without the guilt, for iPhone and Apple Watch.</p>
            </div>
            <nav aria-label="Features">
              <h2>Features</h2>
              <ul>
                <li><a href="/features/food">Food</a></li>
                <li><a href="/features/fasting">Fasting</a></li>
                <li><a href="/features/sleep-and-recovery">Sleep and recovery</a></li>
                <li><a href="/features/activity">Activity</a></li>
                <li><a href="/features/kai">Kai coach</a></li>
                <li><a href="/features/apple-watch">Apple Watch</a></li>
              </ul>
            </nav>
            <nav aria-label="Learn">
              <h2>Learn</h2>
              <ul>
                <li><a href="/guides">Guides</a></li>
                <li><a href="/science">Science</a></li>
                <li><a href="/tools/calorie-calculator">Calorie calculator</a></li>
              </ul>
            </nav>
            <nav aria-label="Company">
              <h2>Company</h2>
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/support">Support</a></li>
                <li><a href="/privacy">Privacy</a></li>
                <li><a href="/terms">Terms</a></li>
                <li><a href="mailto:hello@thezenlean.com">hello@thezenlean.com</a></li>
              </ul>
            </nav>
          </div>
          <p className={s.copy}>© 2026 Zen Products</p>
        </div>
      </footer>
    </div>
  );
}
