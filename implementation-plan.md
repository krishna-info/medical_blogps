# implementation-plan.md
## Homepage Redesign — Full Engineering Implementation Plan

**Project:** Medical Blog Website  
**Scope:** Homepage only — `app/page.tsx` + new/updated components  
**Stack:** Next.js 14 · TypeScript 5 · Tailwind CSS 3 · Framer Motion 11  
**Design tokens:** All from `design-doc.md` v1.0 — do not change any hex values  
**Timeline:** 3–4 focused development days  

---

## 1. Prerequisites Checklist

Before writing a single line of component code, verify all of these are done:

```bash
# 1. Install animation library
npm install framer-motion

# 2. Install typography plugin (for article excerpts)
npm install @tailwindcss/typography

# 3. Confirm Node.js version
node -v  # Must be 20.x (LTS)

# 4. Confirm Next.js version
npx next --version  # Must be 14.x
```

---

## 2. Configuration Changes

### 2.1 `tailwind.config.ts` — Add custom animations + tokens

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Design-doc.md Section 2.1 — exact hex values
      colors: {
        'medical-blue':  '#1B4F8C',
        'trust-teal':    '#0E7C7B',
        'soft-grey':     '#F4F6F9',
        'dark-text':     '#1A1A2E',
        'muted-text':    '#666666',
        'subtle-text':   '#999999',
        'light-blue':    '#D6E4F7',
      },
      // Design-doc.md Section 2.2 — typography scale
      fontFamily: {
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
      },
      // Custom animations — all GPU-safe (transform + opacity only)
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.06', transform: 'scale(1)' },
          '50%':      { opacity: '0.10', transform: 'scale(1.12)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'pulse-ring': {
          '0%':   { boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.45)' },
          '100%': { boxShadow: '0 0 0 16px rgba(255, 255, 255, 0)' },
        },
      },
      animation: {
        'fade-up':    'fade-up 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':    'fade-in 500ms ease forwards',
        'pulse-slow': 'pulse-slow 5s ease-in-out infinite',
        'shimmer':    'shimmer 2s linear infinite',
        'float':      'float 3s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
      },
      // Design-doc.md Section 2.5 — shadows
      boxShadow: {
        'card':       '0 2px 8px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'modal':      '0 20px 60px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
```

### 2.2 `app/layout.tsx` — Google Fonts (zero layout shift)

```typescript
import { Inter, Lora } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-lora',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans bg-white text-dark-text antialiased">
        {children}
      </body>
    </html>
  )
}
```

---

## 3. New Files to Create

```
components/
├── layout/
│   └── Navbar.tsx                    ← replaces old Header.tsx
├── home/
│   ├── HeroSection.tsx               ← new split hero
│   ├── StatsBar.tsx                  ← new stats counter row
│   ├── FeaturedArticles.tsx          ← editorial grid (replaces flat grid)
│   ├── CategoriesSection.tsx         ← icon cards (replaces pill row)
│   ├── PromoBanner.tsx               ← premium split CTA
│   ├── MoreArticles.tsx              ← secondary articles row
│   └── NewsletterSection.tsx         ← upgraded newsletter form
├── ui/
│   ├── AnimatedCounter.tsx           ← reusable count-up number
│   ├── ScrollReveal.tsx              ← reusable scroll-triggered wrapper
│   └── ShimmerButton.tsx             ← button with shimmer hover effect
lib/
└── hooks/
    ├── useScrollPosition.ts          ← for navbar scroll detection
    └── useReducedMotion.ts           ← wraps Framer Motion's hook
```

---

## 4. Component Implementation — Exact Code

### 4.1 `lib/hooks/useScrollPosition.ts`

```typescript
'use client'
import { useState, useEffect } from 'react'

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}
```

### 4.2 `components/ui/ScrollReveal.tsx`

Reusable wrapper — wraps any section and animates it in on scroll:

```typescript
'use client'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number       // ms delay
  className?: string
}

export default function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={prefersReduced ? {} : { opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
```

### 4.3 `components/ui/AnimatedCounter.tsx`

Count-up animation for stats numbers:

```typescript
'use client'
import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

interface AnimatedCounterProps {
  target: number
  suffix?: string    // e.g. '+', 'K+'
  duration?: number  // seconds
}

export default function AnimatedCounter({
  target,
  suffix = '',
  duration = 1.8,
}: AnimatedCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const prefersReduced = useReducedMotion()
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (isInView && !prefersReduced) {
      const controls = animate(count, target, { duration, ease: 'easeOut' })
      return controls.stop
    }
    if (prefersReduced) count.set(target)
  }, [isInView, count, target, duration, prefersReduced])

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
```

### 4.4 `components/layout/Navbar.tsx`

```typescript
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollPosition } from '@/lib/hooks/useScrollPosition'

const navLinks = [
  { href: '/',           label: 'Home' },
  { href: '/blog',       label: 'Blog' },
  { href: '/categories', label: 'Categories' },
  { href: '/about',      label: 'About' },
  { href: '/contact',    label: 'Contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrollY = useScrollPosition()
  const scrolled = scrollY > 60

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-md border-b border-gray-100 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <svg
                className="w-7 h-7 text-medical-blue animate-pulse-slow"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 4v4m0 8v4M4 12h4m8 0h4" />
              </svg>
              <span className="font-bold text-lg text-dark-text group-hover:text-medical-blue transition-colors">
                MediInsights
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm text-muted-text hover:text-dark-text transition-colors
                    after:absolute after:bottom-[-2px] after:left-0 after:h-[2px]
                    after:w-0 after:bg-medical-blue after:transition-[width] after:duration-200
                    hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/membership"
                className="text-sm text-muted-text hover:text-dark-text transition-colors"
              >
                Membership
              </Link>
              <Link
                href="/book-appointment"
                className="group flex items-center gap-1.5 bg-medical-blue hover:bg-trust-teal
                  text-white text-sm font-medium px-4 py-2 rounded-lg
                  transition-colors duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                Book Appointment
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-md text-muted-text hover:text-dark-text"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1.5">
                <span className={`block h-0.5 w-full bg-current transition-all duration-300
                  ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 w-full bg-current transition-all duration-300
                  ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-full bg-current transition-all duration-300
                  ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden"
          >
            {/* 3px Medical Blue accent top bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-medical-blue" />

            <nav className="flex flex-col gap-1">
              <Link
                href="/book-appointment"
                className="flex items-center justify-center bg-medical-blue text-white
                  font-medium py-3 rounded-xl mb-4 text-base"
                onClick={() => setMobileOpen(false)}
              >
                Book Appointment →
              </Link>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 text-lg text-dark-text border-b border-gray-100
                      hover:text-medical-blue transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

### 4.5 `components/home/HeroSection.tsx`

```typescript
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const HEADLINE_WORDS = ['Trusted', 'Medical', 'Insights,', 'Delivered', 'Daily']

export default function HeroSection() {
  const prefersReduced = useReducedMotion()

  const wordVariants = {
    hidden:  { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
    }),
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden
      bg-gradient-to-br from-[#EEF4FF] to-white pt-16">

      {/* Ambient background blobs — purely decorative */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full
          bg-medical-blue animate-pulse-slow will-change-transform"
          style={{ opacity: 0.06, filter: 'blur(80px)' }} />
        <div className="absolute -bottom-20 right-10 w-80 h-80 rounded-full
          bg-trust-teal animate-pulse-slow will-change-transform"
          style={{ opacity: 0.06, filter: 'blur(80px)', animationDelay: '2.5s' }} />
      </div>

      {/* Dot grid pattern */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #1B4F8C 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.04,
        }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
        grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 py-20 items-center">

        {/* LEFT: Text content */}
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-light-blue text-medical-blue
              text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-medical-blue animate-pulse" />
            Expert Medical Content
          </motion.div>

          {/* Animated headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-text
            leading-tight mb-6">
            {HEADLINE_WORDS.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="font-serif text-lg text-muted-text leading-relaxed mb-8 max-w-lg italic"
          >
            Evidence-based health articles written and reviewed by licensed physicians.
            Understand your health — clearly, accurately, and compassionately.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            {/* Primary — shimmer button */}
            <Link
              href="/blog"
              className="group relative overflow-hidden flex items-center gap-2
                bg-medical-blue hover:bg-trust-teal text-white
                font-semibold px-6 py-3 rounded-xl transition-colors duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Read Latest Articles
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              {/* Shimmer sweep */}
              <span aria-hidden="true"
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                  bg-gradient-to-r from-transparent via-white/20 to-transparent
                  transition-transform duration-700 ease-in-out" />
            </Link>

            {/* Secondary */}
            <Link
              href="/book-appointment"
              className="flex items-center gap-2 border-2 border-trust-teal text-trust-teal
                font-semibold px-6 py-3 rounded-xl hover:bg-trust-teal hover:text-white
                transition-all duration-300"
            >
              Book Appointment
            </Link>
          </motion.div>

          {/* Trust badges with counter */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 text-sm text-muted-text"
          >
            <span className="font-semibold text-dark-text">
              <AnimatedCounter target={500} suffix="+" /> Articles
            </span>
            <span className="text-gray-300">·</span>
            <span className="font-semibold text-dark-text">
              <AnimatedCounter target={10} suffix="K+" /> Readers
            </span>
            <span className="text-gray-300">·</span>
            <span className="flex items-center gap-1 font-semibold text-dark-text">
              <svg className="w-4 h-4 text-trust-teal" fill="currentColor" viewBox="0 0 20 20"
                aria-hidden="true">
                <path fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd" />
              </svg>
              Expert-Reviewed
            </span>
          </motion.div>
        </div>

        {/* RIGHT: Doctor visual */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Main image — asymmetric clip */}
          <div className="relative w-[400px] h-[480px]" style={{
            borderRadius: '60% 40% 55% 45% / 50% 45% 55% 50%',
            overflow: 'hidden',
          }}>
            <Image
              src="/images/doctor-hero.jpg"
              alt="Dr. [Name] — Medical Expert"
              fill
              className="object-cover"
              priority
              sizes="400px"
            />
          </div>

          {/* Floating card 1 — Rating */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.0, type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute -bottom-4 -left-8 flex items-center gap-3
              bg-white/92 backdrop-blur-sm shadow-card-hover rounded-2xl px-4 py-3"
          >
            <span className="text-2xl" aria-hidden="true">⭐</span>
            <div>
              <p className="text-sm font-semibold text-dark-text">4.9 Rating</p>
              <p className="text-xs text-muted-text">2,400+ patients</p>
            </div>
          </motion.div>

          {/* Floating card 2 — Daily tips */}
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.1, type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute -top-4 -right-6 flex items-center gap-3
              bg-white/92 backdrop-blur-sm shadow-card-hover rounded-2xl px-4 py-3"
          >
            <span className="text-2xl" aria-hidden="true">📋</span>
            <div>
              <p className="text-sm font-semibold text-dark-text">Daily Health Tips</p>
              <p className="text-xs text-muted-text">Published every day</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
```

### 4.6 `components/home/StatsBar.tsx`

```typescript
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ScrollReveal from '@/components/ui/ScrollReveal'

const stats = [
  { target: 500, suffix: '+', label: 'Medical Articles',     icon: '📄' },
  { target: 7,   suffix: '',  label: 'Specialities Covered', icon: '🩺' },
  { target: 10,  suffix: 'K+', label: 'Monthly Readers',     icon: '👥' },
  { target: 100, suffix: '%', label: 'Expert-Reviewed',       icon: '✓'  },
]

export default function StatsBar() {
  return (
    <section className="bg-medical-blue py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 80}>
              <div className="text-center">
                <div className="text-3xl mb-2" aria-hidden="true">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 4.7 `components/home/FeaturedArticles.tsx`

```typescript
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Replace with real posts from lib/posts.ts in production
interface Post {
  slug: string; title: string; excerpt: string; category: string
  featured_image: string; author: string; date: string; readTime: string
}

const CATEGORY_COLOURS: Record<string, string> = {
  Cardiology:    'bg-blue-100 text-blue-800',
  Nutrition:     'bg-teal-100 text-teal-800',
  'Mental Health': 'bg-purple-100 text-purple-800',
  Pediatrics:    'bg-green-100 text-green-800',
  Dermatology:   'bg-orange-100 text-orange-800',
  Research:      'bg-gray-100 text-gray-700',
  Wellness:      'bg-emerald-100 text-emerald-800',
}

function BlogCard({ post, featured = false, index = 0 }: {
  post: Post; featured?: boolean; index?: number
}) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.article
      initial={prefersReduced ? {} : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white rounded-2xl overflow-hidden shadow-card
        hover:shadow-card-hover transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <Image
          src={post.featured_image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes={featured ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 100vw, 33vw'}
        />
        {featured && (
          <span className="absolute top-3 left-3 bg-medical-blue/85 backdrop-blur-sm
            text-white text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
            ${CATEGORY_COLOURS[post.category] || 'bg-gray-100 text-gray-700'}`}>
            {post.category}
          </span>
          <span className="text-xs text-muted-text">{post.readTime}</span>
        </div>

        <h3 className={`font-bold text-dark-text mb-2 line-clamp-2 leading-snug
          ${featured ? 'text-xl font-serif' : 'text-base'}`}>
          {post.title}
        </h3>

        <p className="text-sm text-muted-text line-clamp-3 leading-relaxed flex-1 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-muted-text">{post.author} · {post.date}</span>
          <Link href={`/blog/${post.slug}`}
            className="text-xs font-semibold text-medical-blue opacity-0
              group-hover:opacity-100 transition-opacity duration-200
              flex items-center gap-1">
            Read more →
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export default function FeaturedArticles({ posts }: { posts: Post[] }) {
  const [featured, ...rest] = posts.slice(0, 3)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-dark-text">Latest Articles</h2>
          <Link href="/blog"
            className="text-sm text-trust-teal font-semibold hover:underline
              flex items-center gap-1">
            View all →
          </Link>
        </div>

        {/* Editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured — spans 2 cols */}
          <div className="lg:col-span-2">
            <BlogCard post={featured} featured index={0} />
          </div>
          {/* Right stack */}
          <div className="flex flex-col gap-6">
            {rest.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

### 4.8 `components/home/PromoBanner.tsx`

```typescript
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'

const trustPills = [
  'MBBS, MD Verified',
  'Evidence-Based',
  'Updated Daily',
]

export default function PromoBanner() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl
            bg-gradient-to-br from-medical-blue to-trust-teal p-10 lg:p-14">

            {/* Subtle dot pattern */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }} />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left content */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  Book a Consultation<br />with Our Expert Team
                </h2>
                <p className="text-white/80 text-base mb-8 max-w-md">
                  Get personalised medical guidance from verified physicians.
                  Evidence-based advice, clearly explained.
                </p>

                {/* Trust checkmarks */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {trustPills.map((pill, i) => (
                    <motion.span
                      key={pill}
                      animate={prefersReduced ? {} : {
                        y: [0, -6, 0],
                        transition: {
                          duration: 3,
                          delay: i * 0.7,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }}
                      className="text-xs font-semibold text-white bg-white/15
                        px-3 py-1.5 rounded-full"
                    >
                      ✓ {pill}
                    </motion.span>
                  ))}
                </div>

                {/* CTA with pulse ring */}
                <Link
                  href="/book-appointment"
                  className="group relative inline-flex items-center gap-2
                    bg-white text-medical-blue font-bold px-8 py-4 rounded-xl
                    hover:shadow-xl transition-shadow duration-300 animate-pulse-ring"
                >
                  Book Appointment
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                      d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Right — illustration placeholder */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-white/10 flex items-center
                  justify-center text-8xl">
                  🩺
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

### 4.9 `components/home/NewsletterSection.tsx`

```typescript
'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const prefersReduced = useReducedMotion()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-20 bg-soft-grey">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-dark-text mb-3">
            Stay Informed. Stay Healthy.
          </h2>
          <p className="text-muted-text text-base mb-8">
            Join 10,000+ readers who get trusted medical insights every week.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={prefersReduced ? {} : { opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 focus-within:shadow-lg
                  focus-within:shadow-medical-blue/10 transition-shadow rounded-xl"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 h-12 px-4 rounded-xl border border-gray-200
                    text-sm focus:outline-none focus:ring-2 focus:ring-medical-blue/30
                    bg-white"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group relative overflow-hidden h-12 px-6 bg-medical-blue
                    hover:bg-trust-teal text-white font-semibold rounded-xl
                    transition-colors duration-300 disabled:opacity-60 whitespace-nowrap"
                >
                  <span className="relative z-10">
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
                  </span>
                  <span aria-hidden="true"
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                      bg-gradient-to-r from-transparent via-white/20 to-transparent
                      transition-transform duration-700" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={prefersReduced ? {} : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-3 py-6"
              >
                {/* Draw-stroke checkmark */}
                <svg className="w-12 h-12 text-trust-teal" viewBox="0 0 48 48" fill="none"
                  stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <motion.circle cx="24" cy="24" r="20"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }} />
                  <motion.path d="M14 24l7 7 13-14"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }} />
                </svg>
                <p className="text-lg font-semibold text-dark-text">You're in!</p>
                <p className="text-sm text-muted-text">Confirmation sent to your inbox.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-4 text-xs text-subtle-text flex items-center justify-center gap-1.5">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd" />
            </svg>
            No spam. Unsubscribe anytime. GDPR compliant.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

---

## 5. Updated `app/page.tsx`

Replace the entire homepage file with this clean composition:

```typescript
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/home/HeroSection'
import StatsBar from '@/components/home/StatsBar'
import FeaturedArticles from '@/components/home/FeaturedArticles'
import CategoriesSection from '@/components/home/CategoriesSection'
import PromoBanner from '@/components/home/PromoBanner'
import MoreArticles from '@/components/home/MoreArticles'
import NewsletterSection from '@/components/home/NewsletterSection'
import Footer from '@/components/layout/Footer'
import { getAllPosts } from '@/lib/posts'

export default async function HomePage() {
  const allPosts = await getAllPosts()
  const featuredPosts = allPosts.slice(0, 3)
  const morePosts = allPosts.slice(3, 9)

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <FeaturedArticles posts={featuredPosts} />
        <CategoriesSection />
        <PromoBanner />
        <MoreArticles posts={morePosts} />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  )
}
```

---

## 6. Animation Rules — Non-Negotiable

| Rule | Reason |
|------|--------|
| Use `transform` + `opacity` only | GPU-accelerated — no layout reflow, no jank |
| Always add `will-change: transform` on animated blobs | Promotes to GPU layer before animation starts |
| Always wrap with `useReducedMotion()` | Accessibility — users who request reduced motion get no animation |
| `useInView` with `once: true` | Never re-animate on scroll-up — prevents visual noise |
| Stagger max 6–8 items | Beyond 8, last items feel too delayed — splits sections instead |
| Spring for floating cards | `type: "spring"` feels physical; easing feels digital |
| Expo ease-out for reveals | `[0.16, 1, 0.3, 1]` — fast start, smooth stop — premium feel |

---

## 7. Performance Checklist

- [ ] Hero image: `priority` prop on `<Image>` — preloads immediately
- [ ] All images: explicit `width` + `height` or `fill` with sized parent — no CLS
- [ ] Ambient blobs: `filter: blur(80px)` + `will-change: transform` — GPU layer
- [ ] Framer Motion: imported per-component (tree-shaken) — not imported in root layout
- [ ] `useReducedMotion()` used in every animated component
- [ ] Navbar scroll listener: `{ passive: true }` — never blocks scroll thread
- [ ] Fonts: `next/font/google` with `display: swap` — zero FOIT
- [ ] Run after build: `npx lighthouse https://localhost:3000 --view` — target 90+

---

## 8. Day-by-Day Build Schedule

| Day | Work |
|-----|------|
| Day 1 AM | Phase A (setup) + Phase B (Navbar) + Phase C (Hero) |
| Day 1 PM | Phase D (Stats bar) + Phase E (Featured articles) |
| Day 2 AM | Phase F (Categories) + Phase G (Promo banner) |
| Day 2 PM | Phase H (More articles) + Phase I (Newsletter) |
| Day 3 AM | Phase J (Footer) + `app/page.tsx` composition |
| Day 3 PM | Phase K — Lighthouse audit, accessibility, mobile QA, fixes |

---

## 9. Definition of Done

The homepage redesign is complete when ALL of the following are true:

- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse Accessibility: 95+
- [ ] Lighthouse SEO: 90+
- [ ] Core Web Vitals: all green (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- [ ] Zero horizontal overflow on 375px, 768px, 1024px, 1280px
- [ ] All animations respect `prefers-reduced-motion`
- [ ] All colour tokens match `design-doc.md` exactly
- [ ] Mobile menu opens, closes, and traps focus correctly
- [ ] Newsletter success animation plays correctly
- [ ] Counter animations trigger on scroll (not on page load)
- [ ] No TypeScript errors (`npx tsc --noEmit` passes)
- [ ] No ESLint errors (`npx next lint` passes)

---

*implementation-plan.md v1.0 — Homepage Redesign — Medical Blog Website*
