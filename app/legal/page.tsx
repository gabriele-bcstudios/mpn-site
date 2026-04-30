import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal | MPN Language Platform",
  description: "Privacy, terms, and token policy for MPN Language Platform.",
};

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 pb-24 pt-28 text-[var(--foreground)] md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/55 dark:text-white/60">Rules & Compliance</p>
        <h1 className="mt-4 text-[clamp(2.4rem,6.8vw,6rem)] font-semibold leading-[0.9] tracking-[-0.03em]">Legal framework.</h1>

        <div className="mt-12 space-y-12 border-t border-black/15 pt-10 text-base leading-relaxed dark:border-white/20">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Privacy</h2>
            <p className="mt-4 text-black/75 dark:text-white/78">
              We process learner and tutor data strictly to deliver lessons, handle bookings, and maintain quality and
              safeguarding standards in the UK. Data is minimised, access-controlled, and retained only where necessary
              for contractual and legal compliance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Terms</h2>
            <p className="mt-4 text-black/75 dark:text-white/78">
              Lesson bookings are confirmed when tokens are available and successfully assigned. No-shows, late
              cancellations, and policy violations may affect token usage and account status. MPN reserves the right to
              suspend accounts where trust, conduct, or reliability standards are not met.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Token Expiration Policy</h2>
            <p className="mt-4 text-black/75 dark:text-white/78">
              Token validity is tied to package duration. 1-month packages with 8 tokens expire after 1 month. 6-month
              packages with 36 tokens expire after 7 months total validity. Expired tokens cannot be redeemed,
              transferred, or refunded unless required by law.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
