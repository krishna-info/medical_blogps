'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PromoBanner() {
  const pills = [
    "✓ MBBS, MD Verified",
    "✓ Evidence-Based",
    "✓ Updated Daily"
  ];

  return (
    <section className="pt-2 pb-12 px-4 lg:-mt-8 relative z-10 w-full">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1B4F8C] to-[#0E7C7B] text-white shadow-2xl"
        >
          {/* Subtle Dot Pattern */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(white 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="w-full md:w-[60%] p-10 md:p-16 lg:p-20 flex flex-col items-start z-20">
              <h2 className="text-3xl lg:text-4xl font-bold font-serif leading-tight mb-4 max-w-lg">
                Personalized Care, Driven By Clinical Excellence
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-md leading-relaxed">
                Connect directly with our board-certified specialists for comprehensive consultations tailored exactly to your unique health profile.
              </p>
              
              <Link 
                href="/#appointment" 
                className="group relative inline-flex items-center justify-center gap-2 bg-white text-medical-blue font-bold px-8 py-3.5 rounded-xl transition-transform hover:scale-105"
              >
                <div className="absolute inset-0 rounded-xl box-shadow-pulse pointer-events-none" />
                <span className="relative z-10">Schedule Consultation</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1.5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
              
              <div className="mt-10 flex flex-wrap gap-2 sm:gap-3">
                {pills.map((pill, i) => (
                  <motion.div
                    key={pill}
                    animate={{ y: [-3, 3] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: i * 0.4 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold px-4 py-2 rounded-full tracking-wide"
                  >
                    {pill}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="w-full md:w-[40%] h-64 md:h-auto md:absolute md:top-0 md:bottom-0 md:right-0 overflow-hidden">
              <div className="absolute inset-0 w-full h-full bg-cover bg-left md:bg-[center_top_-2rem] opacity-90 scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1740&auto=format&fit=crop')" }}>
                 <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0E7C7B] via-[#0E7C7B]/60 to-transparent pointer-events-none mix-blend-multiply md:mix-blend-normal hidden md:block" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customPulse {
          0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.6); }
          100% { box-shadow: 0 0 0 15px rgba(255,255,255,0); }
        }
        .box-shadow-pulse { animation: customPulse 2s infinite; }
      `}} />
    </section>
  );
}
