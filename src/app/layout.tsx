import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GymScene3D from "@/components/3d/GymScene3D";

export const metadata: Metadata = {
  title: "AETHERFORGE 3D • Tier-3 WebGL Performance Gym & Biomechanics Lab",
  description:
    "Immersive 3D WebGL Gym & Performance Arena built with Next.js App Router, React Three Fiber (R3F), Three.js, and Dual-State Live Motion Telemetry.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth dark"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-obsidian text-slate-100 antialiased selection:bg-volt selection:text-obsidian">
        <StoreProvider>
          {/* Fixed Fullscreen 3D WebGL Canvas + Dynamic 2D AnimatePresence Slideshow Layer (Blueprint_3D.md Section 3) */}
          <GymScene3D />

          {/* Scrollable 2D Tailwind UI Overlay Layer */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
