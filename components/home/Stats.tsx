'use client';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

function StatCounter({ value, duration = 2 }: { value: number, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, value, count, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function StatsBar() {
  const stats = [
    { label: "Medical Articles", value: 500, suffix: "+", icon: "📑" },
    { label: "Specialities Covered", value: 7, suffix: "", icon: "🩺" },
    { label: "Monthly Readers", value: 10, suffix: "K+", icon: "👥" },
    { label: "Expert-Reviewed Content", value: 100, suffix: "%", icon: "✓" },
  ];

  return (
    <section className="bg-medical-blue py-12 border-t border-blue-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 divide-blue-800/50">
          {stats.map((stat, i) => (
            <div key={i} className={`flex flex-col items-center text-center px-4 ${i > 1 && i % 2 === 0 ? 'pt-8 md:pt-0' : ''} md:border-l md:border-blue-800/50 md:first:border-l-0 ${i % 2 !== 0 ? 'border-l border-blue-800/50' : ''} ${i > 0 && i % 2 !== 0 && i > 1 ? 'pt-8 md:pt-0' : ''}`}>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl mb-4 text-white shadow-sm ring-1 ring-white/20">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold font-sans text-white mb-1 flex items-baseline tracking-tight">
                <StatCounter value={stat.value} duration={2 + (i * 0.2)} />
                <span>{stat.suffix}</span>
              </div>
              <p className="text-white/75 text-sm font-sans tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
