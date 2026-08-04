'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4 fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg text-muted">
            Have a question, feedback, or issue? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact Form */}
        <div className="glass rounded-2xl p-8 fade-in fade-in-delay-1">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="text-5xl">🎉</div>
              <h2 className="text-xl font-bold font-heading text-foreground">Message Sent!</h2>
              <p className="text-muted">
                Thanks for reaching out. We&apos;ll get back to you as soon as possible.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', email: '', message: '' });
                }}
                className="btn-gradient px-6 py-3 rounded-xl text-sm"
              >
                <span>Send Another</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-card-border text-foreground placeholder-muted/50 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-card-border text-foreground placeholder-muted/50 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-card-border text-foreground placeholder-muted/50 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-gradient w-full py-4 rounded-xl text-sm font-semibold"
              >
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
