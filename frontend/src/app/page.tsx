"use client";

import type React from "react";
import { useState } from "react";
import {
  Star,
  Github,
  ExternalLink,
  Mail,
  Zap,
  Shield,
  Globe,
  Lock,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import NavBar from "@/components/Navbar";
import Link from "next/link";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - replace with actual implementation
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(
        "Thanks for joining! We'll notify you when ChainDiary hits mainnet."
      );
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF9E5" }}>
      <NavBar />
      {/* Main Content */}
      <div className="pt-10 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Section */}
          <section className="relative w-full min-h-[90vh] flex items-center justify-center text-center px-6">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                Journl.fun
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                Your Moods, Secured on{" "}
                <span className="font-semibold">Solana</span>
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-8">
                From awesome to terrible, your moods now have a ledger.
                Revolutionary web3 journaling with immutable memories.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {/* Product Hunt Badge */}
                <a
                  href="https://www.producthunt.com/products/chaindiary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-900 rounded-md bg-white hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                >
                  <div className="w-6 h-6 bg-[#FF6154] rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PH</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    Featured on Product Hunt
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* GitHub Stars Badge */}
                <a
                  href="https://github.com/sudosuanjal/solana-journal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-900 rounded-md bg-white hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                >
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <Github className="w-4 h-4" />
                  <span className="font-medium text-gray-900">
                    Star on GitHub
                  </span>
                </a>
              </div>

              {/* CTA Button */}
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-md text-lg border-2 border-gray-900 transition-all duration-200 hover:scale-105"
              >
                Start Journaling on Web3
                <ArrowRight className="w-5 h-5" />
              </Link>

              {/* Metrics */}
              <div className="mt-6 flex justify-center gap-6 text-sm text-gray-700">
                <div>🧠 100+ Web3 Journalers</div>
                <div>📄 1000+ Entries Secured</div>
                <div>⚡ Built on Solana</div>
              </div>
            </div>
          </section>

          {/* App Preview Section */}
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {/* Journal Entry Form Preview */}
            <div className="lg:col-span-1 bg-white border-2 border-gray-900 rounded-md p-6">
              <h3 className=" text-xl font-bold text-gray-900 mb-6">
                Write Your Entry
              </h3>

              {/* Mood Selection Preview */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Awesome mood */}
                <div
                  className="rounded-md p-4 border-2 flex items-center justify-center row-span-2 cursor-pointer hover:scale-105 transition-all duration-200"
                  style={{
                    backgroundColor: "#F8F8FF",
                    borderColor: "#CAC9CD",
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-4xl mb-4">😊</div>
                    <span
                      className="text-base font-medium"
                      style={{ color: "#3E3B39" }}
                    >
                      Awesome
                    </span>
                  </div>
                </div>

                {/* Other moods */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      emoji: "😄",
                      label: "Happy",
                      bg: "#CAC9CD",
                      text: "#3E3B39",
                      border: "#9B9A9C",
                    },
                    {
                      emoji: "😐",
                      label: "Okay",
                      bg: "#9B9A9C",
                      text: "#F8F8FF",
                      border: "#6D6A6A",
                    },
                    {
                      emoji: "😢",
                      label: "Bad",
                      bg: "#6D6A6A",
                      text: "#F8F8FF",
                      border: "#3E3B39",
                    },
                    {
                      emoji: "😭",
                      label: "Terrible",
                      bg: "#3E3B39",
                      text: "#F8F8FF",
                      border: "#6D6A6A",
                    },
                  ].map((mood, i) => (
                    <div
                      key={i}
                      className="rounded-md p-3 border-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
                      style={{
                        backgroundColor: mood.bg,
                        borderColor: mood.border,
                      }}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-2xl mb-1">{mood.emoji}</div>
                        <span
                          className="text-xs font-medium"
                          style={{ color: mood.text }}
                        >
                          {mood.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input Fields Preview */}
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Enter title..."
                  className="w-full bg-white rounded-md p-4 text-gray-800 outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-500 border-2 border-gray-200 focus:border-gray-900 transition-colors"
                  disabled
                />
                <textarea
                  placeholder="Today was amazing! Finally deployed my first dApp on Solana..."
                  className="w-full bg-white rounded-md p-4 text-gray-800 outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-500 resize-none border-2 border-gray-200 focus:border-gray-900 transition-colors h-24"
                  disabled
                />
              </div>

              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 rounded-md text-base border-2 border-gray-900 transition-colors">
                Submit Journal
              </button>
            </div>

            {/* Dashboard Preview */}
            <div className="lg:col-span-2 bg-white border-2 border-gray-900 rounded-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Your Journal History
              </h3>

              <div className="space-y-4">
                {[
                  {
                    date: "Dec 23, 2024",
                    title: "First Solana dApp deployed!",
                    message:
                      "Today was incredible! I finally deployed my first decentralized application on Solana. The feeling of seeing my code running on the blockchain is indescribable...",
                    mood: {
                      emoji: "😊",
                      label: "Awesome",
                      bg: "#F8F8FF",
                      text: "#3E3B39",
                      border: "#CAC9CD",
                    },
                  },
                  {
                    date: "Dec 22, 2024",
                    title: "Learning Rust for Solana",
                    message:
                      "Spent the day diving deep into Rust programming. It's challenging but I can see why it's perfect for blockchain development...",
                    mood: {
                      emoji: "😄",
                      label: "Happy",
                      bg: "#CAC9CD",
                      text: "#3E3B39",
                      border: "#9B9A9C",
                    },
                  },
                  {
                    date: "Dec 21, 2024",
                    title: "Debugging smart contracts",
                    message:
                      "Hit some roadblocks with my smart contract logic today. Debugging on blockchain is different but I'm learning...",
                    mood: {
                      emoji: "😐",
                      label: "Okay",
                      bg: "#9B9A9C",
                      text: "#F8F8FF",
                      border: "#6D6A6A",
                    },
                  },
                ].map((entry, i) => (
                  <div
                    key={i}
                    className="rounded-md border-2 p-4 transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      backgroundColor: entry.mood.bg,
                      borderColor: entry.mood.border,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex items-center gap-2 rounded-md px-3 py-1.5 border text-xs"
                          style={{
                            backgroundColor: entry.mood.text,
                            borderColor: entry.mood.border,
                          }}
                        >
                          <span
                            className="font-medium"
                            style={{ color: entry.mood.bg }}
                          >
                            {entry.date}
                          </span>
                        </div>
                        <div
                          className="flex items-center gap-2 rounded-md px-3 py-1.5 border text-xs"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.25)",
                            borderColor: entry.mood.border,
                          }}
                        >
                          <span>{entry.mood.emoji}</span>
                          <span
                            className="font-medium"
                            style={{ color: entry.mood.text }}
                          >
                            {entry.mood.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h4
                      className="font-bold text-lg mb-2"
                      style={{ color: entry.mood.text }}
                    >
                      {entry.title}
                    </h4>
                    <p
                      className="text-sm opacity-75"
                      style={{ color: entry.mood.text }}
                    >
                      {entry.message.substring(0, 120)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Blockchain Matters Section */}
          <div className="bg-white border-2 border-gray-900 rounded-md p-8 mb-16">
            <h2 className=" text-3xl font-bold text-gray-900 text-center mb-8">
              Why ChainDiary Matters in Web3
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 border-2 border-gray-900 rounded-md flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Immutable & Secure
                </h3>
                <p className="text-sm text-gray-600">
                  Your journal entries are cryptographically protected and
                  securely stored"
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 border-2 border-gray-900 rounded-md flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  You Own Your Data
                </h3>
                <p className="text-sm text-gray-600">
                  No centralized servers. Your wallet, your data, your control
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 border-2 border-gray-900 rounded-md flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Solana Speed
                </h3>
                <p className="text-sm text-gray-600">
                  Fast, low-cost transactions make journaling seamless and
                  affordable
                </p>
              </div>
            </div>

            <div className="bg-gray-50 border-2 border-gray-900 rounded-md p-6">
              <p className="text-gray-900 leading-relaxed font-[kalam]">
                ChainDiary pioneers personal journaling in the decentralized era
                by leveraging Solana's high-performance blockchain. Unlike
                traditional journal apps that store your intimate thoughts on
                centralized servers, ChainDiary ensures your entries are
                securely recorded, providing a verifiable history of your
                thoughts that only you control through your Solana wallet. With
                Solana's scalability and eco-friendly consensus, you can journal
                daily without worrying about high fees or slow transactions.
                This creates a lifelong record of your thoughts and emotions,
                where every change is transparently logged, perfect for web3
                enthusiasts and privacy-conscious users who value true data
                ownership.
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 bg-white border-2 border-gray-900 rounded-md px-6 py-4">
              <Globe className="w-6 h-6 text-gray-900" />
              <span className="font-semibold text-gray-900">
                Join 100+ users journaling on Solana
              </span>
            </div>
          </div>

          {/* Waitlist Section */}
          <div className="bg-white border-2 border-gray-900 rounded-md p-8 text-center">
            <h2 className=" text-2xl font-bold text-gray-900 mb-4">
              Ready for Mainnet?
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Be the first to know when ChainDiary launches on Solana mainnet.
              Join our waitlist for exclusive updates.
            </p>

            <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for mainnet updates"
                    className="w-full px-4 py-3 border-2 border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gray-900 text-white px-6 py-3 border-2 border-gray-900 rounded-md font-semibold hover:bg-gray-800 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                  Join Waitlist
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t-2 border-gray-900">
            <p className="text-gray-600 text-sm mb-4">
              Built with ❤️ on Solana • Open Source • Privacy First
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/sudosuanjal/solana-journal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://www.producthunt.com/products/chaindiary"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Product Hunt
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
