"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dumbbell,
  ChevronDown,
  ShieldCheck,
  FileText,
  ArrowUpRight,
  Cpu,
} from "lucide-react";

export default function Footer() {
  const [openLegal, setOpenLegal] = useState<"privacy" | "terms" | null>(null);

  const toggleLegal = (panel: "privacy" | "terms") => {
    setOpenLegal((prev) => (prev === panel ? null : panel));
  };

  return (
    <footer className="relative z-10 bg-obsidian/95 border-t border-white/10 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-11 h-11 rounded-xl bg-volt/15 border border-volt/50 flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-volt" />
              </div>
              <div>
                <span className="font-display text-2xl tracking-wider text-white block leading-none">
                  AETHER<span className="text-volt">FORGE</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-cyanLED block mt-0.5">
                  TIER-3 WEBGL PERFORMANCE ARENA
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Engineered on Next.js App Router, React Three Fiber (R3F), and
              Three.js. Combining a live 60FPS 3D CNC Smart Dumbbell
              configurator with 4 architectural sectors and 7 high-intensity
              motion telemetry loops.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 pt-1">
              <span className="px-3 py-1 rounded-full bg-charcoal border border-white/10 flex items-center gap-1.5 text-volt">
                <Cpu className="w-3.5 h-3.5" />
                R3F + Three.js WebGL
              </span>
              <span className="px-3 py-1 rounded-full bg-charcoal border border-white/10 text-cyanLED">
                DPR 1.5 Mobile Cap
              </span>
              <span className="px-3 py-1 rounded-full bg-charcoal border border-white/10 text-slate-300">
                2D Slideshow Fallback
              </span>
            </div>
          </div>

          {/* Col 2: Categories & Collections (Deep-linking to /shop?category=... & /shop?collection=...) */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-volt font-bold mb-4">
              Categories & Collections
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/shop?category=Strength+%26+Hypertrophy"
                  className="hover:text-volt transition-colors flex items-center justify-between group"
                >
                  <span>Strength & Hypertrophy</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-volt transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Cardio+%26+Endurance"
                  className="hover:text-volt transition-colors flex items-center justify-between group"
                >
                  <span>Cardio & Endurance</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-volt transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Combat+%26+Calisthenics"
                  className="hover:text-volt transition-colors flex items-center justify-between group"
                >
                  <span>Combat & Calisthenics</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-volt transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Supplements+%26+Gear"
                  className="hover:text-volt transition-colors flex items-center justify-between group"
                >
                  <span>3D Smart Gear & Hardware</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-volt transition-opacity" />
                </Link>
              </li>
              <li className="pt-2 border-t border-white/10">
                <Link
                  href="/shop?collection=new"
                  className="text-cyanLED hover:text-volt transition-colors font-mono text-xs"
                >
                  → New Collection Protocols
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?collection=best"
                  className="text-volt hover:underline transition-colors font-mono text-xs"
                >
                  → Best Sellers Roster
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Arena Deep-Links (Standard 1.3 exact #id targets) */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-volt font-bold mb-4">
              Book, Routines & Offers
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/#select-trainers"
                  className="hover:text-volt transition-colors"
                >
                  Select From Our Trainers
                </Link>
              </li>
              <li>
                <Link
                  href="/#choose-routine"
                  className="hover:text-volt transition-colors"
                >
                  Choose Your Routine
                </Link>
              </li>
              <li>
                <Link
                  href="/#avail-offers"
                  className="hover:text-volt transition-colors"
                >
                  Avail Our Special Offers
                </Link>
              </li>
              <li>
                <Link
                  href="/#free-online-classes"
                  className="text-cyanLED hover:text-volt transition-colors"
                >
                  Free Online Home Basic Demo Classes
                </Link>
              </li>
              <li>
                <Link
                  href="/#our-story"
                  className="hover:text-volt transition-colors"
                >
                  Our Story & Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/#key-features"
                  className="hover:text-volt transition-colors"
                >
                  Key Biomechanical Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#perks"
                  className="hover:text-volt transition-colors"
                >
                  Member Perks & Guarantees
                </Link>
              </li>
              <li>
                <Link
                  href="/#store-locations"
                  className="hover:text-volt transition-colors"
                >
                  Physical Sectors & Hours
                </Link>
              </li>
              <li>
                <Link
                  href="/#whatsapp"
                  className="hover:text-volt transition-colors"
                >
                  WhatsApp VIP Concierge
                </Link>
              </li>
              <li>
                <Link
                  href="/#book-eye-exam"
                  className="text-volt font-semibold hover:underline transition-colors"
                >
                  Book Your Training Session
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Portals & Account */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-volt font-bold mb-4">
              Member & Staff Portals
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/profile"
                  className="hover:text-cyanLED transition-colors"
                >
                  Member Profile Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/profile?tab=orders"
                  className="hover:text-cyanLED transition-colors"
                >
                  View All Orders & Passes
                </Link>
              </li>
              <li>
                <Link
                  href="/profile?tab=addresses"
                  className="hover:text-cyanLED transition-colors"
                >
                  Manage Delivery Addresses
                </Link>
              </li>
              <li>
                <Link
                  href="/profile?tab=payment"
                  className="hover:text-cyanLED transition-colors"
                >
                  Saved Payment Methods
                </Link>
              </li>
              <li className="pt-2 border-t border-white/10">
                <Link
                  href="/admin"
                  className="text-crimson hover:text-volt transition-colors font-mono text-xs font-bold"
                >
                  ⚡ Staff Operations Portal (/admin)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Legal Links Accordion (Privacy Policy & Terms of Service per Required Standard 1.3) */}
        <div className="pt-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-slate-400 font-mono">
              © {new Date().getFullYear()} AETHERFORGE 3D PERFORMANCE LABS. ALL
              RIGHTS RESERVED.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                aria-expanded={openLegal === "privacy"}
                onClick={() => toggleLegal("privacy")}
                className={`px-4 py-2 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all ${
                  openLegal === "privacy"
                    ? "bg-volt/15 border-volt text-volt font-bold"
                    : "bg-charcoal border-white/10 text-slate-300 hover:border-volt/40"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Privacy Policy</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    openLegal === "privacy" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <button
                type="button"
                aria-expanded={openLegal === "terms"}
                onClick={() => toggleLegal("terms")}
                className={`px-4 py-2 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all ${
                  openLegal === "terms"
                    ? "bg-cyanLED/15 border-cyanLED text-cyanLED font-bold"
                    : "bg-charcoal border-white/10 text-slate-300 hover:border-cyanLED/40"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Terms of Service</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    openLegal === "terms" ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {openLegal === "privacy" && (
              <motion.div
                key="privacy-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="overflow-hidden"
              >
                <div className="p-6 rounded-2xl bg-charcoal/95 border border-volt/30 text-xs text-slate-300 space-y-3 leading-relaxed">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-volt font-mono uppercase">
                      AetherForge Biometric & Digital Privacy Policy (Rev. 2026)
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      ZERO THIRD-PARTY TRACKING
                    </span>
                  </div>
                  <p>
                    <strong>1. Local Telemetry & Storage:</strong> All training
                    pass reservations, 3D equipment customizations, and profile
                    settings in this showcase are stored locally in your browser
                    via encrypted-ready state persistence (`localStorage`) and
                    are never sold or transmitted to external ad brokers.
                  </p>
                  <p>
                    <strong>2. Biometric & VO2 Assessment Data:</strong> In-gym
                    hypoxic calisthenics telemetry, heart-rate variability
                    (HRV), and 3D postural scan metrics collected during physical
                    assessments remain under your exclusive member control and
                    can be purged at any time via your Member Profile dashboard.
                  </p>
                  <p>
                    <strong>3. Security Hardening:</strong> Built in strict
                    compliance with the Universal Security & `.gitignore`
                    Playbook—zero hardcoded API keys, zero exposed client dumps,
                    and privacy-first dummy concierge endpoints for public demos.
                  </p>
                </div>
              </motion.div>
            )}

            {openLegal === "terms" && (
              <motion.div
                key="terms-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="overflow-hidden"
              >
                <div className="p-6 rounded-2xl bg-charcoal/95 border border-cyanLED/30 text-xs text-slate-300 space-y-3 leading-relaxed">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-cyanLED font-mono uppercase">
                      Terms of Service & Facility Safety Protocol
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      TIER-3 ARENA STANDARD
                    </span>
                  </div>
                  <p>
                    <strong>1. Facility Access & Conduct:</strong> Membership
                    grants 24/7 biometric access to our 4 specialized training
                    sectors (Iron Forge Monolith, Cyber Neon Alley, Kinetic
                    Hardwood Deck, and Apex Combat Hall). High-altitude hypoxic
                    masks and heavy-bag sessions require an initial coach
                    orientation.
                  </p>
                  <p>
                    <strong>2. 7-Day Pause & Freeze Guarantee:</strong> Members
                    may freeze or transfer their active monthly protocol with
                    zero penalty up to twice per calendar quarter.
                  </p>
                  <p>
                    <strong>3. Commercial Hardware Warranty:</strong> All
                    AetherForge 3D CNC Smart Dumbbells carry a lifetime
                    structural guarantee on 190,000 PSI steel handles and
                    laser-etched urethane weight plates.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </footer>
  );
}
