'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';
import { ChevronRight, ChevronLeft, Calendar, MapPin, Briefcase, Target, Sparkles } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    location: '',
    role: '',
    purpose: ''
  });

  const roles = [
    { id: 'producer', label: 'Producer', icon: '🎵', desc: 'Create and sell beats' },
    { id: 'artist', label: 'Artist', icon: '🎤', desc: 'Find tracks for projects' },
    { id: 'listener', label: 'Listener', icon: '🎧', desc: 'Discover new music' },
    { id: 'label', label: 'Label Manager', icon: '🏢', desc: 'Manage artist catalog' }
  ];

  const purposes = [
    { id: 'sell', label: 'Sell Music', icon: '💰', desc: 'Monetize my creations' },
    { id: 'buy', label: 'Buy Music', icon: '🛒', desc: 'License exclusive tracks' },
    { id: 'discover', label: 'Discover', icon: '🔍', desc: 'Explore new sounds' },
    { id: 'network', label: 'Network', icon: '🤝', desc: 'Connect with creators' }
  ];

  const handleFinish = () => {
    // Save onboarding data
    localStorage.setItem('shiroa-onboarding', JSON.stringify({
      ...formData,
      completedAt: new Date().toISOString()
    }));
    
    // Show completion message
    const completionToast = document.createElement('div');
    completionToast.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 24px 32px;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        z-index: 9999;
        font-weight: bold;
        text-align: center;
        animation: slideIn 0.3s ease-out;
      ">
        <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
        <div style="font-size: 24px; margin-bottom: 8px;">Welcome to SHIROA!</div>
        <div style="font-size: 16px; opacity: 0.9;">Your profile is now complete</div>
      </div>
      <style>
        @keyframes slideIn {
          from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
      </style>
    `;
    document.body.appendChild(completionToast);
    
    setTimeout(() => {
      if (completionToast.parentNode) {
        completionToast.parentNode.removeChild(completionToast);
      }
      router.push('/discover');
    }, 2500);
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.age && parseInt(formData.age) >= 13;
      case 2: return formData.location.trim().length > 0;
      case 3: return formData.role;
      case 4: return formData.purpose;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen theme-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-12 h-12 text-purple-400" />
            <h1 className="text-5xl font-bold theme-text font-orbitron">
              {t('onboard.welcome')}
            </h1>
          </div>
          <p className="theme-text-secondary text-xl">Let's personalize your experience</p>
          <p className="theme-text-secondary text-sm mt-2">Step {step} of 4</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-3 mt-6 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-10 min-h-[500px] flex flex-col justify-center">
          {/* Step 1: Age */}
          {step === 1 && (
            <div className="text-center">
              <Calendar size={80} className="mx-auto mb-8 text-purple-400" />
              <h2 className="text-4xl font-bold theme-text mb-4 font-orbitron">{t('onboard.age')}</h2>
              <p className="theme-text-secondary mb-12 text-lg">Help us personalize your music recommendations</p>
              
              <div className="max-w-xs mx-auto">
                <input
                  type="number"
                  min="13"
                  max="100"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-8 py-6 text-3xl text-center theme-bg-secondary rounded-2xl theme-text focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all"
                  placeholder="25"
                />
                <p className="text-sm theme-text-secondary mt-4">Must be 13 or older</p>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="text-center">
              <MapPin size={80} className="mx-auto mb-8 text-cyan-400" />
              <h2 className="text-4xl font-bold theme-text mb-4 font-orbitron">{t('onboard.location')}</h2>
              <p className="theme-text-secondary mb-12 text-lg">Where are you creating from?</p>
              
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-8 py-6 text-xl text-center theme-bg-secondary rounded-2xl theme-text focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all"
                  placeholder="Istanbul, Turkey"
                />
              </div>
            </div>
          )}

          {/* Step 3: Role */}
          {step === 3 && (
            <div className="text-center">
              <Briefcase size={80} className="mx-auto mb-8 text-pink-400" />
              <h2 className="text-4xl font-bold theme-text mb-4 font-orbitron">{t('onboard.role')}</h2>
              <p className="theme-text-secondary mb-12 text-lg">What best describes you?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setFormData({ ...formData, role: role.id })}
                    className={`p-8 rounded-2xl border-2 transition-all hover:scale-105 text-center ${
                      formData.role === role.id
                        ? 'border-purple-500 theme-bg-secondary shadow-lg shadow-purple-500/25'
                        : 'border-transparent theme-hover'
                    }`}
                  >
                    <div className="text-5xl mb-4">{role.icon}</div>
                    <h3 className="theme-text font-bold text-xl mb-2">{role.label}</h3>
                    <p className="theme-text-secondary text-sm">{role.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Purpose */}
          {step === 4 && (
            <div className="text-center">
              <Target size={80} className="mx-auto mb-8 text-orange-400" />
              <h2 className="text-4xl font-bold theme-text mb-4 font-orbitron">{t('onboard.purpose')}</h2>
              <p className="theme-text-secondary mb-12 text-lg">What's your main goal on SHIROA?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {purposes.map((purpose) => (
                  <button
                    key={purpose.id}
                    onClick={() => setFormData({ ...formData, purpose: purpose.id })}
                    className={`p-8 rounded-2xl border-2 transition-all hover:scale-105 text-center ${
                      formData.purpose === purpose.id
                        ? 'border-orange-500 theme-bg-secondary shadow-lg shadow-orange-500/25'
                        : 'border-transparent theme-hover'
                    }`}
                  >
                    <div className="text-5xl mb-4">{purpose.icon}</div>
                    <h3 className="theme-text font-bold text-xl mb-2">{purpose.label}</h3>
                    <p className="theme-text-secondary text-sm">{purpose.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-2 px-8 py-4 theme-button-outline rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all"
          >
            <ChevronLeft size={20} />
            Back
          </button>

          {step === 4 ? (
            <button
              onClick={handleFinish}
              disabled={!isStepValid()}
              className="flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl font-semibold disabled:opacity-50 hover:scale-105 transition-all shadow-lg"
            >
              {t('onboard.finish')}
              <Sparkles size={20} />
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl font-semibold disabled:opacity-50 hover:scale-105 transition-all"
            >
              {t('onboard.next')}
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/discover')}
            className="theme-text-secondary hover:theme-text text-sm transition-colors underline"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}