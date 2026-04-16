import { motion, useMotionValue, useSpring, useTransform, animate } from "motion/react";
import React, { useRef, useEffect, useState, useMemo, JSX } from "react";
import { useLocation } from "react-router";

// ─── Gravity logo ─────────────────────────────────────────────────────────────
import gravityLogo from "@/assets/laptoplogo.png";
import logo from "@/assets/logo.png";


import newImg0 from "@/assets/3ed75039c8ed75a966529d7f1a79fa162314833f.png"; // Aabhi interior store
import newImg1 from "@/assets/pafSchool7.jpg"; // elegant hallway
import newImg2 from "@/assets/creek2.jpg"; // modern curved wood-glass building at dusk
import newImg3 from "@/assets/maison2.jpg"; // luxury retail
import newImg4 from "@/assets/574cd1294d9f97c3c16200d8a8499d1b55706437.png"; // modern residential pool
import newImg5 from "@/assets/c316ade365712c6f044c78c0ac37513f99d12fc2.png"; // glass high-rise towers at dusk
import newImg6 from "@/assets/innovista2.jpg"; // Innovista Indus entrance
import newImg7 from "@/assets/bb00a237e6019606a36a0c71d5089d9f3b5f203a.png"; // classical villa entrance wrought iron// mountain chalet cabins on hillside
import newImg9  from "@/assets/c675d7b65e8fc74117d5dbcc8897d3a295759ae8.png"; // Innovista auditorium red seats
import newImg10 from "@/assets/pafSchool11.jpg"; // indoor swimming pool
import newImg11 from "@/assets/e5e5dfafc7c463ebad3493e5ca687eafb2f29bf4.png"; // beige high-rise tower at dusk with palms
import newImg12 from "@/assets/a21b1fa5e5c998176a0fde43522a103bdb11e367.png"; // white classical arched building with landscaped street
import newImg14 from "@/assets/26ceeda23a165793d73a41d22f04d8d00f149811.png"; // glass high-rise with green terraces
import newImg15 from "@/assets/pafSchool2.jpg"; // brick arched colonnade building at sunset
import newImg16 from "@/assets/shifa.jpg"; // TMF Center of Excellence dual tower
import newImg19 from "@/assets/innovista.jpg"; // modern tech campus garden
import newImg20 from "@/assets/ca59191f23ff730c6f17f9716db953ec92031041.png"; // brick school building at dusk
import newImg21 from "@/assets/golfer2.jpg"; // luxury wood-ceiling lounge interior
import newImg22 from "@/assets/a2f687d23538885d8b2ae97cb646ac0f6d94aeab.png"; // open-plan office workspace
import newImg27 from "@/assets/1d92653eec918a706702f502d07c11309d836b31.png"; // DHA building red-white striped facade with lawn
import jinnahAerial    from "@/assets/b06f1f503232e620858c7013456bed2e8a969db4.png";
import pearlNight      from "@/assets/6add05817dfda4fcb1eea94226150f85fa6f8aaf.png";
import pafVfomAerial   from "@/assets/89f81c652f2e9f13876e822dd6938385b3bb96b2.png";
import natap from "@/assets/natap.png";
import newImage29 from "@/assets/ecb6770e41175b59a115b0f3a41a8c6334c19752.png";
import newImage30 from "@/assets/a7759569c3d6c1a258e218b1b80afb6a72a99f29.png";
import newImg31 from "@/assets/177a777dbde57cc4b769b815ef7b4eff0027131f.png";
import newImg32 from "@/assets/pafSchool8.jpg";
import newImg33 from "@/assets/advans.jpg";
import newImg34 from "@/assets/fuchsia3.jpg";
import newImg35 from "@/assets/golfer4.jpg";
import newImg36 from "@/assets/alpha.jpg";

// ─── Image pool — all real project images ────────────────────────────────────
const IMAGES = [
  jinnahAerial,
  newImg19,
  newImg1,             // slot  1 — Pearl Towers entrance canopy
  newImg20,
  newImg4,
  newImg27,
  pearlNight,
  newImg6,
  newImg7,
  newImg5,
  newImg9,
  natap,
  newImg32,
  newImage29,
  newImg14,
  newImg15,
  newImg3,
  newImg16,
  newImg2,              // slot  2 — modern curved wood-glass building at dusk
  pafVfomAerial,
  newImg10,
  newImg0,              // slot  0 — Aabhi interior store
  newImage30,
  newImg21,
  newImg22,
  newImg11,
  newImg31,
  newImg12,
  newImg33,
  newImg34,
  newImg35,
  newImg36
];

// ─── Column config ────────────────────────────────────────────────────────────
interface ColConfig {
  heights: number[];
  shapes: ('r' | 's')[]; // r = rectangle, s = square
  imgStart: number;
  startOffset: number;
}



const COL_CONFIGS: ColConfig[] = [
  {
    heights:    [280, 200, 300, 240, 260, 300, 0, 280, 200, 0, 260, 240],
    shapes:     ['r', 'r', 'r', 'r', 'r', 'r', 's', 'r', 'r', 's', 'r', 'r'],
    imgStart: 0,  startOffset: -60,
  },
  {
    heights:    [240, 300, 220, 0, 260, 200, 320, 0, 300, 220, 280, 0],
    shapes:     ['r', 'r', 'r', 's', 'r', 'r', 'r', 's', 'r', 'r', 'r', 's'],
    imgStart: 4,  startOffset: -180,
  },
  {
    heights:    [300, 260, 200, 320, 240, 0, 220, 300, 260, 0, 320, 240],
    shapes:     ['r', 'r', 'r', 'r', 'r', 's', 'r', 'r', 'r', 's', 'r', 'r'],
    imgStart: 8,  startOffset: -30,
  },
  {
    heights:    [220, 280, 300, 200, 300, 260, 0, 220, 280, 320, 200, 0],
    shapes:     ['r', 'r', 'r', 'r', 's', 'r', 's', 'r', 'r', 'r', 'r', 's'],
    imgStart: 12, startOffset: -250,
  },
  {
    heights:    [260, 200, 280, 300, 220, 320, 240, 260, 0, 280, 300, 0],
    shapes:     ['r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 's', 'r', 'r', 's'],
    imgStart: 16, startOffset: -120,
  },
  {
    heights:    [300, 240, 260, 220, 300, 0, 280, 320, 240, 260, 0, 300],
    shapes:     ['r', 'r', 'r', 'r', 'r', 's', 'r', 'r', 'r', 'r', 's', 'r'],
    imgStart: 20, startOffset: -200,
  },
  {
    heights:    [200, 320, 250, 260, 280, 220, 300, 0, 320, 240, 260, 0],
    shapes:     ['r', 'r', 'r', 'r', 'r', 'r', 'r', 's', 'r', 'r', 'r', 'r'],
    imgStart: 6,  startOffset: -80,  // was 24 → caused 0-3 repeat; now starts at 6
  },
];
// ─── Gaps ─────────────────────────────────────────────────────────────────────
const COL_GAP = 14;
const ROW_GAP = 14;

// ── Intro constants ──────────────────────────────────────────────────────────
const INTRO_ZOOM_START = 0.3;
const INTRO_ZOOM_END   = 1.4;
const INTRO_DURATION   = 3.2;

// ─── Bounce waypoints ─────────────────────────────────────────────────────────
const BOUNCE_WAYPOINTS = [
  { x: 0,   y: 0   },
  { x: -40, y: -60 },
  { x: 35,  y: -45 },
  { x: -50, y: 30  },
  { x: 45,  y: 50  },
  { x: -30, y: -40 },
  { x: 50,  y: -20 },
  { x: -45, y: 55  },
  { x: 20,  y: -55 },
  { x: -35, y: 40  },
];

// ─── Mobile magazine grid ─────────────────────────────────────────────────────
// Exact layout: 3 rows, 100dvh, no scroll on first view
// Row 1 (40%): Logo | Image 0   — two 50/50 vertical rectangles
// Row 2 (20%): Image 1          — one full-width horizontal rectangle
// Row 3 (40%): Image 2 | Image 3 — two 50/50 vertical rectangles

function MobileGrid() {
  return (
    <>
      <style>{`
        .mobile-grid-scroll::-webkit-scrollbar { display: none; }
        .mobile-grid-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div
        className="mobile-grid-scroll"
        style={{
          overflowY: "auto",
          height: "100dvh",
          width: "100%",
          paddingTop: 56, // Space for navbar
          display: "flex",
          flexDirection: "column",
        }}
      >
      {/* <div
        className="mobile-grid-scroll"
        style={{ overflowY: "auto", height: "100%", width: "100%" }}
      > */}
        {/* ── First-view block: exactly 100dvh, no scroll ── */}
        <div
          style={{
          
            display: "grid",
            height: "100dvh",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "40dvh 20dvh 40dvh",
            gap: 2,
            padding: 0,
            width: "100%",
          }}
        >
          
          {/* Row 1 Left — Gravity Logo (orange tile) */}
          <motion.div
            style={{
              gridColumn: "1",
              gridRow: "1",
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: "#E06020",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={IMAGES[0]}
              alt=""
              draggable={false}
              className="w-full h-full object-cover select-none"
            />
          </motion.div>

          {/* Row 1 Right — Image 1 */}
          <motion.div
            style={{ gridColumn: "2", gridRow: "1", borderRadius: 2, overflow: "hidden" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.42, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={IMAGES[1]} alt="" draggable={false} className="w-full h-full object-cover select-none" />
          </motion.div>

          {/* Row 2 Full — Image 2 */}
          <motion.div
            style={{ gridColumn: "1 / span 2", gridRow: "2", borderRadius: 2, overflow: "hidden" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.42, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={logo} alt="Gravity Architecture and Interiors" draggable={false} className="w-full h-full object-cover select-none" />
          </motion.div>

          {/* Row 3 Left — Image 3 */}
          <motion.div
            style={{ gridColumn: "1", gridRow: "3", borderRadius: 2, overflow: "hidden" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.42, delay: 0.21, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={IMAGES[2]} alt="" draggable={false} className="w-full h-full object-cover select-none" />
          </motion.div>

          {/* Row 3 Right — Image 4 */}
          <motion.div
            style={{ gridColumn: "2", gridRow: "3", borderRadius: 2, overflow: "hidden" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.42, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={IMAGES[3]} alt="" draggable={false} className="w-full h-full object-cover select-none" />
          </motion.div>
        </div>

        {/* ── Remaining images below — scroll to reveal ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "2px 0 8px 0" }}>
        {IMAGES.slice(4).reduce<JSX.Element[]>((acc, _, i, arr) => {
          const pos = i % 5;
          if (pos === 0) {
            // Row 1 — 2 vertical
            acc.push(
              <div key={`row1-${i}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                {[arr[i], arr[i + 1]].filter(Boolean).map((src, j) => (
                  <motion.div key={`v1-${i}-${j}`} style={{ aspectRatio: "2/3", borderRadius: 2, overflow: "hidden" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.42, delay: (i + j) * 0.012, ease: [0.22, 1, 0.36, 1] }}>
                    <img src={src} alt="" draggable={false} className="w-full h-full object-cover select-none" />
                  </motion.div>
                ))}
              </div>
            );
          } else if (pos === 2) {
            // Row 2 — 1 horizontal
            acc.push(
              <motion.div key={`horiz-${i}`} style={{ aspectRatio: "16/9", borderRadius: 2, overflow: "hidden" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.42, delay: i * 0.012, ease: [0.22, 1, 0.36, 1] }}>
                <img src={arr[i]} alt="" draggable={false} className="w-full h-full object-cover select-none" />
              </motion.div>
            );
          } else if (pos === 3) {
            // Row 3 — 2 vertical
            acc.push(
              <div key={`row3-${i}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                {[arr[i], arr[i + 1]].filter(Boolean).map((src, j) => (
                  <motion.div key={`v2-${i}-${j}`} style={{ aspectRatio: "2/3", borderRadius: 2, overflow: "hidden" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.42, delay: (i + j) * 0.012, ease: [0.22, 1, 0.36, 1] }}>
                    <img src={src} alt="" draggable={false} className="w-full h-full object-cover select-none" />
                  </motion.div>
                ))}
              </div>
            );
          }
          return acc;
        }, [])}
      </div>
      </div>
    </>
  );
}

// ─── Single image tile ────────────────────────────────────────────────────────
function ImageTileCard({
  src,
  height,
  shape,
  delay,
  isLogoCard,
}: {
  src: string | undefined;
  height: number;
  shape: 'r' | 's';
  delay: number;
  onOpen?: (src: string, rect: DOMRect) => void;
  fadingOut?: boolean;
  isSelected?: boolean;
  isLogoCard?: boolean;
}) {
  if (!src && !isLogoCard) return null;
  return (
    <motion.div
      className="w-full shrink-0 overflow-hidden"
      style={{
        height: shape === 's' ? undefined : height,
        aspectRatio: shape === 's' ? '1 / 1' : undefined,
        borderRadius: 3,
        backgroundColor: isLogoCard ? '#E06020' : undefined,
        display: isLogoCard ? 'flex' : undefined,
        alignItems: isLogoCard ? 'center' : undefined,
        justifyContent: isLogoCard ? 'center' : undefined,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {isLogoCard ? (
        <img
          src={gravityLogo}
          alt="Gravity Architecture and Interior"
          draggable={false}
          className="w-full h-full object-cover select-none"
        />
      ) : (
        <img
          src={src}
          alt=""
          draggable={false}
          className="w-full h-full object-cover select-none"
        />
      )}
    </motion.div>
  );
}

// ─── Column ───────────────────────────────────────────────────────────────────
function Column({
  config,
  colIndex,
  numCols,
  colGap,
  rowGap,
}: {
  config: ColConfig;
  colIndex: number;
  numCols: number;
  colGap: number;
  rowGap: number;
}) {
  const images = useMemo(
    () =>
      config.heights.map((h, i) => ({
        // ── Interleaved formula: row i × numCols + colIndex
        // Guarantees all 7 columns at the same tile-row show different images.
        // With 57 images, the first 57 tiles (≈ 8 full rows) are 100% unique.
        // Duplicates only appear at tile-row 8+ which is far below the viewport.
        src: IMAGES[(i * numCols + colIndex) % IMAGES.length],
        // src: IMAGES[(colIndex * 12 + i) % IMAGES.length],
        height: h,
        shape: config.shapes[i],
        key: `c${colIndex}-r${i}`,
        // Center tile: center column (index 3), tile index 1 (tall upper-center slot)
        isLogoCard: colIndex === 3 && i === 1,
      })),
    [config, colIndex, numCols]
  );


  return (
    <div
      className="flex flex-col shrink-0"
      style={{
        width: `calc((100% - ${(numCols - 1) * colGap}px) / ${numCols})`,
        gap: rowGap,
        marginTop: config.startOffset,
      }}
    >
      {images.map((img, i) => (
        <ImageTileCard
          key={img.key}
          src={img.src}
          height={img.height}
          shape={img.shape}
          delay={colIndex * 0.06 + i * 0.03}
          isLogoCard={img.isLogoCard}
        />
      ))}
    </div>
  );
}

// ─── Scroll hint ──────────────────────────────────────────────────────────────
function ScrollHint({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none select-none"
      style={{ zIndex: 50 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-0.5 h-5 rounded-full bg-black/20"
        animate={{ scaleY: [1, 0.3, 1] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      />
      <span className="text-black/35 uppercase tracking-[0.22em]" style={{ fontSize: "9px" }}>
        Scroll to zoom
      </span>
      <motion.div
        className="w-0.5 h-5 rounded-full bg-black/20"
        animate={{ scaleY: [1, 0.3, 1] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: 0.4 }}
      />
    </motion.div>
  );
}

// ── Main HomePage ────────────────────────────────────────────────────────────
export function HomePage() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled]       = useState(false);
  const [introComplete, setIntroComplete]   = useState(false);
  const [isMobile, setIsMobile]             = useState(() => window.innerWidth <= 768);

  // ── Detect mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── Zoom — mobile starts at 0.97 (very subtle), desktop at 0.3 (dramatic)
  const zoomRaw = useMotionValue(isMobile ? 0.97 : INTRO_ZOOM_START);
  const zoom    = useSpring(zoomRaw, { stiffness: 80, damping: 24, mass: 0.7 });

  // ── Grid fade-in
  const gridOpacity       = useMotionValue(0);
  const smoothGridOpacity = useSpring(gridOpacity, { stiffness: 60, damping: 20, mass: 0.8 });

  // ── Wordmark: visible early, fades behind grid as zoom increases
  const textOpacity = useTransform(zoom, [0.3, 0.7, 1.2], [1, 1, 0.15]);

  // ── Grid z-index: starts low (text above), ends high (grid covers text)
  const gridZIndex = useTransform(zoom, [0.3, 0.9, 1.4], [5, 12, 25]);

  // ── Bounce
  const bounceX = useMotionValue(0);
  const bounceY = useMotionValue(0);
  const smoothBounceX = useSpring(bounceX, { stiffness: 30, damping: 18, mass: 1.2 });
  const smoothBounceY = useSpring(bounceY, { stiffness: 30, damping: 18, mass: 1.2 });

  // ── Intro animation — subtle on mobile, dramatic on desktop
  useEffect(() => {
    const fadeDuration = isMobile ? 0.5 : 0.8;
    animate(gridOpacity, 1, { duration: fadeDuration, ease: [0.22, 1, 0.36, 1] });
    const t = setTimeout(() => {
      animate(zoomRaw, isMobile ? 1.0 : INTRO_ZOOM_END, {
        duration: isMobile ? 1.0 : INTRO_DURATION,
        ease: [0.25, 0.1, 0.25, 1],
        onComplete: () => setIntroComplete(true),
      });
    }, 200);
    return () => clearTimeout(t);
  }, [gridOpacity, zoomRaw, isMobile]);

  // ── Bounce after intro — disabled on mobile, active on desktop
  useEffect(() => {
    if (!introComplete || isMobile) return;
    let idx = 0, cancelled = false;
    const nextBounce = () => {
      if (cancelled) return;
      idx = (idx + 1) % BOUNCE_WAYPOINTS.length;
      const wp = BOUNCE_WAYPOINTS[idx];
      const range = Math.max(1, (zoomRaw.get() - 1) * 1.5 + 1);
      animate(bounceX, wp.x * range, { duration: 6 + Math.random() * 4, ease: [0.45, 0, 0.55, 1], onComplete: nextBounce });
      animate(bounceY, wp.y * range, { duration: 6 + Math.random() * 4, ease: [0.45, 0, 0.55, 1] });
    };
    const t = setTimeout(nextBounce, 500);
    return () => { cancelled = true; clearTimeout(t); };
  }, [introComplete, isMobile, bounceX, bounceY, zoomRaw]);

  // ── Scroll → zoom — desktop only
  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      if (!hasScrolled) setHasScrolled(true);
      const next = Math.max(1, Math.min(4, zoomRaw.get() + e.deltaY * 0.002));
      zoomRaw.set(next);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [hasScrolled, zoomRaw, isMobile]);

  // ── Touch → zoom — desktop only
  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;
    let lastY = 0;
    const onStart = (e: TouchEvent) => { lastY = e.touches[0].clientY; if (!hasScrolled) setHasScrolled(true); };
    const onMove  = (e: TouchEvent) => {
      e.preventDefault();
      const dy = lastY - e.touches[0].clientY;
      lastY = e.touches[0].clientY;
      zoomRaw.set(Math.max(1, Math.min(4, zoomRaw.get() + dy * 0.005)));
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove",  onMove,  { passive: false });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove",  onMove);
    };
  }, [hasScrolled, zoomRaw, isMobile]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden select-none"
      style={{ background: "#F7F7F5", touchAction: isMobile ? "auto" : "none" }}
    >
      {isMobile ? (
        /* ── Mobile: pure static layout, zero transforms, fills 100dvh × 100vw ── */
        <MobileGrid />
      ) : (
        /* ── Desktop: full cinematic zoom + bounce experience ── */
        <>
          {/* GRAVITY wordmark */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{ zIndex: 20, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(60px, 11vw, 160px)",
                color: "#1a1a1a",
                letterSpacing: "0.12em",
                whiteSpace: "nowrap",
                lineHeight: 1,
              }}
            >
              GRAVITY
            </span>
          </motion.div>

          {/* Zooming + bouncing grid */}
          <motion.div
            className="absolute inset-0 flex"
            style={{
              zIndex: gridZIndex,
              scale: zoom,
              x: smoothBounceX,
              y: smoothBounceY,
              transformOrigin: "50% 50%",
              willChange: "transform",
              opacity: smoothGridOpacity,
              justifyContent: "center",
              alignItems: "flex-start",
              gap: COL_GAP,
              padding: `80px ${COL_GAP}px`,
            }}
          >
            {COL_CONFIGS.map((config, i) => (
              <Column
                key={i}
                config={config}
                colIndex={i}
                numCols={COL_CONFIGS.length}
                colGap={COL_GAP}
                rowGap={ROW_GAP}
              />
            ))}
          </motion.div>

          <ScrollHint visible={introComplete && !hasScrolled} />
        </>
      )}
    </div>
  );
}