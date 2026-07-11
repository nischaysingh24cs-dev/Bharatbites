# BharatBites 🥭

**Track Every Bite. Eat Smart. Stay Healthy.**

BharatBites is a production-oriented, mobile-first Indian nutrition and wellness application. It combines a 130-dish regional food atlas, mindful food and water tracking, an AI-ready Indian diet planner, exercise plans, progress analytics, achievements, and clinic appointment booking in one polished experience.

> The project runs immediately in a credential-free demo mode. Add Clerk and Supabase environment variables to activate authentication, persistent sync, admin data, and production APIs.

## Screenshots

| Home                                        | Food atlas                                     | Dashboard                                        |
| ------------------------------------------- | ---------------------------------------------- | ------------------------------------------------ |
| `docs/screenshots/home.png` _(placeholder)_ | `docs/screenshots/explore.png` _(placeholder)_ | `docs/screenshots/dashboard.png` _(placeholder)_ |

## Features

- **Premium responsive UI:** light/dark mode, glassmorphism, gradients, accessible motion, mobile navigation and reduced-motion support.
- **Indian food atlas:** 130 curated seed dishes spanning every state/region represented in the dataset; search by dish, ingredient or state; veg, vegan and non-veg filters.
- **Food details:** calories, protein, carbs, fat, fibre, spice level, ingredients, history, portion guidance and health score.
- **Mindful food counter:** increment, decrement, reset, daily macro summary and non-judgmental contextual guidance.
- **Voice logging:** Web Speech API parsing for phrases such as “I ate 12 pani puri.”
- **AI-ready diet planner:** BMR-based calorie, protein and water estimates; vegetarian, non-vegetarian, vegan and Jain options.
- **Fitness:** men/women, home/gym, goal and difficulty filters with duration, instructions and burn estimates.
- **Health tools:** BMI reference, water tracker and calorie/macronutrient summary.
- **Dashboard:** weekly charts, favourites, streaks, goals, achievements, AI recommendations and an opt-in leaderboard.
- **Clinic:** editable doctor profile, appointment request form, in-person/video/phone options, blog, reviews, general contact and medical disclaimers.
- **Admin:** food CRUD surface, appointment/profile/blog/review/gallery areas and analytics.
- **Authentication:** Clerk Google + email/password + password reset, with credential-free demo fallback.
- **Persistence:** Supabase/PostgreSQL schema, indexes, migrations, RLS and Clerk profile-sync webhook.
- **PWA/SEO:** web manifest, metadata, Open Graph defaults, semantic structure and security headers.
- **Testing:** Vitest + Testing Library unit tests, strict TypeScript, ESLint and Prettier.

## Technology stack

- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS, reusable shadcn-style primitives, Framer Motion, Lucide
- Supabase/PostgreSQL with Row Level Security
- Clerk authentication
- Recharts
- Zod API validation
- Vitest and Testing Library
- Vercel-ready configuration

## Project structure

```text
bharatbites/
├── app/                         # App Router pages, layout and route handlers
│   ├── api/                     # Advisor, planner, tracking, clinic, blog and analytics APIs
│   ├── admin/                   # Protected admin dashboard
│   ├── dashboard/               # User analytics and achievements
│   ├── doctor/                  # Clinic profile and appointment booking
│   ├── exercise/                # Filterable movement library
│   ├── explore/                 # Searchable Indian food atlas
│   ├── plan/                    # Personalised diet planner
│   ├── sign-in/                 # Clerk sign-in with demo fallback
│   └── tracker/                 # Food, macro, water and BMI tracking
├── components/                  # Domain and reusable UI components
│   ├── home/                    # Homepage sections
│   ├── layout/                  # Header, footer and auth controls
│   └── ui/                      # Button, logo and headings
├── data/foods.ts                # Typed local food catalogue (130 dishes)
├── hooks/                       # Client persistence hooks
├── lib/                         # Advisor, diet, auth, Supabase and calculation logic
├── public/                      # Generated copyright-safe imagery, icon and manifest
├── supabase/migrations/         # PostgreSQL schema, RLS and seed migration
├── tests/                       # Unit/component tests
├── types/                       # Shared domain and browser types
└── middleware.ts                # Clerk protected-route middleware
```

## 1. Install dependencies

Requirements: **Node.js 20.11+** and npm 10+.

```bash
npm install
```

## 2. Configure environment variables

```bash
cp .env.example .env.local
```

Never commit `.env.local` or a Supabase service-role key. Variables marked `NEXT_PUBLIC_` are visible to the browser; server secrets are not.

| Variable                            | Required in production | Purpose                         |
| ----------------------------------- | ---------------------- | ------------------------------- |
| `NEXT_PUBLIC_APP_URL`               | Yes                    | Canonical deployed URL          |
| `NEXT_PUBLIC_SUPABASE_URL`          | Yes                    | Supabase project URL            |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`     | Yes                    | Public RLS-limited database key |
| `SUPABASE_SERVICE_ROLE_KEY`         | Yes                    | Server-only admin access        |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes                    | Clerk client key                |
| `CLERK_SECRET_KEY`                  | Yes                    | Clerk server key                |
| `CLERK_WEBHOOK_SECRET`              | Recommended            | Signed user profile sync        |
| `ADMIN_USER_IDS`                    | Yes for admin          | Comma-separated Clerk user IDs  |
| `AI_API_KEY` / `AI_API_BASE_URL`    | Optional               | External LLM adapter            |
| `RESEND_API_KEY`                    | Optional               | Appointment email notifications |
| `TWILIO_*`                          | Optional               | Appointment SMS notifications   |

Without credentials, the UI runs in **demo mode** with localStorage tracking, deterministic advisor/planner logic, placeholder admin data and demo booking references.

## 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run typecheck
npm run lint
npm test
npm run format:check
```

## 4. Build for production

```bash
npm run build
npm start
```

Always run `npm run build` before pushing a release. It catches server/client boundary, type and route-generation problems.

## 5. Connect Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Copy **Project URL**, **anon key** and **service role key** from **Project Settings → API** into `.env.local`.
3. Install the Supabase CLI and authenticate:

   ```bash
   npm install -g supabase
   supabase login
   supabase link --project-ref YOUR_PROJECT_REF
   supabase db push
   ```

4. Alternatively, open **SQL Editor** and run these in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_seed_foods.sql`
5. Confirm tables in **Table Editor** and check that RLS is enabled.
6. The server routes use `SUPABASE_SERVICE_ROLE_KEY` only after Zod validation and Clerk authorization. Never expose this key in client code.
7. Create a Clerk JWT template/integration for Supabase so `auth.jwt()->>'sub'` contains the Clerk user ID. RLS policies use this value.

### Database relationships

- `profiles` owns food, water and exercise logs, favourites, notifications and achievements.
- `food_logs.food_id → foods.id` retains nutrition references.
- `appointments.user_id → profiles.id` is nullable so guest clinic bookings are supported.
- `reviews.appointment_id → appointments.id` is unique, allowing one review after an appointment.
- `user_achievements` joins profiles and achievement definitions.

## 6. Configure Clerk

1. Create an application at [dashboard.clerk.com](https://dashboard.clerk.com).
2. Enable **Email address**, **Password**, **Google** and password reset under **User & Authentication**.
3. Add `http://localhost:3000` and your production URL as allowed origins/redirects.
4. Copy the publishable and secret keys into `.env.local`.
5. In Clerk, create a webhook for:
   - `user.created`
   - `user.updated`
   - `user.deleted`
6. Use endpoint `https://YOUR_DOMAIN/api/webhooks/clerk` and copy its signing secret to `CLERK_WEBHOOK_SECRET`.
7. Add trusted Clerk user IDs to `ADMIN_USER_IDS`.
8. Restart the development server after changing environment variables.

`middleware.ts` protects `/dashboard` and `/admin` when Clerk credentials exist. API routes perform their own user/admin checks as defence in depth.

## 7. Deploy to Vercel

1. Push the repository to GitHub (commands below).
2. In [Vercel](https://vercel.com/new), select **Add New → Project**.
3. Import the `BharatBites` GitHub repository.
4. Vercel detects Next.js automatically. Keep:
   - Build command: `npm run build`
   - Output: Next.js default
   - Node.js: 20.x or newer
5. Add every production environment variable under **Project Settings → Environment Variables**. Add keys to Production, Preview and Development as appropriate.
6. Run Supabase migrations **before** testing authenticated writes. Migrations are not run automatically by this app.
7. Click **Deploy**.
8. Set `NEXT_PUBLIC_APP_URL` to the final `https://...vercel.app` URL and redeploy.
9. Add the Vercel URL to Clerk allowed origins and update the Clerk webhook URL.
10. Verify:
    - Home, food atlas and generated images load.
    - Clerk sign-in redirects to `/dashboard`.
    - A tracked meal appears in Supabase.
    - A test appointment appears in `appointments` and Admin.
    - RLS blocks a user from reading another user's logs.

### Custom domain

1. Open **Vercel → Project → Settings → Domains**.
2. Add `bharatbites.com` (or your domain).
3. At your registrar, add the A/CNAME records Vercel displays.
4. Wait for DNS and SSL verification.
5. Update `NEXT_PUBLIC_APP_URL`, Clerk origins/redirects/webhook and any Supabase URL allow-list entries.
6. Choose the `www` or apex version as primary and redirect the other in Vercel.

### Common deployment issues

- **Clerk publishable-key error:** the public and secret keys are missing, from different Clerk instances, or added to the wrong Vercel environment.
- **Supabase 401/403:** verify RLS, Clerk JWT `sub`, and that service role is server-only. Re-run migrations if tables/policies are missing.
- **Database relation does not exist:** run both migrations in numeric order against the production project.
- **Webhook 400:** copy the correct `whsec_...` secret and ensure the webhook points to the deployed URL.
- **Images missing:** generated images must remain under `public/images`; do not Git LFS only the pointer files.
- **Build differs locally:** use Node 20+, delete `.next`, run `npm install`, then `npm run typecheck && npm run build`.
- **Vercel function region:** `vercel.json` uses Mumbai (`bom1`); change it if your database/users are primarily elsewhere.

## GitHub setup

### Create and connect a repository

1. Sign in to GitHub and select **New repository**.
2. Name it `BharatBites`.
3. Do **not** initialise with a README, license or `.gitignore` because those files already exist.
4. In the project folder, run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/BharatBites.git
git push -u origin main
```

### Push future updates

```bash
git status
git add .
git commit -m "Describe the update"
git push origin main
```

### Create and merge a feature branch

```bash
git switch -c feature/appointment-reminders
# make changes
git add .
git commit -m "Add appointment reminders"
git push -u origin feature/appointment-reminders
```

Create a pull request on GitHub, review checks, then merge there. Or merge locally:

```bash
git switch main
git pull origin main
git merge feature/appointment-reminders
git push origin main
git branch -d feature/appointment-reminders
```

### Pull updates

```bash
git switch main
git pull --rebase origin main
```

### Resolve merge conflicts

1. Run `git status` and open each file marked **both modified**.
2. Choose the correct content between `<<<<<<<`, `=======` and `>>>>>>>`; remove those markers.
3. Validate the result:

   ```bash
   npm run typecheck
   npm test
   npm run build
   ```

4. Finish:

   ```bash
   git add PATH_TO_RESOLVED_FILE
   git commit                 # for a merge
   # or: git rebase --continue
   git push
   ```

To abandon: `git merge --abort` or `git rebase --abort`.

## API overview

| Route                 | Methods   | Access                       |
| --------------------- | --------- | ---------------------------- |
| `/api/foods`          | GET       | Public                       |
| `/api/advisor`        | POST      | Public, validated            |
| `/api/diet-plan`      | POST      | Public, validated            |
| `/api/track`          | GET, POST | Signed-in user               |
| `/api/dashboard`      | GET       | Signed-in user               |
| `/api/appointments`   | POST      | Guest or user                |
| `/api/appointments`   | GET       | Admin                        |
| `/api/blog`           | GET       | Public; drafts require admin |
| `/api/blog`           | POST      | Admin                        |
| `/api/reviews`        | GET       | Public approved reviews      |
| `/api/reviews`        | POST      | Signed-in completed patient  |
| `/api/webhooks/clerk` | POST      | Signed Svix webhook          |

## AI integration

The checked-in advisor and planner are deterministic, explainable and safe to demo without external cost. To connect an LLM, implement a server-only adapter using `AI_API_KEY` and `AI_API_BASE_URL`, preserve Zod validation, return structured JSON, avoid sending unnecessary personal data, and keep deterministic fallbacks. AI output must remain educational and should never diagnose or replace professional care.

## Accessibility and privacy

- Keyboard-focus styles, semantic labels, a skip link and reduced-motion behaviour are included.
- Leaderboard participation is opt-in.
- Sensitive writes go through validated server routes.
- Service-role and notification credentials are server-only.
- Before launch, add jurisdiction-appropriate privacy, cookie, retention and consent policies and obtain a professional security/legal review.

## Contributing

1. Fork and create a focused feature branch.
2. Keep TypeScript strict and components reusable.
3. Add tests for logic changes.
4. Run `npm run format`, `npm run lint`, `npm run typecheck`, `npm test` and `npm run build`.
5. Open a pull request with screenshots and migration notes when applicable.

## Medical disclaimer

The information on this website is provided for general educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for your specific health concerns.

If you are experiencing a medical emergency, contact your local emergency services or visit the nearest hospital immediately. This website is not intended for emergency medical care.

## License

[MIT](LICENSE) © 2026 BharatBites.
