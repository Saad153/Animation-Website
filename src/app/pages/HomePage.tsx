import { motion, useMotionValue, useSpring, useTransform, animate } from "motion/react";
import React, { useRef, useEffect, useState, useMemo } from "react";

// ─── Gravity logo ─────────────────────────────────────────────────────────────
import gravityLogo from "@/assets/d2755bbe5130e82e2da96ee562f8b24d78c9a00a.png";

// ─── New replacement images (slots 0–7) ───────────────────────────────────────
import newImg0 from "@/assets/3ed75039c8ed75a966529d7f1a79fa162314833f.png"; // Aabhi interior store
import newImg1 from "@/assets/f257d47652ed9787b02479a73ffac1b61f3a53cd.png"; // elegant hallway
import newImg2 from "@/assets/0ac3897d775fe70ef30feba4ed259fb564a82e8f.png"; // modern curved wood-glass building at dusk
import newImg3 from "@/assets/5c06433b5ec4dbb425bd01103261ec12403a3041.png"; // luxury retail
import newImg4 from "@/assets/574cd1294d9f97c3c16200d8a8499d1b55706437.png"; // modern residential pool
import newImg5 from "@/assets/d6ca377de74b166e20e20edd82f10e604a981995.png"; // glass high-rise towers at dusk
import newImg6 from "@/assets/5297e2828cca6f5d266afc2ce916e25792429e5c.png"; // Innovista Indus entrance
import newImg7 from "@/assets/bb00a237e6019606a36a0c71d5089d9f3b5f203a.png"; // classical villa entrance wrought iron

// ─── New replacement images (slots 8–16) ──────────────────────────────────────
import newImg8  from "@/assets/c316ade365712c6f044c78c0ac37513f99d12fc2.png"; // mountain chalet cabins on hillside
import newImg9  from "@/assets/c675d7b65e8fc74117d5dbcc8897d3a295759ae8.png"; // Innovista auditorium red seats
import newImg10 from "@/assets/7c8e59d7c8faafdb80468dbc5fa3029b2980f855.png"; // indoor swimming pool
import newImg11 from "@/assets/e5e5dfafc7c463ebad3493e5ca687eafb2f29bf4.png"; // beige high-rise tower at dusk with palms
import newImg12 from "@/assets/a21b1fa5e5c998176a0fde43522a103bdb11e367.png"; // white classical arched building with landscaped street
import newImg13 from "@/assets/f3ff9122ce0bd8e52bcec5d4826c7723f33b294a.png"; // Pearl Towers entrance canopy at night
import newImg14 from "@/assets/26ceeda23a165793d73a41d22f04d8d00f149811.png"; // glass high-rise with green terraces
import newImg15 from "@/assets/560d95bd040747c62cd8edc43662c33556166bba.png"; // brick arched colonnade building at sunset
import newImg16 from "@/assets/a3d6653f3bb781608bdf1e0984437f3ebcb82e06.png"; // TMF Center of Excellence dual tower

// ─── New replacement images (slots 17–19) ─────────────────────────────────────
import newImg17 from "@/assets/87a33b798bdb69012f897e09338192c5db0b97ef.png"; // indoor swimming pool
import newImg18 from "@/assets/69377d84dfc6fd48852caa26119ac4261c664e56.png"; // white arched building exterior
import newImg19 from "@/assets/9479798145357a18c2d8da2b2abbaeb08af8ed43.png"; // modern tech campus garden

// ─── New replacement images (slots 20–22) ─────────────────────────────────────
import newImg20 from "@/assets/ca59191f23ff730c6f17f9716db953ec92031041.png"; // brick school building at dusk
import newImg21 from "@/assets/0ff2ea99a0e32031f5ae3eb1972595fa5b40122c.png"; // luxury wood-ceiling lounge interior
import newImg22 from "@/assets/a2f687d23538885d8b2ae97cb646ac0f6d94aeab.png"; // open-plan office workspace

// ─── New replacement images (slots 23–25) ─────────────────────────────────────
import newImg23 from "@/assets/6d29a36b8d8b5e9e6e369f49ab0a953158974b6a.png"; // glass-partition office with plants
import newImg24 from "@/assets/dad33bfb5e58029f3bd62539147ee8209a046fb4.png"; // open studio office floor
import newImg25 from "@/assets/2ba56b1853d6b65c8214b9bb5038a6a06c11437c.png"; // Askari Towers high-rise render

// ─── New replacement images (slots 26–27) ─────────────────────────────────────
import newImg26 from "@/assets/8c2f737cae4806558089adc86b99a320bc950b34.png"; // modern residential townhouses street view
import newImg27 from "@/assets/177a777dbde57cc4b769b815ef7b4eff0027131f.png"; // DHA building red-white striped facade with lawn

// ─── Real project images ──────────────────────────────────────────────────────
import jinnahAerial    from "@/assets/fe7c436dbcda8afd381392cfcd6639d0c94349bc.png";
import jinnahNight     from "@/assets/5d5179836a3dc3bd68c1c31ea82c64911df76586.png";
import pearlNight      from "@/assets/6add05817dfda4fcb1eea94226150f85fa6f8aaf.png";
import pearlGate       from "@/assets/d904eb6644b26f621312f75f1150adba64e4e1cd.png";
import pearlAerial     from "@/assets/e56d2a8702d733d2b164803518778164319747e6.png";
import dhaSunset       from "@/assets/e0034d139ea3b04423620fccffb2677d5d20d566.png";
import dhaBirdsEye     from "@/assets/bb13b321df0cdaa668c1ee46fcfb0248f3ac2d0e.png";
import askariRender    from "@/assets/a35c08468163fa9dc0d1871006cc1e08bcb48f9e.png";
import askariPhoto     from "@/assets/81fd1d357b221b52c6a9f17d0df5f6c5d8721018.png";
import dhaEnclaveHero  from "@/assets/09d0d22780ebe0c3ad49ef060d2aca3119dc4bb7.png";
import askari18aFront  from "@/assets/ef1bca31f3087b65b1c6af961c22229a30517c5c.png";
import askari18aStreet from "@/assets/4859b3b2f408f91a882e750efbe3cc87609bc2af.png";
import askari711Render from "@/assets/2e8c9d3309b8e3e58d8d00faa794f7f65a636784.png";
import askari1012Evening from "@/assets/df217dc95983a8b88bf39091e14445fe0cc52434.png";
import askari1012Night from "@/assets/1aa6d0725f65e00cc9d0b255dfbc2352cbeb0ea3.png";
import embassyCompleted from "@/assets/a8b07d4d7114f6131ebaa11e8c1371701fa94a93.png";
import malirAerial     from "@/assets/27dcbce900ba5c921a3bf91389d0ea1597fc7542.png";
import malirConstruction from "@/assets/ad25a5b0ce14e7dbc2bb669caa37a1981c672522.png";
import cyberExterior   from "@/assets/fdca48499e55dcb74fa40cbb5f9bee2494dbad9d.png";
import cyberRender     from "@/assets/632fcbe2413eb2351b52bbf8b44a4956615066ba.png";
import cyberLobby      from "@/assets/0ba821698482d0a8f11cd01056a5597811171651.png";
import gravityTower1Night from "@/assets/6d7e66940bebc0cab8a432d5e6707b65e1a5c8ae.png";
import gravityTower1Day from "@/assets/15e205cbe59271f70ac142f75736004114a026ba.png";
import pafChaletExterior from "@/assets/020fc8f9c34c12665429860cbdef1feb0c1a555d.png";
import pafChaletHillside from "@/assets/3e1a3d4e73b598fd8d58ed65309af26183b92660.png";
import pafChaletRestaurant from "@/assets/89c70f4bea1afeac8168cb2d157428484c70695f.png";
import pafVfomFront    from "@/assets/52bc6d7b4898187277b1fbc9dbe83b10faa34b6f.png";
import pafVfomAerial   from "@/assets/89f81c652f2e9f13876e822dd6938385b3bb96b2.png";
import pafVfomEntrance from "@/assets/a69fcac697524958699441c33414e8339ff97c50.png";

// ─── Image pool — all real project images ────────────────────────────────────
const IMAGES = [
  newImg0,         // slot  0
  newImg1,         // slot  1
  newImg2,         // slot  2
  newImg3,         // slot  3
  newImg4,         // slot  4
  newImg5,         // slot  5
  newImg6,         // slot  6
  newImg7,         // slot  7
  newImg8,         // slot  8
  newImg9,         // slot  9
  newImg10,        // slot 10 (logo card covers col3-i1; image still used elsewhere)
  newImg11,        // slot 11
  newImg12,        // slot 12
  newImg13,        // slot 13
  newImg14,        // slot 14
  newImg15,        // slot 15
  newImg16,        // slot 16
  newImg17,        // slot 17
  newImg18,        // slot 18
  newImg19,        // slot 19
  newImg20,        // slot 20
  newImg21,        // slot 21
  newImg22,        // slot 22
  newImg23,        // slot 23
  newImg24,        // slot 24
  newImg25,        // slot 25
  newImg26,        // slot 26
  newImg27,        // slot 27
  pafChaletRestaurant,// slot 28 (unchanged)
  pafVfomFront,       // slot 29 (unchanged)
  pafVfomAerial,      // slot 30 (unchanged)
  pafVfomEntrance,    // slot 31 (unchanged)
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
    heights:    [280, 200, 0, 240, 260, 300, 0, 280, 200, 0, 260, 240],
    shapes:     ['r', 'r', 's', 'r', 'r', 'r', 's', 'r', 'r', 's', 'r', 'r'],
    imgStart: 0,  startOffset: -60,
  },
  {
    heights:    [240, 300, 220, 0, 260, 200, 320, 0, 300, 220, 280, 0],
    shapes:     ['r', 'r', 'r', 's', 'r', 'r', 'r', 's', 'r', 'r', 'r', 's'],
    imgStart: 4,  startOffset: -180,
  },
  {
    heights:    [0, 260, 200, 320, 240, 0, 220, 300, 260, 0, 320, 240],
    shapes:     ['s', 'r', 'r', 'r', 'r', 's', 'r', 'r', 'r', 's', 'r', 'r'],
    imgStart: 8,  startOffset: -30,
  },
  {
    heights:    [220, 280, 0, 200, 300, 260, 0, 220, 280, 320, 200, 0],
    shapes:     ['r', 'r', 's', 'r', 'r', 'r', 's', 'r', 'r', 'r', 'r', 's'],
    imgStart: 12, startOffset: -250,
  },
  {
    heights:    [260, 200, 280, 0, 220, 320, 240, 260, 0, 280, 300, 0],
    shapes:     ['r', 'r', 'r', 's', 'r', 'r', 'r', 'r', 's', 'r', 'r', 's'],
    imgStart: 16, startOffset: -120,
  },
  {
    heights:    [0, 240, 260, 220, 300, 0, 280, 320, 240, 260, 0, 300],
    shapes:     ['s', 'r', 'r', 'r', 'r', 's', 'r', 'r', 'r', 'r', 's', 'r'],
    imgStart: 20, startOffset: -200,
  },
  {
    heights:    [200, 320, 0, 260, 280, 220, 300, 0, 320, 240, 260, 0],
    shapes:     ['r', 'r', 's', 'r', 'r', 'r', 'r', 's', 'r', 'r', 'r', 's'],
    imgStart: 24, startOffset: -80,
  },
];

// ─── Gaps ─────────────────────────────────────────────────────────────────────
const COL_GAP = 8;
const ROW_GAP = 8;

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
        style={{ overflowY: "auto", height: "100%", width: "100%" }}
      >
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
              src={gravityLogo}
              alt="Gravity Architecture and Interiors"
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
            <img src={IMAGES[0]} alt="" draggable={false} className="w-full h-full object-cover select-none" />
          </motion.div>

          {/* Row 2 Full — Image 2 */}
          <motion.div
            style={{ gridColumn: "1 / span 2", gridRow: "2", borderRadius: 2, overflow: "hidden" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.42, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={IMAGES[1]} alt="" draggable={false} className="w-full h-full object-cover select-none" />
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            padding: "2px 0 8px 0",
          }}
        >
          {IMAGES.slice(4).map((src, i) => (
            <motion.div
              key={`m-extra-${i}`}
              style={{ aspectRatio: "2 / 3", borderRadius: 2, overflow: "hidden" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.42,
                delay: (i + 5) * 0.012,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img src={src} alt="" draggable={false} className="w-full h-full object-cover select-none" />
            </motion.div>
          ))}
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
  src: string;
  height: number;
  shape: 'r' | 's';
  delay: number;
  onOpen?: (src: string, rect: DOMRect) => void;
  fadingOut?: boolean;
  isSelected?: boolean;
  isLogoCard?: boolean;
}) {
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
        src: IMAGES[(config.imgStart + i) % IMAGES.length],
        height: h,
        shape: config.shapes[i],
        key: `c${colIndex}-r${i}`,
        // Center tile: center column (index 3), tile index 1 (tall upper-center slot)
        isLogoCard: colIndex === 3 && i === 1,
      })),
    [config, colIndex]
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
            style={{ zIndex: 20, opacity: textOpacity }}
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