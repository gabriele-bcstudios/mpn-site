"use client";

import { HeroSection } from "./HeroSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { PricingSection } from "./PricingSection";

export function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="relative">
        <HeroSection />
        <PricingSection />
        <HowItWorksSection />
      </main>
    </div>
  );
}
