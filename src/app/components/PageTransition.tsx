import { motion } from "motion/react";
import { useLocation } from "react-router";
import { ReactNode } from "react";

// Simple per-route fade-in — NO AnimatePresence / mode="wait".
// AnimatePresence+mode="wait" was the root cause of the double-animation:
// it mounts the new page in a "pending" hidden state first, then reveals it
// after the old page exits — firing all `animate` props twice.
export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative" }}
    >
      {children}
    </motion.div>
  );
}
