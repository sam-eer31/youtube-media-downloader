import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — MediaFlow',
  description: 'MediaFlow privacy policy. Learn how we handle your data and protect your privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-4 fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-sm text-muted">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="glass rounded-2xl p-8 space-y-8 fade-in fade-in-delay-1">
          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading text-foreground">1. Information We Collect</h2>
            <p className="text-sm text-muted leading-relaxed">
              MediaFlow is designed to respect your privacy. We do not collect personal information, require account
              creation, or use cookies for tracking purposes. The only data processed is the URL you submit for
              conversion, which is not stored after processing is complete.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading text-foreground">2. Data Processing</h2>
            <p className="text-sm text-muted leading-relaxed">
              When you submit a URL for conversion, our server processes the media file temporarily. The converted
              file is uploaded to temporary cloud storage (tmpfiles.org) and automatically deleted after 48 hours.
              We do not retain copies of any media files on our servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading text-foreground">3. Third-Party Services</h2>
            <p className="text-sm text-muted leading-relaxed">
              We use tmpfiles.org for temporary file hosting. Files uploaded to this service are subject to their
              privacy policy and are automatically deleted after the specified retention period. We do not share
              your data with any other third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading text-foreground">4. Server Logs</h2>
            <p className="text-sm text-muted leading-relaxed">
              Our server may collect basic access logs (IP address, timestamp, and request type) for security
              and rate-limiting purposes. These logs are rotated regularly and not used for tracking individual users.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading text-foreground">5. Security</h2>
            <p className="text-sm text-muted leading-relaxed">
              We implement industry-standard security measures including HTTPS encryption, input validation,
              rate limiting, and security headers to protect our service and its users.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading text-foreground">6. Changes to This Policy</h2>
            <p className="text-sm text-muted leading-relaxed">
              We may update this privacy policy from time to time. Any changes will be reflected on this page
              with an updated revision date.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading text-foreground">7. Contact</h2>
            <p className="text-sm text-muted leading-relaxed">
              If you have questions about this privacy policy, please reach out through our{' '}
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
