import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { Search, X } from "lucide-react";
import { projects } from "../data/projects";

const CATEGORIES = ["All", "HighRise", "Hospitality", "Educational & Mosques", "Retail", "Offices", "Residential"];

const SERIF = "'Playfair Display', 'Georgia', serif";
const SANS = "'DM Sans', 'Inter', 'Helvetica Neue', sans-serif";

export function ProjectsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = projects.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Stagger index for visible items
  const getStaggerDelay = (i: number) => i * 0.06;

  return (
    <div
      className="bg-white min-h-screen"
      style={{ fontFamily: SANS }}
    >
      {/* ── Hero Text Section ─────────────────────────────────────────────────── */}
      <section
        className="px-8 md:px-16 lg:px-24"
        style={{ paddingTop: "clamp(100px, 14vw, 160px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ maxWidth: 1060 }}
        >
          {/* Overline
          <p
            className="uppercase tracking-[0.25em] mb-6"
            style={{ fontSize: "10px", color: "#aaa", fontFamily: SANS, fontWeight: 500 }}
          >
            Selected Work · {projects.length} Projects
          </p> */}

          {/* Editorial headline */}
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(36px, 5.5vw, 76px)",
              fontWeight: 400,
              lineHeight: 1.08,
              color: "#111",
              letterSpacing: "-0.01em",
            }}
          >
            Our projects reflect our dedication
            <br />
            <span style={{ fontStyle: "italic", color: "#444" }}>
              to timelessness, beauty
            </span>{" "}
            and the
            <br />
            enrichment of everyday life.
          </h1>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────────────── */}
      <motion.div
        className="mx-8 md:mx-16 lg:mx-24"
        style={{ height: 1, background: "#e8e8e8" }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />

      {/* ── Filter + Search Row ───────────────────────────────────────────────── */}
      <motion.section
        className="px-8 md:px-16 lg:px-24 flex flex-col"
        style={{ paddingTop: 28, paddingBottom: 28, gap: 12 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        {/* Category filters */}
        
        <div
          className="flex items-center gap-2"
          style={{
            marginBottom: 12,
            overflowX: "auto",
            flexWrap: "nowrap",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <style>{`.cat-scroll::-webkit-scrollbar { display: none; }`}</style>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="shrink-0 cursor-pointer transition-all duration-200 cat-scroll"
                style={{
                  fontFamily: SANS,
                  fontSize: "13px",
                  letterSpacing: "0.02em",
                  color: isActive ? "#fff" : "#666",
                  fontWeight: isActive ? 500 : 400,
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: isActive ? "none" : "1px solid #ddd",
                  background: isActive ? "#E06020" : "transparent",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.borderColor = "#bbb";
                    (e.currentTarget as HTMLElement).style.color = "#333";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.borderColor = "#ddd";
                    (e.currentTarget as HTMLElement).style.color = "#666";
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search — always on its own line */}
        <div style={{ width: "100%" }}>
          <div
            className="flex items-center gap-3"
            style={{
              borderRadius: 999,
              border: searchFocused ? "1px solid #bbb" : "1px solid #ddd",
              padding: "10px 20px",
              transition: "border-color 0.2s",
              background: "transparent",
              marginBottom: 12,
            }}
          >
            <Search
              size={16}
              style={{ color: searchFocused ? "#666" : "#bbb", flexShrink: 0, transition: "color 0.2s" }}
            />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: SANS,
                fontSize: "13px",
                color: "#111",
                width: "100%",
                letterSpacing: "0.02em",
              }}
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setSearchQuery("")}
                  className="cursor-pointer border-none bg-transparent p-0 flex items-center"
                  style={{ color: "#bbb" }}
                >
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* ── Second Divider ────────────────────────────────────────────────────── */}
      <div
        className="mx-8 md:mx-16 lg:mx-24"
        style={{ height: 1, background: "#e8e8e8", marginBottom: 48 }}
      />

      {/* ── Projects Grid ────────────────────────────────────────────────────── */}
      <section
        className="px-8 md:px-16 lg:px-24"
        style={{ paddingBottom: "clamp(80px, 12vw, 120px)" }}
      >
        {/* Results count */}
        {/* <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={`${activeCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              style={{ fontSize: "11px", color: "#bbb", fontFamily: SANS, letterSpacing: "0.06em" }}
            >
              {filtered.length === projects.length
                ? `${projects.length} projects`
                : `${filtered.length} of ${projects.length} projects`}
            </motion.p>
          </AnimatePresence>
        </motion.div> */}

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              style={{ gap: "clamp(16px, 2.5vw, 32px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((project, i) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    duration: 0.55,
                    delay: getStaggerDelay(i),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="cursor-pointer group"
                  onClick={() => navigate(`/project/${project.id}`)}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image container — portrait ratio */}
                  <div
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: "3 / 4",
                      background: "#f0f0f0",
                    }}
                  >
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredId === project.id ? 1.06 : 1,
                      }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      style={{ display: "block" }}
                    />

                    {/* Hover overlay — very subtle darkening */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: hoveredId === project.id
                          ? "rgba(0,0,0,0.12)"
                          : "rgba(0,0,0,0)",
                      }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Category badge — bottom left, always visible */}
                    <div
                      className="absolute bottom-3 left-3"
                      style={{
                        background: "rgba(0,0,0,1)",
                        backdropFilter: "blur(4px)",
                        padding: "3px 8px",
                        borderRadius: 2,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: SANS,
                          fontSize: "12px",
                          letterSpacing: "0.1em",
                          // color: "#0000",
                          color: "rgba(255,255,255,0.92)",
                          textTransform: "uppercase",
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Card text */}
                  <div style={{ marginTop: 14 }}>
                    <h2
                      style={{
                        fontFamily: SERIF,
                        fontSize: "clamp(15px, 1.4vw, 19px)",
                        fontWeight: 400,
                        color: "#1a1a1a",
                        lineHeight: 1.25,
                        marginBottom: 4,
                        transition: "color 0.2s",
                      }}
                    >
                      {project.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: SANS,
                        fontSize: "11px",
                        color: "#000",
                        letterSpacing: "0.04em",
                        lineHeight: 1.5,
                      }}
                    >
                      {project.location}
                      <span style={{ marginLeft: 8, marginRight: 8, color: "#ddd" }}>·</span>
                      {/* {project.year} */}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center"
              style={{ paddingTop: 80, paddingBottom: 80 }}
            >
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(22px, 3vw, 36px)",
                  fontWeight: 400,
                  color: "#ccc",
                  fontStyle: "italic",
                  marginBottom: 16,
                }}
              >
                No projects found
              </p>
              <p
                style={{ fontFamily: SANS, fontSize: "12px", color: "#bbb", letterSpacing: "0.06em" }}
              >
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="cursor-pointer border-none bg-transparent mt-8 uppercase tracking-[0.1em] underline"
                style={{ fontFamily: SANS, fontSize: "11px", color: "#888" }}
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Footer line ──────────────────────────────────────────────────────── */}
      <footer
        className="px-8 md:px-16 lg:px-24 pb-12 flex items-center justify-between"
        style={{ borderTop: "1px solid #e8e8e8", paddingTop: 32 }}
      >
        <p style={{ fontFamily: SANS, fontSize: "10px", color: "#ccc", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Gravity
        </p>
        <p style={{ fontFamily: SANS, fontSize: "10px", color: "#ccc", letterSpacing: "0.08em" }}>
          Karachi
        </p>
      </footer>
    </div>
  );
}