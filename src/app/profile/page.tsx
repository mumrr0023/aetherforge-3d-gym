"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  CheckCircle2,
  ChevronDown,
  Plus,
  Trash2,
  Star,
  Dumbbell,
  ArrowRight,
} from "lucide-react";

type ProfileTab = "profile" | "orders" | "addresses" | "payment";

function ProfileDashboardContent() {
  const searchParams = useSearchParams();
  const {
    profile,
    updateProfile,
    orders,
    addresses,
    addAddress,
    setDefaultAddress,
    removeAddress,
    payments,
    addPayment,
    setDefaultPayment,
    removePayment,
  } = useStore();

  const [activeTab, setActiveTab] = useState<ProfileTab>("profile");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(
    orders[0]?.id || null
  );

  // Profile form state + "Saved!" confirmation
  const [formState, setFormState] = useState(profile);
  const [profileSaved, setProfileSaved] = useState(false);

  // Inline Add Address form state
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "",
    recipient: profile.name,
    street: "",
    city: "",
    phone: profile.phone,
    isDefault: false,
  });

  // Inline Add Payment Method form state
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPayment, setNewPayment] = useState({
    brand: "VISA INFINITE BLACK",
    last4: "",
    expiry: "",
    cardholder: profile.name.toUpperCase(),
    isDefault: false,
  });

  useEffect(() => {
    setFormState(profile);
  }, [profile]);

  useEffect(() => {
    const tabParam = searchParams.get("tab") as ProfileTab | null;
    if (
      tabParam &&
      ["profile", "orders", "addresses", "payment"].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formState);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3500);
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.label || !newAddress.street || !newAddress.city) return;
    addAddress(newAddress);
    setNewAddress({
      label: "",
      recipient: profile.name,
      street: "",
      city: "",
      phone: profile.phone,
      isDefault: false,
    });
    setShowAddAddress(false);
  };

  const handleCreatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayment.last4 || !newPayment.expiry) return;
    addPayment({
      ...newPayment,
      last4: newPayment.last4.slice(-4),
    });
    setNewPayment({
      brand: "VISA INFINITE BLACK",
      last4: "",
      expiry: "",
      cardholder: profile.name.toUpperCase(),
      isDefault: false,
    });
    setShowAddPayment(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Member Identity Header */}
      <div className="p-8 rounded-3xl glass-panel-volt mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-volt text-obsidian font-display text-3xl flex items-center justify-center shrink-0">
            {profile.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <span className="px-3 py-1 rounded-full bg-obsidian border border-volt/50 text-volt text-[11px] font-mono font-bold">
              {profile.membershipTier}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-white mt-1.5">
              {profile.name}
            </h1>
            <p className="text-xs font-mono text-slate-400">
              {profile.email} • {profile.preferredLocation}
            </p>
          </div>
        </div>

        {/* Quick "View All Orders" Action Button that switches panel smoothly in state (Standard 1.4) */}
        <button
          type="button"
          onClick={() => setActiveTab("orders")}
          className="px-5 py-3 rounded-xl bg-charcoal border border-cyanLED/40 text-cyanLED hover:bg-cyanLED hover:text-obsidian font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start md:self-auto transition-all"
        >
          <Package className="w-4 h-4" />
          <span>View All Orders ({orders.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Dashboard Layout: Sidebar + Active Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 3 Columns: Interactive Sidebar Tabs */}
        <aside className="lg:col-span-3 p-4 rounded-2xl glass-panel border border-white/10 space-y-2">
          {[
            { id: "profile", label: "Profile & Telemetry", icon: User },
            {
              id: "orders",
              label: `Orders & Passes (${orders.length})`,
              icon: Package,
            },
            {
              id: "addresses",
              label: `Addresses (${addresses.length})`,
              icon: MapPin,
            },
            {
              id: "payment",
              label: `Payment (${payments.length})`,
              icon: CreditCard,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as ProfileTab)}
                className={`w-full p-3.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-between transition-all ${
                  isActive
                    ? "bg-volt text-obsidian font-bold shadow-[0_0_20px_rgba(204,255,0,0.25)]"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            );
          })}
        </aside>

        {/* Right 9 Columns: Active Panel Content */}
        <div className="lg:col-span-9 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10">
          {/* =================================================================
              PANEL 1: EDITABLE PROFILE & BIOMECHANICAL PREFERENCES
              ================================================================= */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase text-volt block">
                    ATHLETE BIOMETRIC PROFILE
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    Personal Information & Training Preferences
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("orders")}
                  className="text-xs font-mono text-cyanLED hover:underline flex items-center gap-1"
                >
                  <span>View All Orders</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {profileSaved && (
                <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    Saved! Your athlete profile and preferred training sector
                    have been updated.
                  </span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full h-11 px-3.5 rounded-xl bg-obsidian border border-white/15 text-sm text-white focus:outline-none focus:border-volt"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full h-11 px-3.5 rounded-xl bg-obsidian border border-white/15 text-sm text-white focus:outline-none focus:border-volt"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Mobile / WhatsApp Telemetry Number
                    </label>
                    <input
                      type="text"
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState({ ...formState, phone: e.target.value })
                      }
                      className="w-full h-11 px-3.5 rounded-xl bg-obsidian border border-white/15 text-sm text-white focus:outline-none focus:border-volt"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Membership Access Tier
                    </label>
                    <select
                      value={formState.membershipTier}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          membershipTier: e.target.value,
                        })
                      }
                      className="w-full h-11 px-3.5 rounded-xl bg-obsidian border border-white/15 text-sm text-white focus:outline-none focus:border-volt"
                    >
                      <option value="TIER-3 APEX FOUNDER BLACK">
                        TIER-3 APEX FOUNDER BLACK
                      </option>
                      <option value="TIER-2 HYPOXIC PERFORMANCE PRO">
                        TIER-2 HYPOXIC PERFORMANCE PRO
                      </option>
                      <option value="TIER-1 IRON FORGE ACCESS">
                        TIER-1 IRON FORGE ACCESS
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Primary Biomechanical Goal
                    </label>
                    <input
                      type="text"
                      value={formState.primaryGoal}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          primaryGoal: e.target.value,
                        })
                      }
                      className="w-full h-11 px-3.5 rounded-xl bg-obsidian border border-white/15 text-sm text-white focus:outline-none focus:border-volt"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Preferred Facility Sector
                    </label>
                    <input
                      type="text"
                      value={formState.preferredLocation}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          preferredLocation: e.target.value,
                        })
                      }
                      className="w-full h-11 px-3.5 rounded-xl bg-obsidian border border-white/15 text-sm text-white focus:outline-none focus:border-volt"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs uppercase tracking-wider hover:bg-volt/90 transition-all"
                  >
                    Save Profile Changes
                  </button>
                  {profileSaved && (
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      ✓ Saved!
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* =================================================================
              PANEL 2: EXPANDABLE ORDERS & ACTIVE TRAINING PASSES
              ================================================================= */}
          {activeTab === "orders" && (
            <div className="space-y-5">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase text-cyanLED block">
                  ORDER & PASS HISTORY
                </span>
                <h2 className="text-xl font-bold text-white">
                  Reserved Training Protocols & 3D Hardware Orders
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Click any order row below to expand and inspect individual
                  line items. Statuses sync live with the Staff Admin Portal.
                </p>
              </div>

              {orders.length === 0 ? (
                <div className="p-12 rounded-2xl bg-obsidian/70 border border-white/10 text-center">
                  <Dumbbell className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                  <p className="text-sm font-bold text-white">
                    No Orders Placed Yet
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => {
                    const isExpanded = expandedOrderId === order.id;
                    return (
                      <div
                        key={order.id}
                        className="rounded-2xl bg-obsidian/85 border border-white/10 overflow-hidden"
                      >
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          onClick={() =>
                            setExpandedOrderId(isExpanded ? null : order.id)
                          }
                          className="w-full p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 text-left hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-lg bg-charcoal border border-white/15 font-mono text-xs font-bold text-volt">
                              #{order.id}
                            </span>
                            <div>
                              <span className="text-sm font-bold text-white block">
                                {order.items.length} Line Item
                                {order.items.length > 1 ? "s" : ""} •{" "}
                                {order.createdAt}
                              </span>
                              <span className="text-xs font-mono text-slate-400">
                                Member: {order.memberName}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                                order.status === "Delivered"
                                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                  : order.status === "Cancelled"
                                  ? "bg-crimson/20 text-crimson border-crimson/40"
                                  : "bg-cyanLED/20 text-cyanLED border-cyanLED/40"
                              }`}
                            >
                              {order.status}
                            </span>
                            <span className="text-base font-mono font-bold text-white">
                              ${order.totalAmount}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 transition-transform ${
                                isExpanded ? "rotate-180 text-volt" : ""
                              }`}
                            />
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="p-5 bg-charcoal/80 border-t border-white/10 space-y-2.5">
                            <div className="text-[11px] font-mono uppercase text-slate-400 mb-2">
                              Order Line Items Breakdown:
                            </div>
                            {order.items.map((line, idx) => (
                              <div
                                key={`${line.id}-${idx}`}
                                className="p-3 rounded-xl bg-obsidian/90 border border-white/5 flex items-center justify-between gap-3 text-xs"
                              >
                                <div>
                                  <span className="font-bold text-white block">
                                    {line.name}
                                  </span>
                                  <span className="font-mono text-cyanLED text-[11px]">
                                    {line.category} • Qty: {line.quantity}
                                  </span>
                                </div>
                                <span className="font-mono font-bold text-volt">
                                  ${line.price * line.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* =================================================================
              PANEL 3: INTERACTIVE DELIVERY & TRAINING ADDRESSES
              ================================================================= */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase text-volt block">
                    GEAR & SUPPLEMENT COURIER DESTINATIONS
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    Saved Delivery Addresses
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="px-4 py-2.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showAddAddress ? "Cancel" : "Add New Address"}</span>
                </button>
              </div>

              {showAddAddress && (
                <form
                  onSubmit={handleCreateAddress}
                  className="p-5 rounded-2xl bg-obsidian/90 border border-volt/40 space-y-4"
                >
                  <h3 className="text-sm font-mono font-bold text-volt uppercase">
                    Add New Gear Delivery Destination
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Address Label (e.g. Home Gym Studio)"
                      value={newAddress.label}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, label: e.target.value })
                      }
                      className="h-10 px-3 rounded-lg bg-charcoal border border-white/15 text-xs text-white"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Recipient Full Name"
                      value={newAddress.recipient}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          recipient: e.target.value,
                        })
                      }
                      className="h-10 px-3 rounded-lg bg-charcoal border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Street Address & Suite"
                      value={newAddress.street}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, street: e.target.value })
                      }
                      className="h-10 px-3 rounded-lg bg-charcoal border border-white/15 text-xs text-white sm:col-span-2"
                    />
                    <input
                      type="text"
                      required
                      placeholder="City, State & ZIP"
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, city: e.target.value })
                      }
                      className="h-10 px-3 rounded-lg bg-charcoal border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newAddress.isDefault}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            isDefault: e.target.checked,
                          })
                        }
                      />
                      <span>Set as Default Delivery Address</span>
                    </label>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-volt text-obsidian font-mono font-bold text-xs uppercase"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              {addresses.length === 0 ? (
                <div className="p-12 rounded-2xl bg-obsidian/80 border border-white/10 text-center space-y-2">
                  <MapPin className="w-10 h-10 text-slate-500 mx-auto" />
                  <p className="text-sm font-bold text-white">
                    No Saved Addresses Found
                  </p>
                  <p className="text-xs text-slate-400">
                    Click &quot;Add New Address&quot; above to register a
                    delivery location for 3D dumbbell sets and gear.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 ${
                        addr.isDefault
                          ? "bg-obsidian/95 border-volt"
                          : "bg-obsidian/70 border-white/10"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-white">
                            {addr.label}
                          </h4>
                          {addr.isDefault && (
                            <span className="px-2.5 py-0.5 rounded-full bg-volt/20 text-volt border border-volt/40 text-[10px] font-mono font-bold flex items-center gap-1">
                              <Star className="w-3 h-3 fill-volt" />
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 mt-2">
                          {addr.recipient}
                        </p>
                        <p className="text-xs text-slate-400">{addr.street}</p>
                        <p className="text-xs text-slate-400">{addr.city}</p>
                        <p className="text-xs font-mono text-cyanLED mt-1">
                          {addr.phone}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                        {!addr.isDefault ? (
                          <button
                            type="button"
                            onClick={() => setDefaultAddress(addr.id)}
                            className="text-volt hover:underline"
                          >
                            Set Default
                          </button>
                        ) : (
                          <span className="text-slate-500">
                            Primary Destination
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeAddress(addr.id)}
                          className="text-crimson hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =================================================================
              PANEL 4: INTERACTIVE PAYMENT METHODS
              ================================================================= */}
          {activeTab === "payment" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase text-cyanLED block">
                    ENCRYPTED BILLING VAULT
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    Saved Payment Methods
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddPayment(!showAddPayment)}
                  className="px-4 py-2.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showAddPayment ? "Cancel" : "Add New Card"}</span>
                </button>
              </div>

              {showAddPayment && (
                <form
                  onSubmit={handleCreatePayment}
                  className="p-5 rounded-2xl bg-obsidian/90 border border-cyanLED/40 space-y-4"
                >
                  <h3 className="text-sm font-mono font-bold text-cyanLED uppercase">
                    Add New Membership Billing Card
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <select
                      value={newPayment.brand}
                      onChange={(e) =>
                        setNewPayment({ ...newPayment, brand: e.target.value })
                      }
                      className="h-10 px-3 rounded-lg bg-charcoal border border-white/15 text-xs text-white"
                    >
                      <option value="VISA INFINITE BLACK">
                        VISA INFINITE BLACK
                      </option>
                      <option value="MASTERCARD WORLD ELITE">
                        MASTERCARD WORLD ELITE
                      </option>
                      <option value="AMEX CENTURION TITANIUM">
                        AMEX CENTURION TITANIUM
                      </option>
                    </select>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      placeholder="Last 4 Digits (e.g. 9940)"
                      value={newPayment.last4}
                      onChange={(e) =>
                        setNewPayment({ ...newPayment, last4: e.target.value })
                      }
                      className="h-10 px-3 rounded-lg bg-charcoal border border-white/15 text-xs text-white"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Expiry (MM/YY)"
                      value={newPayment.expiry}
                      onChange={(e) =>
                        setNewPayment({ ...newPayment, expiry: e.target.value })
                      }
                      className="h-10 px-3 rounded-lg bg-charcoal border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newPayment.isDefault}
                        onChange={(e) =>
                          setNewPayment({
                            ...newPayment,
                            isDefault: e.target.checked,
                          })
                        }
                      />
                      <span>Set as Default Recurring Billing Method</span>
                    </label>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-volt text-obsidian font-mono font-bold text-xs uppercase"
                    >
                      Save Payment Method
                    </button>
                  </div>
                </form>
              )}

              {payments.length === 0 ? (
                <div className="p-12 rounded-2xl bg-obsidian/80 border border-white/10 text-center space-y-2">
                  <CreditCard className="w-10 h-10 text-slate-500 mx-auto" />
                  <p className="text-sm font-bold text-white">
                    No Payment Methods Saved
                  </p>
                  <p className="text-xs text-slate-400">
                    Click &quot;Add New Card&quot; above to add a billing method
                    for monthly passes or 3D hardware orders.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {payments.map((pay) => (
                    <div
                      key={pay.id}
                      className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 ${
                        pay.isDefault
                          ? "bg-obsidian/95 border-cyanLED"
                          : "bg-obsidian/70 border-white/10"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-mono font-bold text-cyanLED">
                            {pay.brand}
                          </span>
                          {pay.isDefault && (
                            <span className="px-2.5 py-0.5 rounded-full bg-cyanLED/20 text-cyanLED border border-cyanLED/40 text-[10px] font-mono font-bold">
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <div className="text-lg font-mono font-bold text-white mt-3">
                          •••• •••• •••• {pay.last4}
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mt-2">
                          <span>{pay.cardholder}</span>
                          <span>EXP {pay.expiry}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                        {!pay.isDefault ? (
                          <button
                            type="button"
                            onClick={() => setDefaultPayment(pay.id)}
                            className="text-cyanLED hover:underline"
                          >
                            Set Default
                          </button>
                        ) : (
                          <span className="text-slate-500">
                            Active Billing Card
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removePayment(pay.id)}
                          className="text-crimson hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center font-mono text-volt">
          LOADING MEMBER DASHBOARD...
        </div>
      }
    >
      <ProfileDashboardContent />
    </Suspense>
  );
}
