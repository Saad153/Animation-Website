import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const STATS = [
  { value: "1993", label: "Founded" },
  { value: "180+", label: "Projects Built" },
  { value: "28", label: "Countries" },
  { value: "4", label: "Offices" },
];

const SERVICES = [
  {
    num: "01",
    title: "Architecture",
    body: "From concept to completion, we design buildings that challenge convention and elevate urban environments — residential towers, cultural institutions, public infrastructure, and everything between.",
  },
  {
    num: "02",
    title: "Urban Design",
    body: "We shape entire neighborhoods and masterplans. Our urban design practice integrates density, mobility, ecology, and community into cohesive, livable districts.",
  },
  {
    num: "03",
    title: "Interior Architecture",
    body: "Interior spaces are designed with the same rigor as our buildings. We create environments that respond to human scale, material quality, and the specific character of each place.",
  },
  {
    num: "04",
    title: "Research & Innovation",
    body: "Our embedded research unit explores new construction methods, circular material flows, and climate-adaptive building systems — turning insight into built reality.",
  },
];

const AWARDS = [
  { year: "2024", title: "Dutch Architecture Award", project: "Concrete Pavilion, Tokyo" },
  { year: "2023", title: "RIBA International Prize", project: "Glass Tower, London" },
  { year: "2023", title: "Architizer A+ Award", project: "Brutalist Library, Berlin" },
  { year: "2022", title: "World Architecture Festival", project: "Arts Center, Oslo" },
  { year: "2021", title: "AR New Into Old Award", project: "Villa Nova, Rotterdam" },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="bg-black min-h-screen" style={{ fontFamily: "'Inter', sans-serif", position: "relative" }}>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div ref={heroRef} className="relative overflow-hidden" style={{ height: "72vh" }}>
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          <img
            src="https://images.unsplash.com/photo-1602872029708-84d970d3382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzQ3ODQxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Studio interior"
            className="w-full h-full object-cover"
            style={{ transform: "scale(1.1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black" />
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 lg:px-24 pb-16">
          <motion.p
            className="uppercase text-white/40 tracking-[0.22em] mb-4"
            style={{ fontSize: "10px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            About the Studio
          </motion.p>
          <motion.h1
            className="text-white"
            style={{
              fontSize: "clamp(56px, 7vw, 84px)",
              fontWeight: 400,
              lineHeight: 1.06,
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Architecture<br />as Civic Act
          </motion.h1>
        </div>
      </div>

      {/* ── Intro statement ──────────────────────────────────────────────────── */}
      <div className="px-8 md:px-16 lg:px-24 py-20 border-b border-white/8">
        <div className="max-w-4xl">
          <FadeIn>
            <p
              className="text-white"
              style={{ fontSize: "clamp(18px, 2.4vw, 28px)", lineHeight: 1.55, fontWeight: 300 }}
            >
              Gravity is an internationally operating architecture firm founded in Rotterdam. We create buildings and urban plans that are innovative, socially relevant, and deeply sustainable — work that belongs to its city and endures beyond trends.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────────────────────────────── */}
      <div className="px-8 md:px-16 lg:px-24 py-16 border-b border-white/8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.06}>
              <div className="bg-black px-8 py-10">
                <p
                  className="text-white mb-2"
                  style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, lineHeight: 1 }}
                >
                  {s.value}
                </p>
                <p className="text-white/35 uppercase tracking-[0.18em]" style={{ fontSize: "9px" }}>
                  {s.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ── Philosophy ───────────────────────────────────────────────────────── */}
      <div className="px-8 md:px-16 lg:px-24 py-20 border-b border-white/8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <p className="text-white/30 uppercase tracking-[0.22em] mb-6" style={{ fontSize: "9px" }}>
              Philosophy
            </p>
            <h2
              className="text-white"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 300, lineHeight: 1.2 }}
            >
              We believe architecture should serve people first.
            </h2>
          </FadeIn>
          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <p className="text-white/60" style={{ fontSize: "15px", lineHeight: 1.75 }}>
                Our work begins with listening — to clients, communities, and the land itself. Every project is shaped by a precise understanding of its social, ecological, and economic context.
              </p>
            </FadeIn>
            <FadeIn delay={0.18}>
              <p className="text-white/60" style={{ fontSize: "15px", lineHeight: 1.75 }}>
                We pursue formal clarity without reductionism. Our buildings are complex organisms: technically precise, materially honest, and spatially generous. We reject the false choice between beauty and responsibility.
              </p>
            </FadeIn>
            <FadeIn delay={0.26}>
              <p className="text-white/60" style={{ fontSize: "15px", lineHeight: 1.75 }}>
                With offices in Rotterdam, Munich, Oslo, and Beijing, we operate across cultures and scales — from individual residences to large-scale masterplans — maintaining the same standard of invention and care throughout.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── Services ─────────────────────────────────────────────────────────── */}
      <div className="px-8 md:px-16 lg:px-24 py-20 border-b border-white/8">
        <FadeIn>
          <p className="text-white/30 uppercase tracking-[0.22em] mb-14" style={{ fontSize: "9px" }}>
            Services
          </p>
        </FadeIn>
        <div className="divide-y divide-white/8">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.07}>
              <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-6 py-10 group">
                <span className="text-white/20" style={{ fontSize: "11px" }}>{s.num}</span>
                <h3
                  className="text-white"
                  style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 300, lineHeight: 1.2 }}
                >
                  {s.title}
                </h3>
                <p className="text-white/50" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                  {s.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ── Awards ───────────────────────────────────────────────────────────── */}
      <div className="px-8 md:px-16 lg:px-24 py-20">
        <FadeIn>
          <p className="text-white/30 uppercase tracking-[0.22em] mb-14" style={{ fontSize: "9px" }}>
            Selected Recognition
          </p>
        </FadeIn>
        <div className="divide-y divide-white/8">
          {AWARDS.map((a, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="flex items-baseline justify-between py-6 gap-6">
                <span className="text-white/25 shrink-0" style={{ fontSize: "12px", fontVariantNumeric: "tabular-nums" }}>
                  {a.year}
                </span>
                <span className="text-white flex-1" style={{ fontSize: "14px" }}>{a.title}</span>
                <span className="text-white/40 text-right hidden md:block" style={{ fontSize: "12px" }}>{a.project}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}