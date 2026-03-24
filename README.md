# Medical Blog Website

A modern, high-performance medical blog built with Next.js 14 App Router, Tailwind CSS, and Decap CMS. Designed specifically for medical professionals to share insights, attract patients, and seamlessly manage content.

## 🚀 Features

- **Blazing Fast Performance**: Statically Generated (SSG) with Next.js App Router for optimal load times and SEO.
- **Modern Design System**: Custom medical-themed color palette and typography (Inter & Lora) tailored for readability and trust.
- **Git-Based CMS**: Decap CMS integration for seamless content management directly from your GitHub repository.
- **Markdown Rendering**: Robust `.md` file parsing using `gray-matter` and `next-mdx-remote` with custom Tailwind prose styling.
- **Dynamic Routing**: Automatically generated blog posts, category archives, and tag filtering pages.
- **Powerful Static Search**: Full-text client-side search across all posts powered by Pagefind—no backend required.
- **Interactive Engagements**: Integrated Giscus for GitHub Discussions-powered comments.
- **Monetization & Lead Gen**: Built-in promotional widgets, newsletter signup forms, and Razorpay membership infrastructure.
- **SEO Optimized**: Automated sitemap generation and semantic HTML structure.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content Management**: [Decap CMS](https://decapcms.org/) (formerly Netlify CMS)
- **Markdown Engine**: [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- **Search**: [Pagefind](https://pagefind.app/)
- **Comments**: [Giscus](https://giscus.app/)
- **Authentication/JWT**: [jose](https://github.com/panva/jose)

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A GitHub repository (for Decap CMS and Giscus)

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/krishna-info/medical_blogps.git
cd medical_blogps
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory and add the necessary environment variables for your third-party integrations (Razorpay, JWT, etc.):

```env
JWT_SECRET="your_super_secret_jwt_key"
RAZORPAY_KEY_ID="your_razorpay_key"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Content Management (Decap CMS)

To access the admin dashboard and start writing posts:

1. Navigate to `/admin` (e.g., `http://localhost:3000/admin`).
2. Authenticate using your GitHub account.
3. Use the visual editor to create, edit, or delete markdown posts. All changes are committed directly to your repository!

## 🔍 Search Integration (Pagefind)

Search indexing is handled automatically during the build process via the `postbuild` script. To test search locally:

```bash
npm run build
```
This will compile the static site and run `pagefind` to generate the search index inside the `public/pagefind` directory.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is open-source and available under the MIT License.
