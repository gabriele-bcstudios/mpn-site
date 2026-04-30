"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarClock, Coins, GraduationCap, PhoneCall, UserCheck } from "lucide-react";
import { useRef } from "react";

const tracks = [
  {
    title: "GCSE & A-Levels",
    description:
      "Exam-focused pathways with precise curriculum mapping, mock speaking drills, and weekly milestone tracking.",
  },
  {
    title: "Freestyle 1-to-1",
    description:
      "Private sessions shaped around travel, business, relocation, or cultural fluency with complete scheduling freedom.",
  },
  {
    title: "Group Lessons",
    description:
      "Curated small cohorts for momentum, confidence, and high speaking density in every session.",
  },
];

const process = [
  {
    icon: UserCheck,
    title: "Sign up",
    text: "Create your profile and define outcomes, availability, and target level.",
  },
  {
    icon: PhoneCall,
    title: "Discovery Call",
    text: "Use your free trial token for a 15-minute call to choose your perfect tutor.",
  },
  {
    icon: CalendarClock,
    title: "Book Sessions",
    text: "Spend tokens flexibly across one-to-one or group lessons with premium continuity.",
  },
];

export default function StudentsPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <div className="relative min-h-screen bg-[var(--background)] pt-24 text-[var(--foreground)]">
      <section ref={heroRef} className="section-grid radial-atmosphere relative overflow-hidden px-5 py-20 md:px-10 md:py-28">
        <motion.div
          style={{ y: glowY }}
          className="pointer-events-none absolute -right-20 top-8 h-72 w-72 rounded-full bg-[#0057FF]/20 blur-3xl dark:bg-[#2f6cff]/25"
          aria-hidden
        />

        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-black/55 dark:text-white/60"
          >
            The Learner&apos;s Journey • UK Focus
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-5xl text-[clamp(2.4rem,7.5vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.035em]"
          >
            Your Italian and Spanish roadmap, engineered for measurable excellence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-black/70 dark:text-white/75 md:text-lg"
          >
            Designed for ambitious learners in the UK. From GCSE and A-Levels to freestyle fluency, every lesson is
            token-powered, tutor-matched, and tailored around your goals.
          </motion.p>

          <motion.a
            href="#process"
            whileHover={{ y: -2 }}
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#0057FF]/50 bg-[#0057FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0047d6]"
          >
            Start with 1 Free Trial Token
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {tracks.map((track, index) => (
            <motion.article
              key={track.title}
              initial={{ opacity: 0, y: 20, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.015 }}
              className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/15 dark:bg-black"
            >
              <GraduationCap className="h-5 w-5 text-[#0057FF]" />
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">{track.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/75">{track.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="process" className="px-5 pb-24 pt-10 md:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65 }}
            className="max-w-4xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.92] tracking-[-0.03em]"
          >
            Sign up. Discovery call. Book sessions. Repeat with momentum.
          </motion.h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {process.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 24, rotate: 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                  style={{ rotate: cardRotate }}
                  className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/15 dark:bg-black"
                >
                  <div className="inline-flex rounded-full border border-[#0057FF]/35 bg-[#0057FF]/10 p-3">
                    <Icon className="h-5 w-5 text-[#0057FF]" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm text-black/70 dark:text-white/75">{step.text}</p>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="mt-10 rounded-3xl border border-[#0057FF]/35 bg-[#0057FF]/8 p-6 dark:bg-[#2f6cff]/10"
          >
            <div className="flex items-start gap-3">
              <Coins className="mt-0.5 h-5 w-5 text-[#0057FF]" />
              <p className="text-sm leading-relaxed text-black/80 dark:text-white/85">
                Token system, total flexibility: spend tokens on one-to-one depth or group momentum. Every learner starts
                with 1 free trial token for a 15-minute discovery call to secure the best tutor match.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
