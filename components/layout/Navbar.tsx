'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Articles" },
    { href: "/categories", label: "Categories" },
    { href: "/membership", label: "Membership" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[0.16,1,0.3,1] ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-4"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group relative z-[60]">
          <svg className="w-8 h-8 text-medical-teal animate-pulse-slow" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 10.5h-4.5V6a1.5 1.5 0 00-3 0v4.5H7a1.5 1.5 0 000 3h4.5V18a1.5 1.5 0 003 0v-4.5H19a1.5 1.5 0 000-3z" />
          </svg>
          <span className="text-2xl font-bold font-serif text-gray-900 group-hover:scale-105 transition-transform duration-200">
            Medicare
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors hover:text-medical-blue ${
                  isActive ? "text-medical-blue" : "text-gray-600"
                } group`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-medical-blue transition-all duration-200 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA Desktop */}
        <div className="hidden md:block">
          <Link
            href="/#appointment"
            className="group flex items-center gap-1.5 bg-medical-blue hover:bg-[#0E7C7B] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            Book Appointment
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-800 relative z-[60]"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-center transition-all duration-300">
            <span className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
            <span className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-[55] lg:hidden transition-transform duration-300 ease-[0.16,1,0.3,1] ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col w-full h-full pt-28 px-6 gap-6 border-t-4 border-medical-blue">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-serif font-bold text-gray-900 opacity-0 animate-fade-in"
              style={{ animationDelay: `${i * 60 + 100}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#appointment"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-6 inline-block bg-medical-blue text-white text-center text-lg font-semibold px-8 py-4 rounded-full opacity-0 animate-fade-in"
            style={{ animationDelay: `${links.length * 60 + 100}ms` }}
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </header>
  );
}
