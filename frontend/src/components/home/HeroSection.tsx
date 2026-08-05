import React from 'react';

const stats = [
  {
    value: '100+',
    label: 'Supported Sites',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    value: 'Blazing',
    label: 'Fast Processing',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    value: 'Free',
    label: 'No Sign-up Needed',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" /><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
      </svg>
    ),
  },
  {
    value: '1080p',
    label: 'HD Quality',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <rect x="2" y="5" width="20" height="14" rx="3" /><polygon points="10 9 15 12 10 15 10 9" />
      </svg>
    ),
  },
];

export function HeroSection() {
  return (
    <section className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      {/* Decorative floating clay orbs */}
      <div className="absolute top-16 left-[15%] w-72 h-72 rounded-full pointer-events-none float opacity-30" style={{
        background: 'radial-gradient(circle, rgba(245, 200, 66, 0.2) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />
      <div className="absolute top-32 right-[10%] w-56 h-56 rounded-full pointer-events-none float-slow opacity-25" style={{
        background: 'radial-gradient(circle, rgba(102, 187, 106, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animationDelay: '2s',
      }} />
      <div className="absolute bottom-0 left-[40%] w-80 h-80 rounded-full pointer-events-none float opacity-20" style={{
        background: 'radial-gradient(circle, rgba(102, 187, 106, 0.12) 0%, transparent 70%)',
        filter: 'blur(70px)',
        animationDelay: '4s',
      }} />

      {/* Dot pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-8">
        {/* Animated Badge */}
        <div className="fade-in flex justify-center">
          <div className="pill-badge">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>
            <span className="text-muted">Free & Unlimited Conversions</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="fade-in fade-in-delay-1 text-5xl sm:text-6xl lg:text-7xl font-bold font-heading leading-[1.1] tracking-tight">
          Convert Media to{' '}
          <span className="gradient-text">Any Format</span>
          <br />
          <span className="text-muted">in Seconds</span>
        </h1>

        {/* Subtitle */}
        <p className="fade-in fade-in-delay-2 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          Paste a URL, choose your quality, and download. Lightning-fast conversion with
          support for MP3, MP4, and more — completely free.
        </p>

        {/* CTA Buttons */}
        <div className="fade-in fade-in-delay-3 pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#converter"
            className="btn-gradient inline-flex items-center gap-3 px-10 py-4.5 text-base rounded-2xl font-semibold"
          >
            <span>Start Converting</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="bounce-arrow">
              <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
          <a
            href="/about"
            className="btn-secondary inline-flex items-center gap-2 px-8 py-4 text-base rounded-2xl text-sm"
          >
            <span>Learn More</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* Stats row */}
        <div className="fade-in fade-in-delay-4 pt-12">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl clay clay-hover cursor-default"
              >
                <div className="w-9 h-9 rounded-xl clay-sm flex items-center justify-center flex-shrink-0">
                  {stat.icon}
                </div>
                <div className="text-left">
                  <p className="text-base font-bold font-heading gradient-text-static">{stat.value}</p>
                  <p className="text-[0.6875rem] text-muted leading-tight">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
