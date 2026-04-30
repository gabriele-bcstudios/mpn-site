"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarClock, Languages, Target } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: Target,
    title: "Define your goal",
    text: "Start with a focused consultation to map your level, timeline, and language outcomes.",
  },
  {
    icon: CalendarClock,
    title: "Book with tokens",
    text: "Use tokens for one-to-one depth or group momentum. Schedule flexibly around your week.",
  },
  {
    icon: Languages,
    title: "Build real fluency",
    text: "Progress with premium coaching, measurable milestones, and practical speaking confidence.",
  },
];

export function HowItWorksSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yPattern = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} id="how-it-works" className="relative overflow-hidden px-5 pb-24 pt-14 md:px-10 md:pt-24">
      <motion.div
        style={{ y: yPattern }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:38px_38px]"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65 }}
          className="mb-12 max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60 dark:text-white/65">How it Works</p>
          <h2 className="mt-3 text-[clamp(2rem,4.8vw,4rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
            A clear system designed for elite progress.
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/15 dark:bg-black"
              >
                <div className="inline-flex rounded-full border border-[#0057FF]/30 bg-[#0057FF]/10 p-3">
                  <Icon className="h-5 w-5 text-[#0057FF]" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/75">{step.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
