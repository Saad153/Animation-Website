import { useParams, useNavigate, useLocation } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { projects } from "../data/projects";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromHome = (location.state as any)?.heroImage;
  const heroRef = useRef<HTMLDivElement>(null);

  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY   = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroTextY  = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  if (!project) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="text-center">
          <p className="text-white/30 uppercase tracking-[0.2em] mb-6" style={{ fontSize: "11px" }}>Project not found</p>
          <button
            className="text-white uppercase tracking-[0.1em] bg-transparent border border-white/15 px-7 py-3 cursor-pointer hover:bg-white/8 transition-colors rounded-full"
            style={{ fontSize: "11px" }}
            onClick={() => navigate("/projects")}
          >
            View All Projects
          </button>
        </div>
      </div>
    );
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  // Additional images for the gallery — cycle through a curated set
  const galleryImages = [
    ...project.images,
    projects[(projectIndex + 2) % projects.length].image,
    projects[(projectIndex + 4) % projects.length].image,
  ];

  return (
    <div className="bg-black min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div ref={heroRef} className="relative overflow-hidden" style={{ height: "100vh" }}>
        {/* Parallax image */}
        <motion.div
          className="absolute inset-0 w-full"
          style={{ y: heroImgY, scale: 1.08 }}
        >
          <motion.img
            src={fromHome || project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: fromHome ? 1 : 1.06, opacity: fromHome ? 1 : 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: fromHome ? 0.5 : 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

        {/* Hero text — floats up as you scroll */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-8 md:px-16 lg:px-24 pb-16"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          {/* Category + location */}
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: fromHome ? 0.3 : 0.5 }}
          >
            <span className="text-white/40 uppercase tracking-[0.22em]" style={{ fontSize: "9px" }}>
              {project.category}
            </span>
            <span className="text-white/20" style={{ fontSize: "9px" }}>—</span>
            <span className="text-white/40 uppercase tracking-[0.22em]" style={{ fontSize: "9px" }}>
              {project.location}
            </span>
            <span className="text-white/20" style={{ fontSize: "9px" }}>—</span>
            <span className="text-white/40 uppercase tracking-[0.22em]" style={{ fontSize: "9px" }}>
              {project.year}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-white"
            style={{ fontSize: "clamp(40px, 7vw, 110px)", fontWeight: 300, lineHeight: 1.0 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: fromHome ? 0.1 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {project.title}
          </motion.h1>

          {/* Scroll cue */}
          <motion.div
            className="flex items-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: fromHome ? 0.5 : 0.9 }}
          >
            <motion.div
              className="w-px h-5 bg-white/25"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
            <span className="text-white/30 uppercase tracking-[0.2em]" style={{ fontSize: "8px" }}>Scroll</span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Description ─────────────────────────────────────────────────────── */}
      <div className="px-8 md:px-16 lg:px-24 py-20 border-b border-white/8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16">
          <div>
            <FadeIn>
              <p className="text-white/25 uppercase tracking-[0.22em] mb-6" style={{ fontSize: "9px" }}>Project Info</p>
              <div className="space-y-4">
                {[
                  { label: "Location", value: project.location },
                  { label: "Year", value: project.year },
                  { label: "Category", value: project.category },
                  { label: "Status", value: "Completed" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-baseline border-b border-white/6 pb-3">
                    <span className="text-white/30 uppercase tracking-[0.12em]" style={{ fontSize: "9px" }}>{item.label}</span>
                    <span className="text-white/70" style={{ fontSize: "12px" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <p
              className="text-white"
              style={{ fontSize: "clamp(16px, 2vw, 22px)", lineHeight: 1.65, fontWeight: 300 }}
            >
              {project.description}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* ── Image gallery ────────────────────────────────────────────────────── */}
      <div className="py-4 space-y-1">
        {/* Full-width hero image */}
        <FadeIn>
          <div className="w-full overflow-hidden" style={{ height: "65vh" }}>
            <motion.img
              src={galleryImages[0]}
              alt={`${project.title} 1`}
              className="w-full h-full object-cover"
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </FadeIn>

        {/* Two-column row */}
        {galleryImages.length > 1 && (
          <div className="grid grid-cols-2 gap-1">
            {galleryImages.slice(1, 3).map((img, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="overflow-hidden" style={{ height: "45vh" }}>
                  <motion.img
                    src={img}
                    alt={`${project.title} ${i + 2}`}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.05 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {/* One more full-width if available */}
        {galleryImages.length > 3 && (
          <FadeIn>
            <div className="w-full overflow-hidden" style={{ height: "55vh" }}>
              <motion.img
                src={galleryImages[3]}
                alt={`${project.title} 4`}
                className="w-full h-full object-cover"
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </FadeIn>
        )}
      </div>

      {/* ── Project navigation ───────────────────────────────────────────────── */}
      <div className="px-8 md:px-16 lg:px-24 py-16 border-t border-white/8">
        <div className="flex justify-between items-stretch gap-4">
          {/* Prev */}
          <motion.button
            className="group flex items-center gap-4 bg-transparent border-none cursor-pointer p-0 flex-1 text-left"
            onClick={() => navigate(`/project/${prevProject.id}`)}
            whileHover={{ x: -4 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft size={14} className="text-white/30 group-hover:text-white/70 transition-colors shrink-0" />
            <div>
              <span className="block text-white/25 uppercase tracking-[0.15em] mb-1.5" style={{ fontSize: "8px" }}>Previous</span>
              <span className="block text-white/70 group-hover:text-white transition-colors" style={{ fontSize: "14px" }}>
                {prevProject.title}
              </span>
            </div>
          </motion.button>

          {/* All projects */}
          <button
            className="shrink-0 flex items-center gap-2 text-white/25 hover:text-white/60 uppercase tracking-[0.15em] bg-transparent border-none cursor-pointer transition-colors"
            style={{ fontSize: "9px" }}
            onClick={() => navigate("/projects")}
          >
            All Projects
            <ArrowUpRight size={10} />
          </button>

          {/* Next */}
          <motion.button
            className="group flex items-center gap-4 bg-transparent border-none cursor-pointer p-0 flex-1 justify-end text-right"
            onClick={() => navigate(`/project/${nextProject.id}`)}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <div>
              <span className="block text-white/25 uppercase tracking-[0.15em] mb-1.5" style={{ fontSize: "8px" }}>Next</span>
              <span className="block text-white/70 group-hover:text-white transition-colors" style={{ fontSize: "14px" }}>
                {nextProject.title}
              </span>
            </div>
            <ArrowRight size={14} className="text-white/30 group-hover:text-white/70 transition-colors shrink-0" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}