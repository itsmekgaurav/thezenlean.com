# Homepage variations brief (17 Nov 2026)

> Round 2. Round 1's A (an editorial newspaper) and C (a lab notebook) were rejected and deleted:
> "Don't make design for the sake of making design. Think about the product and then make the
> design." A newspaper or a lab manual has nothing to do with how this product feels. B (the app's
> own sky, one day) stays. Every new variation must come out of the product brief below. If a
> design choice cannot be traced to a line in it, it does not belong.

## The product brief (read this first; it decides everything)

**The problem it solves.** Health tracking feels like work and judgement.
- Calorie counters are spreadsheets: endless logging, red numbers, a verdict. A 2025 UCL and
  Loughborough study of 58,881 posts about fitness and calorie apps found shame, disappointment and
  demotivation, frustration at the effort of logging, and app goals not grounded in health guidance
  (one user was told to eat "-700 calories a day").
- The data is scattered: a food app, a fasting timer and a wearable subscription that never talk.
- The numbers have no meaning: an HRV of 52 tells you nothing unless something tells you what it means
  for you, today.

**Who it is for.** People who tried calorie counting and quit because it felt like data entry and
guilt; Apple Watch owners curious about sleep and recovery who do not want a second device or
subscription; people who already fast; people who care about privacy. Often looking first thing in
the morning, often on a rough day.

**The emotion.** Calm. Relief. Being understood without being judged. Kind, but honest: warmth is
in the phrasing, never in inflating a score. ("Rough nights happen. Be kind to yourself today" is
right. A green ring that was not earned is not.) Quiet by default, loud only when earned.

**The message.** Every morning Zen Lean answers one question: how am I today, and what should I do
about it? One calm picture of food, fasting, sleep and movement, and Kai, a coach who has actually
read your data and tells you the truth kindly. No guilt, no cheerleading, no spreadsheet.

**The identity, which belongs to the app and is not ours to reinvent.** Dark, because the app's
signature is a time-of-day sky behind everything (night, morning, afternoon, evening; the four images
in /sky). The icon is a sunrise over water. SF Pro Rounded (ui-rounded, Nunito fallback). Seven
signal hues, each owned by one signal. The warm sunrise gradient is reserved for the one action.
Variation B (`src/app/v/b/`) already implements this palette, the CSS device frame and the type;
read it and reuse its tokens so every variation is unmistakably the same product.


The owner rejected the current homepage: "feels empty, no multiple pages, no content strategy, no SEO."
We are building 2-3 homepage variations, each a complete, dense, real page, to choose from.
Only the HOME page now. Other pages come after a choice, but every variation must show the
multi-page site in its navigation and footer (links may point at routes that do not exist yet).

## Where to build

- Next.js 16 App Router, React 19, repo root = this folder. Branch `homepage-variations`.
- Variation X lives ONLY in `src/app/v/<x>/` (b is the kept one; do not edit it) (page.tsx, any components, one CSS module or a scoped
  CSS file). Do not edit `src/app/globals.css`, `layout.tsx`, `page.tsx` or other variations.
- Each page exports `metadata` with `robots: { index: false }` (these are previews).
- The root layout loads `globals.css` which sets `html{background:#0b1533}` and a dark body
  (`color: var(--ink)`, Nunito rounded, 18px). Your page must set its own root wrapper with its own
  background, colour, font and line-height, covering the full page, so nothing leaks.
- Fonts: `next/font/google` inside your page is fine. Animation: CSS, or `gsap` (installed).
  No three.js / WebGL. No new npm packages.
- Real app screenshots (taken today, 1320x2868 PNG -> webp): `/shots/today/<name>-1320.webp` and
  `-660.webp`. Names: insights, sleep, heart, fasting, meals, activity, profile, targets, weight,
  checkin, water, settings, sources, reminders, feel, founder, workout. Look at the ones you use
  (Read the PNGs in `~/Desktop/App Shots/Zen LeanTracker Screenshots/iphone/`) so captions match
  what is actually on screen. App icon: `/icon-512.png`. Time-of-day skies: `/sky/{night,morning,
  afternoon,evening}.webp`. App Store URL: https://apps.apple.com/app/zen-lean-calorie-tracker/id6763917700

## Design rules (the owner's, learned the hard way)

1. A governing idea first, then CSS. Each variation has its own named fiction (given below).
2. **Never put a screenshot in a centred rounded rectangle with a drop shadow.** Crop, tilt, layer,
   bleed off the edge, or draw a real device frame. Screens must be large enough to read.
3. An artifact system: one repeatable, non-photographic element that is ours.
4. Motion is restrained: 150-400ms, `cubic-bezier(.23,1,.32,1)`. No 600-700ms fade-ups on every
   block (the generic AI-landing-page tell). Respect `prefers-reduced-motion`.
5. **Dense, not empty.** No full-viewport empty scroll areas. Every screen-height of scroll shows
   real content. The current site's failure was a screen of empty forest.
6. Must look like a $10,000 site: typography with a real scale, generous but intentional spacing,
   alignment checked. References studied today: Bevel (bevel.health), Gentler Streak (gentler.app),
   MacroFactor (macrofactor.com, content hub + tools), Oura (editorial serif), Rise (risescience.com,
   science "laws" + guides).
7. Works at 1440 desktop and 390 mobile, no horizontal scroll, 16px side gutters on mobile.
8. Semantic HTML: one h1, h2 per section, real `<nav>`, `<footer>`, alt text on every image.

## SEO the page must carry (the owner called this out)

- `metadata`: a real title (<60 chars) and description (<155) targeting the head term
  "calorie tracker" plus "fasting", "Apple Watch", "AI photo" (pick naturally; noindex is only
  for the preview).
- Visible FAQ section (5-6 real questions) with matching `FAQPage` JSON-LD, plus
  `SoftwareApplication` JSON-LD (name "Zen Lean", operatingSystem iOS, applicationCategory
  HealthApplication, offers omitted because prices are unknown). **Never fabricate ratings,
  reviews, user counts or press logos.** We have none to show yet.
- A "Guides" or content-hub block linking to planned articles (titles only, real slugs), e.g.
  `/guides/how-many-calories-should-i-eat`, `/guides/16-8-intermittent-fasting`,
  `/guides/what-is-hrv`, `/guides/calorie-deficit-safely`, `/guides/count-calories-from-a-photo`.
- Footer = sitemap: Features (Food, Fasting, Sleep and recovery, Activity, Kai coach, Apple Watch),
  Learn (Guides, Science, Calorie calculator), Company (About, Support, Privacy, Terms, Contact
  hello@thezenlean.com). `© 2026 Zen Products`.

## Facts (from the app's MARKETING.md; do not invent beyond these)

- **Zen Lean** (never "Zen LeanTracker", never "Lumi"). iPhone app with Apple Watch. iOS 17+.
  English. Coach is **Kai**.
- Pitch: most calorie counters feel like spreadsheets. Zen Lean gives you one calm daily picture
  and a coach who has actually read your data.
- Answers one question every morning: how am I today, and what should I do about it?
- Four things together: food logging with photo analysis, intermittent fasting, sleep/recovery/body
  metrics read from Apple Health or Google Health (Beta), and Kai, who reads it all and writes a
  short grounded note. Plus water.
- Photo meals: calories, protein, carbs, fat, fibre to check and adjust. **Ten photo analyses a day.**
- Fasting: 16:8 or your own window, start from iPhone or Watch, stages shown.
- Sleep, resting heart rate, HRV, recovery, readiness, Fitness Age, day strain, from the Watch you
  already own (no second device, no second subscription for a wearable).
- Everything compared with **your own baseline**, not population averages. **No baseline yet, no
  score**: it refuses to publish a score rather than invent one. A short night is scored with lower
  confidence, not thrown away.
- Safety limits: target never below **1,200 kcal (women) / 1,500 kcal (men)**; deficit capped at
  **1,200 kcal a day**; pace capped at **1 kg a week**; exercise calories credited at **65%**, capped
  at 900 a day, because wearables over-count.
- Named formulas (may be named): Mifflin-St Jeor (BMR/TDEE), Karvonen (heart rate zones), FRIEND
  registry (Fitness Age), Keytel 2005 (workout calories), WHO BMI cutoffs, Helgerud 2007 (4x4).
- Check-in: three taps, energy, body, mood; learns your normal mornings over about two weeks.
- Water: tap a glass, see whether you are on pace, reminders only between times you choose.
- Kai writes notes; **there is no chat**. "No guilt, no cheerleading." Reports, never nags.
- Privacy: no ads, no selling data, anonymous usage stats you can switch off, delete the account
  and everything goes.
- Money: free to download, **subscription required** after setup, monthly or yearly. **Never state a
  price or a trial length.** Say "Monthly or yearly subscription".

## Never say

"free version/tier", "try it free", "unlimited", "works on iPad", "your data stays on your device",
"chat with Kai/your coach", pounds/lbs, "light mode", Siri/Shortcuts, voice logging, recipes,
badges/achievements, weight projection/goal date/trend line, "Health Age", USDA, any weight-loss
outcome or timeline, medical/clinical/treatment claims, eating-disorder safety, before/after.
Log meals or water from the Watch (false). "Full two-way Apple Health sync" (false).

## Copy voice

No em dashes anywhere (use periods or commas). Second person, present tense, sentence case.
Banned: simply, just, easy, powerful, seamless, smart, revolutionary, oops. Numbers: "1,240 kcal",
"10 PM", "1 h 50 m". Calm, specific, grounded in real numbers.

## Definition of done

`npx tsc --noEmit` clean for your files, `npm run build` passes, the page renders at
`http://localhost:<port>/v/<x>`. Then screenshot it yourself (full page, 1440 and 390 wide) with
the Playwright tools or headless Chrome, LOOK at every screenshot, fix spacing, overlap, clipping and
empty areas, and repeat until it is genuinely good. Report the route, what the governing idea is,
and the paths of your final screenshots.
