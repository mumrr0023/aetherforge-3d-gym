"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type EquipmentZoneCategory = "Strength & Hypertrophy" | "Cardio & Endurance" | "Combat & Calisthenics" | "Supplements & Gear";
export type CollectionType = "all" | "new" | "best" | "pro";
export type CameraZone = "hero" | "iron-forge" | "cyber-cardio" | "combat-rig" | "altitude-lab";

export interface GymCatalogItem {
  id: string;
  name: string;
  subtitle: string;
  category: EquipmentZoneCategory;
  collection: "new" | "best" | "pro";
  price: number;
  billingCycle: string;
  inStock: boolean;
  spotsLeft: number;
  studioImage: string; // Default Clean / Architectural Studio State (from GYM_REF_PICS)
  hoverVideo: string;  // Lifestyle / In-Action Motion Hover State (from GYM_REF_VIDS)
  hoverBadge: string;
  cameraZone: CameraZone;
  accentColor: "#CCFF00" | "#00F0FF" | "#FF2A54" | "#F59E0B";
  metrics: {
    intensity: string;
    caloriesBurn: string;
    equipmentSpec: string;
  };
  description: string;
}

export interface MemberBookingOrder {
  id: string;
  memberName: string;
  memberEmail: string;
  createdAt: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  totalAmount: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    category: string;
  }[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: "Head Performance Director" | "Biomechanics Coach" | "Combat & Conditioning Lead" | "Facility Operations Admin";
  email: string;
  specialty: string;
  active: boolean;
  shift: string;
}

export interface SavedAddress {
  id: string;
  label: string;
  recipient: string;
  street: string;
  city: string;
  phone: string;
  isDefault: boolean;
}

export interface SavedPaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  cardholder: string;
  isDefault: boolean;
}

export interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  membershipTier: string;
  primaryGoal: string;
  preferredLocation: string;
}

interface StoreContextType {
  catalog: GymCatalogItem[];
  orders: MemberBookingOrder[];
  staff: StaffMember[];
  cart: { item: GymCatalogItem; quantity: number }[];
  addresses: SavedAddress[];
  payments: SavedPaymentMethod[];
  profile: UserProfileData;
  activeCameraZone: CameraZone;
  active3DLoadKg: number;
  active3DAccent: string;
  isLowPower3D: boolean;
  isSearchOpen: boolean;
  isCartOpen: boolean;
  setActiveCameraZone: (zone: CameraZone) => void;
  setActive3DLoadKg: (kg: number) => void;
  setActive3DAccent: (hex: string) => void;
  setIsLowPower3D: (val: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: GymCatalogItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQty: (id: string, delta: number) => void;
  clearCart: () => void;
  checkoutCart: () => MemberBookingOrder | null;
  // Admin Operations
  toggleItemStock: (id: string) => void;
  updateItemPrice: (id: string, newPrice: number) => void;
  addCatalogItem: (item: Omit<GymCatalogItem, "id">) => void;
  deleteCatalogItem: (id: string) => void;
  updateOrderStatus: (orderId: string, status: MemberBookingOrder["status"]) => void;
  addStaffMember: (member: Omit<StaffMember, "id">) => void;
  toggleStaffActive: (id: string) => void;
  // Profile Operations
  updateProfile: (data: UserProfileData) => void;
  addAddress: (addr: Omit<SavedAddress, "id">) => void;
  setDefaultAddress: (id: string) => void;
  removeAddress: (id: string) => void;
  addPayment: (pay: Omit<SavedPaymentMethod, "id">) => void;
  setDefaultPayment: (id: string) => void;
  removePayment: (id: string) => void;
}

const INITIAL_CATALOG: GymCatalogItem[] = [
  {
    id: "prog-altitude-calisthenics",
    name: "O2 Deprivation Hypoxic Calisthenics Lab",
    subtitle: "High-Altitude Mask Protocol & Bodyweight Mastery",
    category: "Combat & Calisthenics",
    collection: "new",
    price: 189,
    billingCycle: "/ month",
    inStock: true,
    spotsLeft: 6,
    studioImage: "/images/zones/cyber-neon-alley.jpg",
    hoverVideo: "/videos/gym-1-altitude-calisthenics.mp4",
    hoverBadge: "LIVE CLIP: GYM1 • Hypoxic Pushup Flow",
    cameraZone: "altitude-lab",
    accentColor: "#00F0FF",
    metrics: {
      intensity: "9.8 / 10 EXTREME",
      caloriesBurn: "780 - 950 kcal/hr",
      equipmentSpec: "Elevation Training Mask 3.0 + Carbon Rubber Floor",
    },
    description:
      "Engineered under our obsidian LED ceiling grid, this hypoxic calisthenics protocol forces maximum VO2 efficiency and fast-twitch upper-body endurance.",
  },
  {
    id: "prog-kinetic-jump-conditioning",
    name: "Kinetic Hardwood Plyo & Speed Rope Circuit",
    subtitle: "Ballistic Footwork, Mirror Feedback & Anaerobic Rhythm",
    category: "Cardio & Endurance",
    collection: "best",
    price: 145,
    billingCycle: "/ month",
    inStock: true,
    spotsLeft: 9,
    studioImage: "/images/zones/functional-cardio-deck.jpg",
    hoverVideo: "/videos/gym-2-agility-conditioning.mp4",
    hoverBadge: "LIVE CLIP: GYM2 • Speed Rope Plyometrics",
    cameraZone: "cyber-cardio",
    accentColor: "#CCFF00",
    metrics: {
      intensity: "8.9 / 10 HIGH",
      caloriesBurn: "820 - 1,050 kcal/hr",
      equipmentSpec: "Sprung Hardwood Deck + CNC Aluminum Speed Cables",
    },
    description:
      "Performed on our shock-absorbing hardwood functional zone with full-height acoustic mirrors and crisp daylight-balanced overhead tubes.",
  },
  {
    id: "prog-iron-forge-hypertrophy",
    name: "Iron Forge Monolith Dumbbell Row & Mass Protocol",
    subtitle: "Heavy Free-Weight Architecture & Myofibrillar Hypertrophy",
    category: "Strength & Hypertrophy",
    collection: "best",
    price: 210,
    billingCycle: "/ month",
    inStock: true,
    spotsLeft: 4,
    studioImage: "/images/zones/iron-forge-rack.jpg",
    hoverVideo: "/videos/gym-3-hypertrophy-row.mp4",
    hoverBadge: "LIVE CLIP: GYM3 • Heavy Crimson Dumbbell Row",
    cameraZone: "iron-forge",
    accentColor: "#FF2A54",
    metrics: {
      intensity: "9.6 / 10 HEAVY LOAD",
      caloriesBurn: "640 - 880 kcal/hr",
      equipmentSpec: "2.5kg–75kg Urethane Pro Dumbbells + Multi-Angle Benches",
    },
    description:
      "Unapologetic raw iron biomechanics. Train across our 24-bench custom matte-black dumbbell sanctuary with calibrated red-plate resistance.",
  },
  {
    id: "prog-heavy-bag-striking",
    name: "Apex Combat Heavy-Bag & Striking Syndicate",
    subtitle: "Explosive Rotational Power, Boxing Footwork & Conditioning",
    category: "Combat & Calisthenics",
    collection: "pro",
    price: 175,
    billingCycle: "/ month",
    inStock: true,
    spotsLeft: 7,
    studioImage: "/images/zones/hybrid-combat-hall.jpg",
    hoverVideo: "/videos/gym-4-combat-striking.mp4",
    hoverBadge: "LIVE CLIP: GYM4 • Heavy Bag Precision Combinations",
    cameraZone: "combat-rig",
    accentColor: "#FF2A54",
    metrics: {
      intensity: "9.4 / 10 EXPLOSIVE",
      caloriesBurn: "900 - 1,150 kcal/hr",
      equipmentSpec: "150lb Fairtex Hydraulic Hanging Bags + 16oz Pro Gloves",
    },
    description:
      "High-velocity striking intervals on chained heavy bags engineered to build knockout torque, shoulder stamina, and fighter reflexes.",
  },
  {
    id: "prog-bunker-pec-isolation",
    name: "Tactical Bunker Cable & Pec-Fly Isolation Suite",
    subtitle: "Constant-Tension Biomechanical Pulley Hypertrophy",
    category: "Strength & Hypertrophy",
    collection: "new",
    price: 195,
    billingCycle: "/ month",
    inStock: false, // Explicitly out-of-stock to demonstrate "Item Out of Stock" badge & search banner per standard 1.2
    spotsLeft: 0,
    studioImage: "/images/zones/iron-forge-rack.jpg",
    hoverVideo: "/videos/gym-5-pec-deck-isolation.mp4",
    hoverBadge: "LIVE CLIP: GYM5 • Neon-Green Tactical Pec Fly",
    cameraZone: "iron-forge",
    accentColor: "#CCFF00",
    metrics: {
      intensity: "9.1 / 10 ISOLATION",
      caloriesBurn: "590 - 760 kcal/hr",
      equipmentSpec: "Dual-Stack Tactical Pec Fly Rig + Kevlar Belted Cables",
    },
    description:
      "Atmospheric acid-green lit isolation sanctuary featuring zero-friction cam pulleys for surgical chest, deltoid, and back striation.",
  },
  {
    id: "prog-cyber-treadmill-sprint",
    name: "Night-Ops LED Linear Treadmill Velocity Fleet",
    subtitle: "Sub-Maximal Lactate Threshold & Incline Sprint Telemetry",
    category: "Cardio & Endurance",
    collection: "best",
    price: 160,
    billingCycle: "/ month",
    inStock: true,
    spotsLeft: 11,
    studioImage: "/images/zones/cyber-neon-alley.jpg",
    hoverVideo: "/videos/gym-6-endurance-treadmill.mp4",
    hoverBadge: "LIVE CLIP: GYM6 • Linear LED Strip Treadmill Velocity",
    cameraZone: "cyber-cardio",
    accentColor: "#00F0FF",
    metrics: {
      intensity: "8.8 / 10 METABOLIC",
      caloriesBurn: "850 - 1,100 kcal/hr",
      equipmentSpec: "Technogym Skillrun 25km/h + Overhead Linear LED Pacing",
    },
    description:
      "Sprint beneath synchronized overhead light strips on slat-belt performance treadmills with real-time cadence and watt telemetry.",
  },
  {
    id: "prog-yellow-rig-pullup",
    name: "Titan Yellow Arch Lat & Posterior Chain Mastery",
    subtitle: "Wide-Grip Scapular Control, Weighted Pull-Ups & Structural Rig",
    category: "Strength & Hypertrophy",
    collection: "pro",
    price: 165,
    billingCycle: "/ month",
    inStock: true,
    spotsLeft: 5,
    studioImage: "/images/zones/hybrid-combat-hall.jpg",
    hoverVideo: "/videos/gym-7-pullup-mastery.mp4",
    hoverBadge: "LIVE CLIP: GYM7 • Anatomical Wide-Grip Pull-Up Rig",
    cameraZone: "combat-rig",
    accentColor: "#CCFF00",
    metrics: {
      intensity: "9.3 / 10 ANATOMICAL",
      caloriesBurn: "620 - 810 kcal/hr",
      equipmentSpec: "Custom Powder-Coated Yellow Bridge Rig + Multi-Angle Grips",
    },
    description:
      "Master complete upper-back three-dimensional density on our signature yellow overhead bridge station with ergonomic knurled handles.",
  },
  {
    id: "gear-forge-home-dumbbell-set",
    name: "AetherForge 3D CNC Smart Dumbbell Pair (5kg–40kg)",
    subtitle: "Commercial Knurled Steel + Laser-Etched Urethane Plates",
    category: "Supplements & Gear",
    collection: "pro",
    price: 680,
    billingCycle: "one-time purchase",
    inStock: true,
    spotsLeft: 3,
    studioImage: "/images/zones/iron-forge-rack.jpg",
    hoverVideo: "/videos/gym-3-hypertrophy-row.mp4",
    hoverBadge: "3D HERO SPEC • Precision Knurled Steel",
    cameraZone: "iron-forge",
    accentColor: "#FF2A54",
    metrics: {
      intensity: "PRO GRADE HARDWARE",
      caloriesBurn: "Lifetime Warranty",
      equipmentSpec: "190,000 PSI Tensile Steel Handle + Crimson Urethane",
    },
    description:
      "Own the exact commercial dumbbell engineered into our 3D WebGL interactive configurator. Zero rattle, precision balanced to ±10 grams.",
  },
];

const INITIAL_ORDERS: MemberBookingOrder[] = [
  {
    id: "AF-90841",
    memberName: "Marcus Vance",
    memberEmail: "marcus.vance@aetherforge.fit",
    createdAt: "2026-11-20",
    status: "Delivered",
    totalAmount: 399,
    items: [
      {
        id: "prog-iron-forge-hypertrophy",
        name: "Iron Forge Monolith Dumbbell Row & Mass Protocol",
        quantity: 1,
        price: 210,
        category: "Strength & Hypertrophy",
      },
      {
        id: "prog-altitude-calisthenics",
        name: "O2 Deprivation Hypoxic Calisthenics Lab",
        quantity: 1,
        price: 189,
        category: "Combat & Calisthenics",
      },
    ],
  },
  {
    id: "AF-90842",
    memberName: "Elena Rostova",
    memberEmail: "elena.r@cyberathletics.io",
    createdAt: "2026-11-21",
    status: "Processing",
    totalAmount: 680,
    items: [
      {
        id: "gear-forge-home-dumbbell-set",
        name: "AetherForge 3D CNC Smart Dumbbell Pair (5kg–40kg)",
        quantity: 1,
        price: 680,
        category: "Supplements & Gear",
      },
    ],
  },
  {
    id: "AF-90843",
    memberName: "Tariq Al-Mansoor",
    memberEmail: "tariq@apexcombat.org",
    createdAt: "2026-11-22",
    status: "Pending",
    totalAmount: 320,
    items: [
      {
        id: "prog-heavy-bag-striking",
        name: "Apex Combat Heavy-Bag & Striking Syndicate",
        quantity: 1,
        price: 175,
        category: "Combat & Calisthenics",
      },
      {
        id: "prog-kinetic-jump-conditioning",
        name: "Kinetic Hardwood Plyo & Speed Rope Circuit",
        quantity: 1,
        price: 145,
        category: "Cardio & Endurance",
      },
    ],
  },
];

const INITIAL_STAFF: StaffMember[] = [
  {
    id: "st-1",
    name: "Kaelen Thorne, CSCS",
    role: "Head Performance Director",
    email: "kaelen@aetherforge.gym",
    specialty: "Myofibrillar Hypertrophy & 3D Biomechanics",
    active: true,
    shift: "06:00 - 15:00",
  },
  {
    id: "st-2",
    name: "Zara Lin, M.Sc.",
    role: "Biomechanics Coach",
    email: "zara@aetherforge.gym",
    specialty: "Hypoxic VO2 Altitude & Lactate Threshold",
    active: true,
    shift: "10:00 - 19:00",
  },
  {
    id: "st-3",
    name: "Dante Morales",
    role: "Combat & Conditioning Lead",
    email: "dante@aetherforge.gym",
    specialty: "Muay Thai Striking & Ballistic Plyometrics",
    active: true,
    shift: "14:00 - 23:00",
  },
  {
    id: "st-4",
    name: "Nadia Vance",
    role: "Facility Operations Admin",
    email: "nadia@aetherforge.gym",
    specialty: "Member Telemetry, Recovery Cryo & Equipment QA",
    active: true,
    shift: "08:00 - 17:00",
  },
];

const INITIAL_ADDRESSES: SavedAddress[] = [
  {
    id: "addr-1",
    label: "Primary Training Residence",
    recipient: "Marcus Vance",
    street: "742 Obsidian Tower, Suite 19B, Cyber District",
    city: "Austin, TX 78701",
    phone: "+1 (512) 555-0194",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Executive Office Gym Drop",
    recipient: "Marcus Vance",
    street: "1200 Congress Ave, Floor 8",
    city: "Austin, TX 78701",
    phone: "+1 (512) 555-0148",
    isDefault: false,
  },
];

const INITIAL_PAYMENTS: SavedPaymentMethod[] = [
  {
    id: "pay-1",
    brand: "VISA INFINITE BLACK",
    last4: "8842",
    expiry: "09/29",
    cardholder: "MARCUS VANCE",
    isDefault: true,
  },
  {
    id: "pay-2",
    brand: "MASTERCARD WORLD ELITE",
    last4: "3109",
    expiry: "04/28",
    cardholder: "MARCUS VANCE",
    isDefault: false,
  },
];

const INITIAL_PROFILE: UserProfileData = {
  name: "Marcus Vance",
  email: "marcus.vance@aetherforge.fit",
  phone: "+1 (512) 555-0194",
  membershipTier: "TIER-3 APEX FOUNDER BLACK",
  primaryGoal: "Myofibrillar Hypertrophy & Hypoxic VO2 Conditioning",
  preferredLocation: "AetherForge Flagship — Sector 01 Obsidian Arena",
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [catalog, setCatalog] = useState<GymCatalogItem[]>(INITIAL_CATALOG);
  const [orders, setOrders] = useState<MemberBookingOrder[]>(INITIAL_ORDERS);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [cart, setCart] = useState<{ item: GymCatalogItem; quantity: number }[]>([
    { item: INITIAL_CATALOG[2], quantity: 1 },
  ]);
  const [addresses, setAddresses] = useState<SavedAddress[]>(INITIAL_ADDRESSES);
  const [payments, setPayments] = useState<SavedPaymentMethod[]>(INITIAL_PAYMENTS);
  const [profile, setProfile] = useState<UserProfileData>(INITIAL_PROFILE);

  const [activeCameraZone, setActiveCameraZone] = useState<CameraZone>("hero");
  const [active3DLoadKg, setActive3DLoadKg] = useState<number>(35);
  const [active3DAccent, setActive3DAccent] = useState<string>("#CCFF00");
  const [isLowPower3D, setIsLowPower3D] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage + check device/network capability per ReferenceEfficient3DWebsite.md 3.5
  useEffect(() => {
    try {
      const savedCatalog = localStorage.getItem("af_gym_catalog_v1");
      const savedOrders = localStorage.getItem("af_gym_orders_v1");
      const savedStaff = localStorage.getItem("af_gym_staff_v1");
      const savedAddresses = localStorage.getItem("af_gym_addresses_v1");
      const savedPayments = localStorage.getItem("af_gym_payments_v1");
      const savedProfile = localStorage.getItem("af_gym_profile_v1");

      if (savedCatalog) setCatalog(JSON.parse(savedCatalog));
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      if (savedStaff) setStaff(JSON.parse(savedStaff));
      if (savedAddresses) setAddresses(JSON.parse(savedAddresses));
      if (savedPayments) setPayments(JSON.parse(savedPayments));
      if (savedProfile) setProfile(JSON.parse(savedProfile));

      // Network-aware & device-aware check
      const nav = navigator as Navigator & {
        connection?: { effectiveType?: string; saveData?: boolean };
      };
      if (
        nav.connection?.saveData ||
        nav.connection?.effectiveType === "slow-2g" ||
        nav.connection?.effectiveType === "2g"
      ) {
        setIsLowPower3D(true);
      }
    } catch {
      // ignore localStorage restrictions
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("af_gym_catalog_v1", JSON.stringify(catalog));
      localStorage.setItem("af_gym_orders_v1", JSON.stringify(orders));
      localStorage.setItem("af_gym_staff_v1", JSON.stringify(staff));
      localStorage.setItem("af_gym_addresses_v1", JSON.stringify(addresses));
      localStorage.setItem("af_gym_payments_v1", JSON.stringify(payments));
      localStorage.setItem("af_gym_profile_v1", JSON.stringify(profile));
    } catch {
      // ignore storage quota errors
    }
  }, [catalog, orders, staff, addresses, payments, profile, hydrated]);

  // Keyboard Escape handler for search/cart drawers (Standard 3.1)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsCartOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const addToCart = (item: GymCatalogItem) => {
    if (!item.inStock) return;
    setCart((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((entry) => entry.item.id !== id));
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((entry) =>
          entry.item.id === id
            ? { ...entry, quantity: Math.max(0, entry.quantity + delta) }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const checkoutCart = (): MemberBookingOrder | null => {
    if (cart.length === 0) return null;
    const totalAmount = cart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
    const newOrder: MemberBookingOrder = {
      id: `AF-${Math.floor(10000 + Math.random() * 90000)}`,
      memberName: profile.name,
      memberEmail: profile.email,
      createdAt: new Date().toISOString().split("T")[0],
      status: "Processing",
      totalAmount,
      items: cart.map((entry) => ({
        id: entry.item.id,
        name: entry.item.name,
        quantity: entry.quantity,
        price: entry.item.price,
        category: entry.item.category,
      })),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    return newOrder;
  };

  const toggleItemStock = (id: string) => {
    setCatalog((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              inStock: !item.inStock,
              spotsLeft: !item.inStock ? 8 : 0,
            }
          : item
      )
    );
  };

  const updateItemPrice = (id: string, newPrice: number) => {
    if (isNaN(newPrice) || newPrice < 0) return;
    setCatalog((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: newPrice } : item))
    );
  };

  const addCatalogItem = (item: Omit<GymCatalogItem, "id">) => {
    const newItem: GymCatalogItem = {
      ...item,
      id: `prog-${Date.now()}`,
    };
    setCatalog((prev) => [newItem, ...prev]);
  };

  const deleteCatalogItem = (id: string) => {
    setCatalog((prev) => prev.filter((item) => item.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: MemberBookingOrder["status"]) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  const addStaffMember = (member: Omit<StaffMember, "id">) => {
    const newStaff: StaffMember = {
      ...member,
      id: `st-${Date.now()}`,
    };
    setStaff((prev) => [newStaff, ...prev]);
  };

  const toggleStaffActive = (id: string) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const updateProfile = (data: UserProfileData) => setProfile(data);

  const addAddress = (addr: Omit<SavedAddress, "id">) => {
    const newAddr: SavedAddress = {
      ...addr,
      id: `addr-${Date.now()}`,
      isDefault: addresses.length === 0 ? true : addr.isDefault,
    };
    setAddresses((prev) =>
      newAddr.isDefault
        ? [newAddr, ...prev.map((a) => ({ ...a, isDefault: false }))]
        : [...prev, newAddr]
    );
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const removeAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const addPayment = (pay: Omit<SavedPaymentMethod, "id">) => {
    const newPay: SavedPaymentMethod = {
      ...pay,
      id: `pay-${Date.now()}`,
      isDefault: payments.length === 0 ? true : pay.isDefault,
    };
    setPayments((prev) =>
      newPay.isDefault
        ? [newPay, ...prev.map((p) => ({ ...p, isDefault: false }))]
        : [...prev, newPay]
    );
  };

  const setDefaultPayment = (id: string) => {
    setPayments((prev) =>
      prev.map((p) => ({ ...p, isDefault: p.id === id }))
    );
  };

  const removePayment = (id: string) => {
    setPayments((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <StoreContext.Provider
      value={{
        catalog,
        orders,
        staff,
        cart,
        addresses,
        payments,
        profile,
        activeCameraZone,
        active3DLoadKg,
        active3DAccent,
        isLowPower3D,
        isSearchOpen,
        isCartOpen,
        setActiveCameraZone,
        setActive3DLoadKg,
        setActive3DAccent,
        setIsLowPower3D,
        setIsSearchOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        checkoutCart,
        toggleItemStock,
        updateItemPrice,
        addCatalogItem,
        deleteCatalogItem,
        updateOrderStatus,
        addStaffMember,
        toggleStaffActive,
        updateProfile,
        addAddress,
        setDefaultAddress,
        removeAddress,
        addPayment,
        setDefaultPayment,
        removePayment,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
