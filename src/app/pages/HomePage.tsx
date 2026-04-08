import { motion, useMotionValue, useSpring, useTransform, animate } from "motion/react";
import React, { useRef, useEffect, useState, useMemo } from "react";

// ─── Gravity logo ─────────────────────────────────────────────────────────────
import gravityLogo from "@/assets/d2755bbe5130e82e2da96ee562f8b24d78c9a00a.png";

// ─── New replacement images (slots 0–7) ───────────────────────────────────────
import newImg0 from "@/assets/ecb6770e41175b59a115b0f3a41a8c6334c19752.png"; // office interior
import newImg1 from "@/assets/d900150c7cdfec6cb9495e5b4e00f89f108cf66d.png"; // school lawn
import newImg2 from "@/assets/23f3c5d3b033a2cb87371525d351815bf782ad5b.png"; // retail interior
import newImg3 from "@/assets/629794bdfd2990dc6a3ce9003566542b4c738978.png"; // luxury living room
import newImg4 from "@/assets/9725140cd3216e24855c3433d16281cbf90b77b7.png"; // school dusk
import newImg5 from "@/assets/b06f1f503232e620858c7013456bed2e8a969db4.png"; // high-rise complex
import newImg6 from "@/assets/1d92653eec918a706702f502d07c11309d836b31.png"; // glass towers
import newImg7 from "@/assets/8871e533654e6cb10bd2f59abad5552afb509be1.png"; // Innovista Indus

// ─── New replacement images (slots 8–16) ──────────────────────────────────────
import newImg8  from "@/assets/a9578a9426fa0fc4ad6da9caaf8939467386560b.png"; // luxury wood-ceiling interior
import newImg9  from "@/assets/5f3c2c40b6f7ac3efe82d24b61ce53f2c8ff6a2b.png"; // white arched building
import newImg10 from "@/assets/7c8e59d7c8faafdb80468dbc5fa3029b2980f855.png"; // indoor swimming pool
import newImg11 from "@/assets/390a913ebbf03169f4f3203cb9a48892d4bc3b71.png"; // NASTP A5 exterior
import newImg12 from "@/assets/a7759569c3d6c1a258e218b1b80afb6a72a99f29.png"; // modern residential house
import newImg13 from "@/assets/a2da5841bf8f42dc69a53d40282e0c99f69f72d6.png"; // tech campus garden
import newImg14 from "@/assets/68ad14b87fc9e0192d8d51b074e516f78cbb2b6f.png"; // open-plan office
import newImg15 from "@/assets/ad533d2cfebe437bea0025230bf3a9a8b79e3869.png"; // office interior 2
import newImg16 from "@/assets/6f1d0472b38706f7784fa68685e2891e9db04f2c.png"; // school red-stripe facade

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
  malirConstruction,  // slot 17 (unchanged)
  cyberExterior,      // slot 18 (unchanged)
  cyberRender,        // slot 19 (unchanged)
  cyberLobby,         // slot 20 (unchanged)
  gravityTower1Night, // slot 21 (unchanged)
  gravityTower1Day,   // slot 22 (unchanged)
  pafChaletExterior,  // slot 23 (unchanged)
  pafChaletHillside,  // slot 24 (unchanged)
  pafChaletRestaurant,// slot 25 (unchanged)
  pafVfomFront,       // slot 26 (unchanged)
  pafVfomAerial,      // slot 27 (unchanged)
  pafVfomEntrance,    // slot 28 (unchanged)
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
    imgStart: 3,  startOffset: -180,
  },
  {
    heights:    [0, 260, 200, 320, 240, 0, 220, 300, 260, 0, 320, 240],
    shapes:     ['s', 'r', 'r', 'r', 'r', 's', 'r', 'r', 'r', 's', 'r', 'r'],
    imgStart: 6,  startOffset: -30,
  },
  {
    heights:    [220, 280, 0, 200, 300, 260, 0, 220, 280, 320, 200, 0],
    shapes:     ['r', 'r', 's', 'r', 'r', 'r', 's', 'r', 'r', 'r', 'r', 's'],
    imgStart: 9,  startOffset: -250,
  },
  {
    heights:    [260, 200, 280, 0, 220, 320, 240, 260, 0, 280, 300, 0],
    shapes:     ['r', 'r', 'r', 's', 'r', 'r', 'r', 'r', 's', 'r', 'r', 's'],
    imgStart: 12, startOffset: -120,
  },
  {
    heights:    [0, 240, 260, 220, 300, 0, 280, 320, 240, 260, 0, 300],
    shapes:     ['s', 'r', 'r', 'r', 'r', 's', 'r', 'r', 'r', 'r', 's', 'r'],
    imgStart: 15, startOffset: -200,
  },
  {
    heights:    [200, 320, 0, 260, 280, 220, 300, 0, 320, 240, 260, 0],
    shapes:     ['r', 'r', 's', 'r', 'r', 'r', 'r', 's', 'r', 'r', 'r', 's'],
    imgStart: 18, startOffset: -80,
  },
];

// ─── Gaps ─────────────────────────────────────────────────────────────────────
const COL_GAP = 12;
const ROW_GAP = 12;

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
// Repeating pattern: square | portrait | landscape(span2) | portrait | square | landscape(span2)
type MobileItemType = "square" | "portrait" | "landscape";
const MOBILE_PATTERN: MobileItemType[] = [
  "square", "portrait", "landscape",
  "portrait", "square", "landscape",
];
const MOBILE_ITEM_COUNT = 30; // 5 full cycles = 30 images

function MobileGridItem({
  src,
  type,
  index,
  fadingOut,
}: {
  src: string;
  type: MobileItemType;
  index: number;
  onOpen?: (src: string, rect: DOMRect) => void;
  fadingOut: boolean;
  isSelected: boolean;
}) {
  const style: React.CSSProperties = {
    overflow: "hidden",
    borderRadius: 3,
    position: "relative",
  };
  if (type === "landscape") {
    style.gridColumn = "span 2";
    style.aspectRatio = "16 / 9";
  } else if (type === "portrait") {
    style.aspectRatio = "2 / 3";
  }

  return (
    <motion.div
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: fadingOut ? 0 : 1 }}
      transition={{ duration: 0.85, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        className="w-full h-full object-cover select-none"
      />
    </motion.div>
  );
}

function MobileGrid() {
  const items = useMemo(
    () =>
      Array.from({ length: MOBILE_ITEM_COUNT }, (_, i) => ({
        src: IMAGES[i % IMAGES.length],
        type: MOBILE_PATTERN[i % MOBILE_PATTERN.length],
        key: `m${i}`,
        index: i,
      })),
    []
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
        padding: "80px 8px 8px 8px",
        width: "100%",
        alignItems: "stretch",
      }}
    >
      {items.map((item) => (
        <MobileGridItem
          key={item.key}
          src={item.src}
          type={item.type}
          index={item.index}
          fadingOut={false}
          isSelected={false}
        />
      ))}
    </div>
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

// ─── Main HomePage ────────────────────────────────────────────────────────────
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

  // ── Zoom
  const zoomRaw = useMotionValue(INTRO_ZOOM_START);
  const zoom    = useSpring(zoomRaw, { stiffness: 80, damping: 24, mass: 0.7 });

  // ── Grid fade-in
  const gridOpacity       = useMotionValue(0);
  const smoothGridOpacity = useSpring(gridOpacity, { stiffness: 60, damping: 20, mass: 0.8 });

  // ── Wordmark: visible early, fades behind grid as zoom increases
  // At zoom 0.3 → text fully visible; at zoom ~1.2 → almost gone (0.15 remaining)
  const textOpacity = useTransform(zoom, [0.3, 0.7, 1.2], [1, 1, 0.15]);

  // ── Grid z-index: starts low (text above), ends high (grid covers text)
  const gridZIndex = useTransform(zoom, [0.3, 0.9, 1.4], [5, 12, 25]);

  // ── Bounce
  const bounceX = useMotionValue(0);
  const bounceY = useMotionValue(0);
  const smoothBounceX = useSpring(bounceX, { stiffness: 30, damping: 18, mass: 1.2 });
  const smoothBounceY = useSpring(bounceY, { stiffness: 30, damping: 18, mass: 1.2 });

  // ── Intro animation
  useEffect(() => {
    animate(gridOpacity, 1, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
    const t = setTimeout(() => {
      animate(zoomRaw, INTRO_ZOOM_END, {
        duration: INTRO_DURATION,
        ease: [0.25, 0.1, 0.25, 1],
        onComplete: () => setIntroComplete(true),
      });
    }, 200);
    return () => clearTimeout(t);
  }, [gridOpacity, zoomRaw]);

  // ── Bounce after intro
  useEffect(() => {
    if (!introComplete) return;
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
  }, [introComplete, bounceX, bounceY, zoomRaw]);

  // ── Scroll → zoom
  useEffect(() => {
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
  }, [hasScrolled, zoomRaw]);

  // ── Touch → zoom
  useEffect(() => {
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
  }, [hasScrolled, zoomRaw]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden select-none"
      style={{ background: "#F7F7F5", touchAction: "none" }}
    >
      {/* ── GRAVITY wordmark — centered, fades behind grid as you zoom in ── */}
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

      {/* ── Zooming + bouncing grid ── */}
      <motion.div
        className="absolute inset-0"
        style={{
          zIndex: gridZIndex,
          scale: zoom,
          x: smoothBounceX,
          y: smoothBounceY,
          transformOrigin: "50% 50%",
          willChange: "transform",
          opacity: smoothGridOpacity,
          // Desktop uses flex row, mobile uses the grid component
          display: isMobile ? "block" : "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: isMobile ? undefined : COL_GAP,
          padding: isMobile ? undefined : `80px ${COL_GAP}px`,
        }}
      >
        {isMobile ? (
          <MobileGrid />
        ) : (
          COL_CONFIGS.map((config, i) => (
            <Column
              key={i}
              config={config}
              colIndex={i}
              numCols={COL_CONFIGS.length}
              colGap={COL_GAP}
              rowGap={ROW_GAP}
            />
          ))
        )}
      </motion.div>

      {/* Scroll hint */}
      <ScrollHint visible={introComplete && !hasScrolled} />
    </div>
  );
}