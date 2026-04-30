"use client";

import { Menu, Moon, Sparkles, Sun } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Students", href: "/students" },
  { label: "Become a Tutor", href: "/become-a-tutor" },
  { label: "Legal", href: "/legal" },
];

export function SiteNavbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (current: number) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const activeTheme = mounted ? (theme === "system" ? resolvedTheme : theme) : "light";
  const isDark = activeTheme === "dark";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-x-0 top-0 z-50 mx-auto mt-4 w-[min(96%,1180px)]"
    >
      <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white/65 px-4 py-3 backdrop-blur-2xl dark:border-white/15 dark:bg-black/55 md:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide">
          <Sparkles className="h-4 w-4 text-[#0057FF]" />
          MPN Language Platform
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-black/70 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href=""
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs font-semibold tracking-wide transition hover:bg-black hover:text-white dark:border-white/20 dark:bg-black/60 dark:hover:bg-white dark:hover:text-black"
          >
            Login
          </Link>

          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs font-semibold tracking-wide transition hover:bg-black hover:text-white dark:border-white/20 dark:bg-black/60 dark:hover:bg-white dark:hover:text-black"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
          </button>

          <button
            className="inline-flex rounded-full border border-black/10 bg-white/70 p-2 md:hidden dark:border-white/20 dark:bg-black/60"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
