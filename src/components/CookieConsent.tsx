import React, { useState, useEffect } from 'react';
import { Shield, Check, X, Settings } from 'lucide-react';
import { initAnalytics } from '../utils/analytics';

interface CookieConsentProps {
  onOpenPrivacy?: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacy }) => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showPreferences, setShowPreferences] = useState<boolean>(false);
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean>(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('skumar_cookie_consent');
      if (!saved) {
        // Show banner after 2 seconds for fresh visitors
        const timer = setTimeout(() => setShowBanner(true), 2000);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(saved);
        if (parsed.analytics) {
          initAnalytics();
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = { necessary: true, analytics: true, timestamp: new Date().toISOString() };
    try {
      localStorage.setItem('skumar_cookie_consent', JSON.stringify(consent));
    } catch {}
    initAnalytics();
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    const consent = { necessary: true, analytics: false, timestamp: new Date().toISOString() };
    try {
      localStorage.setItem('skumar_cookie_consent', JSON.stringify(consent));
    } catch {}
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    const consent = { necessary: true, analytics: analyticsConsent, timestamp: new Date().toISOString() };
    try {
      localStorage.setItem('skumar_cookie_consent', JSON.stringify(consent));
    } catch {}
    if (analyticsConsent) {
      initAnalytics();
    }
    setShowPreferences(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-[90] animate-fade-slide-up">
      <div className="glass-panel p-6 rounded-[28px] border border-white shadow-2xl bg-white/95 text-[#171717] space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#B89563]" />
            <span className="tracking-label text-[10px] text-[#B89563] font-bold">
              PRIVACY & COOKIES PREFERENCES
            </span>
          </div>
          <button
            onClick={handleAcceptNecessary}
            aria-label="Close cookie consent banner"
            className="p-1 rounded-full text-stone-500 hover:text-[#171717] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!showPreferences ? (
          <>
            <p className="text-xs text-[#333330] leading-relaxed font-light">
              We use necessary cookies for essential website functions and optional privacy-respecting analytics to optimize user experience. Learn more in our{' '}
              <button
                type="button"
                onClick={() => onOpenPrivacy?.()}
                className="text-[#967546] font-semibold underline hover:text-[#171717] transition-colors"
              >
                Privacy Policy
              </button>.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                onClick={handleAcceptAll}
                className="w-full sm:w-auto flex-1 bg-[#B89563] hover:bg-[#171717] text-white py-2.5 px-4 rounded-full text-[10px] tracking-label font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>ACCEPT ALL</span>
              </button>
              <button
                onClick={handleAcceptNecessary}
                className="w-full sm:w-auto bg-stone-100 hover:bg-stone-200 text-[#171717] border border-stone-300 py-2.5 px-4 rounded-full text-[10px] tracking-label font-semibold transition-all"
              >
                NECESSARY ONLY
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="p-2.5 text-stone-600 hover:text-[#B89563] rounded-full border border-stone-200 transition-colors"
                title="Customize Cookie Settings"
                aria-label="Customize Cookie Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-100/80 border border-stone-200">
                <div>
                  <span className="text-xs font-bold text-[#171717] block">Essential Cookies</span>
                  <span className="text-[10px] text-stone-600">Strictly necessary for security and core layout navigation.</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">ALWAYS ACTIVE</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-100/80 border border-stone-200">
                <div>
                  <span className="text-xs font-bold text-[#171717] block">Performance Analytics</span>
                  <span className="text-[10px] text-stone-600">Anonymous aggregate measurement to refine website speed.</span>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsConsent}
                  onChange={(e) => setAnalyticsConsent(e.target.checked)}
                  className="w-4 h-4 accent-[#B89563] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleSavePreferences}
                className="w-full bg-[#B89563] hover:bg-[#171717] text-white py-2.5 px-4 rounded-full text-[10px] tracking-label font-bold transition-all shadow-sm"
              >
                SAVE PREFERENCES
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CookieConsent;
