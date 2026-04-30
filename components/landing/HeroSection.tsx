"use client";

import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "./MagneticButton";

const headlineWords = [
  "Speak",
  "Italian",
  "and",
  "Spanish",
  "with",
  "precision,",
  "confidence,",
  "and",
  "elite",
  "coaching.",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      id="hero"
      className="section-grid relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-28 md:px-10"
    >
      <motion.div
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      />
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#0057FF]/20 blur-3xl"
        aria-hidden
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -110]) }}
        className="pointer-events-none absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-[#0057FF]/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-black/60 dark:text-white/65"
        >
          Premium Language Platform • United Kingdom
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-6xl text-[clamp(2.4rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.03em]"
        >
          {headlineWords.map((word, index) => (
            <motion.span key={`${word}-${index}`} variants={item} className="mr-[0.2em] inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-black/70 dark:text-white/75 md:text-lg"
        >
          Flexible token-based lessons for ambitious professionals. Build fluency through one-to-one or group sessions,
          tailored around your goals, schedule, and pace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#pricing" className="border-black bg-black text-white">
            Free 15-minute Discovery Call (1 Trial Token)
          </MagneticButton>

          <a
            href="#how-it-works"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-black/80 transition-colors hover:text-black dark:text-white/80 dark:hover:text-white"
          >
            See how it works
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
