"use client";

import React, { useRef, useState } from "react";
import { GymCatalogItem, useStore } from "@/context/StoreContext";
import {
  Flame,
  Play,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export default function DualStateProgramCard({
  item,
}: {
  item: GymCatalogItem;
}) {
  const {
    addToCart,
    setActiveCameraZone,
    setActive3DAccent,
  } = useStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setActiveCameraZone(item.cameraZone);
    setActive3DAccent(item.accentColor);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Ignore autoplay block if any
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl glass-panel border border-white/10 hover:border-volt/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
    >
      {/* Top Visual Container: Dual-State (Default: Architectural Photo -> Hover: Live Action Video Clip) */}
      <div>
        <div className="relative h-64 w-full bg-obsidian overflow-hidden">
          {/* State 1: Clean Architectural Studio Shot (from GYM_REF_PICS) */}
          <img
            src={item.studioImage}
            alt={item.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? "scale-110 opacity-15" : "scale-100 opacity-90"
            }`}
          />

          {/* State 2: Live Action Workout Clip (from GYM_REF_VIDS GYM1..GYM7) */}
          <video
            ref={videoRef}
            src={item.hoverVideo}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />

          {/* Dark Gradient Bottom Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />

          {/* Top Left Dual-State Indicator Pill */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-obsidian/85 border border-white/15 text-[10px] font-mono tracking-wider text-slate-200">
            {isHovered ? (
              <>
                <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
                <span className="text-volt font-bold">{item.hoverBadge}</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-cyanLED fill-cyanLED" />
                <span>HOVER FOR LIVE 3D MOTION CLIP</span>
              </>
            )}
          </div>

          {/* Top Right Real-Time Stock Badge (Standard 1.2 & 2.1) */}
          <div className="absolute top-3 right-3">
            {item.inStock ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                IN STOCK ({item.spotsLeft} LEFT)
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/25 text-amber-300 border border-amber-400/50 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Item Out of Stock
              </span>
            )}
          </div>

          {/* Bottom Overlay Category & 3D Camera Pan Trigger */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="px-2.5 py-1 rounded-md bg-charcoal/90 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-cyanLED">
              {item.category}
            </span>
            <button
              type="button"
              onClick={() => {
                setActiveCameraZone(item.cameraZone);
                setActive3DAccent(item.accentColor);
              }}
              className="px-2.5 py-1 rounded-md bg-obsidian/90 hover:bg-volt hover:text-obsidian border border-white/15 text-[10px] font-mono text-slate-300 flex items-center gap-1 transition-colors"
            >
              <Camera className="w-3 h-3" />
              3D Zone: {item.cameraZone}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-volt flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {item.collection === "new"
                ? "NEW PROTOCOL"
                : item.collection === "best"
                ? "BEST SELLER"
                : "PRO SERIES"}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-crimson" />
              {item.metrics.intensity}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-volt transition-colors leading-snug">
            {item.name}
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            {item.subtitle}
          </p>

          <p className="text-xs text-slate-300 mt-3 leading-relaxed line-clamp-2">
            {item.description}
          </p>

          {/* Telemetry Specs Box */}
          <div className="mt-4 p-2.5 rounded-xl bg-obsidian/70 border border-white/5 grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div>
              <span className="text-slate-500 block text-[9px] uppercase">
                METABOLIC OUTPUT
              </span>
              <span className="text-slate-200 font-semibold">
                {item.metrics.caloriesBurn}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px] uppercase">
                HARDWARE SPEC
              </span>
              <span className="text-cyanLED truncate block">
                {item.metrics.equipmentSpec}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Price & Action CTA */}
      <div className="px-5 pb-5 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-400 block">
            ROUTINE / SESSION PASS
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-mono font-bold text-white">
              ${item.price}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {item.billingCycle}
            </span>
          </div>
        </div>

        {item.inStock ? (
          <button
            type="button"
            onClick={() => addToCart(item)}
            className="h-11 px-4 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs uppercase tracking-wider hover:bg-volt/90 transition-all flex items-center gap-2 shrink-0 shadow-[0_0_20px_rgba(204,255,0,0.2)]"
          >
            <ShoppingBag className="w-4 h-4" />
            Book Session
          </button>
        ) : (
          <span className="h-11 px-4 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
            Item Out of Stock
          </span>
        )}
      </div>
    </article>
  );
}
