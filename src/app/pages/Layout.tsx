import { Outlet, useLocation } from "react-router";
import { Navbar } from "../components/Navbar";
import { PageTransition } from "../components/PageTransition";

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={isHome ? "" : "bg-black min-h-screen"}>
      <Navbar />
      <PageTransition>
        <Outlet />
      </PageTransition>
    </div>
  );
}
