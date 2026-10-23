import React, { useState } from 'react';
import { OFFICE_LOCATIONS } from '../data/officeLocations';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { submitContactForm } from '../services/formSubmission';
import { triggerCelebration } from '../utils/celebration';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Residential Interior Design',
    location: 'Ahmedabad',
    budget: 'Below ₹10 Lakh',
    areaSqFt: '',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [mountTime] = useState<number>(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (honeypot.trim() !== '') {
      setSubmitted(true);
      return;
    }

    if (Date.now() - mountTime < 1500) {
      setFormError('Submission submitted too quickly. Please review your details.');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    try {
      await submitContactForm({
        ...formData,
        website_hp: honeypot
      });

      setSubmitted(true);
      triggerCelebration();
      trackEvent('inquiry_submitted', { service: formData.projectType, budget: formData.budget, page: 'contact' });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Unable to submit your enquiry. Please try again or reach out on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectWhatsApp = () => {
    const text = `Hello S Kumar Studio,%0A%0AI would like to start a project inquiry:%0A- Name: ${formData.name || 'N/A'}%0A- Phone: ${formData.phone || 'N/A'}%0A- Project Type: ${formData.projectType}%0A- City: ${formData.location}%0A- Area: ${formData.areaSqFt || 'N/A'} sq.ft.%0A- Details: ${formData.message || 'N/A'}`;
    window.open(`https://wa.me/919898966648?text=${text}`, '_blank');
  };

  const currentLoc = OFFICE_LOCATIONS[0];

  return (
    <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-20 bg-[#F5F1E8] text-[#171717] space-y-24 relative overflow-hidden">
      {/* Ambient Lighting Glow Blooms */}
      <div className="ambient-glow-warm top-20 right-10" />
      <div className="ambient-glow-warm top-1/2 -left-32" />

      {/* 1. HEADER */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-6">
        <div className="glass-capsule inline-flex items-center gap-3 px-4 py-2 border border-white bg-white/90 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#967546]" />
          <span className="tracking-label text-[10px] text-[#967546] font-bold">
            INITIATE CONVERSATION
          </span>
        </div>

        <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.14] tracking-tight text-[#171717] max-w-4xl">
          Let's Create <br />
          <span className="text-[#B89563] font-light">Your Space Together.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#333330] max-w-2xl leading-relaxed font-light">
          Tell us about your residential or commercial project in Ahmedabad, Gandhinagar, or Gujarat. Our principal architect will contact you within 24 hours.
        </p>
      </section>

      {/* 2. MAIN FORM & DIRECT INFO SPLIT */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Side (Light Frosted Glass Container) */}
          <div className="lg:col-span-7 glass-deep p-8 md:p-12 rounded-[40px] border border-white shadow-2xl bg-white/85 text-[#171717]">
            {submitted ? (
              <div className="py-12 text-center space-y-6 animate-fade-in">
                <div className="w-16 h-16 bg-[#B89563]/20 text-[#B89563] rounded-full flex items-center justify-center mx-auto border border-[#B89563]/40">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <span className="tracking-label text-xs text-[#B89563] block font-semibold">INQUIRY RECEIVED</span>
                  <h2 className="font-sans text-3xl font-semibold text-[#171717]">
                    Thank You, {formData.name}!
                  </h2>
                  <p className="text-sm font-semibold text-[#B89563]">
                    Thank you! Your enquiry has been submitted successfully.
                  </p>
                  <p className="text-xs sm:text-sm text-[#333330] max-w-md mx-auto leading-relaxed pt-1">
                    Thank you for reaching out regarding your <strong>{formData.projectType}</strong> project in {formData.location}. Our studio design team will review your requirements and respond shortly.
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleDirectWhatsApp}
                    className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors px-8 py-4 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 rounded-full shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant WhatsApp Chat</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        projectType: 'Residential Interior Design',
                        location: 'Ahmedabad',
                        budget: 'Below ₹10 Lakh',
                        areaSqFt: '',
                        message: ''
                      });
                      setFormError(null);
                    }}
                    className="w-full sm:w-auto glass-capsule border border-stone-300 text-[#171717] hover:bg-[#171717] hover:text-white transition-colors px-8 py-4 text-xs uppercase tracking-widest font-semibold rounded-full"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot anti-spam trap */}
                <input
                  type="text"
                  name="website_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="opacity-0 absolute -z-10 pointer-events-none w-0 h-0 p-0 m-0"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                    {formError}
                  </div>
                )}

                <div className="border-b border-stone-200 pb-4">
                  <span className="tracking-label text-[10px] text-[#B89563] block">S KUMAR STUDIO</span>
                  <h2 className="font-sans text-2xl md:text-3xl font-semibold text-[#171717] tracking-tight">
                    Project Inquiry Form
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-full-name" className="tracking-label text-[10px] text-[#333330] block">
                      Full Name *
                    </label>
                    <input
                      id="contact-full-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="e.g. Rajesh Shah"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/90 border border-stone-300 rounded-xl px-4 py-3 text-xs text-[#171717] placeholder-stone-400 focus:outline-none focus:border-[#B89563] transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-phone" className="tracking-label text-[10px] text-[#333330] block">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="+91 98989 66648"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/90 border border-stone-300 rounded-xl px-4 py-3 text-xs text-[#171717] placeholder-stone-400 focus:outline-none focus:border-[#B89563] transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="tracking-label text-[10px] text-[#333330] block">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/90 border border-stone-300 rounded-xl px-4 py-3 text-xs text-[#171717] placeholder-stone-400 focus:outline-none focus:border-[#B89563] transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-project-type" className="tracking-label text-[10px] text-[#333330] block">
                      Service / Project Type *
                    </label>
                    <select
                      id="contact-project-type"
                      name="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-white/90 border border-stone-300 rounded-xl px-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#B89563] transition-all shadow-sm font-medium"
                    >
                      <option value="Wooden Work & Custom Furniture">Wooden Work & Custom Furniture</option>
                      <option value="Residential Interior Design">Residential Interior Design</option>
                      <option value="Turnkey Execution (Construction + Interior + Woodwork)">Turnkey Execution (Construction + Interior + Woodwork)</option>
                      <option value="Civil Construction & Architecture">Civil Construction & Architecture</option>
                      <option value="2 BHK / 3 BHK Residential">2 BHK / 3 BHK Residential</option>
                      <option value="4 BHK / Luxury Villa">4 BHK / Luxury Villa</option>
                      <option value="Corporate Office / Commercial">Corporate Office / Commercial</option>
                      <option value="PVC Work (Wall Panels & Ceilings)">PVC Work (Wall Panels & Ceilings)</option>
                      <option value="Other / Multiple Services">Other / Multiple Services</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-location" className="tracking-label text-[10px] text-[#333330] block">
                      Site Location *
                    </label>
                    <select
                      id="contact-location"
                      name="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-white/90 border border-stone-300 rounded-xl px-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#B89563] transition-all shadow-sm"
                    >
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Gandhinagar">Gandhinagar</option>
                      <option value="Pan India (Interior Design)">Pan India (Interior Design)</option>
                      <option value="Other Gujarat City">Other Gujarat City</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-budget" className="tracking-label text-[10px] text-[#333330] block">
                      Budget Range *
                    </label>
                    <select
                      id="contact-budget"
                      name="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-white/90 border border-stone-300 rounded-xl px-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#B89563] transition-all shadow-sm font-medium"
                    >
                      <option value="Below ₹10 Lakh">Below ₹10 Lakh</option>
                      <option value="₹10–15 Lakh">₹10–15 Lakh</option>
                      <option value="₹15–20 Lakh">₹15–20 Lakh</option>
                      <option value="₹20–30 Lakh">₹20–30 Lakh</option>
                      <option value="Above ₹30 Lakh">Above ₹30 Lakh</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-message" className="tracking-label text-[10px] text-[#333330] block">
                    Project Requirements / Vision
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Describe your design expectations, civil scope, or target possession date..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/90 border border-stone-300 rounded-xl px-4 py-3 text-xs text-[#171717] placeholder-stone-400 focus:outline-none focus:border-[#B89563] transition-all shadow-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handleDirectWhatsApp}
                    className="w-full sm:w-auto border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors px-6 py-4 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 rounded-full"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Connect</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto bg-[#B89563] text-white hover:bg-[#171717] transition-colors px-8 py-4 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 rounded-full shadow-lg ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    <span>{isSubmitting ? 'Submitting...' : 'Start A Conversation'}</span>
                    <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Direct Studio Contacts & Map (Light Frosted Glass Cards) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-panel p-8 rounded-[36px] border border-white space-y-6 shadow-xl bg-white/85 text-[#171717]">
              <h2 className="font-sans text-2xl text-[#171717] font-bold border-b border-stone-200 pb-3">
                Direct Studio Contacts
              </h2>

              <div className="space-y-4 text-xs text-[#333330]">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B89563] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#171717] block">Call Us Directly:</span>
                    <a href="tel:+919898966648" className="hover:text-[#B89563] transition-colors font-bold text-[#171717] text-sm">+91 98989 66648</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#B89563] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#171717] block">Email Enquiries:</span>
                    <a href="mailto:info@skumarinterior.com" className="hover:text-[#B89563] transition-colors font-medium">info@skumarinterior.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#B89563] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#171717] block">Business Hours:</span>
                    Monday – Saturday: 10:00 AM – 7:30 PM (Sun by Appointment)
                  </div>
                </div>
              </div>
            </div>

            {/* Studio Location & Map */}
            <div className="glass-panel p-6 rounded-[36px] border border-white space-y-6 shadow-xl bg-white/85 text-[#171717]">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <span className="tracking-label text-[10px] text-[#B89563]">
                  VISIT OUR STUDIO
                </span>
                <span className="text-[10px] uppercase font-mono bg-[#B89563]/15 text-[#B89563] px-2.5 py-0.5 rounded-full border border-[#B89563]/30 font-bold">
                  AHMEDABAD
                </span>
              </div>

              <div className="space-y-3 text-xs text-[#171717]">
                <h3 className="font-sans text-xl font-bold">{currentLoc.title}</h3>
                <p className="flex items-start gap-2 text-[#333330]">
                  <MapPin className="w-4 h-4 text-[#B89563] shrink-0 mt-0.5" />
                  <span className="font-medium">{currentLoc.address}</span>
                </p>
                <p className="text-[#333330] font-mono text-[11px]">Landmark: {currentLoc.landmark}</p>
              </div>

              {/* Map Container */}
              <div className="h-56 w-full rounded-2xl border border-stone-200 overflow-hidden relative bg-stone-100">
                <iframe
                  title="S Kumar Office Map Location"
                  src={currentLoc.mapIframeUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.2) contrast(1.05)' }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {currentLoc.directionsUrl && (
                <a
                  href={currentLoc.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full glass-capsule border border-stone-300 text-[#171717] hover:bg-[#B89563] hover:text-white transition-all py-3.5 text-xs tracking-label font-bold rounded-full flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>GET DIRECTIONS →</span>
                </a>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
