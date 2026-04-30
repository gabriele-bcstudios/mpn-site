"use client";

import { CheckCircle2, Coins, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";

type Mode = "oneToOne" | "group";

type Package = {
  id: string;
  name: string;
  tokens: number;
  bonusTokens: number;
  pricePerToken: number;
  totalPrice: number;
  description: string;
  highlight?: boolean;
};

const pricingData: Record<Mode, Package[]> = {
  oneToOne: [
    {
      id: "single-11",
      name: "Single Lesson",
      tokens: 1,
      bonusTokens: 0,
      pricePerToken: 20,
      totalPrice: 20,
      description: "Perfect for trial or occasional coaching.",
    },
    {
      id: "month-11",
      name: "1 Month Pack",
      tokens: 8,
      bonusTokens: 1,
      pricePerToken: 18.99,
      totalPrice: 8 * 18.99,
      description: "Consistent weekly rhythm for rapid progress.",
      highlight: true,
    },
    {
      id: "six-month-11",
      name: "6 Months Pack",
      tokens: 36,
      bonusTokens: 4,
      pricePerToken: 14.99,
      totalPrice: 36 * 14.99,
      description: "Long-term mastery plan with premium savings.",
    },
  ],
  group: [
    {
      id: "single-group",
      name: "Single Group Session",
      tokens: 1,
      bonusTokens: 0,
      pricePerToken: 14,
      totalPrice: 14,
      description: "Collaborative momentum with expert guidance.",
    },
    {
      id: "three-month-group",
      name: "3 Months Group Pack",
      tokens: 24,
      bonusTokens: 0,
      pricePerToken: 12.99,
      totalPrice: 24 * 12.99,
      description: "Structured progression with better value.",
      highlight: true,
    },
  ],
};

const currency = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
});

export function PricingSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [mode, setMode] = useState<Mode>("oneToOne");
  const [selectedId, setSelectedId] = useState<string>(pricingData.oneToOne[1].id);
  const [bundles, setBundles] = useState(1);

  const packages = pricingData[mode];

  const selectedPackage = useMemo(
    () => packages.find((item) => item.id === selectedId) ?? packages[0],
    [packages, selectedId],
  );

  const computed = useMemo(() => {
    const paidTokens = selectedPackage.tokens * bundles;
    const bonus = selectedPackage.bonusTokens * bundles;
    const totalTokens = paidTokens + bonus;
    const totalPrice = selectedPackage.totalPrice * bundles;
    const effectivePerToken = totalPrice / totalTokens;

    return {
      paidTokens,
      bonus,
      totalTokens,
      totalPrice,
      effectivePerToken,
    };
  }, [selectedPackage, bundles]);

  const bgY = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section ref={ref} id="pricing" className="relative overflow-hidden px-5 py-28 md:px-10">
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(0,87,255,0.11),transparent_44%),radial-gradient(circle_at_80%_70%,rgba(0,87,255,0.09),transparent_38%)]"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">Pricing</p>
          <h2 className="mt-3 text-[clamp(2rem,5vw,4.4rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
            Token-based pricing built for flexibility.
          </h2>
          <p className="mt-4 text-black/70 dark:text-white/75">
            Choose one-to-one depth or group momentum. Scale your learning pace with transparent token packs and clear
            bonus rewards.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => {
              setMode("oneToOne");
              setSelectedId(pricingData.oneToOne[1].id);
              setBundles(1);
            }}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
              mode === "oneToOne"
                ? "border-[#0057FF] bg-[#0057FF] text-white"
                : "border-black/15 bg-white text-black/70 hover:text-black dark:border-white/20 dark:bg-black dark:text-white/75 dark:hover:text-white"
            }`}
          >
            1-to-1 Lessons
          </button>
          <button
            onClick={() => {
              setMode("group");
              setSelectedId(pricingData.group[1].id);
              setBundles(1);
            }}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
              mode === "group"
                ? "border-[#0057FF] bg-[#0057FF] text-white"
                : "border-black/15 bg-white text-black/70 hover:text-black dark:border-white/20 dark:bg-black dark:text-white/75 dark:hover:text-white"
            }`}
          >
            Group Lessons
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((pack, index) => (
              <motion.button
                key={pack.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setSelectedId(pack.id)}
                className={`rounded-2xl border p-5 text-left transition ${
                  selectedId === pack.id
                    ? "border-[#0057FF] bg-[#0057FF]/5"
                    : "border-black/10 bg-white hover:border-black/30 dark:border-white/15 dark:bg-black dark:hover:border-white/35"
                } ${pack.highlight ? "ring-1 ring-[#0057FF]/40" : ""}`}
              >
                <p className="text-sm font-semibold text-black/70 dark:text-white/75">{pack.name}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">{currency.format(pack.totalPrice)}</p>
                <p className="mt-2 text-sm text-black/70 dark:text-white/75">{currency.format(pack.pricePerToken)} / token</p>
                <p className="mt-4 text-sm text-black/70 dark:text-white/75">{pack.tokens} base tokens</p>
                <p className="mt-2 text-sm font-semibold text-[#0057FF]">
                  + {pack.bonusTokens} bonus token{pack.bonusTokens === 1 ? "" : "s"}
                </p>
                <p className="mt-4 text-sm text-black/65 dark:text-white/70">{pack.description}</p>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-black/10 bg-white p-6 dark:border-white/20 dark:bg-black"
          >
            <div className="mb-6 flex items-center gap-2">
              <Coins className="h-4 w-4 text-[#0057FF]" />
              <h3 className="text-lg font-semibold">Token Calculator</h3>
            </div>

            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-black/55 dark:text-white/65">
              Selected Package
            </label>
            <select
              value={selectedId}
              onChange={(event) => setSelectedId(event.target.value)}
              className="w-full rounded-xl border border-black/15 px-3 py-2 text-sm outline-none ring-[#0057FF]/40 transition focus:ring-2 dark:border-white/20 dark:bg-black"
            >
              {packages.map((pack) => (
                <option key={pack.id} value={pack.id}>
                  {pack.name}
                </option>
              ))}
            </select>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-black/55 dark:text-white/65">
                <span>Bundles</span>
                <span>{bundles}</span>
              </div>
              <input
                type="range"
                min={1}
                max={6}
                value={bundles}
                onChange={(event) => setBundles(Number(event.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-black/10 accent-[#0057FF]"
              />
            </div>

            <div className="mt-8 space-y-3 rounded-2xl bg-black p-5 text-white">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/75">Total price</span>
                <span className="text-lg font-semibold">{currency.format(computed.totalPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/75">Paid tokens</span>
                <span>{computed.paidTokens}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/75">Bonus tokens</span>
                <span className="font-semibold text-[#6ea0ff]">+{computed.bonus}</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/20 pt-3 text-sm">
                <span className="text-white/75">Effective / token</span>
                <span className="font-semibold">{currency.format(computed.effectivePerToken)}</span>
              </div>
            </div>

            <a
              href="#hero"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#0057FF] bg-[#0057FF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0047d6]"
            >
              <Sparkles className="h-4 w-4" />
              Claim Discovery Call
            </a>

            <p className="mt-4 inline-flex items-start gap-2 text-xs text-black/60 dark:text-white/70">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0057FF]" />
              Free 15-minute Discovery Call includes 1 trial token to experience the method.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
