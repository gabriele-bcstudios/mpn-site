import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contacts | MPN Language Platform",
  description: "Get in touch with MPN Language Platform.",
};

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 pb-24 pt-28 text-[var(--foreground)] md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/55 dark:text-white/60">
          Contact
        </p>
        <h1 className="mt-4 text-[clamp(2.4rem,6.8vw,6rem)] font-semibold leading-[0.9] tracking-[-0.03em]">
          Let&apos;s talk.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-black/75 dark:text-white/78 md:text-lg">
          Reach out for student programs, tutor applications, or partnership requests. We usually reply within one
          business day.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <section className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/15 dark:bg-black">
            <h2 className="text-xl font-semibold tracking-tight">Direct Contacts</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-black/75 dark:text-white/78">
              <li>Email: support@mpnplatform.com</li>
              <li>Phone: +44 20 0000 0000</li>
              <li>Hours: Mon to Fri, 09:00 to 18:00 (UK)</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/15 dark:bg-black">
            <h2 className="text-xl font-semibold tracking-tight">Quick Links</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/students"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-4 py-2 text-sm font-semibold transition hover:bg-black hover:text-white dark:border-white/25 dark:hover:bg-white dark:hover:text-black"
              >
                Students
              </Link>
              <Link
                href="/become-a-tutor"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-4 py-2 text-sm font-semibold transition hover:bg-black hover:text-white dark:border-white/25 dark:hover:bg-white dark:hover:text-black"
              >
                Become a Tutor
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
