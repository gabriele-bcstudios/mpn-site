"use client";

import { motion, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useMemo, useState } from "react";

type TitlePart = {
  text: string;
  className?: string;
};

type ScrollTypeTitleProps = {
  progress: MotionValue<number>;
  parts: TitlePart[];
  className: string;
  start?: number;
  revealEnd?: number;
  hideStart?: number;
  hideEnd?: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function ScrollTypeTitle({
  progress,
  parts,
  className,
  start = 0.1,
  revealEnd = 0.48,
  hideStart = 0.7,
  hideEnd = 0.96,
}: ScrollTypeTitleProps) {
  const [position, setPosition] = useState(() => progress.get());

  useMotionValueEvent(progress, "change", (latest) => {
    setPosition(latest);
  });

  const chars = useMemo(
    () =>
      parts.flatMap((part) =>
        Array.from(part.text).map((char) => ({
          char,
          className: part.className ?? "",
        })),
      ),
    [parts],
  );

  const totalChars = Math.max(chars.length, 1);
  const reveal = clamp((position - start) / (revealEnd - start), 0, 1) * totalChars;
  const hide = clamp((position - hideStart) / (hideEnd - hideStart), 0, 1) * totalChars;
  const shown = clamp(reveal - hide, 0, totalChars);

  return (
    <motion.h2 className={className} aria-label={parts.map((part) => part.text).join("")}>
      {chars.map((item, index) => {
        const strength = clamp(shown - index, 0, 1);

        return (
          <span
            key={`${item.char}-${index}`}
            className={`inline-block ${item.className}`}
            style={{
              opacity: strength,
              transform: `translateY(${(1 - strength) * 14}px)`,
              filter: `blur(${(1 - strength) * 6}px)`,
            }}
          >
            {item.char === " " ? "\u00A0" : item.char}
          </span>
        );
      })}
    </motion.h2>
  );
}
