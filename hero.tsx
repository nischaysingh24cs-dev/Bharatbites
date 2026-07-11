import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy" };
export default function PrivacyPage() {
  return (
    <article className="container-page max-w-3xl py-16">
      <p className="text-[10px] font-bold uppercase tracking-wider text-saffron-500">
        Last updated 11 July 2026
      </p>
      <h1 className="mt-3 text-4xl font-extrabold">Privacy at BharatBites</h1>
      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
        <p>
          This starter policy explains the application&apos;s intended data
          flow. Replace it with counsel-reviewed terms before public launch.
        </p>
        <section>
          <h2 className="text-lg font-bold text-ink-950 dark:text-white">
            What is collected
          </h2>
          <p>
            Account profile, optional body and goal information,
            meal/water/activity logs, appointment details and preferences you
            choose to provide.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-ink-950 dark:text-white">
            How it is used
          </h2>
          <p>
            To provide tracking, personalised estimates, clinic booking, account
            security and optional reminders. Health data is not shown on the
            public leaderboard.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-ink-950 dark:text-white">
            Your choices
          </h2>
          <p>
            Leaderboard participation is optional. You may request access,
            correction or deletion of your account data. Configure a real
            privacy contact before launch.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-ink-950 dark:text-white">
            Security and retention
          </h2>
          <p>
            Production data is protected with Clerk authentication, Supabase
            RLS, validated API routes and server-only service credentials.
            Define formal retention and incident-response procedures before
            accepting patients.
          </p>
        </section>
      </div>
    </article>
  );
}
