# thezenlean.com

Marketing site for Zen Lean, and the home of its email images (`public/email/`).

- `npm run dev` (port 3010), `npm run build`, `npm start`.
- Governing idea: one day, sunrise to night. Each section is a real screen at the hour it is used,
  and the app's own sky (`public/sky/`) changes behind the page as you scroll.
- Screens come from `~/Desktop/App Shots/Zen LeanTracker Screenshots/iphone/`, refreshed on every
  app release. Never mock one by hand.
- Every claim is checked against the app repo's MARKETING.md (§4 features, §8 science, §11 claims
  we do not make). No prices or trial length on the page: those live in App Store Connect.
- `public/email/zen-lean-header-v1.jpg` is used by the sign-in emails. Never rename or delete a
  versioned email asset: emails already sent keep pointing at it. Add `-v2` instead.
- `public/email/welcome-{meal,fast,week,kai}-v1.jpg` are the four pictures in the welcome email. They are
  generated in the app repo by `supabase/email-templates/images/make_welcome_art.py`; same rule, never rename.
