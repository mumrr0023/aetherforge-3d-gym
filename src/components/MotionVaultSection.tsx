"use client";

import React, { useState } from "react";
import { useStore, CameraZone } from "@/context/StoreContext";
import {
  Play,
  Film,
  Zap,
  Camera,
  CheckCircle2,
  Gauge,
} from "lucide-react";

interface MotionClipSpec {
  id: string;
  code: string;
  title: string;
  athleteFocus: string;
  videoSrc: string;
  posterImg: string;
  cameraZone: CameraZone;
  accentColor: "#CCFF00" | "#00F0FF" | "#FF2A54";
  loadKg: number;
  bpm: string;
  muscleGroup: string;
  lightingNote: string;
}

const MOTION_VAULT_CLIPS: MotionClipSpec[] = [
  {
    id: "clip-1",
    code: "GYM1.MP4",
    title: "Hypoxic Mask Pushup & Pike Flow",
    athleteFocus: "O2-Restricted Calisthenics under Linear Ceiling LEDs",
    videoSrc: "/videos/gym-1-altitude-calisthenics.mp4",
    posterImg: "/images/zones/cyber-neon-alley.jpg",
    cameraZone: "altitude-lab",
    accentColor: "#00F0FF",
    loadKg: 20,
    bpm: "168 BPM",
    muscleGroup: "Pectorals, Anterior Delts & Core",
    lightingNote: "Obsidian Ceiling Grid + Cool White Linear Tubes",
  },
  {
    id: "clip-2",
    code: "GYM2.MP4",
    title: "Hardwood Mirror Speed-Rope Plyo",
    athleteFocus: "Anaerobic Footwork & Fast-Twitch Calf Rebound",
    videoSrc: "/videos/gym-2-agility-conditioning.mp4",
    posterImg: "/images/zones/functional-cardio-deck.jpg",
    cameraZone: "cyber-cardio",
    accentColor: "#CCFF00",
    loadKg: 15,
    bpm: "176 BPM",
    muscleGroup: "Gastrocnemius, Quads & Neuromuscular Rhythm",
    lightingNote: "Warm Sprung Hardwood + Acoustic Mirror Backlight",
  },
  {
    id: "clip-3",
    code: "GYM3.MP4",
    title: "Heavy Crimson Dumbbell Single-Arm Row",
    athleteFocus: "Maximum Lat Thickness & Unilateral Back Torque",
    videoSrc: "/videos/gym-3-hypertrophy-row.mp4",
    posterImg: "/images/zones/iron-forge-rack.jpg",
    cameraZone: "iron-forge",
    accentColor: "#FF2A54",
    loadKg: 50,
    bpm: "152 BPM",
    muscleGroup: "Latissimus Dorsi, Rhomboids & Rear Delts",
    lightingNote: "Matte Black Bench + Crimson Urethane Plate Contrast",
  },
  {
    id: "clip-4",
    code: "GYM4.MP4",
    title: "Chained Heavy-Bag Boxing Combinations",
    athleteFocus: "Rotational Knockout Power & Defensive Head Movement",
    videoSrc: "/videos/gym-4-combat-striking.mp4",
    posterImg: "/images/zones/hybrid-combat-hall.jpg",
    cameraZone: "combat-rig",
    accentColor: "#FF2A54",
    loadKg: 35,
    bpm: "184 BPM",
    muscleGroup: "Obliques, Serratus Anterior & Deltoid Endurance",
    lightingNote: "Raw Concrete Combat Bay + Silver Pro Gloves",
  },
  {
    id: "clip-5",
    code: "GYM5.MP4",
    title: "Acid-Green Tactical Bunker Pec-Fly",
    athleteFocus: "Constant-Tension Inner-Chest Striation & Peak Squeeze",
    videoSrc: "/videos/gym-5-pec-deck-isolation.mp4",
    posterImg: "/images/zones/iron-forge-rack.jpg",
    cameraZone: "iron-forge",
    accentColor: "#CCFF00",
    loadKg: 45,
    bpm: "148 BPM",
    muscleGroup: "Sternal Pectoralis Major & Clavicular Fibers",
    lightingNote: "Acid-Volt Tactical Overhead Tube + Crimson Tracksuit",
  },
  {
    id: "clip-6",
    code: "GYM6.MP4",
    title: "Night-Ops Linear LED Treadmill Velocity",
    athleteFocus: "Sub-Maximal Lactate Threshold & Stride Economy",
    videoSrc: "/videos/gym-6-endurance-treadmill.mp4",
    posterImg: "/images/zones/cyber-neon-alley.jpg",
    cameraZone: "cyber-cardio",
    accentColor: "#00F0FF",
    loadKg: 25,
    bpm: "172 BPM",
    muscleGroup: "Hamstrings, Glutes & VO2 Max Engine",
    lightingNote: "Synchronized Diagonal Ceiling LED Pacing Array",
  },
  {
    id: "clip-7",
    code: "GYM7.MP4",
    title: "Titan Yellow Arch Wide-Grip Pull-Up Mastery",
    athleteFocus: "3D Upper-Back Width & Scapular Depression Control",
    videoSrc: "/videos/gym-7-pullup-mastery.mp4",
    posterImg: "/images/zones/hybrid-combat-hall.jpg",
    cameraZone: "combat-rig",
    accentColor: "#CCFF00",
    loadKg: 40,
    bpm: "160 BPM",
    muscleGroup: "Teres Major, Lats & Lower Trapezius",
    lightingNote: "Powder-Coated Yellow Bridge Rig + High-Contrast Shadow",
  },
];

export default function MotionVaultSection() {
  const {
    setActiveCameraZone,
    setActive3DAccent,
    setActive3DLoadKg,
  } = useStore();

  const [selectedClip, setSelectedClip] = useState<MotionClipSpec>(
    MOTION_VAULT_CLIPS[0]
  );

  const handleSelectClip = (clip: MotionClipSpec) => {
    setSelectedClip(clip);
    setActiveCameraZone(clip.cameraZone);
    setActive3DAccent(clip.accentColor);
    setActive3DLoadKg(clip.loadKg);
  };

  return (
    <section
      id="motion-vault"
      className="scroll-mt-28 py-20 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="px-3 py-1 rounded-full bg-volt/15 border border-volt/40 text-volt text-xs font-mono uppercase tracking-widest inline-flex items-center gap-2">
              <Film className="w-3.5 h-3.5" />
              PHASE-2 INTERACTIVE TELEMETRY • ALL 7 REFERENCE CLIPS
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl tracking-wide text-white uppercase">
              LIVE 3D MOTION <span className="text-volt">TELEMETRY VAULT</span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              Select any of the 7 real-world training clips below (`GYM1.mp4`
              through `GYM7.mp4`) to inspect high-definition biomechanical form
              while simultaneously re-orienting the 3D WebGL camera, LED accent
              color, and CNC dumbbell plate load.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400 bg-charcoal/90 border border-white/10 px-4 py-2.5 rounded-xl shrink-0">
            <Camera className="w-4 h-4 text-cyanLED" />
            <span>ACTIVE 3D CAMERA ZONE:</span>
            <span className="text-volt font-bold uppercase">
              {selectedClip.cameraZone}
            </span>
          </div>
        </div>

        {/* Main Cinema Stage + 7-Clip Selector Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Featured Live Video Telemetry Stage */}
          <div className="lg:col-span-7 rounded-2xl glass-panel-volt overflow-hidden shadow-2xl">
            <div className="relative aspect-video bg-obsidian overflow-hidden">
              <video
                key={selectedClip.videoSrc}
                src={selectedClip.videoSrc}
                poster={selectedClip.posterImg}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40" />

              {/* Top Overlay Telemetry HUD */}
              <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-obsidian/90 border border-volt/50 text-volt text-xs font-mono font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
                  {selectedClip.code} • LIVE STREAM
                </span>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-obsidian/90 border border-white/15 text-xs font-mono text-crimson font-bold">
                    ♥ {selectedClip.bpm}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-obsidian/90 border border-cyanLED/40 text-xs font-mono text-cyanLED">
                    3D SYNC: {selectedClip.loadKg}KG
                  </span>
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-mono uppercase tracking-wider text-cyanLED block">
                  {selectedClip.athleteFocus}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {selectedClip.title}
                </h3>
              </div>
            </div>

            {/* Telemetry Metadata Footer */}
            <div className="p-5 bg-charcoal/95 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-obsidian/80 border border-white/5">
                <span className="text-slate-500 block text-[10px] uppercase">
                  TARGET MYOFIBRILS
                </span>
                <span className="text-white font-semibold mt-0.5 block">
                  {selectedClip.muscleGroup}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-obsidian/80 border border-white/5">
                <span className="text-slate-500 block text-[10px] uppercase">
                  ARCHITECTURAL LIGHTING
                </span>
                <span className="text-cyanLED font-semibold mt-0.5 block">
                  {selectedClip.lightingNote}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-obsidian/80 border border-white/5">
                <span className="text-slate-500 block text-[10px] uppercase">
                  3D R3F SCENE RESPONSE
                </span>
                <span className="text-volt font-semibold mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Zone & Plate Synced
                </span>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: All 7 Clips Interactive Selector Stack */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1 mb-2">
              <span className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-volt" />
                SELECT CLIP TO SYNC 3D CAMERA & LOAD
              </span>
              <span>7 / 7 ASSETS ACTIVE</span>
            </div>

            {MOTION_VAULT_CLIPS.map((clip) => {
              const isSelected = clip.id === selectedClip.id;
              return (
                <button
                  key={clip.id}
                  type="button"
                  onClick={() => handleSelectClip(clip)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-volt/15 border-volt shadow-[0_0_20px_rgba(204,255,0,0.18)]"
                      : "bg-charcoal/85 border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-bold border ${
                        isSelected
                          ? "bg-volt text-obsidian border-volt"
                          : "bg-obsidian text-slate-300 border-white/10"
                      }`}
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-obsidian text-cyanLED border border-cyanLED/30">
                          {clip.code}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {clip.bpm}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white truncate mt-1">
                        {clip.title}
                      </h4>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      3D LOAD
                    </span>
                    <span className="text-xs font-mono font-bold text-volt flex items-center justify-end gap-1">
                      <Zap className="w-3 h-3" />
                      {clip.loadKg} KG
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
