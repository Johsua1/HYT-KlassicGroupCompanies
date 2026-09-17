import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { MapPinIcon, MailIcon, PhoneIcon, ClockIcon, FacebookIcon, InstagramIcon, YoutubeIcon, LinkedinIcon, CheckIcon } from "@/components/ui/Icons";
import { GOLD_TINT, GOLD_DARK, GOLD, GOLD_GRAD, DARK, CHARCOAL, SLATE, MUTED, BORDER } from "@/constants/colors";
import { companies } from "@/data";

// Company email routing configuration
const COMPANY_EMAILS: Record<string, string> = {
  "brains-infinite": "bol76335@gmail.com",
  "klassic-solutions": "bol76335@gmail.com",
  "klassic-marketing": "bol76335@gmail.com",
  "westwood-development": "bol76335@gmail.com",
  "westwood-law": "bol76335@gmail.com",
  "connector": "bol76335@gmail.com",
  "green-oasis": "bol76335@gmail.com",
  "luxurious-cleaning": "bol76335@gmail.com",
  "hyt-foundation": "bol76335@gmail.com",
  "finest-fit": "bol76335@gmail.com",
  "general": "bol76335@gmail.com",
};

// Company colors for styling
const COMPANY_COLORS: Record<string, string> = {
  "brains-infinite": "#FF1493",
  "klassic-solutions": "#FFB84D",
  "klassic-marketing": "#FFB84D",
  "westwood-development": "#4A9EFF",
  "westwood-law": "#6BB6FF",
  "connector": "#FF6347",
  "green-oasis": "#4ADE80",
  "luxurious-cleaning": "#FFD93D",
  "hyt-foundation": "#FFB84D",
  "finest-fit": "#1A1A1A", // Changed to dark color for visibility
  "general": GOLD,
};

export function Contact() {
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    
    if (!selectedCompany) {
      setError("Please select a company to contact");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const targetEmail = COMPANY_EMAILS[selectedCompany] || COMPANY_EMAILS.general;
      const companyName = selectedCompany === "general" 
        ? "General Inquiry" 
        : companies.find(c => c.id === selectedCompany)?.name || "Unknown Company";

      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        to_email: targetEmail,
        to_company: companyName,
        subject: `[${companyName}] ${form.subject}`,
        message: form.message,
        reply_to: form.email,
      };

      await emailjs.send(
        'service_zu5xdwz',
        'template_3s0w7o9',
        templateParams,
        'TK1-w3bQvv7O8462F'
      );

      setSubmitted(true);
      
      setTimeout(() => {
        setForm({ name: "", email: "", subject: "", message: "" });
        setSelectedCompany("");
        setSubmitted(false);
      }, 5000);

    } catch (err) {
      console.error('Failed to send email:', err);
      setError('Failed to send message. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  const companyOptions = [
    ...companies.map(c => ({
      id: c.id,
      name: c.name,
      tagline: c.tagline,
      image: c.image,
    })),
    {
      id: "general",
      name: "General Inquiry",
      tagline: "For other questions or general information",
      image: null,
    }
  ];

  const selectedCompanyColor = COMPANY_COLORS[selectedCompany] || GOLD;

  return (
    <section 
      id="contact" 
      className="py-24 relative overflow-hidden" 
      style={{ background: "#FAFAFA" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ 
            background: `radial-gradient(circle, ${GOLD}40 0%, transparent 70%)`,
            animation: 'float 20s ease-in-out infinite',
            top: '10%',
            left: '10%',
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ 
            background: `radial-gradient(circle, #4ADE8040 0%, transparent 70%)`,
            animation: 'float 25s ease-in-out infinite reverse',
            bottom: '20%',
            right: '15%',
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl"
          style={{ 
            background: `radial-gradient(circle, #6BB6FF40 0%, transparent 70%)`,
            animation: 'float 30s ease-in-out infinite',
            top: '60%',
            left: '50%',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header with entrance animation */}
        <div 
          className="text-center max-w-2xl mx-auto mb-16"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide mb-6"
            style={{ 
              background: `${GOLD}15`,
              color: GOLD_DARK, 
              fontFamily: "var(--font-display)",
              border: `1px solid ${GOLD}30`,
            }}
          >
            ✉️ Get In Touch
          </div>
          <h2 
            className="text-4xl lg:text-5xl font-bold mb-4" 
            style={{ 
              color: DARK,
              fontFamily: "var(--font-display)",
            }}
          >
            Let's Start a Conversation
          </h2>
          <div 
            className="w-20 h-1 mx-auto mb-6 rounded-full" 
            style={{ background: GOLD_GRAD }}
          />
          <p className="text-lg" style={{ color: SLATE }}>
            Select the company you'd like to contact and we'll get back to you within 1-2 business days.
          </p>
        </div>

        {!submitted ? (
          <>
            {/* Company Selector */}
            <div 
              className="mb-12"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s ease-out 0.2s',
              }}
            >
              <h3 
                className="text-2xl font-bold text-center mb-8" 
                style={{ color: DARK, fontFamily: "var(--font-display)" }}
              >
                Who would you like to contact?
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                {companyOptions.map((company, index) => {
                  const isSelected = selectedCompany === company.id;
                  const companyColor = COMPANY_COLORS[company.id] || GOLD;
                  
                  return (
                    <button
                      key={company.id}
                      onClick={() => setSelectedCompany(company.id)}
                      className="relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 active:scale-95 group"
                      style={{
                        background: isSelected ? `${companyColor}10` : "#fff",
                        borderColor: isSelected ? companyColor : BORDER,
                        boxShadow: isSelected ? `0 8px 24px ${companyColor}30` : '0 2px 8px rgba(0,0,0,0.05)',
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                        transition: `all 0.5s ease-out ${0.3 + index * 0.05}s`,
                      }}
                    >
                      {/* Checkmark */}
                      {isSelected && (
                        <div 
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ 
                            background: companyColor,
                            animation: 'scaleIn 0.3s ease-out'
                          }}
                        >
                          <CheckIcon size={14} color="#fff" />
                        </div>
                      )}
                      
                      {/* Company Logo */}
                      {company.image && (
                        <div className="mb-3 flex justify-center">
                          <img 
                            src={company.image} 
                            alt={company.name}
                            className="h-12 w-auto object-contain transition-transform group-hover:scale-110"
                            style={{
                              filter: isSelected ? `drop-shadow(0 0 8px ${companyColor}60)` : 'none'
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Company Name */}
                      <p 
                        className="text-sm font-bold mb-1 text-center line-clamp-2"
                        style={{ 
                          color: isSelected ? companyColor : DARK,
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {company.name}
                      </p>
                      
                      {/* Tagline */}
                      <p 
                        className="text-xs text-center line-clamp-2"
                        style={{ color: SLATE }}
                      >
                        {company.tagline}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Selected Company Description */}
              {selectedCompany && (
                <div 
                  className="mt-8 max-w-2xl mx-auto p-6 rounded-xl"
                  style={{
                    background: `${selectedCompanyColor}10`,
                    border: `1px solid ${selectedCompanyColor}30`,
                    animation: 'fadeInUp 0.5s ease-out',
                  }}
                >
                  <p className="text-center font-medium" style={{ color: DARK }}>
                    Your inquiry will be sent to:{" "}
                    <span style={{ color: selectedCompanyColor, fontWeight: 'bold' }}>
                      {companyOptions.find(c => c.id === selectedCompany)?.name}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div 
              className="max-w-3xl mx-auto"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s ease-out 0.4s',
              }}
            >
              <form 
                onSubmit={handleSubmit} 
                className="p-8 rounded-2xl border backdrop-blur-sm space-y-6"
                style={{ 
                  background: "rgba(255, 255, 255, 0.8)",
                  borderColor: BORDER,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                }}
              >
                {error && (
                  <div 
                    className="p-4 rounded-lg border"
                    style={{
                      background: "#FEF2F2",
                      borderColor: "#FCA5A5",
                      animation: 'shake 0.5s ease-in-out',
                    }}
                  >
                    <p className="text-sm" style={{ color: "#DC2626" }}>{error}</p>
                  </div>
                )}
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2 group">
                    <label 
                      htmlFor="name" 
                      className="text-xs font-bold uppercase tracking-wider transition-colors" 
                      style={{ 
                        color: SLATE, 
                        fontFamily: "var(--font-display)" 
                      }}
                    >
                      Full Name *
                    </label>
                    <input 
                      id="name" 
                      type="text" 
                      required 
                      placeholder="Juan dela Cruz"
                      value={form.name} 
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      disabled={loading}
                      className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all disabled:opacity-50"
                      style={{
                        borderColor: BORDER,
                        color: DARK,
                        background: "#fff",
                        fontFamily: "var(--font-body)",
                      }}
                      onFocus={e => {
                        e.currentTarget.style.borderColor = selectedCompanyColor;
                        e.currentTarget.style.boxShadow = `0 0 0 3px ${selectedCompanyColor}15`;
                      }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = BORDER;
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label 
                      htmlFor="email" 
                      className="text-xs font-bold uppercase tracking-wider" 
                      style={{ 
                        color: SLATE, 
                        fontFamily: "var(--font-display)" 
                      }}
                    >
                      Email Address *
                    </label>
                    <input 
                      id="email" 
                      type="email" 
                      required 
                      placeholder="juan@email.com"
                      value={form.email} 
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      disabled={loading}
                      className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all disabled:opacity-50"
                      style={{
                        borderColor: BORDER,
                        color: DARK,
                        background: "#fff",
                        fontFamily: "var(--font-body)",
                      }}
                      onFocus={e => {
                        e.currentTarget.style.borderColor = selectedCompanyColor;
                        e.currentTarget.style.boxShadow = `0 0 0 3px ${selectedCompanyColor}15`;
                      }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = BORDER;
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label 
                    htmlFor="subject" 
                    className="text-xs font-bold uppercase tracking-wider" 
                    style={{ 
                      color: SLATE, 
                      fontFamily: "var(--font-display)" 
                    }}
                  >
                    Subject *
                  </label>
                  <input 
                    id="subject" 
                    type="text" 
                    required 
                    placeholder="Business Inquiry / Career / Partnership"
                    value={form.subject} 
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all disabled:opacity-50"
                    style={{
                      borderColor: BORDER,
                      color: DARK,
                      background: "#fff",
                      fontFamily: "var(--font-body)",
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = selectedCompanyColor;
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${selectedCompanyColor}15`;
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = BORDER;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label 
                    htmlFor="message" 
                    className="text-xs font-bold uppercase tracking-wider" 
                    style={{ 
                      color: SLATE, 
                      fontFamily: "var(--font-display)" 
                    }}
                  >
                    Message *
                  </label>
                  <textarea 
                    id="message" 
                    required 
                    rows={6} 
                    placeholder="Tell us how we can help you..."
                    value={form.message} 
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all resize-none disabled:opacity-50"
                    style={{
                      borderColor: BORDER,
                      color: DARK,
                      background: "#fff",
                      fontFamily: "var(--font-body)",
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = selectedCompanyColor;
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${selectedCompanyColor}15`;
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = BORDER;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !selectedCompany}
                  className="w-full py-4 rounded-xl text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none relative overflow-hidden"
                  style={{ 
                    background: selectedCompanyColor,
                    fontFamily: "var(--font-display)",
                    boxShadow: `0 8px 24px ${selectedCompanyColor}40`,
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message ✉️'
                  )}
                </button>

                {!selectedCompany && (
                  <p className="text-center text-xs" style={{ color: MUTED }}>
                    Please select a company above to continue
                  </p>
                )}
              </form>
            </div>
          </>
        ) : (
          /* Success Animation */
          <div 
            className="max-w-2xl mx-auto text-center py-20"
            style={{
              animation: 'fadeInUp 0.6s ease-out',
            }}
          >
            <div 
              className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 relative"
              style={{ 
                background: `${selectedCompanyColor}15`,
                animation: 'scaleIn 0.6s ease-out',
              }}
            >
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: selectedCompanyColor,
                  opacity: 0.2,
                  animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1)',
                }}
              />
              <CheckIcon size={48} color={selectedCompanyColor} />
            </div>
            
            <h3 
              className="text-3xl font-bold mb-4" 
              style={{ 
                color: DARK, 
                fontFamily: "var(--font-display)" 
              }}
            >
              Message Sent Successfully! 🎉
            </h3>
            
            <p className="text-lg mb-8" style={{ color: SLATE }}>
              Thank you for reaching out to <span style={{ color: selectedCompanyColor, fontWeight: 'bold' }}>
                {companyOptions.find(c => c.id === selectedCompany)?.name}
              </span>. We'll get back to you within 1-2 business days.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                setSelectedCompany("");
                setForm({ name: "", email: "", subject: "", message: "" });
              }}
              className="px-8 py-3 rounded-xl font-bold transition-all hover:-translate-y-1"
              style={{
                background: `${selectedCompanyColor}15`,
                color: selectedCompanyColor,
                border: `2px solid ${selectedCompanyColor}`,
              }}
            >
              Send Another Message
            </button>
          </div>
        )}

        {/* Contact Info Footer */}
        <div 
          className="mt-20 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out 0.6s',
          }}
        >
          <div className="p-6 rounded-xl text-center backdrop-blur-sm" style={{ background: "rgba(255, 255, 255, 0.6)" }}>
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${GOLD}15`, color: GOLD }}>
              <MailIcon />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: MUTED }}>Email</p>
            <p className="text-sm font-semibold" style={{ color: DARK }}>bol76335@gmail.com</p>
          </div>

          <div className="p-6 rounded-xl text-center backdrop-blur-sm" style={{ background: "rgba(255, 255, 255, 0.6)" }}>
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${GOLD}15`, color: GOLD }}>
              <PhoneIcon />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: MUTED }}>Phone</p>
            <p className="text-sm font-semibold" style={{ color: DARK }}>+63 (2) 8XXX-XXXX</p>
          </div>

          <div className="p-6 rounded-xl text-center backdrop-blur-sm" style={{ background: "rgba(255, 255, 255, 0.6)" }}>
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${GOLD}15`, color: GOLD }}>
              <MapPinIcon />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: MUTED }}>Location</p>
            <p className="text-sm font-semibold" style={{ color: DARK }}>San Juan City, Philippines</p>
          </div>
        </div>
      </div>
    </section>
  );
}
