"use client";

import React, { useState } from "react";
import {
  useStore,
  EquipmentZoneCategory,
  MemberBookingOrder,
  StaffMember,
} from "@/context/StoreContext";
import {
  ShieldAlert,
  DollarSign,
  PackageCheck,
  Clock,
  Users,
  Plus,
  Trash2,
  Search,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";

export default function AdminPortalPage() {
  const {
    catalog,
    orders,
    staff,
    toggleItemStock,
    updateItemPrice,
    addCatalogItem,
    deleteCatalogItem,
    updateOrderStatus,
    addStaffMember,
    toggleStaffActive,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    "inventory" | "orders" | "staff"
  >("inventory");

  // Order search state
  const [orderSearch, setOrderSearch] = useState("");

  // Add New Catalog Item Modal State
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemForm, setNewItemForm] = useState({
    name: "",
    subtitle: "",
    category: "Strength & Hypertrophy" as EquipmentZoneCategory,
    collection: "new" as "new" | "best" | "pro",
    price: 199,
    billingCycle: "/ month",
    inStock: true,
    spotsLeft: 8,
    studioImage: "/images/zones/iron-forge-rack.jpg",
    hoverVideo: "/videos/gym-3-hypertrophy-row.mp4",
    hoverBadge: "LIVE CLIP • Custom Protocol",
    cameraZone: "iron-forge" as const,
    accentColor: "#CCFF00" as const,
    intensity: "9.5 / 10 PRO",
    caloriesBurn: "750 - 950 kcal/hr",
    equipmentSpec: "Calibrated 3D CNC Rig + Urethane Plates",
    description: "",
  });

  // Add New Staff Member Form State
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [newStaffForm, setNewStaffForm] = useState({
    name: "",
    role: "Biomechanics Coach" as StaffMember["role"],
    email: "",
    specialty: "",
    shift: "08:00 - 17:00",
    active: true,
  });

  // KPI Metrics (Standard 2.2)
  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const inStockCount = catalog.filter((i) => i.inStock).length;
  const outOfStockCount = catalog.length - inStockCount;
  const pendingOrdersCount = orders.filter(
    (o) => o.status === "Pending" || o.status === "Processing"
  ).length;
  const activeStaffCount = staff.filter((s) => s.active).length;

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.memberName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.memberEmail.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.status.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const handleAddCatalogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemForm.name) return;
    addCatalogItem({
      name: newItemForm.name,
      subtitle:
        newItemForm.subtitle || "Custom Biomechanical Protocol & 3D Telemetry",
      category: newItemForm.category,
      collection: newItemForm.collection,
      price: Number(newItemForm.price) || 150,
      billingCycle: newItemForm.billingCycle,
      inStock: newItemForm.inStock,
      spotsLeft: newItemForm.inStock ? Number(newItemForm.spotsLeft) || 8 : 0,
      studioImage: newItemForm.studioImage,
      hoverVideo: newItemForm.hoverVideo,
      hoverBadge: newItemForm.hoverBadge,
      cameraZone: newItemForm.cameraZone,
      accentColor: newItemForm.accentColor,
      metrics: {
        intensity: newItemForm.intensity,
        caloriesBurn: newItemForm.caloriesBurn,
        equipmentSpec: newItemForm.equipmentSpec,
      },
      description:
        newItemForm.description ||
        "Engineered inside the AetherForge 3D performance sanctuary with full live telemetry synchronization.",
    });
    setShowAddItemModal(false);
    setNewItemForm({
      ...newItemForm,
      name: "",
      subtitle: "",
      description: "",
    });
  };

  const handleAddStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffForm.name || !newStaffForm.email) return;
    addStaffMember(newStaffForm);
    setNewStaffForm({
      name: "",
      role: "Biomechanics Coach",
      email: "",
      specialty: "",
      shift: "08:00 - 17:00",
      active: true,
    });
    setShowAddStaff(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Portal Header */}
      <div className="p-8 rounded-3xl glass-panel border border-crimson/40 mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-crimson/20 border border-crimson/50 text-crimson text-xs font-mono uppercase tracking-widest inline-flex items-center gap-2 font-bold">
            <ShieldAlert className="w-3.5 h-3.5" />
            STAFF OPERATIONS & INVENTORY PORTAL (/ADMIN)
          </span>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl text-white uppercase tracking-wide">
            AETHERFORGE <span className="text-volt">COMMAND CENTER</span>
          </h1>
          <p className="mt-1.5 text-sm text-slate-300 max-w-2xl">
            Every inventory toggle, inline price change, new protocol creation,
            and order fulfillment status update immediately synchronizes across
            the live 3D storefront, <code className="text-volt">/shop</code>,
            the Search Drawer, and{" "}
            <code className="text-cyanLED">/profile</code>.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddItemModal(true)}
          className="px-6 py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs uppercase tracking-wider hover:bg-volt/90 transition-all flex items-center gap-2 self-start lg:self-auto shrink-0 shadow-[0_0_25px_rgba(204,255,0,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Protocol / 3D Gear</span>
        </button>
      </div>

      {/* 1. KPI OVERVIEW CARDS (Standard 2.2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="p-6 rounded-2xl glass-panel border border-white/10">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>LIVE GROSS REVENUE</span>
            <DollarSign className="w-4 h-4 text-volt" />
          </div>
          <div className="font-display text-4xl text-white mt-2">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="text-xs font-mono text-emerald-400 mt-1">
            Across {orders.length} Active Member Orders
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>INVENTORY STATUS</span>
            <PackageCheck className="w-4 h-4 text-cyanLED" />
          </div>
          <div className="font-display text-4xl text-white mt-2">
            {inStockCount} IN / {outOfStockCount} OUT
          </div>
          <div className="text-xs font-mono text-cyanLED mt-1">
            {catalog.length} Total Protocols & 3D Gear Items
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>PENDING / PROCESSING</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-display text-4xl text-white mt-2">
            {pendingOrdersCount} ORDERS
          </div>
          <div className="text-xs font-mono text-amber-300 mt-1">
            Awaiting Pass Provision or Dispatch
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>ACTIVE COACH & STAFF</span>
            <Users className="w-4 h-4 text-crimson" />
          </div>
          <div className="font-display text-4xl text-white mt-2">
            {activeStaffCount} / {staff.length} ON DUTY
          </div>
          <div className="text-xs font-mono text-slate-300 mt-1">
            CSCS Directors & Hypoxic Leads
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Admin Modules */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {[
          {
            id: "inventory",
            label: `1. Live Inventory Manager (${catalog.length})`,
          },
          {
            id: "orders",
            label: `2. Order Fulfillment Manager (${orders.length})`,
          },
          {
            id: "staff",
            label: `3. Staff & Role Access Control (${staff.length})`,
          },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() =>
              setActiveTab(t.id as "inventory" | "orders" | "staff")
            }
            className={`px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider border transition-all ${
              activeTab === t.id
                ? "bg-volt text-obsidian border-volt font-bold shadow-[0_0_20px_rgba(204,255,0,0.25)]"
                : "glass-panel border-white/10 text-slate-300 hover:border-volt/40"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* =====================================================================
          MODULE 1: LIVE INVENTORY MANAGER
          ===================================================================== */}
      {activeTab === "inventory" && (
        <div className="p-6 rounded-3xl glass-panel border border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold text-white">
                Live Storefront Inventory & Pricing Matrix
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Toggle &quot;In Stock / Out of Stock&quot; or edit any price
                inline—changes reflect immediately in the Search Drawer and
                Storefront.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddItemModal(true)}
              className="px-4 py-2.5 rounded-xl bg-volt/15 border border-volt text-volt font-mono text-xs font-bold uppercase flex items-center gap-1.5 hover:bg-volt hover:text-obsidian transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Item</span>
            </button>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 font-mono uppercase text-slate-400">
                  <th className="py-3.5 px-3">Protocol / 3D Hardware</th>
                  <th className="py-3.5 px-3">Category & Hover Clip</th>
                  <th className="py-3.5 px-3">Inline Price ($)</th>
                  <th className="py-3.5 px-3">Stock Availability</th>
                  <th className="py-3.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {catalog.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.studioImage}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white text-sm">
                            {item.name}
                          </div>
                          <div className="text-slate-400 font-mono text-[11px]">
                            ID: {item.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-3">
                      <span className="px-2.5 py-1 rounded bg-obsidian text-cyanLED border border-cyanLED/30 font-mono text-[11px] block w-fit">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                        {item.hoverBadge}
                      </span>
                    </td>

                    <td className="py-4 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-slate-400">$</span>
                        <input
                          type="number"
                          min={0}
                          aria-label={`Price for ${item.name}`}
                          value={item.price}
                          onChange={(e) =>
                            updateItemPrice(item.id, Number(e.target.value))
                          }
                          className="w-24 h-9 px-2.5 rounded-lg bg-obsidian border border-white/15 font-mono font-bold text-volt focus:outline-none focus:border-volt"
                        />
                      </div>
                    </td>

                    <td className="py-4 px-3">
                      <button
                        type="button"
                        onClick={() => toggleItemStock(item.id)}
                        className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold border flex items-center gap-1.5 transition-all ${
                          item.inStock
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border-amber-400/50 hover:bg-amber-500/30"
                        }`}
                      >
                        {item.inStock ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>In Stock ({item.spotsLeft} Spots)</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Out of Stock (Click to Restock)</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-3 text-right">
                      <button
                        type="button"
                        aria-label={`Delete ${item.name}`}
                        onClick={() => deleteCatalogItem(item.id)}
                        className="p-2 rounded-lg bg-crimson/15 text-crimson hover:bg-crimson hover:text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODULE 2: ORDER FULFILLMENT MANAGER
          ===================================================================== */}
      {activeTab === "orders" && (
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold text-white">
                Member Pass & Hardware Order Fulfillment
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Filter orders by ID, athlete name, email, or status and update
                fulfillment stage in real time.
              </p>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-volt absolute left-3.5 top-3" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search order #AF-..., member, status..."
                className="w-full h-10 pl-10 pr-3 rounded-xl bg-obsidian border border-white/15 text-xs text-white focus:outline-none focus:border-volt"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 font-mono uppercase text-slate-400">
                  <th className="py-3.5 px-3">Order ID</th>
                  <th className="py-3.5 px-3">Athlete / Member</th>
                  <th className="py-3.5 px-3">Line Items</th>
                  <th className="py-3.5 px-3">Total</th>
                  <th className="py-3.5 px-3">Live Status Dropdown</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-3 font-mono font-bold text-volt">
                      #{order.id}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        {order.createdAt}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <div className="font-bold text-white">
                        {order.memberName}
                      </div>
                      <div className="text-slate-400 font-mono text-[11px]">
                        {order.memberEmail}
                      </div>
                    </td>
                    <td className="py-4 px-3 space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-slate-200">
                          • {item.name}{" "}
                          <span className="font-mono text-cyanLED">
                            (x{item.quantity})
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-4 px-3 font-mono font-bold text-sm text-white">
                      ${order.totalAmount}
                    </td>
                    <td className="py-4 px-3">
                      <select
                        aria-label={`Order status for ${order.id}`}
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            order.id,
                            e.target.value as MemberBookingOrder["status"]
                          )
                        }
                        className="h-9 px-3 rounded-lg bg-obsidian border border-volt/40 font-mono text-xs font-bold text-volt focus:outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODULE 3: STAFF & ROLE ACCESS CONTROL
          ===================================================================== */}
      {activeTab === "staff" && (
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold text-white">
                Performance Directors, Coaches & Role Access Control
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Provision new coaches or operations admins, assign role badges,
                and toggle Active / Inactive shift status.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddStaff(!showAddStaff)}
              className="px-4 py-2.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs uppercase flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>
                {showAddStaff ? "Cancel" : "Provision New Staff Member"}
              </span>
            </button>
          </div>

          {showAddStaff && (
            <form
              onSubmit={handleAddStaffSubmit}
              className="p-5 rounded-2xl bg-obsidian/90 border border-volt/40 space-y-4"
            >
              <h3 className="text-sm font-mono font-bold text-volt uppercase">
                Provision New Coach / Specialist
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name & Credentials"
                  value={newStaffForm.name}
                  onChange={(e) =>
                    setNewStaffForm({ ...newStaffForm, name: e.target.value })
                  }
                  className="h-10 px-3 rounded-lg bg-charcoal border border-white/15 text-xs text-white"
                />
                <input
                  type="email"
                  required
                  placeholder="Staff Email (@aetherforge.gym)"
                  value={newStaffForm.email}
                  onChange={(e) =>
                    setNewStaffForm({ ...newStaffForm, email: e.target.value })
                  }
                  className="h-10 px-3 rounded-lg bg-charcoal border border-white/15 text-xs text-white"
                />
                <select
                  value={newStaffForm.role}
                  onChange={(e) =>
                    setNewStaffForm({
                      ...newStaffForm,
                      role: e.target.value as StaffMember["role"],
                    })
                  }
                  className="h-10 px-3 rounded-lg bg-charcoal border border-white/15 text-xs text-white"
                >
                  <option value="Head Performance Director">
                    Head Performance Director
                  </option>
                  <option value="Biomechanics Coach">Biomechanics Coach</option>
                  <option value="Combat & Conditioning Lead">
                    Combat & Conditioning Lead
                  </option>
                  <option value="Facility Operations Admin">
                    Facility Operations Admin
                  </option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Specialty (e.g. Hypoxic VO2 & Plyometrics)"
                  value={newStaffForm.specialty}
                  onChange={(e) =>
                    setNewStaffForm({
                      ...newStaffForm,
                      specialty: e.target.value,
                    })
                  }
                  className="h-10 px-3 rounded-lg bg-charcoal border border-white/15 text-xs text-white sm:col-span-2"
                />
                <input
                  type="text"
                  placeholder="Shift Hours (e.g. 08:00 - 17:00)"
                  value={newStaffForm.shift}
                  onChange={(e) =>
                    setNewStaffForm({ ...newStaffForm, shift: e.target.value })
                  }
                  className="h-10 px-3 rounded-lg bg-charcoal border border-white/15 text-xs text-white"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-volt text-obsidian font-mono font-bold text-xs uppercase"
              >
                Confirm Staff Provisioning
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {staff.map((member) => (
              <div
                key={member.id}
                className="p-5 rounded-2xl bg-obsidian/85 border border-white/10 flex flex-col justify-between gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-charcoal border border-cyanLED/40 text-cyanLED font-mono text-[10px] font-bold uppercase">
                      {member.role}
                    </span>
                    <h4 className="text-base font-bold text-white mt-2">
                      {member.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      {member.email} • Shift: {member.shift}
                    </p>
                    <p className="text-xs text-slate-300 mt-2">
                      Specialty: {member.specialty}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleStaffActive(member.id)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border shrink-0 transition-all ${
                      member.active
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-slate-700/40 text-slate-400 border-white/10"
                    }`}
                  >
                    {member.active ? "● ACTIVE" : "○ INACTIVE"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          ADD NEW CATALOG ITEM MODAL
          ===================================================================== */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-charcoal border border-volt/50 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-volt block">
                  LIVE CATALOG PROVISIONING
                </span>
                <h3 className="text-xl font-bold text-white">
                  Add New 3D Training Protocol or Equipment Item
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setShowAddItemModal(false)}
                className="h-9 w-9 rounded-lg bg-obsidian text-slate-300 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCatalogSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Protocol / Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newItemForm.name}
                    onChange={(e) =>
                      setNewItemForm({ ...newItemForm, name: e.target.value })
                    }
                    placeholder="e.g. Cyber Kettlebell Ballistic Lab"
                    className="w-full h-10 px-3 rounded-xl bg-obsidian border border-white/15 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Subtitle / Engineering Spec
                  </label>
                  <input
                    type="text"
                    value={newItemForm.subtitle}
                    onChange={(e) =>
                      setNewItemForm({
                        ...newItemForm,
                        subtitle: e.target.value,
                      })
                    }
                    placeholder="Posterior Chain & VO2 Peak"
                    className="w-full h-10 px-3 rounded-xl bg-obsidian border border-white/15 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newItemForm.category}
                    onChange={(e) =>
                      setNewItemForm({
                        ...newItemForm,
                        category: e.target.value as EquipmentZoneCategory,
                      })
                    }
                    className="w-full h-10 px-3 rounded-xl bg-obsidian border border-white/15 text-xs text-white"
                  >
                    <option value="Strength & Hypertrophy">
                      Strength & Hypertrophy
                    </option>
                    <option value="Cardio & Endurance">
                      Cardio & Endurance
                    </option>
                    <option value="Combat & Calisthenics">
                      Combat & Calisthenics
                    </option>
                    <option value="Supplements & Gear">
                      Supplements & Gear
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={newItemForm.price}
                    onChange={(e) =>
                      setNewItemForm({
                        ...newItemForm,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full h-10 px-3 rounded-xl bg-obsidian border border-white/15 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Collection Badge
                  </label>
                  <select
                    value={newItemForm.collection}
                    onChange={(e) =>
                      setNewItemForm({
                        ...newItemForm,
                        collection: e.target.value as "new" | "best" | "pro",
                      })
                    }
                    className="w-full h-10 px-3 rounded-xl bg-obsidian border border-white/15 text-xs text-white"
                  >
                    <option value="new">New Protocol</option>
                    <option value="best">Best Seller</option>
                    <option value="pro">Pro Series</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Default Studio Architectural Photo (1-of-4)
                  </label>
                  <select
                    value={newItemForm.studioImage}
                    onChange={(e) =>
                      setNewItemForm({
                        ...newItemForm,
                        studioImage: e.target.value,
                      })
                    }
                    className="w-full h-10 px-3 rounded-xl bg-obsidian border border-white/15 text-xs text-white"
                  >
                    <option value="/images/zones/iron-forge-rack.jpg">
                      Sector 01 • Iron Forge Dumbbell Rack
                    </option>
                    <option value="/images/zones/cyber-neon-alley.jpg">
                      Sector 02 • Cyber Neon Linear Alley
                    </option>
                    <option value="/images/zones/functional-cardio-deck.jpg">
                      Sector 03 • Kinetic Sprung Hardwood Deck
                    </option>
                    <option value="/images/zones/hybrid-combat-hall.jpg">
                      Sector 04 • Apex Combat & Rig Hall
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Matched Hover Motion Clip (1-of-7)
                  </label>
                  <select
                    value={newItemForm.hoverVideo}
                    onChange={(e) =>
                      setNewItemForm({
                        ...newItemForm,
                        hoverVideo: e.target.value,
                      })
                    }
                    className="w-full h-10 px-3 rounded-xl bg-obsidian border border-white/15 text-xs text-white"
                  >
                    <option value="/videos/gym-1-altitude-calisthenics.mp4">
                      GYM1.mp4 • Hypoxic Mask Calisthenics
                    </option>
                    <option value="/videos/gym-2-agility-conditioning.mp4">
                      GYM2.mp4 • Hardwood Speed-Rope Plyo
                    </option>
                    <option value="/videos/gym-3-hypertrophy-row.mp4">
                      GYM3.mp4 • Crimson Dumbbell Row
                    </option>
                    <option value="/videos/gym-4-combat-striking.mp4">
                      GYM4.mp4 • Chained Heavy-Bag Boxing
                    </option>
                    <option value="/videos/gym-5-pec-deck-isolation.mp4">
                      GYM5.mp4 • Acid-Green Tactical Pec Fly
                    </option>
                    <option value="/videos/gym-6-endurance-treadmill.mp4">
                      GYM6.mp4 • Linear LED Treadmill Sprint
                    </option>
                    <option value="/videos/gym-7-pullup-mastery.mp4">
                      GYM7.mp4 • Titan Yellow Rig Pull-Ups
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Protocol Description
                </label>
                <textarea
                  rows={2}
                  value={newItemForm.description}
                  onChange={(e) =>
                    setNewItemForm({
                      ...newItemForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe the biomechanical stimulus and 3D zone integration..."
                  className="w-full p-3 rounded-xl bg-obsidian border border-white/15 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddItemModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-obsidian text-slate-300 text-xs font-mono uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs uppercase"
                >
                  Publish to Live Storefront
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
