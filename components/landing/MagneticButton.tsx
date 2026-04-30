"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import type { HTMLMotionProps } from "framer-motion";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"a">, "children" | "className">;

export function MagneticButton({ children, className = "", ...props }: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  return (
    <motion.a
      {...props}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = (event.clientX - rect.left - rect.width / 2) * 0.2;
        const offsetY = (event.clientY - rect.top - rect.height / 2) * 0.2;
        x.set(offsetX);
        y.set(offsetY);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex overflow-hidden rounded-full border border-black/15 px-6 py-3 text-sm font-semibold tracking-wide transition-colors ${className}`}
    >
      <span className="absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100" />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">{children}</span>
    </motion.a>
  );
}
