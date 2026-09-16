import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/Icons";
import { GOLD_GRAD, GOLD, GOLD_LIGHT, MUTED } from "@/constants/colors";
import logoImg from "@/assets/images/KlassicGroupCompanies.png";

export function Footer() {
  const links: Record<string, Array<{ label: string; href: string }>> = {
    "Company": [
      { label: "About Us", href: "#about" },
      { label: "Our Companies", href: "#companies" },
      { label: "Careers", href: "#contact" },
      { label: "News & Updates", href: "#news" },
    ],
    "Our Services": [
      { label: "Company Directory", href: "#companies" },
      { label: "Business Services", href: "#companies" },
      { label: "Technology", href: "#companies" },
      { label: "Professional Services", href: "#companies" },
    ],
    "Support": [
      { label: "Contact Us", href: "#contact" },
      { label: "FAQs", href: "#contact" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  };

  const socialLinks = [
    { 
      icon: <FacebookIcon size={17} />, 
      label: "Facebook", 
      href: "https://www.facebook.com/profile.php?id=61554025331986" 
    },
    { 
      icon: <YoutubeIcon size={17} />, 
      label: "YouTube", 
      href: "https://www.youtube.com/watch?v=8BFhdINS97w" 
    },
  ];

  return (
    <footer style={{ background: "#0D1117" }} className="text-white">
      {/* Gold top border */}
      <div className="h-1" style={{ background: GOLD_GRAD }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <div className="inline-flex items-center">
              <img src={logoImg} alt="Klassic Group of Companies" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
              Building businesses, creating opportunities, and contributing to a better future for every Filipino.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: "#1F2937", color: MUTED }}
                  aria-label={label}
                  onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#1F2937"; e.currentTarget.style.color = MUTED; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: GOLD_LIGHT, fontFamily: "var(--font-display)" }}>{title}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm transition-colors"
                      style={{ color: MUTED }}
                      onMouseEnter={e => (e.currentTarget.style.color = GOLD_LIGHT)}
                      onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid #1F2937" }}
        >
          <p className="text-xs" style={{ color: "#4B5563" }}>
            © 2026 Klassic Group of Companies. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs transition-colors" style={{ color: "#4B5563" }} onMouseEnter={e => (e.currentTarget.style.color = GOLD_LIGHT)} onMouseLeave={e => (e.currentTarget.style.color = "#4B5563")}>Privacy Policy</a>
            <a href="#" className="text-xs transition-colors" style={{ color: "#4B5563" }} onMouseEnter={e => (e.currentTarget.style.color = GOLD_LIGHT)} onMouseLeave={e => (e.currentTarget.style.color = "#4B5563")}>Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
