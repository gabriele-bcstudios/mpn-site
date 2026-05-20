"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { CylindricalCarousel } from "./CylindricalCarousel";
import { MagneticButton } from "./MagneticButton";

const eyebrowText = "Master Italian and Spanish. On your terms.";
const headlineText = "Master Italian and Spanish. On your terms.";
const descriptionText =
  "MPN provides premium, personalised online language tutoring. Connect with meticulously selected native-level experts to achieve real fluency.";

const SHOW_CYLINDRICAL_CAROUSEL = false;

const typeContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.028,
      delayChildren: 0.18,
    },
  },
};

const typeItem = {
  hidden: { y: 18, opacity: 0, filter: "blur(6px)" },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function AnimatedTypeText({
  text,
  className,
  as = "p",
  delay = 0,
}: {
  text: string;
  className: string;
  as?: "p" | "h1";
  delay?: number;
}) {
  const Tag = as === "h1" ? motion.h1 : motion.p;

  return (
    <Tag
      variants={typeContainer}
      initial="hidden"
      animate="show"
      transition={{ delay }}
      className={className}
      style={{ whiteSpace: "pre-wrap" }}
    >
      {Array.from(text).map((char, index) => (
        <motion.span key={`${char}-${index}`} variants={typeItem} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[88svh] items-center overflow-hidden bg-black px-5 pb-10 pt-24 md:px-10 md:pb-12"
    >

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <AnimatedTypeText
          as="p"
          text={eyebrowText}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-black/60 dark:text-white/65"
        />

        <AnimatedTypeText
          as="h1"
          text={headlineText}
          delay={0.22}
          className="max-w-5xl text-[clamp(2rem,6.2vw,5.8rem)] font-semibold leading-[0.9] tracking-[-0.03em]"
        />

        <AnimatedTypeText
          as="p"
          text={descriptionText}
          delay={0.55}
          className="mt-6 max-w-3xl text-base leading-relaxed text-black/70 dark:text-white/75 md:text-lg"
        />

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.7 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#pricing" className="border-black bg-black text-white">
            Book Your Free Trial
          </MagneticButton>

          <a
            href="#how-it-works"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-black/80 transition-colors hover:text-black dark:text-white/80 dark:hover:text-white"
          >
            Explore Packages
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>

        {SHOW_CYLINDRICAL_CAROUSEL && (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 w-screen"
          >
            <CylindricalCarousel />
          </motion.div>
        )}
      </div>
    </section>
  );
}
