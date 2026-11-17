// The app's own cards, rebuilt in HTML and CSS so they can move. Each one is a copy of a real Zen Lean
// screen captured on 17 Nov 2026 (the crops in public/shots/crops are the reference: same labels, same
// numbers, same colours). Owner, 17 Nov: "Don't use screenshots. Create these in HTML and CSS to animate them."
//
// Static by default: every number and bar renders in its final state. Cinema.tsx arms a card
// (data-arm) only when JavaScript runs and motion is allowed, then sets data-on when it scrolls into view,
// so a reader without JavaScript or with reduced motion sees the finished card, never an empty one.

import type { CSSProperties, ReactNode } from "react";
import w from "./w.module.css";

const v = (n: number) => ({ "--v": n }) as CSSProperties;
const d = (i: number) => ({ "--i": i }) as CSSProperties;

/** A number that counts up from zero when its card comes into view. */
function N({ to, dec = 0, children }: { to: number; dec?: number; children?: ReactNode }) {
  return (
    <span data-count={to} data-dec={dec}>
      {children ?? to.toFixed(dec)}
    </span>
  );
}

function Card({ name, className, children, label }: { name: string; className?: string; children: ReactNode; label: string }) {
  return (
    <div className={`${w.w} ${className ?? ""}`} data-w={name} role="img" aria-label={label}>
      <div aria-hidden="true" className={w.inner}>{children}</div>
    </div>
  );
}

/* ---------- small icons, drawn to match the app's SF Symbols ---------- */
const I = {
  heart: <svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>,
  moon: <svg viewBox="0 0 24 24"><path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>,
  flame: <svg viewBox="0 0 24 24"><path d="M12 21a6 6 0 0 0 6-6c0-4-3-6.5-4-10-2 2-3 3.5-3 5.5-1-1-1.5-2-1.5-3C7.5 9.5 6 12 6 15a6 6 0 0 0 6 6Zm0 0a2.5 2.5 0 0 0 2.5-2.5c0-1.8-1.3-2.6-2.5-4.2-1.2 1.6-2.5 2.4-2.5 4.2A2.5 2.5 0 0 0 12 21Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>,
  spark: <svg viewBox="0 0 24 24"><path d="M10 3.5 11.6 8.4 16.5 10 11.6 11.6 10 16.5 8.4 11.6 3.5 10 8.4 8.4Z M17.5 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>,
  clock: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>,
  sun: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  chev: <svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  info: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M12 11v6M12 7.5v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
  eye: <svg viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>,
  face: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ffcc3d" /><circle cx="8.8" cy="10" r="1.3" fill="#5b3a00" /><circle cx="15.2" cy="10" r="1.3" fill="#5b3a00" /><path d="M8.5 15h7" stroke="#5b3a00" strokeWidth="1.5" strokeLinecap="round" /></svg>,
};

/** The app's Kai row: a sparkle, one line from Kai, and a chevron. */
function KaiRow({ text }: { text: string }) {
  return (
    <div className={w.kaiRow}>
      <span className={w.kaiSpark}>{I.spark}</span>
      <p>{text}</p>
      <span className={w.chev}>{I.chev}</span>
    </div>
  );
}

/* ================= Fasting ================= */

/** Fasting screen, top: the live countdown and the stage bar. The clock really ticks. */
export function FastCountdown({ hero }: { hero?: boolean }) {
  const segs = [1, 1, 1, 1, 0.5];
  return (
    <Card name="fast-countdown" className={`${w.fastCard} ${hero ? w.hero : ""}`} label="Fasting countdown: 1 hour 56 minutes remaining. Fat burn rising.">
      <p className={w.cap}>Remaining</p>
      <p className={w.clock} data-clock="6998">01:56:38</p>
      <p className={w.fastLine}><b>Fat burn rising.</b> Fat use is climbing as glycogen runs lower.</p>
      {!hero && <p className={w.dim}>Electrolytes can help.</p>}
      <div className={w.segs}>
        {segs.map((f, i) => (
          <span key={i}><i style={{ ...v(f), ...d(i) }} /></span>
        ))}
      </div>
      <div className={w.segLabels}><span>Start</span><span>4h</span><span>8h</span><span>12h</span><span>Goal 16h</span></div>
      {!hero && <p className={w.allStages}>All stages <span className={w.chevSm}>{I.chev}</span></p>}
    </Card>
  );
}

/** Fasting screen: the "You are here" stage card. */
export function FastStage() {
  return (
    <Card name="fast-stage" className={w.stageCard} label="You are here: Lipolysis, fat burn rising, 14 h 7 m into this fast.">
      <div className={w.stageHead}>
        <span className={w.flame}>{I.flame}</span>
        <div className={w.rise} style={d(0)}>
          <p className={w.here}>You are here</p>
          <p className={w.stageName}>Lipolysis</p>
          <p className={w.soft}>Fat burn rising</p>
          <p className={w.soft}>14h 7m into this fast</p>
        </div>
        <span className={w.pill}>12-16h</span>
      </div>
      <p className={`${w.stageBody} ${w.rise}`} style={d(2)}>Lipolysis releases fatty acids from fat tissue so muscles and other organs can burn them. As glycogen runs lower, fat supplies a larger share of energy. This is the ramp toward a deeper fast.</p>
    </Card>
  );
}

const HISTORY = [
  { day: "Thu", n: 5, dur: "16h 12m", span: "Wed, 9:31 PM → Thu, 1:43 PM", tag: "Goal hit", close: false },
  { day: "Wed", n: 4, dur: "15h 54m", span: "Tue, 9:40 PM → Wed, 1:34 PM", tag: "Close", close: true },
  { day: "Tue", n: 3, dur: "16h 42m", span: "Mon, 9:40 PM → Tue, 2:22 PM", tag: "Goal hit", close: false },
  { day: "Mon", n: 2, dur: "16h 48m", span: "Sun, 9:40 PM → Mon, 2:28 PM", tag: "Beat goal", close: false },
  { day: "Sun", n: 1, dur: "16h 31m", span: "Sat, 9:40 PM → Sun, 2:11 PM", tag: "Goal hit", close: false },
];

/** Fasting screen: History. */
export function FastHistory() {
  return (
    <Card name="fast-history" className={w.histCard} label="Fasting history: 16 h 12 m goal hit, 15 h 54 m close, 16 h 42 m goal hit, 16 h 48 m beat goal, 16 h 31 m goal hit.">
      <div className={w.histHead}><p className={w.cap}>History</p><span>11</span></div>
      <ul className={w.hist}>
        {HISTORY.map((h, i) => (
          <li key={h.n} className={w.slide} style={d(i)}>
            <span className={w.histDay}>{h.day}<b>{h.n}</b></span>
            <span className={w.histMain}>
              <b className={h.close ? w.amber : w.green}>{h.dur}</b>
              <small>{h.span}</small>
            </span>
            <span className={`${w.badge} ${h.close ? w.amber : w.green}`}>{I.face}{h.tag}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ================= Sleep ================= */

/** Sleep card: score ring, need, and the three numbers under it. */
export function SleepScore() {
  return (
    <Card name="sleep-score" className={w.sleepCard} label="Sleep 77, Good, 76% of need. 5 h 51 m asleep, 5 h 57 m in bed, 98% efficiency.">
      <div className={w.row}>
        <span className={w.moon}>{I.moon}</span>
        <div className={w.grow}>
          <p className={w.title}>Sleep</p>
          <p className={w.title}>Good · <span className={w.red}>76% of need</span></p>
        </div>
        <span className={w.scoreRing}>
          <svg viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="27" className={w.track} />
            <circle cx="32" cy="32" r="27" pathLength={100} className={w.arc} style={{ ...v(77), stroke: "#34d474" }} />
          </svg>
          <b className={w.green}><N to={77} /></b>
        </span>
      </div>
      <div className={w.stats}>
        <span><em>{I.moon}5h 51m</em>Asleep</span>
        <span><em>{I.clock}5h 57m</em>In bed</span>
        <span><em>{I.heart}<span><N to={98} />%</span></em>Efficiency</span>
      </div>
      <KaiRow text="Short sleep logged. Stack small wins, not heroics." />
    </Card>
  );
}

// Last night's hypnogram, read off the app's chart: [lane, start %, end %] across 11:20 PM to 5:17 AM.
// Lanes: 0 awake, 1 REM, 2 core, 3 deep.
const HYP: [number, number, number][] = [
  [2, 0, 17], [3, 17.5, 21.7], [1, 22.4, 24], [2, 24.5, 38.3], [3, 38.7, 45.3], [1, 45.3, 52.8],
  [2, 53.2, 68.3], [3, 68.9, 70.4], [1, 70.8, 77.7], [0, 77.7, 78.9], [2, 79.2, 93.4], [3, 93.8, 95.3], [1, 95.3, 100],
];
const LANES = ["Awake", "REM", "Core", "Deep"];

/** Sleep: the stage chart. */
export function SleepStages() {
  return (
    <Card name="sleep-stages" className={w.stagesCard} label="Sleep stages from 11:20 PM to 5:17 AM: awake 5 m, REM 1 h 17 m, core 3 h 36 m, deep 57 m.">
      <div className={w.histHead}><p className={w.title}>Sleep stages</p><span className={w.soft}>11:20 PM – 5:17 AM</span></div>
      <div className={w.hyp}>
        <div className={w.lanes}>{LANES.map((l) => <span key={l}>{l}</span>)}</div>
        <div className={w.plot}>
          {LANES.map((l, i) => <i key={l} className={w[`lane${i}`]} />)}
          <div className={w.wipe}>
            {HYP.slice(1).map(([lane, a], i) => {
              const prev = HYP[i][0];
              const lo = Math.min(lane, prev), hi = Math.max(lane, prev);
              return <i key={`c${i}`} className={w.link} style={{ left: `${a}%`, top: `${lo * 25 + 12.5}%`, height: `${(hi - lo) * 25}%` }} />;
            })}
            {HYP.map(([lane, a, b], i) => (
              <span key={i} className={w[`b${lane}`]} style={{ left: `${a}%`, width: `${b - a}%`, top: `${lane * 25 + 4}%` }} />
            ))}
          </div>
        </div>
      </div>
      <div className={w.axis}><span style={{ left: "29%" }}>1 AM</span><span style={{ left: "62.6%" }}>3 AM</span></div>
      <div className={w.share}>
        <i className={`${w.b0} ${w.shareDot}`} />
        <i className={w.b1} style={{ flex: 22 }} />
        <i className={w.b2} style={{ flex: 62 }} />
        <i className={w.b3} style={{ flex: 16 }} />
      </div>
      <ul className={w.legend}>
        <li><i className={w.b0} />Awake<b>5m</b><span>2%</span></li>
        <li><i className={w.b1} />REM<b>1h 17m</b><span>22%</span></li>
        <li><i className={w.b2} />Core<b>3h 36m</b><span>62%</span></li>
        <li><i className={w.b3} />Deep<b>57m</b><span>16%</span></li>
      </ul>
      <div className={`${w.stats} ${w.stats2}`}>
        <span><em><span className={w.blue}>{I.clock}</span>5h 57m</em>Time in bed</span>
        <span><em><span className={w.amber}>{I.eye}</span>5m</em>Awake</span>
      </div>
    </Card>
  );
}

/** Sleep: the circadian dial, last night against the usual window. */
export function SleepClock() {
  // 24-hour dial, 0 at the top. Fell asleep 23:20 (-10 deg), woke 05:17 (79.25 deg).
  const R = 46;
  const pt = (deg: number, r = R) => [60 + r * Math.sin((deg * Math.PI) / 180), 60 - r * Math.cos((deg * Math.PI) / 180)];
  const arc = (a: number, b: number, r = R) => {
    const [x1, y1] = pt(a, r);
    const [x2, y2] = pt(b, r);
    return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  };
  const ticks = Array.from({ length: 24 }, (_, h) => {
    const [x1, y1] = pt(h * 15, 38);
    const [x2, y2] = pt(h * 15, h % 6 === 0 ? 33 : 35.5);
    return <line key={h} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });
  return (
    <Card name="sleep-clock" className={w.clockCard} label="Circadian dial: fell asleep 11:20 PM, woke up 5:17 AM, against the usual window.">
      <p className={`${w.title} ${w.iconTitle}`}><span className={w.blue}>{I.sun}</span>Circadian</p>
      <div className={w.clockRow}>
        <svg viewBox="0 0 120 120" className={w.dial}>
          <circle cx="60" cy="60" r="50" className={w.dialFace} />
          <g className={w.ticks}>{ticks}</g>
          <path d={arc(-14, 84, 52)} className={w.usual} />
          <path d={arc(-10, 79.25)} pathLength={100} className={w.night} />
          <text x="60" y="31" className={w.dialN}>0</text>
          <text x="88" y="63" className={w.dialN}>6</text>
          <text x="60" y="96" className={w.dialN}>12</text>
          <text x="32" y="63" className={w.dialN}>18</text>
          <path d="M63 47.5a5 5 0 0 1-6.5-6.5 5 5 0 1 0 6.5 6.5Z" className={w.dialMoon} />
          <text x="60" y="62" className={w.dialT}>24-hour</text>
          <text x="60" y="71" className={w.dialT}>rhythm</text>
        </svg>
        <div className={w.times}>
          <p className={w.rise} style={d(1)}><b className={w.blue}><i className={w.bullet} />11:20 PM</b>Fell asleep</p>
          <p className={w.rise} style={d(2)}><b className={w.violet}><i className={w.bullet} />5:17 AM</b>Woke up</p>
        </div>
      </div>
      <div className={w.keys}><span><i className={w.keyBlue} />Last night</span><span><i />Your usual window</span></div>
    </Card>
  );
}

/* ================= Heart and recovery ================= */

/** Heart card: RHR gauge and today's range. */
export function HeartRange() {
  return (
    <Card name="heart-range" className={w.heartCard} label="Heart: resting heart rate 56 bpm, running high. Latest 55 bpm against today's range of 50 to 55.">
      <div className={w.row}>
        <span className={w.heartIcon}>{I.heart}</span>
        <div className={w.grow}>
          <p className={w.title}>Heart</p>
          <p className={`${w.title} ${w.pink}`}>RHR running high</p>
        </div>
        <span className={w.gauge}>
          <svg viewBox="0 0 80 58">
            <defs>
              <linearGradient id="wg-heart" x1="0" x2="1">
                <stop offset="0" stopColor="#4ade80" /><stop offset=".5" stopColor="#facc5a" /><stop offset="1" stopColor="#f2557a" />
              </linearGradient>
            </defs>
            <path d="M12 50A30 30 0 1 1 68 50" className={w.gaugeArc} stroke="url(#wg-heart)" />
            <g className={w.knobSpin}><circle cx="40" cy="10" r="4.6" className={w.knob} /></g>
          </svg>
          <b><N to={56} /></b><small>bpm</small>
        </span>
      </div>
      <div className={w.rangeRow}>
        <span className={w.latest}><small>Latest</small><b><N to={55} /></b> bpm</span>
        <span className={w.range}>
          <span className={w.rangeBar}><i /></span>
          <span className={w.rangeLabels}><span>50</span><span>Today&apos;s range</span><span>55</span></span>
        </span>
      </div>
      <KaiRow text="Heart rate ran high in today's range. Easy movement and sleep tonight may help." />
    </Card>
  );
}

function Ring({ id, value, show, label, from, to, tail }: { id: string; value: number; show: ReactNode; label: string; from: string; to: string; tail?: boolean }) {
  return (
    <span className={w.ring}>
      <svg viewBox="0 0 64 64">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={from} /><stop offset="1" stopColor={to} /></linearGradient>
        </defs>
        <circle cx="32" cy="32" r="25" className={w.trackDark} />
        <circle cx="32" cy="32" r="25" pathLength={100} className={w.arc} stroke={`url(#${id})`} style={v(value)} />
      </svg>
      <b className={tail ? w.dimNum : undefined}>{show}</b>
      <small>{label}</small>
    </span>
  );
}

/** Recovery strip: sleep need, recovery and day strain. */
export function RecoveryRings() {
  return (
    <Card name="recovery-rings" className={w.ringsCard} label="Sleep Need 76%, Recovery 66, Day Strain 0.0.">
      <span className={w.info}>{I.info}</span>
      <Ring id="wg-need" value={76} show={<><N to={76} />%</>} label="Sleep Need" from="#5ee0ff" to="#8b8cf6" />
      <Ring id="wg-rec" value={66} show={<N to={66} />} label="Recovery" from="#ffd25a" to="#ff8a2a" />
      <Ring id="wg-strain" value={14} show="0.0" label="Day Strain" from="#2a3348" to="#a99adf" tail />
    </Card>
  );
}

/** Fitness Age: the number and twelve weeks of readings. */
export function FitnessAge() {
  // Nine weekly readings, read off the app's chart (y in px of a 0-60 box; 40 is the dashed age line).
  const xs = [4, 34, 64, 94, 124, 158, 190, 216, 240];
  const ys = [40, 40, 40, 40, 40, 30, 22, 22, 30];
  const end = 260;
  const path = `M${xs[0]} ${ys[0]} L${xs[4]} 40 C150 40 160 22 ${xs[6]} 22 L${xs[7]} 22 C230 22 240 34 ${end} 40`;
  return (
    <Card name="fitness-age" className={w.fitCard} label="Fitness Age 30, in line with your age of 30, with nine weekly readings over eleven weeks.">
      <div className={w.row}>
        <span className={w.fitIcon}>{I.spark}</span>
        <div className={w.grow}>
          <p className={w.title}>Fitness Age</p>
          <p className={w.soft}>In line with your age of 30.</p>
        </div>
        <span className={w.fitNum}><N to={30} /><small>yr</small></span>
      </div>
      <svg viewBox="0 0 264 60" className={w.fitChart} preserveAspectRatio="none">
        <line x1="0" y1="40" x2="264" y2="40" className={w.ageLine} />
        <path d={`${path} L${end} 60 L${xs[0]} 60 Z`} className={w.fitArea} />
        <path d={path} pathLength={100} className={w.fitLine} />
        {xs.map((x, i) => <circle key={x} cx={x} cy={ys[i]} r="1.8" className={w.fitDot} style={d(i)} />)}
        <circle cx={end} cy="40" r="3.4" className={w.fitEnd} />
      </svg>
      <div className={w.fitTint}>
        <p className={w.fitNote}>9 weekly readings over 11 weeks. Dashed line is your age, 30.</p>
      </div>
      <KaiRow text="What's affecting it & how to improve" />
    </Card>
  );
}

/* ================= Activity ================= */

/** Activity hero card: kcal moved and the three rings. */
export function ActivityRings() {
  const rows = [
    { k: "Move", v: "430", of: "/ 500 kcal", c: "#ff3b8d" },
    { k: "Exercise", v: "0", of: "/ 30 min", c: "#5ad8f5" },
    { k: "Stand", v: "0", of: "/ 12 h", c: "#a99af0" },
  ];
  return (
    <Card name="activity-rings" className={w.actCard} label="Activity: 430 kcal moved, closing on your 500 goal. Exercise 0 of 30 minutes, stand 0 of 12 hours.">
      <p className={w.kcal}><b><N to={430} /></b> kcal</p>
      <p className={w.title}>Closing on your 500 goal.</p>
      <div className={w.actRow}>
        <svg viewBox="0 0 64 64" className={w.actRings}>
          <circle cx="32" cy="32" r="27" className={w.trackPink} />
          <circle cx="32" cy="32" r="27" pathLength={100} className={w.arc} style={{ ...v(86), stroke: "#ff3b8d" }} />
          <circle cx="32" cy="32" r="19" className={w.trackCyan} />
          <circle cx="32" cy="32" r="11.5" className={w.trackViolet} />
        </svg>
        <ul className={w.actList}>
          {rows.map((r, i) => (
            <li key={r.k} className={w.rise} style={d(i)}><i style={{ background: r.c }} />{r.k}<b>{r.v}</b><small>{r.of}</small></li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

// Hour-by-hour bars, read off the app's timeline: [hour, height 0-1].
const HOURLY = [
  { k: "Move", total: "385 kcal", c: "#e0458f", bars: [[8, 0.6], [9, 1], [10, 0.45], [13, 0.35], [14, 0.8], [15, 0.3], [18, 0.75]] },
  { k: "Exercise", total: "24 min", c: "#3fb6ea", bars: [[9, 1], [18, 0.55]] },
  { k: "Stand", total: "8 hrs", c: "#9e87ec", bars: [[8, 0.7], [9, 0.7], [10, 0.7], [12, 0.7], [13, 0.7], [14, 0.7], [16, 0.7], [18, 0.7]] },
];

/** Activity: move, exercise and stand, hour by hour. */
export function ActivityHourly() {
  let n = 0;
  return (
    <Card name="activity-hourly" className={w.hourCard} label="Hourly activity: move 385 kcal, exercise 24 min, stand 8 hours, as bars across the day.">
      {HOURLY.map((r) => (
        <div key={r.k} className={w.hourRow}>
          <p><b style={{ color: r.c }}>{r.k}</b><span>{r.total}</span></p>
          <div className={w.hourBars}>
            {r.bars.map(([h, ht]) => (
              <i key={h} style={{ left: `${(h / 24) * 100}%`, height: `${ht * 100}%`, background: r.c, ...d(n++) }} />
            ))}
          </div>
        </div>
      ))}
      <div className={w.hourAxis}><span>12a</span><span>6a</span><span>12p</span><span>6p</span><span>12a</span></div>
    </Card>
  );
}

/** Activity: the 65% exercise credit, drawn as a bar rather than a screenshot. */
export function ExerciseCredit() {
  return (
    <Card name="exercise-credit" className={w.creditCard} label="Exercise calories are credited at 65%, capped at 900 a day.">
      <p className={w.creditBig}><N to={65} />%</p>
      <div className={w.creditBar}><i style={v(65)} /></div>
      <div className={w.creditLabels}><span>Credited</span><span>Cap 900 a day</span></div>
    </Card>
  );
}

export const WIDGETS = {
  "fast-countdown": FastCountdown,
  "fast-stage": FastStage,
  "fast-history": FastHistory,
  "sleep-score": SleepScore,
  "sleep-stages": SleepStages,
  "sleep-clock": SleepClock,
  "heart-range": HeartRange,
  "recovery-rings": RecoveryRings,
  "fitness-age": FitnessAge,
  "activity-rings": ActivityRings,
  "activity-hourly": ActivityHourly,
  "exercise-credit": ExerciseCredit,
} as const;
export type WidgetName = keyof typeof WIDGETS;
