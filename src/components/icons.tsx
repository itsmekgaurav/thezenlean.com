// The app's own icon font (Phosphor, MIT), with the codepoints ZenPhosphorIcon.swift uses, so every
// glyph on the site is the glyph in the app.
export const PH = {
  sparkle: 59042, moon: 58160, forkKnife: 57954, run: 59184, heart: 58024, flame: 58916, drop: 57872,
  plus: 58324, caretRight: 57658, info: 58062, pulse: 57344, check: 57730, clock: 57754, lightning: 58078,
  footprints: 60040, batteryFull: 57536, smiley: 58422, thumbsUp: 58526, scan: 60342, camera: 57614,
  bell: 57550, scales: 59216, sun: 58482, eye: 57888, waves: 59102, refresh: 57492,
} as const;

export function Ph({ i, className = "", style }: { i: keyof typeof PH; className?: string; style?: React.CSSProperties }) {
  return (
    <i className={`ph ${className}`} style={style} aria-hidden="true">
      {String.fromCodePoint(PH[i])}
    </i>
  );
}
