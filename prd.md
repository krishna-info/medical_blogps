# Product Requirements Document (PRD)
## Medical Blog Website

**Version:** 1.0  
**Date:** March 2026  
**Status:** Ready for Development  
**Go-Live Target:** Within 1 Week  

---

## 1. Product Overview

### 1.1 Purpose
A medical blog website built for zero infrastructure cost (domain cost only) to serve as a personal doctor/clinic branding platform, health news & research update hub, and patient awareness & wellness tips resource.

### 1.2 Vision Statement
To build a trustworthy, SEO-optimised, daily-publishing medical blog that serves patients, caregivers, and healthcare professionals — powered entirely by free-tier tools, with a path to monetisation through affiliate links and paid memberships.

---

## 2. Stakeholders & Users

### 2.1 Internal Users (Authors/Admin)
| Role | Count | Access Level |
|------|-------|-------------|
| Admin / Lead Author | 1 | Full CMS + GitHub access |
| Contributors / Authors | 2–4 | CMS access (write & publish) |

### 2.2 Target Audience (Readers)
| Segment | Description |
|---------|-------------|
| General public / patients | Primary audience; seeking health information |
| Caregivers & families | Supporting loved ones; need practical guidance |
| Medical professionals | Secondary audience; peer content & research updates |

---

## 3. Goals & Success Metrics

### 3.1 Primary Goals
- Establish clinic/doctor brand authority online within 30 days of launch
- Publish at least 1 high-quality article daily
- Rank on Google for at least 10 medical keywords within 90 days
- Generate first affiliate revenue within 60 days of launch

### 3.2 Key Performance Indicators (KPIs)
| Metric | Target (90 days) |
|--------|-----------------|
| Monthly organic traffic | 5,000+ sessions |
| Domain Authority | 10+ |
| Articles published | 90+ |
| Newsletter subscribers | 500+ |
| Paid members | 50+ |
| Google Lighthouse score | 90+ across all categories |

---

## 4. Content Strategy

### 4.1 Content Types
- **Long-form articles** — Minimum 1,500 words; primary SEO vehicle
- **Case studies** — Real or anonymised patient scenarios; builds credibility
- **News & research summaries** — Digests of recent medical research
- **Videos & infographics** — Embedded YouTube videos; visual content for social sharing

### 4.2 Content Categories
- Cardiology
- Dermatology
- Nutrition & Diet
- Mental Health
- Pediatrics
- Medical Research
- General Wellness

### 4.3 Publishing Frequency
- **Daily** — minimum 1 post per day
- CMS must support fast, friction-free publishing workflow for non-technical authors

### 4.4 Content Language
- English only (initial launch)

---

## 5. Feature Requirements

### 5.1 Must-Have Features (P0)

#### 5.1.1 Blog & Content
- [ ] Homepage with featured/latest posts grid
- [ ] Individual blog post pages with full content rendering
- [ ] Blog listing page with pagination
- [ ] Category pages — browse by medical topic
- [ ] Tags — cross-category content discovery
- [ ] Author profile with credentials displayed on each post
- [ ] "Medically Reviewed by" label on clinical posts
- [ ] Medical disclaimer on every post

#### 5.1.2 Search
- [ ] Full-text search across all posts
- [ ] Filter by category/tag
- [ ] Works without any backend or paid service (static search)

#### 5.1.3 Comments
- [ ] Per-post comment section
- [ ] Spam protection built in
- [ ] No database or paid service required

#### 5.1.4 CMS / Publishing
- [ ] Visual (WYSIWYG) editor — no Markdown knowledge required for authors
- [ ] Author login via GitHub OAuth (admin/authors only — readers do NOT register)
- [ ] Image upload support within the editor
- [ ] Draft → Review → Publish workflow
- [ ] Fields: title, slug, date, author, category, tags, excerpt, featured image, content type, body, affiliate disclosure toggle, member-only toggle, SEO title, SEO description

#### 5.1.5 Self-Promotion & Ads
- [ ] Hero banner on homepage (clinic introduction + appointment CTA)
- [ ] Sidebar ad widget on all blog post pages
- [ ] In-post banner (after 3rd paragraph) — contextual promotion
- [ ] Site-wide footer strip (contact / booking link)
- [ ] Optional exit-intent popup (newsletter + offer combo)

### 5.2 Should-Have Features (P1)

#### 5.2.1 Newsletter
- [ ] Email subscription form embedded across the site
- [ ] Integration with free email service (300 emails/day free)

#### 5.2.2 Monetisation
- [ ] Affiliate link component with proper SEO attributes (`rel="nofollow sponsored"`)
- [ ] Affiliate disclosure label on relevant posts
- [ ] Member-only content gating (premium posts)
- [ ] Payment integration for membership subscriptions

#### 5.2.3 Appointment Booking
- [ ] "Book Appointment" CTA button across the site
- [ ] Integration with free scheduling tool

### 5.3 Nice-to-Have Features (P2)
- [ ] Related posts section at the bottom of each article
- [ ] Social share buttons
- [ ] Reading time estimate on posts
- [ ] Exit-intent popup
- [ ] Products showcase page for clinic merchandise/supplements

---

## 6. Non-Functional Requirements

### 6.1 Performance
- Page load time: < 2 seconds on 4G mobile
- Google Lighthouse Performance score: 90+
- Core Web Vitals: all green

### 6.2 Cost
- Infrastructure cost: ₹0 (zero)
- Only paid item: custom domain name

### 6.3 Accessibility
- Semantic HTML structure
- Alt text on all images
- Keyboard navigable

### 6.4 SEO
- Unique meta title and description per page
- Auto-generated sitemap (sitemap.xml)
- robots.txt configured
- JSON-LD structured data (Article, MedicalWebPage, Person schemas)
- Open Graph meta tags for social sharing
- Canonical URLs to prevent duplicate content

### 6.5 Legal & Compliance
- Medical disclaimer on every post
- Privacy Policy page (required for analytics & data collection)
- Cookie Consent banner
- Affiliate disclosure on relevant posts
- Compliance with India's Telemedicine Practice Guidelines (if consultation features are added)
- No specific diagnosis or treatment plans in content

### 6.6 Security
- HTTPS enforced (SSL via Vercel — free)
- Admin panel secured behind GitHub OAuth
- No reader authentication or PII storage in initial version

---

## 7. Monetisation Requirements

### 7.1 Affiliate Marketing
- Custom `<AffiliateLink>` component with SEO-compliant attributes
- Affiliate programs to integrate: Amazon Associates, Pharmeasy, 1mg, health supplement brands
- Disclosure label auto-shown when `affiliate_disclosure: true` in CMS

### 7.2 Paid Memberships
| Tier | Price | Benefits |
|------|-------|---------|
| Free | ₹0/mo | Access to all public posts, with ads |
| Basic | ₹99/mo | No ads, all public posts |
| Premium | ₹299/mo | Exclusive content, Q&A access |

- Payment gateway: Razorpay (free to set up, % fee per transaction only)
- Content gating via Next.js middleware (JWT/session check)
- Member data stored in Brevo CRM (free tier)

### 7.3 Self-Promotion
- Clinic branding throughout the site
- Product/services pages
- Appointment booking integration (Calendly free tier)
- High-quality product image hosting via Cloudinary (free 25GB)

---

## 8. Constraints & Assumptions

### 8.1 Constraints
- Zero infrastructure cost — every tool must have a usable free tier
- Must go live within 7 days
- Team is intermediate in JavaScript/frameworks — no advanced DevOps
- English only at launch

### 8.2 Assumptions
- The team has GitHub accounts
- Custom domain will be purchased separately
- Content creators will have basic computer literacy
- At least one team member can handle initial setup and deployment

---

## 9. Out of Scope (v1.0)
- Multilingual support
- Reader registration / community features
- Native mobile app
- Live chat / telemedicine features
- Custom analytics dashboard
- E-commerce / cart functionality (products page is display-only in v1)

---

## 10. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Vercel free tier bandwidth exceeded | Medium | High | Monitor usage; migrate to Cloudflare Pages (free, unlimited) |
| Google penalises medical content for E-E-A-T | Medium | High | Always show author credentials; add editorial policy |
| Daily publish cadence not maintained | High | Medium | Pre-schedule posts via Decap CMS draft system |
| Razorpay payment integration delays | Low | Medium | Build membership gating first; add payment in Phase 2 |

---

*PRD v1.0 — Medical Blog Website — Built for zero infra cost — Target: live in 7 days*
