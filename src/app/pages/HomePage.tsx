import { motion, useMotionValue, useSpring, useTransform, animate } from "motion/react";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { projects } from "../data/projects";

// ─── Image pool ───────────────────────────────────────────────────────────────
const IMAGES = [
  "https://images.unsplash.com/photo-1695067439031-f59068994fae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NDg0MDQ0OHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1772632664338-58f4a7b3bdd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBpbnRlcmlvciUyMGFyY2hpdGVjdHVyZSUyMGxpZ2h0fGVufDF8fHx8MTc3NDg5OTIzOHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1714601344981-75e003bc5d18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHNreXNjcmFwZXIlMjB1cmJhbiUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NzQ4OTkyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1756706718604-ef4af3970e33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY29uY3JldGUlMjBob3VzZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzQ4OTkyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1600365134100-7fc7958bd884?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBhcmNoaXRlY3R1cmUlMjBjYWJpbiUyMG5hdHVyZXxlbnwxfHx8fDE3NzQ4OTkyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1764276127787-5f19b6d8906c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBjdWx0dXJhbCUyMGFyY2hpdGVjdHVyZSUyMGZhY2FkZXxlbnwxfHx8fDE3NzQ4OTkyNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1757264119016-7e6b568b810d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2wlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc0ODk5MjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1640788797345-3708cdf2896f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwaGFsbCUyMHBlcmZvcm1pbmclMjBhcnRzJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3NDg5OTI0NHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1724118135465-edeef6acf221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZ2UlMjBpbmZyYXN0cnVjdHVyZSUyMHN0ZWVsJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3NDg5OTI0NXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1771337744364-e7dd00c2921c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMHVyYmFuJTIwcmVzaWRlbnRpYWwlMjBmYWNhZGV8ZW58MXx8fHwxNzc0ODk5MjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1735424325493-7dec695219c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjYXRoZWRyYWwlMjBtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzQ4OTkyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1768501362079-bf04cec711db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBhZXJpYWwlMjB2aWV3JTIwY2l0eSUyMHJvb2Z0b3B8ZW58MXx8fHwxNzc0ODk5MjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1699791910411-6c9ea7f47b3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGZhY2FkZXxlbnwxfHx8fDE3NzQ4Nzg5OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1602872029708-84d970d3382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzQ3ODQxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1662075024396-9f9348262b8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFyY2hpdGVjdHVyZSUyMHNreXNjcmFwZXJ8ZW58MXx8fHwxNzc0ODk2MjE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1744148621897-5fb0b6323543?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY29uY3JldGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc0ODgyOTYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1520073220816-469094c16514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZGV0YWlsJTIwZ2VvbWV0cmljfGVufDF8fHx8MTc3NDg5NjIyMHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1758448756880-01dbaf85597d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVuY2UlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc0ODk2MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1685352212233-76a91e443bb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcmNoaXRlY3R1cmUlMjBtb2Rlcm58ZW58MXx8fHwxNzc0Nzc5MDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1651644949986-bf52159f77b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGJ1aWxkaW5nJTIwYXJjaGl0ZWN0dXJlJTIwbmlnaHR8ZW58MXx8fHwxNzc0ODk2MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1769283979195-d418a41ae2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnV0YWxpc3QlMjBhcmNoaXRlY3R1cmUlMjBjb25jcmV0ZXxlbnwxfHx8fDE3NzQ3NzcyOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1758509362549-df81e9e779c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBhcmNoaXRlY3R1cmUlMjBjYWJpbiUyMG1vZGVybnxlbnwxfHx8fDE3NzQ4OTYyMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
];

// ─── Project mapping ──────────────────────────────────────────────────────────
function findProjectForImage(src: string) {
  const exact = projects.find((p) => p.image === src);
  if (exact) return exact;
  const inImages = projects.find((p) => p.images.includes(src));
  if (inImages) return inImages;
  const idx = IMAGES.indexOf(src);
  return projects[idx % projects.length];
}

// ─── Column config ────────────────────────────────────────────────────────────
interface ColConfig {
  heights: number[];
  imgStart: number;
  startOffset: number;
}

const COL_CONFIGS: ColConfig[] = [
  { heights: [280, 200, 320, 240, 260, 300, 220, 280, 200, 320, 260, 240], imgStart: 0,  startOffset: -60  },
  { heights: [240, 300, 220, 280, 260, 200, 320, 240, 300, 220, 280, 260], imgStart: 3,  startOffset: -180 },
  { heights: [300, 260, 200, 320, 240, 280, 220, 300, 260, 200, 320, 240], imgStart: 6,  startOffset: -30  },
  { heights: [220, 280, 320, 200, 300, 260, 240, 220, 280, 320, 200, 300], imgStart: 9,  startOffset: -250 },
  { heights: [260, 200, 280, 300, 220, 320, 240, 260, 200, 280, 300, 220], imgStart: 12, startOffset: -120 },
  { heights: [320, 240, 260, 220, 300, 200, 280, 320, 240, 260, 220, 300], imgStart: 15, startOffset: -200 },
  { heights: [200, 320, 240, 260, 280, 220, 300, 200, 320, 240, 260, 280], imgStart: 18, startOffset: -80  },
];

// ─── Gaps ─────────────────────────────────────────────────────────────────────
const COL_GAP = 14;   // px between columns
const ROW_GAP = 14;   // px between images within a column

// ─── Intro constants ──────────────────────────────────────────────────────────
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

// ─── Transition state ─────────────────────────────────────────────────────────
interface TransitionState {
  src: string;
  rect: DOMRect;
}

// ─── Single image tile ────────────────────────────────────────────────────────
function ImageTileCard({
  src,
  height,
  delay,
  onOpen,
  fadingOut,
  isSelected,
}: {
  src: string;
  height: number;
  delay: number;
  onOpen: (src: string, rect: DOMRect) => void;
  fadingOut: boolean;
  isSelected: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (ref.current) {
      onOpen(src, ref.current.getBoundingClientRect());
    }
  };

  return (
    <motion.div
      ref={ref}
      className="w-full shrink-0 group cursor-pointer overflow-hidden relative"
      style={{ height, borderRadius: 3 }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: fadingOut ? 0 : 1,
      }}
      transition={
        fadingOut
          ? {
              duration: isSelected ? 0.5 : 0.6,
              delay: isSelected ? 0.5 : 0,
              ease: [0.22, 1, 0.36, 1],
            }
          : { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
      }
      whileHover={!fadingOut ? { scale: 1.03, zIndex: 30, transition: { duration: 0.35 } } : undefined}
      onClick={!fadingOut ? handleClick : undefined}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div
        className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-3 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400"
        style={{ pointerEvents: "none" }}
      >
        <span className="text-white uppercase tracking-widest" style={{ fontSize: "9px" }}>View</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 11L11 1M11 1H3M11 1V9" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.div>
  );
}

// ─── Column ───────────────────────────────────────────────────────────────────
function Column({
  config,
  colIndex,
  onOpen,
  fadingOut,
  selectedSrc,
}: {
  config: ColConfig;
  colIndex: number;
  onOpen: (src: string, rect: DOMRect) => void;
  fadingOut: boolean;
  selectedSrc: string | null;
}) {
  const images = useMemo(
    () =>
      config.heights.map((h, i) => ({
        src: IMAGES[(config.imgStart + i) % IMAGES.length],
        height: h,
        key: `c${colIndex}-r${i}`,
      })),
    [config, colIndex]
  );

  return (
    <div
      className="flex flex-col shrink-0"
      style={{
        width: `calc((100% - ${6 * COL_GAP}px) / 7)`,
        gap: ROW_GAP,
        marginTop: config.startOffset,
      }}
    >
      {images.map((img, i) => (
        <ImageTileCard
          key={img.key}
          src={img.src}
          height={img.height}
          delay={colIndex * 0.06 + i * 0.03}
          onOpen={onOpen}
          fadingOut={fadingOut}
          isSelected={img.src === selectedSrc}
        />
      ))}
    </div>
  );
}

// ─── Fullscreen transition overlay ────────────────────────────────────────────
function TransitionOverlay({
  state,
  onComplete,
}: {
  state: TransitionState;
  onComplete: () => void;
}) {
  const project = findProjectForImage(state.src);

  return (
    <motion.div className="fixed inset-0" style={{ zIndex: 100 }}>
      <div className="absolute inset-0 bg-black" />
      <motion.div
        className="absolute overflow-hidden"
        initial={{
          top: state.rect.top,
          left: state.rect.left,
          width: state.rect.width,
          height: state.rect.height,
          borderRadius: 3,
          opacity: 1,
        }}
        animate={{
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight * 0.7,
          borderRadius: 0,
          opacity: 1,
        }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={onComplete}
      >
        <img src={state.src} alt="" className="w-full h-full object-cover" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      </motion.div>

      <motion.div
        className="absolute left-0 right-0 px-6 md:px-16 lg:px-24"
        style={{ bottom: "30vh", marginBottom: "-60px" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1
          className="text-white"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "clamp(36px, 5vw, 80px)",
            fontWeight: 300,
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h1>
      </motion.div>
    </motion.div>
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
  const [transition, setTransition]         = useState<TransitionState | null>(null);
  const [showOverlay, setShowOverlay]       = useState(false);
  const navigate = useNavigate();

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

  // ── Handlers
  const handleOpen = useCallback((src: string, rect: DOMRect) => {
    setTransition({ src, rect });
    setTimeout(() => setShowOverlay(true), 950);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    const project = findProjectForImage(transition!.src);
    navigate(`/project/${project.id}`, { state: { heroImage: transition!.src } });
  }, [navigate, transition]);

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
      {/* ── POWERHOUSE wordmark — centered, fades behind grid as you zoom in ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 20, opacity: transition ? 0 : textOpacity }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(60px, 11vw, 160px)",
            color: "#1a1a1a",
            letterSpacing: "0.12em",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          POWERHOUSE
        </span>
      </motion.div>

      {/* Dark overlay during project transition */}
      {transition && (
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ zIndex: 4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {/* ── Zooming + bouncing grid ── */}
      <motion.div
        className="absolute inset-0 flex justify-center items-start"
        style={{
          gap: COL_GAP,
          padding: `80px ${COL_GAP}px`,
          zIndex: gridZIndex,
          scale: zoom,
          x: smoothBounceX,
          y: smoothBounceY,
          transformOrigin: "50% 50%",
          willChange: "transform",
          opacity: smoothGridOpacity,
        }}
      >
        {COL_CONFIGS.map((config, i) => (
          <Column
            key={i}
            config={config}
            colIndex={i}
            onOpen={handleOpen}
            fadingOut={!!transition}
            selectedSrc={transition?.src ?? null}
          />
        ))}
      </motion.div>

      {/* Scroll hint */}
      <ScrollHint visible={introComplete && !hasScrolled && !transition} />

      {/* Transition overlay */}
      {showOverlay && transition && (
        <TransitionOverlay state={transition} onComplete={handleTransitionComplete} />
      )}
    </div>
  );
}
