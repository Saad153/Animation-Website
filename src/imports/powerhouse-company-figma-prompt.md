# Figma Design Prompt — Powerhouse Company Website Recreation

---

## 📐 Project Overview

Design a **high-end architecture studio website** in Figma that mirrors the Powerhouse Company aesthetic — dark, editorial, minimal, and grid-driven. The design should capture every screen state, component, and transition frame needed to hand off to a developer or present as a prototype.

---

## 🖥️ Canvas & Frame Setup

- Frame size: **1440×900px** (Desktop), also create **390×844px** (Mobile)
- Background: **Pure black `#000000`**
- Font: Use **"Helvetica Neue"** or **"Inter"** as a substitute — all caps for nav, mixed case for body
- All text: **White `#FFFFFF`** on dark backgrounds

---

## 🔲 Screen 1 — Homepage (Default / Loaded State)

### Navigation Bar (Fixed, Top)
- Left: Logo — small wordmark "Powerhouse Company" in white, uppercase, ~13px
- Right: Nav links — `Projects`, `Team`, `About`, `Contact` — spaced horizontally, white, uppercase, 12–13px, no underline
- Full-width, transparent background, sits above the canvas

### Hero Canvas (Full Viewport)
- Black background fills 100% of viewport
- **Mosaic image grid** of rectangular image tiles scattered across the canvas in a **non-uniform, asymmetric layout** — approximately 8–12 tiles
- Tiles are **different sizes** (some portrait, some landscape), placed at **slight rotations (±1–3°)** and **varying positions** — they do NOT form a strict grid
- Each tile shows a **high-quality architectural photograph** (buildings, interiors, urban spaces)
- Tiles have **no borders, no shadows** — they float directly on black
- In the **center of the canvas**, overlaid on top of the image tiles: the text **"Powerhouse Company"** in large white serif or grotesque type (~80–120px), clipping through the images like a **text mask effect** — the text appears to reveal the images behind it

### States to Design
1. **Initial load state** — images are mid-animation (some scaled up, slightly blurred)
2. **Settled/idle state** — images at rest, clean composition
3. **Scroll interaction state** — some tiles zoomed in, others zoomed out (show as a separate frame with scale transforms applied)

---

## 🖼️ Screen 2 — Image Hover State

- When cursor hovers over an image tile, that tile gets a **subtle white border** (1px) or a **slight scale-up (1.05×)**
- A small label or arrow may appear at the corner
- Show this as a **component with hover variant** in Figma

---

## 📄 Screen 3 — Project Detail Page (Post-Click Transition)

- Design the **destination page** a user lands on after clicking a tile
- **Full-bleed hero image** of the selected project — 100vw × 65vh
- Below: Project title in large white type (60–80px), left-aligned
- Below title: Metadata row — `Location`, `Year`, `Category` — in small caps, white, 12px, separated by thin vertical lines
- Long-form body text in white, 16px, max-width ~720px, left-aligned
- Additional project images in a **vertical scroll layout** — full-width alternating with 2-col grids
- Same fixed nav as homepage

### Transition Frame (Animate in Figma Prototype)
- The clicked tile **expands** from its position on the homepage to fill the full viewport
- Create an intermediate frame showing the tile mid-expansion (scaled to ~80% viewport, centered)
- Final frame: full-bleed image with overlay of project title fading in

---

## 🧭 Screen 4 — Projects Grid Page (`/projects`)

- Black background
- **Strict asymmetric masonry or editorial grid** of project thumbnails
- Each thumbnail: rectangular, no gap or tight 2px gap, hover darkens slightly
- Project name appears on hover as white text overlay (centered or bottom-left)
- No filters, no sidebars — pure image grid

---

## 📋 Component Library (Figma Components Panel)

Create these as reusable components:

| Component | Description |
|---|---|
| `Nav/Default` | Logo + 4 nav links, dark bg |
| `ImageTile/Default` | Floating image tile, no border |
| `ImageTile/Hover` | With border + scale |
| `ProjectCard/Grid` | Thumbnail for projects page |
| `ProjectCard/Hover` | Dimmed with name overlay |
| `TextMask/Hero` | Large text with image clip-through visual |
| `MetaRow` | Location / Year / Category row |
| `Button/Arrow` | Minimal arrow CTA |

---

## 🎬 Prototype Interactions (Figma Prototype Tab)

Set up these interactions:

1. **Homepage Load** → Animate from blank black → mosaic tiles fade + scale in (use Smart Animate, 800ms, ease out)
2. **Tile Click** → Homepage frame → Transition frame → Project Detail page (Smart Animate, 600ms, ease in-out)
3. **Nav link hover** → Underline appears (1px white line, slide in from left)
4. **Scroll on homepage** → Use scroll-triggered variants showing tiles at different zoom levels (use Figma's scroll prototype feature)

---

## 🎨 Design Tokens

| Token | Value |
|---|---|
| Background | `#000000` |
| Text Primary | `#FFFFFF` |
| Text Secondary | `#888888` |
| Accent | `#FFFFFF` (borders only) |
| Font — Display | Helvetica Neue / Inter, 80–120px, weight 300–400 |
| Font — Nav | 12–13px, uppercase, letter-spacing 0.1em |
| Font — Body | 16px, regular, line-height 1.6 |
| Border Radius | 0px (no rounding anywhere) |
| Transitions | 600–800ms, ease-in-out |

---

## ✅ Deliverables Checklist

- [ ] Homepage — idle state
- [ ] Homepage — scroll/zoom state
- [ ] Homepage — tile hover state
- [ ] Project detail page
- [ ] Projects grid page (`/projects`)
- [ ] Component library with variants
- [ ] Prototype flow: load → browse → click → detail
- [ ] Mobile versions of homepage + project detail
