import React, { useState, useEffect } from 'react';
import { X, ArrowRight, MessageSquare, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { submitEstimatorForm } from '../services/formSubmission';
import { triggerCelebration } from '../utils/celebration';

interface ProjectEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectEstimatorModal: React.FC<ProjectEstimatorModalProps> = ({ isOpen, onClose }) => {
  // Single-Page Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [lookingFor, setLookingFor] = useState('Interior Design');
  const [propertyType, setPropertyType] = useState('3 BHK');
  const [areaSqFt, setAreaSqFt] = useState('1,000–2,000 sq.ft.');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('₹10–15 Lakh');
  const [notes, setNotes] = useState('');
  
  // Anti-Spam Protections
  const [honeypot, setHoneypot] = useState('');
  const [mountTime] = useState<number>(Date.now());

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lifecycle Animation state: 'unmounted' | 'entering' | 'entered' | 'exiting'
  const [modalStatus, setModalStatus] = useState<'unmounted' | 'entering' | 'entered' | 'exiting'>('unmounted');

  useEffect(() => {
    if (isOpen) {
      setModalStatus('entering');
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        setModalStatus('entered');
      }, 30);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      if (modalStatus === 'entered' || modalStatus === 'entering') {
        setModalStatus('exiting');
        const timer = setTimeout(() => {
          setModalStatus('unmounted');
          document.body.style.overflow = '';
        }, 380);

        return () => {
          clearTimeout(timer);
          document.body.style.overflow = '';
        };
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleAnimatedClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, modalStatus]);

  const markAsSeen = () => {
    try {
      localStorage.setItem('s_kumar_inquiry_seen', 'true');
    } catch {
      // Ignore
    }
  };

  const handleAnimatedClose = () => {
    markAsSeen();
    if (modalStatus === 'exiting' || modalStatus === 'unmounted') return;
    setModalStatus('exiting');
    setTimeout(() => {
      onClose();
      setModalStatus('unmounted');
      document.body.style.overflow = '';
    }, 380);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    // Anti-Spam Check 1: Honeypot field filled
    if (honeypot.trim() !== '') {
      // Silent rejection for automated bot fillers
      setSubmitted(true);
      return;
    }

    // Anti-Spam Check 2: Submission submitted too quickly (under 1.5 seconds)
    if (Date.now() - mountTime < 1500) {
      setError('Form submitted too fast. Please take a moment to review your details.');
      return;
    }

    if (!name.trim() || !phone.trim()) {
      setError('Please provide your name and phone number so our team can get in touch.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await submitEstimatorForm({
        name,
        phone,
        lookingFor,
        propertyType,
        areaSqFt,
        location,
        budget,
        notes,
        website_hp: honeypot
      });

      markAsSeen();
      setSubmitted(true);
      triggerCelebration();
      trackEvent('inquiry_submitted', { service: lookingFor, budget: budget });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit your enquiry. Please try again or reach out on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSend = () => {
    const text = `Hello S Kumar Studio,%0A%0ANew Project Inquiry:%0A- Name: ${name}%0A- Phone: ${phone}%0A- Scope: ${lookingFor}%0A- Property: ${propertyType}%0A- Area: ${areaSqFt}%0A- Location: ${location || 'Ahmedabad'}%0A- Budget: ${budget}%0A- Notes: ${notes || 'N/A'}`;
    window.open(`https://wa.me/919898966648?text=${text}`, '_blank');
  };

  if (modalStatus === 'unmounted') return null;

  const isExiting = modalStatus === 'exiting';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* AMBIENT WARM ARCHITECTURAL LIGHTING GLOW */}
      <div className={`absolute w-[600px] h-[600px] bg-[#B89563]/20 rounded-full blur-[110px] pointer-events-none transition-all duration-500 ${
        isExiting ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
      }`} />

      {/* 1. LIGHT FROSTED BACKDROP */}
      <div
        onClick={handleAnimatedClose}
        className={`fixed inset-0 bg-stone-950/45 backdrop-blur-md ${
          isExiting ? 'animate-backdrop-fade-out' : 'animate-backdrop-fade-in'
        }`}
      />

      {/* 2. ARCHITECTURAL LIGHT FROSTED GLASS CONTAINER */}
      <div
        className={`relative w-full max-w-4xl bg-[#F8F5EF]/95 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-white/80 overflow-hidden z-10 my-auto ${
          isExiting ? 'animate-modal-pop-out' : 'animate-modal-pop-in'
        }`}
      >
        {/* CUSTOM LIGHT GLASS CLOSE BUTTON */}
        <button
          onClick={handleAnimatedClose}
          aria-label="Close inquiry form"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 w-9 h-9 rounded-full border border-stone-200 bg-white/80 backdrop-blur-md text-[#171717] flex items-center justify-center hover:bg-[#171717] hover:text-white hover:scale-105 transition-all duration-300 group focus:outline-none shadow-sm"
        >
          <X className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
        </button>

        {/* TWO-COLUMN EDITORIAL FORM LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
          
          {/* LEFT SIDE: Architectural Visual & Attached Glass Badge */}
          <div className="hidden lg:block lg:col-span-5 relative overflow-hidden bg-[#F5F1E8]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
              alt="S Kumar Architectural Interior Studio"
              className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
                !isExiting ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />

            {/* Glass Info Panel Attached to Image */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B89563]" />
                <span className="tracking-label text-[10px] text-stone-200">
                  S KUMAR INTERIORS
                </span>
              </div>

              <div className="glass-panel p-6 rounded-2xl space-y-2 border border-white/40 text-[#171717]">
                <div className="flex items-center gap-2 text-[#B89563]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="tracking-label text-[10px] font-semibold">Architectural Consultation</span>
                </div>
                <blockquote className="font-sans font-medium text-base text-[#171717] leading-snug">
                  "Creating spaces with intention — from civil structure to turnkey joinery."
                </blockquote>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Single-Page Fast Inquiry Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between max-h-[85vh] overflow-y-auto">

            {submitted ? (
              /* SUCCESS STATE */
              <div className="my-auto py-10 text-center space-y-6 animate-fade-in">
                <div className="w-16 h-16 bg-[#B89563]/20 text-[#B89563] rounded-full flex items-center justify-center mx-auto border border-[#B89563]/40">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>

                <div className="space-y-2">
                  <span className="tracking-label text-xs text-[#B89563] block font-semibold">
                    INQUIRY RECEIVED
                  </span>
                  <h3 className="font-sans text-2xl sm:text-3xl font-bold text-[#171717]">
                    THANK YOU, {name || 'VALUED CLIENT'}.
                  </h3>
                  <p className="text-sm font-semibold text-[#B89563]">
                    Thank you! Your enquiry has been submitted successfully.
                  </p>
                  <p className="text-xs text-[#333330] max-w-md mx-auto leading-relaxed pt-1">
                    Your inquiry for <strong>{propertyType}</strong> ({lookingFor}) in {location || 'Ahmedabad'} has been sent. Our principal design team will get in touch with you shortly.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleWhatsAppSend}
                    className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors px-6 py-3.5 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 rounded-full shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant WhatsApp Connect</span>
                  </button>
                  <button
                    onClick={handleAnimatedClose}
                    className="w-full sm:w-auto border border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-white transition-colors px-6 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-full"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              /* ONE-PAGE FAST FORM */
              <div className="space-y-5">
                
                {/* Header & Eyebrow */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="tracking-label text-[10px] text-[#B89563] font-semibold">
                      S KUMAR INTERIORS & CONSTRUCTION
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-stone-600 bg-stone-200/70 px-2.5 py-0.5 rounded-full">
                      <Clock className="w-3 h-3 text-[#B89563]" />
                      Takes ~30 seconds
                    </span>
                  </div>
                  <h2 id="modal-heading" className="font-sans text-2xl sm:text-3xl font-medium text-[#171717] tracking-tight">
                    LET'S TALK ABOUT YOUR PROJECT.
                  </h2>
                  <p className="text-xs text-[#333330]">
                    Tell us a little about your project. Our team will get in touch with you shortly.
                  </p>
                </div>

                {error && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg animate-fade-in">
                    {error}
                  </div>
                )}

                {/* FORM FIELDS (2-COLUMN RESPONSIVE GRID) */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  
                  {/* Honeypot field for bot trap */}
                  <input
                    type="text"
                    name="website_hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="opacity-0 absolute -z-10 pointer-events-none w-0 h-0 p-0 m-0"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  
                  {/* FIELD 01: NAME & FIELD 02: PHONE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="name" className="tracking-label text-[10px] text-[#333330] block">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/90 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] placeholder-stone-400 focus:outline-none focus:border-[#B89563] focus:bg-white transition-all shadow-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="phone" className="tracking-label text-[10px] text-[#333330] block">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white/90 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] placeholder-stone-400 focus:outline-none focus:border-[#B89563] focus:bg-white transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* FIELD 03: WHAT ARE YOU LOOKING FOR? & FIELD 04: PROPERTY TYPE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="lookingFor" className="tracking-label text-[10px] text-[#333330] block">
                        Service Required *
                      </label>
                      <select
                        id="lookingFor"
                        value={lookingFor}
                        onChange={(e) => setLookingFor(e.target.value)}
                        className="w-full bg-white/90 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#B89563] focus:bg-white transition-all shadow-sm font-medium"
                      >
                        <option value="Interior Design">Interior Design</option>
                        <option value="Civil Construction">Civil Construction</option>
                        <option value="Furniture & Joinery (Woodwork)">Furniture & Joinery (Woodwork)</option>
                        <option value="Turnkey (Construction + Interior + Joinery)">Turnkey (Construction + Interior + Joinery)</option>
                        <option value="PVC Work (Wall Panels & Ceilings)">PVC Work (Wall Panels & Ceilings)</option>
                        <option value="Renovation & Remodeling">Renovation & Remodeling</option>
                        <option value="Commercial Project">Commercial Project</option>
                        <option value="Other / Multiple Services">Other / Multiple Services</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="propertyType" className="tracking-label text-[10px] text-[#333330] block">
                        Property Type *
                      </label>
                      <select
                        id="propertyType"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full bg-white/90 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#B89563] focus:bg-white transition-all shadow-sm"
                      >
                        <option value="1 BHK">1 BHK</option>
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4 BHK+">4 BHK+</option>
                        <option value="Bungalow / Villa">Bungalow / Villa</option>
                        <option value="Office">Office</option>
                        <option value="Shop / Showroom">Shop / Showroom</option>
                        <option value="Restaurant / Café">Restaurant / Café</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Hospital / Clinic">Hospital / Clinic</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* FIELD 05: APPROX AREA & FIELD 06: LOCATION */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="areaSqFt" className="tracking-label text-[10px] text-[#333330] block">
                        Approx. Area
                      </label>
                      <select
                        id="areaSqFt"
                        value={areaSqFt}
                        onChange={(e) => setAreaSqFt(e.target.value)}
                        className="w-full bg-white/90 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#B89563] focus:bg-white transition-all shadow-sm"
                      >
                        <option value="Under 500 sq.ft.">Under 500 sq.ft.</option>
                        <option value="500–1,000 sq.ft.">500–1,000 sq.ft.</option>
                        <option value="1,000–2,000 sq.ft.">1,000–2,000 sq.ft.</option>
                        <option value="2,000–5,000 sq.ft.">2,000–5,000 sq.ft.</option>
                        <option value="5,000+ sq.ft.">5,000+ sq.ft.</option>
                        <option value="Not sure">Not sure</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="location" className="tracking-label text-[10px] text-[#333330] block">
                        Project Location
                      </label>
                      <input
                        id="location"
                        type="text"
                        placeholder="Ahmedabad, Satellite"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-white/90 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] placeholder-stone-400 focus:outline-none focus:border-[#B89563] focus:bg-white transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* FIELD 07: BUDGET — REVISED EXACT RANGES */}
                  <div className="space-y-1">
                    <label htmlFor="budget" className="tracking-label text-[10px] text-[#333330] block">
                      Budget Range *
                    </label>
                    <select
                      id="budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-white/90 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#B89563] focus:bg-white transition-all shadow-sm font-medium"
                    >
                      <option value="Below ₹10 Lakh">Below ₹10 Lakh</option>
                      <option value="₹10–15 Lakh">₹10–15 Lakh</option>
                      <option value="₹15–20 Lakh">₹15–20 Lakh</option>
                      <option value="₹20–30 Lakh">₹20–30 Lakh</option>
                      <option value="Above ₹30 Lakh">Above ₹30 Lakh</option>
                    </select>
                  </div>

                  {/* FIELD 08: OPTIONAL NOTES */}
                  <div className="space-y-1">
                    <label htmlFor="notes" className="tracking-label text-[10px] text-[#333330] block">
                      Tell us about your project <span className="text-stone-600 font-medium lowercase">(optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      rows={2}
                      placeholder="Anything you'd like us to know?"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-white/90 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-[#171717] placeholder-stone-400 focus:outline-none focus:border-[#B89563] focus:bg-white transition-all shadow-sm"
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full group relative inline-flex items-center justify-between px-8 py-3.5 bg-[#B89563] text-white hover:bg-[#171717] transition-all duration-300 text-xs font-bold tracking-widest uppercase rounded-full shadow-lg ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      <span>{isSubmitting ? 'SENDING...' : 'START A CONVERSATION'}</span>
                      <ArrowRight className={`w-4 h-4 transform group-hover:translate-x-1.5 transition-transform ${isSubmitting ? 'animate-pulse' : ''}`} />
                    </button>
                  </div>
                </form>

              </div>
            )}

            {/* Footer Confidentiality Note */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-[10px] font-mono text-[#B89563]">
              <span>Privacy Guaranteed</span>
              <span>Ahmedabad • Gandhinagar</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectEstimatorModal;
