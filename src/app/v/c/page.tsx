import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import Calculator from "./Calculator";
import { Shot, Legend, Reg, type Callout } from "./Figure";
import s from "./c.module.css";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--c-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--c-mono", display: "swap", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Zen Lean: calorie tracker, fasting and Apple Watch",
  description:
    "A calorie tracker that shows its working. AI photo logging, 16:8 fasting, sleep and recovery from Apple Watch, and Kai, a coach who reads your day.",
  robots: { index: false },
};

const APP = "https://apps.apple.com/app/zen-lean-calorie-tracker/id6763917700";

/* ---------- Data: every number below is from MARKETING.md; every callout was measured on the PNG. ---------- */

const HERO: Callout[] = [
  { n: 1, x: 72, y: 7.2, label: "Fast in progress, 14 of 16 h", side: "right" },
  { n: 2, x: 3.5, y: 18.2, label: "Kai's note on your week", side: "left" },
  { n: 3, x: 3.5, y: 26.6, label: "How you feel, against Recovery", side: "left" },
  { n: 4, x: 85.4, y: 52.6, label: "Sleep score, 77% of need", side: "right" },
  { n: 5, x: 3.5, y: 60.3, label: "Asleep, in bed, efficiency", side: "left" },
  { n: 6, x: 3.5, y: 67.5, label: "Kai's line on each card", side: "left" },
  { n: 7, x: 85.4, y: 77.7, label: "Activity, 40% of targets", side: "right" },
]

const PILLARS: {
  fig: string; title: string; shot: string; alt: string; crop: [number, number];
  calls: Callout[]; spec: [string, string][];
}[] = [
  {
    fig: "02", title: "Food from a photo", shot: "meals", crop: [0.15, 0.71],
    alt: "Zen Lean Meals screen: 1,708 kcal left today with 380 eaten of a 2,088 budget, protein, carbs, fat and fibre against targets, 3 of 8 glasses of water and a logged oatmeal bowl photo of 380 kcal.",
    calls: [
      { n: 1, x: 2, y: 18.9, label: "Left today, live" },
      { n: 2, x: 2, y: 36.2, label: "Protein, carbs, fat, fibre" },
      { n: 3, x: 2, y: 47.2, label: "Water, 3 of 8 glasses" },
      { n: 4, x: 2, y: 68.4, label: "A photo meal, 380 kcal" },
    ],
    spec: [["Photo analyses", "10 a day"], ["Values returned", "kcal, P, C, F, fibre"], ["Before saving", "check and adjust"]],
  },
  {
    fig: "03", title: "Fasting", shot: "fasting", crop: [0.06, 0.62],
    alt: "Zen Lean Fasting screen: a 16:8 fast with 01:56:39 remaining, fat burn rising, and a stage bar from start to goal 16 h.",
    calls: [
      { n: 1, x: 97.5, y: 8.8, label: "16:8 or your own window" },
      { n: 2, x: 2, y: 16.8, label: "Time remaining" },
      { n: 3, x: 2, y: 27.1, label: "Stages, start to goal" },
      { n: 4, x: 2, y: 55, label: "Kai's line during the fast" },
    ],
    spec: [["Schedules", "16:8 or your own"], ["Start from", "iPhone or Watch"], ["Shown", "stage by hour"]],
  },
  {
    fig: "04", title: "Sleep and recovery", shot: "heart", crop: [0.17, 0.73],
    alt: "Zen Lean Heart and Fitness Age cards: resting heart rate 56 bpm running high, latest 55 bpm in today's range, Kai's note on movement and sleep tonight, and a Fitness Age of 31.",
    calls: [
      { n: 1, x: 97.5, y: 23.5, label: "Resting heart rate, against your range" },
      { n: 2, x: 2, y: 38.6, label: "Kai's read of the day" },
      { n: 3, x: 97.5, y: 48.2, label: "Fitness Age, FRIEND registry" },
      { n: 4, x: 2, y: 63.4, label: "8 weekly readings, dashed line is your age" },
    ],
    spec: [["Reads", "sleep, RHR, HRV"], ["Compared with", "your own baseline"], ["Extra device", "none"]],
  },
  {
    fig: "05", title: "Movement", shot: "activity", crop: [0.21, 0.58],
    alt: "Zen Lean Activity screen: 1,075 kcal moved today, past a 500 kcal move goal, move, exercise and stand rings, 22.5k steps, Fitness Age 31, and 51 bpm resting with 52 ms HRV.",
    calls: [
      { n: 1, x: 2, y: 23.5, label: "Moved today" },
      { n: 2, x: 2, y: 39.8, label: "Move, exercise and stand rings" },
      { n: 3, x: 2, y: 55.2, label: "Resting heart rate and HRV" },
    ],
    spec: [["Exercise credit", "65%"], ["Daily credit cap", "900 kcal"], ["Workout kcal", "Keytel 2005"]],
  },
  {
    fig: "06", title: "Water", shot: "water", crop: [0.43, 0.76],
    alt: "Zen Lean Water sheet: 38% and on pace, quick add buttons for 150, 250 and 500 ml, a day timeline from 8 AM to 10 PM, and reminders every 2 hours.",
    calls: [
      { n: 1, x: 34, y: 45.9, label: "On pace for the day" },
      { n: 2, x: 2, y: 53.1, label: "Tap a glass: 150, 250 or 500 ml" },
      { n: 3, x: 2, y: 71.7, label: "Reminders only in your hours" },
    ],
    spec: [["Log", "one tap a glass"], ["Shows", "on pace or behind"], ["Reminders", "only in your window"]],
  },
  {
    fig: "07", title: "Morning check-in", shot: "checkin", crop: [0.13, 0.47],
    alt: "Zen Lean check-in sheet: energy good, body okay, mood good, and a card saying it is still learning what a normal morning looks like, which takes about two weeks.",
    calls: [
      { n: 1, x: 2, y: 18.2, label: "Energy, body, mood: three taps" },
      { n: 2, x: 2, y: 26.7, label: "Learning your normal" },
      { n: 3, x: 2, y: 39.3, label: "Saved, not judged, for two weeks" },
    ],
    spec: [["Taps", "3"], ["Learns your normal", "about 2 weeks"], ["Rewrites Recovery", "never"]],
  },
];

const RULES: { id: string; name: string; value: string; unit: string; why: string }[] = [
  { id: "R-01", name: "Calorie floor", value: "1,200 / 1,500", unit: "kcal, women / men", why: "Your target never goes below this, whatever pace you pick." },
  { id: "R-02", name: "Deficit cap", value: "1,200", unit: "kcal a day", why: "The gap between what you burn and what you eat has a ceiling." },
  { id: "R-03", name: "Pace cap", value: "1", unit: "kg a week", why: "The fastest pace the app will plan for. Slower is allowed." },
  { id: "R-04", name: "Exercise credit", value: "65%", unit: "capped at 900 kcal a day", why: "Wearables over-count burned calories, so only part is added back." },
  { id: "R-05", name: "Own baseline", value: "You", unit: "not a population average", why: "Your sleep and heart are read against your normal, not someone else's." },
  { id: "R-06", name: "No baseline, no score", value: "None", unit: "until a baseline exists", why: "It refuses to publish a score rather than invent one." },
  { id: "R-07", name: "Short night", value: "Low", unit: "confidence, still scored", why: "A short night counts, marked with lower confidence, not thrown away." },
];

const KAI: Callout[] = [
  { n: 1, x: 2, y: 18.2, label: "Kai's note, grounded in the week" },
  { n: 2, x: 2, y: 26.6, label: "How you feel, against Recovery 66" },
];

const TARGETS: Callout[] = [
  { n: 1, x: 64, y: 24.4, label: "Daily target", side: "right" },
  { n: 2, x: 95, y: 39.1, label: "Grams and kcal per macro", side: "right" },
  { n: 3, x: 87, y: 65.5, label: "Rest-day target from your pace", side: "right" },
];

const METHODS: { name: string; src: string; use: string; inputs: string }[] = [
  { name: "Mifflin-St Jeor", src: "Resting energy", use: "Your BMR and daily calorie target", inputs: "sex, age, height, weight, activity" },
  { name: "Karvonen", src: "Heart-rate reserve", use: "Heart rate zones for workouts", inputs: "resting and maximum heart rate" },
  { name: "FRIEND registry", src: "Fitness reference", use: "Fitness Age", inputs: "fitness estimate, age, sex" },
  { name: "Keytel 2005", src: "Heart-rate energy", use: "Calories burned in a workout", inputs: "heart rate, weight, age, sex" },
  { name: "WHO BMI cutoffs", src: "Classification", use: "BMI category on your profile", inputs: "height, weight" },
  { name: "Helgerud 2007", src: "Interval protocol", use: "The 4×4 interval workout", inputs: "four 4-minute intervals" },
];

const GUIDES: { n: string; title: string; slug: string; topic: string; min: number }[] = [
  { n: "G-01", title: "How many calories should I eat?", slug: "how-many-calories-should-i-eat", topic: "Calories", min: 9 },
  { n: "G-02", title: "16:8 intermittent fasting, hour by hour", slug: "16-8-intermittent-fasting", topic: "Fasting", min: 8 },
  { n: "G-03", title: "What is HRV, and what moves it?", slug: "what-is-hrv", topic: "Recovery", min: 7 },
  { n: "G-04", title: "How to run a calorie deficit safely", slug: "calorie-deficit-safely", topic: "Calories", min: 10 },
  { n: "G-05", title: "Can you count calories from a photo?", slug: "count-calories-from-a-photo", topic: "Food logging", min: 6 },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "How does Zen Lean set my calorie target?",
    a: "It estimates your resting energy with Mifflin-St Jeor, multiplies it by your activity level, then subtracts a deficit for the pace you choose. The target never drops below 1,200 kcal for women or 1,500 kcal for men, the deficit is capped at 1,200 kcal a day and the pace at 1 kg a week.",
  },
  {
    q: "How does logging a meal from a photo work?",
    a: "Take a photo of your plate and Zen Lean returns calories, protein, carbs, fat and fibre for you to check and adjust before saving. You get ten photo analyses a day.",
  },
  {
    q: "Do I need an Apple Watch?",
    a: "Food, fasting and water work on iPhone. Sleep, resting heart rate, HRV and recovery are read from Apple Health or Google Health (Beta), so they need a device that records them, such as the Apple Watch you already wear. There is no second wearable to buy.",
  },
  {
    q: "Can I chat with Kai?",
    a: "No. Kai reads your food, fasting, sleep and movement and writes a short note grounded in those numbers. There is no chat, no guilt and no cheerleading.",
  },
  {
    q: "How much does Zen Lean cost?",
    a: "Zen Lean is free to download. A subscription is required after setup, monthly or yearly. The current price is shown in the App Store for your region.",
  },
  {
    q: "What happens to my data?",
    a: "There are no ads and your data is never sold. Anonymous usage stats can be switched off. Delete your account and everything goes with it.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Zen Lean",
    operatingSystem: "iOS",
    applicationCategory: "HealthApplication",
    description:
      "A calorie tracker for iPhone and Apple Watch with AI photo logging, intermittent fasting, sleep and recovery from Apple Health, and Kai, a coach who writes a short daily note.",
    url: "https://thezenlean.com",
    downloadUrl: APP,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

function SectionHead({ no, kicker, title, lede, id }: { no: string; kicker: string; title: string; lede?: string; id: string }) {
  return (
    <header className={s.sHead}>
      <p className={s.sNo}>
        <span>§ {no}</span>
        <span>{kicker}</span>
      </p>
      <h2 id={id} className={s.h2}>{title}</h2>
      {lede && <p className={s.lede}>{lede}</p>}
    </header>
  );
}

function StoreButton({ big }: { big?: boolean }) {
  return (
    <a className={`${s.btn} ${big ? s.btnBig : ""}`} href={APP} rel="noopener">
      <svg viewBox="0 0 14 17" width="13" height="16" aria-hidden="true">
        <path fill="currentColor" d="M11.6 9c0-2 1.7-3 1.8-3-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.2.8-.6 0-1.6-.7-2.7-.7C3 4.5 1.7 5.3 1 6.6c-1.5 2.6-.4 6.4 1 8.5.7 1 1.6 2.2 2.7 2.1 1-.1 1.5-.7 2.7-.7s1.6.7 2.7.7c1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.4 0 0-2.1-.8-2.1-3.8ZM9.6 3c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.6 1.3-.5.6-1 1.6-.9 2.6 1 .1 2-.5 2.6-1.2Z" />
      </svg>
      Download on the App Store
    </a>
  );
}

export default function VariationC() {
  return (
    <div className={`${s.root} ${sans.variable} ${mono.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a className={s.skip} href="#main">Skip to content</a>

      {/* ---------- Nav ---------- */}
      <header className={s.top}>
        <nav className={s.nav} aria-label="Main">
          <a className={s.brand} href="/v/c">
            <img src="/icon-512.png" alt="" width={28} height={28} />
            <span>Zen Lean</span>
            <em className={s.brandTag}>Field guide</em>
          </a>
          <ul className={s.navLinks}>
            <li><a href="/features">Features</a></li>
            <li><a href="/how-it-works">How it works</a></li>
            <li><a href="/science">Science</a></li>
            <li><a href="/guides">Guides</a></li>
            <li><a href="/tools/calorie-calculator">Calorie calculator</a></li>
            <li><a href="/support">Support</a></li>
          </ul>
          <a className={s.navCta} href={APP} rel="noopener">Download</a>
        </nav>
      </header>

      <main id="main">
        {/* ---------- Hero ---------- */}
        <section className={`${s.hero} ${s.gridBg}`} aria-labelledby="h1">
          <div className={s.wrap}>
            <p className={s.meta}>
              <span>ZL / FIG. 01</span>
              <span>iPhone + Apple Watch</span>
              <span>iOS 17+</span>
              <span>Rev. Nov 2026</span>
            </p>
            <div className={s.heroGrid}>
              <div className={s.heroText}>
                <h1 id="h1" className={s.h1}>
                  The calorie tracker that <span>shows its working.</span>
                </h1>
                <p className={s.heroSub}>
                  Food, fasting, sleep and movement in one calm daily picture. Kai reads all of it and writes you a
                  short note each morning: how you are today, and what to do about it. Every number below is a rule
                  the app actually follows.
                </p>
                <div className={s.ctaRow}>
                  <StoreButton />
                  <span className={s.ctaNote}>Monthly or yearly subscription</span>
                </div>

                <dl className={s.stats}>
                  <div><dt>Calorie floor, women</dt><dd>1,200<small>kcal</small></dd></div>
                  <div><dt>Calorie floor, men</dt><dd>1,500<small>kcal</small></dd></div>
                  <div><dt>Max deficit</dt><dd>1,200<small>kcal/day</small></dd></div>
                  <div><dt>Max pace</dt><dd>1<small>kg/week</small></dd></div>
                  <div><dt>Exercise credit</dt><dd>65<small>%</small></dd></div>
                  <div><dt>Photo analyses</dt><dd>10<small>a day</small></dd></div>
                </dl>
              </div>

              <figure className={s.heroFig}>
                <Reg />
                <p className={s.figTag}>FIG. 01 · Insights, the daily picture</p>
                <Shot
                  shot="insights"
                  priority
                  alt="Zen Lean Insights screen: a 23 day meal-log streak, a fast at 14 of 16 hours, Kai's note that calories ran high several days this week, a sleep score of 77 at 77% of need, and activity at 40% of daily targets."
                  callouts={HERO}
                />
                <figcaption className={s.figCap}>
                  <Legend callouts={HERO} />
                  <p>Real screen, Sunday 15 Nov. One scroll answers how you are today, and Kai says what to do about it.</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ---------- Calculator ---------- */}
        <section className={s.instrument} aria-labelledby="calc-h">
          <div className={s.wrap}>
            <div className={s.instGrid}>
              <div className={s.instHead}>
                <p className={s.sNo}><span>§ 00</span><span>Instrument</span></p>
                <h2 id="calc-h" className={s.h2}>Work out your calories, with the working shown.</h2>
                <p className={s.lede}>
                  The same formula and the same limits Zen Lean uses to set your first target. Change any input and
                  every line of the sum updates.
                </p>
                <ul className={s.instList}>
                  <li><span>Formula</span>Mifflin-St Jeor</li>
                  <li><span>Activity</span>standard multipliers, 1.2 to 1.9</li>
                  <li><span>Limits</span>floor, 1,200 kcal deficit cap, 1 kg a week</li>
                </ul>
              </div>
              <div className={s.instBody}>
                <Reg />
                <Calculator />
              </div>
            </div>
          </div>
        </section>

        {/* ---------- What it measures ---------- */}
        <section className={s.section} aria-labelledby="measures-h" id="features">
          <div className={s.wrap}>
            <SectionHead
              no="01"
              kicker="What it measures"
              id="measures-h"
              title="Four pillars, water and a check-in, all on one day."
              lede="Each plate below is a real screen from the app, cropped and annotated. The spec under it is what the app actually does, not a promise."
            />
            <div className={s.pillars}>
              {PILLARS.map((p) => (
                <article key={p.fig} className={s.pillar}>
                  <p className={s.figTag}>FIG. {p.fig}</p>
                  <h3 className={s.h3}>{p.title}</h3>
                  <Shot shot={p.shot} alt={p.alt} crop={p.crop} callouts={p.calls} variant="plate" />
                  <Legend callouts={p.calls} />
                  <dl className={s.spec}>
                    {p.spec.map(([k, v]) => (
                      <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- The rules ---------- */}
        <section className={`${s.section} ${s.sectionAlt}`} aria-labelledby="rules-h" id="how-it-works">
          <div className={s.wrap}>
            <SectionHead
              no="02"
              kicker="The rules"
              id="rules-h"
              title="Seven rules the app will not break."
              lede="Most trackers hide their limits. These are ours, written down, with the reason for each."
            />
            <div className={s.rulesGrid}>
              <table className={s.rules}>
                <caption className={s.srOnly}>Zen Lean's calorie and scoring rules</caption>
                <thead>
                  <tr><th scope="col">No.</th><th scope="col">Rule</th><th scope="col">Value</th><th scope="col">Why</th></tr>
                </thead>
                <tbody>
                  {RULES.map((r) => (
                    <tr key={r.id}>
                      <td className={s.rId}>{r.id}</td>
                      <th scope="row" className={s.rName}>{r.name}</th>
                      <td className={s.rVal}><b>{r.value}</b><small>{r.unit}</small></td>
                      <td className={s.rWhy}>{r.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <figure className={s.rulesFig}>
                <Reg />
                <p className={s.figTag}>FIG. 08 · Goals and macros</p>
                <Shot
                  shot="targets"
                  alt="Zen Lean Goals and macros card: a daily calorie target of 1,784 kcal split into protein 116 g, carbs 206 g, fat 55 g and fibre 28 g, with a note that it is a rest-day target from your pace."
                  callouts={TARGETS}
                  crop={[0, 0.715]}
                />
                <figcaption className={s.figCap}>
                  <Legend callouts={TARGETS} />
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ---------- Methods ---------- */}
        <section className={s.section} aria-labelledby="methods-h" id="science">
          <div className={s.wrap}>
            <SectionHead
              no="03"
              kicker="Methods"
              id="methods-h"
              title="Named formulas, not a black box."
              lede="Where a number comes from a published method, we say which one. You can look each of them up."
            />
            <div className={s.tableWrap}>
              <table className={s.methods}>
                <caption className={s.srOnly}>Formulas Zen Lean uses and what for</caption>
                <thead>
                  <tr><th scope="col">M</th><th scope="col">Method</th><th scope="col">Kind</th><th scope="col">Used in the app for</th><th scope="col">Inputs</th></tr>
                </thead>
                <tbody>
                  {METHODS.map((m, i) => (
                    <tr key={m.name}>
                      <td className={s.rId}>M-{String(i + 1).padStart(2, "0")}</td>
                      <th scope="row">{m.name}</th>
                      <td className={s.kind}>{m.src}</td>
                      <td>{m.use}</td>
                      <td className={s.inputs}>{m.inputs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ---------- Kai ---------- */}
        <section className={`${s.section} ${s.kaiSec}`} aria-labelledby="kai-h" id="kai">
          <div className={s.wrap}>
            <SectionHead
              no="04"
              kicker="Kai, the coach"
              id="kai-h"
              title="Kai reads, then writes."
              lede="Kai is not a chat window. Every morning Kai reads what you ate, how you fasted, slept and moved, and writes a short note grounded in those numbers. No guilt, no cheerleading."
            />
            <div className={s.kaiGrid}>
              <ol className={s.inputs4} aria-label="What Kai reads">
                <li><i style={{ background: "var(--sig-nutrition)" }} /><span>IN-1</span>Food<small>kcal, protein, carbs, fat, fibre</small></li>
                <li><i style={{ background: "var(--sig-energy)" }} /><span>IN-2</span>Fasting<small>window, hours, stage</small></li>
                <li><i style={{ background: "var(--sig-sleep)" }} /><span>IN-3</span>Sleep and recovery<small>sleep, resting HR, HRV, baseline</small></li>
                <li><i style={{ background: "var(--sig-activity)" }} /><span>IN-4</span>Movement<small>moved today, day load, workouts</small></li>
              </ol>
              <div className={s.wires} aria-hidden="true">
                <svg viewBox="0 0 120 400" preserveAspectRatio="none">
                  {[50, 150, 250, 350].map((y) => (
                    <path key={y} d={`M0 ${y} C 60 ${y}, 60 200, 120 200`} />
                  ))}
                </svg>
              </div>
              <div className={s.note}>
                <Reg />
                <p className={s.figTag}>OUT · Kai&apos;s note, as written in the app</p>
                <p className={s.noteText}>&ldquo;You moved well, but calories ran high several days this week. Small portions can close the gap.&rdquo;</p>
                <dl className={s.spec}>
                  <div><dt>Format</dt><dd>a short note</dd></div>
                  <div><dt>Chat</dt><dd>none</dd></div>
                  <div><dt>Tone</dt><dd>reports, never nags</dd></div>
                  <div><dt>No data</dt><dd>says it is waiting</dd></div>
                </dl>
              </div>
              <figure className={s.kaiFig}>
                <p className={s.figTag}>FIG. 09 · Kai on Insights</p>
                <Shot
                  shot="insights"
                  crop={[0.13, 0.32]}
                  variant="plate"
                  alt="Kai's note on the Zen Lean Insights screen: you moved well, but calories ran high several days this week, followed by a check-in card learning your normal, energy 4 of 5 against Recovery 66."
                  callouts={KAI}
                />
                <Legend callouts={KAI} />
              </figure>
            </div>
          </div>
        </section>

        {/* ---------- Watch + Health ---------- */}
        <section className={`${s.section} ${s.sectionAlt}`} aria-labelledby="health-h" id="apple-watch">
          <div className={s.wrap}>
            <SectionHead
              no="05"
              kicker="Apple Watch and Health"
              id="health-h"
              title="Uses the watch you already own."
              lede="No second device and no second subscription for a wearable. Zen Lean reads what your watch already records."
            />
            <div className={s.ioGrid}>
              <div className={s.io}>
                <h3 className={s.ioHead}><span>READ</span>From Apple Health or Google Health (Beta)</h3>
                <ul>
                  <li><i style={{ background: "var(--sig-sleep)" }} />Sleep</li>
                  <li><i style={{ background: "var(--sig-heart)" }} />Resting heart rate</li>
                  <li><i style={{ background: "var(--sig-recovery)" }} />Heart rate variability</li>
                  <li><i style={{ background: "var(--sig-activity)" }} />Steps, active energy, workouts</li>
                </ul>
                <p className={s.ioFoot}>Turned into recovery, readiness, Fitness Age and day strain.</p>
              </div>
              <div className={s.io}>
                <h3 className={s.ioHead}><span>WRITE</span>Back to Apple Health</h3>
                <ul>
                  <li><i style={{ background: "var(--sig-nutrition)" }} />Dietary energy from meals you log</li>
                </ul>
                <p className={s.ioFoot}>That is the only thing written back. Everything else is read only.</p>
              </div>
              <div className={s.io}>
                <h3 className={s.ioHead}><span>WATCH</span>On your wrist</h3>
                <ul>
                  <li><i style={{ background: "var(--sig-energy)" }} />Start a fast</li>
                  <li><i style={{ background: "var(--sig-sleep)" }} />Records the sleep and heart data Zen Lean reads</li>
                </ul>
                <p className={s.ioFoot}>Meals and water are logged on iPhone.</p>
              </div>
              <figure className={s.ioFig}>
                <p className={s.figTag}>FIG. 10 · Health sources</p>
                <Shot
                  shot="sources"
                  crop={[0.19, 0.5]}
                  variant="plate"
                  alt="Zen Lean Health sources settings: Apple Health switched on with Manage permissions, and Google Health marked Beta."
                  callouts={[
                    { n: 1, x: 2, y: 26.5, label: "Apple Health" },
                    { n: 2, x: 2, y: 40, label: "Google Health, Beta" },
                  ]}
                />
                <Legend callouts={[{ n: 1, x: 2, y: 26.5, label: "Apple Health" }, { n: 2, x: 2, y: 40, label: "Google Health, Beta" }]} />
              </figure>
            </div>
          </div>
        </section>

        {/* ---------- Privacy ---------- */}
        <section className={s.section} aria-labelledby="privacy-h" id="privacy">
          <div className={s.wrap}>
            <div className={s.privGrid}>
              <SectionHead no="06" kicker="Privacy" id="privacy-h" title="What happens to your data." />
              <dl className={s.priv}>
                <div><dt>P-01</dt><dd><b>Ads</b>None.</dd></div>
                <div><dt>P-02</dt><dd><b>Selling data</b>Never.</dd></div>
                <div><dt>P-03</dt><dd><b>Usage stats</b>Anonymous, and you can switch them off.</dd></div>
                <div><dt>P-04</dt><dd><b>Delete account</b>Everything goes with it.</dd></div>
              </dl>
            </div>
          </div>
        </section>

        {/* ---------- Guides ---------- */}
        <section className={`${s.section} ${s.sectionAlt}`} aria-labelledby="guides-h" id="guides">
          <div className={s.wrap}>
            <SectionHead
              no="07"
              kicker="Guides"
              id="guides-h"
              title="The field guide, chapter by chapter."
              lede="Plain answers to the questions people ask before they start tracking, written to the same standard as the app."
            />
            <ol className={s.guides}>
              {GUIDES.map((g) => (
                <li key={g.slug}>
                  <a href={`/guides/${g.slug}`}>
                    <span className={s.gNo}>{g.n}</span>
                    <span className={s.gTitle}>{g.title}</span>
                    <span className={s.gTopic}>{g.topic}</span>
                    <span className={s.gMin}>{g.min} min read</span>
                    <span className={s.gArrow} aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ol>
            <p className={s.more}><a href="/guides">All guides →</a></p>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className={s.section} aria-labelledby="faq-h" id="faq">
          <div className={s.wrap}>
            <div className={s.faqGrid}>
              <div className={s.faqSide}>
                <SectionHead no="08" kicker="Questions" id="faq-h" title="Asked and answered." />
                <p className={s.faqNote}>
                  Not covered here? Write to <a href="mailto:hello@thezenlean.com">hello@thezenlean.com</a>, or read the{" "}
                  <a href="/support">support pages</a>.
                </p>
              </div>
              <div className={s.faq}>
                {FAQ.map((f, i) => (
                  <details key={f.q} open={i === 0}>
                    <summary>
                      <span className={s.rId}>Q-{String(i + 1).padStart(2, "0")}</span>
                      <span>{f.q}</span>
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Closing CTA ---------- */}
        <section className={`${s.close} ${s.gridBg}`} aria-labelledby="close-h">
          <div className={s.wrap}>
            <Reg />
            <p className={s.sNo}><span>§ 09</span><span>End of guide</span></p>
            <h2 id="close-h" className={s.closeH}>One calm picture of your day. The working, included.</h2>
            <div className={s.ctaRow}>
              <StoreButton big />
              <span className={s.ctaNote}>Free to download · Monthly or yearly subscription · iOS 17+</span>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer sitemap ---------- */}
      <footer className={s.foot}>
        <div className={s.wrap}>
          <div className={s.footGrid}>
            <div className={s.footBrand}>
              <a className={s.brand} href="/v/c">
                <img src="/icon-512.png" alt="Zen Lean app icon" width={28} height={28} />
                <span>Zen Lean</span>
              </a>
              <p>A calm calorie tracker for iPhone and Apple Watch.</p>
            </div>
            <nav aria-label="Features">
              <h2 className={s.footH}>Features</h2>
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
              <h2 className={s.footH}>Learn</h2>
              <ul>
                <li><a href="/guides">Guides</a></li>
                <li><a href="/science">Science</a></li>
                <li><a href="/tools/calorie-calculator">Calorie calculator</a></li>
              </ul>
            </nav>
            <nav aria-label="Company">
              <h2 className={s.footH}>Company</h2>
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/support">Support</a></li>
                <li><a href="/privacy">Privacy</a></li>
                <li><a href="/terms">Terms</a></li>
                <li><a href="mailto:hello@thezenlean.com">hello@thezenlean.com</a></li>
              </ul>
            </nav>
          </div>
          <p className={s.copy}>
            <span>© 2026 Zen Products</span>
            <span>Zen Lean is not a medical device. Estimates are not medical advice.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
