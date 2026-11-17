// Content for variation D, "The morning read". Every claim comes from VARIATIONS-BRIEF.md facts, and every
// number or quote beside a screenshot is what is actually visible on that screen (checked against the PNGs).

export const STORE = "https://apps.apple.com/app/zen-lean-calorie-tracker/id6763917700";

export type Hue = "sleep" | "recovery" | "heart" | "activity" | "nutrition" | "energy" | "trend";

export const ALT = {
  insights:
    "Zen Lean Insights screen: meal logs on a 23 day streak, a fast at 14 of 16 hours, Kai's note that calories ran high several days this week, Recovery 66, and Sleep scored 77, good",
  sleep:
    "Zen Lean Today's activity: Sleep 77, good, 77% of need, 5h 51m asleep, 5h 57m in bed, 98% efficiency, with the line Some rest is still rest",
  heart:
    "Zen Lean Heart card: resting heart rate running high at 56 bpm against today's range of 50 to 55, a Kai line, and Fitness Age 31",
  meals:
    "Zen Lean Meals screen: 1,708 kcal left today, 380 eaten of a 2,088 budget, protein, carbs, fat and fibre bars, and an oatmeal bowl with banana logged at 380 kcal",
  fasting:
    "Zen Lean Fasting screen on a 16:8 fast: 01:56:39 remaining, fat burn rising, eat at 4:49 PM, and the line You're in a steady stretch",
  checkin:
    "Zen Lean check-in: Energy good, Body okay, Mood good, and a card saying it is still learning what a normal morning looks like, so check-ins are saved, not judged",
  activity:
    "Zen Lean Activity screen: 1,075 kcal moved, past a 500 goal, 22.5k steps, Fitness Age 31, 51 bpm resting and 52 ms HRV",
};

// The morning read: the four things you see on waking, in the order the app shows them.
export const READ = [
  {
    n: "01",
    label: "How you slept",
    hue: "sleep" as Hue,
    shot: "sleep",
    value: "77",
    unit: "",
    meaning: "Good. 77% of the sleep you need.",
    body: "Read from your Watch through Apple Health and scored against your need, not a stranger's eight hours.",
    facts: ["5 h 51 m asleep", "5 h 57 m in bed", "98% efficiency"],
    note: "Some rest is still rest. Go easy on yourself today.",
    noteFrom: "Kai, on the Sleep card",
  },
  {
    n: "02",
    label: "How recovered you are",
    hue: "heart" as Hue,
    shot: "heart",
    value: "56",
    unit: "bpm",
    meaning: "Running high, against your own range of 50 to 55.",
    body: "Resting heart rate, HRV and recovery, each set against your normal. The same 56 could be fine for someone else. For you, today, it is a little high.",
    facts: ["Latest 55 bpm", "Today's range 50 to 55", "Fitness Age 31"],
    note: "Heart rate ran high in today's range. Easy movement and sleep tonight may help.",
    noteFrom: "Kai, on the Heart card",
  },
  {
    n: "03",
    label: "What you have left today",
    hue: "nutrition" as Hue,
    shot: "meals",
    value: "1,708",
    unit: "kcal",
    meaning: "Left today, of a 2,088 kcal budget.",
    body: "Photograph a meal, then check and adjust the calories, protein, carbs, fat and fibre before you save it. Ten photo analyses a day.",
    facts: ["380 eaten", "Oatmeal bowl with banana", "3 of 8 glasses of water"],
    note: "",
    noteFrom: "",
  },
  {
    n: "04",
    label: "Where your fast is",
    hue: "energy" as Hue,
    shot: "fasting",
    value: "1 h 56 m",
    unit: "",
    meaning: "To go on your 16:8. Fat burn rising. Eat at 4:49 PM.",
    body: "16:8 or your own window, started from iPhone or Watch. The stages appear as the hours pass, so you know where you are without doing the sums.",
    facts: ["Started 12:49 AM", "Hour 14", "Goal 16 h"],
    note: "You're in a steady stretch. Hydrate and keep your usual rhythm.",
    noteFrom: "On the Fasting screen",
  },
];

export const KAI_LINES = [
  { hue: "nutrition" as Hue, from: "Insights, this week", text: "You moved well, but calories ran high several days this week. Small portions can close the gap." },
  { hue: "sleep" as Hue, from: "Sleep card", text: "Some rest is still rest. Go easy on yourself today." },
  { hue: "activity" as Hue, from: "Activity card", text: "Start tiny today. Consistency beats one perfect day." },
  { hue: "heart" as Hue, from: "Heart card", text: "Heart rate ran high in today's range. Easy movement and sleep tonight may help." },
  { hue: "energy" as Hue, from: "Fasting", text: "You're in a steady stretch. Hydrate and keep your usual rhythm." },
];

export const TRUTHS = [
  {
    hue: "recovery" as Hue,
    value: "Yours",
    title: "Your own normal, not an average",
    body: "Every number is compared with your baseline. A resting heart rate of 56 reads as high because your range is 50 to 55.",
  },
  {
    hue: "sleep" as Hue,
    value: "No score",
    title: "No baseline yet, no score",
    body: "Until it knows your normal, it refuses to publish a score rather than invent one. Your first two weeks of check-ins are saved, not judged.",
  },
  {
    hue: "trend" as Hue,
    value: "Counts",
    title: "A short night still counts",
    body: "It is scored with lower confidence, not thrown away. A rough night is part of your week, not a gap in it.",
  },
  {
    hue: "nutrition" as Hue,
    value: "1,200",
    unit: "kcal",
    title: "A floor under every target",
    body: "Your target never drops below 1,200 kcal for women or 1,500 kcal for men, whatever pace you choose. The deficit is capped at 1,200 kcal a day and the pace at 1 kg a week.",
  },
  {
    hue: "activity" as Hue,
    value: "65%",
    title: "Exercise, credited honestly",
    body: "Wearables over-count, so workout calories are credited at 65%, capped at 900 a day. What you get back is what you actually burned.",
  },
];

export const GUIDES = [
  { slug: "how-many-calories-should-i-eat", topic: "Food", hue: "nutrition" as Hue, title: "How many calories should I eat?", dek: "Mifflin-St Jeor, your activity, and why the floor exists." },
  { slug: "16-8-intermittent-fasting", topic: "Fasting", hue: "energy" as Hue, title: "16:8 intermittent fasting, hour by hour", dek: "What each stage means, and a window you can keep." },
  { slug: "what-is-hrv", topic: "Recovery", hue: "heart" as Hue, title: "What is HRV, and what does yours mean?", dek: "Why 52 ms is only useful next to your own normal." },
  { slug: "calorie-deficit-safely", topic: "Pace", hue: "trend" as Hue, title: "How to run a calorie deficit safely", dek: "Deficit caps, pace limits and the 65% exercise rule." },
  { slug: "count-calories-from-a-photo", topic: "AI photo", hue: "activity" as Hue, title: "Counting calories from a photo", dek: "What a photo can estimate, and what to check by hand." },
];

export const FAQ = [
  {
    q: "Is Zen Lean a calorie tracker?",
    a: "Yes, and more. It logs food with photo analysis, runs your fasting window, reads sleep, recovery and heart data from Apple Health or Google Health (Beta), and tracks water. Each morning Kai, the coach, reads all of it and writes a short note.",
  },
  {
    q: "How does AI photo calorie counting work?",
    a: "Take a photo of your meal. Zen Lean estimates calories, protein, carbs, fat and fibre, and you check and adjust them before saving. You get ten photo analyses a day.",
  },
  {
    q: "Does Zen Lean work with Apple Watch?",
    a: "Yes. Sleep, resting heart rate, HRV and workouts come from the Watch you already own through Apple Health, so there is no second device and no second subscription for a wearable. You can start a fast from the Watch. Meals and water are logged on iPhone.",
  },
  {
    q: "Does it support intermittent fasting?",
    a: "Yes. Choose 16:8 or your own window, start it from iPhone or Watch, and follow the stages as the hours pass.",
  },
  {
    q: "Will it give me a score on day one?",
    a: "Not one it cannot stand behind. Scores are compared with your own baseline, and until it has one, Zen Lean shows no score rather than invent one. Check-ins take about two weeks of mornings to learn your normal.",
  },
  {
    q: "How much does Zen Lean cost?",
    a: "Zen Lean is free to download, and a subscription is required after setup. You can pay monthly or yearly. Current prices are shown in the App Store.",
  },
];
