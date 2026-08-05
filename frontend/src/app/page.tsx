import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { ConverterCard } from '@/components/converter/ConverterCard';

const steps = [
  {
    step: '01',
    title: 'Paste URL',
    description: 'Copy a media URL from any supported source and paste it into our converter.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Choose Quality',
    description: 'Select your preferred format and pick the quality level you want.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Download',
    description: 'Click download and your file will be processed and delivered in seconds.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const audiences = [
  {
    label: 'Music Lovers',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    label: 'Students',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
      </svg>
    ),
  },
  {
    label: 'Content Creators',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="3" /><polygon points="10 9 15 12 10 15 10 9" />
      </svg>
    ),
  },
  {
    label: 'Podcasters',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    label: 'Designers',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Converter Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <ConverterCard />
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-14 space-y-4">
            <div className="flex justify-center">
              <span className="pill-badge text-xs">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                3 Simple Steps
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading">
              How it <span className="gradient-text">Works</span>
            </h2>
            <p className="text-muted max-w-lg mx-auto">
              Converting media has never been this simple. Three steps, zero hassle.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {steps.map((item, i) => (
              <div key={item.step} className="relative group">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-0.5">
                    <div className="w-full h-full rounded-full" style={{
                      background: 'linear-gradient(90deg, rgba(102, 187, 106,0.15), rgba(245,200,66,0.08))',
                    }} />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/20" />
                  </div>
                )}

                <div className="neon-card p-8 text-center h-full relative">
                  {/* Step number */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl clay-sm mb-5 relative">
                    <div className="text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                      {item.icon}
                    </div>
                    {/* Step badge */}
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-lg clay-sm flex items-center justify-center text-accent text-[0.625rem] font-bold font-mono">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold font-heading text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />

      {/* Social Proof / Trust Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading">
              Trusted by <span className="gradient-text">Creators</span>
            </h2>
            <p className="text-muted max-w-lg mx-auto">
              Join thousands of creators who use MediaFlow to convert and download media every day.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {audiences.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3 group cursor-default">
                <div className="w-16 h-16 rounded-2xl clay clay-hover flex items-center justify-center text-accent group-hover:scale-105 transition-transform duration-300">
                  {item.icon}
                </div>
                <span className="text-xs text-muted font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="pt-4">
            <a
              href="#converter"
              className="btn-gradient inline-flex items-center gap-3 px-10 py-4.5 text-base rounded-2xl font-semibold"
            >
              <span>Try It Now — It&apos;s Free</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
