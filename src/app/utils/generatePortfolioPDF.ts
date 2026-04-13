// import { jsPDF } from "jspdf";
// import { projects } from "../data/projects";

// // ---------------------------------------------------------------------------
// // Helpers
// // ---------------------------------------------------------------------------
// const W = 210; // A4 width  (mm)
// const H = 297; // A4 height (mm)

// const CREAM: [number, number, number] = [247, 245, 240];
// const INK:   [number, number, number] = [18,  18,  18];
// const RUST:  [number, number, number] = [180, 90,  40];

// /** Draw a filled rectangle */
// function rect(
//   doc: jsPDF,
//   x: number,
//   y: number,
//   w: number,
//   h: number,
//   color: [number, number, number]
// ) {
//   doc.setFillColor(...color);
//   doc.rect(x, y, w, h, "F");
// }

// /** Thin horizontal rule */
// function rule(doc: jsPDF, y: number, color: [number, number, number], opacity = 1) {
//   doc.setDrawColor(...color);
//   doc.setLineWidth(0.25);
//   doc.setGState(doc.GState({ opacity }));
//   doc.line(16, y, W - 16, y);
//   doc.setGState(doc.GState({ opacity: 1 }));
// }

// /** Text helpers */
// function text(
//   doc: jsPDF,
//   str: string,
//   x: number,
//   y: number,
//   opts?: { align?: "left" | "center" | "right"; maxWidth?: number }
// ) {
//   doc.text(str, x, y, opts as Parameters<typeof doc.text>[3]);
// }

// /** Load an image URL into an HTMLImageElement */
// async function loadImg(src: string): Promise<HTMLImageElement> {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.onload = () => resolve(img);
//     img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
//     img.src = src;
//   });
// }

// /** Safe addImage — silently skips if image fails */
// async function addImg(
//   doc: jsPDF,
//   src: string,
//   x: number,
//   y: number,
//   w: number,
//   h: number
// ) {
//   try {
//     const img = await loadImg(src);
//     doc.addImage(img, "PNG", x, y, w, h);
//   } catch {
//     // Draw placeholder rectangle if image fails
//     doc.setFillColor(220, 215, 205);
//     doc.rect(x, y, w, h, "F");
//   }
// }

// // ---------------------------------------------------------------------------
// // Pages
// // ---------------------------------------------------------------------------

// async function drawCover(doc: jsPDF) {
//   // Warm cream background
//   rect(doc, 0, 0, W, H, CREAM);

//   // Right accent stripe
//   rect(doc, W - 6, 0, 6, H, RUST);

//   // Top micro-rule
//   rule(doc, 22, INK, 0.15);

//   // Header label
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(7);
//   doc.setTextColor(...INK);
//   doc.setGState(doc.GState({ opacity: 0.4 }));
//   text(doc, "GRAVITY ARCHITECTURE STUDIO", 16, 18);
//   text(doc, ` KARACHI`, W - 22, 18, { align: "right" });
//   doc.setGState(doc.GState({ opacity: 1 }));

//   // Large vertical studio number / year
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(200);
//   doc.setTextColor(...CREAM);
//   doc.setGState(doc.GState({ opacity: 0.18 }));
//   text(doc, "G", -8, H * 0.72);
//   doc.setGState(doc.GState({ opacity: 1 }));

//   // Main wordmark
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(60);
//   doc.setTextColor(...INK);
//   text(doc, "GRAVITY", 16, H / 2 - 8);

//   // Sub-rule
//   rule(doc, H / 2 + 2, INK, 0.2);

//   // Tagline
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(10);
//   doc.setTextColor(...INK);
//   doc.setGState(doc.GState({ opacity: 0.5 }));
//   text(doc, "Architecture  ·  Interiors  ·  Urban Design", 16, H / 2 + 14);
//   doc.setGState(doc.GState({ opacity: 1 }));

//   // Category label
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(7.5);
//   doc.setTextColor(...RUST);
//   text(doc, "PORTFOLIO  ·  SELECTED WORKS  2022 – 2027", 16, H / 2 + 28);

//   // Bottom rule + footer
//   rule(doc, H - 30, INK, 0.12);
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(7);
//   doc.setTextColor(...INK);
//   doc.setGState(doc.GState({ opacity: 0.35 }));
//   text(doc, "KARACHI  ·  LAHORE  ·  ISLAMABAD", 16, H - 22);
//   text(doc, "gravity.dnc@gmail.com", W - 22, H - 22, { align: "right" });
//   doc.setGState(doc.GState({ opacity: 1 }));
// }

// // ---------------------------------------------------------------------------

// async function drawIntro(doc: jsPDF) {
//   // Cream page
//   rect(doc, 0, 0, W, H, CREAM);

//   // Left sidebar accent
//   rect(doc, 0, 0, 4, H, INK);

//   // Page header
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(7);
//   doc.setTextColor(...INK);
//   doc.setGState(doc.GState({ opacity: 0.35 }));
//   text(doc, "GRAVITY — STUDIO PROFILE", 16, 22);
//   text(doc, "01 / " + String(projects.length + 2).padStart(2, "0"), W - 16, 22, { align: "right" });
//   doc.setGState(doc.GState({ opacity: 1 }));

//   rule(doc, 30, INK, 0.1);

//   // Large section label
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(38);
//   doc.setTextColor(...INK);
//   text(doc, "Studio", 16, 68);

//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(38);
//   doc.setTextColor(...RUST);
//   text(doc, "Philosophy", 16, 84);

//   rule(doc, 94, INK, 0.12);

//   // Body text
//   const body = [
//     "Over the past two decades, Gravity has established itself as a leading",
//     "firm in architecture, interior design, and construction services in",
//     "Pakistan. We are renowned for our impressive range of designs,",
//     "commitment to service excellence, and high-quality standards. To date,",
//     "we have completed more than 200 diverse projects",
//     "",
//     "We work across high-rise residential, commercial, hospitality, educational, and",
//     "interior typologies, guided by material honesty and contextual care.",
//     "",
//     "Each project begins with a deep reading of its site, programme, and",
//     "cultural context and ends only when structure, skin, and soul align.",
//     "From Karachi's dense urban fabric to Pakistan's mountain landscapes,",
//     "we bring the same rigour and warmth to every scale of work.",
//     "",
//     "This portfolio presents a selection of completed and ongoing projects.",
//   ];

//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(10);
//   doc.setTextColor(...INK);
//   let y = 110;
//   for (const line of body) {
//     if (line === "") {
//       y += 5;
//     } else {
//       text(doc, line, 16, y);
//       y += 6.5;
//     }
//   }

//   // Stats row
//   rule(doc, 210, INK, 0.1);

//   const stats = [
//     { value: "30+", label: "Years of Practice" },
//     { value: String(projects.length), label: "Built Projects" },
//     { value: "30", label: "Team Members" },
//     { value: "4", label: "Office Locations" },
//   ];

//   const colW = (W - 32) / stats.length;
//   stats.forEach((s, i) => {
//     const x = 16 + i * colW;
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(24);
//     doc.setTextColor(...INK);
//     text(doc, s.value, x, 228);

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(7.5);
//     doc.setTextColor(...INK);
//     doc.setGState(doc.GState({ opacity: 0.45 }));
//     text(doc, s.label.toUpperCase(), x, 236);
//     doc.setGState(doc.GState({ opacity: 1 }));
//   });

//   rule(doc, 244, INK, 0.1);

//   // Footer
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(7);
//   doc.setGState(doc.GState({ opacity: 0.3 }));
//   text(doc, "GRAVITY ARCHITECTURE STUDIO  ·  PORTFOLIO 2022–2026", W / 2, H - 16, { align: "center" });
//   doc.setGState(doc.GState({ opacity: 1 }));
// }

// // ---------------------------------------------------------------------------

// async function drawProject(
//   doc: jsPDF,
//   project: (typeof projects)[0],
//   index: number,
//   total: number
// ) {
//   // Cream background
//   rect(doc, 0, 0, W, H, CREAM);

//   // Left accent bar
//   const accentColor: [number, number, number] = index % 2 === 0 ? INK : RUST;
//   rect(doc, 0, 0, 4, H, accentColor);

//   // Page header
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(7);
//   doc.setTextColor(...INK);
//   doc.setGState(doc.GState({ opacity: 0.35 }));
//   const pageNum   = String(index + 2).padStart(2, "0");
//   const totalPages = String(total + 2).padStart(2, "0");
//   text(doc, `GRAVITY — ${project.category.toUpperCase()}`, 16, 22);
//   text(doc, `${pageNum} / ${totalPages}`, W - 16, 22, { align: "right" });
//   doc.setGState(doc.GState({ opacity: 1 }));

//   rule(doc, 30, INK, 0.1);

//   // Project number — large, faint watermark
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(100);
//   doc.setTextColor(...INK);
//   doc.setGState(doc.GState({ opacity: 0.04 }));
//   text(doc, String(index).padStart(2, "0"), W - 16, 90, { align: "right" });
//   doc.setGState(doc.GState({ opacity: 1 }));

//   // Project title
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(26);
//   doc.setTextColor(...INK);
//   const titleLines = doc.splitTextToSize(project.title, W - 80) as string[];
//   let y = 55;
//   titleLines.forEach((line: string) => {
//     text(doc, line, 16, y);
//     y += 10;
//   });

//   // Category pill
//   const catX = 16;
//   const catY  = y + 2;
//   doc.setDrawColor(...accentColor);
//   doc.setLineWidth(0.3);
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(6.5);
//   const catLabel = project.category.toUpperCase();
//   const catW = doc.getTextWidth(catLabel) + 8;
//   doc.rect(catX, catY, catW, 6.5, "S");
//   doc.setTextColor(...accentColor);
//   text(doc, catLabel, catX + 4, catY + 4.5);

//   // Metadata row
//   y = catY + 16;
//   rule(doc, y, INK, 0.12);
//   y += 8;

//   const meta = [
//     { label: "LOCATION", value: project.location },
//     // { label: "YEAR",     value: project.year },
//     { label: "STATUS",   value: project.status },
//   ];

//   const mColW = (W - 32) / meta.length;
//   meta.forEach((m, i) => {
//     const mx = 16 + i * mColW;
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(6.5);
//     doc.setTextColor(...INK);
//     doc.setGState(doc.GState({ opacity: 0.4 }));
//     text(doc, m.label, mx, y);
//     doc.setGState(doc.GState({ opacity: 0.85 }));
//     doc.setFontSize(9);
//     text(doc, m.value, mx, y + 6);
//   });

//   doc.setGState(doc.GState({ opacity: 1 }));

//   y += 22;
//   rule(doc, y, INK, 0.1);
//   y += 10;

//   // Description
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(9.5);
//   doc.setTextColor(...INK);
//   const descLines = doc.splitTextToSize(project.description, W - 32) as string[];
//   descLines.slice(0, 6).forEach((line: string) => {
//     text(doc, line, 16, y);
//     y += 6.5;
//   });

//   // ── Project hero image — takes the lower portion of the page ──────────────
//   const imgY = y + 8;
//   const imgH = H - imgY - 20;
//   const imgW = W - 32;

//   if (imgH > 30) {
//     await addImg(doc, project.image, 16, imgY, imgW, imgH);

//     // Thin border over image
//     doc.setDrawColor(...INK);
//     doc.setLineWidth(0.2);
//     doc.setGState(doc.GState({ opacity: 0.15 }));
//     doc.rect(16, imgY, imgW, imgH, "S");
//     doc.setGState(doc.GState({ opacity: 1 }));

//     // Image caption bar
//     rect(doc, 16, imgY + imgH - 9, imgW, 9, [18, 18, 18]);
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(6.5);
//     doc.setTextColor(247, 245, 240);
//     doc.setGState(doc.GState({ opacity: 0.7 }));
//     text(doc, project.title.toUpperCase() + "  ·  " + project.location.toUpperCase(), 20, imgY + imgH - 3);
//     text(doc, "GRAVITY", W - 20, imgY + imgH - 3, { align: "right" });
//     doc.setGState(doc.GState({ opacity: 1 }));
//   }

//   // Bottom rule
//   rule(doc, H - 14, INK, 0.1);
// }

// // ---------------------------------------------------------------------------

// async function drawBackCover(doc: jsPDF) {
//   // Cream background
//   rect(doc, 0, 0, W, H, CREAM);

//   // Large rust accent block — top third
//   rect(doc, 0, 0, W, H * 0.38, RUST);

//   // Top section: GRAVITY on rust
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(54);
//   doc.setTextColor(247, 245, 240);
//   text(doc, "GRAVITY", W / 2, H * 0.2, { align: "center" });

//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(9);
//   doc.setTextColor(247, 245, 240);
//   doc.setGState(doc.GState({ opacity: 0.65 }));
//   text(doc, "ARCHITECTURE  ·  INTERIORS ", W / 2, H * 0.2 + 14, { align: "center" });
//   doc.setGState(doc.GState({ opacity: 1 }));

//   // Dividing rule at top/cream boundary
//   doc.setDrawColor(247, 245, 240);
//   doc.setLineWidth(0.5);
//   doc.line(0, H * 0.38, W, H * 0.38);

//   // Contact info section — cream area
//   let y = H * 0.38 + 28;

//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(14);
//   doc.setTextColor(...INK);
//   text(doc, "Get in touch", 16, y);

//   y += 14;
//   rule(doc, y, INK, 0.1);
//   y += 12;

//   const contacts = [
//     { label: "EMAIL",   value: "gravity.dnc@gmail.com" },
//     { label: "KARACHI", value: "Architecture & Interiors — DHA Phase 2" },
//     // { label: "KARACHI", value: "Furniture & Interiors — DHA Phase 5" },
//     { label: "LAHORE",  value: "Address coming soon" },
//     { label: "ISLAMABAD", value: "Address coming soon" },
//   ];

//   contacts.forEach((c) => {
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(6.5);
//     doc.setTextColor(...INK);
//     doc.setGState(doc.GState({ opacity: 0.4 }));
//     text(doc, c.label, 16, y);
//     doc.setGState(doc.GState({ opacity: 0.85 }));
//     doc.setFontSize(9);
//     text(doc, c.value, 16, y + 6);
//     y += 16;
//   });

//   rule(doc, y + 4, INK, 0.1);

//   // Bottom copyright
//   rule(doc, H - 28, INK, 0.1);
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(7);
//   doc.setTextColor(...INK);
//   doc.setGState(doc.GState({ opacity: 0.3 }));
//   text(
//     doc,
//     "© GRAVITY ARCHITECTURE STUDIO  ·  ALL RIGHTS RESERVED  ·  " + new Date().getFullYear(),
//     W / 2,
//     H - 18,
//     { align: "center" }
//   );
//   doc.setGState(doc.GState({ opacity: 1 }));
// }

// // ---------------------------------------------------------------------------
// // Main export
// // ---------------------------------------------------------------------------

// export async function generatePortfolioPDF(): Promise<void> {
//   const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

//   // Cover
//   await drawCover(doc);

//   // Studio intro
//   doc.addPage();
//   await drawIntro(doc);

//   // One page per project — with hero image
//   for (let i = 0; i < projects.length; i++) {
//     doc.addPage();
//     await drawProject(doc, projects[i], i + 1, projects.length);
//   }

//   // Back cover
//   doc.addPage();
//   await drawBackCover(doc);

//   // Trigger download
//   doc.save("Gravity_Portfolio_2025.pdf");
// }



export async function generatePortfolioPDF(): Promise<void> {
  const a = document.createElement("a");
  a.href = "https://drive.google.com/file/d/1RWvHsO-TgbOPrhAtU_ZoMBNAGrDaV66F/view?usp=drive_link";
  a.download = "GRAVITY Architecture & Interiors 2026.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}