// Content for variation F, the cinematic cut of E, "Without the guilt". Copied from E unchanged except
// for the count-up hints on the rules. Every Zen Lean line here is quoted word for word from a
// real app screen (png15 captures, 15 Nov), and every rule comes from VARIATIONS-BRIEF.md facts. The
// "usual" fragments are a composite of generic tracking-app language, drawn for this page, no brands.

export const STORE = "https://apps.apple.com/app/zen-lean-calorie-tracker/id6763917700";

export type Hue = "sleep" | "recovery" | "heart" | "activity" | "nutrition" | "energy" | "trend";

export type Usual =
  | { kind: "score"; label: string; value: string; verdict: string; note: string }
  | { kind: "over"; label: string; value: string; note: string }
  | { kind: "streak"; label: string; value: string; note: string }
  | { kind: "target"; label: string; value: string; note: string }
  | { kind: "alert"; label: string; value: string; note: string };

export type Pair = {
  moment: string;
  usual: Usual;
  zen: string;
  source: string;
  hue: Hue;
  kai: boolean;
};

export const PAIRS: Pair[] = [
  {
    moment: "After a short night",
    usual: { kind: "score", label: "Sleep score", value: "41", verdict: "Poor", note: "You did not get enough sleep." },
    zen: "Some rest is still rest. Go easy on yourself today.",
    source: "Kai, on the Sleep card. 5 h 51 m asleep, 77% of need.",
    hue: "sleep",
    kai: true,
  },
  {
    moment: "When calories run high",
    usual: { kind: "over", label: "Over budget", value: "+412 kcal", note: "You went over your goal today." },
    zen: "You moved well, but calories ran high several days this week. Small portions can close the gap.",
    source: "Kai, on Insights. Honest about the calories, and about the movement.",
    hue: "nutrition",
    kai: true,
  },
  {
    moment: "When you miss a day",
    usual: { kind: "streak", label: "Streak lost", value: "0 days", note: "Start again from day one." },
    zen: "Start tiny today. Consistency beats one perfect day.",
    source: "Kai, on the Activity card.",
    hue: "activity",
    kai: true,
  },
  {
    moment: "When you set a goal",
    usual: { kind: "target", label: "Daily target", value: "−700 kcal", note: "A real target one app gave a user, quoted in the study." },
    zen: "Your target never drops below 1,200 kcal for women or 1,500 kcal for men, and never asks for more than 1 kg a week.",
    source: "Zen Lean targets. Built in, not a setting.",
    hue: "nutrition",
    kai: false,
  },
  {
    moment: "Two hours from the end of a fast",
    usual: { kind: "alert", label: "Reminder", value: "Don’t give up now!", note: "You’re so close. Stay strong!" },
    zen: "You’re in a steady stretch. Hydrate and keep your usual rhythm.",
    source: "On the Fasting screen, hour 14 of 16:8.",
    hue: "energy",
    kai: false,
  },
  {
    moment: "When you say how you feel",
    usual: { kind: "alert", label: "Check-in", value: "Mood: low", note: "Try harder tomorrow." },
    zen: "Until then your check-ins are being saved, not judged.",
    source: "On the morning check-in, while it learns your normal.",
    hue: "recovery",
    kai: false,
  },
];

export type Kept = {
  n: string;
  big: string;
  unit?: string;
  title: string;
  body: string;
  shot: string;
  alt: string;
  hue: Hue;
  line?: string;
  // The number the card counts up to as it enters. The server-rendered text is already the final value,
  // so without JavaScript or with reduced motion the card reads the same.
  count?: { to: number; fmt: "int" | "pct" | "hm" };
};

export const PROMISES: Kept[] = [
  {
    n: "01",
    big: "1,200",
    count: { to: 1200, fmt: "int" },
    unit: "/ 1,500 kcal",
    title: "A floor under every target.",
    body: "Your target is shaped by your goal, weight and activity. It never drops below 1,200 kcal for women or 1,500 kcal for men, the daily deficit is capped at 1,200 kcal, and the pace at 1 kg a week. This one is 1,784 kcal.",
    shot: "targets",
    alt: "Zen Lean Goals and macros: a daily calorie target of 1,784 kcal, with protein 116 g, carbs 206 g, fat 55 g and fibre 28 g, shaped by your goal, weight and activity",
    hue: "nutrition",
  },
  {
    n: "02",
    big: "65%",
    count: { to: 65, fmt: "pct" },
    title: "Exercise, counted honestly.",
    body: "Watches over-count. Workout calories are credited at 65%, capped at 900 a day, so you are not told to eat back what your Watch over-counted. This day: 1,075 kcal moved, past a 500 goal.",
    shot: "activity",
    alt: "Zen Lean Activity screen: 1,075 kcal moved today, past your 500 goal, 22.5k steps, Fitness Age 31, 51 bpm resting and 52 ms HRV",
    hue: "activity",
  },
  {
    n: "03",
    big: "Yours",
    title: "Your baseline, not an average.",
    body: "A resting heart rate of 56 bpm reads as running high because your own range today is 50 to 55. A stranger’s average never decides what is normal for you.",
    shot: "heart",
    alt: "Zen Lean Heart card: resting heart rate running high at 56 bpm against today's range of 50 to 55, with a Kai line about easy movement and sleep",
    hue: "heart",
    line: "Heart rate ran high in today’s range. Easy movement and sleep tonight may help.",
  },
  {
    n: "04",
    big: "5 h 51 m",
    count: { to: 351, fmt: "hm" },
    title: "A short night still counts.",
    body: "A short night is scored with lower confidence, not thrown away. This one: 77% of need, 98% efficiency, and a line that does not pile on.",
    shot: "sleep",
    alt: "Zen Lean Sleep card scored 77, Good, 77% of need, 5h 51m asleep, 5h 57m in bed, 98% efficiency, and the Kai line Some rest is still rest",
    hue: "sleep",
    line: "Some rest is still rest. Go easy on yourself today.",
  },
  {
    n: "05",
    big: "No score",
    title: "No baseline, no score.",
    body: "Until it knows your normal, Zen Lean refuses to publish a score rather than invent one. Learning your mornings takes about two weeks.",
    shot: "checkin",
    alt: "Zen Lean check-in: Energy Good, Body Okay, Mood Good, and a card saying it is still learning what a normal morning looks like for you, with overnight Recovery 66",
    hue: "recovery",
    line: "Still learning what a normal morning looks like for you.",
  },
];

export const KAI_NOTES: { where: string; hue: Hue; text: string }[] = [
  { where: "Insights · this week", hue: "nutrition", text: "You moved well, but calories ran high several days this week. Small portions can close the gap." },
  { where: "Sleep", hue: "sleep", text: "Some rest is still rest. Go easy on yourself today." },
  { where: "Activity", hue: "activity", text: "Start tiny today. Consistency beats one perfect day." },
  { where: "Heart", hue: "heart", text: "Heart rate ran high in today’s range. Easy movement and sleep tonight may help." },
];

export const GUIDES = [
  { slug: "calorie-deficit-safely", topic: "Start here", hue: "energy" as Hue, title: "How to run a calorie deficit safely", dek: "Why a target should have a floor, why the pace is capped at 1 kg a week, and why exercise calories are counted at 65%. The guide for anyone who quit because the numbers felt like punishment.", featured: true },
  { slug: "how-many-calories-should-i-eat", topic: "Food", hue: "nutrition" as Hue, title: "How many calories should I eat?", dek: "Mifflin-St Jeor, your activity, and why the floor exists." },
  { slug: "count-calories-from-a-photo", topic: "AI photo", hue: "activity" as Hue, title: "Counting calories from a photo", dek: "What a photo can estimate, and what to check by hand." },
  { slug: "16-8-intermittent-fasting", topic: "Fasting", hue: "energy" as Hue, title: "16:8 intermittent fasting, hour by hour", dek: "What the stages mean, and a window you can keep." },
  { slug: "what-is-hrv", topic: "Recovery", hue: "heart" as Hue, title: "What is HRV, and why is yours different?", dek: "Heart rate variability against your own baseline." },
];

export const FAQ = [
  {
    q: "Is Zen Lean a calorie tracker?",
    a: "Yes, and more. It logs food with AI photo analysis, runs your intermittent fasting window, reads sleep, recovery and heart data from Apple Health or Google Health (Beta), and tracks water. Kai, the coach, reads all of it and writes a short note.",
  },
  {
    q: "Will it tell me off when I go over?",
    a: "No. If calories run high, Kai says so plainly, for example: “You moved well, but calories ran high several days this week. Small portions can close the gap.” It reports and never nags. There is no chat, no guilt and no cheerleading.",
  },
  {
    q: "How low can my calorie target go?",
    a: "Never below 1,200 kcal a day for women or 1,500 kcal for men. The daily deficit is capped at 1,200 kcal, the pace at 1 kg a week, and exercise calories are credited at 65%, capped at 900 a day, because wearables over-count.",
  },
  {
    q: "How does AI photo calorie counting work?",
    a: "Take a photo of your meal. Zen Lean estimates calories, protein, carbs, fat and fibre, and you check and adjust them before saving. You get ten photo analyses a day.",
  },
  {
    q: "Does Zen Lean work with Apple Watch?",
    a: "Yes. Sleep, resting heart rate, HRV and workouts come from the Watch you already own through Apple Health, with no second device or wearable subscription. You can start a fast from the Watch. Meals and water are logged on iPhone.",
  },
  {
    q: "How much does Zen Lean cost?",
    a: "Zen Lean is free to download, and a subscription is required after setup. You can pay monthly or yearly. Current prices are shown in the App Store.",
  },
];

// ---------- The features, each shown working in its own approved film (Take One, 10 Nov) ----------
// Every fact here is from MARKETING.md §4 (the feature inventory) or read off the film's own frames.
// Things the inventory forbids are left out on purpose: no live-workout claim (needs iOS 26), no route
// map, no voice logging, no citation for the fasting stages, no chat with Kai.
export type Feature = {
  id: string;
  hue: Hue;
  sky: "morning" | "afternoon" | "evening" | "night";
  kicker: string;
  title: string;
  lede: string;
  film: string;
  filmAlt: string;
  facts: { b: string; t: string }[];
  kai?: string;
  kaiWhere?: string;
  fine?: string;
};

export const FEATURES: Feature[] = [
  {
    id: "fasting",
    hue: "energy",
    sky: "evening",
    kicker: "Fasting",
    title: "A countdown only says when. This says what is happening.",
    lede: "A live countdown for your fast, and an hour-by-hour timeline of what your body is doing, in plain words, from the first hours after eating to deep into a long fast.",
    film: "fasting",
    filmAlt: "Zen Lean's fasting screen: 1 hour 56 minutes remaining in a 16:8 fast, the stage Fat burn rising, an hour-by-hour list of fasting stages, and a history of every fast with goals hit.",
    facts: [
      { b: "Five plans.", t: "14:10, 16:8, 18:6, 20:4 and OMAD-style." },
      { b: "Eight stages, hour by hour.", t: "Each one explained in plain words while you are in it." },
      { b: "Start it from your wrist.", t: "Start or end a fast on Apple Watch. It stays on your Lock Screen and in the Dynamic Island." },
      { b: "Every fast on the record.", t: "Your history, with the last seven days at a glance." },
    ],
    kai: "You’re in a steady stretch. Hydrate and keep your usual rhythm.",
    kaiWhere: "On the Fasting screen, hour 14 of 16:8",
  },
  {
    id: "sleep",
    hue: "sleep",
    sky: "night",
    kicker: "Sleep",
    title: "One sleep score, and the reason for it.",
    lede: "Zen Lean reads last night from your Apple Watch, scores it against what you needed, and shows the two or three things that actually moved the score.",
    film: "sleep",
    filmAlt: "Zen Lean's Sleep card: scored 79, Good, 81% of need, with what moved the score, a body-clock dial of last night against the usual window, overnight averages and sleep stages.",
    facts: [
      { b: "Against what you needed.", t: "5 h 51 m reads as 77% of your need, with the reason, not a red number." },
      { b: "The whole night, stage by stage.", t: "Awake, REM, core and deep, hour by hour." },
      { b: "Your body clock.", t: "Last night against your usual window, once it has 15 nights to learn from." },
      { b: "A short night still counts.", t: "It is scored with lower confidence, not thrown away." },
    ],
    kai: "Some rest is still rest. Go easy on yourself today.",
    kaiWhere: "On the Sleep card, after 5 h 51 m",
  },
  {
    id: "recovery",
    hue: "heart",
    sky: "morning",
    kicker: "Heart, recovery and Fitness Age",
    title: "Your own range, not an average.",
    lede: "Resting heart rate, HRV, breathing rate and wrist temperature, read overnight and compared with your usual range. Recovery and readiness are built from that, from your data alone.",
    film: "heart",
    filmAlt: "Zen Lean's Heart screen: resting heart rate in the usual range, today's heart against a 53 bpm baseline, Fitness Age 32 over twelve weeks, and what is helping and holding it back.",
    facts: [
      { b: "Recovery and readiness.", t: "What last night did to today, from your own overnight data." },
      { b: "No baseline, no score.", t: "Until it knows your normal, it refuses to invent one." },
      { b: "Fitness Age, every week.", t: "Twelve weeks of history, and the heart rate to train at in your own bpm." },
      { b: "What helps, what holds you back.", t: "Named, in your own numbers, with one thing to try." },
    ],
    kai: "Heart rate ran high in today’s range. Easy movement and sleep tonight may help.",
    kaiWhere: "On the Heart card",
    fine: "Fitness Age uses the FRIEND registry. It is a wellness estimate, not a medical reading.",
  },
  {
    id: "activity",
    hue: "activity",
    sky: "afternoon",
    kicker: "Activity",
    title: "Movement, counted honestly.",
    lede: "Steps, move, exercise and stand from the Watch you already own, and workouts from any app, each counted once.",
    film: "activity",
    filmAlt: "Zen Lean's Activity screen: 1,075 kcal moved past a 500 goal, move, exercise and stand rings, and the day's workouts.",
    facts: [
      { b: "One workout, once.", t: "Sessions from your Watch or other apps are matched, and labelled with where they came from." },
      { b: "Calories you can trust.", t: "Exercise is credited at 65%, capped at 900 a day, because wearables over-count." },
      { b: "Day strain.", t: "How hard the day has been, as a pacing hint, never a limit." },
      { b: "A note on each workout.", t: "What the session did, in plain language." },
    ],
    kai: "Start tiny today. Consistency beats one perfect day.",
    kaiWhere: "On the Activity card",
  },
];

export const PHOTO_STEPS = [
  { n: "1", b: "Snap it.", t: "Open the camera, or pick a photo already on your phone." },
  { n: "2", b: "Say how much.", t: "“How much is this?” Tap a portion or slide the weight. A photo alone cannot tell a small bowl from a big one." },
  { n: "3", b: "Check and save.", t: "Every number is yours to adjust before it counts. Then your day updates itself." },
];

export const PHOTO_MACROS = [
  { k: "Calories", v: "380", u: "kcal", hue: "energy" as Hue },
  { k: "Protein", v: "10", u: "g", hue: "activity" as Hue },
  { k: "Carbs", v: "65", u: "g", hue: "energy" as Hue },
  { k: "Fat", v: "12", u: "g", hue: "heart" as Hue },
  { k: "Fibre", v: "9", u: "g", hue: "recovery" as Hue },
];

export const OTHER_WAYS = [
  { film: "describe", b: "Describe it.", t: "Type what you ate. No photo, and it does not use one of your ten.", alt: "Typing a meal description into Zen Lean and getting calories and macros back." },
  { film: "barcode", b: "Scan the barcode.", t: "The label’s own nutrition, looked up for you.", alt: "Scanning a packaged food's barcode in Zen Lean." },
];

export const SMALL_FEATURES = [
  { id: "water", film: "water", hue: "trend" as Hue, kicker: "Water", b: "Tap a glass. See if you are on pace.", t: "Reminders only between the times you choose.", alt: "Zen Lean's water card: tapping glasses toward the day's goal." },
  { id: "checkin", film: "checkin", hue: "recovery" as Hue, kicker: "Morning check-in", b: "Three taps. Energy, body, mood.", t: "Over about two weeks it learns what a normal morning looks like for you.", alt: "Zen Lean's morning check-in: Energy Good, Body Okay, Mood Good." },
];
