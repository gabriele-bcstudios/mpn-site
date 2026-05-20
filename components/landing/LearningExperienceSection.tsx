"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BrainCircuit, Gift, LayoutDashboard, PhoneCall } from "lucide-react";
import { useRef, useState } from "react";
import { MagneticButton } from "./MagneticButton";
import { ScrollTypeTitle } from "./ScrollTypeTitle";

const experienceItems = [
  {
    icon: BrainCircuit,
    title: "Intelligent Matching",
    text: "Our bespoke algorithm matches you with recommended tutors based on your specific availability, language goals, and tutor ratings.",
    stat: "Smart Fit",
  },
  {
    icon: Gift,
    title: "Risk-Free Introduction",
    text: "Every new student receives a complimentary token for a 15-minute trial lesson to ensure the perfect tutor fit.",
    stat: "15-Min Trial",
  },
  {
    icon: PhoneCall,
    title: "Optional Discovery Call",
    text: "Start your journey with a dedicated onboarding call with our administrative team to outline your exact needs.",
    stat: "Guided Start",
  },
  {
    icon: LayoutDashboard,
    title: "All-in-One Dashboard",
    text: "Manage your weekly goals, access shared resources, review detailed post-lesson feedback, and enter your video classroom with a single click.",
    stat: "One Click",
  },
];

export function LearningExperienceSection() {
  const ref = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const glowYLeft = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const glowYRight = useTransform(scrollYProgress, [0, 1], [-40, 90]);

  const active = experienceItems[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section
      ref={ref}
      id="learning-experience"
      className="relative overflow-hidden px-5 py-24 md:px-10 md:py-32"
    >
      <motion.div
        style={{ y: glowYLeft }}
        className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-full bg-[#0057FF]/12 blur-[90px] dark:bg-[#2f6cff]/18"
        aria-hidden
      />
      <motion.div
        style={{ y: glowYRight }}
        className="pointer-events-none absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-[#0057FF]/10 blur-[100px] dark:bg-[#2f6cff]/16"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60 dark:text-white/65">
            The Learning Experience · For Students
          </p>
          <ScrollTypeTitle
            progress={scrollYProgress}
            className="mt-4 text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.9] tracking-[-0.035em]"
            parts={[
              { text: "Your goals. Your schedule. " },
              { text: "Your platform.", className: "text-[#0057FF]" },
            ]}
          />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/70 dark:text-white/75 md:text-lg">
            Whether you are an independent learner, a professional, or a student preparing for exams, MPN adapts to you.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {experienceItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className={`group relative rounded-2xl border p-6 text-left transition-all ${
                    isActive
                      ? "border-[#0057FF]/40 bg-[#0057FF]/8 shadow-lg shadow-[#0057FF]/10"
                      : "border-black/10 bg-white hover:border-black/25 dark:border-white/15 dark:bg-black dark:hover:border-white/35"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-[#0057FF]/30 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex items-center justify-between">
                    <div className="inline-flex rounded-full border border-[#0057FF]/30 bg-[#0057FF]/10 p-3">
                      <Icon className="h-5 w-5 text-[#0057FF]" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45 dark:text-white/50">
                      {item.stat}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/75">{item.text}</p>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl border border-black/10 bg-white p-7 dark:border-white/15 dark:bg-black md:p-8"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#0057FF]/12 blur-3xl" aria-hidden />

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45 dark:text-white/50">
              Interactive Overview
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6"
              >
                <div className="inline-flex rounded-full border border-[#0057FF]/30 bg-[#0057FF]/10 p-3">
                  <ActiveIcon className="h-5 w-5 text-[#0057FF]" />
                </div>

                <h3 className="mt-5 text-2xl font-semibold tracking-tight">{active.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-black/70 dark:text-white/75 md:text-base">
                  {active.text}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10"
            >
              <MagneticButton href="#pricing" className="border-[#0057FF]/40 bg-[#0057FF] text-white">
                Find Your Perfect Tutor
                <ArrowRight className="ml-2 h-4 w-4" />
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
