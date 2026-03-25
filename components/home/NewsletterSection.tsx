'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) setSubmitted(true);
  };

  return (
    <section className="py-24 bg-[#F4F6F9] border-t border-gray-200 overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4 tracking-tight">Stay Informed. Stay Healthy.</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join 10,000+ readers who get trusted medical insights, preventative care tips, and exclusive health guides straight to their inbox every week.
          </p>

          <div className="relative max-w-xl mx-auto overflow-hidden h-[120px] md:h-[60px]">
             {/* Form State */}
             <motion.form 
                onSubmit={handleSubmit}
                initial={{ x: 0 }}
                animate={{ x: submitted ? '-100%' : 0, opacity: submitted ? 0 : 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col md:flex-row gap-3 md:gap-2"
             >
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    aria-label="Email address"
                    className="w-full pl-11 pr-4 py-3 md:py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-medical-blue focus:border-medical-blue transition-shadow shadow-sm outline-none text-gray-900"
                    placeholder="Enter your email address"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-medical-blue hover:bg-[#0E7C7B] text-white font-semibold py-3 md:py-3.5 px-8 rounded-xl transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-medical-teal whitespace-nowrap"
                >
                  Subscribe Now
                </button>
             </motion.form>

             {/* Success State */}
             <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: submitted ? 0 : '100%', opacity: submitted ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                className="absolute inset-0 flex items-center justify-center bg-green-50 border border-green-200 rounded-xl px-6 h-[56px] md:h-full mt-auto"
             >
                <motion.svg 
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: submitted ? 0 : 100 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="w-6 h-6 text-green-500 mr-2 shrink-0" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={3}
                  strokeDasharray={100}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </motion.svg>
                <span className="text-green-800 font-medium whitespace-nowrap overflow-hidden text-ellipsis">You&apos;re in! Confirmation sent.</span>
             </motion.div>
          </div>

          <p className="mt-8 text-[13px] text-[#999999] flex items-center justify-center gap-1.5 font-medium">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            No spam. Unsubscribe anytime. GDPR compliant.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
