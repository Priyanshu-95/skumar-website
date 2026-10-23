import React from 'react';
import { Shield, CheckCircle2, ArrowLeft } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

interface PrivacyPolicyPageProps {
  setActiveTab?: (tab: string) => void;
  onOpenEstimator?: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ setActiveTab, onOpenEstimator }) => {
  return (
    <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-20 bg-[#F5F1E8] text-[#171717] space-y-16 relative overflow-hidden">
      {/* Ambient Lighting Glow */}
      <div className="ambient-glow-warm top-20 right-10" />

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 space-y-5">
        {setActiveTab && (
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('home');
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#B89563] hover:text-[#171717] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </a>
        )}

        <div className="glass-capsule inline-flex items-center gap-2.5 px-4 py-1.5 border border-white bg-white/90 shadow-sm">
          <Shield className="w-3.5 h-3.5 text-[#967546]" />
          <span className="tracking-label text-[10px] text-[#967546] font-bold">
            LEGAL & GOVERNANCE
          </span>
        </div>

        <h1 className="font-sans text-3xl sm:text-5xl font-medium leading-[1.14] tracking-tight text-[#171717]">
          Privacy Policy
        </h1>

        <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
          Last Updated: October 2026 • S Kumar Construction & Interior Studio
        </p>
      </section>

      {/* Main Policy Body */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <ScrollReveal>
          <div className="glass-panel p-8 sm:p-12 rounded-[36px] border border-white bg-white/90 shadow-xl text-[#171717] space-y-10">
            
            {/* Intro */}
            <div className="space-y-4">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#171717]">1. Introduction & Overview</h2>
              <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                At <strong>S Kumar Construction & Interior</strong> ("Studio", "we", "our", or "us"), we respect your personal privacy and are committed to safeguarding all customer data shared with our architecture, interior design, and turnkey execution teams in Ahmedabad, Gandhinagar, and across India.
              </p>
            </div>

            {/* Information Collected */}
            <div className="space-y-4 border-t border-stone-200 pt-8">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#171717]">2. Information We Collect</h2>
              <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                When you initiate a project enquiry, request a budget estimate, or contact our principal studio, we collect the following details submitted explicitly through our forms:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#171717] font-medium pt-1">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#B89563] shrink-0" /> Full Name and Contact Details (Phone / WhatsApp number, Email address).</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#B89563] shrink-0" /> Project Scope Specifications (Construction, Interior Design, Wooden Work, PVC Work, Turnkey).</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#B89563] shrink-0" /> Site Location (City, Colony, Carpet Area in sq.ft., Budget Selection).</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#B89563] shrink-0" /> Floorplans or architectural notes submitted voluntarily.</li>
              </ul>
            </div>

            {/* Use of Data */}
            <div className="space-y-4 border-t border-stone-200 pt-8">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#171717]">3. How We Use Your Information</h2>
              <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                Information collected is used strictly for legitimate architectural studio business purposes:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#333330] font-light">
                <li>• Preparing preliminary 3D spatial layout proposals and turnkey budget estimates.</li>
                <li>• Scheduling site measurement visits in Ahmedabad and Gandhinagar.</li>
                <li>• Communicating design concepts and material specifications via WhatsApp or phone.</li>
                <li>• Fulfilling contractual obligations for confirmed construction or interior projects.</li>
              </ul>
              <p className="text-xs text-[#333330] italic font-light pt-2">
                We never sell, rent, trade, or share your personal details with unverified third-party marketing companies.
              </p>
            </div>

            {/* Cookies & Analytics */}
            <div className="space-y-4 border-t border-stone-200 pt-8">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#171717]">4. Cookies & Website Analytics</h2>
              <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                We use privacy-respecting essential cookies and optional aggregated analytics (Google Analytics 4 / Tag Manager) to evaluate aggregate website traffic and loading performance. No personal form inputs, phone numbers, or confidential drawings are recorded in analytics scripts.
              </p>
            </div>

            {/* Data Security */}
            <div className="space-y-4 border-t border-stone-200 pt-8">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#171717]">5. Data Security & Confidentiality</h2>
              <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                We employ SSL/HTTPS encryption, secure server architecture, rate limiting, and restricted access protocols to protect your personal details against unauthorized disclosure.
              </p>
            </div>

            {/* User Rights */}
            <div className="space-y-4 border-t border-stone-200 pt-8">
              <h2 className="font-sans text-xl sm:text-2xl font-semibold text-[#171717]">6. Your Privacy Rights</h2>
              <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                You have the right to inspect, update, or request deletion of your personal records from our studio database at any time by contacting us directly at <a href="mailto:info@skumarinterior.com" className="text-[#967546] font-semibold underline">info@skumarinterior.com</a>.
              </p>
            </div>

            {/* Contact */}
            <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#333330]">
                <strong className="text-[#171717] block">S Kumar Construction & Interior Studio</strong>
                414, Antilia Business Hub, S.P. Ring Road, Nana Chiloda Circle, Ahmedabad, Gujarat 382330
              </div>
              <button
                onClick={onOpenEstimator}
                className="px-6 py-3 bg-[#B89563] text-white hover:bg-[#171717] transition-colors text-[10px] tracking-label font-bold rounded-full shadow-md shrink-0"
              >
                START A CONVERSATION
              </button>
            </div>

          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
