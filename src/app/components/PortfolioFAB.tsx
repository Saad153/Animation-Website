import { motion } from "motion/react";
import { Download } from "lucide-react";
import { useState, useCallback } from "react";
import { generatePortfolioPDF } from "../utils/generatePortfolioPDF";

export function PortfolioFAB() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await generatePortfolioPDF();
    } finally {
      setDownloading(false);
    }
  }, [downloading]);

  return (
    <motion.button
      onClick={handleDownload}
      disabled={downloading}
      aria-label="Download Portfolio"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: downloading ? 1 : 1.08,
        boxShadow: downloading ? "0 4px 18px rgba(224,96,32,0.35)" : "0 8px 30px rgba(224,96,32,0.45)",
      }}
      whileTap={{ scale: downloading ? 1 : 0.95 }}
      style={{
        position: "fixed",
        bottom: 24,
        right: 88, // WhatsApp FAB width (56) + gap (8) + original right (24) = 88
        zIndex: 9999,
        width: 56,
        height: 56,
        borderRadius: "50%",
        backgroundColor: "#E06020",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 18px rgba(224,96,32,0.35)",
        cursor: downloading ? "not-allowed" : "pointer",
        border: "none",
        flexShrink: 0,
      }}
      className="md:hidden" // Only show on mobile
    >
      {downloading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Download size={24} color="white" />
        </motion.div>
      ) : (
        <Download size={24} color="white" />
      )}
    </motion.button>
  );
}
