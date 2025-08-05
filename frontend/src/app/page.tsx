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
      {/* Hero Section with full-width background */}
      <div className="relative w-full min-h-[90vh]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/demo5.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay to blend with yellow background */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(255, 249, 229, 0.3), #FFF9E5 100%)`,
            }}
          ></div>
        </div>
        <div className="relative z-10">
          <NavBar />
          <div className="pt-2 ">
            <div className="max-w-6xl mx-auto px-4">
              <HeroSection />
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the content */}
      <div className="pt-6 pb-6">
        <div className="max-w-6xl mx-auto px-4">
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
