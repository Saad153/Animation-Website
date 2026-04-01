import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Projects", path: "/projects" },
  { label: "Team", path: "/team" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = location.pathname === "/";

  return (
    <>
      {/* Studio wordmark — appears on inner pages, top-left */}
      <AnimatePresence>
        {!isHome && (
          <motion.div
            key="wordmark"
            className="fixed z-50"
            style={{ top: 28, left: 28 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/"
              className="no-underline uppercase text-white/60 hover:text-white/90 transition-colors tracking-[0.15em]"
              style={{ fontSize: "10px", fontFamily: "'Inter', sans-serif" }}
            >
              Powerhouse Company
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating pill nav — centered */}
      <motion.div
        className="fixed z-50"
        style={{ top: 24, left: "50%", x: "-50%" }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        {/* Desktop pill */}
        <nav
          className="hidden md:flex items-center rounded-full bg-white"
          style={{
            boxShadow: "0 2px 24px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.04)",
            padding: "6px 8px",
            gap: 2,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.path || location.pathname.startsWith(`/${link.label.toLowerCase()}`);
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative no-underline transition-all duration-200 rounded-full"
                style={{
                  fontSize: "11.5px",
                  letterSpacing: "0.09em",
                  color: active ? "#111" : "#888",
                  fontWeight: active ? 500 : 400,
                  padding: "8px 20px",
                  background: active ? "rgba(0,0,0,0.06)" : "transparent",
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

        {/* Mobile pill with hamburger */}
        <button
          className="md:hidden flex items-center justify-center rounded-full bg-white cursor-pointer border-none"
          style={{
            boxShadow: "0 2px 24px rgba(0,0,0,0.13)",
            padding: "12px 20px",
            gap: 10,
            fontFamily: "'Inter', sans-serif",
          }}
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={16} color="#111" />
          <span style={{ fontSize: "11px", letterSpacing: "0.09em", color: "#888" }}>Menu</span>
        </button>
      </motion.div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 bg-transparent border-none cursor-pointer p-2"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} color="#fff" />
            </button>

            {/* Mobile nav links */}
            <div className="flex flex-col justify-center flex-1 px-10 gap-3">
              <motion.p
                className="uppercase text-white/20 tracking-[0.25em] mb-6"
                style={{ fontSize: "9px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                Navigation
              </motion.p>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.35, delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center justify-between no-underline py-4 border-b border-white/8 group"
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
                </motion.div>
              ))}
            </div>

            {/* Mobile footer */}
            <motion.div
              className="px-10 pb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-white/20 uppercase tracking-[0.15em]" style={{ fontSize: "9px" }}>
                Powerhouse Company — Rotterdam
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}