import { useState } from "react";
import emailjs from '@emailjs/browser';
import { MapPinIcon, MailIcon, PhoneIcon, ClockIcon, FacebookIcon, InstagramIcon, YoutubeIcon, LinkedinIcon } from "@/components/ui/Icons";
import { GOLD_TINT, GOLD_DARK, GOLD, GOLD_GRAD, DARK, CHARCOAL, SLATE, MUTED, BORDER } from "@/constants/colors";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // EmailJS configuration - You'll need to replace these with your actual values
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
        to_email: 'bol76335@gmail.com',
      };

      // Send email using EmailJS
      await emailjs.send(
        'service_zu5xdwz',    // Replace with your EmailJS Service ID
        'template_3s0w7o9',   // Replace with your EmailJS Template ID
        templateParams,
        'TK1-w3bQvv7O8462F'     // Replace with your EmailJS Public Key
      );

      // Success!
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setForm({ name: "", email: "", subject: "", message: "" });
        setSubmitted(false);
      }, 3000);

    } catch (err) {
      console.error('Failed to send email:', err);
      setError('Failed to send message. Please try again or email us directly at karmaajoshh@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  const info = [
    { icon: <MapPinIcon />, label: "Office Address", value: "Atlanta Centre Annapolis St. San Juan City, Philippines" },
    { icon: <MailIcon />,   label: "Email",          value: "bol76335@gmail.com"},
    { icon: <PhoneIcon />,  label: "Phone",          value: "+63 (2) 8XXX-XXXX" },
    { icon: <ClockIcon />,  label: "Business Hours", value: "Mon–Fri, 9:00 AM – 6:00 PM" },
  ];

  const inputStyle = {
    borderColor: BORDER,
    color: DARK,
    background: "#fff",
    fontFamily: "var(--font-body)",
  };

  return (
    <section id="contact" className="py-24" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-4"
            style={{ background: GOLD_TINT, color: GOLD_DARK, fontFamily: "var(--font-display)" }}
          >
            Contact Us
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-3" style={{ color: DARK }}>Let's Start a Conversation</h2>
          <div className="w-12 h-0.5 mx-auto mb-4 rounded" style={{ background: GOLD_GRAD }} />
          <p style={{ color: SLATE }}>Have a question or business inquiry? We would love to hear from you.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info panel */}
          <div className="lg:col-span-2 space-y-4">
            {info.map(i => (
              <div key={i.label} className="flex items-start gap-4 p-4 rounded-xl border" style={{ borderColor: BORDER }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: GOLD_TINT, color: GOLD }}>
                  {i.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: MUTED, fontFamily: "var(--font-display)" }}>{i.label}</div>
                  <div className="text-sm font-medium" style={{ color: CHARCOAL }}>{i.value}</div>
                </div>
              </div>
            ))}

            <div className="p-4 rounded-xl border" style={{ borderColor: BORDER }}>
              <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: MUTED, fontFamily: "var(--font-display)" }}>Follow Us</div>
              <div className="flex items-center gap-3">
                {[
                  { icon: <FacebookIcon size={18} />, label: "Facebook" },
                  { icon: <InstagramIcon size={18} />, label: "Instagram" },
                  { icon: <YoutubeIcon size={18} />, label: "YouTube" },
                  { icon: <LinkedinIcon size={18} />, label: "LinkedIn" },
                ].map(({ icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:-translate-y-0.5"
                    style={{ background: "#F3F4F6", color: SLATE }}
                    aria-label={label}
                    onMouseEnter={e => { e.currentTarget.style.background = GOLD_TINT; e.currentTarget.style.color = GOLD; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#F3F4F6"; e.currentTarget.style.color = SLATE; }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-8 rounded-2xl border" style={{ borderColor: BORDER }}>
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: DARK, fontFamily: "var(--font-display)" }}>Message Sent!</h3>
                <p style={{ color: SLATE }}>Thank you for reaching out. We'll get back to you within 1–2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 lg:p-8 rounded-2xl border space-y-5" style={{ borderColor: BORDER }}>
                {error && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide" style={{ color: SLATE, fontFamily: "var(--font-display)" }}>Full Name *</label>
                    <input 
                      id="name" 
                      type="text" 
                      required 
                      placeholder="Juan dela Cruz"
                      value={form.name} 
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      disabled={loading}
                      className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors disabled:opacity-50"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                      onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide" style={{ color: SLATE, fontFamily: "var(--font-display)" }}>Email Address *</label>
                    <input 
                      id="email" 
                      type="email" 
                      required 
                      placeholder="juan@email.com"
                      value={form.email} 
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      disabled={loading}
                      className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors disabled:opacity-50"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                      onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wide" style={{ color: SLATE, fontFamily: "var(--font-display)" }}>Subject *</label>
                  <input 
                    id="subject" 
                    type="text" 
                    required 
                    placeholder="Business Inquiry / Career / Partnership"
                    value={form.subject} 
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors disabled:opacity-50"
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide" style={{ color: SLATE, fontFamily: "var(--font-display)" }}>Message *</label>
                  <textarea 
                    id="message" 
                    required 
                    rows={5} 
                    placeholder="Tell us how we can help you…"
                    value={form.message} 
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors resize-none disabled:opacity-50"
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: GOLD_GRAD, fontFamily: "var(--font-display)", boxShadow: `0 4px 20px ${GOLD}35` }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
