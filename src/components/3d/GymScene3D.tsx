"use client";

import React, { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { useStore, CameraZone } from "@/context/StoreContext";
import { AnimatePresence, motion } from "framer-motion";

const HERO_SLIDESHOW = [
  {
    src: "/images/zones/iron-forge-rack.jpg",
    zone: "SECTOR 01 • IRON FORGE MONOLITH",
    caption: "24-Bench Calibrated Free-Weight Sanctuary",
  },
  {
    src: "/images/zones/cyber-neon-alley.jpg",
    zone: "SECTOR 02 • CYBER NEON ALLEY",
    caption: "Linear LED Strip Pacing & Hypoxic Training Corridor",
  },
  {
    src: "/images/zones/functional-cardio-deck.jpg",
    zone: "SECTOR 03 • KINETIC HARDWOOD DECK",
    caption: "Sprung Hardwood Cardio & Ballistic Plyo Track",
  },
  {
    src: "/images/zones/hybrid-combat-hall.jpg",
    zone: "SECTOR 04 • APEX COMBAT & RIG ARENA",
    caption: "Heavy Bag Syndicate & Geometric Ceiling Matrix",
  },
];

// Camera coordinates for each zone so scroll & interactive buttons smoothly pan the 3D camera
const CAMERA_TARGETS: Record<
  CameraZone,
  { pos: [number, number, number]; lookAt: [number, number, number] }
> = {
  hero: { pos: [0, 0.4, 5.4], lookAt: [0, 0, 0] },
  "iron-forge": { pos: [2.6, 0.9, 3.8], lookAt: [0.2, 0, 0] },
  "cyber-cardio": { pos: [-2.8, 1.2, 4.2], lookAt: [-0.2, 0.1, 0] },
  "combat-rig": { pos: [0, 2.2, 4.6], lookAt: [0, -0.2, 0] },
  "altitude-lab": { pos: [1.8, -1.1, 4.0], lookAt: [0, 0.2, 0] },
};

function CameraRig({
  activeZone,
  scrollRatio,
}: {
  activeZone: CameraZone;
  scrollRatio: number;
}) {
  const lookAtVec = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const baseTarget = CAMERA_TARGETS[activeZone] || CAMERA_TARGETS.hero;
    // Blend scroll offset + pointer parallax with zone camera target
    const scrollOffsetX = Math.sin(scrollRatio * Math.PI * 2) * 1.15;
    const scrollOffsetY = Math.cos(scrollRatio * Math.PI) * 0.45;

    const targetX = baseTarget.pos[0] + scrollOffsetX + state.pointer.x * 0.45;
    const targetY = baseTarget.pos[1] + scrollOffsetY + state.pointer.y * 0.35;
    const targetZ = baseTarget.pos[2] - scrollRatio * 0.6;

    state.camera.position.lerp(
      new THREE.Vector3(targetX, targetY, Math.max(3.1, targetZ)),
      Math.min(1, delta * 3.2)
    );

    lookAtVec.current.lerp(
      new THREE.Vector3(...baseTarget.lookAt),
      Math.min(1, delta * 3.5)
    );
    state.camera.lookAt(lookAtVec.current);
  });

  return null;
}

function ProceduralSmartDumbbell({
  loadKg,
  accentColor,
  scrollRatio,
}: {
  loadKg: number;
  accentColor: string;
  scrollRatio: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Number of weight plates per side scales dynamically with loadKg (15kg -> 2 plates, 35kg -> 3 plates, 50kg -> 4 plates)
  const plateCount = useMemo(() => {
    if (loadKg <= 20) return 2;
    if (loadKg <= 38) return 3;
    return 4;
  }, [loadKg]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const speedMultiplier = hovered ? 1.8 : 0.65;
      groupRef.current.rotation.y += delta * speedMultiplier;
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.16 + scrollRatio * 0.85;
      groupRef.current.rotation.x =
        Math.cos(state.clock.elapsedTime * 0.6) * 0.12;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 0.9;
      innerRingRef.current.rotation.y -= delta * 0.6;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.45;
      outerRingRef.current.rotation.x -= delta * 0.25;
    }
  });

  const plates = useMemo(() => {
    const arr = [];
    for (let i = 0; i < plateCount; i++) {
      const offset = 0.82 + i * 0.23;
      const radius = 0.88 - i * 0.11;
      arr.push({ offset, radius, index: i });
    }
    return arr;
  }, [plateCount]);

  return (
    <group>
      <Float
        speed={2.2}
        rotationIntensity={0.35}
        floatIntensity={0.65}
        floatingRange={[-0.12, 0.12]}
      >
        <group
          ref={groupRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.06 : 1}
        >
          {/* Central Knurled CNC Chrome Steel Handle */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.11, 0.11, 2.5, 32]} />
            <meshStandardMaterial
              color="#D4DBE6"
              metalness={0.92}
              roughness={0.22}
            />
          </mesh>

          {/* Ergonomic Center Grip Collar Ring */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.135, 0.135, 0.55, 24]} />
            <meshStandardMaterial
              color="#1A202C"
              metalness={0.75}
              roughness={0.45}
            />
          </mesh>

          {/* Glowing Center Telemetry Band */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.142, 0.142, 0.08, 24]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={2.2}
            />
          </mesh>

          {/* Left & Right Octagonal/Cylindrical Urethane Pro Weight Plates */}
          {plates.map((p) => (
            <React.Fragment key={p.index}>
              {/* Right Side Plate */}
              <group position={[p.offset, 0, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[p.radius, p.radius, 0.17, 12]} />
                  <meshStandardMaterial
                    color="#0E131B"
                    metalness={0.82}
                    roughness={0.28}
                  />
                </mesh>
                {/* Glowing Laser-Etched Rim Ring */}
                <mesh rotation={[0, Math.PI / 2, 0]}>
                  <torusGeometry args={[p.radius * 0.86, 0.022, 16, 36]} />
                  <meshStandardMaterial
                    color={accentColor}
                    emissive={accentColor}
                    emissiveIntensity={1.6}
                  />
                </mesh>
              </group>

              {/* Left Side Plate */}
              <group position={[-p.offset, 0, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[p.radius, p.radius, 0.17, 12]} />
                  <meshStandardMaterial
                    color="#0E131B"
                    metalness={0.82}
                    roughness={0.28}
                  />
                </mesh>
                {/* Glowing Laser-Etched Rim Ring */}
                <mesh rotation={[0, Math.PI / 2, 0]}>
                  <torusGeometry args={[p.radius * 0.86, 0.022, 16, 36]} />
                  <meshStandardMaterial
                    color={accentColor}
                    emissive={accentColor}
                    emissiveIntensity={1.6}
                  />
                </mesh>
              </group>
            </React.Fragment>
          ))}

          {/* End Cap Spinlock Collars */}
          {[1, -1].map((dir) => (
            <mesh
              key={dir}
              position={[dir * (0.85 + plateCount * 0.23), 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.18, 0.15, 0.16, 16]} />
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={0.85}
                metalness={0.9}
                roughness={0.15}
              />
            </mesh>
          ))}
        </group>

        {/* Orbital Kinetic Gyro Rings surrounding the 3D Dumbbell */}
        <mesh ref={innerRingRef}>
          <torusGeometry args={[2.15, 0.016, 16, 100]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={1.8}
            transparent
            opacity={0.75}
          />
        </mesh>

        <mesh ref={outerRingRef} rotation={[Math.PI / 4, 0.3, 0]}>
          <torusGeometry args={[2.55, 0.012, 16, 100]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={1.4}
            transparent
            opacity={0.5}
          />
        </mesh>
      </Float>

      {/* Architectural Gym Ceiling Light Tubes (inspired by GYM1, GYM6 & VIKAS_ROHILLA triangle LEDs) */}
      <group position={[0, 2.85, -1.8]}>
        {[-2.4, -0.8, 0.8, 2.4].map((xPos, i) => (
          <mesh key={i} position={[xPos, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.025, 1.2, 12]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive={i % 2 === 0 ? accentColor : "#00F0FF"}
              emissiveIntensity={2.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function GymScene3D() {
  const {
    activeCameraZone,
    active3DLoadKg,
    active3DAccent,
    isLowPower3D,
  } = useStore();

  const [slideIndex, setSlideIndex] = useState(0);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [webglReady, setWebglReady] = useState(false);

  // Rotate background 2D slideshow per Blueprint_3D.md Step 5 & ReferenceEfficient3DWebsite.md Section 8
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDESHOW.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  // Track window scroll to drive 3D camera & rotation smoothly
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setScrollRatio(Math.min(1, Math.max(0, ratio)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentSlide = HERO_SLIDESHOW[slideIndex];

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Layer 1: Dynamic 2D AnimatePresence Background Slideshow behind the 3D Canvas (Blueprint_3D Step 5) */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide.src}
          initial={{ opacity: 0, scale: 1.07 }}
          animate={{ opacity: 0.34, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${currentSlide.src}')`,
          }}
        />
      </AnimatePresence>

      {/* Dark Atmospheric Cyber Vignette & Grid Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(7, 9, 13, 0.45) 0%, rgba(7, 9, 13, 0.93) 78%, #07090D 100%)",
        }}
      />

      {/* Subtle architectural scanline grid */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Layer 2: Interactive WebGL React Three Fiber Canvas with Capped Pixel Ratio (dpr={[1, 1.5]}) */}
      {!isLowPower3D && (
        <div className="absolute inset-0 pointer-events-auto">
          <Suspense fallback={null}>
            <Canvas
              dpr={[1, 1.5]}
              gl={{
                alpha: true,
                antialias: true,
                powerPreference: "high-performance",
              }}
              onCreated={() => setWebglReady(true)}
            >
              <PerspectiveCamera makeDefault position={[0, 0.4, 5.4]} fov={42} />
              <CameraRig
                activeZone={activeCameraZone}
                scrollRatio={scrollRatio}
              />

              {/* Multi-Point Dramatic Gym Studio Lighting */}
              <ambientLight intensity={0.75} />
              <directionalLight
                position={[5, 6, 4]}
                intensity={2.4}
                color="#FFFFFF"
              />
              <pointLight
                position={[-4, 2, 3]}
                intensity={3.2}
                color={active3DAccent}
                distance={12}
              />
              <pointLight
                position={[4, -2, -2]}
                intensity={2.6}
                color="#00F0FF"
                distance={12}
              />

              <ProceduralSmartDumbbell
                loadKg={active3DLoadKg}
                accentColor={active3DAccent}
                scrollRatio={scrollRatio}
              />

              <Sparkles
                count={45}
                scale={7}
                size={1.8}
                speed={0.35}
                opacity={0.45}
                color={active3DAccent}
              />

              <ContactShadows
                position={[0, -1.75, 0]}
                opacity={0.65}
                scale={10}
                blur={2.4}
                far={4}
                color={active3DAccent}
              />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.55}
                maxPolarAngle={Math.PI / 1.6}
                minPolarAngle={Math.PI / 2.8}
              />
            </Canvas>
          </Suspense>
        </div>
      )}

      {/* Subtle Bottom-Left Live 3D Telemetry Watermark Pill */}
      <div className="hidden lg:flex items-center gap-3 absolute bottom-5 left-6 z-10 px-3.5 py-1.5 rounded-full bg-obsidian/80 border border-white/10 text-[11px] font-mono tracking-wider text-slate-400">
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: active3DAccent }}
        />
        <span>
          {isLowPower3D
            ? "2D FALLBACK MODE (LOW-BANDWIDTH SAVER)"
            : webglReady
            ? `WEBGL R3F 60FPS • ${active3DLoadKg}KG CNC LOAD • DPR 1.5 CAP`
            : "INITIALIZING 3D ENGINE..."}
        </span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-300">{currentSlide.zone}</span>
      </div>
    </div>
  );
}
