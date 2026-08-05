'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: 'What formats are supported?',
    a: 'MediaFlow supports MP3 (audio) and MP4 (video) formats. For MP3, you can choose from 64, 128, 192, 256, or 320 kbps. For MP4, quality options range from 144p to 1080p, plus a "Highest Available" option.',
  },
  {
    q: 'Is MediaFlow free to use?',
    a: 'Yes! MediaFlow is completely free to use. No sign-up, no subscription, no hidden charges. Just paste a URL and start converting.',
  },
  {
    q: 'How long are downloaded files stored?',
    a: 'Converted files are uploaded to temporary cloud storage and automatically deleted after 48 hours. We don\'t keep permanent copies of any files.',
  },
  {
    q: 'What sources are supported?',
    a: 'MediaFlow uses yt-dlp under the hood, which supports hundreds of websites. Simply paste the URL and we\'ll check if it\'s supported. Please ensure you have the right to download the content.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'The maximum file size for cloud upload is 100 MB. For most standard-length media, this is more than enough. Very long videos at high quality may exceed this limit.',
  },
  {
    q: 'Do you track or log my downloads?',
    a: 'No. We don\'t track what you download, store any personal information, or keep download logs. Your privacy is our priority.',
  },
  {
    q: 'Why is my conversion failing?',
    a: 'Common reasons include: the URL is not from a supported source, the media is private or restricted, or there\'s a temporary server issue. Try checking the URL and trying again.',
  },
  {
    q: 'Can I use MediaFlow on my phone?',
    a: 'Absolutely! MediaFlow is fully responsive and works great on mobile browsers. Just visit the site, paste your URL, and download.',
  },
  {
    q: 'Is this legal?',
    a: 'MediaFlow is a tool for converting media. Users are responsible for ensuring they have the right to download and convert the content they process through our service. Please respect copyright laws and terms of service of the source platforms.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-5 fade-in">
          <div className="flex justify-center">
            <span className="pill-badge text-xs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Help Center
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-lg text-muted">
            Got questions? We&apos;ve got answers.
          </p>
          <div className="flex justify-center">
            <div className="w-20 h-1.5 rounded-full bg-gradient-to-r from-accent to-green-300 opacity-50" />
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 stagger-children">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="neon-card overflow-hidden transition-all duration-400"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full px-7 py-6 flex items-center justify-between text-left group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 pr-4">
                    <span className="text-xs font-bold font-mono gradient-text-static opacity-60 flex-shrink-0 w-6">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold text-foreground group-hover:text-foreground transition-colors leading-snug">
                      {faq.q}
                    </span>
                  </div>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-400 ${
                    isOpen
                      ? 'bg-gradient-to-br from-accent/20 to-green-400/15 rotate-180 clay-inset'
                      : 'bg-surface group-hover:bg-surface-hover clay-sm'
                  }`}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-muted'}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-7 pb-6 pl-[4.25rem]">
                    <div className="h-px bg-gradient-to-r from-accent/10 to-transparent mb-4" />
                    <p className="text-sm text-muted leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-4 fade-in">
          <p className="text-muted">Still have questions?</p>
          <a
            href="/contact"
            className="btn-gradient inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Contact Us</span>
          </a>
        </div>
      </div>
    </div>
  );
}
