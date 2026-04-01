import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";

const CATEGORIES = ["All", "Residential", "Commercial", "Cultural", "Mixed Use", "Public", "Hospitality"];

// Asymmetric grid spans for editorial feel
const GRID_SPANS = [
  "col-span-2 md:col-span-2 row-span-2",   // 0 — big
  "col-span-1 row-span-1",                   // 1 — small
  "col-span-1 row-span-2",                   // 2 — tall
  "col-span-1 row-span-1",                   // 3
  "col-span-2 md:col-span-2 row-span-1",    // 4 — wide
  "col-span-1 row-span-1",                   // 5
  "col-span-1 row-span-2",                   // 6 — tall
  "col-span-2 md:col-span-2 row-span-1",    // 7 — wide
  "col-span-1 row-span-1",                   // 8
  "col-span-1 row-span-1",                   // 9
];

export function ProjectsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-black min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="px-4 md:px-8 lg:px-12 pt-24 pb-0">
        <div className="flex items-end justify-between mb-10 px-2 md:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-white/30 uppercase tracking-[0.22em] mb-3" style={{ fontSize: "9px" }}>
              Selected Work
            </p>
            <h1
              className="text-white"
              style={{ fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 300, lineHeight: 1.05 }}
            >
              Projects
            </h1>
          </motion.div>
          <motion.span
            className="text-white/25 tabular-nums"
            style={{ fontSize: "13px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filtered.length} / {projects.length}
          </motion.span>
        </div>

        {/* ── Category filter ────────────────────────────────────────────────── */}
        <motion.div
          className="flex items-center gap-1 overflow-x-auto pb-6 px-2 md:px-4 scrollbar-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="shrink-0 uppercase tracking-[0.1em] cursor-pointer border-none rounded-full transition-all duration-200"
              style={{
                fontSize: "10px",
                padding: "7px 16px",
                background: activeCategory === cat ? "#fff" : "rgba(255,255,255,0.06)",
                color: activeCategory === cat ? "#111" : "rgba(255,255,255,0.4)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── Project grid ────────────────────────────────────────────────────── */}
      <div className="px-0 pb-16">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 md:grid-cols-3 auto-rows-[140px] md:auto-rows-[180px] gap-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                className={`relative cursor-pointer group overflow-hidden ${GRID_SPANS[i % GRID_SPANS.length]}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => navigate(`/project/${project.id}`)}
              >
                {/* Image */}
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredId === project.id ? 1.07 : 1,
                    filter: hoveredId === project.id
                      ? "brightness(0.35)"
                      : hoveredId !== null
                      ? "brightness(0.6)"
                      : "brightness(1)",
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Always-visible subtle label at bottom */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  animate={{ opacity: hoveredId !== null && hoveredId !== project.id ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white/70 uppercase tracking-[0.1em]" style={{ fontSize: "9px" }}>
                    {project.category}
                  </p>
                </motion.div>

                {/* Hover content */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p
                    className="text-white uppercase tracking-[0.12em] mb-1"
                    style={{ fontSize: "clamp(12px, 1.6vw, 18px)", fontWeight: 400 }}
                  >
                    {project.title}
                  </p>
                  <p className="text-white/50 uppercase tracking-[0.08em] mb-4" style={{ fontSize: "9px" }}>
                    {project.location} — {project.year}
                  </p>
                  <div className="flex items-center gap-1.5 text-white/40">
                    <span className="uppercase tracking-[0.1em]" style={{ fontSize: "9px" }}>View Project</span>
                    <ArrowUpRight size={10} />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
