'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Hero() {
  const headline = "Empowering Your Journey to Better Health";
  const words = headline.split(" ");

  return (
    <section className="relative min-h-[100vh] lg:min-h-0 lg:pt-32 lg:pb-24 flex items-center overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#EEF4FF] via-white to-white">
      {/* Background Dots Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#1B4F8C 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
      />

      {/* Ambient Blobs Phase C7 */}
      <motion.div 
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 -left-64 w-[500px] h-[500px] bg-medical-blue/10 rounded-full blur-[100px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-medical-teal/10 rounded-full blur-[100px] pointer-events-none z-0"
      />

      <div className="container mx-auto px-4 relative z-10 pt-28 pb-16 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Content (55%) */}
          <div className="w-full lg:w-[55%] flex flex-col items-start pt-6">
            {/* C2: Animated Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-[48px] font-bold font-sans text-[#1A1A2E] leading-tight mb-6">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* C3: Animated Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: words.length * 0.08 + 0.1 }}
              className="font-serif italic text-lg md:text-[20px] text-[#666666] max-w-[480px] leading-relaxed mb-10"
            >
              Expert-reviewed medical insights, preventative care guides, and the latest breakthroughs translated for your daily life.
            </motion.p>

            {/* C4: CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: words.length * 0.08 + 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link 
                href="/blog" 
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 bg-[#1B4F8C] text-white font-medium px-8 py-3.5 rounded-xl transition-all hover:shadow-lg"
              >
                {/* Fixed animation logic for standard tailwind parser overrides */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:animate-shimmer skew-x-12" />
                <span>Read Latest Articles</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
              
              <Link 
                href="/#appointment" 
                className="group relative inline-flex items-center justify-center bg-transparent text-[#0E7C7B] font-medium px-8 py-3.5 rounded-xl border-2 border-[#0E7C7B] overflow-hidden transition-colors hover:bg-medical-light"
              >
                <span>Book Appointment</span>
              </Link>
            </motion.div>

            {/* C5: Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12 flex flex-wrap items-center gap-6 sm:gap-10 text-sm font-medium text-gray-600 border-t border-gray-200 pt-6 w-full"
            >
              <div className="flex flex-col">
                <span className="text-xl font-bold text-medical-blue"><AnimatedCounter value={500} />+</span>
                <span className="text-gray-500">Articles</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-gray-200" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-medical-blue"><AnimatedCounter value={10} />K+</span>
                <span className="text-gray-500">Readers</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-medical-light flex items-center justify-center text-medical-teal">✓</div>
                <div className="flex flex-col">
                  <span className="text-gray-900 font-semibold">Expert-</span>
                  <span className="text-gray-500">Reviewed</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Visual (45%) */}
          <div className="w-full lg:w-[45%] relative mt-10 lg:mt-0 pb-10 perspective-[1000px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 w-full max-w-[500px] mx-auto aspect-[4/5] overflow-hidden shadow-2xl bg-gray-100"
              style={{ borderRadius: '60% 40% 55% 45% / 50% 50% 50% 50%' }}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1740&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-medical-blue/10 mix-blend-multiply" />
              </div>
            </motion.div>

            {/* Floating Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.6 }}
              className="absolute bottom-4 -left-4 sm:left-4 z-20 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-4 flex items-center gap-3 border border-white/50 animate-pulse-slow"
              style={{ animationDuration: '6s' }}
            >
              <div className="bg-yellow-100 text-yellow-600 rounded-full p-2 text-xl">⭐</div>
              <div>
                <p className="text-sm font-bold text-gray-900 leading-tight">4.9/5 Rating</p>
                <p className="text-xs text-gray-500 leading-tight">Patient Verified</p>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.8 }}
              className="absolute top-10 -right-4 sm:right-4 z-20 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-4 flex items-center gap-3 border border-white/50 animate-pulse-slow"
              style={{ animationDuration: '8s', animationDelay: '1s' }}
            >
              <div className="bg-medical-light text-medical-teal rounded-full p-2 text-xl">📋</div>
              <div>
                <p className="text-sm font-bold text-gray-900 leading-tight">Daily Tips</p>
                <p className="text-xs text-gray-500 leading-tight">In your inbox</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
