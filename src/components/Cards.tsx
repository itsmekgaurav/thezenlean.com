import { Ph } from "./icons";

// The app's cards, rebuilt from its screens (values read off the 15 Nov 2026 captures) so they can
// move. Every element that animates carries a data-* hook that DayStory's timeline drives; the
// markup alone shows the finished state, which is what reduced-motion visitors and crawlers get.

const RING = 2 * Math.PI * 46;

export function Ring({ pct, color, hook, size = 112, width = 9, children }: { pct: number; color: string; hook: string; size?: number; width?: number; children?: React.ReactNode }) {
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg viewBox="0 0 104 104" width={size} height={size}>
        <circle cx="52" cy="52" r="46" className="ring-track" strokeWidth={width} />
        <circle cx="52" cy="52" r="46" className="ring-fill" stroke={color} strokeWidth={width}
          strokeDasharray={RING} strokeDashoffset={RING * (1 - pct)} data-ring={hook} data-pct={pct} />
      </svg>
      <div className="ring-label">{children}</div>
    </div>
  );
}

export function SleepCard() {
  const stages = [3, 5, 4, 7, 6, 2, 5, 8, 6, 4, 7, 5, 3, 6, 8, 5, 4, 6, 3, 2];
  return (
    <article className="app-card" data-card="sleep">
      <header className="ac-head">
        <span className="ac-icon" style={{ color: "#818cf8" }}><Ph i="moon" /></span>
        <div><b>Sleep</b><small>Good · <span className="warm">77% of need</span></small></div>
        <Ring pct={0.77} color="#39ff8a" hook="sleep" size={72} width={10}><span data-count="sleep" data-to="77">77</span></Ring>
      </header>
      <div className="hypno" aria-hidden="true">
        {stages.map((h, i) => <span key={i} data-bar style={{ height: `${h * 10}%` }} />)}
      </div>
      <div className="ac-stats">
        <div><b>5h 51m</b><small>Asleep</small></div>
        <div><b>5h 57m</b><small>In bed</small></div>
        <div><b><span data-count="eff" data-to="98">98</span>%</b><small>Efficiency</small></div>
      </div>
      <p className="ac-note"><Ph i="sparkle" /> Some rest is still rest. Go easy on yourself today.</p>
    </article>
  );
}

export function CheckinCard() {
  const chips = [
    { k: "Energy", v: "Good", i: "batteryFull" as const, c: "#39ff8a" },
    { k: "Body", v: "Okay", i: "smiley" as const, c: "#a78bfa" },
    { k: "Mood", v: "Good", i: "thumbsUp" as const, c: "#39ff8a" },
  ];
  return (
    <article className="app-card" data-card="checkin">
      <header className="ac-head plain"><span className="ac-icon" style={{ color: "#5ce1ff" }}><Ph i="sparkle" /></span><b>Today&rsquo;s check-in</b></header>
      <div className="chips">
        {chips.map((c) => (
          <div key={c.k} className="chip" data-chip>
            <small><Ph i={c.i} style={{ color: c.c }} /> {c.k}</small>
            <b>{c.v}</b>
          </div>
        ))}
      </div>
      <div className="ac-inset">
        <b><Ph i="pulse" style={{ color: "#a78bfa" }} /> Learning your normal</b>
        <p>Comparing how you feel to your Recovery only means something once we know your own usual range for both.</p>
      </div>
    </article>
  );
}

export function MealCard() {
  const macros = [
    { k: "Protein", v: 10, of: 136, c: "#15803d" },
    { k: "Carbs", v: 65, of: 241, c: "#d97706" },
    { k: "Fat", v: 12, of: 64, c: "#f472b6" },
    { k: "Fibre", v: 9, of: 33, c: "#a78bfa" },
  ];
  return (
    <article className="app-card meal" data-card="meals">
      <div className="photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/oat.jpg" alt="Oatmeal bowl with banana" />
        <span className="scan" data-scan />
        <span className="photo-tag" data-tag><Ph i="sparkle" /> 380 kcal</span>
      </div>
      <div className="left-today">
        <small>LEFT TODAY</small>
        <div className="big"><span data-count="left" data-from="2088" data-to="1708">1,708</span><em>kcal</em></div>
        <div className="budget"><span data-budget style={{ width: "18%" }} /></div>
        <div className="budget-row"><small>380 eaten</small><small>2,088 budget</small></div>
      </div>
      <div className="macros">
        {macros.map((m) => (
          <div key={m.k} className="macro" data-macro>
            <small>{m.k.toUpperCase()}</small>
            <b>{m.v}<i>/{m.of}</i></b>
            <span className="bar"><span style={{ width: `${(m.v / m.of) * 100}%`, background: m.c }} /></span>
          </div>
        ))}
      </div>
    </article>
  );
}

export function WaterCard() {
  return (
    <article className="app-card water" data-card="water">
      <header className="ac-head plain"><b>Water</b><small>Sunday, 15 November</small></header>
      <div className="glass" aria-hidden="true">
        <div className="water-fill" data-water style={{ height: "38%" }}>
          <svg className="wave" viewBox="0 0 400 40" preserveAspectRatio="none"><path d="M0 20 Q 50 0 100 20 T 200 20 T 300 20 T 400 20 V40 H0 Z" /></svg>
        </div>
        <div className="glass-label"><b><span data-count="water" data-to="750">750</span></b><small>ml of 2.0 L</small></div>
      </div>
      <p className="pace-pill">38% · ON PACE</p>
      <div className="quick">
        <span>+ 150 ml</span><span className="on" data-tap>+ 250 ml</span><span>+ 500 ml</span>
      </div>
    </article>
  );
}

export function ActivityCard() {
  return (
    <article className="app-card" data-card="activity">
      <small className="eyebrow-s">MOVED TODAY</small>
      <div className="big"><span data-count="move" data-to="1075">1,075</span><em>kcal</em></div>
      <p className="past">Past your 500 goal</p>
      <div className="activity-row">
        <Ring pct={1} color="#ff3d9a" hook="move" size={96} width={12} />
        <div className="act-list">
          <p><i style={{ background: "#ff3d9a" }} />Move <b>1,075</b><small>/ 500 kcal</small></p>
          <p><i style={{ background: "#39ff8a" }} />Exercise <b>0</b><small>/ 30 min</small></p>
          <p><i style={{ background: "#5ce1ff" }} />Stand <b>0</b><small>/ 12 h</small></p>
        </div>
      </div>
      <div className="ac-stats four">
        <div><small>STEPS</small><b><span data-count="steps" data-to="22500">22,500</span></b></div>
        <div><small>RESTING</small><b>51 bpm</b></div>
        <div><small>HRV</small><b>52 ms</b></div>
        <div><small>FIT AGE</small><b>31</b></div>
      </div>
    </article>
  );
}

export function FastCard() {
  const stages = [
    { t: "4:49 AM", k: "Switching fuel", s: "Hour 4" },
    { t: "8:49 AM", k: "Glycogen burn", s: "Hour 8" },
    { t: "12:49 PM", k: "Fat burn rising", s: "Hour 12" },
    { t: "2:52 PM", k: "Now · hour 14", s: "Fat use is climbing as glycogen runs lower." },
  ];
  return (
    <article className="app-card fast" data-card="fasting">
      <p className="fast-badge"><span className="pulse-dot" /> You&rsquo;re fasting · 16:8</p>
      <small className="eyebrow-s">REMAINING</small>
      <div className="countdown" data-countdown>01:56:39</div>
      <div className="fast-bar"><span data-fastbar style={{ width: "88%" }} /></div>
      <ol className="stages">
        {stages.map((s) => (
          <li key={s.k} data-stage><span className="st-time">{s.t}</span><span className="st-dot" /><span><b>{s.k}</b><small>{s.s}</small></span></li>
        ))}
      </ol>
    </article>
  );
}

export const KAI_NOTE = "You moved well, but calories ran high several days this week. Small portions can close the gap.";

export function KaiCard() {
  return (
    <article className="app-card kai" data-card="kai">
      <header className="ac-head plain"><span className="kai-pill"><Ph i="sparkle" /> Kai</span><span className="kai-tag">ANALYSIS</span></header>
      <h3>This week</h3>
      <p className="kai-text"><span data-type>{KAI_NOTE}</span><span className="caret" data-caret /></p>
      <div className="ac-inset small"><b><Ph i="pulse" style={{ color: "#a78bfa" }} /> Learning your normal</b><p>Energy 4/5 against Recovery 66</p></div>
    </article>
  );
}
