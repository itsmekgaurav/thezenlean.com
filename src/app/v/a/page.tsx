import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import type { CSSProperties } from "react";
import { EditionDate } from "./Dateline";
import s from "./page.module.css";

// Variation A, "The Morning Edition": Zen Lean as the one calm paper you read every morning,
// written overnight by Kai. Newspaper furniture is the artifact system; the real app screens are
// the photographs, cropped and captioned, never floated in a shadowed rounded card.

const serif = Fraunces({ subsets: ["latin"], axes: ["opsz", "SOFT"], style: ["normal", "italic"], variable: "--a-serif", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--a-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Zen Lean: calm calorie tracker for iPhone and Apple Watch",
  description:
    "A calorie tracker with AI photo logging, 16:8 fasting, and sleep and recovery from Apple Watch. Kai writes one calm, grounded note each morning.",
  robots: { index: false, follow: false },
};

const STORE = "https://apps.apple.com/app/zen-lean-calorie-tracker/id6763917700";

/* ---------- Photographs ---------- */

// Every screen is 1320 x 2868. A crop is given in source fractions (x0..x1 across, y0 down), so a
// caption can promise exactly what is visible: the frame shows the source from y0 for as far as
// the frame's aspect allows.
const SRC_RATIO = 2868 / 1320;

type Crop = { x0?: number; x1?: number; y0?: number; pos?: string };

function Shot({ name, alt, aspect, crop = {}, eager = false, className = "" }: {
  name: string; alt: string; aspect: number; crop?: Crop; eager?: boolean; className?: string;
}) {
  const { x0 = 0, x1 = 1, y0 = 0 } = crop;
  const w = 100 / (x1 - x0); // image width as % of frame width
  const hOfFrame = w * SRC_RATIO * aspect; // image height as % of frame height
  const style = {
    "--aspect": String(aspect),
    "--w": `${w}%`,
    "--left": `${-x0 * w}%`,
    "--top": `${-y0 * hOfFrame}%`,
  } as CSSProperties;
  return (
    <div className={`${s.photo} ${className}`} style={style}>
      <img
        src={`/shots/today/${name}-1320.webp`}
        srcSet={`/shots/today/${name}-660.webp 660w, /shots/today/${name}-1320.webp 1320w`}
        sizes="(max-width: 760px) 100vw, 50vw"
        alt={alt}
        width={1320}
        height={2868}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
      />
    </div>
  );
}

function Fig({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <figcaption className={s.caption}>
      <span className={s.figNo}>Fig. {n}</span> {children}
    </figcaption>
  );
}

function Kicker({ hue, children }: { hue?: string; children: React.ReactNode }) {
  return (
    <p className={s.kicker}>
      {hue && <span className={s.key} style={{ background: `var(--a-${hue})` }} aria-hidden="true" />}
      {children}
    </p>
  );
}

function StoreButton({ small = false }: { small?: boolean }) {
  return (
    <a className={`${s.store} ${small ? s.storeSmall : ""}`} href={STORE}>
      <span className={s.storePre}>Download on the</span>
      <span className={s.storeMain}>App Store</span>
    </a>
  );
}

/* ---------- Content ---------- */

const NAV = [
  ["Features", "/features"],
  ["How it works", "/how-it-works"],
  ["Science", "/science"],
  ["Guides", "/guides"],
  ["Support", "/support"],
] as const;

const EDITION = [
  {
    hue: "sleep", kicker: "Sleep and recovery", title: "Last night, scored against your own nights.",
    body: "Sleep, resting heart rate, HRV, recovery and readiness, from the Apple Watch you already wear. A short night counts, with lower confidence.",
    shot: "sleep", crop: { x0: 0, x1: 1, y0: 0.16 }, aspect: 0.78,
    alt: "Zen Lean sleep card scoring 77, Good at 77% of need, with 5 hours 51 minutes asleep, 5 hours 57 minutes in bed and 98% efficiency, above the activity card.",
    fig: "Sleep. Scored 77, Good: 5h 51m asleep of 5h 57m in bed, 98% efficiency.",
  },
  {
    hue: "nutrition", kicker: "Food", title: "Photograph the plate. Check the numbers.",
    body: "Calories, protein, carbs, fat and fibre from one photo, set out for you to check and adjust. Ten photo analyses a day.",
    shot: "meals", crop: { x0: 0, x1: 1, y0: 0.15 }, aspect: 0.78,
    alt: "Zen Lean Meals screen showing 1,708 kcal left today, 380 eaten of a 2,088 budget, macro targets, three of eight glasses of water, and an oatmeal bowl logged at 380 kcal.",
    fig: "Meals. 1,708 kcal left, 380 eaten of a 2,088 budget. One oatmeal bowl with banana, 380 kcal.",
  },
  {
    hue: "energy", kicker: "Fasting", title: "16:8, or a window of your own.",
    body: "Start from your iPhone or your Watch. Each stage is named as you reach it, from switching fuel at hour 4 to hour 12 and beyond.",
    shot: "fasting", crop: { x0: 0, x1: 1, y0: 0.06 }, aspect: 0.78,
    alt: "Zen Lean fasting screen on a 16:8 fast with 1 hour 56 minutes remaining, started 12:49 AM, eat at 4:49 PM, with the stages progress bar.",
    fig: "Fasting. Hour 14 of a 16:8 fast, 01:56:39 to go. Eat at 4:49 PM.",
  },
] as const;

const EDITION_B = [
  {
    hue: "activity", kicker: "Movement", title: "Day strain, read from your own baseline.",
    body: "Steps, distance, day load and Fitness Age. Exercise calories count at 65%, capped at 900 a day, because wearables over-count.",
    shot: "activity", crop: { x0: 0, x1: 1, y0: 0.203 }, aspect: 1.25,
    alt: "Zen Lean activity screen: 1,075 kcal moved, past a 500 kcal goal, 22.5k steps, Fitness Age 31, and 51 bpm resting with 52 ms HRV.",
    fig: "Activity. 1,075 kcal moved against a 500 goal, 22.5k steps, 51 bpm resting, 52 ms HRV.",
  },
  {
    hue: "trend", kicker: "Water", title: "Tap a glass. See if you are on pace.",
    body: "A 2.0 L day in 250 ml glasses. Reminders arrive only between the times you choose, every 2 h from 8 AM to 10 PM if you like.",
    shot: "water", crop: { x0: 0, x1: 1, y0: 0.15 }, aspect: 1.32,
    alt: "Zen Lean water sheet showing 750 ml of 2.0 L, 38% and on pace, with quick add buttons for 150, 250 and 500 ml.",
    fig: "Water. 750 ml of 2.0 L by mid-afternoon, 38% and on pace.",
  },
] as const;

const STANDARDS = [
  ["A floor under every target.", "Your daily target never drops below 1,200 kcal for women or 1,500 kcal for men, whatever the goal."],
  ["A ceiling on the deficit.", "The gap between what you burn and what you eat is capped at 1,200 kcal a day."],
  ["A limit on the pace.", "Goals are paced at no more than 1 kg a week."],
  ["Exercise counted at 65%.", "Wearables over-count, so workout calories are credited at 65% and capped at 900 kcal a day."],
  ["You are compared with you.", "Every score is read against your own baseline, not a population average."],
  ["No baseline, no score.", "Until there is enough of your own data, the app publishes nothing rather than invent a number."],
  ["A short night still counts.", "It is scored with lower confidence, and says so, instead of being thrown away."],
  ["Notes, never nags.", "No guilt, no cheerleading. Kai reports what happened and what it suggests, once."],
] as const;

const METHODS = [
  ["Mifflin-St Jeor", "resting and daily energy"],
  ["Karvonen", "heart rate zones"],
  ["FRIEND registry", "Fitness Age"],
  ["Keytel 2005", "workout calories"],
  ["WHO cutoffs", "BMI bands"],
  ["Helgerud 2007", "4x4 intervals"],
] as const;

const SIGNALS = [
  ["Sleep", "Apple Watch", "your own nights"],
  ["Resting heart rate", "Apple Watch", "your usual resting rate"],
  ["HRV", "Apple Watch", "your usual range"],
  ["Recovery and readiness", "Sleep, HRV, heart", "your baseline"],
  ["Fitness Age", "Heart rate, FRIEND registry", "your age"],
  ["Day strain", "Activity and workouts", "your usual days"],
] as const;

const GUIDES = [
  { slug: "how-many-calories-should-i-eat", hue: "nutrition", kicker: "Food", title: "How many calories should you eat?", dek: "The Mifflin-St Jeor arithmetic, your activity, and the floors no target should go below.", min: 7 },
  { slug: "16-8-intermittent-fasting", hue: "energy", kicker: "Fasting", title: "16:8 fasting, hour by hour", dek: "What each stage of a sixteen hour fast is named for, and how to pick a window that fits your day.", min: 6 },
  { slug: "what-is-hrv", hue: "recovery", kicker: "Recovery", title: "What HRV is, and why only yours matters", dek: "Heart rate variability compared with your own range, and why a single number tells you little.", min: 8 },
  { slug: "calorie-deficit-safely", hue: "heart", kicker: "Standards", title: "Running a deficit without running yourself down", dek: "Why the deficit is capped at 1,200 kcal and the pace at 1 kg a week.", min: 6 },
  { slug: "count-calories-from-a-photo", hue: "nutrition", kicker: "Food", title: "Counting calories from a photo", dek: "What a photo estimate gets right, and the two numbers worth checking every time.", min: 5 },
] as const;

const FAQ = [
  ["How much does Zen Lean cost?", "Zen Lean is free to download. After setup, a subscription is required, paid monthly or yearly. The current price is shown in the App Store before you subscribe."],
  ["What do I need to use it?", "An iPhone on iOS 17 or later. Sleep, resting heart rate, HRV and recovery come from the Apple Watch you already own, read through Apple Health. Google Health (Beta) is also supported. The app is in English."],
  ["How does counting calories from a photo work?", "Photograph your meal and Zen Lean estimates calories, protein, carbs, fat and fibre. You check the numbers and adjust anything that looks off before it is logged. You can analyse ten photos a day."],
  ["Is Kai a chatbot?", "No. Kai reads your sleep, heart, meals, fasts, water and check-ins, and writes a short note grounded in those numbers. There is no chat, no guilt and no cheerleading."],
  ["How does Zen Lean keep targets sensible?", "Your target never drops below 1,200 kcal for women or 1,500 kcal for men, the deficit is capped at 1,200 kcal a day, the pace at 1 kg a week, and exercise calories are credited at 65% up to 900 a day."],
  ["What happens to my data?", "There are no ads and your data is never sold. Anonymous usage statistics help improve the app, and you can switch them off. Delete your account and everything goes with it."],
] as const;

const FOOTER = [
  ["Features", [["Food", "/features/food"], ["Fasting", "/features/fasting"], ["Sleep and recovery", "/features/sleep-and-recovery"], ["Activity", "/features/activity"], ["Kai coach", "/features/kai"], ["Apple Watch", "/features/apple-watch"]]],
  ["Learn", [["Guides", "/guides"], ["Science", "/science"], ["Calorie calculator", "/calorie-calculator"]]],
  ["Company", [["About", "/about"], ["Support", "/support"], ["Privacy", "/privacy"], ["Terms", "/terms"], ["Contact", "mailto:hello@thezenlean.com"]]],
] as const;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Zen Lean",
    operatingSystem: "iOS",
    applicationCategory: "HealthApplication",
    description:
      "A calm calorie tracker for iPhone and Apple Watch: food from a photo, intermittent fasting, sleep and recovery from Apple Health, and Kai, a coach who writes one grounded note each morning.",
    downloadUrl: STORE,
    url: "https://thezenlean.com",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  },
];

/* ---------- Page ---------- */

export default function MorningEdition() {
  return (
    <div className={`${s.paper} ${serif.variable} ${sans.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Masthead */}
      <header className={s.masthead}>
        <div className={s.wrap}>
          <div className={s.plate}>
            <p className={s.ear}>
              <b>How am I today?</b>
              Answered at the top of the page, every morning.
            </p>
            <a href="/" className={s.nameplate} aria-label="Zen Lean home">
              <img src="/icon-512.png" alt="" width={56} height={56} />
              <span>Zen Lean</span>
            </a>
            <p className={`${s.ear} ${s.earRight}`}>
              <b>iPhone and Apple Watch</b>
              iOS 17 or later. In English.
            </p>
          </div>
          <div className={s.dateline}>
            <span>Vol. 1 &middot; <EditionDate variant="no" /></span>
            <span className={s.datelineMid}><EditionDate /></span>
            <span>Written overnight by Kai</span>
          </div>
        </div>
      </header>

      <nav className={s.nav} aria-label="Main">
        <div className={`${s.wrap} ${s.navInner}`}>
          <a href="/" className={s.navMark} aria-label="Zen Lean home">Zen Lean</a>
          <ul className={s.navLinks}>
            {NAV.map(([label, href]) => (
              <li key={href}><a href={href}>{label}</a></li>
            ))}
          </ul>
          <a className={s.navCta} href={STORE}>Download</a>
        </div>
      </nav>

      <main>
        {/* Front page */}
        <section className={`${s.wrap} ${s.front}`} aria-labelledby="front-h">
          <div className={s.frontCopy}>
            <Kicker>Front page &middot; How am I today</Kicker>
            <h1 id="front-h" className={s.h1}>Every morning, one calm page about you.</h1>
            <p className={s.standfirst}>
              Food, fasting, sleep and recovery, read together overnight. By the time you wake, Kai has written
              one short note on how you are and what to do about it.
            </p>
            <div className={s.ctaRow}>
              <StoreButton />
              <p className={s.fine}>Free to download.<br />Monthly or yearly subscription.</p>
            </div>

            <div className={s.lead}>
              <p className={s.dropcap}>
                Most calorie counters feel like spreadsheets. Zen Lean is set the other way round. Overnight, Kai
                reads your sleep, heart rate, HRV, meals, fasts and water, and in the morning there is one calm
                page waiting, with one question answered at the top.
              </p>
              <div>
                <blockquote className={s.pull}>
                  <p>&ldquo;You moved well, but calories ran high several days this week. Small portions can close the gap.&rdquo;</p>
                  <cite>Kai, on Insights (Fig. 1)</cite>
                </blockquote>
                <p className={s.leadSmall}>
                  One note, in plain words: what happened this week, and one small thing to do about it. Then it stops.
                </p>
              </div>
            </div>
          </div>

          <figure className={s.leadPhoto}>
            <Shot name="insights" eager aspect={0.75} crop={{ y0: 0.045 }}
              alt="Zen Lean Insights screen: a 23 day meal log streak, hour 14 of a 16 hour fast, Kai's note that calories ran high several days this week, and a sleep score of 77." />
            <Fig n={1}>Insights. Kai&rsquo;s note at the top, then Sleep: 77, Good, 5h 51m asleep at 98% efficiency.</Fig>
          </figure>
        </section>

        {/* In today's edition */}
        <section id="features" className={`${s.wrap} ${s.section}`} aria-labelledby="edition-h">
          <div className={s.sectionHead}>
            <Kicker>Inside</Kicker>
            <h2 id="edition-h" className={s.h2}>In today&rsquo;s edition</h2>
            <p className={s.dek}>Five things on one page, each read against your own normal rather than an average.</p>
          </div>

          <div className={s.cols3}>
            {EDITION.map((c, i) => (
              <article key={c.shot} className={s.col}>
                <Kicker hue={c.hue}>{c.kicker}</Kicker>
                <h3 className={s.h3}>{c.title}</h3>
                <p className={s.body}>{c.body}</p>
                <figure className={s.colFig}>
                  <Shot name={c.shot} aspect={c.aspect} crop={c.crop} alt={c.alt} />
                  <Fig n={i + 2}>{c.fig}</Fig>
                </figure>
              </article>
            ))}
          </div>

          <div className={s.cols3b}>
            {EDITION_B.map((c, i) => (
              <article key={c.shot} className={s.col}>
                <Kicker hue={c.hue}>{c.kicker}</Kicker>
                <h3 className={s.h3}>{c.title}</h3>
                <p className={s.body}>{c.body}</p>
                <figure className={s.colFig}>
                  <Shot name={c.shot} aspect={c.aspect} crop={c.crop} alt={c.alt} />
                  <Fig n={i + 5}>{c.fig}</Fig>
                </figure>
              </article>
            ))}
            <aside className={`${s.col} ${s.briefs}`} aria-label="In brief">
              <Kicker>In brief</Kicker>
              <ul>
                <li><b>Check-in.</b> Three taps each morning: energy, body, mood. It learns your normal mornings over about two weeks.</li>
                <li><b>Ten photos a day.</b> Each one analysed for calories, protein, carbs, fat and fibre.</li>
                <li><b>Fasting from the wrist.</b> Start or end a fast on Apple Watch.</li>
                <li><b>One subscription.</b> No second device, no second subscription for a wearable.</li>
                <li><b>iOS 17 or later.</b> iPhone with Apple Watch, in English.</li>
              </ul>
            </aside>
          </div>
        </section>

        {/* Kai, the columnist */}
        <section id="how-it-works" className={s.kaiBand} aria-labelledby="kai-h">
          <div className={`${s.wrap} ${s.kai}`}>
            <div className={s.kaiHead}>
              <Kicker hue="recovery">The columnist</Kicker>
              <h2 id="kai-h" className={s.h2}>Kai has read your night before you wake.</h2>
              <p className={s.dek}>One short note a morning, written from your numbers. Kai reports. Kai never nags.</p>
            </div>

            <div className={s.kaiCols}>
              <div className={s.kaiCol}>
                <h3 className={s.h4}>What Kai reads</h3>
                <ul className={s.ruled}>
                  <li>Sleep and how long it was</li>
                  <li>Resting heart rate and HRV</li>
                  <li>Recovery, readiness, day strain</li>
                  <li>Meals, fasts and water</li>
                  <li>Your three morning taps</li>
                </ul>
              </div>
              <div className={s.kaiCol}>
                <h3 className={s.h4}>What Kai writes</h3>
                <ul className={s.ruled}>
                  <li>&ldquo;Start tiny today. Consistency beats one perfect day.&rdquo;</li>
                  <li>&ldquo;Small portions can close the gap.&rdquo;</li>
                  <li>&ldquo;You&rsquo;re in a steady stretch. Hydrate and keep your usual rhythm.&rdquo;</li>
                </ul>
              </div>
              <div className={s.kaiCol}>
                <h3 className={s.h4}>What Kai never does</h3>
                <ul className={`${s.ruled} ${s.never}`}>
                  <li>Chat back and forth</li>
                  <li>Guilt you about a meal</li>
                  <li>Cheer you on with confetti</li>
                  <li>Nag twice</li>
                  <li>Invent a score it cannot back</li>
                </ul>
              </div>
              <figure className={s.kaiFig}>
                <Shot name="checkin" aspect={1} crop={{ y0: 0.12 }}
                  alt="Zen Lean check-in sheet with Energy Good, Body Okay, Mood Good, and overnight Recovery of 66 compared with the Energy tap." />
                <Fig n={7}>The check-in. Energy Good, Body Okay, Mood Good, set beside an overnight Recovery of 66.</Fig>
              </figure>
            </div>
          </div>
        </section>

        {/* Our standards */}
        <section id="science" className={`${s.wrap} ${s.section}`} aria-labelledby="std-h">
          <div className={s.stdGrid}>
            <div>
              <div className={s.sectionHead}>
                <Kicker>The style book</Kicker>
                <h2 id="std-h" className={s.h2}>Our standards</h2>
                <p className={s.dek}>Rules the app keeps on every page, whether or not you are reading closely.</p>
              </div>
              <ol className={s.standards}>
                {STANDARDS.map(([t, d], i) => (
                  <li key={t}>
                    <span className={s.stdNo} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className={s.stdTitle}>{t}</h3>
                      <p>{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <aside className={s.methods} aria-labelledby="methods-h">
              <Kicker hue="trend">Methods</Kicker>
              <h3 id="methods-h" className={s.h4}>The formulas, by name</h3>
              <dl>
                {METHODS.map(([n, u]) => (
                  <div key={n}><dt>{n}</dt><dd>{u}</dd></div>
                ))}
              </dl>
              <a className={s.more} href="/science">Read the science</a>
            </aside>
          </div>
        </section>

        {/* Apple Watch and Health */}
        <section className={s.watchBand} aria-labelledby="watch-h">
          <div className={`${s.wrap} ${s.watch}`}>
            <div className={s.watchCopy}>
              <Kicker hue="heart">Dispatches from the wrist</Kicker>
              <h2 id="watch-h" className={s.h2}>The Apple Watch you already own.</h2>
              <p className={s.body}>
                Zen Lean reads sleep, resting heart rate, HRV, recovery, readiness, Fitness Age and day strain through
                Apple Health, or Google Health (Beta). No second device to charge, no second subscription for a
                wearable. Fasts start and end from the Watch.
              </p>
              <table className={s.table}>
                <caption className={s.tableCap}>Table 1. What is read, and what it is compared with.</caption>
                <thead>
                  <tr><th scope="col">Signal</th><th scope="col">Read from</th><th scope="col">Compared with</th></tr>
                </thead>
                <tbody>
                  {SIGNALS.map(([a, b, c]) => (
                    <tr key={a}><th scope="row">{a}</th><td>{b}</td><td>{c}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figure className={s.watchFig}>
              <Shot name="sources" aspect={1.12} crop={{ y0: 0.07 }}
                alt="Zen Lean Health sources settings with Apple Health switched on and Google Health marked Beta." />
              <Fig n={8}>Health sources. Apple Health on, Google Health in Beta.</Fig>
            </figure>
          </div>
        </section>

        {/* Editor's note */}
        <section className={`${s.wrap} ${s.noteWrap}`} aria-labelledby="note-h">
          <div className={s.note}>
            <p className={s.noteKicker}>Editor&rsquo;s note</p>
            <h2 id="note-h" className={s.noteH}>On your data.</h2>
            <div className={s.noteCols}>
              <p><b>No ads.</b> There is nothing on the page that someone paid to put there.</p>
              <p><b>Nothing sold.</b> Your data is never sold to anyone.</p>
              <p><b>Stats you can switch off.</b> Anonymous usage statistics help us improve the app.</p>
              <p><b>Delete means delete.</b> Remove your account and everything goes with it.</p>
            </div>
          </div>
        </section>

        {/* Reading room */}
        <section id="guides" className={`${s.wrap} ${s.section}`} aria-labelledby="guides-h">
          <div className={s.readHead}>
            <div className={s.sectionHead}>
              <Kicker>From the reading room</Kicker>
              <h2 id="guides-h" className={s.h2}>Guides, written plainly</h2>
            </div>
            <a className={s.more} href="/guides">All guides</a>
          </div>
          <div className={s.reading}>
            {GUIDES.map((g, i) => (
              <a key={g.slug} href={`/guides/${g.slug}`} className={`${s.guide} ${i === 0 ? s.guideLead : ""}`}>
                {i === 0 && (
                  <p className={s.formula} aria-label="Mifflin-St Jeor: 10 times weight in kilograms, plus 6.25 times height in centimetres, minus 5 times age, plus 5 for men or minus 161 for women.">
                    <span>10&thinsp;&times;&thinsp;kg + 6.25&thinsp;&times;&thinsp;cm</span>
                    <span>&minus;&thinsp;5&thinsp;&times;&thinsp;age + 5</span>
                    <small>Mifflin-St Jeor, the arithmetic behind every target</small>
                  </p>
                )}
                <Kicker hue={g.hue}>{g.kicker}</Kicker>
                <h3 className={i === 0 ? s.guideLeadTitle : s.guideTitle}>{g.title}</h3>
                <p className={s.guideDek}>{g.dek}</p>
                <p className={s.guideMeta}>{g.min} min read</p>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="support" className={`${s.wrap} ${s.section}`} aria-labelledby="faq-h">
          <div className={s.faqGrid}>
            <div className={s.sectionHead}>
              <Kicker>Letters</Kicker>
              <h2 id="faq-h" className={s.h2}>Questions readers ask</h2>
              <p className={s.dek}>
                Anything else, write to <a href="mailto:hello@thezenlean.com">hello@thezenlean.com</a>. A person answers.
              </p>
            </div>
            <div className={s.faq}>
              {FAQ.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className={s.closing} aria-labelledby="close-h">
          <div className={`${s.wrap} ${s.closingInner}`}>
            <Kicker>Tomorrow</Kicker>
            <h2 id="close-h" className={s.closeH}>Tomorrow&rsquo;s edition is written tonight.</h2>
            <p className={s.standfirst}>Wear your Watch to bed. In the morning, one calm page is waiting.</p>
            <div className={s.ctaRow}>
              <StoreButton />
              <p className={s.fine}>Free to download.<br />Monthly or yearly subscription.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={`${s.wrap} ${s.footGrid}`}>
          <div className={s.footBrand}>
            <p className={s.footMark}>Zen Lean</p>
            <p>One calm page about you, every morning. For iPhone and Apple Watch.</p>
            <StoreButton small />
          </div>
          {FOOTER.map(([h, links]) => (
            <nav key={h} aria-label={h} className={s.footCol}>
              <p className={s.footH}>{h}</p>
              <ul>
                {links.map(([l, href]) => (
                  <li key={l}><a href={href}>{l}</a>{href.startsWith("mailto") && <span className={s.footMail}>hello@thezenlean.com</span>}</li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className={`${s.wrap} ${s.colophon}`}>
          <span>&copy; 2026 Zen Products</span>
          <span>Printed every morning, <EditionDate variant="short" /></span>
        </div>
      </footer>
    </div>
  );
}
