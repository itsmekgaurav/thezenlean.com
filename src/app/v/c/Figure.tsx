import s from "./c.module.css";

/* One annotation: a numbered point on the real screenshot. x and y are percentages of the FULL
   1320x2868 screenshot, measured from the PNG, so a crop can re-map them without re-measuring. */
export type Callout = { n: number; x: number; y: number; label: string; side?: "left" | "right" };

type Props = {
  shot: string;
  alt: string;
  callouts: Callout[];
  /** Crop window as fractions of screenshot height (top, bottom). Omit for the full screen. */
  crop?: [number, number];
  /** Full device frame with side labels, or a bare cropped plate with numbered badges only. */
  variant?: "device" | "plate";
  priority?: boolean;
};

export function Shot({ shot, alt, callouts, crop, variant = "device", priority }: Props) {
  const [t, b] = crop ?? [0, 1];
  const span = b - t;
  const ratio = `1320 / ${Math.round(2868 * span)}`;
  const visible = callouts.filter((c) => c.y / 100 >= t && c.y / 100 <= b);

  const screen = (
    <div className={s.screen} style={{ aspectRatio: ratio }}>
      <span className={s.screenMask}>
      <img
        className={s.screenImg}
        src={`/shots/today/${shot}-660.webp`}
        srcSet={`/shots/today/${shot}-660.webp 660w, /shots/today/${shot}-1320.webp 1320w`}
        sizes="(max-width: 700px) 70vw, 360px"
        alt={alt}
        width={1320}
        height={2868}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        style={{ height: `${100 / span}%`, top: `${(-t / span) * 100}%` }}
      />
      </span>
      {visible.map((c) => {
        const top = ((c.y / 100 - t) / span) * 100;
        const side = c.side ?? "right";
        const style =
          variant === "device"
            ? side === "right"
              ? { top: `${top}%`, left: `${c.x}%`, width: `calc(${100 - c.x}% + var(--lead))` }
              : { top: `${top}%`, right: `${100 - c.x}%`, width: `calc(${c.x}% + var(--lead))` }
            : { top: `${top}%`, left: `${c.x}%` };
        return (
          <span key={c.n} className={`${s.call} ${side === "left" ? s.callL : s.callR}`} style={style} aria-hidden="true">
            <i className={s.pin}>{c.n}</i>
            {variant === "device" && <b className={s.callLabel}>{c.label}</b>}
          </span>
        );
      })}
    </div>
  );

  return variant === "device" ? <div className={s.device}>{screen}</div> : <div className={s.plate}>{screen}</div>;
}

export function Legend({ callouts }: { callouts: Callout[] }) {
  return (
    <ol className={s.legend}>
      {callouts.map((c) => (
        <li key={c.n}>
          <i className={s.legendPin}>{c.n}</i>
          <span>{c.label}</span>
        </li>
      ))}
    </ol>
  );
}

/* Registration marks: four hairline crosshairs at the corners of a panel, the printer's mark. */
export function Reg() {
  return (
    <>
      <span className={`${s.reg} ${s.regTL}`} aria-hidden="true" />
      <span className={`${s.reg} ${s.regTR}`} aria-hidden="true" />
      <span className={`${s.reg} ${s.regBL}`} aria-hidden="true" />
      <span className={`${s.reg} ${s.regBR}`} aria-hidden="true" />
    </>
  );
}
