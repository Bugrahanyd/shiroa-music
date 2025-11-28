'use client';

import { useState } from 'react';
import { Handshake, Briefcase, TrendingUp, Users, Send } from 'lucide-react';

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    partnershipType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold theme-text mb-4 font-orbitron">Partner With SHIROA</h1>
          <p className="text-xl theme-text-secondary max-w-3xl mx-auto">
            Join forces with us to revolutionize the music industry. Let's create something amazing together.
          </p>
        </div>

        {/* Partnership Types */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="theme-card p-6 rounded-2xl text-center hover:scale-105 transition-transform">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <Briefcase className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold theme-text mb-2">Business Partnership</h3>
            <p className="theme-text-secondary text-sm">
              Collaborate on projects, integrate our platform, or explore joint ventures.
            </p>
          </div>

          <div className="theme-card p-6 rounded-2xl text-center hover:scale-105 transition-transform">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold theme-text mb-2">Artist Collaboration</h3>
            <p className="theme-text-secondary text-sm">
              Work with our AI tools to create exclusive content and reach new audiences.
            </p>
          </div>

          <div className="theme-card p-6 rounded-2xl text-center hover:scale-105 transition-transform">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
              <TrendingUp className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold theme-text mb-2">Investment Opportunity</h3>
            <p className="theme-text-secondary text-sm">
              Be part of the future of AI-powered music production and licensing.
            </p>
          </div>
        </div>

        {/* Partnership Form */}
        <div className="theme-card p-8 rounded-2xl max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Handshake className="theme-icon" size={32} />
            <h2 className="text-2xl font-bold theme-text">Partnership Inquiry</h2>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold theme-text mb-2">Inquiry Sent!</h3>
              <p className="theme-text-secondary">Our partnership team will review your proposal and get back to you within 3-5 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block theme-text font-medium mb-2">Company Name</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 theme-card rounded-lg theme-text focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="block theme-text font-medium mb-2">Contact Name</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-4 py-3 theme-card rounded-lg theme-text focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block theme-text font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 theme-card rounded-lg theme-text focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
                    placeholder="your@company.com"
                  />
                </div>

                <div>
                  <label className="block theme-text font-medium mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 theme-card rounded-lg theme-text focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block theme-text font-medium mb-2">Partnership Type</label>
                <select
                  required
                  value={formData.partnershipType}
                  onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                  className="w-full px-4 py-3 theme-card rounded-lg theme-text focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
                >
                  <option value="">Select partnership type</option>
                  <option value="business">Business Partnership</option>
                  <option value="artist">Artist Collaboration</option>
                  <option value="investment">Investment Opportunity</option>
                  <option value="integration">Platform Integration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block theme-text font-medium mb-2">Tell Us About Your Proposal</label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 theme-card rounded-lg theme-text focus:outline-none focus:ring-2 resize-none"
                  style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
                  placeholder="Describe your partnership idea, goals, and how we can work together..."
                />
              </div>

              <button
                type="submit"
                className="w-full theme-button py-4 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Submit Partnership Inquiry
              </button>
            </form>
          )}
        </div>

        {/* Why Partner */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold theme-text mb-8 font-orbitron">Why Partner With Us?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Innovation', desc: 'Cutting-edge AI technology' },
              { title: 'Growth', desc: 'Rapidly expanding platform' },
              { title: 'Quality', desc: 'Premium music content' },
              { title: 'Support', desc: 'Dedicated partnership team' },
            ].map((item, i) => (
              <div key={i} className="theme-card p-6 rounded-xl">
                <h3 className="font-bold theme-text mb-2">{item.title}</h3>
                <p className="theme-text-secondary text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
