import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — MediaFlow',
  description: 'Learn about MediaFlow, our mission, and how our media conversion technology works.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading">
            About <span className="gradient-text">MediaFlow</span>
          </h1>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Fast, free, and privacy-focused media conversion for everyone.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 fade-in fade-in-delay-1">
          <div className="glass rounded-2xl p-8 space-y-4">
            <h2 className="text-xl font-bold font-heading text-foreground">Our Mission</h2>
            <p className="text-muted leading-relaxed">
              MediaFlow was built with a simple goal: make media conversion as easy and accessible as
              possible. No complicated software, no sign-ups, no hidden fees — just paste a URL, pick
              your format, and download.
            </p>
          </div>

          <div className="glass rounded-2xl p-8 space-y-4">
            <h2 className="text-xl font-bold font-heading text-foreground">How It Works</h2>
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
                <div key={item.step} className="text-center space-y-2">
                  <div className="text-3xl font-bold gradient-text font-heading">{item.step}</div>
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-8 space-y-4">
            <h2 className="text-xl font-bold font-heading text-foreground">Technology Stack</h2>
            <div className="flex flex-wrap gap-3">
              {['Next.js', 'React', 'TypeScript', 'Express', 'FFmpeg', 'Tailwind CSS', 'yt-dlp'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-lg glass text-sm font-medium text-muted"
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
