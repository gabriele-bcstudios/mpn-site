import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | MPN Language Platform",
  description: "How MPN Language Platform collects, uses, and protects personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 pb-24 pt-28 text-[var(--foreground)] md:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/55 dark:text-white/60">Legal</p>
        <h1 className="mt-4 text-[clamp(2.2rem,6vw,4.4rem)] font-semibold leading-[0.92] tracking-[-0.03em]">Privacy Policy</h1>

        <div className="mt-10 space-y-8 border-t border-black/15 pt-8 text-base leading-relaxed dark:border-white/20">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Data we collect</h2>
            <p className="mt-3 text-black/75 dark:text-white/78">
              We collect account, booking, payment, and lesson-related information required to provide tutoring services,
              platform support, and service quality monitoring.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">How we use data</h2>
            <p className="mt-3 text-black/75 dark:text-white/78">
              Data is used to deliver lessons, manage schedules, process payments, improve platform reliability, and
              comply with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Your rights</h2>
            <p className="mt-3 text-black/75 dark:text-white/78">
              You can request access, correction, deletion, or restriction of your personal data where applicable by
              contacting our support team.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
