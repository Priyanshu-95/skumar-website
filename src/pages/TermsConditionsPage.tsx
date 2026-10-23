import React from 'react';
import { FileText, Shield, AlertCircle, ArrowLeft } from 'lucide-react';

interface TermsConditionsPageProps {
  setActiveTab?: (tab: string) => void;
  onOpenEstimator?: () => void;
}

export const TermsConditionsPage: React.FC<TermsConditionsPageProps> = ({ setActiveTab, onOpenEstimator }) => {
  return (
    <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-24 bg-[#F5F1E8] text-[#171717] min-h-screen relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="ambient-glow-warm top-24 left-10" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        {/* Back Link */}
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

        {/* Page Header */}
        <div className="space-y-4 border-b border-stone-300 pb-8">
          <div className="glass-capsule inline-flex items-center gap-2 px-3.5 py-1.5 border border-white bg-white/90 shadow-sm">
            <FileText className="w-3.5 h-3.5 text-[#B89563]" />
            <span className="tracking-label text-[10px] text-[#B89563] font-bold">LEGAL AGREEMENT</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-medium leading-tight text-[#171717]">
            Terms and Conditions
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-light">
            Last Updated: October 2026 | S Kumar Construction & Interior
          </p>
        </div>

        {/* Notice Alert Box */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-semibold text-amber-950">
            <AlertCircle className="w-4 h-4 text-[#B89563]" />
            <span>Important Distinction: Website Inquiry vs. Binding Contract</span>
          </div>
          <p>
            Submitting a project enquiry or budget calculation on this website does <strong>not</strong> constitute a binding commercial contract, booking, or fixed pricing commitment. All formal construction and interior design projects require a separate, signed physical/digital agreement detailing civil specs, material bills of quantities (BOQ), and agreed milestones.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-stone-800 leading-relaxed text-sm">
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#171717] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B89563]" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and navigating the S Kumar Construction & Interior website (the "Site"), you agree to comply with and be bound by these Terms and Conditions. If you disagree with any part of these terms, please refrain from using our website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#171717] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B89563]" />
              2. Website Scope & Information
            </h2>
            <p>
              The content provided on this Site—including service descriptions, budget estimators, project portfolio photographs, material options (Teak, PVC, Laminates), and architectural guides—is provided for general informational and preliminary planning purposes.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
              <li>Visual renderings and site photographs depict actual completed projects or architectural proposals by S Kumar Construction & Interior.</li>
              <li>Actual project cost estimates may vary based on site measurements, market material fluctuations, custom joinery, and structural conditions.</li>
              <li>Interior Design services are offered Pan India, while full Turnkey Civil Construction operates predominantly across Gujarat (Ahmedabad, Gandhinagar, & surrounding regions).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#171717] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B89563]" />
              3. Enquiry Submissions & Quotations
            </h2>
            <p>
              When you submit a project enquiry through our website forms or WhatsApp links:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
              <li>You agree to provide true, accurate, and current contact details.</li>
              <li>Estimates provided online or over initial consultation calls are indicative and subject to site inspection.</li>
              <li>A project is officially commenced only after a formal agreement, scope of work document, and initial deposit are executed between both parties.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#171717] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B89563]" />
              4. Intellectual Property
            </h2>
            <p>
              All photographs, logos, brand assets, architectural plans, textual content, and custom web components on this website are the intellectual property of <strong>S Kumar Construction & Interior</strong>. Unauthorized reproduction, distribution, scraping, or commercial misuse of our project imagery or design collateral is strictly prohibited without explicit written consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#171717] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B89563]" />
              5. Limitation of Liability
            </h2>
            <p>
              While we strive to keep all information on this Site accurate and up to date, S Kumar Construction & Interior accepts no liability for errors, omissions, technical interruptions, or decisions made based solely on unverified website estimates.
            </p>
          </section>

          <section className="space-y-3 border-t border-stone-200 pt-6">
            <h2 className="text-xl font-semibold text-[#171717] flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#B89563]" />
              6. Contact & Legal Review Note
            </h2>
            <p className="text-xs text-stone-600 italic leading-relaxed">
              Notice: These terms govern website usage. For specific legal contract inquiries regarding ongoing construction or interior contracts, please contact S Kumar Construction & Interior management directly at <strong>+91 98989 66648</strong> or visit our office at Office No 424, Devnandan Mall, Opp. Sanyas Ashram, Ashram Road, Ellisbridge, Ahmedabad, Gujarat 380006.
            </p>
          </section>

        </div>

        {/* CTA Callout */}
        <div className="p-8 rounded-3xl bg-[#171717] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-sans text-lg font-medium text-white">Have questions about your project scope?</h3>
            <p className="text-xs text-stone-400">Speak directly with our technical & architectural consultation team.</p>
          </div>
          <button
            onClick={onOpenEstimator}
            className="px-6 py-3 bg-[#B89563] text-white text-xs uppercase font-bold tracking-widest rounded-full hover:bg-white hover:text-[#171717] transition-all whitespace-nowrap"
          >
            Start Consultation
          </button>
        </div>

      </div>
    </div>
  );
};
