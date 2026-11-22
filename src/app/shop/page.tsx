"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useStore,
  EquipmentZoneCategory,
  CollectionType,
} from "@/context/StoreContext";
import DualStateProgramCard from "@/components/DualStateProgramCard";
import {
  Filter,
  Sparkles,
  Dumbbell,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

const CATEGORIES: ("All" | EquipmentZoneCategory)[] = [
  "All",
  "Strength & Hypertrophy",
  "Cardio & Endurance",
  "Combat & Calisthenics",
  "Supplements & Gear",
];

const COLLECTIONS: { id: CollectionType; label: string }[] = [
  { id: "all", label: "All Collections" },
  { id: "new", label: "New Protocols" },
  { id: "best", label: "Best Sellers" },
  { id: "pro", label: "Pro Series & 3D Gear" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { catalog } = useStore();

  const paramCategory = searchParams.get("category");
  const paramCollection = searchParams.get("collection") as CollectionType | null;

  const [selectedCategory, setSelectedCategory] = useState<
    "All" | EquipmentZoneCategory
  >("All");
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionType>("all");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  // Sync URL query parameters into active filter state (Required Standard 1.3)
  useEffect(() => {
    if (
      paramCategory &&
      CATEGORIES.includes(paramCategory as EquipmentZoneCategory)
    ) {
      setSelectedCategory(paramCategory as EquipmentZoneCategory);
    } else if (!paramCategory) {
      setSelectedCategory("All");
    }

    if (
      paramCollection &&
      ["all", "new", "best", "pro"].includes(paramCollection)
    ) {
      setSelectedCollection(paramCollection);
    } else if (!paramCollection) {
      setSelectedCollection("all");
    }
  }, [paramCategory, paramCollection]);

  const updateFilterUrl = (
    cat: "All" | EquipmentZoneCategory,
    col: CollectionType
  ) => {
    const params = new URLSearchParams();
    if (cat !== "All") params.set("category", cat);
    if (col !== "all") params.set("collection", col);
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  };

  // Dynamic Page Heading based on active URL query params (Standard 1.3)
  const dynamicHeading = (() => {
    if (selectedCategory !== "All" && selectedCollection !== "all") {
      const colLabel =
        COLLECTIONS.find((c) => c.id === selectedCollection)?.label || "";
      return `${selectedCategory} — ${colLabel}`;
    }
    if (selectedCategory !== "All") {
      return `${selectedCategory} Protocols & Hardware`;
    }
    if (selectedCollection === "new") {
      return "New Collection — Next-Gen 3D Training Protocols";
    }
    if (selectedCollection === "best") {
      return "Best Sellers — Most Reserved Arena Protocols";
    }
    if (selectedCollection === "pro") {
      return "Pro Series & 3D CNC Smart Dumbbell Hardware";
    }
    return "Complete 3D Training Roster & Equipment Catalog";
  })();

  const filteredItems = catalog.filter((item) => {
    const matchCat =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchCol =
      selectedCollection === "all" || item.collection === selectedCollection;
    const matchStock = !onlyInStock || item.inStock;
    return matchCat && matchCol && matchStock;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Dynamic Header Banner */}
      <div className="p-8 rounded-3xl glass-panel-volt mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-volt/15 border border-volt/40 text-volt text-xs font-mono uppercase tracking-widest inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            INTERACTIVE 3D CATALOG • DUAL-STATE PHOTO + VIDEO CARDS
          </span>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl text-white uppercase tracking-wide">
            {dynamicHeading}
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl">
            Hover any card to trigger its matched live-action training clip and
            re-aim the background 3D WebGL dumbbell rig. All stock badges and
            pricing sync in real time with the Staff Admin Portal (
            <code className="text-volt">/admin</code>).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="px-4 py-2.5 rounded-xl bg-obsidian/90 border border-white/10 text-xs font-mono text-cyanLED">
            Showing <strong>{filteredItems.length}</strong> of {catalog.length}{" "}
            Catalog Items
          </span>
          {(selectedCategory !== "All" ||
            selectedCollection !== "all" ||
            onlyInStock) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedCollection("all");
                setOnlyInStock(false);
                router.push("/shop", { scroll: false });
              }}
              className="px-4 py-2.5 rounded-xl bg-crimson/20 border border-crimson/40 text-crimson hover:bg-crimson/30 text-xs font-mono font-bold flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="p-5 rounded-2xl glass-panel border border-white/10 mb-10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5 text-volt" />
              Category:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  updateFilterUrl(cat, selectedCollection);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all border ${
                  selectedCategory === cat
                    ? "bg-volt text-obsidian border-volt font-bold shadow-[0_0_15px_rgba(204,255,0,0.25)]"
                    : "bg-obsidian/80 text-slate-300 border-white/10 hover:border-volt/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* In-Stock Toggle */}
          <button
            type="button"
            onClick={() => setOnlyInStock(!onlyInStock)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono border flex items-center gap-2 transition-all ${
              onlyInStock
                ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold"
                : "bg-obsidian/80 border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>In-Stock Only</span>
          </button>
        </div>

        {/* Collection Filter Tabs */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase text-slate-400 mr-2">
            Collection Tier:
          </span>
          {COLLECTIONS.map((col) => (
            <button
              key={col.id}
              type="button"
              onClick={() => {
                setSelectedCollection(col.id);
                updateFilterUrl(selectedCategory, col.id);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                selectedCollection === col.id
                  ? "bg-cyanLED/20 border-cyanLED text-cyanLED font-bold"
                  : "bg-obsidian/60 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Catalog Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-16 rounded-3xl glass-panel border border-white/10 text-center space-y-4">
          <Dumbbell className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-xl font-bold text-white">
            No Protocols Match Your Filter Combination
          </h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Try clearing the category or collection filter to inspect all{" "}
            {catalog.length} training protocols and 3D hardware items.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <DualStateProgramCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center font-mono text-volt">
          LOADING 3D CATALOG ROSTER...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
