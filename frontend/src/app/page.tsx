"use client";

import NavBar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import JournalEntryPreview from "@/components/JournalEntryPreview";
import DashboardPreview from "@/components/DashboardPreview";
import WhyChainDiary from "@/components/WhyChainDiary";
import SocialProof from "@/components/SocialProof";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF9E5" }}>
      <NavBar />
      <div className="pt-10 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <HeroSection />
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            <JournalEntryPreview />
            <DashboardPreview />
          </div>
          <WhyChainDiary />
          <SocialProof />
          <WaitlistSection />
          <Footer />
        </div>
      </div>
    </div>
  );
}
