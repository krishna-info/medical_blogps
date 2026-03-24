# Technical Requirements Document (TRD)
## Medical Blog Website

**Version:** 1.0  
**Date:** March 2026  
**Status:** Ready for Engineering  
**Prepared For:** Development Team  

---

## 1. System Overview

### 1.1 Architecture Type
**Jamstack / Static Site Generation (SSG) with Incremental Static Regeneration (ISR)**

The system is fully Git-based. All content lives in the GitHub repository as Markdown files. There is no traditional backend server or relational database in v1.

### 1.2 Architecture Flow

```
Author → Decap CMS (Visual Editor)
           ↓
       GitHub Repository (Markdown commit)
           ↓
       Vercel CI/CD (auto-triggered on push)
           ↓
       Next.js Build (SSG + ISR)
           ↓
       Vercel Edge CDN (global distribution)
           ↓
       Reader (sub-second page load)
```

### 1.3 Supporting Services Flow
```
Search:    Reader query → Pagefind (in-browser index) → Results (zero server)
Comments:  Reader comment → Giscus → GitHub Discussions → Rendered on page
Newsletter: Reader signup → Brevo API → Email list (300/day free)
Images:    Author upload → Cloudinary → Optimised CDN URL in Markdown
Analytics: Page view → Google Analytics 4 → Dashboard
```

---

## 2. Technology Stack

### 2.1 Core Stack
| Layer | Technology | Version | Justification |
|-------|-----------|---------|--------------|
| Framework | Next.js (App Router) | 14.x | SSG + ISR, best SEO support, React ecosystem |
| Language | TypeScript | 5.x | Type safety for team of 2–5 contributors |
| Styling | Tailwind CSS | 3.x | Utility-first, rapid development, responsive |
| Runtime | Node.js | 20 LTS | Required by Next.js 14 |
| Package Manager | npm | 10.x | Standard, no additional tooling needed |

### 2.2 Content & CMS
| Component | Technology | Justification |
|-----------|-----------|--------------|
| CMS | Decap CMS (fka Netlify CMS) | 100% free, visual editor, Git-based, no DB |
| Content Storage | GitHub Repository (Markdown) | Free, version-controlled, no DB server |
| Content Format | MDX / Markdown with YAML frontmatter | Standard, portable, editor-friendly |
| Image Storage | Cloudinary Free Tier | 25GB free, auto-optimisation, CDN |
| Video | YouTube embed (iframe) | Free, zero hosting cost |

### 2.3 Infrastructure
| Component | Technology | Free Tier Limits |
|-----------|-----------|-----------------|
| Hosting | Vercel | 100GB bandwidth/mo, unlimited deployments |
| Source Control | GitHub | Unlimited public repos, unlimited private |
| SSL | Vercel (auto) | Free, auto-renewing Let's Encrypt |
| CDN | Vercel Edge Network | Global, included in free tier |

### 2.4 Features — Third-Party Services
| Feature | Service | Free Limit |
|---------|---------|-----------|
| Search | Pagefind | Fully open-source, no limits |
| Comments | Giscus (GitHub Discussions) | Free, no limits |
| Newsletter | Brevo (Sendinblue) | 300 emails/day, unlimited contacts |
| Analytics | Google Analytics 4 | Free |
| SEO Monitoring | Google Search Console | Free |
| Appointments | Calendly | 1 event type free |

### 2.5 Monetisation Services
| Feature | Service | Cost Model |
|---------|---------|-----------|
| Payments | Razorpay | Free setup; 2% per transaction |
| Member CRM | Brevo | Free (already listed above) |
| Auth (admin) | GitHub OAuth via Decap | Free |

---

## 3. Project Structure

```
medical-blog/
├── app/
│   ├── layout.tsx              # Root layout — global SEO meta, fonts, GA4 script
│   ├── page.tsx                # Homepage — hero, latest posts, CTA banner
│   ├── blog/
│   │   ├── page.tsx            # Blog listing — paginated post grid
│   │   └── [slug]/
│   │       └── page.tsx        # Individual post — content, comments, related
│   ├── category/
│   │   └── [cat]/
│   │       └── page.tsx        # Category page — filtered post listing
│   ├── tags/
│   │   └── [tag]/
│   │       └── page.tsx        # Tag page — cross-category listing
│   ├── membership/
│   │   └── page.tsx            # Membership plans + Razorpay integration
│   ├── products/
│   │   └── page.tsx            # Clinic products / services showcase
│   └── api/
│       ├── newsletter/
│       │   └── route.ts        # POST /api/newsletter — Brevo signup
│       └── membership/
│           └── route.ts        # POST /api/membership — Razorpay order creation
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Nav: Home, Blog, Categories, About, Contact
│   │   └── Footer.tsx          # Links, disclaimer, newsletter form
│   ├── blog/
│   │   ├── BlogCard.tsx        # Post card for listing pages
│   │   ├── BlogPost.tsx        # Full post renderer with MDX support
│   │   ├── AuthorBio.tsx       # Author credentials block
│   │   ├── RelatedPosts.tsx    # 3 related posts by category/tag
│   │   └── Disclaimer.tsx      # Medical disclaimer banner
│   ├── features/
│   │   ├── SearchBar.tsx       # Pagefind UI integration
│   │   ├── GiscusComments.tsx  # Giscus embed component
│   │   ├── NewsletterForm.tsx  # Brevo signup form
│   │   └── AppointmentButton.tsx # Calendly CTA button
│   ├── ads/
│   │   ├── AdBanner.tsx        # Reusable ad banner component
│   │   ├── SidebarWidget.tsx   # Post sidebar ad
│   │   └── InPostBanner.tsx    # Mid-content promotional block
│   └── ui/
│       ├── AffiliateLink.tsx   # Link with rel="nofollow sponsored"
│       ├── MemberGate.tsx      # Wrapper that hides content for non-members
│       └── CategoryBadge.tsx   # Coloured category pill
│
├── content/
│   ├── posts/                  # All blog posts as Markdown files
│   │   └── YYYY-MM-DD-slug.md
│   └── authors/                # Author profile Markdown files
│       └── dr-name.md
│
├── lib/
│   ├── posts.ts                # getAllPosts(), getPostBySlug(), getPostsByCategory()
│   ├── authors.ts              # getAuthorBySlug()
│   ├── seo.ts                  # generateMetadata() helpers, JSON-LD builders
│   └── membership.ts           # JWT verification, session helpers
│
├── public/
│   ├── admin/
│   │   ├── index.html          # Decap CMS entry point
│   │   └── config.yml          # CMS schema configuration
│   ├── robots.txt              # Allow all, disallow /admin/
│   └── images/                 # Static images (logo, OG default)
│
├── middleware.ts               # Member-only content gating (JWT check)
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind theme customisation
├── tsconfig.json
└── package.json
```

---

## 4. Data Models

### 4.1 Post Frontmatter Schema (YAML)
```yaml
---
title: string                   # Post headline (required)
slug: string                    # URL slug — auto-generated from title (required)
date: datetime                  # ISO 8601 publish date (required)
author: string                  # Relation to authors/*.md slug (required)
category: string                # Single category from predefined list (required)
tags: string[]                  # Array of tag strings (optional)
excerpt: string                 # 150–200 char summary (required)
featured_image: string          # Cloudinary URL (required)
content_type: enum              # article | case_study | news | video (required)
affiliate_disclosure: boolean   # Shows disclosure label (default: false)
member_only: boolean            # Gates content for paid members (default: false)
seo_title: string               # Overrides title for <title> tag (optional)
seo_description: string         # Overrides excerpt for meta description (optional)
---
```

### 4.2 Author Profile Schema (YAML)
```yaml
---
name: string                    # Full name
slug: string                    # URL slug
credentials: string             # e.g., MBBS, MD — Cardiology
bio: string                     # Short 2–3 sentence bio
avatar: string                  # Cloudinary URL
speciality: string              # Medical speciality
---
```

### 4.3 Membership Session (JWT Payload)
```typescript
interface MemberSession {
  email: string;
  tier: 'free' | 'basic' | 'premium';
  expiresAt: number;             // Unix timestamp
  razorpaySubscriptionId: string;
}
```

---

## 5. API Endpoints

### 5.1 Newsletter Signup
```
POST /api/newsletter
Content-Type: application/json

Request:  { email: string, name?: string }
Response: { success: boolean, message: string }

Action:   Adds contact to Brevo list via Brevo REST API
```

### 5.2 Membership Order
```
POST /api/membership
Content-Type: application/json

Request:  { tier: 'basic' | 'premium', email: string }
Response: { orderId: string, amount: number, currency: 'INR' }

Action:   Creates Razorpay order; client completes payment on frontend
```

### 5.3 Membership Webhook (Razorpay)
```
POST /api/membership/webhook
Header:   x-razorpay-signature: string

Action:   Verifies signature; issues JWT; stores member in Brevo CRM
```

---

## 6. CMS Configuration (Decap)

### 6.1 Authentication
- **Type:** GitHub OAuth
- **Scope:** Only team members with GitHub repo collaborator access can log in
- **Entry point:** `yourdomain.com/admin`
- **Flow:** Author → GitHub OAuth → Decap editor → Commit Markdown → Vercel deploys

### 6.2 config.yml Key Settings
```yaml
backend:
  name: github
  repo: your-org/medical-blog
  branch: main

media_folder: public/images
public_folder: /images
media_library:
  name: cloudinary
  config:
    cloud_name: YOUR_CLOUD_NAME
    api_key: YOUR_API_KEY

collections:
  - name: posts
    label: Blog Posts
    folder: content/posts
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { name: title, widget: string }
      - { name: date, widget: datetime }
      - { name: author, widget: relation, collection: authors, search_fields: [name], value_field: slug }
      - { name: category, widget: select, options: [Cardiology, Dermatology, Nutrition, Mental Health, Pediatrics, Research, Wellness] }
      - { name: tags, widget: list }
      - { name: excerpt, widget: text }
      - { name: featured_image, widget: image }
      - { name: content_type, widget: select, options: [article, case_study, news, video] }
      - { name: affiliate_disclosure, widget: boolean, default: false }
      - { name: member_only, widget: boolean, default: false }
      - { name: seo_title, widget: string, required: false }
      - { name: seo_description, widget: text, required: false }
      - { name: body, widget: markdown }
```

---

## 7. SEO Technical Implementation

### 7.1 Metadata API (per page)
```typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featured_image],
      type: 'article',
    },
    alternates: { canonical: `https://yourdomain.com/blog/${params.slug}` },
  };
}
```

### 7.2 JSON-LD Schemas Required
- `Article` — on every blog post page
- `MedicalWebPage` — on clinical/health content pages
- `Person` — on author bio sections
- `Organization` — on homepage and About page
- `BreadcrumbList` — on all inner pages

### 7.3 Sitemap Generation
```javascript
// next.config.js postbuild via next-sitemap
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://yourdomain.com',
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/*', '/api/*'],
  robotsTxtOptions: {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] }],
  },
};
```

---

## 8. Search Implementation (Pagefind)

```json
// package.json
{
  "scripts": {
    "build": "next build",
    "postbuild": "pagefind --site out"
  }
}
```

- Pagefind crawls the built `/out` directory and generates a static search index
- The search UI is loaded client-side only — zero server calls
- Supports filtering by category/tag using Pagefind filter attributes

---

## 9. Content Gating (Membership Middleware)

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/membership';

export async function middleware(request: NextRequest) {
  // Only run on member-only post pages
  const post = await getPostMeta(request.nextUrl.pathname);
  if (!post?.member_only) return NextResponse.next();

  const token = request.cookies.get('member_token')?.value;
  if (!token || !(await verifyJWT(token))) {
    return NextResponse.redirect(new URL('/membership', request.url));
  }
  return NextResponse.next();
}
```

---

## 10. Performance Requirements

| Metric | Target | Implementation |
|--------|--------|---------------|
| LCP (Largest Contentful Paint) | < 2.5s | Next.js Image + Cloudinary CDN |
| FID / INP | < 200ms | Minimal JS, static rendering |
| CLS | < 0.1 | Reserve space for images (width/height attributes) |
| TTFB | < 600ms | Vercel Edge CDN |
| Lighthouse Performance | 90+ | SSG, image optimisation, lazy loading |
| Lighthouse SEO | 90+ | Metadata API, structured data, sitemap |

---

## 11. Environment Variables

```env
# GitHub OAuth (Decap CMS)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Cloudinary (Image CDN)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Brevo (Newsletter / CRM)
BREVO_API_KEY=

# Razorpay (Payments)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Membership JWT
JWT_SECRET=

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Site URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## 12. Deployment Pipeline

```
Developer pushes code  →  GitHub main branch
                            ↓
                     Vercel detects push
                            ↓
                     npm run build
                     (Next.js build + Pagefind index)
                            ↓
                     Auto-deploy to Vercel Edge CDN
                            ↓
                     Site live at yourdomain.com (~60s)
```

- **Preview deployments:** Every PR gets a unique Vercel preview URL
- **Rollback:** Instant rollback to any previous deployment via Vercel dashboard
- **Environment:** Production (main branch) + Preview (feature branches)

---

## 13. Scalability Path

| Trigger | Action | Cost |
|---------|--------|------|
| Bandwidth > 100GB/mo | Migrate to Cloudflare Pages | Free (unlimited bandwidth) |
| Need database | Add Supabase or PlanetScale free tier | Free tier available |
| More authors + workflow | Enable Decap editorial workflow | Free |
| Video hosting | Migrate to Cloudflare Stream | $5/mo per 1,000 min |
| Traffic spikes | Vercel Pro | $20/mo |

---

*TRD v1.0 — Medical Blog Website — Engineering reference document*
