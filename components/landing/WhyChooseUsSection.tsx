"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { BadgeCheck, BookOpen, Cpu } from "lucide-react";
import { useRef } from "react";
import { ScrollTypeTitle } from "./ScrollTypeTitle";

const pillars = [
  {
    icon: BadgeCheck,
    title: "Elite Tutors",
    text: "We guarantee maximum quality through a rigorous selection process, requiring mandatory interviews before any tutor is activated on our platform.",
  },
  {
    icon: BookOpen,
    title: "Bespoke Curriculum",
    text: "Tailored support for GCSE, A-Level, university preparation, and real-life professional conversation.",
  },
  {
    icon: Cpu,
    title: "Seamless Technology",
    text: "A fully integrated platform operating on London time, designed specifically for the UK market.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function WhyChooseUsSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [-40, 80]);

  return (
    <section
      ref={ref}
      id="why-choose-us"
      className="relative overflow-hidden px-5 py-24 md:px-10 md:py-32"
    >
      {/* Ambient glow blobs */}
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#0057FF]/15 blur-[100px] dark:bg-[#2f6cff]/20"
        aria-hidden
      />
      <motion.div
        style={{ y: glowY2 }}
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#0057FF]/10 blur-[80px] dark:bg-[#2f6cff]/15"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/55 dark:text-white/60">
            The MPN Approach · Why Choose Us?
          </p>
        </motion.div>

        {/* Split layout: headline left, body right */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ScrollTypeTitle
              progress={scrollYProgress}
              className="text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.9] tracking-[-0.035em]"
              parts={[
                { text: "Engineered for fluency. " },
                { text: "Built for confidence.", className: "text-[#0057FF]" },
              ]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center"
          >
            <p className="text-base leading-relaxed text-black/70 dark:text-white/75 md:text-lg">
              We believe in building real confidence, not just asking you to memorise vocabulary. Our lessons are
              interactive, goal-focused, and adapted entirely to your pace and learning style.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
          className="my-14 h-px bg-gradient-to-r from-[#0057FF]/40 via-black/10 to-transparent dark:via-white/10"
        />

        {/* Pillar cards */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-2xl border border-black/10 bg-white p-7 transition-shadow hover:shadow-xl hover:shadow-[#0057FF]/8 dark:border-white/15 dark:bg-black dark:hover:shadow-[#2f6cff]/10"
              >
                {/* Subtle inner glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-[#0057FF]/30 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="inline-flex rounded-full border border-[#0057FF]/30 bg-[#0057FF]/10 p-3 transition-colors duration-300 group-hover:bg-[#0057FF]/20">
                  <Icon className="h-5 w-5 text-[#0057FF]" />
                </div>

                <h3 className="mt-5 text-xl font-semibold tracking-tight">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/75">{pillar.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
