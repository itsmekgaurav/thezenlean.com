import Image from "next/image";
import { SkyBackdrop } from "@/components/Sky";
import { Phone, StoreButton } from "@/components/Phone";

// One day, sunrise to night: the same governing idea as the App Store screenshots. Each moment is a
// real screen from the app at the hour it would be used, and the sky behind the page follows the
// clock. Every claim below is checked against MARKETING.md §4, §8 and §11.
const MOMENTS = [
  {
    id: "sleep", sky: "night", time: "5:52 AM", accent: "var(--sleep)", shot: "sleep",
    title: "Your night, read before you are up.",
    body: "Sleep, resting heart rate and recovery arrive from your Watch, measured against your own normal rather than a chart of strangers. Until Zen Lean knows your normal, it shows no score at all.",
    alt: "Today's activity screen showing sleep at 77% of need, with time asleep and efficiency",
  },
  {
    id: "checkin", sky: "morning", time: "7:05 AM", accent: "var(--recovery)", shot: "checkin",
    title: "Tell it how you feel.",
    body: "Three taps: energy, body, mood. Over the first two weeks it learns what a normal morning looks like for you, so the numbers start to mean something.",
    alt: "Morning check-in with energy, body and mood, and a note about learning your normal",
  },
  {
    id: "meals", sky: "morning", time: "8:30 AM", accent: "var(--nutrition)", shot: "meals",
    title: "Breakfast, counted from a photo.",
    body: "Photograph your plate and get calories, protein, carbs, fat and fibre to check and adjust. Up to ten photos a day, and the rest of your day's budget updates as you go.",
    alt: "Meals screen with 1,708 kcal left today and an oatmeal breakfast logged",
  },
  {
    id: "water", sky: "afternoon", time: "12:40 PM", accent: "var(--water)", shot: "water",
    title: "Water, at your own pace.",
    body: "Tap a glass and see whether you are on pace for the day. A gentle reminder every two hours, only between the times you choose, and never right after you have logged.",
    alt: "Water screen showing 750 ml of a 2.0 litre goal, 38% on pace",
  },
  {
    id: "activity", sky: "afternoon", time: "4:15 PM", accent: "var(--activity)", shot: "activity",
    title: "Movement, counted honestly.",
    body: "Steps, workouts and active energy come in from your Watch. Exercise calories are credited at 65% and capped each day, because wearables tend to over-count.",
    alt: "Activity screen with 1,075 kcal moved today, steps and fitness age",
  },
  {
    id: "fasting", sky: "evening", time: "8:00 PM", accent: "var(--energy)", shot: "fasting",
    title: "Your fast, stage by stage.",
    body: "Start a 16:8 or your own window from your iPhone or your Watch, then watch the hours pass: glycogen burn, switching fuel, fat burn rising.",
    alt: "Fasting screen counting down with the stages of the fast listed",
  },
  {
    id: "kai", sky: "night", time: "9:30 PM", accent: "var(--trend)", shot: "insights",
    title: "Kai has read your whole day.",
    body: "Kai is the coach inside Zen Lean. It reads your food, fasting, sleep and movement together and writes you a short note grounded in your own numbers. No guilt and no cheerleading.",
    alt: "Insights screen with a note from Kai linking movement, calories and recovery",
  },
] as const;

const PRINCIPLES = [
  { title: "A plan you can live with", body: "Your daily target never drops below 1,200 kcal for women or 1,500 kcal for men, the deficit is capped at 1,200 kcal a day, and the pace at 1 kg a week." },
  { title: "Your normal, not an average", body: "Recovery and readiness compare you with you. A short night is scored with lower confidence instead of being thrown away." },
  { title: "Reports, never nags", body: "No badges and no shame. A calm picture of the day, with one useful next step." },
  { title: "Your data is yours", body: "No ads and no selling of data. Usage statistics are anonymous and you can switch them off. Delete your account and everything goes." },
];

export default function Home() {
  return (
    <>
      <SkyBackdrop />
      <header className="nav">
        <a href="#top" className="brand">
          <Image src="/icon-512.png" alt="" width={34} height={34} />
          <span>Zen Lean</span>
        </a>
        <StoreButton label="Download" />
      </header>

      <main id="top">
        <section className="hero" data-sky="night">
          <div className="hero-copy">
            <p className="eyebrow">For iPhone and Apple Watch</p>
            <h1>Your whole day,<br />in one calm picture.</h1>
            <p className="lede">Food, fasting, sleep and movement in one place, and Kai, a coach who reads it all.</p>
            <div className="cta-row">
              <StoreButton />
              <span className="fine">Monthly or yearly subscription</span>
            </div>
          </div>
          <div className="hero-phones">
            <Phone shot="sleep" alt="Sleep and recovery screen" className="side left" />
            <Phone shot="meals" alt="Meals screen with calories left today" className="center" priority />
            <Phone shot="fasting" alt="Fasting countdown screen" className="side right" />
          </div>
          <a href="#sleep" className="scroll-hint">Follow a day with Zen Lean</a>
        </section>

        {MOMENTS.map((m, i) => (
          <section key={m.id} id={m.id} className={`moment${i % 2 ? " flip" : ""}`} data-sky={m.sky} style={{ ["--accent" as string]: m.accent }}>
            <div className="moment-copy">
              <p className="time"><span className="dot" />{m.time}</p>
              <h2>{m.title}</h2>
              <p>{m.body}</p>
            </div>
            <Phone shot={m.shot} alt={m.alt} />
          </section>
        ))}

        <section className="principles" data-sky="night" id="principles">
          <h2>Built to be calm.</h2>
          <p className="lede">Most calorie counters feel like spreadsheets. Zen Lean gives you one calm daily picture and a coach who has actually read your data.</p>
          <div className="cards">
            {PRINCIPLES.map((p) => (
              <article key={p.title} className="card">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="sources" data-sky="night">
          <div className="pair">
            <Phone shot="targets" alt="Goals and macros screen with a 1,784 kcal daily target" />
            <Phone shot="weight" alt="Body weight screen with a trend and recent logs" />
          </div>
          <div className="sources-copy">
            <h2>One picture, from everything you already wear.</h2>
            <ul>
              <li><b>Apple Health</b> for sleep, heart, workouts and weight.</li>
              <li><b>Google Health</b> as well, in beta, with every reading labelled by where it came from.</li>
              <li><b>Apple Watch</b> to start a fast or a workout from your wrist.</li>
              <li><b>Ten widgets</b> for the Home and Lock Screen, including one that logs a glass of water without opening the app.</li>
              <li><b>Live Activities</b> for a running fast or workout.</li>
            </ul>
          </div>
        </section>

        <section className="finale" data-sky="night">
          <Image src="/icon-512.png" alt="Zen Lean app icon" width={112} height={112} className="finale-icon" />
          <h2>Tomorrow starts with one calm picture.</h2>
          <StoreButton />
          <p className="fine">iPhone with iOS 17 or later. Apple Watch optional. Subscription required after setup.</p>
        </section>
      </main>

      <footer className="foot">
        <p>Zen Lean is a wellness app, not a medical device. It does not diagnose or treat any condition.</p>
        <nav>
          <a href="https://www.zenproducts.ai/apps/zen-leantracker/privacy">Privacy</a>
          <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Terms</a>
          <a href="mailto:hello@zenproducts.ai">hello@zenproducts.ai</a>
        </nav>
        <p className="copy">© 2026 Zen Products</p>
      </footer>
    </>
  );
}
