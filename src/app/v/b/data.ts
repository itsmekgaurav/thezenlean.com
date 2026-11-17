// Content for variation B, "One day, one sky". Every claim here comes from VARIATIONS-BRIEF.md facts,
// and every caption describes what is actually visible in the screenshot it sits next to.

export const STORE = "https://apps.apple.com/app/zen-lean-calorie-tracker/id6763917700";

export type Hue = "sleep" | "recovery" | "heart" | "activity" | "nutrition" | "energy" | "trend";

// Minutes since midnight, used to place each stamp on the time rail. The day runs 5:52 AM to 9:30 PM.
const DAY_START = 5 * 60 + 52;
const DAY_END = 21 * 60 + 30;
export const railPos = (min: number) => ((min - DAY_START) / (DAY_END - DAY_START)) * 100;

export type Moment = {
  time: string;
  min: number;
  hue: Hue;
  signal: string;
  title: string;
  body: string;
  shot: string;
  alt: string;
};

export const MOMENTS: Moment[] = [
  {
    time: "5:52 AM",
    min: 352,
    hue: "sleep",
    signal: "Sleep",
    title: "Last night, scored against your need.",
    body: "Sleep 77, good. 5 h 51 m asleep, 5 h 57 m in bed, 98% efficiency, read from your Watch through Apple Health.",
    shot: "sleep",
    alt: "Zen Lean Today's activity screen: Sleep scored 77, good, 77% of need, 5h 51m asleep, 5h 57m in bed and 98% efficiency, with Activity at 40% below",
  },
  {
    time: "7:05 AM",
    min: 425,
    hue: "recovery",
    signal: "Check-in",
    title: "Three taps. Energy, body, mood.",
    body: "Energy good, body okay, mood good, set beside overnight Recovery of 66. Your taps never rewrite that number.",
    shot: "checkin",
    alt: "Zen Lean check-in sheet with Energy Good, Body Okay and Mood Good, an overnight Recovery of 66, and a note that it is learning your normal mornings",
  },
  {
    time: "8:30 AM",
    min: 510,
    hue: "nutrition",
    signal: "Food",
    title: "Photograph breakfast. Check the numbers.",
    body: "Oatmeal bowl with banana, 380 kcal. That leaves 1,708 kcal of a 2,088 budget, with protein, carbs, fat and fibre tracked below.",
    shot: "meals",
    alt: "Zen Lean Meals screen showing 1,708 kcal left today, 380 eaten of a 2,088 budget, macro bars, 3 of 8 glasses of water and an oatmeal bowl with banana logged at 380 kcal",
  },
  {
    time: "12:40 PM",
    min: 760,
    hue: "trend",
    signal: "Water",
    title: "Tap a glass. See if you are on pace.",
    body: "750 ml of 2.0 L, 38% and on pace. Reminders only between the times you choose, every 2 hours from 8 AM to 10 PM.",
    shot: "water",
    alt: "Zen Lean Water sheet with 750 ml of 2.0 L, 38% on pace, quick-add buttons, a day timeline with the next reminder at 4:00 PM, and this week's bars",
  },
  {
    time: "4:15 PM",
    min: 975,
    hue: "activity",
    signal: "Activity",
    title: "Movement, without a second device.",
    body: "1,075 kcal moved, past the 500 goal. 22.5k steps, Fitness Age 31, and 51 bpm resting with 52 ms HRV on one line.",
    shot: "activity",
    alt: "Zen Lean Activity screen showing 1,075 kcal moved, past a 500 kcal goal, 22.5k steps, Fitness Age 31, 51 bpm resting and 52 ms HRV, and a day timeline",
  },
  {
    time: "8:00 PM",
    min: 1200,
    hue: "energy",
    signal: "Fasting",
    title: "The fast, stage by stage.",
    body: "16:8, hour 14, fat burn rising, 1 h 56 m to go. Start it from iPhone or Watch and the stages appear as the hours pass.",
    shot: "fasting",
    alt: "Zen Lean Fasting screen on a 16:8 fast with 01:56:39 remaining, fat burn rising, an End fast button and a timeline of fasting stages up to hour 14",
  },
  {
    time: "9:30 PM",
    min: 1290,
    hue: "heart",
    signal: "Insights",
    title: "One calm picture, with Kai's note on top.",
    body: "\u201cYou moved well, but calories ran high several days this week. Small portions can close the gap.\u201d",
    shot: "insights",
    alt: "Zen Lean Insights screen with meal logs on a 23 day streak, fasting at 14 of 16 hours, a Kai note about calories running high this week, and Sleep scored 77",
  },
];

export const RULES = [
  {
    n: "01",
    big: "Yours",
    hue: "recovery" as Hue,
    title: "Your own baseline",
    body: "Every number is compared with your normal, not a population average. A resting heart rate of 56 reads as running high because your own range is 50 to 55.",
  },
  {
    n: "02",
    big: "No score",
    hue: "sleep" as Hue,
    title: "No baseline, no score",
    body: "Until it knows your normal, it refuses to publish a score rather than invent one. A short night is scored with lower confidence, not thrown away.",
  },
  {
    n: "03",
    big: "65%",
    hue: "activity" as Hue,
    title: "Exercise, credited honestly",
    body: "Wearables over-count. Workout calories are credited at 65%, capped at 900 a day.",
  },
  {
    n: "04",
    big: "1,200 / 1,500",
    unit: "kcal",
    long: true,
    hue: "nutrition" as Hue,
    title: "A floor it will not go under",
    body: "Your target never drops below 1,200 kcal for women or 1,500 kcal for men, and the daily deficit is capped at 1,200 kcal.",
  },
  {
    n: "05",
    big: "1 kg",
    unit: "a week",
    hue: "trend" as Hue,
    title: "A pace limit",
    body: "However hard you set the goal, the pace is capped at 1 kg a week.",
  },
];

export const COMPARE = [
  {
    need: "Food",
    usual: "A calorie counter",
    usualNote: "Knows what you ate. Not how you slept.",
    zen: "Photo meals with calories, protein, carbs, fat and fibre to check and adjust.",
    hue: "nutrition" as Hue,
  },
  {
    need: "Fasting",
    usual: "A fasting timer",
    usualNote: "Knows the clock. Not what you ate before it.",
    zen: "16:8 or your own window, stages shown, started from iPhone or Watch.",
    hue: "energy" as Hue,
  },
  {
    need: "Sleep and recovery",
    usual: "A wearable subscription",
    usualNote: "A second device on your wrist, a second bill.",
    zen: "Sleep, HRV, resting heart rate, recovery and readiness from the Watch you already own.",
    hue: "sleep" as Hue,
  },
  {
    need: "Making sense of it",
    usual: "You, at 7 AM",
    usualNote: "Three apps open, adding it up yourself.",
    zen: "Kai reads all of it and writes one short, grounded note.",
    hue: "heart" as Hue,
  },
];

export const GUIDES = [
  { slug: "how-many-calories-should-i-eat", topic: "Food", hue: "nutrition" as Hue, title: "How many calories should I eat?", dek: "Mifflin-St Jeor, your activity, and why the floor exists." },
  { slug: "16-8-intermittent-fasting", topic: "Fasting", hue: "energy" as Hue, title: "16:8 intermittent fasting, hour by hour", dek: "What the stages mean, and choosing a window you can keep." },
  { slug: "what-is-hrv", topic: "Recovery", hue: "heart" as Hue, title: "What is HRV, and why is yours different?", dek: "Heart rate variability against your own baseline." },
  { slug: "calorie-deficit-safely", topic: "Pace", hue: "trend" as Hue, title: "How to run a calorie deficit safely", dek: "Deficit caps, pace limits and the 65% exercise rule." },
  { slug: "count-calories-from-a-photo", topic: "AI photo", hue: "activity" as Hue, title: "Counting calories from a photo", dek: "What a photo can estimate, and what to check by hand." },
];

export const FAQ = [
  {
    q: "Is Zen Lean a calorie tracker?",
    a: "Yes, and more. It logs food with photo analysis, runs your fasting window, reads sleep, recovery and heart data from Apple Health or Google Health (Beta), and tracks water. Kai, the coach, reads all of it and writes one short note.",
  },
  {
    q: "How does AI photo calorie counting work?",
    a: "Take a photo of your meal. Zen Lean estimates calories, protein, carbs, fat and fibre, and you check and adjust them before saving. You get ten photo analyses a day.",
  },
  {
    q: "Does Zen Lean work with Apple Watch?",
    a: "Yes. Sleep, resting heart rate, HRV and workouts come from the Watch you already own through Apple Health. On the Watch you can start a fast, run a workout on iOS 26, and glance at complications. Meals and water are logged on iPhone.",
  },
  {
    q: "Does it support intermittent fasting?",
    a: "Yes. Choose 16:8 or your own window, start it from iPhone or Watch, and follow the stages as the hours pass.",
  },
  {
    q: "Is Kai a chatbot?",
    a: "No. There is no chat. Kai reads your sleep, recovery, food, fasting and check-ins and writes a short, grounded note. It reports, it never nags. No guilt, no cheerleading.",
  },
  {
    q: "How much does Zen Lean cost?",
    a: "Zen Lean is free to download, and a subscription is required after setup. You can pay monthly or yearly. Current prices are shown in the App Store.",
  },
];
