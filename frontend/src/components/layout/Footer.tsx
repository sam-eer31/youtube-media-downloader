import React from 'react';
import Link from 'next/link';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/#converter', label: 'Converter' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

const developerLinks = [
  { href: '/api-docs', label: 'API Documentation' },
];

const socialLinks = [
  {
    href: 'https://github.com/sam-eer31/youtube-media-downloader',
    label: 'GitHub',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative mt-auto">
      {/* Animated gradient divider */}
      <div className="gradient-divider-animated" />

      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-center">
              <img src="/logo.png" alt="MediaFlow Logo" className="h-8 w-auto logo-light" />
              <img src="/logo-dark.png" alt="MediaFlow Logo" className="h-8 w-auto logo-dark" />
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Convert media files quickly and securely. Premium quality conversions with a beautiful experience — completely free.
            </p>

            {/* Social links */}
            <div className="flex gap-2.5 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="group relative w-10 h-10 rounded-xl clay-sm flex items-center justify-center text-muted hover:text-foreground transition-all duration-300 hover:scale-105 clay-hover"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                  {/* Hover gradient border */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                    background: 'linear-gradient(135deg, rgba(102, 187, 106,0.1), rgba(245,200,66,0.05))',
                  }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold font-heading text-foreground mb-5 uppercase tracking-[0.15em]">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-foreground transition-colors duration-300 link-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold font-heading text-foreground mb-5 uppercase tracking-[0.15em]">
              Legal
            </h3>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-foreground transition-colors duration-300 link-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold font-heading text-foreground mb-5 uppercase tracking-[0.15em]">
              Developers
            </h3>
            <ul className="flex flex-col gap-3">
              {developerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-foreground transition-colors duration-300 link-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Badge */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold font-heading text-foreground mb-5 uppercase tracking-[0.15em]">
              Built With
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'React', 'Express', 'FFmpeg'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium font-mono text-muted clay-inset border border-card-border/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="gradient-divider absolute left-0 right-0" style={{ marginTop: '-2rem' }} />
          <p className="text-sm text-muted/80">
            © {new Date().getFullYear()} MediaFlow. All rights reserved.
          </p>
          <p className="text-xs text-muted flex items-center gap-1.5">
            Built with
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-error animate-pulse">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            for creators everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
