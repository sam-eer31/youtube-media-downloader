'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#converter', label: 'Converter' },
  { href: '/faq', label: 'FAQ' },
  { href: '/api-docs', label: 'API' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 transition-all duration-500">
          <div className={`flex items-center justify-between h-14 px-5 rounded-2xl transition-all duration-500 ${
            isScrolled
              ? 'clay'
              : 'bg-transparent'
          }`}>
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <img src="/logo.png" alt="MediaFlow Logo" className="h-9 w-auto transition-transform duration-300 group-hover:scale-105 logo-light" />
              <img src="/logo-dark.png" alt="MediaFlow Logo" className="h-9 w-auto transition-transform duration-300 group-hover:scale-105 logo-dark" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 rounded-xl text-sm font-medium text-muted hover:text-foreground transition-all duration-300 group"
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Hover background */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                    background: 'rgba(102, 187, 106, 0.05)',
                  }} />
                  {/* Bottom accent */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-4/5 h-0.5 rounded-full bg-gradient-to-r from-accent to-green-400 transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              {/* Desktop CTA */}
              <Link
                href="/#converter"
                className="hidden lg:flex btn-gradient items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl"
              >
                <span>Start Converting</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="7 10 12 15 17 10" />
                </svg>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden relative w-10 h-10 rounded-xl clay-sm clay-hover flex items-center justify-center focus-ring"
                aria-label="Toggle menu"
                aria-expanded={isMobileOpen}
              >
                <div className="flex flex-col gap-1.5 w-5">
                  <span
                    className={`h-0.5 bg-foreground rounded-full transition-all duration-400 origin-center ${
                      isMobileOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                  />
                  <span
                    className={`h-0.5 bg-foreground rounded-full transition-all duration-400 ${
                      isMobileOpen ? 'opacity-0 scale-x-0' : ''
                    }`}
                  />
                  <span
                    className={`h-0.5 bg-foreground rounded-full transition-all duration-400 origin-center ${
                      isMobileOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation — Full-screen overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/90 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Menu content */}
          <div className="relative flex flex-col items-center justify-center h-full mobile-menu-enter">
            <div className="flex flex-col items-center gap-2 stagger-children">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-8 py-4 rounded-2xl text-lg font-semibold font-heading text-muted hover:text-foreground hover:bg-surface transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4">
                <Link
                  href="/#converter"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn-gradient inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl"
                >
                  <span>Start Converting</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="7 10 12 15 17 10" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
