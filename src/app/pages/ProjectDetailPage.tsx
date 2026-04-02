import { useParams, useNavigate, Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useRef } from "react";
import { projects } from "../data/projects";
import { ArrowLeft, ArrowRight, ArrowDown } from "lucide-react";

// ─── Fonts ───────────────────────────────────────────────────────────────────
const SANS  = "'DM Sans', 'Inter', sans-serif";
const SERIF = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";

// ─── Static supplementary images ─────────────────────────────────────────────
const STATIC = {
  cathedral: "https://images.unsplash.com/photo-1574545529295-dd6b786ba2e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRoZWRyYWwlMjBpbnRlcmlvciUyMGNvbHVtbnMlMjBzdGFpbmVkJTIwZ2xhc3MlMjBsaWdodCUyMGRyYW1hdGljfGVufDF8fHx8MTc3NTE2Mjg5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
  interior:  "https://images.unsplash.com/photo-1758413352731-d6f9ce3b59d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFuZCUyMGludGVyaW9yJTIwYXJjaGl0ZWN0dXJlJTIwbWFyYmxlJTIwY29sdW1ucyUyMGxpZ2h0fGVufDF8fHx8MTc3NTE2Mjg5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  detail:    "https://images.unsplash.com/photo-1774356599784-c7589417c134?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwaW50ZXJpb3IlMjBtaW5pbWFsJTIwY29uY3JldGUlMjBkZXRhaWx8ZW58MXx8fHwxNzc1MTYyODkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  night:     "https://images.unsplash.com/photo-1763888538104-a74b3685ab8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGV4dGVyaW9yJTIwbmlnaHQlMjBkcmFtYXRpY3xlbnwxfHx8fDE3NzUxNjI4OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  floorplan: "https://images.unsplash.com/photo-1762146828422-50a8bd416d3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZmxvb3IlMjBwbGFuJTIwYmx1ZXByaW50JTIwdGVjaG5pY2FsJTIwZHJhd2luZ3xlbnwxfHx8fDE3NzUxNjI4OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
};

// ─── Per-project data ─────────────────────────────────────────────────────────
const SUBTITLES: Record<string, string> = {
  "villa-nova":        "The Right Connections",
  "the-edge":          "The World's Most Sustainable Office",
  "sky-tower":         "Living Above the Clouds",
  "concrete-pavilion": "Light, Space, Silence",
  "geometric-house":   "Form Follows Flow",
  "lakeside-retreat":  "Where Architecture Meets Nature",
  "arts-center":       "Culture Without Walls",
  "glass-tower":       "Transparency at Scale",
  "brutalist-library": "Knowledge Forged in Concrete",
  "forest-cabin":      "A House Among Trees",
};

const QUOTES: Record<string, { text: string; author: string; role: string }> = {
  "villa-nova":        { text: "The city is not a problem to be solved — it is a condition to be inhabited with intelligence and grace.", author: "Nanne de Ru", role: "Founding Partner, Gravity" },
  "the-edge":          { text: "Sustainability is not a feature. It is the architecture itself — the logic of every decision.", author: "Stefan Prins", role: "Project Lead" },
  "sky-tower":         { text: "We wanted the building to feel as though it had always belonged to the skyline, and yet had never been seen before.", author: "Charles Bessard", role: "Design Director" },
  "concrete-pavilion": { text: "Concrete is patience made visible. We worked with light the way a sculptor works with stone — removing until only the essential remains.", author: "Nanne de Ru", role: "Founding Partner, Gravity" },
  "geometric-house":   { text: "A house is not a machine for living — it is a relationship. Between the people who inhabit it and the landscape that surrounds it.", author: "Stefan Prins", role: "Project Lead" },
  "lakeside-retreat":  { text: "We dissolved the boundary between inside and outside until the lake became another room.", author: "Charles Bessard", role: "Design Director" },
  "arts-center":       { text: "Culture is the city's most generous gift to itself. Our task was simply to hold the space open.", author: "Nanne de Ru", role: "Founding Partner, Gravity" },
  "glass-tower":       { text: "Transparency is not merely a material property. It is an ethical stance — a building declaring its presence honestly.", author: "Stefan Prins", role: "Project Lead" },
  "brutalist-library": { text: "The library must outlast its age. We built it from the material of permanence, and let light do the rest.", author: "Charles Bessard", role: "Design Director" },
  "forest-cabin":      { text: "The forest asked nothing of us except that we listen. The cabin is our answer.", author: "Nanne de Ru", role: "Founding Partner, Gravity" },
};

const CONCEPTS: Record<string, string> = {
  "villa-nova":        "The scheme emerges from a careful study of Rotterdam's port heritage — the grid of cranes, the rhythm of containers, the vast horizontal scale of the waterfront. Translated into residential form, these industrial logics yield a building of remarkable spatial generosity, where every apartment commands unobstructed river views through deep-recessed glazing.",
  "the-edge":          "Energy flows through The Edge the way daylight moves through its facades: continuously monitored, redirected, and never wasted. The building's nervous system — 28,000 sensors tracking occupancy, temperature, and light — means that no space is ever heated, cooled, or lit unnecessarily.",
  "sky-tower":         "The tower's form is generated by a single environmental logic: rotate each floor plate three degrees to reduce wind loads at altitude, while maintaining the orthogonal efficiency demanded by the commercial programme. The twist produces something the calculations could not have predicted — a building that seems in perpetual motion.",
  "concrete-pavilion": "In Japanese culture, the ma — the interval, the pause, the charged emptiness between things — is as architecturally significant as the mass that defines it. The pavilion is built around three courts of silence: the water court, the stone court, and the moss court.",
  "geometric-house":   "The house begins with a mathematical proposition: what is the minimum enclosure required to frame a landscape? The answer, after fourteen months of development, is two overlapping hexagonal volumes, their intersection creating the home's primary living space — a room that feels simultaneously vast and intimate.",
  "lakeside-retreat":  "Siting was the project's most demanding act. The hotel must appear inevitable — as though the lake had deposited it there slowly, like a geological event. The building's roof-plane follows the gradient of the hillside precisely.",
  "arts-center":       "The building refuses the traditional hierarchy of arts institutions — the grand entrance, the monumental stair, the sequence of increasingly important galleries. Instead, every threshold is equal. You may enter from the street, from the plaza, from the park, or from below.",
  "glass-tower":       "The double-skin facade is the building's primary environmental device: a twelve-centimeter cavity that buffers the office floors against temperature extremes while enabling natural ventilation for nearly nine months of the year.",
  "brutalist-library": "There is a common misunderstanding about Brutalism: that it is cold, inhospitable, indifferent to human scale. This library is an argument against that reading. The raw concrete exterior is deliberate — a declaration of civic seriousness. Inside, the same material is warmed by timber, softened by light.",
  "forest-cabin":      "The cabin is cross-laminated timber throughout — floors, walls, ceilings, structural elements. Every surface is the same material in a different orientation, a decision that produces an interior of extraordinary coherence.",
};

const SIZE_MAP: Record<string, string> = {
  Residential: "4,200 m²", Commercial: "18,500 m²",
  "Mixed Use": "32,000 m²", Cultural: "8,900 m²",
  Hospitality: "12,400 m²", Public: "15,600 m²",
};

// ─── Easing ───────────────────────────────────────────────────────────────────
const EASE_CINEMATIC = [0.76, 0, 0.24, 1] as const;
const EASE_SMOOTH    = [0.22, 1, 0.36, 1] as const;

// ─── Carousel variants ────────────────────────────────────────────────────────
const carouselVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%" }),
  center: { x: "0%" },
  exit:   (dir: number) => ({ x: dir > 0 ? "-100%" : "100%" }),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Divider({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <div
      className={className}
      style={{ borderTop: `0.5px solid ${light ? "rgba(255,255,255,0.15)" : "#e8e8e8"}`, width: "100%" }}
    />
  );
}

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay, ease: EASE_SMOOTH }}
    >
      {children}
    </motion.div>
  );
}

function SlideUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 1, delay, ease: EASE_CINEMATIC }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Parallax Hero Image ──────────────────────────────────────────────────────
function HeroParallax({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, scale: 1.15 }}>
        <img
          src={src}
          alt="hero"
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
      </motion.div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Main component
// ═════════════════════════════════════════════════════════════════════════════
export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [carouselDir, setCarouselDir] = useState(1);
  const [planIdx, setPlanIdx] = useState(0);
  const { scrollYProgress } = useScroll();

  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <div className="h-screen bg-black flex items-center justify-center" style={{ fontFamily: SANS }}>
        <div className="text-center">
          <p className="m-0 mb-6 uppercase tracking-[0.25em]" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
            Project not found
          </p>
          <button
            onClick={() => navigate("/projects")}
            className="uppercase tracking-[0.15em] bg-transparent border-none cursor-pointer"
            style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", borderBottom: "0.5px solid rgba(255,255,255,0.3)", paddingBottom: 2 }}
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  const subtitle  = SUBTITLES[project.id] || project.category;
  const quote     = QUOTES[project.id]    || { text: "Architecture is a social act.", author: "Nanne de Ru", role: "Founding Partner" };
  const concept   = CONCEPTS[project.id] || project.description;
  const size      = SIZE_MAP[project.category] || "9,800 m²";
  const yearEnd   = parseInt(project.year);
  const timespan  = `${yearEnd - 2} — ${project.year}`;

  const galleryImages = [
    project.image,
    project.images[0],
    STATIC.interior,
    project.images[1],
    STATIC.detail,
  ].filter(Boolean) as string[];

  const galleryCapts = [
    "Exterior view — primary elevation",
    "Interior atmosphere — spatial quality",
    "Architectural detail — material palette",
    "Section perspective — structural logic",
    "Threshold study — light and boundary",
  ];

  const floorPlans = [
    { label: "Site Plan",    img: STATIC.floorplan },
    { label: "Ground Floor", img: STATIC.floorplan },
    { label: "Typical Floor",img: STATIC.floorplan },
  ];

  const infoItems = [
    { label: "Time span",  value: timespan },
    { label: "Floor area", value: size },
    { label: "Status",     value: "Completed" },
    { label: "Location",   value: project.location },
    { label: "Type",       value: project.category },
  ];

  function goPrev() { setCarouselDir(-1); setCarouselIdx((i) => (i - 1 + galleryImages.length) % galleryImages.length); }
  function goNext() { setCarouselDir(1);  setCarouselIdx((i) => (i + 1) % galleryImages.length); }

  return (
    <div style={{ backgroundColor: "#fff", fontFamily: SANS, color: "#111", overflowX: "hidden" }}>

      {/* ── Scroll progress bar ───────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[300] h-[1px]"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "left",
          background: "linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.4))",
        }}
      />

      {/* ════════════════════════════════════════════════════════════════════
          HERO — fullscreen cinematic
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative" style={{ height: "100vh", minHeight: 640, overflow: "hidden" }}>

        {/* Background image with parallax */}
        <HeroParallax src={project.image} />

        {/* Dark gradient overlay — heavy on left, fades right */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: "linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 35%, rgba(0,0,0,0.38) 65%, rgba(0,0,0,0.18) 100%)",
          }}
        />

        {/* Vignette bottom */}
        <div
          className="absolute inset-x-0 bottom-0 z-[2]"
          style={{ height: "45%", background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }}
        />

        {/* Content */}
        <div className="absolute inset-0 z-[3] flex flex-col justify-between px-[clamp(28px,6vw,96px)] py-[clamp(100px,10vh,140px)]">

          {/* Top-left: category + year tag */}
          <motion.div
            className="flex items-center gap-5"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_SMOOTH }}
          >
            <span
              className="uppercase tracking-[0.28em]"
              style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", fontFamily: SANS, letterSpacing: "0.28em" }}
            >
              {project.category}
            </span>
            <span style={{ width: 28, height: "0.5px", background: "rgba(255,255,255,0.25)", display: "inline-block" }} />
            <span
              className="uppercase tracking-[0.22em]"
              style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: SANS }}
            >
              {project.location}
            </span>
          </motion.div>

          {/* Center-left: main title */}
          <div className="mt-auto" style={{ maxWidth: "clamp(320px, 60vw, 780px)" }}>
            {/* Subtitle line */}
            <div className="overflow-hidden mb-4">
              <motion.p
                className="m-0 uppercase tracking-[0.3em]"
                style={{ fontSize: "clamp(9px,0.85vw,11px)", color: "rgba(255,255,255,0.45)", fontFamily: SANS, letterSpacing: "0.3em" }}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.5, ease: EASE_CINEMATIC }}
              >
                {subtitle}
              </motion.p>
            </div>

            {/* Project title — large serif */}
            <div className="overflow-hidden">
              <motion.h1
                className="m-0 p-0"
                style={{
                  fontSize: "clamp(52px, 9vw, 130px)",
                  fontWeight: 300,
                  lineHeight: 0.92,
                  letterSpacing: "-0.025em",
                  color: "#fff",
                  fontFamily: SERIF,
                }}
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.65, ease: EASE_CINEMATIC }}
              >
                {project.title}
              </motion.h1>
            </div>

            {/* Year badge */}
            <motion.div
              className="flex items-center gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: EASE_SMOOTH }}
            >
              <span
                style={{
                  display: "inline-block",
                  border: "0.5px solid rgba(255,255,255,0.25)",
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: SANS,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  padding: "6px 14px",
                  textTransform: "uppercase",
                  borderRadius: 2,
                }}
              >
                {project.year}
              </span>
            </motion.div>
          </div>

          {/* Bottom-right: scroll hint */}
          <motion.div
            className="self-end flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease: EASE_SMOOTH }}
          >
            <span
              className="uppercase tracking-[0.25em]"
              style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: SANS }}
            >
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={11} color="rgba(255,255,255,0.3)" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          INFO BAR — metadata strip
      ════════════════════════════════════════════════════════════════════ */}
      <FadeUp>
        <div style={{ borderBottom: "0.5px solid #e8e8e8" }}>
          <div
            className="flex flex-wrap"
            style={{ maxWidth: "100%" }}
          >
            {infoItems.map((item, i) => (
              <div
                key={item.label}
                className="flex-1"
                style={{
                  minWidth: 140,
                  padding: "28px clamp(24px,4vw,56px)",
                  borderRight: i < infoItems.length - 1 ? "0.5px solid #e8e8e8" : "none",
                }}
              >
                <p
                  className="m-0 mb-2 uppercase tracking-[0.25em]"
                  style={{ fontSize: 8, color: "#bbb", fontFamily: SANS }}
                >
                  {item.label}
                </p>
                <p
                  className="m-0"
                  style={{ fontSize: 13, color: "#1a1a1a", fontWeight: 400, fontFamily: SANS, letterSpacing: "0.01em" }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ════════════════════════════════════════════════════════════════════
          OVERVIEW — two-column text block
      ════════════════════════════════════════════════════════════════════ */}
      <div
        className="px-[clamp(28px,6vw,96px)]"
        style={{ paddingTop: "clamp(80px,10vw,140px)", paddingBottom: "clamp(60px,8vw,100px)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <SlideUp>
              <p
                className="m-0 uppercase tracking-[0.28em]"
                style={{ fontSize: 8, color: "#bbb", fontFamily: SANS }}
              >
                Project Overview
              </p>
            </SlideUp>
            <SlideUp delay={0.08}>
              <h2
                className="m-0 mt-5"
                style={{
                  fontSize: "clamp(26px, 3.5vw, 46px)",
                  fontWeight: 300,
                  fontFamily: SERIF,
                  color: "#111",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                The Vision
              </h2>
            </SlideUp>
          </div>
          <FadeUp delay={0.1}>
            <p
              className="m-0"
              style={{
                fontSize: "clamp(14px, 1.3vw, 17px)",
                lineHeight: 1.88,
                color: "#555",
                fontWeight: 300,
                fontFamily: SANS,
                maxWidth: "68ch",
              }}
            >
              {project.description}
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          FULL-BLEED IMAGE — first scroll reveal
      ════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="relative overflow-hidden"
        style={{ height: "clamp(420px, 65vh, 800px)" }}
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.3, ease: EASE_CINEMATIC }}
      >
        <img
          src={project.images[0]}
          alt={`${project.title} interior view`}
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
        {/* Subtle dark overlay at bottom */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ height: "30%", background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)" }}
        />
        <div
          className="absolute bottom-0 left-0 px-[clamp(28px,6vw,96px)] pb-8"
        >
          <p
            className="m-0 uppercase tracking-[0.22em]"
            style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: SANS }}
          >
            {project.location} — {project.year}
          </p>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════════
          CONCEPT — editorial text section
      ════════════════════════════════════════════════════════════════════ */}
      <div
        className="px-[clamp(28px,6vw,96px)]"
        style={{ paddingTop: "clamp(80px,10vw,140px)", paddingBottom: "clamp(60px,8vw,100px)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <SlideUp>
              <p
                className="m-0 uppercase tracking-[0.28em]"
                style={{ fontSize: 8, color: "#bbb", fontFamily: SANS }}
              >
                Design Concept
              </p>
            </SlideUp>
            <SlideUp delay={0.08}>
              <h2
                className="m-0 mt-5"
                style={{
                  fontSize: "clamp(26px, 3.5vw, 46px)",
                  fontWeight: 300,
                  fontFamily: SERIF,
                  color: "#111",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Design<br />Intent
              </h2>
            </SlideUp>
          </div>
          <FadeUp delay={0.1}>
            <p
              className="m-0"
              style={{
                fontSize: "clamp(14px, 1.3vw, 17px)",
                lineHeight: 1.88,
                color: "#555",
                fontWeight: 300,
                fontFamily: SANS,
                maxWidth: "68ch",
              }}
            >
              {concept}
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          GALLERY CAROUSEL — cinematic sliding
      ════════════════════════════════════════════════════════════════════ */}
      <div className="px-[clamp(28px,6vw,96px)]" style={{ paddingBottom: "clamp(80px,10vw,140px)" }}>
        <FadeUp>
          {/* Track */}
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: "16/9",
              maxHeight: 580,
              background: "#0a0a0a",
              borderRadius: 2,
            }}
          >
            <AnimatePresence initial={false} custom={carouselDir} mode="sync">
              <motion.img
                key={carouselIdx}
                src={galleryImages[carouselIdx]}
                alt={galleryCapts[carouselIdx]}
                custom={carouselDir}
                variants={carouselVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ willChange: "transform" }}
              />
            </AnimatePresence>

            {/* Image counter overlay */}
            <div className="absolute top-6 right-6 z-10">
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: 10,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.12em",
                  background: "rgba(0,0,0,0.3)",
                  padding: "4px 10px",
                  backdropFilter: "blur(8px)",
                  borderRadius: 1,
                }}
              >
                {String(carouselIdx + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between mt-5">
            <p
              className="m-0"
              style={{ fontSize: 11, color: "#aaa", fontFamily: SANS, maxWidth: "55ch", letterSpacing: "0.02em" }}
            >
              {galleryCapts[carouselIdx]}
            </p>
            <div className="flex items-center gap-5 shrink-0 ml-8">
              <button
                onClick={goPrev}
                className="flex items-center justify-center bg-transparent border-none cursor-pointer transition-opacity hover:opacity-40 p-0"
                style={{ width: 36, height: 36, border: "0.5px solid #ddd", borderRadius: "50%" }}
                aria-label="Previous"
              >
                <ArrowLeft size={12} color="#555" strokeWidth={1.5} />
              </button>
              <button
                onClick={goNext}
                className="flex items-center justify-center bg-transparent cursor-pointer transition-opacity hover:opacity-40 p-0"
                style={{ width: 36, height: 36, background: "#111", borderRadius: "50%", border: "none" }}
                aria-label="Next"
              >
                <ArrowRight size={12} color="#fff" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          PULL QUOTE — full-width dark section
      ═══════════════════════════════���════════════════════════════════════ */}
      <div style={{ background: "#0a0a0a", padding: "clamp(80px,10vw,140px) clamp(28px,6vw,96px)" }}>
        <div style={{ maxWidth: "80ch" }}>
          <SlideUp>
            <p
              className="m-0"
              style={{
                fontSize: "clamp(22px, 2.8vw, 40px)",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.88)",
                fontFamily: SERIF,
                letterSpacing: "0.005em",
              }}
            >
              "{quote.text}"
            </p>
          </SlideUp>
          <FadeUp delay={0.2}>
            <div className="flex items-center gap-6 mt-10">
              <div style={{ width: 32, height: "0.5px", background: "rgba(255,255,255,0.2)" }} />
              <div>
                <p
                  className="m-0"
                  style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: SANS, letterSpacing: "0.06em" }}
                >
                  {quote.author}
                </p>
                <p
                  className="m-0 mt-1"
                  style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: SANS, letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  {quote.role}
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          MATERIALS — editorial text
      ════════════════════════════════════════════════════════════════════ */}
      <div
        className="px-[clamp(28px,6vw,96px)]"
        style={{ paddingTop: "clamp(80px,10vw,140px)", paddingBottom: "clamp(60px,8vw,100px)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <SlideUp>
              <p className="m-0 uppercase tracking-[0.28em]" style={{ fontSize: 8, color: "#bbb", fontFamily: SANS }}>
                Materials & Construction
              </p>
            </SlideUp>
            <SlideUp delay={0.08}>
              <h2
                className="m-0 mt-5"
                style={{
                  fontSize: "clamp(26px, 3.5vw, 46px)",
                  fontWeight: 300,
                  fontFamily: SERIF,
                  color: "#111",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Built to<br />Last
              </h2>
            </SlideUp>
          </div>
          <FadeUp delay={0.1}>
            <p
              className="m-0"
              style={{ fontSize: "clamp(14px, 1.3vw, 17px)", lineHeight: 1.88, color: "#555", fontWeight: 300, fontFamily: SANS, maxWidth: "68ch" }}
            >
              The material palette was established early in the design process and remained
              unchanged throughout construction — a discipline that gave the building its
              coherence. Primary structure in exposed concrete; secondary elements in
              powder-coated steel; internal finishes in raw oak and polished limestone.
              No material appears in this project that cannot be seen, understood, and
              eventually returned to nature.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          TWO-COLUMN IMAGE GRID
      ════════════════════════════════════════════════════════════════════ */}
      <div className="px-[clamp(28px,6vw,96px)]" style={{ paddingBottom: "clamp(80px,10vw,140px)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { src: STATIC.night,   cap: "Exterior at dusk — materiality under artificial light" },
            { src: STATIC.detail,  cap: "Architectural detail — surface texture and shadow" },
          ].map((img, i) => (
            <FadeUp key={img.src} delay={i * 0.15}>
              <motion.div
                className="overflow-hidden"
                style={{ height: "clamp(240px, 38vh, 460px)", borderRadius: 2 }}
                initial={{ scale: 1.06, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.2, delay: i * 0.12, ease: EASE_CINEMATIC }}
              >
                <img
                  src={img.src}
                  alt={img.cap}
                  className="w-full h-full object-cover"
                  style={{ display: "block" }}
                />
              </motion.div>
              <p
                className="m-0 mt-4"
                style={{ fontSize: 11, color: "#aaa", fontFamily: SANS, letterSpacing: "0.02em" }}
              >
                {img.cap}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          FLOOR PLANS
      ════════════════════════════════════════════════════════════════════ */}
      <div
        className="px-[clamp(28px,6vw,96px)]"
        style={{ paddingBottom: "clamp(80px,10vw,140px)", borderTop: "0.5px solid #e8e8e8", paddingTop: "clamp(60px,8vw,100px)" }}
      >
        <FadeUp>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="m-0 mb-3 uppercase tracking-[0.28em]" style={{ fontSize: 8, color: "#bbb", fontFamily: SANS }}>
                Technical Drawings
              </p>
              <h2
                className="m-0"
                style={{ fontSize: "clamp(22px, 2.8vw, 38px)", fontWeight: 300, fontFamily: SERIF, color: "#111", letterSpacing: "-0.01em" }}
              >
                Floor Plans
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPlanIdx((i) => Math.max(0, i - 1))}
                className="bg-transparent cursor-pointer p-0 flex items-center justify-center transition-opacity"
                style={{
                  opacity: planIdx === 0 ? 0.2 : 1,
                  width: 34, height: 34,
                  border: "0.5px solid #ddd",
                  borderRadius: "50%",
                }}
                disabled={planIdx === 0}
                aria-label="Previous plan"
              >
                <ArrowLeft size={11} color="#555" strokeWidth={1.5} />
              </button>
              <span style={{ fontSize: 10, color: "#bbb", fontFamily: SANS, letterSpacing: "0.1em", minWidth: 48, textAlign: "center" }}>
                {String(planIdx + 1).padStart(2, "0")} / {String(floorPlans.length).padStart(2, "0")}
              </span>
              <button
                onClick={() => setPlanIdx((i) => Math.min(floorPlans.length - 1, i + 1))}
                className="cursor-pointer p-0 flex items-center justify-center transition-opacity"
                style={{
                  opacity: planIdx === floorPlans.length - 1 ? 0.2 : 1,
                  width: 34, height: 34,
                  background: "#111",
                  border: "none",
                  borderRadius: "50%",
                }}
                disabled={planIdx === floorPlans.length - 1}
                aria-label="Next plan"
              >
                <ArrowRight size={11} color="#fff" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {floorPlans.map((plan, i) => (
              <motion.div
                key={plan.label}
                animate={{ opacity: i === planIdx ? 1 : 0.28 }}
                transition={{ duration: 0.5 }}
                onClick={() => setPlanIdx(i)}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{
                    background: "#f4f4f4",
                    border: i === planIdx ? "0.5px solid #bbb" : "0.5px solid #eee",
                    overflow: "hidden",
                    borderRadius: 2,
                    transition: "border-color 0.4s",
                  }}
                >
                  <img
                    src={plan.img}
                    alt={plan.label}
                    className="w-full object-cover block"
                    style={{ height: 170, filter: "grayscale(30%) contrast(0.85)", transition: "filter 0.4s" }}
                  />
                </div>
                <p
                  className="m-0 mt-3 uppercase tracking-[0.2em]"
                  style={{
                    fontSize: 9,
                    color: i === planIdx ? "#555" : "#ccc",
                    fontFamily: SANS,
                    transition: "color 0.4s",
                  }}
                >
                  {plan.label}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          CLOSING FULL-BLEED IMAGE
      ════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="relative overflow-hidden"
        style={{ height: "clamp(380px, 60vh, 700px)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4, ease: EASE_CINEMATIC }}
      >
        <img
          src={STATIC.cathedral}
          alt="Architectural atmosphere"
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }}
        />
        <div className="absolute bottom-8 left-[clamp(28px,6vw,96px)]">
          <p
            className="m-0 uppercase tracking-[0.22em]"
            style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontFamily: SANS }}
          >
            Gravity Architecture Studio — {project.year}
          </p>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════════
          PROJECT NAVIGATION — prev / next
      ════════════════════════════════════════════════════════════════════ */}
      <div className="px-[clamp(28px,6vw,96px)]" style={{ paddingTop: 0 }}>
        <Divider className="mt-0" />
        <div className="flex justify-between items-center py-10">
          {/* Prev */}
          <motion.button
            className="group flex items-center gap-5 bg-transparent border-none cursor-pointer p-0 text-left"
            onClick={() => navigate(`/project/${prevProject.id}`)}
            whileHover={{ x: -5 }}
            transition={{ duration: 0.25, ease: EASE_SMOOTH }}
          >
            <div
              style={{
                width: 38, height: 38,
                border: "0.5px solid #ddd",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.25s, border-color 0.25s",
              }}
              className="group-hover:bg-black group-hover:border-black transition-all"
            >
              <ArrowLeft size={13} strokeWidth={1.5} color="#999" className="group-hover:!text-white" />
            </div>
            <div>
              <p className="m-0 mb-1.5 uppercase tracking-[0.22em]" style={{ fontSize: 8, color: "#ccc", fontFamily: SANS }}>Previous</p>
              <p className="m-0" style={{ fontSize: 14, color: "#444", fontFamily: SERIF, fontWeight: 300, letterSpacing: "0.01em" }}>
                {prevProject.title}
              </p>
            </div>
          </motion.button>

          <Link
            to="/projects"
            className="no-underline uppercase tracking-[0.22em] transition-opacity hover:opacity-50"
            style={{ fontSize: 9, color: "#ccc", fontFamily: SANS }}
          >
            All Projects
          </Link>

          {/* Next */}
          <motion.button
            className="group flex items-center gap-5 bg-transparent border-none cursor-pointer p-0 text-right"
            onClick={() => navigate(`/project/${nextProject.id}`)}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.25, ease: EASE_SMOOTH }}
          >
            <div className="text-right">
              <p className="m-0 mb-1.5 uppercase tracking-[0.22em]" style={{ fontSize: 8, color: "#ccc", fontFamily: SANS }}>Next</p>
              <p className="m-0" style={{ fontSize: 14, color: "#444", fontFamily: SERIF, fontWeight: 300, letterSpacing: "0.01em" }}>
                {nextProject.title}
              </p>
            </div>
            <div
              style={{
                width: 38, height: 38,
                background: "#111",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "none",
                transition: "opacity 0.25s",
              }}
              className="group-hover:opacity-70"
            >
              <ArrowRight size={13} strokeWidth={1.5} color="#fff" />
            </div>
          </motion.button>
        </div>
        <Divider />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER CTA
      ════════════════════════════════════════════════════════════════════ */}
      <div
        className="flex flex-col items-center justify-center text-center"
        style={{ padding: "clamp(100px,14vw,180px) clamp(28px,6vw,96px)" }}
      >
        <SlideUp>
          <h2
            className="m-0"
            style={{
              fontSize: "clamp(36px, 5.5vw, 76px)",
              fontWeight: 300,
              fontFamily: SERIF,
              color: "#0a0a0a",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Start the conversation
          </h2>
        </SlideUp>
        <FadeUp delay={0.15}>
          <p
            className="m-0 mt-5"
            style={{ fontSize: "clamp(13px, 1.1vw, 15px)", color: "#aaa", fontWeight: 300, fontFamily: SANS, letterSpacing: "0.02em" }}
          >
            Every great building begins with a conversation
          </p>
        </FadeUp>
        <FadeUp delay={0.25} className="mt-10">
          <Link
            to="/contact"
            className="no-underline inline-flex items-center gap-4 uppercase tracking-[0.22em] transition-opacity hover:opacity-50"
            style={{
              fontSize: 10,
              color: "#111",
              fontFamily: SANS,
              borderBottom: "0.5px solid #111",
              paddingBottom: 3,
            }}
          >
            Get in touch
          </Link>
        </FadeUp>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════════════ */}
      <footer className="px-[clamp(28px,6vw,96px)] pb-10">
        <Divider className="mb-7" />
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="no-underline uppercase tracking-[0.2em] transition-opacity hover:opacity-40"
            style={{ fontSize: 10, color: "#888", fontFamily: SANS }}
          >
            Gravity
          </Link>
          <div className="flex items-center gap-8">
            {["Imprint", "Privacy"].map((label) => (
              <a
                key={label}
                href="#"
                className="no-underline uppercase tracking-[0.18em] transition-opacity hover:opacity-50"
                style={{ fontSize: 9, color: "#ccc", fontFamily: SANS }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
