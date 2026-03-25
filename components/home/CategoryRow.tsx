'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  { name: 'Cardiology', icon: '❤️', count: 42, color: 'text-rose-500', bg: 'bg-rose-50', border: 'hover:border-rose-200' },
  { name: 'Dermatology', icon: '✨', count: 28, color: 'text-amber-500', bg: 'bg-amber-50', border: 'hover:border-amber-200' },
  { name: 'Nutrition', icon: '🥗', count: 56, color: 'text-green-500', bg: 'bg-green-50', border: 'hover:border-green-200' },
  { name: 'Mental Health', icon: '🧠', count: 34, color: 'text-purple-500', bg: 'bg-purple-50', border: 'hover:border-purple-200' },
  { name: 'Pediatrics', icon: '🧸', count: 21, color: 'text-blue-500', bg: 'bg-blue-50', border: 'hover:border-blue-200' },
  { name: 'Research', icon: '🔬', count: 89, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'hover:border-indigo-200' },
  { name: 'Wellness', icon: '🧘‍♀️', count: 67, color: 'text-teal-500', bg: 'bg-teal-50', border: 'hover:border-teal-200' },
];

export default function CategoryRow() {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-sans text-gray-900 mb-3">Browse by Specialty</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Explore our expansive library of perfectly curated, medically reviewed content across multiple specialties.</p>
        </div>

        {/* Mobile scroll snap container */}
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible md:pb-0 md:mx-0 md:px-0 gap-6 hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="snap-center shrink-0 w-[240px] md:w-auto"
            >
              <Link 
                href={`/category/${cat.name.toLowerCase().replace(' ', '-')}`}
                className={`block group bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${cat.border} relative overflow-hidden`}
              >
                <div className={`absolute inset-0 ${cat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                <div className="relative z-10">
                  <div className={`text-3xl mb-4 ${cat.color} drop-shadow-sm group-hover:scale-110 transition-transform origin-left`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{cat.name}</h3>
                  <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
                    {cat.count} Articles <span className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
