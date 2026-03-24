# Tech Stack Document
## Medical Blog Website

**Version:** 1.0  
**Date:** March 2026  
**Total Infrastructure Cost:** ₹0 (domain only)  

---

## 1. Stack Overview

```
┌─────────────────────────────────────────────────────────┐
│                    TECH STACK LAYERS                    │
├─────────────────────────────────────────────────────────┤
│  FRONTEND          Next.js 14 + TypeScript + Tailwind   │
│  CMS               Decap CMS (Git-based visual editor)  │
│  CONTENT STORE     GitHub Repository (Markdown files)   │
│  HOSTING           Vercel (Edge CDN, auto-deploy)       │
│  SEARCH            Pagefind (static, in-browser)        │
│  COMMENTS          Giscus (GitHub Discussions)          │
│  EMAIL             Brevo (300 emails/day free)          │
│  IMAGES            Cloudinary (25GB free)               │
│  ANALYTICS         Google Analytics 4                   │
│  PAYMENTS          Razorpay (% per transaction)         │
│  AUTH (admin)      GitHub OAuth via Decap               │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Core Framework

### 2.1 Next.js 14 (App Router)
| Property | Value |
|----------|-------|
| **Version** | 14.x (latest stable) |
| **Router** | App Router (not Pages Router) |
| **Rendering** | Static Site Generation (SSG) + Incremental Static Regeneration (ISR) |
| **Why chosen** | Best-in-class SEO, React ecosystem, free on Vercel, TypeScript-native |
| **Cost** | Free / Open Source |
| **Docs** | https://nextjs.org/docs |

**Key Next.js features used:**
- `generateStaticParams()` — pre-builds all blog post and category pages at build time
- `generateMetadata()` — per-page SEO meta tags (title, description, OG, canonical)
- `next/image` — automatic image optimisation, WebP conversion, lazy loading
- `ImageResponse` — auto-generates Open Graph images at build time
- `middleware.ts` — intercepts requests for member-only content gating
- **ISR** — individual posts can revalidate without full rebuild

---

### 2.2 TypeScript 5.x
| Property | Value |
|----------|-------|
| **Why chosen** | Type safety across 2–5 author team; prevents runtime errors |
| **Strict mode** | Enabled (`"strict": true` in tsconfig) |
| **Cost** | Free / Open Source |

**Key typed interfaces:**
```typescript
interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  featured_image: string;
  content_type: 'article' | 'case_study' | 'news' | 'video';
  affiliate_disclosure: boolean;
  member_only: boolean;
  seo_title?: string;
  seo_description?: string;
  body: string;
}

interface Author {
  name: string;
  slug: string;
  credentials: string;
  bio: string;
  avatar: string;
  speciality: string;
}
```

---

### 2.3 Tailwind CSS 3.x
| Property | Value |
|----------|-------|
| **Why chosen** | Utility-first, no CSS files to maintain, responsive by default, pairs perfectly with Next.js |
| **Configuration** | Custom theme with medical brand colours and typography scale |
| **Cost** | Free / Open Source |

**Custom theme additions in `tailwind.config.ts`:**
```typescript
theme: {
  extend: {
    colors: {
      medical: {
        blue: '#1B4F8C',
        teal: '#0E7C7B',
        light: '#D6E4F7',
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Lora', 'Georgia', 'serif'], // For article body
    }
  }
}
```

---

## 3. Content Management

### 3.1 Decap CMS
| Property | Value |
|----------|-------|
| **Formerly known as** | Netlify CMS |
| **Version** | Latest (loaded via CDN in `/public/admin/index.html`) |
| **Type** | Git-based headless CMS |
| **Editor** | Rich visual editor (WYSIWYG — no Markdown knowledge needed) |
| **Auth** | GitHub OAuth (only collaborators can access) |
| **Entry point** | `yourdomain.com/admin` |
| **Cost** | Free / Open Source |
| **Docs** | https://decapcms.org/docs |

**Why Decap over alternatives:**
| CMS | Cost | Visual Editor | Git-based | Auth |
|-----|------|--------------|-----------|------|
| **Decap CMS** | **Free** | **Yes** | **Yes** | **GitHub OAuth** |
| Contentful | Free tier limited | Yes | No (API) | Own auth |
| Sanity | Free tier limited | Yes | No (API) | Own auth |
| WordPress | Server required | Yes | No | Own auth |
| Forestry/Tina | Paid | Yes | Yes | Paid |

---

### 3.2 GitHub (Content Storage)
| Property | Value |
|----------|-------|
| **Role** | Source of truth for all code AND content (Markdown files) |
| **Content location** | `/content/posts/*.md` |
| **Branching** | `main` = production; feature branches for drafts |
| **Cost** | Free (unlimited public + private repos) |

**Content workflow:**
```
Author writes in Decap CMS
    → Decap commits .md file to GitHub main
    → Vercel detects commit
    → Auto-deploys in ~60 seconds
    → Post is live
```

---

## 4. Hosting & Infrastructure

### 4.1 Vercel
| Property | Value |
|----------|-------|
| **Plan** | Hobby (Free) |
| **Bandwidth** | 100 GB/month |
| **Deployments** | Unlimited |
| **SSL** | Auto (Let's Encrypt, free) |
| **CDN** | Vercel Edge Network — global |
| **Preview URLs** | Every PR gets a unique preview URL |
| **Build time** | ~60–90 seconds |
| **Cost** | Free |
| **Docs** | https://vercel.com/docs |

**Free tier limits to monitor:**
- 100GB bandwidth/month — upgrade to Cloudflare Pages (free, unlimited) if exceeded
- 100 serverless function invocations/day — sufficient for newsletter + membership APIs

---

## 5. Features Stack

### 5.1 Search — Pagefind
| Property | Value |
|----------|-------|
| **Type** | Static search (runs in browser, no server) |
| **How it works** | Crawls the built `/out` directory at build time → generates a search index → served as static files |
| **Integration** | `postbuild` npm script: `npx pagefind --site out` |
| **Supports** | Full-text search, category filters, tag filters |
| **Cost** | Free / Open Source |
| **Docs** | https://pagefind.app |

**Why Pagefind over alternatives:**
| Option | Cost | Server needed | Setup |
|--------|------|--------------|-------|
| **Pagefind** | **Free** | **No** | **Easy** |
| Algolia | Free tier (10k searches) | No | Medium |
| Elasticsearch | Paid server | Yes | Complex |
| Fuse.js | Free | No | Easy, but no filtering |

---

### 5.2 Comments — Giscus
| Property | Value |
|----------|-------|
| **Powered by** | GitHub Discussions |
| **Auth** | Readers sign in with GitHub to comment |
| **Spam** | GitHub's built-in spam protection |
| **Database** | None — stored in GitHub Discussions |
| **Cost** | Free |
| **Docs** | https://giscus.app |

**Setup steps:**
1. Create public GitHub repo (or use the blog repo)
2. Enable Discussions in repo settings
3. Install Giscus GitHub app
4. Get config snippet from giscus.app
5. Embed `<GiscusComments />` component in blog post template

---

### 5.3 Newsletter — Brevo (formerly Sendinblue)
| Property | Value |
|----------|-------|
| **Free tier** | 300 emails/day, unlimited contacts |
| **Integration** | REST API from Next.js API route (`/api/newsletter`) |
| **Form** | Custom React form → POST to `/api/newsletter` → Brevo API |
| **Cost** | Free (up to 300/day) |
| **Docs** | https://developers.brevo.com |

---

### 5.4 Analytics — Google Analytics 4
| Property | Value |
|----------|-------|
| **Type** | Web analytics |
| **Integration** | Script tag in `app/layout.tsx` |
| **Data** | Page views, sessions, traffic sources, device breakdown |
| **Cost** | Free |
| **Docs** | https://developers.google.com/analytics |

---

### 5.5 Image CDN — Cloudinary
| Property | Value |
|----------|-------|
| **Free tier** | 25GB storage + 25GB bandwidth/month + transformations |
| **Integration** | Decap CMS media library → Cloudinary upload |
| **Features used** | Auto-format (WebP/AVIF), auto-quality, responsive sizing |
| **Cost** | Free |
| **Docs** | https://cloudinary.com/documentation |

---

### 5.6 Video — YouTube Embeds
| Property | Value |
|----------|-------|
| **Type** | `<iframe>` embed |
| **Storage** | YouTube (free, unlimited) |
| **Loading** | Lazy-loaded iframe with `loading="lazy"` attribute |
| **Cost** | Free |

---

## 6. Monetisation Stack

### 6.1 Payments — Razorpay
| Property | Value |
|----------|-------|
| **Setup cost** | Free |
| **Transaction fee** | 2% per transaction (standard) |
| **Use case** | Paid membership subscriptions |
| **Integration** | Razorpay JS SDK on frontend + Next.js API route for order creation |
| **Webhook** | `/api/membership/webhook` — verifies payment + issues JWT |
| **Docs** | https://razorpay.com/docs |

---

### 6.2 Member Auth — JWT
| Property | Value |
|----------|-------|
| **Library** | `jose` (lightweight JWT library for Edge runtime) |
| **Storage** | HTTP-only cookie |
| **Payload** | `{ email, tier, expiresAt, razorpaySubscriptionId }` |
| **Gating** | `middleware.ts` checks JWT on `member_only: true` posts |
| **Cost** | Free / Open Source |

---

### 6.3 Appointment Booking — Calendly
| Property | Value |
|----------|-------|
| **Plan** | Free (1 event type) |
| **Integration** | Embed link as button across the site |
| **Cost** | Free |

---

## 7. SEO Stack

### 7.1 On-Site SEO Tools
| Tool | Purpose | Cost |
|------|---------|------|
| Next.js Metadata API | Per-page title, description, OG, canonical | Free (built-in) |
| next-sitemap | Auto-generates `sitemap.xml` on every build | Free |
| JSON-LD (custom) | Structured data — Article, MedicalWebPage, Person schemas | Free |
| Next.js `ImageResponse` | Auto-generates OG images | Free (built-in) |

### 7.2 Off-Site SEO Tools
| Tool | Purpose | Cost |
|------|---------|------|
| Google Search Console | Submit sitemap, monitor rankings, fix crawl errors | Free |
| Google Analytics 4 | Traffic, audience, behaviour data | Free |
| PageSpeed Insights | Core Web Vitals testing | Free |

---

## 8. Development Tools

| Tool | Purpose | Cost |
|------|---------|------|
| VS Code | Code editor | Free |
| Git | Version control | Free |
| GitHub | Remote repository | Free |
| Node.js 20 LTS | JavaScript runtime | Free |
| npm | Package manager | Free |
| ESLint | Code linting | Free |
| Prettier | Code formatting | Free |

---

## 9. Full Dependencies List

### 9.1 Production Dependencies (`dependencies`)
```json
{
  "next": "^14.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "typescript": "^5.x",
  "gray-matter": "^4.x",        // Parse Markdown frontmatter
  "next-mdx-remote": "^4.x",   // Render MDX content
  "remark": "^15.x",            // Markdown processing
  "remark-html": "^16.x",       // Markdown to HTML
  "jose": "^5.x",               // JWT for membership auth
  "razorpay": "^2.x"            // Razorpay Node SDK
}
```

### 9.2 Development Dependencies (`devDependencies`)
```json
{
  "tailwindcss": "^3.x",
  "autoprefixer": "^10.x",
  "postcss": "^8.x",
  "@types/node": "^20.x",
  "@types/react": "^18.x",
  "eslint": "^8.x",
  "eslint-config-next": "^14.x",
  "prettier": "^3.x",
  "next-sitemap": "^4.x",       // Sitemap generation
  "pagefind": "^1.x"            // Static search index
}
```

---

## 10. Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "postbuild": "next-sitemap && pagefind --site out",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 11. Cost Summary

| Service | Free Tier | Paid Upgrade Trigger |
|---------|-----------|---------------------|
| Vercel | 100GB/mo bandwidth | > 100GB → Cloudflare Pages (still free) |
| GitHub | Unlimited repos | Never (stays free) |
| Decap CMS | Unlimited | Never (stays free) |
| Pagefind | Unlimited | Never (stays free) |
| Giscus | Unlimited | Never (stays free) |
| Brevo | 300 emails/day | > 300/day → paid plan |
| Cloudinary | 25GB storage | > 25GB → paid plan |
| Google Analytics | Unlimited | Never (stays free) |
| Razorpay | Free setup | 2% per transaction (ongoing) |
| Calendly | 1 event type | Multiple events → paid |
| **Total (infra)** | **₹0** | **Domain only** |

---

## 12. Scalability Upgrade Path

| Scenario | Current Tool | Upgrade To | New Cost |
|---------|-------------|------------|---------|
| Bandwidth > 100GB | Vercel Free | Cloudflare Pages | Free (unlimited) |
| Emails > 300/day | Brevo Free | Brevo Starter | $25/mo |
| Images > 25GB | Cloudinary Free | Cloudinary Plus | $89/mo |
| Need database | None (Git-based) | Supabase or PlanetScale | Free tier available |
| Video hosting | YouTube embeds | Cloudflare Stream | $5/mo per 1,000 min |
| More team features | Vercel Free | Vercel Pro | $20/mo |

---

*Tech Stack Document v1.0 — Medical Blog Website — ₹0 infrastructure cost*
