import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import s from "./day.module.css";
import DayClient from "./DayClient";
import { COMPARE, FAQ, GUIDES, MOMENTS, RULES, STORE, railPos, type Hue } from "./data";

// Variation B, "One day, one sky": the page is one day under the app's own time-of-day sky, 5:52 AM to
// 9:30 PM. The time rail (a line of the day, with a glowing dot per signal) is the repeated motif.
const round = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800", "900"], variable: "--b-nunito", display: "swap" });

export const metadata: Metadata = {
  title: "Zen Lean: calorie tracker, fasting and Apple Watch",
  description:
    "A calm calorie tracker for iPhone and Apple Watch. AI photo meals, intermittent fasting, sleep and recovery, and Kai, a coach who reads it all.",
  robots: { index: false, follow: false },
};

const hueVar = (h: Hue) => ({ "--hue": `var(--${h})` }) as CSSProperties;

function Phone({ shot, alt, className, priority }: { shot: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <figure className={`${s.phone} ${className ?? ""}`}>
      <span className={s.island} aria-hidden="true" />
      <img
        src={`/shots/today/${shot}-660.webp`}
        srcSet={`/shots/today/${shot}-660.webp 660w, /shots/today/${shot}-1320.webp 1320w`}
        sizes="(max-width: 900px) 60vw, 360px"
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

// A section marker: the time stamp and the dot of the signal that owns the section.
function Marker({ time, hue, children }: { time: string; hue: Hue; children: ReactNode }) {
  return (
    <p className={s.marker} style={hueVar(hue)}>
      <span className={s.dot} aria-hidden="true" />
      <span className={s.markerTime}>{time}</span>
      <span className={s.markerRule} aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

// The rail itself: the day as a line, a dot at each moment. `fill` makes it track scroll progress.
function Rail({ fill, labels = true, className }: { fill?: boolean; labels?: boolean; className?: string }) {
  return (
    <div className={`${s.rail} ${className ?? ""}`} aria-hidden="true">
      <span className={s.railLine} />
      {fill && <span className={s.railFill} />}
      {MOMENTS.map((m) => (
        <span key={m.time} className={s.railStop} style={{ ...hueVar(m.hue), left: `${railPos(m.min)}%` }}>
          <span className={s.dot} />
          {labels && <span className={s.railLabel}>{m.time}</span>}
        </span>
      ))}
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

export default function VariationB() {
  return (
    <div className={`${s.root} ${round.variable}`} data-day-root>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DayClient />

      {/* ---------- Nav, with the day's rail as its progress line ---------- */}
      <header className={s.navWrap}>
        <nav className={s.nav} aria-label="Main">
          <a className={s.brand} href="/v/b">
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
        <Rail fill labels={false} className={s.navRail} />
      </header>

      <main>
        {/* ---------- Hero: night turning to dawn ---------- */}
        <section className={`${s.section} ${s.hero}`} aria-labelledby="hero-title">
          <div className={`${s.sky} ${s.skyNight}`} aria-hidden="true" />
          <div className={s.dawn} aria-hidden="true" />
          <div className={`${s.wrap} ${s.heroGrid}`}>
            <div className={s.heroCopy}>
              <Marker time="5:52 AM" hue="sleep">Your day starts here</Marker>
              <h1 id="hero-title" className={s.h1}>
                Your whole day, in one <span className={s.sunText}>calm picture.</span>
              </h1>
              <p className={s.lede}>
                Food, fasting, sleep and recovery in one iPhone and Apple Watch app. And Kai, a coach who has
                read all of it, writes you one short note each morning.
              </p>
              <div className={s.ctaRow}>
                <Store />
                <span className={s.fine}>Monthly or yearly subscription. iOS 17 or later.</span>
              </div>
              <dl className={s.heroFacts}>
                <div style={hueVar("nutrition")}><dt>10</dt><dd>photo meal analyses a day</dd></div>
                <div style={hueVar("energy")}><dt>16:8</dt><dd>or your own fasting window</dd></div>
                <div style={hueVar("recovery")}><dt>0</dt><dd>scores invented without your baseline</dd></div>
              </dl>
            </div>
            <div className={s.heroPhones}>
              <Phone shot="sleep" alt={MOMENTS[0].alt} className={s.hpBackL} />
              <Phone shot="meals" alt={MOMENTS[2].alt} className={s.hpBackR} />
              <Phone shot="insights" alt={MOMENTS[6].alt} className={s.hpFront} priority />
            </div>
          </div>
        </section>
        <div className={s.works}>
          <div className={s.wrap}>
            <span className={s.worksLabel}>Works with</span>
            <span>Apple Watch</span>
            <span className={s.sep} aria-hidden="true" />
            <span>Apple Health</span>
            <span className={s.sep} aria-hidden="true" />
            <span>Google Health (Beta)</span>
          </div>
        </div>

        {/* ---------- The day: seven moments ---------- */}
        <section id="day" className={`${s.section} ${s.day}`} aria-labelledby="day-title">
          <div className={`${s.sky} ${s.skyMorning}`} aria-hidden="true" />
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <div>
                <Marker time="5:52 AM to 9:30 PM" hue="trend">A day in Zen Lean</Marker>
                <h2 id="day-title" className={s.h2}>Seven moments. One app that was there for each.</h2>
              </div>
              <div className={s.headAside}>
                <p className={s.sub}>
                  Most calorie counters feel like spreadsheets. Zen Lean answers one question every morning: how am
                  I today, and what should I do about it?
                </p>
                <div className={s.arrows}>
                  <button type="button" data-day-step="-1" aria-label="Earlier in the day">&#8592;</button>
                  <button type="button" data-day-step="1" aria-label="Later in the day">&#8594;</button>
                </div>
              </div>
            </div>
          </div>
          <ol className={s.track} data-day-track>
            {MOMENTS.map((m, i) => (
              <li key={m.time} className={s.moment} style={hueVar(m.hue)}>
                <div className={s.momentStamp}>
                  <span className={s.dot} aria-hidden="true" />
                  <time>{m.time}</time>
                  <span className={s.momentSignal}>{m.signal}</span>
                </div>
                <div className={s.momentCard}>
                  <h3 className={s.h3}>{m.title}</h3>
                  <p>{m.body}</p>
                  <div className={s.momentShot}>
                    <Phone shot={m.shot} alt={m.alt} className={i % 2 ? s.tiltR : s.tiltL} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Kai ---------- */}
        <section id="kai" className={`${s.section} ${s.kai}`} aria-labelledby="kai-title">
          <div className={`${s.sky} ${s.skyAfternoon}`} aria-hidden="true" />
          <div className={`${s.wrap} ${s.kaiGrid}`}>
            <div>
              <Marker time="7:05 AM" hue="recovery">Kai, your coach</Marker>
              <h2 id="kai-title" className={s.h2}>A coach who has read your data. No chat, no guilt, no cheerleading.</h2>
              <p className={s.sub}>
                Kai reads everything Zen Lean knows about your day and writes one short, grounded note. It reports. It
                never nags, and there is nothing to type to it.
              </p>
              <div className={s.kaiFlow}>
                <div className={s.kaiCol}>
                  <h3 className={s.kicker}>Kai reads</h3>
                  <ul className={s.chips}>
                    {[
                      ["sleep", "Sleep"],
                      ["heart", "Resting heart rate"],
                      ["heart", "HRV"],
                      ["recovery", "Recovery"],
                      ["recovery", "Your check-in"],
                      ["nutrition", "Meals and macros"],
                      ["energy", "Fasting"],
                      ["activity", "Workouts and steps"],
                      ["trend", "Water"],
                    ].map(([h, label]) => (
                      <li key={label} style={hueVar(h as Hue)}>
                        <span className={s.dot} aria-hidden="true" />
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s.kaiCol}>
                  <h3 className={s.kicker}>Kai writes</h3>
                  <blockquote className={s.note} style={hueVar("nutrition")}>
                    <span className={s.noteName}>Kai · this week</span>
                    <p>You moved well, but calories ran high several days this week. Small portions can close the gap.</p>
                  </blockquote>
                  <blockquote className={s.note} style={hueVar("heart")}>
                    <span className={s.noteName}>Kai · heart</span>
                    <p>Heart rate ran high in today&rsquo;s range. Easy movement and sleep tonight may help.</p>
                  </blockquote>
                  <blockquote className={s.note} style={hueVar("sleep")}>
                    <span className={s.noteName}>Kai · sleep</span>
                    <p>Some rest is still rest. Go easy on yourself today.</p>
                  </blockquote>
                  <p className={s.tiny}>All three notes are quoted word for word from the app screens on this page.</p>
                </div>
              </div>
            </div>
            <div className={s.kaiPhones}>
              <Phone shot="heart" alt="Zen Lean Heart card: resting heart rate running high at 56 bpm against today's range of 50 to 55, a Kai line, and Fitness Age 31" className={s.kpA} />
              <Phone shot="insights" alt={MOMENTS[6].alt} className={s.kpB} />
            </div>
          </div>
        </section>

        {/* ---------- The rules ---------- */}
        <section id="science" className={`${s.section} ${s.rules}`} aria-labelledby="rules-title">
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <div>
                <Marker time="12:40 PM" hue="nutrition">The science</Marker>
                <h2 id="rules-title" className={s.h2}>The rules Zen Lean keeps.</h2>
              </div>
              <p className={`${s.sub} ${s.headAside}`}>
                Five limits are built into the app, all day, every day. You can change your goal. You cannot talk it
                past these.
              </p>
            </div>
            <ol className={s.ruleGrid}>
              {RULES.map((r) => (
                <li key={r.n} className={`${s.rule} ${"long" in r && r.long ? s.ruleLong : ""}`} style={hueVar(r.hue)}>
                  <span className={s.ruleN}>
                    <span className={s.dot} aria-hidden="true" />
                    Rule {r.n}
                  </span>
                  <p className={s.ruleBig}>
                    {r.big}
                    {r.unit && <small> {r.unit}</small>}
                  </p>
                  <h3 className={s.h3}>{r.title}</h3>
                  <p>{r.body}</p>
                </li>
              ))}
            </ol>
            <p className={s.formulas}>
              <strong>Named formulas.</strong> Mifflin-St Jeor for BMR and TDEE. Karvonen for heart rate zones. The
              FRIEND registry for Fitness Age. Keytel 2005 for workout calories. WHO cutoffs for BMI. Helgerud 2007
              for 4x4 intervals.
            </p>
          </div>
        </section>

        {/* ---------- One app instead of three ---------- */}
        <section id="features" className={`${s.section} ${s.compare}`} aria-labelledby="compare-title">
          <div className={`${s.sky} ${s.skyAfternoonLow}`} aria-hidden="true" />
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <div>
                <Marker time="4:15 PM" hue="activity">One app instead of three</Marker>
                <h2 id="compare-title" className={s.h2}>Three apps never compare notes. One does.</h2>
              </div>
              <p className={`${s.sub} ${s.headAside}`}>
                The usual setup is a calorie counter, a fasting timer and a wearable with its own subscription. Each
                sees one slice of your day.
              </p>
            </div>
            <table className={s.table}>
              <caption className={s.srOnly}>The usual three-app setup compared with Zen Lean</caption>
              <thead>
                <tr>
                  <th scope="col">What you need</th>
                  <th scope="col">The usual setup</th>
                  <th scope="col" className={s.zenHead}>
                    <img src="/icon-512.png" alt="" width={24} height={24} /> Zen Lean
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((c) => (
                  <tr key={c.need} style={hueVar(c.hue)}>
                    <th scope="row">
                      <span className={s.dot} aria-hidden="true" />
                      {c.need}
                    </th>
                    <td className={s.usual}>
                      <strong>{c.usual}</strong>
                      <span>{c.usualNote}</span>
                    </td>
                    <td className={s.zen}>{c.zen}</td>
                  </tr>
                ))}
                <tr className={s.totalRow}>
                  <th scope="row">Altogether</th>
                  <td className={s.usual}>
                    <strong>Three apps</strong>
                    <span>Three places to look each morning.</span>
                  </td>
                  <td className={s.zen}>One app, one calm picture. Monthly or yearly subscription.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------- Apple Watch ---------- */}
        <section id="watch" className={`${s.section} ${s.watch}`} aria-labelledby="watch-title">
          <div className={`${s.wrap} ${s.watchGrid}`}>
            <div className={s.watchPhones}>
              <Phone shot="fasting" alt={MOMENTS[5].alt} className={s.wpA} />
              <Phone shot="activity" alt={MOMENTS[4].alt} className={s.wpB} />
            </div>
            <div>
              <Marker time="8:00 PM" hue="energy">Apple Watch</Marker>
              <h2 id="watch-title" className={s.h2}>The Watch you already wear does the measuring.</h2>
              <p className={s.sub}>
                No second device and no second subscription for a wearable. Your Watch reads the night and the
                workouts, and Zen Lean puts them next to everything else.
              </p>
              <ul className={s.watchList}>
                <li style={hueVar("energy")}>
                  <span className={s.dot} aria-hidden="true" />
                  <div><h3>Start a fast</h3><p>Begin your 16:8 or your own window from your wrist. The phone follows.</p></div>
                </li>
                <li style={hueVar("activity")}>
                  <span className={s.dot} aria-hidden="true" />
                  <div><h3>Run a workout</h3><p>Run a workout from your wrist, on iOS 26. It lands in the day with everything else.</p></div>
                </li>
                <li style={hueVar("trend")}>
                  <span className={s.dot} aria-hidden="true" />
                  <div><h3>Glance at complications</h3><p>Your day, on the watch face, without opening anything.</p></div>
                </li>
                <li style={hueVar("sleep")}>
                  <span className={s.dot} aria-hidden="true" />
                  <div><h3>Sleep and heart, overnight</h3><p>Sleep, resting heart rate and HRV reach Zen Lean through Apple Health.</p></div>
                </li>
              </ul>
              <p className={s.tiny}>Meals and water are logged on iPhone, where the camera is.</p>
            </div>
          </div>
        </section>

        {/* ---------- Privacy ---------- */}
        <section className={`${s.section} ${s.privacy}`} aria-labelledby="privacy-title">
          <div className={`${s.wrap} ${s.privacyGrid}`}>
            <div>
              <Marker time="All day" hue="recovery">Privacy</Marker>
              <h2 id="privacy-title" className={s.h2}>Your day is yours.</h2>
            </div>
            <ul className={s.privacyList}>
              <li><strong>No ads.</strong> Not in the app, not anywhere.</li>
              <li><strong>Your data is never sold.</strong> Not to anyone, for any reason.</li>
              <li><strong>Anonymous usage stats</strong>, and a switch to turn them off.</li>
              <li><strong>Delete your account</strong> and everything goes with it.</li>
            </ul>
          </div>
        </section>

        {/* ---------- Guides ---------- */}
        <section id="guides" className={`${s.section} ${s.guides}`} aria-labelledby="guides-title">
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <div>
                <Marker time="Any time" hue="trend">Guides</Marker>
                <h2 id="guides-title" className={s.h2}>Guides, written the way the app thinks.</h2>
              </div>
              <a className={`${s.textLink} ${s.headAside}`} href="/guides">All guides &#8594;</a>
            </div>
            <ul className={s.guideGrid}>
              {GUIDES.map((g) => (
                <li key={g.slug} style={hueVar(g.hue)}>
                  <a className={s.guide} href={`/guides/${g.slug}`}>
                    <span className={s.guideTopic}>
                      <span className={s.dot} aria-hidden="true" />
                      {g.topic}
                    </span>
                    <h3>{g.title}</h3>
                    <p>{g.dek}</p>
                    <span className={s.guideMore} aria-hidden="true">Read &#8594;</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section id="faq" className={`${s.section} ${s.faq}`} aria-labelledby="faq-title">
          <div className={`${s.wrap} ${s.faqGrid}`}>
            <div>
              <Marker time="Any time" hue="heart">Questions</Marker>
              <h2 id="faq-title" className={s.h2}>Asked before you download.</h2>
              <p className={s.sub}>
                Anything else, write to <a href="mailto:hello@thezenlean.com">hello@thezenlean.com</a>. A person
                answers.
              </p>
            </div>
            <div className={s.faqList}>
              {FAQ.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Closing, under the evening sky ---------- */}
        <section className={`${s.section} ${s.closing}`} aria-labelledby="close-title">
          <div className={`${s.sky} ${s.skyEvening}`} aria-hidden="true" />
          <div className={`${s.wrap} ${s.closeInner}`}>
            <Marker time="9:30 PM" hue="energy">Tonight</Marker>
            <h2 id="close-title" className={s.closeTitle}>
              Set it up tonight.
              <br />
              Read it at <span className={s.sunText}>5:52 AM.</span>
            </h2>
            <p className={`${s.lede} ${s.center}`}>
              Zen Lean for iPhone and Apple Watch. Free to download, subscription required after setup.
            </p>
            <div className={`${s.ctaRow} ${s.ctaCenter}`}>
              <Store />
              <span className={s.fine}>Monthly or yearly subscription</span>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer: the whole day, then the sitemap ---------- */}
      <footer className={s.footer}>
        <div className={s.wrap}>
          <Rail className={s.footRail} />
          <div className={s.footGrid}>
            <div className={s.footBrand}>
              <a className={s.brand} href="/v/b">
                <img src="/icon-512.png" alt="" width={34} height={34} />
                Zen Lean
              </a>
              <p>One calm picture of your day, for iPhone and Apple Watch.</p>
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
