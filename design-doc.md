# Design Document
## Medical Blog Website — UI/UX & System Design

**Version:** 1.0  
**Date:** March 2026  
**Status:** Ready for Implementation  

---

## 1. Design Philosophy

### 1.1 Core Principles
- **Trust first** — Medical content demands credibility. Clean, clinical, and professional aesthetic
- **Accessibility** — Readable typography, sufficient contrast, keyboard navigation
- **Content-forward** — Design gets out of the way; content is the hero
- **Performance as design** — Fast load = good UX; every design decision must respect performance
- **Mobile-first** — Over 70% of health searches happen on mobile

### 1.2 Design Tone
Calm, professional, and approachable. Not sterile or intimidating. Think "trusted family doctor" not "hospital corridor."

---

## 2. Visual Design System

### 2.1 Colour Palette

#### Primary Palette
| Name | Hex | Usage |
|------|-----|-------|
| Medical Blue | `#1B4F8C` | Primary brand colour, headings, CTAs |
| Trust Teal | `#0E7C7B` | Secondary actions, category badges, links |
| Clean White | `#FFFFFF` | Page backgrounds, card backgrounds |
| Soft Grey | `#F4F6F9` | Section backgrounds, alternate rows |

#### Accent & State Colours
| Name | Hex | Usage |
|------|-----|-------|
| Alert Red | `#C0392B` | Warnings, disclaimers, critical labels |
| Success Green | `#059669` | Confirmation states, checkmarks |
| Warm Amber | `#D97706` | Highlights, "new" badges, featured tags |
| Light Blue Tint | `#D6E4F7` | Card hover states, info boxes |

#### Typography Colours
| Name | Hex | Usage |
|------|-----|-------|
| Dark Text | `#1A1A2E` | Body copy, primary text |
| Muted Text | `#666666` | Meta info — date, read time, author role |
| Subtle Text | `#999999` | Footer notes, captions |

### 2.2 Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display / H1 | Inter or Poppins | 700 Bold | 36–48px |
| Section / H2 | Inter | 600 SemiBold | 28–32px |
| Subsection / H3 | Inter | 600 SemiBold | 22–24px |
| Body / Article | Georgia or Lora | 400 Regular | 18px |
| Meta / Labels | Inter | 400–500 | 13–14px |
| Code / CMS | Courier New | 400 | 14px |

> **Rationale:** Serif font (Georgia/Lora) for article body improves reading comfort for long-form medical content. Sans-serif (Inter/Poppins) for UI elements ensures clarity.

### 2.3 Spacing Scale (Tailwind-based)
```
4px  → xs  (tight labels)
8px  → sm  (inline gaps)
16px → md  (component padding)
24px → lg  (card padding)
32px → xl  (section gaps)
48px → 2xl (page sections)
64px → 3xl (hero sections)
```

### 2.4 Border Radius
- Cards: `rounded-xl` (12px)
- Buttons: `rounded-lg` (8px)
- Badges/Tags: `rounded-full`
- Input fields: `rounded-md` (6px)

### 2.5 Shadows
```css
/* Card default */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

/* Card hover */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

/* Modal/Popup */
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
```

---

## 3. Page Designs

### 3.1 Homepage Layout

```
┌──────────────────────────────────────────────────────────────┐
│  HEADER: Logo | Home | Blog | Categories | About | Contact   │
│          [Search Icon]  [Book Appointment CTA]               │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  HERO BANNER                                                 │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  "Dr. [Name] — Trusted Medical Insights"              │    │
│  │  Tagline | [Read Latest Articles] [Book Appointment]  │    │
│  │  Clinic logo / Doctor photo (right side)              │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  LATEST ARTICLES — 3-column grid                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │ Featured  │  │  Post 2  │  │  Post 3  │                   │
│  │  Post 1   │  │          │  │          │                   │
│  └──────────┘  └──────────┘  └──────────┘                   │
│                                                              │
│  SELF-PROMO BANNER (full-width)                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  "Book a Consultation" or "Shop Our Products"         │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  CATEGORIES ROW — horizontal pill navigation                 │
│  [Cardiology] [Nutrition] [Mental Health] [Pediatrics] ...   │
│                                                              │
│  MORE ARTICLES — 2-column grid (posts 4–9)                   │
│                                                              │
│  NEWSLETTER SIGNUP SECTION                                   │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  "Get weekly health tips" — Email input + Subscribe   │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  FOOTER: Links | Disclaimer | Privacy Policy | Social        │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 Blog Post Page Layout

```
┌──────────────────────────────────────────────────────────────┐
│  HEADER (same as homepage)                                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  BREADCRUMB: Home > Nutrition > Article Title                │
│                                                              │
│  ┌────────────────────────────────┐  ┌────────────────┐      │
│  │  ARTICLE CONTENT (70% width)   │  │  SIDEBAR (30%) │      │
│  │                                │  │                │      │
│  │  [Category Badge]  [Read time] │  │  ┌──────────┐  │      │
│  │  # Article Title               │  │  │  CLINIC  │  │      │
│  │                                │  │  │  AD BOX  │  │      │
│  │  Author: Dr. Name | Date       │  │  │ [Book Now]│  │      │
│  │  Credentials: MBBS, MD         │  │  └──────────┘  │      │
│  │  Medically Reviewed by: [Name] │  │                │      │
│  │                                │  │  CATEGORIES    │      │
│  │  [Featured Image]              │  │  ─────────────  │      │
│  │                                │  │  • Cardiology  │      │
│  │  Article body paragraph 1...   │  │  • Nutrition   │      │
│  │  Article body paragraph 2...   │  │  • ...         │      │
│  │  Article body paragraph 3...   │  │                │      │
│  │                                │  │  NEWSLETTER    │      │
│  │  ┌──────────────────────────┐  │  │  SIGNUP BOX    │      │
│  │  │  IN-POST PROMO BANNER    │  │  │                │      │
│  │  └──────────────────────────┘  │  └────────────────┘      │
│  │                                │                          │
│  │  Article body continues...     │                          │
│  │                                │                          │
│  │  ┌──────────────────────────┐  │                          │
│  │  │  MEDICAL DISCLAIMER      │  │                          │
│  │  └──────────────────────────┘  │                          │
│  │                                │                          │
│  │  AUTHOR BIO CARD               │                          │
│  │  [Avatar] Dr. Name — MBBS, MD  │                          │
│  │  Speciality & short bio        │                          │
│  │                                │                          │
│  │  RELATED POSTS (3 cards)       │                          │
│  │                                │                          │
│  │  COMMENTS (Giscus)             │                          │
│  └────────────────────────────────┘                          │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  FOOTER                                                       │
└──────────────────────────────────────────────────────────────┘
```

### 3.3 Blog Listing Page Layout

```
┌──────────────────────────────────────────────────────────────┐
│  HEADER                                                       │
├──────────────────────────────────────────────────────────────┤
│  PAGE TITLE: "All Articles"                                   │
│  SEARCH BAR — full width                                      │
│  CATEGORY FILTER — horizontal tab row                        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ARTICLE GRID — 3 columns on desktop, 1 on mobile           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │ BlogCard │  │ BlogCard │  │ BlogCard │                   │
│  │  Image   │  │  Image   │  │  Image   │                   │
│  │ Category │  │ Category │  │ Category │                   │
│  │  Title   │  │  Title   │  │  Title   │                   │
│  │  Excerpt │  │  Excerpt │  │  Excerpt │                   │
│  │ Date|Time│  │ Date|Time│  │ Date|Time│                   │
│  └──────────┘  └──────────┘  └──────────┘                   │
│                                                              │
│  ... (more rows)                                             │
│                                                              │
│  PAGINATION: ← 1  2  3  →                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Component Design Specs

### 4.1 BlogCard Component
```
┌─────────────────────────────────┐
│  [Featured Image — 16:9 ratio]  │
│  rounded-t-xl, object-cover     │
├─────────────────────────────────┤
│  [Category Badge]  [Read time]  │
│                                 │
│  Post Title — font-semibold     │
│  text-gray-900, 2 lines max     │
│                                 │
│  Excerpt — text-gray-600        │
│  3 lines max, line-clamp        │
│                                 │
│  [Avatar] Author · Date         │
└─────────────────────────────────┘
Shadow: default → hover (elevated)
Transition: shadow 200ms ease
```

### 4.2 Category Badge
```
[Nutrition]  ← rounded-full, bg-teal-100, text-teal-800
[Cardiology] ← rounded-full, bg-blue-100, text-blue-800
[Pediatrics] ← rounded-full, bg-green-100, text-green-800
```
Each category has a distinct colour for visual scanning.

### 4.3 Medical Disclaimer Banner
```
┌──────────────────────────────────────────────────┐
│ ⚠  Medical Disclaimer                            │
│ This content is for informational purposes only. │
│ It is not a substitute for professional medical  │
│ advice, diagnosis, or treatment. Always consult  │
│ a qualified physician.                           │
└──────────────────────────────────────────────────┘
Background: #FFF3CD  Border-left: 4px solid #D97706
```

### 4.4 Ad Banner Component (Self-Promotion)
```
┌────────────────────────────────────────┐
│  [Clinic Logo]                         │
│  "Book a Consultation with Dr. [Name]" │
│  Speciality · Location                 │
│  [Book Appointment →]  CTA button      │
└────────────────────────────────────────┘
Background: gradient from Medical Blue to Trust Teal
Text: white  CTA: white button with border
```

### 4.5 Author Bio Card
```
┌──────────────────────────────────────────────────┐
│  [Avatar — 64px circle]  Dr. Full Name           │
│                           MBBS, MD — Cardiology   │
│                           Hospital / Clinic Name  │
│                                                  │
│  Short 2-sentence bio about the author's         │
│  expertise and approach.                         │
│                                                  │
│  [View all posts by Dr. Name →]                  │
└──────────────────────────────────────────────────┘
Background: #F4F6F9  Border: 1px solid #E2E8F0
```

### 4.6 Member Gate (Paid Content)
```
┌──────────────────────────────────────────────────┐
│  [Blurred content preview — first 200 words]     │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                                  │
│  🔒 Premium Content                              │
│  This article is for Premium members only.       │
│                                                  │
│  [Unlock for ₹299/mo]  [See All Plans]           │
└──────────────────────────────────────────────────┘
```

---

## 5. Navigation Design

### 5.1 Header (Desktop)
```
[Logo]   Home   Blog   Categories ▼   About   Contact   [🔍]   [Book Appointment]
```
- Logo: left-aligned
- Nav links: centre or left
- Search: icon that expands to full-width search overlay
- CTA: right-aligned, filled blue button

### 5.2 Header (Mobile)
```
[Logo]                                    [🔍]  [☰]
```
- Hamburger opens full-screen mobile menu
- "Book Appointment" moves to top of mobile menu

### 5.3 Categories Dropdown
```
Categories ▼
├── Cardiology
├── Dermatology
├── Nutrition & Diet
├── Mental Health
├── Pediatrics
├── Research
└── General Wellness
```

---

## 6. Responsive Breakpoints (Tailwind)

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile (default) | < 640px | 1 column, stacked |
| sm | 640px+ | 2 columns |
| md | 768px+ | Sidebar appears |
| lg | 1024px+ | 3-column grid |
| xl | 1280px+ | Max-width container (1200px) |

---

## 7. Accessibility Standards

- Minimum colour contrast ratio: **4.5:1** (WCAG AA)
- All images: descriptive `alt` text
- Heading hierarchy: H1 → H2 → H3 (no skipping)
- Focus rings visible on all interactive elements
- Form labels associated with inputs
- Skip-to-content link at top of page
- ARIA labels on icon-only buttons (search, social icons)

---

## 8. Ad Placement Strategy

| Placement | Component | Page(s) | Frequency |
|-----------|-----------|---------|-----------|
| Hero Banner | `AdBanner` (large) | Homepage only | Always visible |
| Sidebar Top | `SidebarWidget` | All blog posts | Always visible |
| In-Post Mid | `InPostBanner` | All blog posts | After paragraph 3 |
| Footer Strip | Static in `Footer.tsx` | Site-wide | Always visible |
| Exit Popup | Modal (optional, P2) | All pages | Once per session |

> Ads are self-promotion only (clinic/products). External ads (AdSense) not in scope for v1.

---

## 9. SEO Page Design Rules

- **H1:** One per page, contains primary keyword
- **Featured image:** Always present, minimum 1200×630px (OG image size)
- **First paragraph:** Contains primary keyword within first 100 words
- **Internal links:** Minimum 2–3 per article
- **FAQ section:** At bottom of every clinical article (targets featured snippets)
- **Breadcrumbs:** On all inner pages, styled and with JSON-LD markup

---

## 10. Dark Mode
- **v1.0:** Not in scope
- **v1.1 (future):** Implement using Tailwind `dark:` variant + `prefers-color-scheme` media query

---

*Design Document v1.0 — Medical Blog Website — UI/UX & System Design Reference*
