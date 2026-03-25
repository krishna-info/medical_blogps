# task.md
## Homepage Redesign — Aesthetic, Professional, Modern UI with Animations

**Project:** Medical Blog Website  
**Scope:** `app/page.tsx` + homepage-specific components only  
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion  
**Design System:** design-doc.md v1.0 (colours, typography, spacing — all preserved)  
**Priority:** All tasks ordered by visual impact (highest first)

---

## PHASE A — Dependencies & Setup
> Must be done first. Nothing else works without these.

- [ ] **A1** — Install Framer Motion
  ```bash
  npm install framer-motion
  ```
  Used for: scroll-triggered reveals, staggered card entrances, hero text animation, counter animation, hover micro-interactions

- [ ] **A2** — Install `@tailwindcss/typography` plugin (if not already installed)
  ```bash
  npm install @tailwindcss/typography
  ```
  Used for: prose styling in article preview excerpts

- [ ] **A3** — Add custom Tailwind keyframes in `tailwind.config.ts`
  Add the following animation utilities:
  - `animate-fade-up` — translateY(24px) → 0 + opacity 0 → 1
  - `animate-fade-in` — opacity 0 → 1
  - `animate-pulse-slow` — slow opacity pulse for ambient glow effects
  - `animate-shimmer` — for skeleton loading states
  - Custom timing: `ease: [0.16, 1, 0.3, 1]` (expo ease-out — feels premium)

- [ ] **A4** — Add Google Fonts to `app/layout.tsx`
  - Import: `Inter` (weights: 400, 500, 600, 700) — for all UI elements
  - Import: `Lora` (weights: 400, 600) — for article excerpts and hero subtext
  - Apply via `next/font/google` (zero layout shift, self-hosted by Next.js)

---

## PHASE B — Navbar Redesign
> Sticky, glassmorphism on scroll, smooth mobile menu

- [ ] **B1** — Create `components/layout/Navbar.tsx` (replaces old Header)
  - Transparent background when at top of page
  - On scroll down 60px: apply `backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm`
  - Smooth CSS transition: `transition: background 300ms ease, box-shadow 300ms ease`
  - Use `useScrollPosition` hook to detect scroll state

- [ ] **B2** — Logo animation
  - Subtle scale on hover: `hover:scale-105 transition-transform duration-200`
  - Medical cross SVG icon before logo text — slow pulse on load using `animate-pulse-slow`

- [ ] **B3** — Nav link hover effect
  - Underline slides in from left on hover via `::after` pseudo-element
  - Active page: underline always visible in `#1B4F8C` (Medical Blue from design-doc.md)
  - Smooth transition: `transition: width 200ms ease`

- [ ] **B4** — "Book Appointment" CTA button
  - Background: `#1B4F8C` → hover `#0E7C7B` with smooth colour transition
  - Subtle arrow icon that slides right 4px on hover: `group-hover:translate-x-1`
  - Focus ring for accessibility: `focus:ring-2 focus:ring-offset-2 focus:ring-blue-600`

- [ ] **B5** — Mobile hamburger menu
  - Animated 3-bar → X icon (bars morph using CSS transforms, not a swap)
  - Fullscreen overlay slides down from top: `translateY(-100%) → translateY(0)` 300ms
  - Staggered nav links fade in with 60ms delay between each
  - Background: `bg-white` with 3px Medical Blue accent line at top

---

## PHASE C — Hero Section (Highest Visual Impact)
> First thing visitors see. Must earn trust in under 3 seconds.

- [ ] **C1** — Replace flat hero with split-layout hero
  - Left 55%: text content (headline, subheadline, CTAs, trust badges)
  - Right 45%: doctor illustration or abstract medical graphic (SVG or Cloudinary image)
  - Background: subtle radial gradient `#EEF4FF → #FFFFFF` (not a hard colour block)
  - Very subtle dot-grid CSS pattern overlay at `opacity: 0.04`
  - Min height: `100vh` on desktop, `auto` on mobile

- [ ] **C2** — Hero headline animation (Framer Motion)
  - Split headline into individual words
  - Each word: `initial={{ opacity: 0, y: 24 }}` → `animate={{ opacity: 1, y: 0 }}`
  - Stagger delay: 80ms per word
  - Duration: 600ms, ease: `[0.16, 1, 0.3, 1]` (expo ease-out)
  - Font: Inter 700, size 48px desktop / 32px mobile, colour `#1A1A2E`

- [ ] **C3** — Hero subheadline
  - Fade in 400ms after headline animation completes
  - Font: Lora italic 18–20px, `#666666` (Muted Text — design-doc.md)
  - Max width 480px to prevent overly long lines
  - `initial={{ opacity: 0 }}` → `animate={{ opacity: 1 }}`

- [ ] **C4** — Hero CTA buttons
  - Primary: "Read Latest Articles" — `bg-[#1B4F8C]` filled, arrow icon
  - Secondary: "Book Appointment" — outlined, `border-[#0E7C7B]` Trust Teal
  - Both animate in together 500ms after headline, `fadeUp` with slight delay
  - Primary: shimmer sweep on hover — white diagonal highlight sweeps left → right via `::before` pseudo
  - Secondary: border draws from centre outward on hover using `clip-path` animation

- [ ] **C5** — Trust badges row below CTAs
  - 3 inline stats: "500+ Articles" · "10K+ Readers" · "Expert-Reviewed"
  - Counter animation: numbers count from 0 → target when hero enters viewport
  - Use Framer Motion `useMotionValue` + `useTransform` + `useInView`
  - Small verified checkmark SVG before "Expert-Reviewed"
  - Fade in 700ms after page load

- [ ] **C6** — Hero right-side doctor visual
  - Image in asymmetric rounded clip: `border-radius: 60% 40% 55% 45% / 50% 50% 50% 50%`
  - Floating card 1 — bottom-left of image: "⭐ 4.9 Patient Rating" — springs up on load
  - Floating card 2 — top-right of image: "📋 Daily Health Tips" — springs down on load
  - Both cards: `backdrop-blur-sm bg-white/90 shadow-lg rounded-xl`
  - Spring physics: `type: "spring", stiffness: 200, damping: 20`

- [ ] **C7** — Hero ambient background blobs
  - 2 soft blurred circles: Medical Blue `#1B4F8C` and Trust Teal `#0E7C7B`, `opacity: 0.06`
  - Slow pulse: `scale(1) → scale(1.12)` over 5s, infinite, alternating timing
  - `pointer-events: none`, `z-index: -1`, `will-change: transform`

---

## PHASE D — Stats / Social Proof Bar
> New section — adds instant credibility below hero

- [ ] **D1** — Add full-width stats bar
  - Background: `#1B4F8C` (Medical Blue from design-doc.md)
  - 4 stats in a horizontal row:
    | Stat | Icon |
    |------|------|
    | 500+ Medical Articles | document icon |
    | 7 Specialities Covered | stethoscope icon |
    | 10,000+ Monthly Readers | people icon |
    | Expert-Reviewed Content | checkmark icon |
  - Numbers: Inter 700, 32px, white
  - Labels: Inter 400, 14px, `rgba(255,255,255,0.75)`
  - Count-up animation when section enters viewport
  - Mobile: 2×2 grid

---

## PHASE E — Featured Articles Grid
> Replace uniform 3-column grid with editorial-style layout

- [ ] **E1** — Editorial grid layout
  - Desktop: Featured post spans 2 of 3 columns (left), 2 smaller posts stack on right
  - Tablet: 2 equal columns
  - Mobile: 1 column
  - Section heading "Latest Articles" — Inter 600, 28px, with "View all →" right-aligned

- [ ] **E2** — BlogCard redesign
  - Image: 16:9, full-bleed top, `overflow-hidden rounded-t-xl`
  - Image zoom on hover: `scale(1.04)` with `transition: transform 400ms ease`
  - Category badge: colour per category (design-doc.md Section 4.2)
  - Featured card title: Lora serif for editorial warmth
  - Smaller cards title: Inter 600
  - "Read more →" link: fades in and slides right on card hover

- [ ] **E3** — Scroll-triggered card entrance (Framer Motion)
  - `initial={{ opacity: 0, y: 32 }}` → `animate={{ opacity: 1, y: 0 }}`
  - Stagger: 100ms between cards, triggered by `useInView` with `once: true`
  - Duration: 500ms, expo ease-out

- [ ] **E4** — "Featured" label overlay on first article
  - Absolute positioned on image, top-left
  - Text: "FEATURED" — uppercase, letter-spacing 0.1em, 11px
  - Background: `bg-[#1B4F8C]/85 backdrop-blur-sm` pill

---

## PHASE F — Categories Section
> Upgrade from flat pill row to interactive icon cards

- [ ] **F1** — Replace pill row with scrollable category cards
  - 7 categories: Cardiology, Dermatology, Nutrition, Mental Health, Pediatrics, Research, Wellness
  - Each card: SVG medical icon (32px) + category name + article count badge
  - Horizontal scroll on mobile with `scroll-snap-type: x mandatory`
  - Desktop: auto-fill grid that wraps cleanly

- [ ] **F2** — Category card design & hover
  - Default: white card, subtle border, icon in category colour
  - Hover: `translateY(-4px)` + elevated shadow + light category colour tint background
  - Transition: `all 200ms ease`
  - Active: filled background in category colour, white text and icon

- [ ] **F3** — Staggered entrance animation
  - `fadeUp` on scroll into view, 60ms stagger between each card
  - Spring physics on hover lift

---

## PHASE G — Clinic / Self-Promo Banner
> Replace flat box with premium split-layout CTA section

- [ ] **G1** — Split promo section
  - Left 60%: headline + subtext + CTA + 3 trust checkmarks
  - Right 40%: clinic illustration or doctor photo
  - Background: `linear-gradient(135deg, #1B4F8C, #0E7C7B)` (design-doc.md colours)
  - Shape: `rounded-3xl` on desktop, full-width on mobile
  - Subtle diagonal dot pattern at very low opacity

- [ ] **G2** — CTA button with pulse ring
  - Background: white, text: `#1B4F8C`
  - Arrow slides right on hover: `group-hover:translate-x-1.5 transition-transform`
  - Pulse ring animation: `box-shadow: 0 0 0 0 rgba(255,255,255,0.5)` expands and fades, 2s loop

- [ ] **G3** — Floating trust pills
  - 3 small pills: "✓ MBBS, MD Verified" · "✓ Evidence-Based" · "✓ Updated Daily"
  - Float animation: `translateY(-5px) → translateY(5px)` slow loop (3s, ease-in-out, infinite)
  - Staggered timing so all 3 move at slightly different rates

---

## PHASE H — Secondary Articles Row

- [ ] **H1** — "More Articles" section
  - Heading: "More from the Blog" — with decorative left border in Trust Teal
  - "View all →" link right-aligned, animated underline on hover
  - 3-column desktop, 2-column tablet, 1-column mobile

- [ ] **H2** — Horizontal card variant
  - Image left 40%, content right 60%
  - Same hover: image zoom + shadow lift
  - Compact — creates visual hierarchy below the featured section

- [ ] **H3** — Scroll entrance
  - Section heading `fadeUp`, cards stagger 80ms apart, all `once: true`

---

## PHASE I — Newsletter Section
> Upgrade from basic input to a premium full-width section

- [ ] **I1** — Premium newsletter section layout
  - Background: `#F4F6F9` (Soft Grey — design-doc.md) full-width
  - Large headline: "Stay Informed. Stay Healthy."
  - Subtext: "Join 10,000+ readers who get trusted medical insights every week."
  - Email input + button: side-by-side on desktop, stacked on mobile
  - Input: `rounded-xl`, 48px height, shadow on focus-within

- [ ] **I2** — Privacy micro-copy
  - "🔒 No spam. Unsubscribe anytime. GDPR compliant."
  - Subtle, `#999999`, 13px, centred below form

- [ ] **I3** — Section entrance animation
  - Heading `fadeUp` on scroll, form fades in 200ms later

- [ ] **I4** — Success state animation
  - On subscribe: form `slideOut` left, success message `slideIn` from right
  - SVG checkmark: draw-stroke animation (stroke-dashoffset 0 → 100)
  - Message: "You're in! Confirmation sent to your inbox."

---

## PHASE J — Footer Redesign
> Structured 4-column footer replacing current basic links row

- [ ] **J1** — 4-column footer layout
  - Col 1: Logo + 2-line tagline + social icon row (LinkedIn, Twitter/X)
  - Col 2: Quick Links — Home, Blog, About, Contact, Membership
  - Col 3: Specialities — all 7 from design-doc.md
  - Col 4: Newsletter mini-form + "✓ Expert content" badge

- [ ] **J2** — Gradient top border
  - 3px line: `linear-gradient(to right, #1B4F8C, #0E7C7B, #1B4F8C)`
  - Full width, no border-radius

- [ ] **J3** — Social icon hover
  - Scale `1 → 1.2` + colour change to Trust Teal on hover
  - Spring physics: `type: "spring", stiffness: 300, damping: 18`

- [ ] **J4** — Bottom bar
  - Copyright left, legal links right
  - Medical disclaimer text centred, 12px, `#999999`
  - Matches design-doc.md Section 4.3 disclaimer styling

---

## PHASE K — Performance & Accessibility Audit
> Final phase — validates the redesign keeps Lighthouse 90+

- [ ] **K1** — Animation performance
  - All animations use `transform` + `opacity` only (GPU layer, no layout reflow)
  - `will-change: transform` on all animated elements
  - `useReducedMotion()` hook: wrap all Framer Motion animations — disable for users with reduced motion preference (`prefers-reduced-motion: reduce`)

- [ ] **K2** — Core Web Vitals check
  - LCP: hero image uses `priority` prop on `next/image` (preloads eagerly)
  - CLS: all images have explicit `width` + `height` props — zero layout shift
  - INP: no heavy synchronous JS blocking scroll or input events

- [ ] **K3** — Accessibility audit
  - Navbar: `aria-label="Main navigation"`, active page `aria-current="page"`
  - Mobile menu: `aria-expanded`, `aria-controls`, focus trap while open
  - Decorative blobs: `aria-hidden="true"`
  - All contrast ratios 4.5:1+ per WCAG AA (design-doc.md Section 7)

- [ ] **K4** — Responsive QA
  - Test breakpoints: 375px, 430px, 768px, 1024px, 1280px, 1440px
  - Zero horizontal overflow on any viewport
  - Touch targets minimum 44×44px

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| A | 4 | Dependencies & setup |
| B | 5 | Navbar |
| C | 7 | Hero section |
| D | 1 | Stats bar (new) |
| E | 4 | Featured articles grid |
| F | 3 | Categories |
| G | 3 | Promo banner |
| H | 3 | Secondary articles |
| I | 4 | Newsletter |
| J | 4 | Footer |
| K | 4 | Performance & accessibility |
| **Total** | **42** | |

---

*task.md v1.0 — Homepage Redesign — Medical Blog Website*
