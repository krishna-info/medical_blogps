'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Static stub array matching the editorial design grid requirements visually
const posts = [
  { slug: "post-1", title: "The Future of Cardiology: AI Diagnostics", excerpt: "A deep dive into how artificial intelligence is shaping the diagnostic accuracy of modern cardiovascular treatments.", category: "Cardiology", date: "Mar 25, 2026", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1740&auto=format&fit=crop" },
  { slug: "post-2", title: "Nutritional Interventions for Mental Health", excerpt: "Exploring the gut-brain axis and how dietary choices directly impact serotonin synthesis.", category: "Nutrition", date: "Mar 20, 2026", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1740&auto=format&fit=crop" },
  { slug: "post-3", title: "Pediatric Wellness Guidelines V2.0", excerpt: "Updated core competencies for early childhood preventative care systems.", category: "Pediatrics", date: "Mar 15, 2026", image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1740&auto=format&fit=crop" }
];

export default function EditorialGrid() {
  const featured = posts[0];
  const secondary = posts.slice(1);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold font-serif text-gray-900">Latest Articles</h2>
          <Link href="/blog" className="text-medical-blue font-medium hover:text-medical-teal transition hover:underline group flex items-center gap-1">
            View all <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Post (Spans 2 columns) */}
          <motion.article 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-2 group cursor-pointer"
          >
            <Link href={`/blog/${featured.slug}`} className="block">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl mb-6 bg-gray-100">
                <div className="absolute top-4 left-4 z-10 bg-medical-blue/85 backdrop-blur-sm text-white text-[11px] font-bold tracking-widest px-3 py-1.5 rounded-full uppercase">FEATURED</div>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]" style={{ backgroundImage: `url('${featured.image}')` }} />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-semibold text-medical-teal">{featured.category}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-sm text-gray-500">{featured.date}</span>
              </div>
              <h3 className="text-3xl font-bold font-serif text-gray-900 mb-3 group-hover:text-medical-blue transition-colors leading-tight">{featured.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">{featured.excerpt}</p>
              <div className="text-medical-blue font-medium flex items-center gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Read more <span>→</span>
              </div>
            </Link>
          </motion.article>

          {/* Secondary Posts */}
          <div className="flex flex-col gap-8">
            {secondary.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.2, ease: "easeOut" }}
                className="group cursor-pointer"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-xl mb-4 bg-gray-100">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]" style={{ backgroundImage: `url('${post.image}')` }} />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold text-medical-teal uppercase tracking-wider">{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold font-sans text-gray-900 mb-2 group-hover:text-medical-blue transition-colors leading-snug">{post.title}</h3>
                  <div className="text-medical-blue text-sm font-medium flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Read more <span>→</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
