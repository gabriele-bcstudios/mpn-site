"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { ScrollTypeTitle } from "./ScrollTypeTitle";

// ─── Mock data ─────────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 1,
    title: "Oxford A-Level Prep",
    subtitle: "Grade 9 Italian & Spanish",
    accent: "#0057FF",
    gradient: "from-blue-950 to-zinc-900",
  },
  {
    id: 2,
    title: "Cambridge IGCSE",
    subtitle: "C1 Spanish Intensive",
    accent: "#7C3AED",
    gradient: "from-violet-950 to-zinc-900",
  },
  {
    id: 3,
    title: "Business Fluency",
    subtitle: "Professional Italian",
    accent: "#059669",
    gradient: "from-emerald-950 to-zinc-900",
  },
  {
    id: 4,
    title: "GCSE Excellence",
    subtitle: "Dual-Language Track",
    accent: "#E11D48",
    gradient: "from-rose-950 to-zinc-900",
  },
  {
    id: 5,
    title: "Freestyle 1-to-1",
    subtitle: "Conversational at Your Pace",
    accent: "#D97706",
    gradient: "from-amber-950 to-zinc-900",
  },
  {
    id: 6,
    title: "University Entry",
    subtitle: "Essay & Oral Mastery",
    accent: "#0891B2",
    gradient: "from-sky-950 to-zinc-900",
  },
];

// ─── Layout constants ──────────────────────────────────────────────────────────
const CARD_W = 280;          // card width  (px)
const CARD_H = 320;          // card height (px)
const RADIUS = 500;          // cylinder radius (px) — larger = flatter curve
const N = CARDS.length;      // number of faces on the cylinder
const STEP = 360 / N;        // angular gap between cards  (60°)
const SPEED = 0.014;         // degrees per millisecond  (~14°/s → full spin ≈ 26 s)

// ─── Section ───────────────────────────────────────────────────────────────────
export function CurvedCarousel() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Single shared MotionValue that drives the entire cylinder rotation
  const baseAngle = useMotionValue(0);
  const lastTime = useRef<number | null>(null);

  // Increment the angle smoothly on every RAF tick
  useAnimationFrame((time) => {
    if (lastTime.current === null) {
      lastTime.current = time;
      return;
    }
    const delta = time - lastTime.current;
    lastTime.current = time;
    baseAngle.set(baseAngle.get() + SPEED * delta);
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-zinc-950 py-32 md:py-40">
      {/* Blend the dark showcase into surrounding sections */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-24 bg-gradient-to-b from-[var(--background)] to-transparent md:h-32"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-t from-[var(--background)] to-transparent md:h-32"
        aria-hidden
      />

      {/* ── Ambient background glow ── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        <div className="h-[500px] w-[500px] rounded-full bg-[#0057FF]/6 blur-[140px]" />
      </div>

      {/* ── Left / right depth-fade masks ── */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-zinc-950 to-transparent md:w-72" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-zinc-950 to-transparent md:w-72" aria-hidden />

      {/* ── Section header ── */}
      <div className="relative z-20 mx-auto mb-16 max-w-6xl px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
        >
          Learning Tracks · Built for Excellence
        </motion.p>
        <ScrollTypeTitle
          progress={scrollYProgress}
          className="mt-3 text-[clamp(2rem,4.8vw,4rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-white"
          parts={[
            { text: "Every path to " },
            { text: "fluency.", className: "text-[#0057FF]" },
          ]}
        />
      </div>

      {/* ── 3-D cylinder stage ──
          perspective is applied here so all children share the same VP.
          The inner div with preserve-3d anchors the coordinate system.  ── */}
      <div
        className="relative"
        style={{
          height: CARD_H + 180,          // larger stage height for extra vertical breathing room
          perspective: "1000px",         // depth of the virtual camera
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",  // propagate 3-D context to children
          }}
        >
          {CARDS.map((card, i) => (
            <CylinderCard key={card.id} card={card} index={i} baseAngle={baseAngle} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Single card placed on the cylinder surface ────────────────────────────────
function CylinderCard({
  card,
  index,
  baseAngle,
}: {
  card: (typeof CARDS)[0];
  index: number;
  baseAngle: MotionValue<number>;
}) {
  // ── Derived transforms, recalculated on every angle change ──

  // Horizontal offset: projects the card onto the X axis of the cylinder.
  // Subtract half the card width so the card center (not left edge) sits on the arc.
  const x = useTransform(baseAngle, (base) => {
    const rad = ((base + STEP * index) * Math.PI) / 180;
    return RADIUS * Math.sin(rad) - CARD_W / 2;
  });

  // Depth: pushes the card toward / away from the viewer along Z.
  const z = useTransform(baseAngle, (base) => {
    const rad = ((base + STEP * index) * Math.PI) / 180;
    return RADIUS * Math.cos(rad);
  });

  // The card must face the viewer at all times, so it rotates opposite to its angle.
  const rotateY = useTransform(baseAngle, (base) => -(base + STEP * index));

  // Back-facing cards fade out so they feel truly behind the cylinder.
  // cos = 1 → front (fully visible), cos = −1 → back (invisible)
  const opacity = useTransform(baseAngle, (base) => {
    const rad = ((base + STEP * index) * Math.PI) / 180;
    const cos = Math.cos(rad);
    // Remap [−1 … 1] → [0 … 1], then ease off below 0.3 for realism
    const raw = (cos + 1) / 2;
    return raw < 0.15 ? 0 : raw;
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: CARD_W,
        height: CARD_H,
        x,                  // translateX: cylinder arc position
        y: -CARD_H / 2,     // center vertically on the stage midline
        z,                  // translateZ: depth
        rotateY,            // keep face toward viewer
        opacity,
        willChange: "transform, opacity",
      }}
    >
      {/* ── Card face ── */}
      <div
        className={`relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-6`}
        style={{ border: `1px solid ${card.accent}35` }}
      >
        {/* Inner radial glow that breathes personality into each card */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          aria-hidden
          style={{
            background: `radial-gradient(ellipse at 65% 0%, ${card.accent}20 0%, transparent 65%)`,
          }}
        />

        {/* Accent dot badge */}
        <div
          className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full"
          style={{
            background: `${card.accent}20`,
            border: `1px solid ${card.accent}55`,
          }}
        >
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: card.accent }} />
        </div>

        {/* Zero-padded index */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/25">
          {String(index + 1).padStart(2, "0")}
        </p>

        {/* Main text */}
        <h3 className="text-xl font-semibold leading-tight text-white">{card.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/50">{card.subtitle}</p>

        {/* Bottom shimmer line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          aria-hidden
          style={{
            background: `linear-gradient(to right, transparent, ${card.accent}80, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}
