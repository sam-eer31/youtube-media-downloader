import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — MediaFlow',
  description: 'MediaFlow terms of service. Understand your rights and responsibilities when using our service.',
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-4 fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-sm text-muted">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="glass rounded-2xl p-8 space-y-8 fade-in fade-in-delay-1">
          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading text-foreground">1. Acceptance of Terms</h2>
            <p className="text-sm text-muted leading-relaxed">
              By accessing and using MediaFlow, you agree to be bound by these Terms of Service. If you
              do not agree with any part of these terms, please do not use our service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading text-foreground">2. Description of Service</h2>
            <p className="text-sm text-muted leading-relaxed">
              MediaFlow provides a web-based media conversion service that allows users to convert online
              media content to different formats (MP3, MP4) at various quality levels. The service is
              provided &ldquo;as is&rdquo; without warranty of any kind.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading text-foreground">3. User Responsibilities</h2>
            <p className="text-sm text-muted leading-relaxed">
              You are solely responsible for ensuring that you have the legal right to download and convert
              any content processed through our service. You must comply with all applicable copyright laws,
              terms of service of source platforms, and intellectual property regulations.
            </p>
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <p className="text-sm text-green-400 font-semibold">⚠️ Important</p>
              <p className="text-xs text-green-400/80 mt-1">
                Do not use this service to download copyrighted material without authorization. Unauthorized
                downloading of copyrighted content may violate laws in your jurisdiction.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading text-foreground">4. Prohibited Uses</h2>
            <ul className="text-sm text-muted leading-relaxed list-disc list-inside space-y-1.5">
              <li>Downloading copyrighted content without the rights holder&apos;s permission</li>
              <li>Using automated tools to make bulk requests</li>
              <li>Attempting to circumvent rate limits or other security measures</li>
              <li>Using the service for any illegal purpose</li>
              <li>Reselling or redistributing the service</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading text-foreground">5. Rate Limiting</h2>
            <p className="text-sm text-muted leading-relaxed">
              To ensure fair usage for all users, we implement rate limiting on our API. Excessive
              requests may result in temporary restrictions on your access to the service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading text-foreground">6. File Retention</h2>
            <p className="text-sm text-muted leading-relaxed">
              Converted files are stored on temporary cloud storage for a maximum of 48 hours, after which
              they are automatically deleted. We are not responsible for files that expire before download.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading text-foreground">7. Limitation of Liability</h2>
            <p className="text-sm text-muted leading-relaxed">
              MediaFlow shall not be liable for any direct, indirect, incidental, or consequential damages
              arising from the use of or inability to use the service. We do not guarantee uninterrupted
              or error-free operation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading text-foreground">8. Changes to Terms</h2>
            <p className="text-sm text-muted leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of the service after
              changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading text-foreground">9. Contact</h2>
            <p className="text-sm text-muted leading-relaxed">
              For questions about these terms, please visit our{' '}
              <a href="/contact" className="text-violet-400 hover:text-violet-300 underline transition-colors">
                contact page
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
