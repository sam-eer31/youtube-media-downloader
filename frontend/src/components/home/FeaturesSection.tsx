"use client";

import React, { useState, useEffect, useRef } from 'react';

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Lightning Fast',
    description: 'Powered by FFmpeg and optimized servers for blazing-fast conversions. No waiting around.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Secure & Private',
    description: 'Files are auto-deleted within 48 hours. No accounts, no tracking, no logs stored.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: 'Premium Quality',
    description: 'Choose from multiple quality options — from 64kbps audio to full 1080p HD video.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Any Device',
    description: 'Works beautifully on desktop, tablet, and mobile. Convert from anywhere.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: '100+ Sources',
    description: 'Supports a wide range of authorized media sources. Just paste the URL and go.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
      </svg>
    ),
    title: 'No Installation',
    description: 'Completely web-based. No software downloads, plugins, or extensions needed.',
  },
];

export function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && scrollRef.current.offsetWidth > 0) {
        const nextIndex = (activeIndex + 1) % features.length;
        const innerContainer = scrollRef.current.firstChild as HTMLElement;
        if (innerContainer && innerContainer.children[nextIndex]) {
          const child = innerContainer.children[nextIndex] as HTMLElement;
          scrollRef.current.scrollTo({
            left: child.offsetLeft - (scrollRef.current.offsetWidth - child.offsetWidth) / 2,
            behavior: 'smooth'
          });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const scrollPosition = target.scrollLeft;
    const innerContainer = target.firstChild as HTMLElement;
    if (!innerContainer) return;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    const center = scrollPosition + target.offsetWidth / 2;
    
    Array.from(innerContainer.children).forEach((child, index) => {
      const childElement = child as HTMLElement;
      const childCenter = childElement.offsetLeft + childElement.offsetWidth / 2;
      const distance = Math.abs(childCenter - center);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    
    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const innerContainer = scrollRef.current.firstChild as HTMLElement;
      if (innerContainer && innerContainer.children[index]) {
        const child = innerContainer.children[index] as HTMLElement;
        scrollRef.current.scrollTo({
          left: child.offsetLeft - (scrollRef.current.offsetWidth - child.offsetWidth) / 2,
          behavior: 'smooth'
        });
      }
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-20" style={{
          background: 'radial-gradient(ellipse, rgba(102, 187, 106, 0.08) 0%, transparent 70%)',
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex justify-center">
            <span className="pill-badge text-xs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Why MediaFlow
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground leading-tight">
            Why choose <span className="gradient-text">MediaFlow</span>?
          </h2>
          <p className="text-muted mt-3 max-w-xl mx-auto text-lg">
            Built for speed, security, and simplicity. Everything you need, nothing you don&apos;t.
          </p>
          {/* Decorative gradient underline */}
          <div className="flex justify-center pt-2">
            <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-accent to-green-300 opacity-50" />
          </div>
        </div>

        {/* Mobile Swipeable Carousel */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="sm:hidden flex overflow-x-auto snap-x snap-mandatory w-[calc(100%+2rem)] -mx-4 px-4 py-6 -my-6 pb-2" 
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex gap-4 items-stretch">
            {features.map((feature, i) => (
              <div
                key={`feat-m-${i}`}
                className="group neon-card p-6 relative w-[280px] shrink-0 flex flex-col snap-center"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl clay-sm flex items-center justify-center mb-5 transition-all duration-400 group-hover:scale-110 text-accent shrink-0">
                  {feature.icon}
                </div>
                {/* Content */}
                <h3 className="text-base font-semibold font-heading text-foreground mb-2.5 group-hover:text-foreground transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="sm:hidden flex justify-center gap-2 mt-8 mb-8">
          {features.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'w-6 bg-accent' : 'w-1.5 bg-muted opacity-40 hover:opacity-100'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Desktop/Tablet Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group neon-card p-7 relative flex flex-col"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl clay-sm flex items-center justify-center mb-5 transition-all duration-400 group-hover:scale-110 text-accent shrink-0">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-base font-semibold font-heading text-foreground mb-2.5 group-hover:text-foreground transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
