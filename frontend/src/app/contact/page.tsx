'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to send message
    console.log('Contact form:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold theme-text mb-4 font-orbitron">Get In Touch</h1>
          <p className="text-xl theme-text-secondary">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="theme-card p-6 rounded-2xl">
              <Mail className="theme-icon mb-4" size={32} />
              <h3 className="text-xl font-bold theme-text mb-2">Email Us</h3>
              <p className="theme-text-secondary mb-2">For general inquiries and support</p>
              <a href="mailto:support@shiroa.com" className="theme-accent hover:opacity-80">
                support@shiroa.com
              </a>
            </div>

            <div className="theme-card p-6 rounded-2xl">
              <MessageSquare className="theme-icon mb-4" size={32} />
              <h3 className="text-xl font-bold theme-text mb-2">Feedback</h3>
              <p className="theme-text-secondary">
                Your feedback helps us improve. Let us know what you think about SHIROA.
              </p>
            </div>

            <div className="theme-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold theme-text mb-2">Response Time</h3>
              <p className="theme-text-secondary">
                We typically respond within 24-48 hours during business days.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="theme-card p-8 rounded-2xl">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold theme-text mb-2">Message Sent!</h3>
                <p className="theme-text-secondary">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block theme-text font-medium mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 theme-card rounded-lg theme-text focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block theme-text font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 theme-card rounded-lg theme-text focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block theme-text font-medium mb-2">Subject</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 theme-card rounded-lg theme-text focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="bug">Report a Bug</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block theme-text font-medium mb-2">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 theme-card rounded-lg theme-text focus:outline-none focus:ring-2 resize-none"
                    style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full theme-button py-4 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
