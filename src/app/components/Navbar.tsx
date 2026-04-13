import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { X, ArrowUpRight, Download } from "lucide-react";
import { generatePortfolioPDF } from "../utils/generatePortfolioPDF";
import glogoIcon from "@/assets/glogoIcon.png";
import glogoIcon1 from "@/assets/logoTrans.png";





// Desktop order: Projects — Team — About — Contact — Portfolio
const NAV_LINKS = [
  { label: "Projects",  path: "/projects",  download: false },
  { label: "Team",      path: "/team",      download: false },
  { label: "About us",     path: "/about",     download: false },
  { label: "Contact",   path: "/contact",   download: false },
  // { label: "Portfolio", path: "/portfolio", download: true  },
];

// Mobile overlay order: Projects — Portfolio — Team — About — Contact
const MOBILE_NAV_LINKS = [
  { label: "Projects",  path: "/projects",  download: false },
  // { label: "Portfolio", path: "/portfolio", download: true  },
  { label: "Team",      path: "/team",      download: false },
  { label: "About",     path: "/about",     download: false },
  { label: "Contact",   path: "/contact",   download: false },
];

// Three-line hamburger icon (native SVG, no dependency on lucide Menu)
function HamburgerIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
      <rect y="0"  width="18" height="1.8" rx="0.9" fill="#fff" />
      <rect y="6"  width="18" height="1.8" rx="0.9" fill="#fff" />
      <rect y="12" width="18" height="1.8" rx="0.9" fill="#fff" />
    </svg>
  );
}

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const isHome = location.pathname === "/";
  const isProjectDetail = location.pathname.startsWith("/project/");
  const isProjects = location.pathname === "/projects";
  const isLightBg = isProjectDetail || isProjects;

  const handlePortfolioDownload = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    if (downloading) return;
    setDownloading(true);
    setMobileOpen(false);
    try {
      await generatePortfolioPDF();
    } finally {
      setDownloading(false);
    }
  }, [downloading]);

  // Scroll-based hide/show
  useEffect(() => {
    let lastY = window.scrollY;
    const THRESHOLD = 80;

    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY && currentY > THRESHOLD) {
        setHidden(true);
      } else if (currentY < lastY) {
        setHidden(false);
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // Reset hidden + close mobile menu on route change
  useEffect(() => {
    setHidden(false);
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ── Studio wordmark — inner pages, top-left ── */}
      <AnimatePresence>
        {!isHome && (
          <motion.div
            key="wordmark"
            className="fixed z-50 hidden md:block"
            style={{ top: 0, left: 28 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: hidden ? 0 : 1, y: hidden ? -8 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/"
              className="no-underline uppercase tracking-[0.15em] transition-colors"
              style={{
                fontSize: "10px",
                fontFamily: "'DM Sans', 'Inter', sans-serif",
                color: isLightBg ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = isLightBg ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = isLightBg ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)";
              }}
            >
              <img
                src={glogoIcon1}
                alt="Gravity"
                style={{ height: 120, width: 150, objectFit: "contain", display: "block" }}
              />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════
          DESKTOP: floating centered pill  (md and above)
      ══════════════════════════════════════════════════════════════ */}
      <motion.div
        className="fixed z-50 hidden md:block"
        style={{ top: 40, left: "50%", x: "-50%" }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: hidden ? 0 : 1, y: hidden ? -16 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className="flex items-center rounded-full bg-white"
          style={{
            boxShadow: "0 2px 24px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.04)",
            padding: "6px 8px",
            gap: 2,
            fontFamily: "'DM Sans', 'Inter', sans-serif",
          }}
        >
          {NAV_LINKS.map((link) => {
            const active =
              location.pathname === link.path ||
              location.pathname.startsWith(`/${link.label.toLowerCase()}`);

            if (link.download) {
              return (
                <button
                  key={link.path}
                  onClick={handlePortfolioDownload}
                  disabled={downloading}
                  className="relative no-underline transition-all duration-200 rounded-full border-none cursor-pointer flex items-center gap-1.5"
                  style={{
                    fontSize: "11.5px",
                    letterSpacing: "0.10em",
                    color: downloading ? "#bbb" : "#888",
                    fontWeight: 400,
                    padding: "8px 20px",
                    background: "transparent",
                    fontFamily: "'DM Sans', 'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    if (!downloading) (e.currentTarget as HTMLElement).style.color = "#333";
                  }}
                  onMouseLeave={(e) => {
                    if (!downloading) (e.currentTarget as HTMLElement).style.color = "#888";
                  }}
                >
                  {downloading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{ display: "inline-flex" }}
                      >
                        <Download size={10} />
                      </motion.span>
                      Generating…
                    </>
                  ) : (
                    <>
                      <Download size={10} />
                      {link.label}
                    </>
                  )}
                </button>
              );
            }

            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative no-underline transition-all duration-200 rounded-full"
                style={{
                  fontSize: "11.5px",
                  letterSpacing: "0.10em",
                  color: active ? "#111" : "#888",
                  fontWeight: active ? 500 : 400,
                  padding: "8px 20px",
                  background: active ? "rgba(0,0,0,0.06)" : "transparent",
                  fontFamily: "'DM Sans', 'Inter', sans-serif",
                }}
                onMouseEnter={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = "#333";
                }}
                onMouseLeave={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = "#888";
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE: full-width orange bar (below md)
      ══════════════════════════════════════════════════════════════ */}
      <motion.div
        className="fixed z-50 md:hidden left-0 right-0"
        style={{ top: 0 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: hidden ? 0 : 1, y: hidden ? -56 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            height: 56,
            backgroundColor: "#E06020",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          {/* Left: Gravity Logo (clickable home link) */}
          {!isHome && (
          <Link to="/" aria-label="Gravity - Home">
            <img
              src={glogoIcon}
              alt="Gravity"
              style={{
                height: 36,
                width: "auto",
                display: "block",
              }}
            />
          </Link>
          )}

          {isHome && <div style={{ width: 36 }} />}
          <button
            className="flex items-center justify-center cursor-pointer border-none bg-transparent"
            style={{ width: 48, height: 48 }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <HamburgerIcon />
          </button>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════
          Mobile full-screen overlay menu
      ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
          >
            {/* Close button — top right, mirroring open button position */}
            <button
              className="absolute top-4 right-4 flex items-center justify-center rounded-full bg-white/10 border-none cursor-pointer"
              style={{ width: 48, height: 48 }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} color="#fff" />
            </button>

            {/* Nav links */}
            <div className="flex flex-col justify-center flex-1 px-10 gap-3">
              <motion.p
                className="uppercase text-white/20 tracking-[0.25em] mb-6"
                style={{ fontSize: "9px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12 }}
              >
                Navigation
              </motion.p>
              {MOBILE_NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.35, delay: 0.07 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.download ? (
                    <button
                      onClick={handlePortfolioDownload}
                      disabled={downloading}
                      className="flex items-center justify-between no-underline py-5 border-b border-white/8 group w-full border-none bg-transparent cursor-pointer"
                    >
                      <span
                        className="uppercase text-white tracking-[0.1em] transition-opacity group-hover:opacity-60 flex items-center gap-3"
                        style={{ fontSize: "22px", fontWeight: 300 }}
                      >
                        {downloading ? "Generating…" : link.label}
                      </span>
                      <Download size={16} className="text-white/30 group-hover:text-white/60 transition-colors" />
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className="flex items-center justify-between no-underline py-5 border-b border-white/8 group"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span
                        className="uppercase text-white tracking-[0.1em] transition-opacity group-hover:opacity-60"
                        style={{ fontSize: "22px", fontWeight: 300 }}
                      >
                        {link.label}
                      </span>
                      <ArrowUpRight size={16} className="text-white/30 group-hover:text-white/60 transition-colors" />
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <motion.div
              className="px-10 pb-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
            >
              <p className="text-white/20 uppercase tracking-[0.15em]" style={{ fontSize: "9px" }}>
                Gravity — Karachi
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}