'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';
import { ChevronRight, ChevronLeft, Calendar, MapPin, Briefcase, Target, Sparkles, Check } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    location: '',
    role: '',
    purpose: ''
  });

  const content = {
    en: {
      welcome: "Welcome to SHIROA",
      subtitle: "Let's personalize your experience",
      steps: {
        age: {
          title: "How old are you?",
          subtitle: "Help us personalize your music recommendations",
          placeholder: "25"
        },
        location: {
          title: "Where are you from?",
          subtitle: "Connect with creators in your region",
          placeholder: "Istanbul, Turkey"
        },
        role: {
          title: "What describes you best?",
          subtitle: "Choose your primary role on SHIROA",
          options: [
            { id: 'producer', label: 'Producer', icon: '🎵', desc: 'Create and sell beats' },
            { id: 'artist', label: 'Artist', icon: '🎤', desc: 'Find tracks for projects' },
            { id: 'listener', label: 'Listener', icon: '🎧', desc: 'Discover new music' },
            { id: 'label', label: 'Label Manager', icon: '🏢', desc: 'Manage artist catalog' }
          ]
        },
        purpose: {
          title: "What's your main goal?",
          subtitle: "Help us customize your dashboard",
          options: [
            { id: 'sell', label: 'Sell Music', icon: '💰', desc: 'Monetize my creations' },
            { id: 'buy', label: 'Buy Music', icon: '🛒', desc: 'License exclusive tracks' },
            { id: 'discover', label: 'Discover', icon: '🔍', desc: 'Explore new sounds' },
            { id: 'network', label: 'Network', icon: '🤝', desc: 'Connect with creators' }
          ]
        }
      },
      buttons: {
        back: "Back",
        next: "Next",
        finish: "Complete Setup",
        skip: "Skip for now"
      }
    },
    tr: {
      welcome: "SHIROA'ya Hoş Geldiniz",
      subtitle: "Deneyiminizi kişiselleştirelim",
      steps: {
        age: {
          title: "Kaç yaşındasınız?",
          subtitle: "Müzik önerilerinizi kişiselleştirmemize yardımcı olun",
          placeholder: "25"
        },
        location: {
          title: "Nerelisiniz?",
          subtitle: "Bölgenizdeki yaratıcılarla bağlantı kurun",
          placeholder: "İstanbul, Türkiye"
        },
        role: {
          title: "Sizi en iyi hangisi tanımlar?",
          subtitle: "SHIROA'daki birincil rolünüzü seçin",
          options: [
            { id: 'producer', label: 'Prodüktör', icon: '🎵', desc: 'Beat yarat ve sat' },
            { id: 'artist', label: 'Sanatçı', icon: '🎤', desc: 'Projeler için parça bul' },
            { id: 'listener', label: 'Dinleyici', icon: '🎧', desc: 'Yeni müzik keşfet' },
            { id: 'label', label: 'Label Yöneticisi', icon: '🏢', desc: 'Sanatçı kataloğu yönet' }
          ]
        },
        purpose: {
          title: "Ana hedefiniz nedir?",
          subtitle: "Kontrol panelinizi özelleştirmemize yardımcı olun",
          options: [
            { id: 'sell', label: 'Müzik Sat', icon: '💰', desc: 'Yaratımlarımdan para kazan' },
            { id: 'buy', label: 'Müzik Al', icon: '🛒', desc: 'Özel parçaları lisansla' },
            { id: 'discover', label: 'Keşfet', icon: '🔍', desc: 'Yeni sesler keşfet' },
            { id: 'network', label: 'Ağ Kur', icon: '🤝', desc: 'Yaratıcılarla bağlantı kur' }
          ]
        }
      },
      buttons: {
        back: "Geri",
        next: "İleri",
        finish: "Kurulumu Tamamla",
        skip: "Şimdilik atla"
      }
    }
  };

  const currentContent = content[language];

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
        <div style="font-size: 24px; margin-bottom: 8px;">${language === 'tr' ? 'SHIROA\'ya Hoş Geldiniz!' : 'Welcome to SHIROA!'}</div>
        <div style="font-size: 16px; opacity: 0.9;">${language === 'tr' ? 'Profiliniz artık tamamlandı' : 'Your profile is now complete'}</div>
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

  const getStepIcon = () => {
    switch (step) {
      case 1: return Calendar;
      case 2: return MapPin;
      case 3: return Briefcase;
      case 4: return Target;
      default: return Sparkles;
    }
  };

  const StepIcon = getStepIcon();

  return (
    <div className="min-h-screen theme-bg flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        
        {/* Header Card */}
        <div className="glass-card rounded-3xl p-8 mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Sparkles className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold theme-text font-orbitron">
              {currentContent.welcome}
            </h1>
          </div>
          <p className="theme-text-secondary text-xl mb-6">{currentContent.subtitle}</p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm theme-text-secondary">Step {step} of 4</span>
              <span className="text-sm theme-text-secondary">{Math.round((step / 4) * 100)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="glass-card rounded-3xl p-8 md:p-12 min-h-[500px] flex flex-col justify-center">
          
          {/* Step Icon & Title */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
              <StepIcon size={40} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold theme-text mb-4 font-orbitron">
              {step === 1 && currentContent.steps.age.title}
              {step === 2 && currentContent.steps.location.title}
              {step === 3 && currentContent.steps.role.title}
              {step === 4 && currentContent.steps.purpose.title}
            </h2>
            <p className="theme-text-secondary text-lg">
              {step === 1 && currentContent.steps.age.subtitle}
              {step === 2 && currentContent.steps.location.subtitle}
              {step === 3 && currentContent.steps.role.subtitle}
              {step === 4 && currentContent.steps.purpose.subtitle}
            </p>
          </div>

          {/* Step Content */}
          <div className="flex-1 flex items-center justify-center">
            
            {/* Step 1: Age */}
            {step === 1 && (
              <div className="max-w-xs mx-auto w-full">
                <input
                  type="number"
                  min="13"
                  max="100"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-8 py-6 text-3xl text-center theme-bg-secondary rounded-2xl theme-text focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all"
                  placeholder={currentContent.steps.age.placeholder}
                />
                <p className="text-sm theme-text-secondary mt-4 text-center">
                  {language === 'tr' ? '13 yaş ve üzeri olmalı' : 'Must be 13 or older'}
                </p>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="max-w-md mx-auto w-full">
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-8 py-6 text-xl text-center theme-bg-secondary rounded-2xl theme-text focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all"
                  placeholder={currentContent.steps.location.placeholder}
                />
              </div>
            )}

            {/* Step 3: Role */}
            {step === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {currentContent.steps.role.options.map((role) => (
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
            )}

            {/* Step 4: Purpose */}
            {step === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {currentContent.steps.purpose.options.map((purpose) => (
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
            )}
          </div>
        </div>

        {/* Navigation Card */}
        <div className="glass-card rounded-3xl p-6 mt-8">
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 theme-button-outline rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all"
            >
              <ChevronLeft size={20} />
              {currentContent.buttons.back}
            </button>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i <= step ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            {step === 4 ? (
              <button
                onClick={handleFinish}
                disabled={!isStepValid()}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl font-semibold disabled:opacity-50 hover:scale-105 transition-all shadow-lg"
              >
                <Check size={20} />
                {currentContent.buttons.finish}
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl font-semibold disabled:opacity-50 hover:scale-105 transition-all"
              >
                {currentContent.buttons.next}
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {/* Skip Option */}
          <div className="text-center mt-4">
            <button
              onClick={() => router.push('/discover')}
              className="theme-text-secondary hover:theme-text text-sm transition-colors underline"
            >
              {currentContent.buttons.skip}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}