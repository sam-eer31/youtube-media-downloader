import React from 'react';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl pointer-events-none float" />
      <div className="absolute top-40 right-1/4 w-60 h-60 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none float" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-4xl mx-auto space-y-6">
        {/* Badge */}
        <div className="fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-muted">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Free & Fast Media Conversion
        </div>

        {/* Heading */}
        <h1 className="fade-in fade-in-delay-1 text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
          Convert Media to{' '}
          <span className="gradient-text">Any Format</span>
          <br />
          in Seconds
        </h1>

        {/* Subtitle */}
        <p className="fade-in fade-in-delay-2 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          Paste a URL, choose your quality, and download. Lightning-fast conversion with
          support for MP3, MP4, and more.
        </p>

        {/* CTA */}
        <div className="fade-in fade-in-delay-3 pt-4">
          <a
            href="#converter"
            className="btn-gradient inline-flex items-center gap-2 px-8 py-4 text-base rounded-xl"
          >
            <span>Start Converting</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
        </div>

        {/* Stats row */}
        <div className="fade-in fade-in-delay-4 pt-10 flex flex-wrap justify-center gap-8 sm:gap-12">
          {[
            { value: '100+', label: 'Supported Sites' },
            { value: 'Fast', label: 'Processing Speed' },
            { value: 'Free', label: 'No Sign-up' },
            { value: 'HD', label: 'Up to 1080p' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold font-heading gradient-text">{stat.value}</p>
              <p className="text-xs text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
