"use client";

import { HeroSection } from "./HeroSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { LearningExperienceSection } from "./LearningExperienceSection";
import { WhyChooseUsSection } from "./WhyChooseUsSection";

export function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="relative">
        <HeroSection />
        <WhyChooseUsSection />
        <LearningExperienceSection />
        <HowItWorksSection />
      </main>
    </div>
  );
}
