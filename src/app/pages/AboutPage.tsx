import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import aboutBg from "@/assets/aboutbg.jpg"; 
import aboutus from "@/assets/aboutus.png";
// ─── Font tokens ─────────────────────────────────────────────────────────────
const SANS  = "'DM Sans', 'Inter', sans-serif";
const SERIF = "'Playfair Display', Georgia, serif";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "20+",  label: "Years of Practice" },
  { value: "200+", label: "Projects Completed" },
  { value: "4",    label: "Offices Nationwide" },
  { value: "1",    label: "Integrated Platform" },
];

const SERVICES = [
  {
    num: "01",
    title: "Architecture",
    body: "From concept to completion, we design buildings that challenge convention — residential towers, commercial complexes, resorts, IT parks, and everything between. Each project is an opportunity to enhance creativity and deliver exceptional architectural quality.",
  },
  {
    num: "02",
    title: "Interior Design",
    body: "Our interiors are designed with the same rigour as our buildings. We create environments that respond to human scale, material quality, and the specific character of each client — from corporate lobbies to luxury residences.",
  },
  {
    num: "03",
    title: "Engineering",
    body: "We offer a complete range of engineering services — structural, mechanical, electrical, and civil — integrated within a single platform so that architecture and engineering speak the same language from day one.",
  },
  {
    num: "04",
    title: "Construction",
    body: "By combining state-of-the-art technology, modern machinery, and superior craftsmanship with innovative design principles, we deliver finished products of exceptional quality that stand out within the industry.",
  },
];

const OFFICES = [
  {
    city: "Karachi",
    label: "Architecture & Interiors",
    address: "Innovista Indus, Block A,\nMain Sunset Blvd,\nD.H.A. Phase II, Karachi.",
    email: "gravity.dnc@gmail.com",
    cell: "+92 333 2222777",
    tel: "+92 21 3588666",
  },
  {
    city: "Karachi",
    label: "Furniture and Interiors",
    address: "25-C, Sunset Commercial Street #1,\nPhase IV, DHA, Karachi",
    email: "gravity.dnc@gmail.com",
    cell: "+92 333 2222777",
    tel: "+92 21 3588666",
    website: "www.gravity.com.pk",
  },
  {
    city: "Lahore",
    label: "Architecture & Interiors",
    address: "Address coming soon",
    addressItalic: true,
    email: "gravity.dnc@gmail.com",
    cell: "+92 333 2222777",
    tel: "+92 21 3588666",
  },
  {
    city: "Islamabad",
    label: "Architecture & Interiors",
    address: "Address coming soon",
    addressItalic: true,
    email: "gravity.dnc@gmail.com",
    cell: "+92 333 2222777",
    tel: "+92 21 3588666",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Rule({ className = "" }: { className?: string }) {
  return (
    <div
      className={className}
      style={{ height: "0.5px", background: "rgba(255,255,255,0.08)", width: "100%" }}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════════════
export function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

  return (
    <div
      className="bg-black min-h-screen"
      style={{ fontFamily: SANS, color: "#fff", overflowX: "hidden" }}
    >
      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <div
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ height: "78vh", minHeight: 520 }}
      >
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: 1.12 }}>
          <img
            src={aboutBg}
            alt="Gravity Studio — high rise under construction at dusk"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlays */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.75) 100%)",
            }}
          />
        </motion.div>

        {/* Hero text */}
        <div
          className="absolute bottom-0 left-0 right-0 px-8 md:px-16 lg:px-24"
          style={{ paddingBottom: "clamp(40px, 7vw, 90px)" }}
        >
          <motion.p
            className="uppercase tracking-[0.26em] mb-5"
            style={{ fontSize: "9px", color: "rgb(255, 255, 255)", fontFamily: SANS }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            About the Studio
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(40px, 7.5vw, 60px)",
                fontWeight: 100,
                lineHeight: 0.96,
                letterSpacing: "-0.02em",
                color: "#fff",
              }}
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
            >
              Our Architectural Design
              <br />
              <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.7)" }}>
                concept is creating expressive
              </em>
              <br />
              <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.7)" }}>
                spaces that elevate andenhance
              </em>
              <br />
              human experiences.
            </motion.h1>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          INTRO STATEMENT
      ════════════════════════════════════════════════════════════════════ */}
      <div
        className="px-8 md:px-16 lg:px-24"
        style={{ paddingTop: "clamp(56px, 8vw, 100px)", paddingBottom: "clamp(48px, 7vw, 88px)" }}
      >
        <Rule className="mb-14" />
        <div className="max-w-4xl">
          <FadeIn>
            <p
              style={{
                fontSize: "clamp(17px, 2.1vw, 26px)",
                lineHeight: 1.62,
                fontWeight: 300,
                color: "rgba(255,255,255,0.88)",
                fontFamily: SANS,
              }}
            >
              Over the past two decades, Gravity has established itself as a leading firm in
              architecture, interior design, and construction services in Pakistan. We are renowned
              for our impressive range of designs, commitment to service excellence, and
              high-quality standards. To date, we have completed more than{" "}
              <span style={{ color: "#fff" }}>200 diverse projects</span>.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              style={{
                fontSize: "clamp(14px, 1.5vw, 17px)",
                lineHeight: 1.8,
                fontWeight: 300,
                color: "rgba(255,255,255,0.5)",
                fontFamily: SANS,
                marginTop: 28,
              }}
            >
              Our portfolio includes residential homes, apartment towers, commercial buildings,
              resorts, IT parks, and offices. Each new project is viewed as an opportunity to
              enhance our creativity, deliver exceptional architectural quality, and showcase our
              versatility.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          STATS
      ════════════════════════════════════════════════════════════════════ */}
      <Rule />
      <div className="px-8 md:px-16 lg:px-24" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ borderLeft: "0.5px solid rgba(255,255,255,0.08)" }}
        >
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.07}>
              <div
                style={{
                  padding: "clamp(32px, 5vw, 56px) clamp(20px, 3vw, 40px)",
                  borderRight: "0.5px solid rgba(255,255,255,0.08)",
                  borderBottom: "0.5px solid rgba(255,255,255,0.08)",
                }}
              >
                <p
                  style={{
                    fontFamily: SERIF,
                    fontSize: "clamp(40px, 5.5vw, 72px)",
                    fontWeight: 300,
                    lineHeight: 1,
                    color: "#fff",
                    marginBottom: 10,
                  }}
                >
                  {s.value}
                </p>
                <p
                  className="uppercase tracking-[0.18em]"
                  style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontFamily: SANS }}
                >
                  {s.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <Rule />

      {/* ════════════════════════════════════════════════════════════════════
          PHILOSOPHY — two-column
      ════════════════════════════════════════════════════════════════════ */}
      <div
        className="px-8 md:px-16 lg:px-24"
        style={{ paddingTop: "clamp(56px, 8vw, 100px)", paddingBottom: "clamp(48px, 7vw, 88px)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <FadeIn>
              <p
                className="uppercase tracking-[0.22em] mb-6"
                style={{ fontSize: "9px", color: "#fff", fontFamily: SANS }}
              >
                Our Approach
              </p>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(26px, 3.2vw, 44px)",
                  fontWeight: 300,
                  lineHeight: 1.22,
                  color: "#fff",
                }}
              >
                Our Buildings are,
                <br />
                <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.6)" }}>
                  functional sculptures with sustainability at its heart.
                </em>
              </h2>
            </FadeIn>
          </div>

          {/* Right */}
          {/* <div className="space-y-7">
            {[
              "In addition to providing a comprehensive range of architectural services, including architecture and interior design, we offer all necessary engineering and construction services through a single, convenient platform.",
              "By combining state-of-the-art technology, modern machinery, and superior craftsmanship with innovative design principles, we deliver finished products of exceptional quality that stand out within the industry.",
              "Sustainability in architecture and interiors is a key consideration in our designs. We aim to create things that stand the test of time. We engage with our clients in every project, and aim for a final product that is in line with — or in many cases exceeds — client requirements and expectations.",
            ].map((para, i) => (
              <FadeIn key={i} delay={0.08 + i * 0.08}>
                <p
                  style={{
                    fontSize: "clamp(13px, 1.35vw, 15px)",
                    lineHeight: 1.82,
                    color: "rgba(255,255,255,0.52)",
                    fontFamily: SANS,
                    fontWeight: 300,
                  }}
                >
                  {para}
                </p>
              </FadeIn>
            ))}
          </div> */}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          FULL-WIDTH IMAGE BREAK
      ════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ height: "clamp(260px, 40vw, 540px)" }}>
        <img
          src={aboutus}
          alt="Architectural facade detail"
          className="w-full h-full object-cover"
          style={{ transform: "scale(1.05)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.3) 100%)" }}
        />
        <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
          <FadeIn>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(22px, 3.5vw, 50px)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "rgba(255,255,255,0.9)",
                maxWidth: 600,
                lineHeight: 1.35,
              }}
            >
              "Our interior spaces aim to achieve harmony and tranquility that enhance human experience."
            </p>
          </FadeIn>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SERVICES
      ════════════════════════════════════════════════════════════════════ 
      <div
        className="px-8 md:px-16 lg:px-24"
        style={{ paddingTop: "clamp(56px, 8vw, 100px)", paddingBottom: "clamp(48px, 7vw, 88px)" }}
      >
        <Rule className="mb-14" />
        <FadeIn>
          <p
            className="uppercase tracking-[0.22em] mb-14"
            style={{ fontSize: "9px", color: "rgba(255,255,255,0.28)", fontFamily: SANS }}
          >
            Services
          </p>
        </FadeIn>
        <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.07}>
              <div
                className="grid grid-cols-1 md:grid-cols-[64px_1fr_1.6fr] gap-6 group"
                style={{
                  paddingTop: "clamp(24px, 3.5vw, 40px)",
                  paddingBottom: "clamp(24px, 3.5vw, 40px)",
                  borderBottom: "0.5px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", fontFamily: SANS, paddingTop: 3 }}
                >
                  {s.num}
                </span>
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontSize: "clamp(18px, 2vw, 28px)",
                    fontWeight: 300,
                    lineHeight: 1.2,
                    color: "#fff",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: "clamp(13px, 1.3vw, 15px)",
                    lineHeight: 1.78,
                    color: "rgba(255,255,255,0.48)",
                    fontFamily: SANS,
                    fontWeight: 300,
                  }}
                >
                  {s.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div> */}

      {/* ════════════════════════════════════════════════════════════════════
          OFFICES
      ════════════════════════════════════════════════════════════════════ */}
      <div
        className="px-8 md:px-16 lg:px-24"
        style={{ paddingTop: "clamp(56px, 8vw, 100px)", paddingBottom: "clamp(64px, 10vw, 120px)" }}
      >
        <Rule className="mb-14" />
        <FadeIn>
          <p
            className="uppercase tracking-[0.22em] mb-14"
            style={{ fontSize: "9px", color: "#fff", fontFamily: SANS }}
          >
            Our Offices
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0"
          style={{ border: "0.5px solid rgba(255,255,255,0.08)" }}
        >
          {OFFICES.map((office, i) => (
            <FadeIn key={`${office.city}-${i}`} delay={i * 0.07}>
              <div
                style={{
                  padding: "clamp(28px, 3.5vw, 44px) clamp(20px, 2.5vw, 32px)",
                  borderRight: i < OFFICES.length - 1 ? "0.5px solid rgba(255,255,255,0.08)" : "none",
                  height: "100%",
                }}
                className="flex flex-col gap-0"
              >
                {/* City */}
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontSize: "clamp(20px, 2vw, 28px)",
                    fontWeight: 300,
                    color: "#fff",
                    lineHeight: 1.1,
                    marginBottom: 10,
                  }}
                >
                  {office.city}
                </h3>

                {/* Label */}
                <p
                  className="uppercase tracking-[0.12em]"
                  style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontFamily: SANS, marginBottom: 18 }}
                >
                  {office.label}
                </p>

                {/* Divider */}
                <div style={{ height: "0.5px", background: "rgba(255,255,255,0.08)", marginBottom: 18 }} />

                {/* Address */}
                <p
                  style={{
                    fontSize: "12px",
                    lineHeight: 1.7,
                    color: (office as any).addressItalic ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.5)",
                    fontStyle: (office as any).addressItalic ? "italic" : "normal",
                    fontFamily: SANS,
                    whiteSpace: "pre-line",
                    marginBottom: 20,
                    flex: 1,
                  }}
                >
                  {office.address}
                </p>

                {/* Contact */}
                <div className="space-y-1 mt-auto">
                  {[
                    { k: "Email",   v: office.email },
                    { k: "Cell",    v: office.cell },
                    { k: "Tel",     v: office.tel },
                    ...((office as any).website ? [{ k: "Website", v: (office as any).website }] : []),
                  ].map(({ k, v }) => (
                    <p key={k} style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)", fontFamily: SANS, lineHeight: 1.6 }}>
                      <span style={{ color: "rgba(255,255,255,0.2)" }}>{k}: </span>{v}
                    </p>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}