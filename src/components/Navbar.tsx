"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  ShoppingBag,
  User,
  ShieldAlert,
  Dumbbell,
  X,
  Menu,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Cpu,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

const POPULAR_SEARCH_PILLS = [
  { label: "Book Free Online Home Demo", query: "Hypoxic", inStockHint: true },
  { label: "Dumbbell Row Routine", query: "Dumbbell", inStockHint: true },
  { label: "Tactical Pec-Fly (Out of Stock)", query: "Tactical Bunker", inStockHint: false },
  { label: "Heavy Bag Session", query: "Heavy-Bag", inStockHint: true },
  { label: "Cardio Routine & Offers", query: "Treadmill", inStockHint: true },
  { label: "Pull-Up Trainer Routine", query: "Titan Yellow", inStockHint: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const {
    catalog,
    cart,
    isSearchOpen,
    setIsSearchOpen,
    isCartOpen,
    setIsCartOpen,
    isLowPower3D,
    setIsLowPower3D,
    addToCart,
    removeFromCart,
    updateCartQty,
    checkoutCart,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkoutSuccessId, setCheckoutSuccessId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search input when search drawer slides open (Required Standard 1.2)
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  const totalCartItems = cart.reduce((acc, entry) => acc + entry.quantity, 0);
  const totalCartPrice = cart.reduce(
    (acc, entry) => acc + entry.item.price * entry.quantity,
    0
  );

  // Filter catalog items based on query
  const trimmedQuery = searchQuery.trim().toLowerCase();
  const matchedItems = trimmedQuery
    ? catalog.filter(
        (item) =>
          item.name.toLowerCase().includes(trimmedQuery) ||
          item.subtitle.toLowerCase().includes(trimmedQuery) ||
          item.category.toLowerCase().includes(trimmedQuery) ||
          item.hoverBadge.toLowerCase().includes(trimmedQuery)
      )
    : catalog;

  const hasOutOfStockMatch =
    trimmedQuery.length > 0 && matchedItems.some((item) => !item.inStock);

  const handleCheckout = () => {
    const order = checkoutCart();
    if (order) {
      setCheckoutSuccessId(order.id);
      setTimeout(() => {
        setCheckoutSuccessId(null);
      }, 6000);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-white/10">
        <nav
          aria-label="Primary Navigation"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4"
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0 focus:outline-none"
          >
            <div className="w-11 h-11 rounded-xl bg-volt/15 border border-volt/50 flex items-center justify-center group-hover:bg-volt group-hover:text-obsidian transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.2)]">
              <Dumbbell className="w-6 h-6 text-volt group-hover:text-obsidian transition-colors" />
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl tracking-wider text-white block leading-none">
                AETHER<span className="text-volt">FORGE</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-cyanLED block mt-0.5">
                3D PERFORMANCE ARENA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Deep-Links (Required Standard 1.3) */}
          <div className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-300">
            <Link
              href="/#hero-3d"
              className="hover:text-volt transition-colors py-1"
            >
              Book Training
            </Link>
            <Link
              href="/#select-trainers"
              className="hover:text-volt transition-colors py-1"
            >
              Select Trainers
            </Link>
            <Link
              href="/#choose-routine"
              className="hover:text-volt transition-colors py-1"
            >
              Choose Routine
            </Link>
            <Link
              href="/#avail-offers"
              className="hover:text-volt transition-colors py-1"
            >
              Avail Offers
            </Link>
            <Link
              href="/#free-online-classes"
              className="text-cyanLED hover:text-volt transition-colors py-1 font-mono text-xs uppercase tracking-wider"
            >
              Free Home Classes
            </Link>
            <Link
              href="/shop"
              className={`hover:text-volt transition-colors py-1 ${
                pathname === "/shop" ? "text-volt font-semibold" : ""
              }`}
            >
              All Routines
            </Link>
            <Link
              href="/#book-eye-exam"
              className="hover:text-volt transition-colors py-1"
            >
              Book Session
            </Link>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* 3D / 2D Performance Mode Toggle (ReferenceEfficient3DWebsite.md Section 3.5) */}
            <button
              type="button"
              onClick={() => setIsLowPower3D(!isLowPower3D)}
              title="Toggle 3D WebGL / 2D Low-Power Fallback"
              className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono border transition-all ${
                !isLowPower3D
                  ? "bg-volt/10 border-volt/40 text-volt hover:bg-volt/20"
                  : "bg-steel/60 border-white/15 text-slate-300 hover:border-white/30"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{!isLowPower3D ? "3D WebGL: ON" : "2D SAVER: ON"}</span>
            </button>

            {/* Interactive Search Drawer Trigger (Standard 1.2: NEVER redirects to /shop) */}
            <button
              type="button"
              aria-label="Open interactive catalog search drawer"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`h-11 px-3.5 rounded-xl border flex items-center gap-2 transition-all shrink-0 ${
                isSearchOpen
                  ? "bg-volt text-obsidian border-volt font-semibold"
                  : "bg-charcoal/90 border-white/10 text-slate-200 hover:border-volt/50 hover:text-volt"
              }`}
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-mono uppercase tracking-wider">
                Search
              </span>
            </button>

            {/* Member Profile Dashboard Link */}
            <Link
              href="/profile"
              aria-label="Member Profile & Bookings Dashboard"
              className={`h-11 px-3.5 rounded-xl border flex items-center gap-2 transition-all shrink-0 ${
                pathname === "/profile"
                  ? "bg-cyanLED/20 border-cyanLED text-cyanLED font-semibold"
                  : "bg-charcoal/90 border-white/10 text-slate-200 hover:border-cyanLED/50 hover:text-cyanLED"
              }`}
            >
              <User className="w-4 h-4" />
              <span className="hidden lg:inline text-xs font-mono uppercase tracking-wider">
                Member
              </span>
            </Link>

            {/* Staff Admin Portal Link (/admin per Standard 2.2) */}
            <Link
              href="/admin"
              aria-label="Staff Operations & Inventory Admin Portal"
              className={`h-11 px-3.5 rounded-xl border flex items-center gap-2 transition-all shrink-0 ${
                pathname === "/admin"
                  ? "bg-crimson/20 border-crimson text-crimson font-semibold"
                  : "bg-charcoal/90 border-white/10 text-slate-200 hover:border-crimson/50 hover:text-crimson"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span className="hidden lg:inline text-xs font-mono uppercase tracking-wider">
                Admin
              </span>
            </Link>

            {/* Cart / Pass Bag Trigger */}
            <button
              type="button"
              aria-label="Open training pass and equipment bag"
              onClick={() => setIsCartOpen(true)}
              className="relative h-11 px-3.5 rounded-xl bg-volt text-obsidian font-semibold flex items-center gap-2 hover:bg-volt/90 transition-all shrink-0 shadow-[0_0_20px_rgba(204,255,0,0.25)]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-mono font-bold">
                {totalCartItems}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label="Toggle mobile navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden h-11 w-11 rounded-xl bg-charcoal border border-white/10 flex items-center justify-center text-slate-200 hover:text-volt"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="xl:hidden bg-obsidian/95 border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-5 flex flex-col gap-3 text-sm font-medium text-slate-200">
                <Link
                  href="/#hero-3d"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-volt"
                >
                  Book Your Training & 3D Configurator
                </Link>
                <Link
                  href="/#select-trainers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-volt"
                >
                  Select From Our Trainers
                </Link>
                <Link
                  href="/#choose-routine"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-volt"
                >
                  Choose Your Routine (Interactive Planner)
                </Link>
                <Link
                  href="/#avail-offers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-volt"
                >
                  Avail Our Exclusive Offers
                </Link>
                <Link
                  href="/#free-online-classes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg bg-cyanLED/10 text-cyanLED hover:bg-cyanLED/20"
                >
                  Free Online Home Basic Demo Fitness Classes
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-volt"
                >
                  All Routines, Sessions & 3D Gear (/shop)
                </Link>
                <Link
                  href="/#book-eye-exam"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-white/5 hover:text-volt"
                >
                  Book Your Session & WhatsApp Concierge
                </Link>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Rendering Engine Mode:
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsLowPower3D(!isLowPower3D)}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-volt/15 border border-volt/40 text-volt"
                  >
                    {!isLowPower3D ? "3D WebGL Active" : "2D Fallback Active"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Search Drawer (Strictly following Standard 1.2 layout & feedback states) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="bg-obsidian/98 border-t border-b border-volt/30 shadow-2xl max-h-[82vh] overflow-y-auto"
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
                {/* STRICT FORM LAYOUT FROM WEB_DESIGN_LESSONS_AND_STANDARDS.md Section 1.2:
                    Wrap ONLY <Search /> icon and <input> inside <div className="relative flex-1 flex items-center">
                    and make Clear and Close explicit full-height flex sibling buttons (h-12 px-6 shrink-0 flex items-center justify-center)
                    inside <form className="flex items-stretch gap-3"> */}
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex items-stretch gap-3"
                >
                  <div className="relative flex-1 flex items-center">
                    <Search className="w-5 h-5 text-volt absolute left-4 pointer-events-none" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search programs, 3D dumbbells, hypoxic calisthenics, heavy bag, or zones..."
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-charcoal border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-volt transition-colors"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      searchInputRef.current?.focus();
                    }}
                    className="h-12 px-6 shrink-0 flex items-center justify-center rounded-xl bg-steel/80 hover:bg-steel text-slate-200 hover:text-white text-xs font-mono uppercase tracking-wider border border-white/10 transition-colors"
                  >
                    Clear
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="h-12 px-6 shrink-0 flex items-center justify-center rounded-xl bg-crimson/20 hover:bg-crimson/30 text-crimson text-xs font-mono uppercase tracking-wider border border-crimson/40 transition-colors"
                  >
                    Close
                  </button>
                </form>

                {/* Clickable Popular Search Pills (covering both in-stock and out-of-stock items for instant one-click testing) */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mr-1">
                    <Sparkles className="w-3.5 h-3.5 text-volt" />
                    Popular Searches:
                  </span>
                  {POPULAR_SEARCH_PILLS.map((pill) => (
                    <button
                      key={pill.label}
                      type="button"
                      onClick={() => setSearchQuery(pill.query)}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
                        searchQuery.toLowerCase() === pill.query.toLowerCase()
                          ? "bg-volt text-obsidian border-volt font-bold"
                          : pill.inStockHint
                          ? "bg-charcoal/90 text-slate-300 border-white/10 hover:border-volt/50 hover:text-volt"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/30 hover:border-amber-400"
                      }`}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>

                {/* Distinct Feedback States per Required Standard 1.2 */}
                <div className="mt-6">
                  {/* State A: "Search Doesn't Exist" when no catalog item matches the query */}
                  {trimmedQuery.length > 0 && matchedItems.length === 0 && (
                    <div className="p-8 rounded-2xl bg-charcoal/90 border border-crimson/40 text-center">
                      <AlertTriangle className="w-10 h-10 text-crimson mx-auto mb-3" />
                      <h3 className="text-lg font-bold text-white">
                        Search Doesn&apos;t Exist
                      </h3>
                      <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                        No training protocol, 3D equipment model, or facility zone matched{" "}
                        <span className="text-white font-mono">
                          &quot;{searchQuery}&quot;
                        </span>
                        . Try clicking one of the Popular Search pills above.
                      </p>
                    </div>
                  )}

                  {/* State B: "Item Out of Stock" warning banner when a matching product has inStock: false */}
                  {hasOutOfStockMatch && (
                    <div className="mb-4 p-4 rounded-xl bg-amber-500/15 border border-amber-400/50 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                        <div>
                          <span className="text-xs font-mono uppercase tracking-wider font-bold text-amber-300 block">
                            Item Out of Stock
                          </span>
                          <p className="text-xs text-amber-200/90">
                            One or more matching programs/suites are currently at full capacity. You can toggle availability live in the{" "}
                            <Link
                              href="/admin"
                              onClick={() => setIsSearchOpen(false)}
                              className="underline font-semibold text-white hover:text-volt"
                            >
                              Staff Admin Portal (/admin)
                            </Link>
                            .
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold shrink-0">
                        Item Out of Stock
                      </span>
                    </div>
                  )}

                  {/* Matched Catalog Results Grid */}
                  {matchedItems.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {matchedItems.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-xl bg-charcoal/90 border border-white/10 hover:border-volt/40 transition-all flex flex-col justify-between gap-3"
                        >
                          <div>
                            <div className="relative h-32 rounded-lg overflow-hidden mb-3 bg-obsidian">
                              <img
                                src={item.studioImage}
                                alt={item.name}
                                className="w-full h-full object-cover opacity-85"
                              />
                              <div className="absolute top-2 right-2">
                                {item.inStock ? (
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                    IN STOCK • {item.spotsLeft} SPOTS
                                  </span>
                                ) : (
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/25 text-amber-300 border border-amber-400/50">
                                    Item Out of Stock
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-cyanLED">
                              {item.category}
                            </span>
                            <h4 className="text-sm font-bold text-white line-clamp-1 mt-0.5">
                              {item.name}
                            </h4>
                            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                              {item.subtitle}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                            <span className="text-sm font-mono font-bold text-volt">
                              ${item.price}
                              <span className="text-[10px] text-slate-400 font-normal ml-1">
                                {item.billingCycle}
                              </span>
                            </span>
                            {item.inStock ? (
                              <button
                                type="button"
                                onClick={() => {
                                  addToCart(item);
                                  setIsSearchOpen(false);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-volt text-obsidian text-xs font-mono font-bold hover:bg-volt/90 transition-colors"
                              >
                                + Reserve
                              </button>
                            ) : (
                              <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px] font-mono">
                                Item Out of Stock
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <span>
                      Showing {Math.min(matchedItems.length, 4)} of{" "}
                      {matchedItems.length} matching items
                    </span>
                    <Link
                      href="/shop"
                      onClick={() => setIsSearchOpen(false)}
                      className="text-volt hover:underline font-mono flex items-center gap-1"
                    >
                      Explore Full Interactive Catalog (/shop)
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Slide-Over Cart / Membership Pass Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              aria-label="Training Pass & Gear Cart"
              className="relative z-10 w-full max-w-md bg-charcoal border-l border-white/15 h-full flex flex-col justify-between p-6 overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-5 h-5 text-volt" />
                    <h2 className="text-lg font-bold text-white tracking-wide">
                      ACTIVE TRAINING ROSTER & GEAR
                    </h2>
                  </div>
                  <button
                    type="button"
                    aria-label="Close bag drawer"
                    onClick={() => setIsCartOpen(false)}
                    className="h-9 w-9 rounded-lg bg-steel/70 text-slate-300 hover:text-white flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {checkoutSuccessId && (
                  <div className="mt-4 p-4 rounded-xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-200 text-xs">
                    <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Booking Confirmed! Order #{checkoutSuccessId}
                    </div>
                    <p>
                      Your training pass & equipment reservation is now live in{" "}
                      <Link
                        href="/profile"
                        onClick={() => setIsCartOpen(false)}
                        className="underline text-white font-semibold"
                      >
                        Member Profile (/profile)
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/admin"
                        onClick={() => setIsCartOpen(false)}
                        className="underline text-white font-semibold"
                      >
                        Staff Admin (/admin)
                      </Link>
                      .
                    </p>
                  </div>
                )}

                {cart.length === 0 ? (
                  <div className="py-16 text-center">
                    <Dumbbell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-300 font-semibold">
                      Your roster bag is empty
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Select any 3D training protocol or commercial dumbbell set to reserve.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 space-y-3">
                    {cart.map(({ item, quantity }) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-obsidian/90 border border-white/10 flex gap-3.5"
                      >
                        <img
                          src={item.studioImage}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-cyanLED font-mono mt-0.5">
                            ${item.price} {item.billingCycle}
                          </p>
                          <div className="mt-2.5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() => updateCartQty(item.id, -1)}
                                className="w-7 h-7 rounded-md bg-steel flex items-center justify-center text-slate-200 hover:bg-volt hover:text-obsidian"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-mono font-bold text-white px-1">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => updateCartQty(item.id, 1)}
                                className="w-7 h-7 rounded-md bg-steel flex items-center justify-center text-slate-200 hover:bg-volt hover:text-obsidian"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <button
                              type="button"
                              aria-label="Remove item"
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-500 hover:text-crimson transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-mono">
                      TOTAL COMMITMENT
                    </span>
                    <span className="text-xl font-mono font-bold text-volt">
                      ${totalCartPrice}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-sm uppercase tracking-wider hover:bg-volt/90 transition-all shadow-[0_0_25px_rgba(204,255,0,0.3)]"
                  >
                    Confirm Instant Pass & Order
                  </button>
                </div>
              )}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
