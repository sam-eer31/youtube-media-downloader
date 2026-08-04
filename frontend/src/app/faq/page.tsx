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
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4 fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-lg text-muted">
            Got questions? We&apos;ve got answers.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 fade-in fade-in-delay-1">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="glass rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-foreground group-hover:text-violet-400 transition-colors pr-4">
                    {faq.q}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-muted flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-5 text-sm text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
