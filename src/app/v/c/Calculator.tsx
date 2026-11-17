"use client";

import { useId, useState } from "react";
import s from "./c.module.css";

/* The same limits the app enforces (MARKETING.md safety limits). If the app's rules change, these
   change with them, or this page starts promising numbers the app will not give. */
const FLOOR = { female: 1200, male: 1500 } as const;
const DEFICIT_CAP = 1200;
const PACE_CAP_KG = 1;
const KCAL_PER_KG = 7700; // common approximation for 1 kg of body fat

const ACTIVITY = [
  { k: "1.2", label: "Mostly sitting", f: 1.2 },
  { k: "1.375", label: "Light, 1 to 3 days a week", f: 1.375 },
  { k: "1.55", label: "Moderate, 3 to 5 days", f: 1.55 },
  { k: "1.725", label: "Hard, 6 to 7 days", f: 1.725 },
  { k: "1.9", label: "Very hard or physical job", f: 1.9 },
];
const PACES = [0.25, 0.5, 0.75, 1];

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

export default function Calculator() {
  const id = useId();
  const [sex, setSex] = useState<"female" | "male">("female");
  const [age, setAge] = useState("34");
  const [height, setHeight] = useState("168");
  const [weight, setWeight] = useState("72");
  const [act, setAct] = useState("1.375");
  const [pace, setPace] = useState(0.5);

  const a = Number(age), h = Number(height), w = Number(weight);
  const valid = a >= 18 && a <= 90 && h >= 120 && h <= 230 && w >= 35 && w <= 250;
  const factor = ACTIVITY.find((x) => x.k === act)!.f;

  const bmr = valid ? 10 * w + 6.25 * h - 5 * a + (sex === "male" ? 5 : -161) : 0;
  const tdee = bmr * factor;
  const wanted = (Math.min(pace, PACE_CAP_KG) * KCAL_PER_KG) / 7;
  const deficit = Math.min(wanted, DEFICIT_CAP);
  const raw = tdee - deficit;
  const floor = FLOOR[sex];
  const target = Math.max(raw, floor);
  const floorHit = raw < floor;
  const actualDeficit = Math.max(0, tdee - target);

  return (
    <form className={s.calc} onSubmit={(e) => e.preventDefault()} aria-labelledby={`${id}-t`}>
      <div className={s.calcIn}>
        <p className={s.mono} id={`${id}-t`}>Inputs · metric</p>

        <fieldset className={s.field}>
          <legend className={s.fieldLabel}>Sex</legend>
          <div className={s.seg}>
            {(["female", "male"] as const).map((v) => (
              <label key={v} className={sex === v ? s.segOn : undefined}>
                <input type="radio" name={`${id}-sex`} value={v} checked={sex === v} onChange={() => setSex(v)} />
                {v === "female" ? "Female" : "Male"}
              </label>
            ))}
          </div>
        </fieldset>

        <div className={s.row3}>
          <label className={s.field}>
            <span className={s.fieldLabel}>Age</span>
            <span className={s.num}>
              <input inputMode="numeric" type="number" min={18} max={90} value={age} onChange={(e) => setAge(e.target.value)} />
              <em>yr</em>
            </span>
          </label>
          <label className={s.field}>
            <span className={s.fieldLabel}>Height</span>
            <span className={s.num}>
              <input inputMode="numeric" type="number" min={120} max={230} value={height} onChange={(e) => setHeight(e.target.value)} />
              <em>cm</em>
            </span>
          </label>
          <label className={s.field}>
            <span className={s.fieldLabel}>Weight</span>
            <span className={s.num}>
              <input inputMode="decimal" type="number" min={35} max={250} step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} />
              <em>kg</em>
            </span>
          </label>
        </div>

        <label className={s.field}>
          <span className={s.fieldLabel}>Activity</span>
          <select className={s.select} value={act} onChange={(e) => setAct(e.target.value)}>
            {ACTIVITY.map((x) => (
              <option key={x.k} value={x.k}>
                {x.label} (× {x.f})
              </option>
            ))}
          </select>
        </label>

        <fieldset className={s.field}>
          <legend className={s.fieldLabel}>Pace</legend>
          <div className={s.seg}>
            {PACES.map((p) => (
              <label key={p} className={pace === p ? s.segOn : undefined}>
                <input type="radio" name={`${id}-pace`} value={p} checked={pace === p} onChange={() => setPace(p)} />
                {p} kg/wk
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className={s.calcOut} aria-live="polite">
        {valid ? (
          <>
            <p className={s.mono}>Suggested daily target</p>
            <p className={s.calcBig}>
              <span>{fmt(target)}</span>
              <em>kcal</em>
            </p>
            <dl className={s.work}>
              <div>
                <dt>BMR · Mifflin-St Jeor</dt>
                <dd>
                  10 × {w} + 6.25 × {h} − 5 × {a} {sex === "male" ? "+ 5" : "− 161"} = <b>{fmt(bmr)}</b>
                </dd>
              </div>
              <div>
                <dt>Maintenance · TDEE</dt>
                <dd>
                  {fmt(bmr)} × {factor} = <b>{fmt(tdee)}</b>
                </dd>
              </div>
              <div>
                <dt>Deficit for {pace} kg a week</dt>
                <dd>
                  {pace} × 7,700 ÷ 7 = <b>{fmt(wanted)}</b>
                </dd>
              </div>
              <div>
                <dt>Floor · {sex === "male" ? "men" : "women"}</dt>
                <dd>
                  never below <b>{fmt(floor)}</b>
                </dd>
              </div>
            </dl>
            <p className={`${s.flag} ${floorHit ? s.flagOn : ""}`}>
              {floorHit
                ? `Floor applied. The deficit is ${fmt(actualDeficit)} kcal, smaller than ${pace} kg a week needs, because the target stops at ${fmt(floor)}.`
                : `Within the rules: deficit under the ${fmt(DEFICIT_CAP)} kcal cap, pace at or under ${PACE_CAP_KG} kg a week.`}
            </p>
          </>
        ) : (
          <p className={s.flag}>Enter an age of 18 to 90, a height of 120 to 230 cm and a weight of 35 to 250 kg.</p>
        )}
        <p className={s.calcFoot}>
          An estimate from standard formulas, not medical advice. <a href="/tools/calorie-calculator">Full calculator →</a>
        </p>
      </div>
    </form>
  );
}
