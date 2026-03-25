'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const morePosts = [
  { slug: "post-4", title: "Understanding the Glycemic Index", snippet: "How controlling your blood sugar spikes improves long-term metabolic markers.", category: "Nutrition", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1740&auto=format&fit=crop" },
  { slug: "post-5", title: "Sleep Apnea and Heart Disease", snippet: "The hidden link between your nightly snoring and your cardiovascular lifespan.", category: "Cardiology", image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1740&auto=format&fit=crop" },
  { slug: "post-6", title: "Cognitive Behavioral Therapy Shifts", snippet: "Modern CBT approaches to breaking chronic anxiety loops efficiently.", category: "Mental Health", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1740&auto=format&fit=crop" },
];

export default function SecondaryArticles() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex justify-between items-end mb-10 border-b border-gray-100 pb-4"
        >
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-8 bg-medical-teal rounded-full" />
             <h2 className="text-2xl lg:text-3xl font-bold font-serif text-gray-900">More from the Blog</h2>
          </div>
          <Link href="/blog" className="text-gray-500 font-medium hover:text-medical-blue transition group flex items-center gap-1">
            View all <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {morePosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="group cursor-pointer bg-white border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="flex h-[140px]">
                {/* Image Left */}
                <div className="w-[40%] overflow-hidden rounded-l-2xl relative">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.05]" style={{ backgroundImage: `url('${post.image}')` }} />
                </div>
                {/* Content Right */}
                <div className="w-[60%] p-5 flex flex-col justify-center bg-white rounded-r-2xl">
                  <span className="text-[10px] font-bold tracking-wider text-medical-teal uppercase mb-1.5">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-gray-900 leading-snug mb-1 group-hover:text-medical-blue transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                    {post.snippet}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
