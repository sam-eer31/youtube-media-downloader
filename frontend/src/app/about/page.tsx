import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — MediaFlow',
  description: 'Learn about MediaFlow, our mission, and how our media conversion technology works.',
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center space-y-5 fade-in">
          <div className="flex justify-center">
            <span className="pill-badge text-xs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Our Story
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
            About <span className="gradient-text">MediaFlow</span>
          </h1>
          <p className="text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Fast, free, and privacy-focused media conversion for everyone.
          </p>
          <div className="flex justify-center">
            <div className="w-20 h-1.5 rounded-full bg-gradient-to-r from-accent to-green-300 opacity-50" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 stagger-children">
          <div className="neon-card p-8 space-y-4">
            <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center clay-sm text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              Our Mission
            </h2>
            <p className="text-muted leading-relaxed">
              MediaFlow was built with a simple goal: make media conversion as easy and accessible as
              possible. No complicated software, no sign-ups, no hidden fees — just paste a URL, pick
              your format, and download.
            </p>
          </div>

          <div className="neon-card p-8 space-y-6">
            <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center clay-sm text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Paste URL',
                  desc: 'Copy a media URL from a supported source and paste it into our converter.',
                },
                {
                  step: '02',
                  title: 'Choose Quality',
                  desc: 'Select your preferred format (MP3 or MP4) and pick the quality you want.',
                },
                {
                  step: '03',
                  title: 'Download',
                  desc: 'Click download and your file will be processed and delivered in seconds.',
                },
              ].map((item) => (
                <div key={item.step} className="text-center space-y-3 p-4 rounded-xl clay group hover:bg-surface-hover transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl clay-sm text-accent text-sm font-bold font-mono group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="neon-card p-8 space-y-5">
            <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center clay-sm text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {['Next.js', 'React', 'TypeScript', 'Express', 'FFmpeg', 'Tailwind CSS', 'yt-dlp'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-xl clay-sm text-sm font-medium font-mono text-muted hover:text-foreground hover:bg-surface-hover transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
