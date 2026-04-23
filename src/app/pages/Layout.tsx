import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { PageTransition } from "../components/PageTransition";
import { WhatsAppFAB } from "../components/WhatsAppFAB";
import { PortfolioFAB } from "../components/PortfolioFAB";
import { Footer } from "../components/Footer";

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isProjectDetail = location.pathname.startsWith("/project/");
  const isProjects = location.pathname === "/projects";

  const bgClass = isHome
    ? ""
    : isProjectDetail || isProjects
    ? "bg-white min-h-screen"
    : "bg-black min-h-screen";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className={bgClass} style={{ position: "relative" }}>
      <Navbar />
      <PageTransition>
        <Outlet />
      </PageTransition>
      <WhatsAppFAB />
      <PortfolioFAB />
      <Footer />
    </div>
  );
}