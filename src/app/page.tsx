import Image from "next/image";
import { Experience } from "@/components/Experience";
import { StoreButton } from "@/components/Phone";
import { Ph } from "@/components/icons";
import { ActivityCard, CheckinCard, FastCard, KaiCard, MealCard, Ring, SleepCard, WaterCard } from "@/components/Cards";

// One day under the app's own sky (the governing idea of the films and the store screenshots).
// Every claim is checked against the app repo's MARKETING.md §4, §8 and §11; numbers on the cards are
// the ones on the 15 Nov 2026 captures.
const MOMENTS = [
  { id: "sleep", time: "5:52 AM", accent: "var(--sleep)", title: "Your night, read before you are up.",
    body: "Sleep, resting heart rate and recovery arrive from your Watch, measured against your own normal. Until Zen Lean knows your normal, it shows no score at all." },
  { id: "checkin", time: "7:05 AM", accent: "var(--trend)", title: "Tell it how you feel.",
    body: "Three taps: energy, body, mood. Over two weeks it learns what a normal morning looks like for you." },
  { id: "meals", time: "8:30 AM", accent: "var(--nutrition)", title: "Breakfast, counted from a photo.",
    body: "Photograph your plate and get calories, protein, carbs, fat and fibre to check and adjust. Up to ten photos a day." },
  { id: "water", time: "12:40 PM", accent: "var(--water)", title: "Water, at your own pace.",
    body: "Tap a glass and see whether you are on pace. Reminders every two hours, only between the times you choose." },
  { id: "activity", time: "4:15 PM", accent: "var(--heart)", title: "Movement, counted honestly.",
    body: "Steps, workouts and active energy from your Watch. Exercise calories are credited at 65% and capped, because wearables over-count." },
  { id: "fasting", time: "8:00 PM", accent: "var(--energy)", title: "Your fast, stage by stage.",
    body: "Start a 16:8 or your own window from your iPhone or Watch, and watch the stages pass." },
  { id: "kai", time: "9:30 PM", accent: "var(--recovery)", title: "Kai has read your whole day.",
    body: "Kai reads your food, fasting, sleep and movement together and writes you a short note grounded in your own numbers. No guilt, no cheerleading." },
] as const;

const PRINCIPLES = [
  { icon: "scales" as const, color: "var(--nutrition)", title: "A plan you can live with", body: "Your target never drops below 1,200 kcal for women or 1,500 kcal for men. The deficit is capped at 1,200 kcal a day and the pace at 1 kg a week." },
  { icon: "pulse" as const, color: "var(--recovery)", title: "Your normal, not an average", body: "Recovery and readiness compare you with you. A short night is scored with lower confidence instead of being thrown away." },
  { icon: "sun" as const, color: "var(--sun-b)", title: "Reports, never nags", body: "No badges and no shame. A calm picture of the day, with one useful next step." },
  { icon: "eye" as const, color: "var(--trend)", title: "Your data is yours", body: "No ads, no selling of data. Usage statistics are anonymous and can be switched off. Delete your account and everything goes." },
];

export default function Home() {
  return (
    <Experience>
      <div className="sky-stage" aria-hidden="true">
        {(["night", "morning", "afternoon", "evening"] as const).map((n) => (
          <div key={n} className="sky-layer" data-sky={n} style={{ backgroundImage: `url(/sky/${n}.webp)` }} />
        ))}
        <canvas className="stars" />
        <div className="sun" />
        <div className="sky-shade" />
      </div>

      <header className="nav">
        <a href="#top" className="brand"><Image src="/icon-512.png" alt="" width={34} height={34} /><span>Zen Lean</span></a>
        <StoreButton label="Download" />
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">For iPhone and Apple Watch</p>
            <h1>Your whole day,<br />in one calm picture.</h1>
            <p className="lede">Food, fasting, sleep and movement in one place, and Kai, a coach who reads it all.</p>
            <div className="cta-row"><StoreButton /><span className="fine">Monthly or yearly subscription</span></div>
          </div>
          <div className="float f1"><div className="float-inner mini"><Ring pct={0.77} color="#39ff8a" hook="hero-sleep" size={54} width={11}><b>77</b></Ring><div><small>Sleep</small><b>Good</b></div></div></div>
          <div className="float f2"><div className="float-inner mini"><span className="mini-icon" style={{ color: "var(--nutrition)" }}><Ph i="forkKnife" /></span><div><small>Left today</small><b>1,708 kcal</b></div></div></div>
          <div className="float f3"><div className="float-inner mini"><Ring pct={0.88} color="#ff9f43" hook="hero-fast" size={54} width={11}><Ph i="clock" /></Ring><div><small>Fasting</small><b>14h 02m</b></div></div></div>
          <a href="#day" className="scroll-hint">Scroll through a day</a>
        </section>

        <section className="day" id="day">
          <div className="day-left">
            <ol className="dayline" aria-hidden="true">
              <span className="dayline-track"><span className="dayline-fill" /></span>
              {MOMENTS.map((m) => <li key={m.id}><span className="dl-dot" />{m.time}</li>)}
            </ol>
            <div className="moment-texts">
              {MOMENTS.map((m) => (
                <div key={m.id} className="moment-text" data-text={m.id} style={{ ["--accent" as string]: m.accent }}>
                  <p className="time"><span className="dot" />{m.time}</p>
                  <h2>{m.title}</h2>
                  <p>{m.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="stage">
            <SleepCard /><CheckinCard /><MealCard /><WaterCard /><ActivityCard /><FastCard /><KaiCard />
          </div>
        </section>

        <div className="after">
          <section className="principles">
            <h2 data-reveal>Built to be calm.</h2>
            <p className="lede center" data-reveal>Most calorie counters feel like spreadsheets. Zen Lean gives you one calm daily picture and a coach who has actually read your data.</p>
            <div className="principles-grid">
              {PRINCIPLES.map((p) => (
                <article key={p.title} className="principle" style={{ ["--accent" as string]: p.color }}>
                  <span className="p-icon"><Ph i={p.icon} /></span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="widgets">
            <div className="widgets-copy" data-reveal>
              <h2>Your day, without opening the app.</h2>
              <p className="lede">Ten widgets for the Home and Lock Screen. The Water widget logs a glass right there. Live Activities follow a running fast or workout, and your Watch starts either one from your wrist.</p>
              <ul className="sources-list">
                <li><b>Apple Health</b> for sleep, heart, workouts and weight.</li>
                <li><b>Google Health</b>, in beta, with every reading labelled by its source.</li>
              </ul>
            </div>
            <div className="widget-wall" aria-hidden="true">
              <div className="widget w-water"><small><Ph i="drop" /> Water</small><b>750<i> ml</i></b><div className="w-glass"><span /></div><span className="w-btn">+ 250 ml</span></div>
              <div className="widget w-fast"><Ring pct={0.88} color="#ff9f43" hook="w-fast" size={84} width={12}><b>14h</b></Ring><small>Fasting · 16:8</small></div>
              <div className="widget w-meals wide"><small><Ph i="forkKnife" /> Meals</small><b>1,708<i> kcal left</i></b>
                <div className="w-macros">{[["#15803d", 7], ["#d97706", 27], ["#f472b6", 19], ["#a78bfa", 27]].map(([c, w], i) => <span key={i}><span style={{ width: `${w}%`, background: c as string }} /></span>)}</div></div>
              <div className="widget w-sleep"><Ring pct={0.77} color="#39ff8a" hook="w-sleep" size={84} width={12}><b>77</b></Ring><small>Sleep · 5h 51m</small></div>
              <div className="widget w-weight"><small><Ph i="scales" /> Weight</small><b>72.8<i> kg</i></b><span className="w-delta">−1.4 kg</span></div>
              <div className="widget w-move"><Ring pct={1} color="#ff3d9a" hook="w-move" size={84} width={12}><b>1,075</b></Ring><small>Move · kcal</small></div>
            </div>
          </section>

          <section className="finale">
            <Image src="/icon-512.png" alt="Zen Lean app icon" width={120} height={120} className="finale-icon" />
            <h2 data-reveal>Tomorrow starts with one calm picture.</h2>
            <div data-reveal><StoreButton /></div>
            <p className="fine" data-reveal>iPhone with iOS 17 or later. Apple Watch optional. Subscription required after setup.</p>
          </section>
        </div>
      </main>

      <footer className="foot">
        <p>Zen Lean is a wellness app, not a medical device. It does not diagnose or treat any condition.</p>
        <nav>
          <a href="https://www.zenproducts.ai/apps/zen-leantracker/privacy">Privacy</a>
          <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Terms</a>
          <a href="mailto:hello@thezenlean.com">hello@thezenlean.com</a>
        </nav>
        <p className="copy">© 2026 Zen Products · Breakfast photo by Ella Olsson, CC BY 2.0</p>
      </footer>
    </Experience>
  );
}
