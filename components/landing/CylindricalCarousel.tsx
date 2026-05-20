"use client";

import { useEffect, useRef } from "react";

const BRANDS = [
  "Aurelia Systems",
  "Northbeam AI",
  "Velora Group",
  "Meridian Labs",
  "Atlas Capital",
  "NovaSphere",
  "Orchid Dynamics",
  "Helix Partners",
  "Lumen Stack",
  "Summit Cloud",
  "Summit Cloud",
  "Summit Cloud",
  "Summit Cloud",
];

const CARD_W       = 700;
const CARD_H       = 800;
const GAP          = 0;
const STEP         = CARD_W + GAP;
const N            = BRANDS.length;
const TOTAL_W      = N * STEP;
const SPEED        = 50;        // px/s
const SPHERE_R     = 800;       // imaginary sphere radius (px)
const PERSPECTIVE  = 2200;      // CSS perspective (px)
const NUM_SLOTS    = 24;

export function CylindricalCarousel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let offset = 0;
    let last: number | null = null;
    let raf: number;

    const tick = (t: number) => {
      if (last !== null) {
        offset = (offset + SPEED * (t - last) / 1000) % TOTAL_W;
      }
      last = t;

      const viewW    = stage.offsetWidth;
      const center   = viewW / 2;
      const startIdx = Math.floor(offset / STEP) - 2;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        const globalIdx = startIdx + i;
        const brand     = BRANDS[((globalIdx % N) + N) % N];
        const rawX      = globalIdx * STEP - offset;

        // Distance of card centre from viewport centre
        const dist = rawX + CARD_W / 2 - center;

        const theta = dist / SPHERE_R;
        const cosT  = Math.cos(theta);
        const z     = -SPHERE_R * cosT;
        const rotateY = -(theta * 180) / Math.PI;
        const scale = 1 - Math.max(0, cosT) * 0.28;

        const absDist  = Math.abs(dist);
        const fadeEdge = viewW * 0.65;
        const fadeFull = viewW * 0.85;
        const opacity  = absDist < fadeEdge
          ? 1
          : Math.max(0, 1 - (absDist - fadeEdge) / (fadeFull - fadeEdge));

        card.style.left      = `${rawX}px`;
        card.style.transform = `translateY(-50%) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.opacity   = String(Math.round(opacity * 100) / 100);

        const label = card.querySelector<HTMLParagraphElement>("[data-label]");
        if (label && label.textContent !== brand) label.textContent = brand;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: `${CARD_H + 80}px`,
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        maskImage:       "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
      aria-label="Premium brand showcase carousel"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{ background: "radial-gradient(circle at 50% 55%, rgba(59,130,246,0.16) 0%, transparent 62%)" }}
      />

      {/* 3-D stage: single vanishing point for all cards */}
      <div
        ref={stageRef}
        className="absolute inset-0"
        style={{ perspective: `${PERSPECTIVE}px`, perspectiveOrigin: "50% 50%" }}
      >
        {Array.from({ length: NUM_SLOTS }, (_, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            style={{
              position:        "absolute",
              top:             "50%",
              width:           CARD_W,
              height:          CARD_H,
              transformOrigin: "center center",
              willChange:      "transform, opacity",
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/20 bg-slate-800">
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0) 50%)" }}
              />
              <div className="flex h-full w-full items-center justify-center px-8 text-center">
                <p data-label className="text-base font-semibold tracking-wide text-white">
                  {BRANDS[i % N]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
