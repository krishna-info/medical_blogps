'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import GoogleTranslate from '@/components/features/GoogleTranslate';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white relative pt-16 pb-8">
      {/* J2 Gradient Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] w-full bg-gradient-to-r from-[#1B4F8C] via-[#0E7C7B] to-[#1B4F8C]" />
      
      <div className="container mx-auto px-4 max-w-7xl">
        {/* J1 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Social */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg className="w-7 h-7 text-medical-teal" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 10.5h-4.5V6a1.5 1.5 0 00-3 0v4.5H7a1.5 1.5 0 000 3h4.5V18a1.5 1.5 0 003 0v-4.5H19a1.5 1.5 0 000-3z" />
              </svg>
              <span className="text-2xl font-bold font-serif text-gray-900">Medicare</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Translating complex medical science into actionable preventative health guides for your daily life.
            </p>
            {/* Social Icons with Spring Physics (J3) */}
            <div className="flex items-center gap-4">
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2, color: '#0E7C7B' }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="text-gray-400 p-2 rounded-full bg-gray-50 hover:bg-teal-50"
                aria-label="Twitter Header"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2, color: '#0E7C7B' }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="text-gray-400 p-2 rounded-full bg-gray-50 hover:bg-teal-50"
                aria-label="LinkedIn Header"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </motion.a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Articles', 'About the Clinic', 'Contact Support', 'Membership Plans'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-500 hover:text-medical-blue transition-colors text-sm font-medium">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialties */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">Specialties</h3>
            <ul className="space-y-3">
              {['Cardiology', 'Dermatology', 'Nutrition', 'Mental Health', 'Pediatrics', 'Wellness'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-500 hover:text-medical-blue transition-colors text-sm font-medium">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Badges */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-medical-teal/10 flex items-center justify-center text-medical-teal text-xs font-bold">✓</div>
                <span className="font-bold text-gray-900 text-sm">Expert Content</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Clinical precision applied to everyday health goals.
              </p>
              <div className="transform scale-90 origin-left">
                 <GoogleTranslate />
              </div>
            </div>
          </div>

        </div>

        {/* J4 Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Medical Blog. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
             <Link href="#" className="text-gray-400 hover:text-gray-900 text-sm font-medium transition-colors">Privacy Policy</Link>
             <Link href="#" className="text-gray-400 hover:text-gray-900 text-sm font-medium transition-colors">Terms of Service</Link>
          </div>
        </div>
        
        {/* Centered Medical Disclaimer */}
        <p className="mt-8 text-center text-xs text-[#999999] max-w-4xl mx-auto leading-relaxed">
          Medical Disclaimer: The information provided on this website is for educational and informational purposes only and does not substitute professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider regarding any medical condition.
        </p>

      </div>
    </footer>
  );
}
