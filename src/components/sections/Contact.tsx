import { useState } from "react";
import { MapPinIcon, MailIcon, PhoneIcon, ClockIcon, FacebookIcon, InstagramIcon, YoutubeIcon, LinkedinIcon } from "@/components/ui/Icons";
import { GOLD_TINT, GOLD_DARK, GOLD, GOLD_GRAD, DARK, CHARCOAL, SLATE, MUTED, BORDER } from "@/constants/colors";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const info = [
    { icon: <MapPinIcon />, label: "Office Address", value: "Metro Manila, Philippines" },
    { icon: <MailIcon />,   label: "Email",          value: "info@klassicgroup.com.ph" },
    { icon: <PhoneIcon />,  label: "Phone",          value: "+63 (2) 8XXX-XXXX" },
    { icon: <ClockIcon />,  label: "Business Hours", value: "Mon–Fri, 8:00 AM – 5:00 PM" },
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
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-5 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: GOLD_TINT, color: GOLD_DARK, fontFamily: "var(--font-display)" }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 lg:p-8 rounded-2xl border space-y-5" style={{ borderColor: BORDER }}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide" style={{ color: SLATE, fontFamily: "var(--font-display)" }}>Full Name *</label>
                    <input id="name" type="text" required placeholder="Juan dela Cruz"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                      onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide" style={{ color: SLATE, fontFamily: "var(--font-display)" }}>Email Address *</label>
                    <input id="email" type="email" required placeholder="juan@email.com"
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                      onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wide" style={{ color: SLATE, fontFamily: "var(--font-display)" }}>Subject *</label>
                  <input id="subject" type="text" required placeholder="Business Inquiry / Career / Partnership"
                    value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors"
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide" style={{ color: SLATE, fontFamily: "var(--font-display)" }}>Message *</label>
                  <textarea id="message" required rows={5} placeholder="Tell us how we can help you…"
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors resize-none"
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
                  style={{ background: GOLD_GRAD, fontFamily: "var(--font-display)", boxShadow: `0 4px 20px ${GOLD}35` }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
