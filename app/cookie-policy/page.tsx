import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | MPN Language Platform",
  description: "Cookie usage and preferences on MPN Language Platform.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 pb-24 pt-28 text-[var(--foreground)] md:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/55 dark:text-white/60">Legal</p>
        <h1 className="mt-4 text-[clamp(2.2rem,6vw,4.4rem)] font-semibold leading-[0.92] tracking-[-0.03em]">Cookie Policy</h1>

        <div className="mt-10 space-y-8 border-t border-black/15 pt-8 text-base leading-relaxed dark:border-white/20">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Essential cookies</h2>
            <p className="mt-3 text-black/75 dark:text-white/78">
              These cookies are required for authentication, security, and core site functionality. They cannot be
              disabled in our systems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Analytics cookies</h2>
            <p className="mt-3 text-black/75 dark:text-white/78">
              We use analytics cookies to understand how visitors use the platform and improve performance and user
              experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Managing cookies</h2>
            <p className="mt-3 text-black/75 dark:text-white/78">
              You can manage cookie preferences through your browser settings. Disabling some cookies may impact certain
              platform features.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
