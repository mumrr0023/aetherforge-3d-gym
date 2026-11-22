"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore, CameraZone } from "@/context/StoreContext";
import DualStateProgramCard from "@/components/DualStateProgramCard";
import MotionVaultSection from "@/components/MotionVaultSection";
import {
  Dumbbell,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  CheckCircle2,
  Award,
  Flame,
  Users,
  Sliders,
  Camera,
  Calendar,
  Play,
  Gift,
  Laptop,
  UserCheck,
  ListChecks,
  BadgePercent,
} from "lucide-react";

const CAMERA_ZONE_PRESETS: {
  id: CameraZone;
  label: string;
  desc: string;
  accent: "#CCFF00" | "#00F0FF" | "#FF2A54";
}[] = [
  {
    id: "hero",
    label: "00 • Center Monolith",
    desc: "Balanced Orbital Inspection",
    accent: "#CCFF00",
  },
  {
    id: "iron-forge",
    label: "01 • Iron Forge Rack",
    desc: "Heavy Plate Lateral Angle",
    accent: "#FF2A54",
  },
  {
    id: "cyber-cardio",
    label: "02 • Cyber LED Alley",
    desc: "Linear Velocity Perspective",
    accent: "#00F0FF",
  },
  {
    id: "combat-rig",
    label: "03 • Apex Combat Rig",
    desc: "High Overhead Structural View",
    accent: "#CCFF00",
  },
  {
    id: "altitude-lab",
    label: "04 • Hypoxic O2 Lab",
    desc: "Low Calisthenics Floor Angle",
    accent: "#00F0FF",
  },
];

const TRAINER_PROFILES = [
  {
    id: "tr-1",
    name: "Kaelen Thorne, CSCS",
    role: "Head Performance & Hypertrophy Trainer",
    specialty: "Heavy Free-Weight Routines, 3D Dumbbell Mass & Powerlifting",
    experience: "12+ Years • 940+ Athletes Coached",
    videoClip: "/videos/gym-3-hypertrophy-row.mp4",
    poster: "/images/zones/iron-forge-rack.jpg",
    cameraZone: "iron-forge" as CameraZone,
    accent: "#FF2A54" as const,
    availability: "Mon–Sat • 06:00 - 15:00",
    signatureRoutine: "5-Day Iron Forge Hypertrophy Split",
  },
  {
    id: "tr-2",
    name: "Zara Lin, M.Sc.",
    role: "Hypoxic Calisthenics & Home Demo Lead",
    specialty: "O2 Altitude Conditioning, Bodyweight Mastery & Home Basic Demos",
    experience: "9+ Years • Former Olympic Conditioning Specialist",
    videoClip: "/videos/gym-1-altitude-calisthenics.mp4",
    poster: "/images/zones/cyber-neon-alley.jpg",
    cameraZone: "altitude-lab" as CameraZone,
    accent: "#00F0FF" as const,
    availability: "Mon–Sun • 09:00 - 18:00 (In-Gym & Live Online)",
    signatureRoutine: "Zero-Equipment Home Demo & Hypoxic Core Flow",
  },
  {
    id: "tr-3",
    name: "Dante Morales",
    role: "Combat Striking & Agility Routine Coach",
    specialty: "Muay Thai Heavy-Bag Sessions, Speed-Rope & Ballistic Footwork",
    experience: "11+ Years • Pro Combat Conditioning Lead",
    videoClip: "/videos/gym-4-combat-striking.mp4",
    poster: "/images/zones/hybrid-combat-hall.jpg",
    cameraZone: "combat-rig" as CameraZone,
    accent: "#FF2A54" as const,
    availability: "Tue–Sun • 13:00 - 22:00",
    signatureRoutine: "Apex Heavy-Bag & Hardwood Speed-Rope Circuit",
  },
  {
    id: "tr-4",
    name: "Nadia Vance, CPT",
    role: "Posterior Chain & Endurance Sprint Coach",
    specialty: "Wide-Grip Pull-Up Architecture, Treadmill Velocity & Mobility",
    experience: "8+ Years • Biomechanical Posture Specialist",
    videoClip: "/videos/gym-7-pullup-mastery.mp4",
    poster: "/images/zones/functional-cardio-deck.jpg",
    cameraZone: "cyber-cardio" as CameraZone,
    accent: "#CCFF00" as const,
    availability: "Mon–Fri • 07:00 - 16:00 (In-Gym & Live Online)",
    signatureRoutine: "Titan Pull-Up & Linear LED Sprint Routine",
  },
];

const ROUTINE_PLANS = [
  {
    id: "routine-hypertrophy",
    title: "Routine A • Iron Forge Mass & Strength Split",
    level: "Intermediate to Pro",
    daysPerWeek: "4 or 5 Sessions / Week",
    sessionDuration: "60 Mins / Session",
    recommendedTrainer: "Kaelen Thorne, CSCS",
    cameraZone: "iron-forge" as CameraZone,
    loadKg: 50,
    accent: "#FF2A54",
    schedule: [
      "Day 1: Heavy Crimson Dumbbell Rows, Weighted Pull-Ups & Lat Isolation",
      "Day 2: Tactical Bunker Pec-Fly, Incline Dumbbell Press & Anterior Delts",
      "Day 3: Active Recovery & Free Online Home Basic Mobility Demo",
      "Day 4: Lower-Body Posterior Chain, Bulgarian Split Squats & Core",
      "Day 5: Full Upper-Body Myofibrillar Overload & Arm Finisher",
    ],
  },
  {
    id: "routine-shred-combat",
    title: "Routine B • Combat Shred & Metabolic Conditioning",
    level: "All Levels (Scalable)",
    daysPerWeek: "4 Sessions / Week",
    sessionDuration: "45 - 55 Mins / Session",
    recommendedTrainer: "Dante Morales",
    cameraZone: "combat-rig" as CameraZone,
    loadKg: 35,
    accent: "#CCFF00",
    schedule: [
      "Day 1: 8-Round Chained Heavy-Bag Boxing Combinations & Core Torque",
      "Day 2: Sprung-Hardwood Speed-Rope Plyometrics & Anaerobic Footwork",
      "Day 3: Linear LED Treadmill Velocity Sprints & Lactate Threshold",
      "Day 4: Titan Yellow Rig Wide-Grip Pull-Ups & Functional Conditioning",
    ],
  },
  {
    id: "routine-home-beginner",
    title: "Routine C • Free Online Home Basic Demo & Foundation",
    level: "Beginner & At-Home Friendly",
    daysPerWeek: "3 Live Online Sessions + 1 Optional Gym Visit",
    sessionDuration: "30 - 40 Mins / Session",
    recommendedTrainer: "Zara Lin, M.Sc.",
    cameraZone: "altitude-lab" as CameraZone,
    loadKg: 15,
    accent: "#00F0FF",
    schedule: [
      "Session 1 (Free Online Live): Basic Pushup & Pike Calisthenics Form Class",
      "Session 2 (Free Online Live): At-Home Cardio Rhythm, Shadow Boxing & Core",
      "Session 3 (Free Online Live): Posture Alignment, Joint Mobility & Dumbbell Basics",
      "Bonus In-Gym Pass: Complimentary 1-on-1 3D Biomechanical Assessment Session",
    ],
  },
];

const SPECIAL_OFFERS = [
  {
    id: "offer-1",
    badge: "100% FREE STARTER OFFER",
    title: "Free Online Home Basic Demo Fitness Classes + 1 Gym Pass",
    discount: "FREE ($0)",
    regularValue: "$120 Value",
    promoCode: "FREEDEMO3D",
    desc: "Join our live interactive online home basic demo fitness classes (no equipment needed) plus enjoy 1 complimentary in-gym training session with a certified trainer.",
    perks: [
      "3 Live Online Home Basic Demo Classes (Calisthenics, Cardio & Mobility)",
      "Instant HD On-Demand Home Demo Video Stream",
      "1 Complimentary In-Gym Session & 3D Body Scan",
    ],
    ctaLabel: "Avail Free Home Demo Offer",
    targetMode: "Free Online Home Basic Demo Class",
  },
  {
    id: "offer-2",
    badge: "MOST POPULAR • SAVE 40%",
    title: "30-Day Custom Routine + 4 Personal Trainer Sessions Bundle",
    discount: "$129 / first month",
    regularValue: "$215 Regular",
    promoCode: "FORGE40",
    desc: "Book your training with full 24/7 access to all 4 architectural sectors, a personalized weekly workout routine, and 4 private 1-on-1 trainer sessions.",
    perks: [
      "Select Any Certified Trainer from Our Roster",
      "Custom Weekly Hypertrophy, Combat, or Cardio Routine",
      "Unlimited Access to All 4 Sectors & Recovery Cryo Lounge",
    ],
    ctaLabel: "Avail 40% Off Training Offer",
    targetMode: "1-on-1 Personal Trainer Session (In-Gym)",
  },
  {
    id: "offer-3",
    badge: "HOME + GYM HYBRID BUNDLE",
    title: "3D CNC Smart Dumbbell Pair + 60-Day All-Access Training",
    discount: "$150 OFF BUNDLE",
    regularValue: "Code: HYBRID150",
    promoCode: "HYBRID150",
    desc: "Own our precision 3D CNC Smart Dumbbells for your home basic & advanced workouts while enjoying 60 days of unlimited in-gym and online trainer sessions.",
    perks: [
      "190,000 PSI Knurled Steel Dumbbell Pair Delivered in 24h",
      "Unlimited Live Online Home Classes & In-Gym Sessions",
      "Lifetime Structural Hardware Warranty",
    ],
    ctaLabel: "Avail $150 Hybrid Offer",
    targetMode: "Hybrid In-Gym + Online Home Routine",
  },
];

const FREE_ONLINE_HOME_CLASSES = [
  {
    id: "home-1",
    code: "FREE HOME DEMO 01",
    title: "Zero-Equipment Pushup, Pike & Core Foundation",
    coach: "Zara Lin, M.Sc.",
    duration: "30 Mins • Beginner Friendly",
    schedule: "Daily Live at 08:00 AM & 06:30 PM (or Watch Instant Demo)",
    videoSrc: "/videos/gym-1-altitude-calisthenics.mp4",
    posterImg: "/images/zones/cyber-neon-alley.jpg",
    equipment: "No Equipment Needed (Floor Mat Optional)",
    whatYouLearn:
      "Master scapular control, Tempo pushups, pike shoulder alignment, and deep core bracing right from your living room.",
  },
  {
    id: "home-2",
    code: "FREE HOME DEMO 02",
    title: "At-Home Cardio Footwork, Jump Rhythm & Fat-Burn",
    coach: "Dante Morales",
    duration: "25 Mins • All Fitness Levels",
    schedule: "Daily Live at 12:00 PM & 07:30 PM (or Watch Instant Demo)",
    videoSrc: "/videos/gym-2-agility-conditioning.mp4",
    posterImg: "/images/zones/functional-cardio-deck.jpg",
    equipment: "Jump Rope or Zero-Rope Shadow Footwork",
    whatYouLearn:
      "High-energy low-impact anaerobic rhythm intervals designed to torch calories in a 6x6ft home floor space.",
  },
  {
    id: "home-3",
    code: "FREE HOME DEMO 03",
    title: "Home Basic Dumbbell & Backpack Unilateral Back Row",
    coach: "Kaelen Thorne, CSCS",
    duration: "35 Mins • Foundation Strength",
    schedule: "Tue / Thu / Sat Live at 05:30 PM (or Watch Instant Demo)",
    videoSrc: "/videos/gym-3-hypertrophy-row.mp4",
    posterImg: "/images/zones/iron-forge-rack.jpg",
    equipment: "1 Pair of Dumbbells (or Weighted Household Pack)",
    whatYouLearn:
      "Learn proper spine bracing, elbow path, and lat activation so you never strain your lower back during home or gym rows.",
  },
];

const FACILITY_SECTORS = [
  {
    id: "sec-1",
    name: "Sector 01 • Iron Forge Free-Weight Sanctuary",
    photo: "/images/zones/iron-forge-rack.jpg",
    videoPreview: "/videos/gym-3-hypertrophy-row.mp4",
    address: "742 Obsidian Tower, Level B1, Cyber District, Austin TX",
    hours: "24/7 Biometric Member Access • Staffed 05:00 - 23:00",
    cameraZone: "iron-forge" as CameraZone,
    tags: [
      "24 Multi-Angle Benches",
      "2.5kg–75kg Urethane Dumbbells",
      "Calibrated Powerlifting Racks",
      "Chalk & Lifting Belt Station",
    ],
  },
  {
    id: "sec-2",
    name: "Sector 02 • Cyber Neon Linear Velocity Alley",
    photo: "/images/zones/cyber-neon-alley.jpg",
    videoPreview: "/videos/gym-6-endurance-treadmill.mp4",
    address: "742 Obsidian Tower, Level 2 North Wing, Austin TX",
    hours: "24/7 Biometric Member Access • Hypoxic Coach 06:00 - 22:00",
    cameraZone: "cyber-cardio" as CameraZone,
    tags: [
      "Overhead Linear LED Pacing",
      "Technogym Skillrun 25km/h Fleet",
      "O2 Deprivation Calisthenics Turf",
      "Live VO2 Telemetry Wall",
    ],
  },
  {
    id: "sec-3",
    name: "Sector 03 • Kinetic Sprung-Hardwood Cardio Deck",
    photo: "/images/zones/functional-cardio-deck.jpg",
    videoPreview: "/videos/gym-2-agility-conditioning.mp4",
    address: "742 Obsidian Tower, Mezzanine Overlook, Austin TX",
    hours: "05:00 - 23:30 Daily • Group Conditioning Every Hour",
    cameraZone: "cyber-cardio" as CameraZone,
    tags: [
      "Shock-Absorbing Hardwood Floor",
      "Full-Height Acoustic Mirrors",
      "Speed-Rope & Plyometric Lane",
      "Metabolic Watt Rowers",
    ],
  },
  {
    id: "sec-4",
    name: "Sector 04 • Apex Combat & Titan Yellow Bridge Hall",
    photo: "/images/zones/hybrid-combat-hall.jpg",
    videoPreview: "/videos/gym-4-combat-striking.mp4",
    address: "742 Obsidian Tower, Level 3 Penthouse Arena, Austin TX",
    hours: "06:00 - 23:00 Daily • Pro Sparring & Pull-Up Clinics",
    cameraZone: "combat-rig" as CameraZone,
    tags: [
      "150lb Hydraulic Heavy Bags",
      "Titan Yellow Wide-Grip Bridge Rig",
      "Tactical Acid-Green Pec Fly Bunker",
      "Cryo & Infrared Recovery Suite",
    ],
  },
];

export default function HomePage() {
  const {
    catalog,
    activeCameraZone,
    setActiveCameraZone,
    active3DLoadKg,
    setActive3DLoadKg,
    active3DAccent,
    setActive3DAccent,
    addToCart,
  } = useStore();

  const [selectedRoutine, setSelectedRoutine] = useState(ROUTINE_PLANS[0]);
  const [activeHomeDemo, setActiveHomeDemo] = useState(
    FREE_ONLINE_HOME_CLASSES[0]
  );
  const [claimedOfferCode, setClaimedOfferCode] = useState<string | null>(null);

  // Interactive Booking Form State — connects with Trainers, Routines, Offers & Free Online Home Classes
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    sessionMode: "1-on-1 Personal Trainer Session (In-Gym)",
    trainer: "Kaelen Thorne, CSCS",
    routine: "Routine A • Iron Forge Mass & Strength Split",
    offerCode: "FORGE40 (40% Off First Month + 4 Trainer Sessions)",
    preferredDate: "2026-11-25",
    notes: "",
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.fullName || !bookingForm.email) return;
    setBookingSubmitted(true);
  };

  // Helper to pre-fill the booking form and scroll smoothly to #book-eye-exam
  const prefillAndScrollToBooking = (updates: Partial<typeof bookingForm>) => {
    setBookingForm((prev) => ({ ...prev, ...updates }));
    setBookingSubmitted(false);
    const el = document.getElementById("book-eye-exam");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const featuredSmartDumbbell = catalog.find(
    (c) => c.id === "gear-forge-home-dumbbell-set"
  );

  return (
    <div className="relative">
      {/* =====================================================================
          1. DYNAMIC 3D HERO SECTION + BOOK TRAINING / ROUTINE / FREE HOME DEMO
          ===================================================================== */}
      <section
        id="hero-3d"
        className="scroll-mt-28 min-h-[calc(100vh-5rem)] flex items-center py-12 lg:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Columns: High-Impact Value Proposition & Quick-Jump CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-volt text-xs font-mono text-volt">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BOOK YOUR TRAINING • SELECT TRAINERS • FREE HOME DEMOS</span>
                <span className="text-slate-500">|</span>
                <span className="text-cyanLED">INTERACTIVE 3D WEBGL</span>
              </div>

              <h1 className="font-display text-5xl sm:text-7xl xl:text-8xl uppercase tracking-tight leading-[0.92] text-white">
                BOOK YOUR{" "}
                <span className="text-volt text-glow-volt block sm:inline">
                  3D TRAINING SESSION
                </span>{" "}
                & CUSTOM ROUTINE.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Welcome to <strong className="text-white">AetherForge</strong>.{" "}
                <strong className="text-volt">Book your training</strong> or{" "}
                <strong className="text-volt">book your session</strong> across
                our 4 obsidian sectors,{" "}
                <strong className="text-white">select from our trainers</strong>,{" "}
                <strong className="text-white">choose your routine</strong>,{" "}
                <strong className="text-cyanLED">avail our offers</strong>, or
                start today from your living room with our{" "}
                <strong className="text-cyanLED underline decoration-cyanLED/50">
                  free online home basic demo fitness classes
                </strong>
                .
              </p>

              {/* Primary & Secondary Quick-Jump CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/#book-eye-exam"
                  className="h-13 px-6 py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-sm uppercase tracking-wider hover:bg-volt/90 transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(204,255,0,0.35)]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Your Training Session</span>
                </Link>

                <Link
                  href="/#free-online-classes"
                  className="h-13 px-5 py-3.5 rounded-xl bg-cyanLED/15 border border-cyanLED/50 hover:bg-cyanLED hover:text-obsidian text-cyanLED font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <Laptop className="w-4 h-4" />
                  <span>Free Online Home Demo Classes</span>
                </Link>

                <Link
                  href="/#select-trainers"
                  className="h-13 px-5 py-3.5 rounded-xl glass-panel hover:border-volt/50 text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-volt" />
                  <span>Select Trainers & Routines</span>
                </Link>

                <Link
                  href="/#avail-offers"
                  className="h-13 px-5 py-3.5 rounded-xl glass-panel hover:border-crimson/50 text-slate-200 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <Gift className="w-4 h-4 text-crimson" />
                  <span>Avail Offers (40% Off)</span>
                </Link>
              </div>

              {/* 3D Camera Zone Quick-Pan Switcher Bar */}
              <div className="pt-4">
                <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5 text-volt" />
                  <span>
                    Interactive 3D Camera Pan — Inspect Your Training Sector:
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {CAMERA_ZONE_PRESETS.map((z) => {
                    const active = activeCameraZone === z.id;
                    return (
                      <button
                        key={z.id}
                        type="button"
                        onClick={() => {
                          setActiveCameraZone(z.id);
                          setActive3DAccent(z.accent);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          active
                            ? "bg-volt/15 border-volt text-white shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                            : "glass-panel border-white/10 text-slate-300 hover:border-white/30"
                        }`}
                      >
                        <span className="text-[10px] font-mono font-bold text-volt block truncate">
                          {z.label}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                          {z.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Live 3D CNC Smart Dumbbell HUD Configurator Card */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl glass-panel-volt shadow-2xl space-y-5 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyanLED block">
                      CONFIGURE YOUR ROUTINE HARDWARE IN 3D
                    </span>
                    <h2 className="text-lg font-bold text-white mt-0.5 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-volt" />
                      3D CNC Dumbbell & Load Selector
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-obsidian border border-volt/40 text-volt font-mono text-xs font-bold">
                    {active3DLoadKg} KG LOAD
                  </span>
                </div>

                {/* Weight Plate Load Selector */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-slate-300">
                      1. CHOOSE ROUTINE RESISTANCE LOAD:
                    </span>
                    <span className="text-volt font-bold">
                      {active3DLoadKg <= 20
                        ? "Home Demo / Beginner (4 Plates)"
                        : active3DLoadKg <= 38
                        ? "Athletic Conditioning (6 Plates)"
                        : "Pro Hypertrophy (8 Plates)"}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 25, 35, 50].map((kg) => (
                      <button
                        key={kg}
                        type="button"
                        onClick={() => setActive3DLoadKg(kg)}
                        className={`py-2.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                          active3DLoadKg === kg
                            ? "bg-volt text-obsidian border-volt shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                            : "bg-obsidian/80 text-slate-300 border-white/10 hover:border-volt/40"
                        }`}
                      >
                        {kg} KG
                      </button>
                    ))}
                  </div>
                </div>

                {/* Emissive Laser Rim Color Selector */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-slate-300">
                      2. LASER-ETCHED TELEMETRY RING FINISH:
                    </span>
                    <span
                      className="font-bold uppercase"
                      style={{ color: active3DAccent }}
                    >
                      {active3DAccent === "#CCFF00"
                        ? "ACID VOLT"
                        : active3DAccent === "#00F0FF"
                        ? "CYBER CYAN"
                        : "CRIMSON IRON"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { hex: "#CCFF00", name: "Acid Volt" },
                      { hex: "#00F0FF", name: "Cyber Cyan" },
                      { hex: "#FF2A54", name: "Crimson Iron" },
                    ].map((col) => (
                      <button
                        key={col.hex}
                        type="button"
                        onClick={() => setActive3DAccent(col.hex)}
                        className={`py-2.5 px-3 rounded-xl font-mono text-xs border flex items-center justify-center gap-2 transition-all ${
                          active3DAccent === col.hex
                            ? "bg-white/15 border-white text-white font-bold"
                            : "bg-obsidian/80 border-white/10 text-slate-400 hover:text-white"
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Action Pill Box */}
                <div className="p-3.5 rounded-2xl bg-obsidian/90 border border-white/10 grid grid-cols-3 gap-2 text-center font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 block">
                      HOME CLASSES
                    </span>
                    <span className="text-xs font-bold text-cyanLED">
                      100% FREE DEMO
                    </span>
                  </div>
                  <div className="border-x border-white/10">
                    <span className="text-[10px] text-slate-500 block">
                      CERTIFIED COACHES
                    </span>
                    <span className="text-xs font-bold text-white">
                      1-ON-1 SESSIONS
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">
                      NEW MEMBER OFFER
                    </span>
                    <span className="text-xs font-bold text-volt">
                      40% OFF PASS
                    </span>
                  </div>
                </div>

                {/* Direct Reserve Hardware or Book Free Class CTA */}
                {featuredSmartDumbbell && (
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">
                        HOME & STUDIO 3D DUMBBELL PAIR
                      </span>
                      <span className="text-xl font-mono font-bold text-white">
                        ${featuredSmartDumbbell.price}{" "}
                        <span className="text-xs font-normal text-volt">
                          ({active3DLoadKg}kg Spec)
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          prefillAndScrollToBooking({
                            sessionMode:
                              "Free Online Home Basic Demo Class",
                            offerCode:
                              "FREEDEMO3D (Free Online Home Basic Demo + 1 Gym Pass)",
                          })
                        }
                        className="px-3.5 py-3 rounded-xl bg-cyanLED/20 border border-cyanLED/50 text-cyanLED hover:bg-cyanLED hover:text-obsidian font-mono font-bold text-xs uppercase transition-all"
                      >
                        Free Home Demo
                      </button>
                      <button
                        type="button"
                        onClick={() => addToCart(featuredSmartDumbbell)}
                        className="px-4 py-3 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs uppercase tracking-wider hover:bg-volt/90 transition-all shrink-0"
                      >
                        + Order Pair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. SELECT FROM OUR TRAINERS & CHOOSE YOUR ROUTINE
          ===================================================================== */}
      <section
        id="select-trainers"
        className="scroll-mt-28 py-20 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* 2A. Select From Our Trainers */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="px-3 py-1 rounded-full bg-volt/15 border border-volt/40 text-volt text-xs font-mono uppercase tracking-widest inline-flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5" />
                  SELECT FROM OUR TRAINERS • 1-ON-1 IN-GYM & ONLINE COACHES
                </span>
                <h2 className="mt-3 font-display text-3xl sm:text-5xl tracking-wide text-white uppercase">
                  SELECT FROM OUR{" "}
                  <span className="text-volt">ELITE TRAINERS</span>
                </h2>
                <p className="mt-2 text-sm text-slate-300 max-w-2xl">
                  Choose your personal performance coach below. Clicking{" "}
                  <strong className="text-volt">
                    &quot;Select Trainer & Book Session&quot;
                  </strong>{" "}
                  automatically locks in your trainer, syncs the 3D WebGL
                  camera to their training zone, and loads their signature
                  routine into your session booking form.
                </p>
              </div>
              <Link
                href="/#book-eye-exam"
                className="px-5 py-3 rounded-xl bg-charcoal border border-volt/40 text-volt hover:bg-volt hover:text-obsidian font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start md:self-auto shrink-0 transition-all"
              >
                <span>Jump to Session Booking Desk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TRAINER_PROFILES.map((trainer) => (
                <div
                  key={trainer.id}
                  onMouseEnter={() => {
                    setActiveCameraZone(trainer.cameraZone);
                    setActive3DAccent(trainer.accent);
                  }}
                  className="rounded-2xl glass-panel border border-white/10 hover:border-volt/50 overflow-hidden flex flex-col justify-between transition-all group shadow-xl"
                >
                  <div>
                    <div className="relative h-56 bg-obsidian overflow-hidden">
                      <video
                        src={trainer.videoClip}
                        poster={trainer.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-obsidian/90 border border-volt/40 text-volt text-[10px] font-mono font-bold">
                        {trainer.experience}
                      </span>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyanLED block">
                          {trainer.role}
                        </span>
                        <h3 className="text-lg font-bold text-white">
                          {trainer.name}
                        </h3>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {trainer.specialty}
                      </p>
                      <div className="p-2.5 rounded-xl bg-obsidian/80 border border-white/5 text-[11px] font-mono space-y-1">
                        <div>
                          <span className="text-slate-500 block text-[9px] uppercase">
                            SIGNATURE ROUTINE
                          </span>
                          <span className="text-volt font-semibold">
                            {trainer.signatureRoutine}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px] uppercase">
                            SESSION SCHEDULE
                          </span>
                          <span className="text-slate-300">
                            {trainer.availability}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCameraZone(trainer.cameraZone);
                        setActive3DAccent(trainer.accent);
                        prefillAndScrollToBooking({
                          trainer: trainer.name,
                          routine: trainer.signatureRoutine,
                        });
                      }}
                      className="w-full py-3 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs uppercase tracking-wider hover:bg-volt/90 transition-all"
                    >
                      Select Trainer & Book Session
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2B. Choose Your Routine (Interactive Routine Architect) */}
          <div id="choose-routine" className="scroll-mt-28 pt-4">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div>
                <span className="px-3 py-1 rounded-full bg-cyanLED/15 border border-cyanLED/40 text-cyanLED text-xs font-mono uppercase tracking-widest inline-flex items-center gap-2">
                  <ListChecks className="w-3.5 h-3.5" />
                  CHOOSE YOUR ROUTINE • CUSTOM WEEKLY TRAINING SPLITS
                </span>
                <h3 className="mt-3 font-display text-3xl sm:text-5xl text-white uppercase">
                  CHOOSE YOUR <span className="text-cyanLED">TRAINING ROUTINE</span>
                </h3>
                <p className="mt-2 text-sm text-slate-300 max-w-2xl">
                  Whether you want maximum free-weight hypertrophy, explosive
                  heavy-bag combat shred, or our{" "}
                  <strong className="text-volt">
                    Free Online Home Basic Demo Foundation Routine
                  </strong>
                  , select a plan below to inspect the day-by-day split and book
                  your session.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 5 Columns: Routine Selector Cards */}
              <div className="lg:col-span-5 space-y-3">
                {ROUTINE_PLANS.map((plan) => {
                  const isSelected = selectedRoutine.id === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => {
                        setSelectedRoutine(plan);
                        setActiveCameraZone(plan.cameraZone);
                        setActive3DLoadKg(plan.loadKg);
                        setActive3DAccent(plan.accent);
                      }}
                      className={`w-full text-left p-5 rounded-2xl border transition-all ${
                        isSelected
                          ? "bg-volt/15 border-volt shadow-[0_0_25px_rgba(204,255,0,0.2)]"
                          : "glass-panel border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-obsidian text-cyanLED border border-cyanLED/30 font-mono text-[10px] font-bold uppercase">
                          {plan.level}
                        </span>
                        <span className="text-xs font-mono font-bold text-volt">
                          {plan.daysPerWeek}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-2">
                        {plan.title}
                      </h4>
                      <p className="text-xs font-mono text-slate-400 mt-1">
                        Lead Trainer: {plan.recommendedTrainer} •{" "}
                        {plan.sessionDuration}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Right 7 Columns: Selected Routine Day-by-Day Breakdown & Instant Booking */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel-volt space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-mono uppercase text-volt block">
                      SELECTED ROUTINE BLUEPRINT • 3D LOAD SYNCED ({selectedRoutine.loadKg} KG)
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                      {selectedRoutine.title}
                    </h4>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-obsidian border border-cyanLED/40 text-cyanLED font-mono text-xs font-bold">
                    Coach: {selectedRoutine.recommendedTrainer}
                  </span>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase text-slate-400 block">
                    Weekly Session-by-Session Breakdown:
                  </span>
                  {selectedRoutine.schedule.map((step, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-obsidian/85 border border-white/10 flex items-center gap-3 text-xs sm:text-sm text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-volt shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs font-mono text-slate-400">
                    Duration:{" "}
                    <strong className="text-white">
                      {selectedRoutine.sessionDuration}
                    </strong>{" "}
                    • Frequency:{" "}
                    <strong className="text-volt">
                      {selectedRoutine.daysPerWeek}
                    </strong>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      prefillAndScrollToBooking({
                        routine: selectedRoutine.title,
                        trainer: selectedRoutine.recommendedTrainer,
                        sessionMode:
                          selectedRoutine.id === "routine-home-beginner"
                            ? "Free Online Home Basic Demo Class"
                            : "1-on-1 Personal Trainer Session (In-Gym)",
                      })
                    }
                    className="px-6 py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs uppercase tracking-wider hover:bg-volt/90 transition-all shadow-[0_0_20px_rgba(204,255,0,0.25)]"
                  >
                    Choose This Routine & Book Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. AVAIL OUR OFFERS & FREE ONLINE HOME BASIC DEMO FITNESS CLASSES
          ===================================================================== */}
      <section
        id="avail-offers"
        className="scroll-mt-28 py-20 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* 3A. Avail Our Special Offers */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="px-3 py-1 rounded-full bg-crimson/20 border border-crimson/50 text-crimson text-xs font-mono uppercase tracking-widest inline-flex items-center gap-2 font-bold">
                  <BadgePercent className="w-3.5 h-3.5" />
                  AVAIL OUR OFFERS • LIMITED-TIME TRAINING & HOME DEMO PROMOS
                </span>
                <h2 className="mt-3 font-display text-3xl sm:text-5xl text-white uppercase">
                  AVAIL OUR <span className="text-volt">EXCLUSIVE OFFERS</span>
                </h2>
                <p className="mt-2 text-sm text-slate-300 max-w-2xl">
                  Lock in our 40% off personal trainer & routine bundle, our
                  $150 off 3D Smart Dumbbell hybrid package, or claim your{" "}
                  <strong className="text-cyanLED">
                    100% Free Online Home Basic Demo Fitness Classes
                  </strong>{" "}
                  with 1 click.
                </p>
              </div>
              {claimedOfferCode && (
                <div className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    Offer Code {claimedOfferCode} Applied to Booking Form!
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {SPECIAL_OFFERS.map((offer) => (
                <div
                  key={offer.id}
                  className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 hover:border-volt/50 flex flex-col justify-between gap-6 transition-all shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-volt/15 border border-volt/40 text-volt font-mono text-[10px] font-bold uppercase">
                        {offer.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400 line-through">
                        {offer.regularValue}
                      </span>
                    </div>

                    <div>
                      <div className="font-display text-3xl sm:text-4xl text-white">
                        {offer.discount}
                      </div>
                      <h3 className="text-lg font-bold text-white mt-1">
                        {offer.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {offer.desc}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-white/10">
                      {offer.perks.map((p, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyanLED shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">PROMO CODE:</span>
                      <span className="px-2.5 py-1 rounded bg-obsidian border border-volt/40 text-volt font-bold">
                        {offer.promoCode}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setClaimedOfferCode(offer.promoCode);
                        prefillAndScrollToBooking({
                          offerCode: `${offer.promoCode} (${offer.title})`,
                          sessionMode: offer.targetMode,
                        });
                      }}
                      className="w-full py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs uppercase tracking-wider hover:bg-volt/90 transition-all"
                    >
                      {offer.ctaLabel}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3B. Free Online Home Basic Demo Fitness Classes Hub */}
          <div
            id="free-online-classes"
            className="scroll-mt-28 p-6 sm:p-10 rounded-3xl glass-panel-volt space-y-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-cyanLED/20 border border-cyanLED/50 text-cyanLED text-xs font-mono uppercase tracking-widest inline-flex items-center gap-2 font-bold">
                  <Laptop className="w-3.5 h-3.5" />
                  100% FREE ONLINE HOME BASIC DEMO FITNESS CLASSES
                </span>
                <h3 className="mt-3 font-display text-3xl sm:text-5xl text-white uppercase">
                  TRAIN FROM HOME:{" "}
                  <span className="text-cyanLED">
                    FREE BASIC DEMO FITNESS CLASSES
                  </span>
                </h3>
                <p className="mt-2 text-sm text-slate-300 max-w-3xl">
                  Not ready to step into the physical arena yet? Stream our{" "}
                  <strong className="text-white">
                    free online home basic demo fitness classes
                  </strong>{" "}
                  right now or book a live interactive Zoom/WebGL home coaching
                  slot with our trainers—zero credit card or heavy equipment
                  required.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  prefillAndScrollToBooking({
                    sessionMode: "Free Online Home Basic Demo Class",
                    routine:
                      "Routine C • Free Online Home Basic Demo & Foundation",
                    trainer: activeHomeDemo.coach,
                    offerCode:
                      "FREEDEMO3D (Free Online Home Basic Demo + 1 Gym Pass)",
                  })
                }
                className="px-6 py-3.5 rounded-xl bg-cyanLED text-obsidian font-mono font-bold text-xs uppercase tracking-wider hover:bg-cyanLED/90 transition-all shrink-0 self-start lg:self-auto shadow-[0_0_25px_rgba(0,240,255,0.3)]"
              >
                Book Live Free Home Demo Class
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 5 Columns: 3 Free Home Basic Demo Classes List */}
              <div className="lg:col-span-5 space-y-3">
                {FREE_ONLINE_HOME_CLASSES.map((cls) => {
                  const isSelected = activeHomeDemo.id === cls.id;
                  return (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => setActiveHomeDemo(cls)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        isSelected
                          ? "bg-cyanLED/15 border-cyanLED shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                          : "bg-obsidian/80 border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-charcoal text-volt border border-volt/30 font-mono text-[10px] font-bold">
                          {cls.code} • $0 FREE
                        </span>
                        <span className="text-[11px] font-mono text-cyanLED">
                          {cls.duration}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-2">
                        {cls.title}
                      </h4>
                      <p className="text-xs font-mono text-slate-400 mt-1">
                        Instructor: {cls.coach}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Right 7 Columns: Instant Free Home Class Video Preview & 1-Click Registration */}
              <div className="lg:col-span-7 rounded-2xl bg-obsidian/90 border border-white/15 overflow-hidden">
                <div className="relative aspect-video bg-obsidian">
                  <video
                    key={activeHomeDemo.videoSrc}
                    src={activeHomeDemo.videoSrc}
                    poster={activeHomeDemo.posterImg}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40" />
                  <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-obsidian/90 border border-cyanLED text-cyanLED text-xs font-mono font-bold flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-cyanLED" />
                      INSTANT HOME DEMO PREVIEW • {activeHomeDemo.code}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-mono font-bold">
                      100% FREE ONLINE CLASS
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs font-mono text-volt block">
                      {activeHomeDemo.schedule}
                    </span>
                    <h4 className="text-xl font-bold text-white">
                      {activeHomeDemo.title}
                    </h4>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeHomeDemo.whatYouLearn}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <div className="text-xs font-mono text-slate-400">
                      Required Gear:{" "}
                      <strong className="text-cyanLED">
                        {activeHomeDemo.equipment}
                      </strong>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        prefillAndScrollToBooking({
                          sessionMode: "Free Online Home Basic Demo Class",
                          trainer: activeHomeDemo.coach,
                          routine: `Free Home Demo: ${activeHomeDemo.title}`,
                          offerCode:
                            "FREEDEMO3D (Free Online Home Basic Demo + 1 Gym Pass)",
                        })
                      }
                      className="px-5 py-2.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs uppercase tracking-wider hover:bg-volt/90 transition-all"
                    >
                      Join This Free Online Class
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. DUAL-STATE PRODUCT & TRAINING SHOWCASE (Photo -> Hover Video Clip)
          ===================================================================== */}
      <section
        id="programs-showcase"
        className="scroll-mt-28 py-20 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="px-3 py-1 rounded-full bg-cyanLED/15 border border-cyanLED/40 text-cyanLED text-xs font-mono uppercase tracking-widest inline-flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" />
                BOOK YOUR SESSION OR ROUTINE • STUDIO PHOTO → HOVER MOTION VIDEO
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-5xl tracking-wide text-white uppercase">
                ARCHITECTURAL ZONES &{" "}
                <span className="text-volt">TRAINING ROUTINES</span>
              </h2>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl">
                Hover any routine card below to preview its live athlete
                training video clip and click{" "}
                <strong className="text-volt">&quot;Book Session&quot;</strong>{" "}
                to reserve your spot immediately.
              </p>
            </div>

            <Link
              href="/shop"
              className="h-11 px-5 rounded-xl bg-charcoal border border-volt/40 text-volt hover:bg-volt hover:text-obsidian font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start md:self-auto shrink-0 transition-all"
            >
              <span>Browse All {catalog.length} Routines & Gear (/shop)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {catalog.map((item) => (
              <DualStateProgramCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. PHASE 2: 7-CLIP INTERACTIVE 3D MOTION TELEMETRY VAULT
          ===================================================================== */}
      <MotionVaultSection />

      {/* =====================================================================
          6. RICH ABOUT SECTION: OUR STORY, TRUST METRICS, KEY FEATURES & PERKS
             (Required Standard 1.3 & 2.1.3 with exact #ids and scroll-mt-28)
          ===================================================================== */}
      <section
        id="our-story"
        className="scroll-mt-28 py-20 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* 6A. Brand Story & Trust Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="px-3 py-1 rounded-full bg-volt/15 border border-volt/40 text-volt text-xs font-mono uppercase tracking-widest">
                #OUR-STORY • IN-GYM & ONLINE HOME TRAINING ECOSYSTEM
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-white uppercase tracking-wide leading-tight">
                TRAIN IN OUR 3D ARENA OR START WITH{" "}
                <span className="text-volt">FREE HOME DEMO CLASSES.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Founded by sports biomechanists and 3D lighting architects,
                AetherForge makes elite coaching accessible everywhere. Book
                your training in our{" "}
                <strong className="text-white">24-bench Iron Forge rack</strong>,{" "}
                <strong className="text-white">
                  overhead linear-LED sprint corridor
                </strong>
                ,{" "}
                <strong className="text-white">
                  sprung-hardwood plyometric deck
                </strong>
                , and{" "}
                <strong className="text-white">
                  Titan yellow-bridge combat hall
                </strong>
                —or start from home with our{" "}
                <strong className="text-cyanLED">
                  free online home basic demo fitness classes
                </strong>
                .
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Select from our trainers, choose your routine, avail our seasonal
                offers, and track every session in your Member Dashboard.
              </p>
            </div>

            {/* Trust Metrics 2x2 Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {[
                {
                  metric: "4,850+",
                  label: "In-Gym & Home Athletes",
                  sub: "98.4% Routine Completion Rate",
                  icon: Users,
                  color: "text-volt",
                },
                {
                  metric: "100% FREE",
                  label: "Online Home Demo Classes",
                  sub: "Live Daily Beginner & Basic Sessions",
                  icon: Laptop,
                  color: "text-cyanLED",
                },
                {
                  metric: "100% Certified",
                  label: "CSCS & M.Sc. Trainers",
                  sub: "Select Your Personal Coach Anytime",
                  icon: Award,
                  color: "text-crimson",
                },
                {
                  metric: "4.98 / 5.0 ★",
                  label: "Verified Member Rating",
                  sub: "Across 1,420+ Athlete Reviews",
                  icon: Flame,
                  color: "text-volt",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-volt/40 transition-all"
                >
                  <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
                  <div className="font-display text-3xl sm:text-4xl text-white">
                    {stat.metric}
                  </div>
                  <div className="text-sm font-bold text-slate-200 mt-1">
                    {stat.label}
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6B. Key Business Features Grid (#key-features with scroll-mt-28) */}
          <div id="key-features" className="scroll-mt-28 pt-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="px-3 py-1 rounded-full bg-cyanLED/15 border border-cyanLED/40 text-cyanLED text-xs font-mono uppercase tracking-widest">
                #KEY-FEATURES • EVERYTHING YOU NEED TO SUCCEED
              </span>
              <h3 className="mt-3 font-display text-3xl sm:text-4xl text-white uppercase">
                SIX REASONS TO{" "}
                <span className="text-cyanLED">BOOK YOUR TRAINING TODAY</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Book Your Session in 30 Seconds",
                  desc: "Reserve in-gym 1-on-1 training slots, group combat classes, or free online home demo sessions with instant confirmation.",
                  badge: "INSTANT BOOKING",
                },
                {
                  title: "Select From Our Certified Trainers",
                  desc: "Match with specialists in heavy dumbbell hypertrophy, hypoxic calisthenics, Muay Thai striking, or beginner home mobility.",
                  badge: "ELITE COACH ROSTER",
                },
                {
                  title: "Choose Your Custom Routine",
                  desc: "Follow structured 3-day, 4-day, or 5-day weekly routines tailored to your exact fitness level and equipment access.",
                  badge: "CUSTOM ROUTINES",
                },
                {
                  title: "Avail Our Exclusive Offers",
                  desc: "Save 40% on your first month with 4 private trainer sessions included, or claim $150 off our 3D Smart Dumbbell bundle.",
                  badge: "PROMO OFFERS",
                },
                {
                  title: "Free Online Home Basic Demo Classes",
                  desc: "Zero-cost beginner-friendly home workouts streamed live daily so you can build foundational form before stepping into the gym.",
                  badge: "100% FREE HOME DEMO",
                },
                {
                  title: "Calibrated 3D CNC Smart Hardware",
                  desc: "Train with 190,000 PSI knurled steel dumbbells, linear LED sprint pacing, and sprung-hardwood plyo decks.",
                  badge: "TIER-3 ARENA SPEC",
                },
              ].map((feat) => (
                <div
                  key={feat.title}
                  className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-cyanLED/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-obsidian text-volt border border-volt/30">
                      {feat.badge}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-4">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-cyanLED">
                    <span>INCLUDED FOR MEMBERS</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6C. Customer Perks & Guarantees Highlight Block (#perks with scroll-mt-28) */}
          <div
            id="perks"
            className="scroll-mt-28 p-8 sm:p-10 rounded-3xl glass-panel-volt"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-volt block">
                  #PERKS • MEMBER GUARANTEES, OFFERS & FREE HOME CLASSES
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-white uppercase mt-1">
                  ZERO LOCK-IN. FREE HOME DEMO CLASSES. LIFETIME WARRANTY.
                </h3>
              </div>
              <Link
                href="/#book-eye-exam"
                className="px-6 py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs uppercase tracking-wider hover:bg-volt/90 transition-all shrink-0 self-start lg:self-auto"
              >
                Book Your Session or Free Home Class
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {[
                {
                  title: "Unlimited Free Online Home Demo Classes",
                  desc: "Every visitor can join our daily basic home demo fitness classes online for free before committing to a paid routine.",
                },
                {
                  title: "Free Trainer & Routine Switch Guarantee",
                  desc: "Want to try a different coach or switch from hypertrophy to combat conditioning? Change your trainer or routine anytime.",
                },
                {
                  title: "Complimentary 3D Posture & VO2 Session",
                  desc: "When you book your training, your first in-gym session includes a $150 3D biomechanical assessment free of charge.",
                },
                {
                  title: "Instant Membership Freeze & Offer Lock",
                  desc: "Avail our 40% off introductory offer with zero long-term lock-in and pause your pass in 1 click whenever you travel.",
                },
              ].map((perk) => (
                <div key={perk.title} className="space-y-2">
                  <div className="flex items-center gap-2 text-volt font-mono text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>GUARANTEED PERK</span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {perk.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6D. Physical Locations / Facility Sectors & Hours (#store-locations with scroll-mt-28) */}
          <div id="store-locations" className="scroll-mt-28 pt-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="px-3 py-1 rounded-full bg-volt/15 border border-volt/40 text-volt text-xs font-mono uppercase tracking-widest">
                  #STORE-LOCATIONS • 4 ARCHITECTURAL SECTORS + ONLINE HOME STUDIO
                </span>
                <h3 className="mt-3 font-display text-3xl sm:text-4xl text-white uppercase">
                  PHYSICAL SECTORS, HOURS &{" "}
                  <span className="text-volt">TRAINING ZONES</span>
                </h3>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Click &quot;Sync 3D Camera&quot; on any sector card to inspect
                its lighting angle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FACILITY_SECTORS.map((sec) => (
                <div
                  key={sec.id}
                  className="rounded-2xl glass-panel border border-white/10 hover:border-volt/40 overflow-hidden flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="relative h-56 bg-obsidian overflow-hidden">
                      <img
                        src={sec.photo}
                        alt={sec.name}
                        className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
                      <button
                        type="button"
                        onClick={() => setActiveCameraZone(sec.cameraZone)}
                        className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-obsidian/90 hover:bg-volt hover:text-obsidian text-volt border border-volt/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        Sync 3D Camera
                      </button>
                      <div className="absolute bottom-3 left-4 right-4">
                        <h4 className="text-lg font-bold text-white">
                          {sec.name}
                        </h4>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-start gap-2.5 text-xs text-slate-300">
                        <MapPin className="w-4 h-4 text-volt shrink-0 mt-0.5" />
                        <span>{sec.address}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Clock className="w-4 h-4 text-cyanLED shrink-0 mt-0.5" />
                        <span>{sec.hours}</span>
                      </div>

                      <div className="pt-3 flex flex-wrap gap-2">
                        {sec.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-obsidian/80 border border-white/10 text-[11px] font-mono text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. OMNI-CHANNEL CONTACT, WHATSAPP CONCIERGE & SESSION BOOKING DESK
             (Required Standard 1.3 & 2.1.4 with #whatsapp and #book-eye-exam)
          ===================================================================== */}
      <section
        id="whatsapp"
        className="scroll-mt-28 py-20 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 5 Columns: Highlighted WhatsApp Concierge + Omni-Channel Directory */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-mono uppercase tracking-widest">
                  #WHATSAPP • BOOK TRAINING & TRAINER CONCIERGE
                </span>
                <h2 className="mt-3 font-display text-3xl sm:text-5xl text-white uppercase">
                  BOOK VIA WHATSAPP OR{" "}
                  <span className="text-volt">SESSION DESK</span>
                </h2>
              </div>

              {/* Highlighted WhatsApp Concierge Card with direct https://wa.me/... deep link */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/70 via-charcoal to-obsidian border border-emerald-400/40 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                    INSTANT TRAINER MATCH • &lt; 2 MINS
                  </span>
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  WhatsApp Training & Routine Concierge
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Message our coaching desk directly on WhatsApp to book your
                  training session, get help choosing your routine, select from
                  our trainers, avail our 40% off offer, or receive the direct
                  join link for today&apos;s free online home basic demo fitness
                  class.
                </p>
                <a
                  href="https://wa.me/15125550199?text=Hi%20AetherForge%20Concierge%2C%20I%20want%20to%20book%20my%20training%20session%2C%20choose%20a%20routine%2C%20and%20try%20the%20free%20online%20home%20basic%20demo%20fitness%20class."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-xl bg-emerald-400 text-obsidian font-mono font-bold text-xs uppercase tracking-wider hover:bg-emerald-300 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp (+1 512-555-0199)</span>
                </a>
              </div>

              {/* Direct Phone, Categorized Emails, Hours & Social Handles */}
              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-volt shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono uppercase text-slate-400 block">
                      DIRECT & TOLL-FREE BOOKING LINES (DEMO SAFE)
                    </span>
                    <p className="text-white font-semibold mt-0.5">
                      Session Desk: +1 (512) 555-0199 • Toll-Free: +1 (800) 555-0142
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2">
                  <span className="font-mono uppercase text-slate-400 block">
                    CATEGORIZED DEPARTMENT EMAILS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
                    <div className="p-2.5 rounded-lg bg-obsidian/80 border border-white/5">
                      <span className="text-[10px] text-cyanLED block">
                        BOOK SESSIONS & HOME DEMOS
                      </span>
                      <span className="text-slate-200">
                        sessions@aetherforge.gym
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-obsidian/80 border border-white/5">
                      <span className="text-[10px] text-volt block">
                        TRAINERS & OFFERS DESK
                      </span>
                      <span className="text-slate-200">
                        trainers@aetherforge.gym
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-slate-400">
                  <span>LIVE STREAM CHANNELS:</span>
                  <div className="flex items-center gap-3 text-white">
                    <span>@AetherForge3D</span>
                    <span>•</span>
                    <span>YT / AetherForgeHomeDemos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 7 Columns: Interactive Booking Form — Book Training, Select Trainer, Choose Routine, Avail Offer, Free Online Home Class
                (#book-eye-exam id preserved for universal standard deep-link compliance) */}
            <div
              id="book-eye-exam"
              className="scroll-mt-28 lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel-volt"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-volt block">
                    #BOOK-EYE-EXAM • BOOK YOUR TRAINING, ROUTINE & FREE HOME DEMO
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-0.5">
                    Book Your Session, Select Trainer & Avail Offer
                  </h3>
                </div>
                <Calendar className="w-6 h-6 text-volt shrink-0" />
              </div>

              {bookingSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-xl font-bold text-white">
                    Training Session & Routine Confirmed!
                  </h4>
                  <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                    Thank you,{" "}
                    <strong className="text-volt">{bookingForm.fullName}</strong>
                    ! You have booked{" "}
                    <span className="text-cyanLED font-semibold">
                      {bookingForm.sessionMode}
                    </span>{" "}
                    with trainer{" "}
                    <strong className="text-white">{bookingForm.trainer}</strong>{" "}
                    following{" "}
                    <span className="text-volt">{bookingForm.routine}</span> on{" "}
                    <span className="text-white font-mono">
                      {bookingForm.preferredDate}
                    </span>
                    . Active Offer:{" "}
                    <span className="text-emerald-300 font-mono">
                      {bookingForm.offerCode}
                    </span>
                    . Access link sent to{" "}
                    <span className="underline">{bookingForm.email}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setBookingSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs uppercase tracking-wider"
                  >
                    Book Another Training Session
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingForm.fullName}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            fullName: e.target.value,
                          })
                        }
                        placeholder="e.g. Marcus Vance"
                        className="w-full h-11 px-3.5 rounded-xl bg-obsidian border border-white/15 text-sm text-white focus:outline-none focus:border-volt"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                        Email Address (For Session / Zoom Link) *
                      </label>
                      <input
                        type="email"
                        required
                        value={bookingForm.email}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            email: e.target.value,
                          })
                        }
                        placeholder="athlete@domain.com"
                        className="w-full h-11 px-3.5 rounded-xl bg-obsidian border border-white/15 text-sm text-white focus:outline-none focus:border-volt"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                        1. Book Your Session Type
                      </label>
                      <select
                        value={bookingForm.sessionMode}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            sessionMode: e.target.value,
                          })
                        }
                        className="w-full h-11 px-3.5 rounded-xl bg-obsidian border border-white/15 text-sm text-white focus:outline-none focus:border-volt"
                      >
                        <option value="1-on-1 Personal Trainer Session (In-Gym)">
                          1-on-1 Personal Trainer Session (In-Gym)
                        </option>
                        <option value="Free Online Home Basic Demo Class">
                          Free Online Home Basic Demo Fitness Class ($0)
                        </option>
                        <option value="Group Sector Conditioning Session">
                          Group Sector Conditioning Session
                        </option>
                        <option value="Hybrid In-Gym + Online Home Routine">
                          Hybrid In-Gym + Online Home Routine
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                        2. Select From Our Trainers
                      </label>
                      <select
                        value={bookingForm.trainer}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            trainer: e.target.value,
                          })
                        }
                        className="w-full h-11 px-3.5 rounded-xl bg-obsidian border border-white/15 text-sm text-white focus:outline-none focus:border-volt"
                      >
                        {TRAINER_PROFILES.map((t) => (
                          <option key={t.id} value={t.name}>
                            {t.name} — {t.role}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                        3. Choose Your Routine
                      </label>
                      <select
                        value={bookingForm.routine}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            routine: e.target.value,
                          })
                        }
                        className="w-full h-11 px-3.5 rounded-xl bg-obsidian border border-white/15 text-sm text-white focus:outline-none focus:border-volt"
                      >
                        {ROUTINE_PLANS.map((r) => (
                          <option key={r.id} value={r.title}>
                            {r.title}
                          </option>
                        ))}
                        {FREE_ONLINE_HOME_CLASSES.map((c) => (
                          <option
                            key={c.id}
                            value={`Free Home Demo: ${c.title}`}
                          >
                            Free Home Demo: {c.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                        4. Avail Our Offer / Promo Code
                      </label>
                      <select
                        value={bookingForm.offerCode}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            offerCode: e.target.value,
                          })
                        }
                        className="w-full h-11 px-3.5 rounded-xl bg-obsidian border border-white/15 text-sm text-white focus:outline-none focus:border-volt"
                      >
                        <option value="FREEDEMO3D (Free Online Home Basic Demo + 1 Gym Pass)">
                          FREEDEMO3D — Free Online Home Basic Demo + 1 Gym Pass
                        </option>
                        <option value="FORGE40 (40% Off First Month + 4 Trainer Sessions)">
                          FORGE40 — 40% Off First Month + 4 Trainer Sessions
                        </option>
                        <option value="HYBRID150 ($150 Off 3D Dumbbell Pair + 60-Day Pass)">
                          HYBRID150 — $150 Off 3D Dumbbell Pair + 60-Day Pass
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                        WhatsApp / Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={bookingForm.phone}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+1 (512) 555-0194"
                        className="w-full h-11 px-3.5 rounded-xl bg-obsidian border border-white/15 text-sm text-white focus:outline-none focus:border-volt"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                        Preferred Session Date
                      </label>
                      <input
                        type="date"
                        value={bookingForm.preferredDate}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            preferredDate: e.target.value,
                          })
                        }
                        className="w-full h-11 px-3.5 rounded-xl bg-obsidian border border-white/15 text-sm text-white focus:outline-none focus:border-volt"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Fitness Goals, Home Equipment or Trainer Notes
                    </label>
                    <textarea
                      rows={2}
                      value={bookingForm.notes}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          notes: e.target.value,
                        })
                      }
                      placeholder="Optional: Let your trainer know if you are joining from home for the free basic demo class or visiting Sector 01–04..."
                      className="w-full p-3.5 rounded-xl bg-obsidian border border-white/15 text-sm text-white focus:outline-none focus:border-volt"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-volt text-obsidian font-mono font-bold text-sm uppercase tracking-wider hover:bg-volt/90 transition-all shadow-[0_0_25px_rgba(204,255,0,0.3)]"
                  >
                    Confirm Training Session, Routine & Offer Booking
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
