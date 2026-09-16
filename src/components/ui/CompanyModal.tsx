import { useEffect, useRef } from "react";
import type { Company } from "@/types";
import { FacebookIcon, InstagramIcon, YoutubeIcon, ExternalLinkIcon, CloseIcon } from "./Icons";
import { GOLD_TINT, GOLD_DARK, GOLD, GOLD_GRAD, DARK, GREEN, SLATE, MUTED, BORDER } from "@/constants/colors";

interface CompanyModalProps {
  company: Company;
  onClose: () => void;
}

export function CompanyModal({ company, onClose }: CompanyModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Brand colors mapping - hard-coded here to ensure it works
  const companyBrandColors: Record<string, string> = {
    "brains-infinite": "#FF1493",
    "klassic-solutions": "#FFB84D",
    "klassic-marketing": "#FFB84D",
    "westwood-development": "#4A9EFF",
    "westwood-law": "#6BB6FF",
    "connector": "#FF6347",
    "green-oasis": "#4ADE80",
    "luxurious-cleaning": "#FFD93D",
    "hyt-foundation": "#FFB84D",
    "finest-fit": "#FFFFFF",
    "kgcc": "#FFB84D",
  };
  
  const brandColor = companyBrandColors[company.id] || company.brandColor || GOLD;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={ref}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        role="dialog" aria-modal="true" aria-label={company.name}
      >
        <div className="relative overflow-hidden rounded-t-2xl" style={{ aspectRatio: "16/7", background: "#F9FAFB" }}>
          <img src={company.image} alt={company.name} className="w-full h-full object-contain p-8" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
          <span
            className="absolute bottom-4 left-5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: brandColor, color: "#fff", fontFamily: "var(--font-display)" }}
          >
            {company.category}
          </span>
        </div>

        <div className="p-6 lg:p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-1" style={{ color: DARK, fontFamily: "var(--font-display)" }}>{company.name}</h2>
            <p className="text-sm italic" style={{ color: brandColor }}>{company.tagline}</p>
          </div>

          <p className="leading-relaxed" style={{ color: SLATE }}>{company.description}</p>

          <div>
            <h4 className="text-sm font-semibold mb-3" style={{ color: DARK, fontFamily: "var(--font-display)" }}>Key Services</h4>
            <div className="flex flex-wrap gap-2">
              {company.services.map(s => (
                <span key={s} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: `${brandColor}20`, color: brandColor, fontFamily: "var(--font-display)" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: BORDER }}>
            <div className="flex items-center gap-3" style={{ color: MUTED }}>
              {company.facebook && (
                <a href={company.facebook} aria-label="Facebook" onMouseEnter={e => (e.currentTarget.style.color = brandColor)} onMouseLeave={e => (e.currentTarget.style.color = MUTED)}><FacebookIcon size={20} /></a>
              )}
              {company.instagram && (
                <a href={company.instagram} aria-label="Instagram" onMouseEnter={e => (e.currentTarget.style.color = brandColor)} onMouseLeave={e => (e.currentTarget.style.color = MUTED)}><InstagramIcon size={20} /></a>
              )}
              {company.youtube && (
                <a href={company.youtube} aria-label="YouTube" onMouseEnter={e => (e.currentTarget.style.color = brandColor)} onMouseLeave={e => (e.currentTarget.style.color = MUTED)}><YoutubeIcon size={20} /></a>
              )}
            </div>
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
              style={{ background: brandColor, fontFamily: "var(--font-display)" }}
            >
              Visit Official Website <ExternalLinkIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
