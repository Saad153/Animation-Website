import { jsPDF } from "jspdf";
import { projects } from "../data/projects";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const W = 210; // A4 width  (mm)
const H = 297; // A4 height (mm)

/** Draw a filled rectangle */
function rect(
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  color: [number, number, number]
) {
  doc.setFillColor(...color);
  doc.rect(x, y, w, h, "F");
}

/** Thin horizontal rule */
function rule(doc: jsPDF, y: number, color: [number, number, number], opacity = 1) {
  doc.setDrawColor(...color);
  doc.setLineWidth(0.25);
  doc.setGState(doc.GState({ opacity }));
  doc.line(16, y, W - 16, y);
  doc.setGState(doc.GState({ opacity: 1 }));
}

/** Text helpers */
function text(
  doc: jsPDF,
  str: string,
  x: number,
  y: number,
  opts?: { align?: "left" | "center" | "right"; maxWidth?: number }
) {
  doc.text(str, x, y, opts as Parameters<typeof doc.text>[3]);
}

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

function drawCover(doc: jsPDF) {
  // Full black background
  rect(doc, 0, 0, W, H, [10, 10, 10]);

  // Subtle grid lines — very faint
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.1);
  doc.setGState(doc.GState({ opacity: 0.04 }));
  for (let x = 0; x <= W; x += 20) doc.line(x, 0, x, H);
  for (let y = 0; y <= H; y += 20) doc.line(0, y, W, y);
  doc.setGState(doc.GState({ opacity: 1 }));

  // Top label
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.3 }));
  text(doc, "GRAVITY ARCHITECTURE STUDIO", 16, 22);
  text(doc, `${new Date().getFullYear()}`, W - 16, 22, { align: "right" });
  doc.setGState(doc.GState({ opacity: 1 }));

  // Horizontal rule near top
  rule(doc, 30, [255, 255, 255], 0.12);

  // Main wordmark
  doc.setFont("helvetica", "bold");
  doc.setFontSize(72);
  doc.setTextColor(255, 255, 255);
  text(doc, "GRAVITY", W / 2, H / 2 - 14, { align: "center" });

  // Tagline
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.45 }));
  text(doc, "SELECTED WORKS  ·  2022 – 2025", W / 2, H / 2 + 6, { align: "center" });
  doc.setGState(doc.GState({ opacity: 1 }));

  // Thin horizontal rule below tagline
  rule(doc, H / 2 + 16, [255, 255, 255], 0.15);

  // Bottom footer
  rule(doc, H - 32, [255, 255, 255], 0.12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setGState(doc.GState({ opacity: 0.3 }));
  text(doc, "ROTTERDAM  ·  NL", 16, H - 24);
  text(doc, "GRAVITY-STUDIO.COM", W - 16, H - 24, { align: "right" });
  doc.setGState(doc.GState({ opacity: 1 }));
}

// ---------------------------------------------------------------------------

function drawIntro(doc: jsPDF) {
  // White page
  rect(doc, 0, 0, W, H, [255, 255, 255]);

  // Left sidebar accent
  rect(doc, 0, 0, 3, H, [10, 10, 10]);

  // Page header
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(0, 0, 0);
  doc.setGState(doc.GState({ opacity: 0.35 }));
  text(doc, "GRAVITY — STUDIO PROFILE", 16, 22);
  text(doc, "01 / " + String(projects.length + 2).padStart(2, "0"), W - 16, 22, { align: "right" });
  doc.setGState(doc.GState({ opacity: 1 }));

  rule(doc, 30, [0, 0, 0], 0.1);

  // Large section label
  doc.setFont("helvetica", "bold");
  doc.setFontSize(42);
  doc.setTextColor(10, 10, 10);
  text(doc, "Studio", 16, 72);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(42);
  text(doc, "Philosophy", 16, 90);

  rule(doc, 100, [0, 0, 0], 0.12);

  // Body text
  const body = [
    "Gravity is a Rotterdam-based architecture studio founded on the belief that",
    "buildings should feel inevitable — as if they could not exist in any other form",
    "or place. We work across residential, commercial, cultural, and hospitality",
    "typologies, always guided by material honesty, contextual sensitivity, and",
    "a commitment to the people who inhabit our spaces.",
    "",
    "Our practice draws from the precision of Dutch modernism and the warmth",
    "of craft traditions, combining both into work that is simultaneously rigorous",
    "and humane. Each project begins with a deep reading of its site, programme,",
    "and cultural context — and ends only when structure, skin, and soul align.",
    "",
    "This document presents a selection of completed and ongoing projects,",
    "spanning five continents and a decade of practice.",
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  let y = 116;
  for (const line of body) {
    if (line === "") {
      y += 5;
    } else {
      text(doc, line, 16, y);
      y += 6.5;
    }
  }

  // Stats row
  rule(doc, 210, [0, 0, 0], 0.1);

  const stats = [
    { value: "10+", label: "Years of Practice" },
    { value: String(projects.length), label: "Built Projects" },
    { value: "12", label: "Countries" },
    { value: "40+", label: "Distinctions" },
  ];

  const colW = (W - 32) / stats.length;
  stats.forEach((s, i) => {
    const x = 16 + i * colW;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(10, 10, 10);
    text(doc, s.value, x, 228);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(0, 0, 0);
    doc.setGState(doc.GState({ opacity: 0.45 }));
    text(doc, s.label.toUpperCase(), x, 236);
    doc.setGState(doc.GState({ opacity: 1 }));
  });

  rule(doc, 244, [0, 0, 0], 0.1);

  // Footer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setGState(doc.GState({ opacity: 0.3 }));
  text(doc, "GRAVITY ARCHITECTURE STUDIO  ·  PORTFOLIO 2022–2025", W / 2, H - 16, { align: "center" });
  doc.setGState(doc.GState({ opacity: 1 }));
}

// ---------------------------------------------------------------------------

function drawProject(doc: jsPDF, project: (typeof projects)[0], index: number, total: number) {
  // White background
  rect(doc, 0, 0, W, H, [250, 250, 250]);

  // Left accent bar (alternating shade)
  const shade = index % 2 === 0 ? [10, 10, 10] : [40, 40, 40];
  rect(doc, 0, 0, 3, H, shade as [number, number, number]);

  // Page header
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(0, 0, 0);
  doc.setGState(doc.GState({ opacity: 0.35 }));
  const pageNum = String(index + 2).padStart(2, "0");
  const totalPages = String(total + 2).padStart(2, "0");
  text(doc, `GRAVITY — ${project.category.toUpperCase()}`, 16, 22);
  text(doc, `${pageNum} / ${totalPages}`, W - 16, 22, { align: "right" });
  doc.setGState(doc.GState({ opacity: 1 }));

  rule(doc, 30, [0, 0, 0], 0.1);

  // Project number — large, faint
  doc.setFont("helvetica", "bold");
  doc.setFontSize(120);
  doc.setTextColor(0, 0, 0);
  doc.setGState(doc.GState({ opacity: 0.04 }));
  text(doc, String(index).padStart(2, "0"), W - 16, 110, { align: "right" });
  doc.setGState(doc.GState({ opacity: 1 }));

  // Project title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(38);
  doc.setTextColor(10, 10, 10);
  const titleLines = doc.splitTextToSize(project.title, W - 32) as string[];
  let y = 65;
  titleLines.forEach((line: string) => {
    text(doc, line, 16, y);
    y += 14;
  });

  // Category pill outline box
  const catX = 16;
  const catY = y + 2;
  doc.setDrawColor(10, 10, 10);
  doc.setLineWidth(0.3);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  const catLabel = project.category.toUpperCase();
  const catW = doc.getTextWidth(catLabel) + 8;
  doc.rect(catX, catY, catW, 7, "S");
  doc.setTextColor(10, 10, 10);
  text(doc, catLabel, catX + 4, catY + 4.8);

  // Metadata row
  y = catY + 18;
  rule(doc, y, [0, 0, 0], 0.12);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(0, 0, 0);
  doc.setGState(doc.GState({ opacity: 0.55 }));

  const meta = [
    { label: "LOCATION", value: project.location },
    { label: "YEAR", value: project.year },
    { label: "TYPE", value: project.category },
  ];

  const mColW = (W - 32) / meta.length;
  meta.forEach((m, i) => {
    const mx = 16 + i * mColW;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setGState(doc.GState({ opacity: 0.4 }));
    text(doc, m.label, mx, y);
    doc.setGState(doc.GState({ opacity: 0.85 }));
    doc.setFontSize(9);
    text(doc, m.value, mx, y + 6);
  });

  doc.setGState(doc.GState({ opacity: 1 }));

  y += 20;
  rule(doc, y, [0, 0, 0], 0.1);
  y += 12;

  // Description
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(20, 20, 20);
  const descLines = doc.splitTextToSize(project.description, W - 32) as string[];
  descLines.forEach((line: string) => {
    text(doc, line, 16, y);
    y += 6.8;
  });

  // Decorative bottom band
  rect(doc, 0, H - 28, W, 28, [10, 10, 10] as [number, number, number]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.35 }));
  text(doc, project.title.toUpperCase() + "  ·  " + project.location.toUpperCase(), 16, H - 16);
  text(doc, "GRAVITY", W - 16, H - 16, { align: "right" });
  doc.setGState(doc.GState({ opacity: 1 }));
}

// ---------------------------------------------------------------------------

function drawBackCover(doc: jsPDF) {
  rect(doc, 0, 0, W, H, [10, 10, 10]);

  // Subtle horizontal bands
  for (let i = 0; i < 6; i++) {
    rect(doc, 0, i * (H / 6), W, 0.4, [255, 255, 255] as [number, number, number]);
    doc.setGState(doc.GState({ opacity: 0.04 }));
    doc.setFillColor(255, 255, 255);
    doc.rect(0, i * (H / 6), W, 0.4, "F");
    doc.setGState(doc.GState({ opacity: 1 }));
  }

  // Center wordmark
  doc.setFont("helvetica", "bold");
  doc.setFontSize(48);
  doc.setTextColor(255, 255, 255);
  text(doc, "GRAVITY", W / 2, H / 2 - 10, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setGState(doc.GState({ opacity: 0.4 }));
  text(doc, "ARCHITECTURE STUDIO", W / 2, H / 2 + 2, { align: "center" });
  doc.setGState(doc.GState({ opacity: 1 }));

  rule(doc, H / 2 + 14, [255, 255, 255], 0.15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.4 }));
  text(doc, "ROTTERDAM  ·  NETHERLANDS", W / 2, H / 2 + 26, { align: "center" });
  text(doc, "GRAVITY-STUDIO.COM  ·  HELLO@GRAVITY-STUDIO.COM", W / 2, H / 2 + 35, { align: "center" });
  doc.setGState(doc.GState({ opacity: 1 }));

  // Bottom
  rule(doc, H - 32, [255, 255, 255], 0.12);
  doc.setFontSize(7);
  doc.setGState(doc.GState({ opacity: 0.25 }));
  text(doc, "© GRAVITY ARCHITECTURE STUDIO  ·  ALL RIGHTS RESERVED", W / 2, H - 22, { align: "center" });
  doc.setGState(doc.GState({ opacity: 1 }));
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export async function generatePortfolioPDF(): Promise<void> {
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

  // Cover
  drawCover(doc);

  // Studio intro
  doc.addPage();
  drawIntro(doc);

  // One page per project
  projects.forEach((project, i) => {
    doc.addPage();
    drawProject(doc, project, i + 1, projects.length);
  });

  // Back cover
  doc.addPage();
  drawBackCover(doc);

  // Trigger download
  doc.save("Gravity_Portfolio_2025.pdf");
}
