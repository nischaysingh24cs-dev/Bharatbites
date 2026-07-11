import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms" };
export default function TermsPage() {
  return (
    <article className="container-page max-w-3xl py-16">
      <p className="text-[10px] font-bold uppercase tracking-wider text-saffron-500">
        Last updated 11 July 2026
      </p>
      <h1 className="mt-3 text-4xl font-extrabold">Terms of use</h1>
      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
        <p>
          These starter terms must be reviewed for your business, clinic and
          jurisdiction before launch.
        </p>
        <section>
          <h2 className="text-lg font-bold text-ink-950 dark:text-white">
            Educational service
          </h2>
          <p>
            Nutrition, calorie, BMI, fitness and AI outputs are estimates for
            general education. They are not medical diagnosis, treatment or a
            substitute for qualified professional advice.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-ink-950 dark:text-white">
            Clinic requests
          </h2>
          <p>
            An appointment submission is a request until confirmed by the
            clinic. This website is not for emergency care.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-ink-950 dark:text-white">
            Acceptable use
          </h2>
          <p>
            Do not misuse the service, attempt unauthorised access, submit
            unlawful content or rely on estimates where professional supervision
            is needed.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-ink-950 dark:text-white">
            Emergency notice
          </h2>
          <p>
            If you are experiencing a medical emergency, contact local emergency
            services or visit the nearest hospital immediately.
          </p>
        </section>
      </div>
    </article>
  );
}
