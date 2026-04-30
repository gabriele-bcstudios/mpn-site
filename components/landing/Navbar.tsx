"use client";

import { Menu, Sparkles } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { MagneticButton } from "./MagneticButton";

const links = [
  { label: "Hero", href: "#hero" },
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#how-it-works" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current: number) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: hidden ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-x-0 top-0 z-50 mx-auto mt-4 w-[min(96%,1080px)]"
    >
      <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white/75 px-4 py-3 backdrop-blur-xl md:px-6">
        <a href="#hero" className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide">
          <Sparkles className="h-4 w-4 text-[#0057FF]" />
          MPN Language Platform
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-black/70 transition-colors hover:text-black"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <MagneticButton href="#pricing" className="border-[#0057FF]/35 text-[#0057FF]">
            Book Discovery Call
          </MagneticButton>
        </div>

        <button className="inline-flex rounded-full border border-black/10 p-2 md:hidden" aria-label="Open menu">
          <Menu className="h-4 w-4" />
        </button>
      </div>
    </motion.nav>
  );
}
