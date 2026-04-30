"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { BriefcaseBusiness, Camera, CheckCircle2, ShieldAlert, Users } from "lucide-react";
import { useRef } from "react";

const onboarding = [
  {
    icon: BriefcaseBusiness,
    title: "Profile setup",
    text: "Build a premium tutor profile with credentials, language strengths, and teaching style.",
  },
  {
    icon: Camera,
    title: "Mandatory video interview",
    text: "Activation requires a live interview to verify pedagogy, communication quality, and platform fit.",
  },
  {
    icon: ShieldAlert,
    title: "3-Strike Policy",
    text: "Three missed lessons trigger removal. Reliability is non-negotiable for a high-trust learning standard.",
  },
];

const earnings = [
  {
    role: "1-to-1 Lesson",
    rate: "£10",
    detail: "Per completed 45-50 min session",
  },
  {
    role: "Group Lesson",
    rate: "£12",
    detail: "Per completed 45-50 min session",
  },
];

export default function BecomeTutorPage() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const panelY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const panelScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  return (
    <div className="relative min-h-screen bg-[var(--background)] pt-24 text-[var(--foreground)]">
      <section ref={ref} className="radial-atmosphere relative overflow-hidden px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-black/60 dark:text-white/60"
          >
            Elite Recruitment
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-5xl text-[clamp(2.4rem,7vw,6.6rem)] font-semibold leading-[0.9] tracking-[-0.035em]"
          >
            Join the elite.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-black/70 dark:text-white/75 md:text-lg"
          >
            MPN Language Platform recruits only tutors who can deliver precision teaching and premium learner outcomes.
            Our standards are rigorous because our students expect excellence.
          </motion.p>
        </div>
      </section>

      <section className="px-5 pb-12 pt-8 md:px-10 md:pt-14">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.92] tracking-[-0.03em]"
          >
            Selection and onboarding
          </motion.h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {onboarding.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 22, rotate: 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.09 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/15 dark:bg-black"
                >
                  <div className="inline-flex rounded-full border border-[#0057FF]/35 bg-[#0057FF]/10 p-3">
                    <Icon className="h-5 w-5 text-[#0057FF]" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/75">{item.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 pt-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            style={{ y: panelY, scale: panelScale }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="rounded-3xl border border-black/10 bg-white p-7 dark:border-white/20 dark:bg-black"
          >
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#0057FF]" />
              <h2 className="text-2xl font-semibold tracking-tight">Transparent earnings</h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {earnings.map((item, index) => (
                <motion.div
                  key={item.role}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="rounded-2xl border border-[#0057FF]/30 bg-[#0057FF]/8 p-5 dark:bg-[#2f6cff]/10"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-black/60 dark:text-white/65">
                    {item.role}
                  </p>
                  <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0057FF]">{item.rate}</p>
                  <p className="mt-3 text-sm text-black/70 dark:text-white/75">{item.detail}</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 inline-flex items-start gap-2 text-sm text-black/70 dark:text-white/75">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0057FF]" />
              Every session lasts 45-50 minutes. Consistency and attendance quality are monitored platform-wide.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
