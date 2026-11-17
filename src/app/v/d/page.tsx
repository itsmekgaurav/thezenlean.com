import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import s from "./morning.module.css";
import MorningClient from "./MorningClient";
import { ALT, FAQ, GUIDES, KAI_LINES, READ, STORE, TRUTHS, type Hue } from "./data";

// Variation D, "The morning read". The user opens the app first thing in the morning, often on a rough
// day, to answer one question: how am I today? The page is those minutes. It opens in the app's night
// sky and brightens to its morning sky as you scroll. The repeated element is the reading: a number in
// its signal's hue, joined to what it means for you, because a number on its own means nothing.
const round = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800", "900"], variable: "--d-nunito", display: "swap" });

export const metadata: Metadata = {
  title: "Zen Lean: calm calorie tracker, fasting, Apple Watch",
  description:
    "How am I today? A calm calorie tracker for iPhone and Apple Watch: AI photo meals, fasting, sleep and recovery, and Kai's honest morning note.",
  robots: { index: false, follow: false },
};

const hueVar = (h: Hue) => ({ "--hue": `var(--${h})` }) as CSSProperties;

function Phone({ shot, alt, className, priority, children }: { shot: string; alt: string; className?: string; priority?: boolean; children?: ReactNode }) {
  return (
    <figure className={`${s.phone} ${className ?? ""}`}>
      <span className={s.island} aria-hidden="true" />
      <span className={s.screen}>
        <img
          src={`/shots/today/${shot}-660.webp`}
          srcSet={`/shots/today/${shot}-660.webp 660w, /shots/today/${shot}-1320.webp 1320w`}
          sizes="(max-width: 900px) 70vw, 400px"
          width={660}
          height={1434}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
        />
        {children}
      </span>
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

// The app's own sparkle, the mark that sits beside every Kai line on screen.
function Sparkle() {
  return (
    <svg className={s.sparkle} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 3.5c.5 3.6 2.4 5.6 6 6.1-3.6.5-5.5 2.5-6 6.1-.5-3.6-2.4-5.6-6-6.1 3.6-.5 5.5-2.5 6-6.1z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M18 2.5v4M16 4.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// The reading: a number, and what it means for you. The page's one repeated element.
function Reading({ value, unit, meaning, hue, size = "md" }: { value: string; unit?: string; meaning: ReactNode; hue: Hue; size?: "sm" | "md" | "lg" }) {
  return (
    <p className={`${s.reading} ${s[`reading_${size}`]}`} style={hueVar(hue)}>
      <span className={s.readValue}>
        {value}
        {unit && <small> {unit}</small>}
      </span>
      <span className={s.readJoin} aria-hidden="true" />
      <span className={s.readMeaning}>{meaning}</span>
    </p>
  );
}

function KaiLine({ text, from, hue, big }: { text: string; from?: string; hue?: Hue; big?: boolean }) {
  return (
    <blockquote className={`${s.kai} ${big ? s.kaiBig : ""}`} style={hue ? hueVar(hue) : undefined}>
      <Sparkle />
      <div>
        <p>{text}</p>
        {from && <cite>{from}</cite>}
      </div>
    </blockquote>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className={s.eyebrow}>{children}</p>;
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Zen Lean",
    operatingSystem: "iOS",
    applicationCategory: "HealthApplication",
    description:
      "A calm calorie tracker for iPhone and Apple Watch with AI photo meals, intermittent fasting, sleep and recovery, and Kai, a coach who writes a short note each morning.",
    url: "https://thezenlean.com",
    downloadUrl: STORE,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function VariationD() {
  return (
    <div className={`${s.root} ${round.variable}`} data-morning-root>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MorningClient />

      {/* The sky: the app's night and morning wallpapers, crossfaded by scroll. Fixed, behind everything. */}
      <div className={s.sky} aria-hidden="true">
        <span className={`${s.skyLayer} ${s.skyNight}`} />
        <span className={`${s.skyLayer} ${s.skyMorning}`} />
        <span className={s.veil} />
      </div>

      <header className={s.navWrap}>
        <nav className={s.nav} aria-label="Main">
          <a className={s.brand} href="/v/d">
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

      <main className={s.main}>
        {/* ---------- 1. Hero: before dawn, the one question ---------- */}
        <section className={s.hero} aria-labelledby="hero-title">
          <div className={`${s.wrap} ${s.heroGrid}`}>
            <div className={s.heroCopy}>
              <p className={s.woke}>
                <span className={s.wokeDot} aria-hidden="true" />
                Woke 5:17 AM
                <span className={s.wokeRule} aria-hidden="true" />
                <span className={s.wokeSoft}>5 h 51 m asleep</span>
              </p>
              <h1 id="hero-title" className={s.h1}>
                How am I today?
                <span className={s.h1Answer}>One glance, and you know.</span>
              </h1>
              <p className={s.lede}>
                Zen Lean reads your night, your recovery, your food and your fast, and Kai, a coach who has read all of
                it, tells you what it means and what to do about it. Kindly, and honestly.
              </p>
              <div className={s.ctaRow}>
                <Store />
                <span className={s.fine}>Monthly or yearly subscription. iOS 17 or later.</span>
              </div>
              <KaiLine big hue="nutrition" text="You moved well, but calories ran high several days this week. Small portions can close the gap." from="Kai, this morning. The one line that matters, quoted from the screen." />
            </div>

            <div className={s.heroPhoneCrop}>
              <Phone shot="insights" alt={ALT.insights} className={s.heroPhone} priority>
                <span className={s.noteRing} aria-hidden="true" />
              </Phone>
            </div>
          </div>

          <div className={s.wrap}>
            <ul className={s.glance} aria-label="Read from the screen above">
              <li><Reading size="sm" hue="sleep" value="77" meaning="Sleep, good" /></li>
              <li><Reading size="sm" hue="recovery" value="66" meaning="Recovery, overnight" /></li>
              <li><Reading size="sm" hue="energy" value="14/16" unit="h" meaning="Fast in progress" /></li>
              <li><Reading size="sm" hue="nutrition" value="23" unit="days" meaning="Meals logged, solid streak" /></li>
            </ul>
          </div>
        </section>

        {/* ---------- 2. The problem, with empathy ---------- */}
        <section className={s.problem} aria-labelledby="problem-title">
          <div className={s.wrap}>
            <div className={s.head}>
              <div>
                <Eyebrow>Why mornings feel heavy</Eyebrow>
                <h2 id="problem-title" className={s.h2}>Health tracking can feel like a test you failed before breakfast.</h2>
              </div>
              <p className={s.sub}>
                If you tried counting calories and quit, it was not a lack of willpower. The tools asked for work and
                handed back judgement.
              </p>
            </div>
            <ul className={s.problemGrid}>
              <li className={s.problemCard}>
                <p className={s.redNum} aria-hidden="true">-700 <small>kcal a day</small></p>
                <h3 className={s.h3}>A spreadsheet, and a verdict</h3>
                <p>
                  Calorie counters turn every meal into data entry and every evening into red numbers. A 2025 UCL and
                  Loughborough study of 58,881 posts about these apps found shame, frustration at the logging, and goals
                  with no grounding in health guidance. One user was told to eat -700 calories a day.
                </p>
              </li>
              <li className={s.problemCard}>
                <p className={s.apart} aria-hidden="true">
                  <span>Food app</span><i /><span>Fasting timer</span><i /><span>Wearable</span>
                </p>
                <h3 className={s.h3}>Three apps that never talk</h3>
                <p>
                  A food app, a fasting timer and a wearable with its own subscription. Each one knows a slice of your
                  morning. None of them puts it together, so you do, at 6 AM, half awake.
                </p>
              </li>
              <li className={s.problemCard}>
                <p className={`${s.reading} ${s.reading_sm} ${s.readingBare}`} aria-hidden="true">
                  <span className={s.readValue}>52 <small>ms HRV</small></span>
                  <span className={s.readJoin} />
                  <span className={s.readMeaning}>?</span>
                </p>
                <h3 className={s.h3}>Numbers with no meaning</h3>
                <p>
                  An HRV of 52 tells you nothing on its own. Is that good? For you? Today? A number without a meaning is
                  one more thing to worry about.
                </p>
              </li>
            </ul>
            <p className={s.turn}>
              <Sparkle />
              Zen Lean starts from the other end: what each number means for you, this morning.
            </p>
          </div>
        </section>

        {/* ---------- 3. The morning read, in the app's order ---------- */}
        <section id="how-it-works" className={s.read} aria-labelledby="read-title">
          <div className={s.wrap}>
            <div className={s.head}>
              <div>
                <Eyebrow>The morning read</Eyebrow>
                <h2 id="read-title" className={s.h2}>What you see when you wake, in the order you need it.</h2>
              </div>
              <p className={s.sub}>
                Four things, read top to bottom, each with what it means for you. Food, fasting, sleep and movement in
                one calm picture, from the Watch you already wear.
              </p>
            </div>
            <ol className={s.readList}>
              {READ.map((r, i) => (
                <li key={r.n} className={`${s.readRow} ${i % 2 ? s.readRowFlip : ""}`} style={hueVar(r.hue)}>
                  <div className={s.readShot}>
                    <Phone shot={r.shot} alt={ALT[r.shot as keyof typeof ALT]} className={i % 2 ? s.tiltR : s.tiltL} />
                  </div>
                  <div className={s.readText}>
                    <p className={s.step}>
                      <span className={s.stepN}>{r.n}</span>
                      <span className={s.stepRule} aria-hidden="true" />
                      {r.label}
                    </p>
                    <h3 className={s.srOnly}>{r.label}</h3>
                    <Reading size="lg" hue={r.hue} value={r.value} unit={r.unit} meaning={r.meaning} />
                    <p className={s.readBody}>{r.body}</p>
                    <ul className={s.facts}>
                      {r.facts.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    {r.note && <KaiLine hue={r.hue} text={r.note} from={r.noteFrom} />}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- 4. Kai ---------- */}
        <section id="kai" className={s.kaiSection} aria-labelledby="kai-title">
          <div className={`${s.wrap} ${s.kaiGrid}`}>
            <div>
              <Eyebrow>Kai, your coach</Eyebrow>
              <h2 id="kai-title" className={s.h2}>Kai has read your night. It tells you the truth, kindly.</h2>
              <ul className={s.vows}>
                <li>
                  <h3 className={s.h3}>No guilt.</h3>
                  <p>A rough night is a rough night, not a failure. The warmth goes into the words, never into the score.</p>
                </li>
                <li>
                  <h3 className={s.h3}>No cheerleading.</h3>
                  <p>No ring turns green that you did not earn. Quiet by default, louder only when it matters.</p>
                </li>
                <li>
                  <h3 className={s.h3}>No chat.</h3>
                  <p>Kai writes short notes. There is nothing to type and nothing to keep up with. It reports, it never nags.</p>
                </li>
              </ul>
            </div>
            <div className={s.kaiStack}>
              {KAI_LINES.map((k) => (
                <KaiLine key={k.text} hue={k.hue} text={k.text} from={k.from} />
              ))}
              <p className={s.tiny}>Every line here is quoted word for word from the app screens on this page.</p>
            </div>
          </div>
        </section>

        {/* ---------- 5. It will tell you the truth ---------- */}
        <section id="science" className={s.truth} aria-labelledby="truth-title">
          <div className={s.wrap}>
            <div className={s.head}>
              <div>
                <Eyebrow>Honest by design</Eyebrow>
                <h2 id="truth-title" className={s.h2}>It will tell you the truth, even at 6 AM.</h2>
              </div>
              <p className={s.sub}>
                Being kind is not the same as being flattering. These five rules are built in, and no goal you set can
                talk the app past them.
              </p>
            </div>
            <div className={s.truthGrid}>
              <div className={s.truthShot}>
                <Phone shot="checkin" alt={ALT.checkin} className={s.tiltL}>
                  <span className={s.learnRing} aria-hidden="true" />
                </Phone>
                <p className={s.caption}>
                  <Sparkle />
                  On screen: &ldquo;Until then your check-ins are being saved, not judged.&rdquo;
                </p>
              </div>
              <ol className={s.truthList}>
                {TRUTHS.map((t) => (
                  <li key={t.title} style={hueVar(t.hue)}>
                    <p className={s.truthValue}>
                      {t.value}
                      {"unit" in t && t.unit && <small> {t.unit}</small>}
                    </p>
                    <div>
                      <h3 className={s.h3}>{t.title}</h3>
                      <p>{t.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <p className={s.formulas}>
              <strong>Named formulas.</strong> Mifflin-St Jeor for BMR and TDEE. Karvonen for heart rate zones. The FRIEND
              registry for Fitness Age. Keytel 2005 for workout calories. WHO cutoffs for BMI. Helgerud 2007 for 4x4
              intervals.
            </p>
          </div>
        </section>

        {/* ---------- 6. The Watch, and privacy ---------- */}
        <section id="watch" className={s.watch} aria-labelledby="watch-title">
          <div className={`${s.wrap} ${s.watchGrid}`}>
            <div className={s.watchShot}>
              <Phone shot="activity" alt={ALT.activity} className={s.tiltR}>
                <span className={s.hrvRing} aria-hidden="true" />
              </Phone>
            </div>
            <div>
              <Eyebrow>Apple Watch</Eyebrow>
              <h2 id="watch-title" className={s.h2}>The Watch you already wear reads the night.</h2>
              <p className={s.sub}>
                No second device and no second subscription for a wearable. Sleep, resting heart rate and HRV reach Zen
                Lean through Apple Health or Google Health (Beta), and land next to your food and your fast.
              </p>
              <Reading hue="heart" value="52" unit="ms HRV" meaning="Shown beside 51 bpm resting, Fitness Age 31, and the night it came from." />
              <ul className={s.watchList}>
                <li style={hueVar("energy")}><span className={s.dot} aria-hidden="true" /><div><h3>Start a fast from your wrist</h3><p>16:8 or your own window. The phone follows.</p></div></li>
                <li style={hueVar("sleep")}><span className={s.dot} aria-hidden="true" /><div><h3>Sleep, recovery, readiness</h3><p>Plus Fitness Age and day strain, from the Watch you own.</p></div></li>
                <li style={hueVar("trend")}><span className={s.dot} aria-hidden="true" /><div><h3>Meals and water on iPhone</h3><p>Where the camera is. Ten photo analyses a day.</p></div></li>
              </ul>

              <div className={s.privacy} aria-labelledby="privacy-title">
                <h3 id="privacy-title">Your mornings are yours.</h3>
                <ul>
                  <li><strong>No ads.</strong></li>
                  <li><strong>Your data is never sold.</strong></li>
                  <li>Anonymous usage stats, <strong>with a switch to turn them off.</strong></li>
                  <li>Delete your account and <strong>everything goes.</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 7. Guides ---------- */}
        <section id="guides" className={s.guides} aria-labelledby="guides-title">
          <div className={s.wrap}>
            <div className={s.head}>
              <div>
                <Eyebrow>Guides</Eyebrow>
                <h2 id="guides-title" className={s.h2}>The why behind each number.</h2>
              </div>
              <a className={s.textLink} href="/guides">All guides &#8594;</a>
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

        {/* ---------- 8. FAQ ---------- */}
        <section id="faq" className={s.faq} aria-labelledby="faq-title">
          <div className={`${s.wrap} ${s.faqGrid}`}>
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 id="faq-title" className={s.h2}>Asked before you download.</h2>
              <p className={s.sub}>
                Anything else, write to <a href="mailto:hello@thezenlean.com">hello@thezenlean.com</a>. A person answers.
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

        {/* ---------- 9. Closing, in full morning light ---------- */}
        <section className={s.closing} aria-labelledby="close-title">
          <div className={`${s.wrap} ${s.closeInner}`}>
            <h2 id="close-title" className={s.closeTitle}>Tomorrow morning, you&rsquo;ll know.</h2>
            <p className={s.closeSub}>
              How you slept, how recovered you are, what you have left, where your fast is, and one honest line from Kai.
            </p>
            <div className={`${s.ctaRow} ${s.ctaCenter}`}>
              <Store />
              <span className={s.fineLight}>Monthly or yearly subscription</span>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.wrap}>
          <div className={s.footGrid}>
            <div className={s.footBrand}>
              <a className={s.brand} href="/v/d">
                <img src="/icon-512.png" alt="" width={34} height={34} />
                Zen Lean
              </a>
              <p>How am I today? One calm answer each morning, for iPhone and Apple Watch.</p>
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
