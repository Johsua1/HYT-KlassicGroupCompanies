import { useEffect, useRef } from "react";
import type { Company } from "@/types";
import { FacebookIcon, InstagramIcon, YoutubeIcon, ExternalLinkIcon, CloseIcon } from "./Icons";
import { GOLD_TINT, GOLD_DARK, GOLD, GOLD_GRAD, DARK, GREEN, SLATE, MUTED, BORDER } from "@/constants/colors";

interface CompanyModalProps {
  company: Company;
  onClose: () => void;
}

// FORCE UPDATE - Brand colors defined at module level
const BRAND_COLORS: Record<string, string> = {
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

export function CompanyModal({ company, onClose }: CompanyModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Get brand color - try multiple sources
  const brandColor = BRAND_COLORS[company.id] || company.brandColor || GOLD;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={ref}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
        role="dialog" aria-modal="true" aria-label={company.name}
        style={{
          boxShadow: `0 0 80px ${brandColor}40, 0 25px 50px -12px rgba(0, 0, 0, 0.4)`
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {/* Logo Section */}
        <div className="relative overflow-hidden rounded-t-3xl pt-12 pb-8 px-8" style={{ background: "#FAFAFA" }}>
          <div className="flex justify-center mb-6">
            <img 
              src={company.image} 
              alt={company.name} 
              className="h-24 w-auto object-contain"
              style={{
                filter: `drop-shadow(0 0 20px ${brandColor}60)`
              }}
            />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2" style={{ color: DARK, fontFamily: "var(--font-display)" }}>
              {company.name}
            </h2>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${brandColor}40, transparent)` }} />

        <div className="p-8 space-y-6">
          {/* Category Badge */}
          <div className="flex justify-center">
            <span
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ 
                background: "#FF1493", // HARDCODED PINK FOR TEST
                color: "#FFFFFF",
                fontFamily: "var(--font-display)",
                border: `1px solid #FF1493`
              }}
            >
              {company.category} - TEST V2
            </span>
          </div>

          {/* Tagline */}
          <p className="text-center text-lg font-medium italic" style={{ color: brandColor }}>
            {company.tagline}
          </p>

          {/* About Section */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: DARK, fontFamily: "var(--font-display)" }}>
              ABOUT
            </h3>
            <p className="leading-relaxed" style={{ color: SLATE }}>
              {company.description}
            </p>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: DARK, fontFamily: "var(--font-display)" }}>
              SERVICES
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {company.services.map(s => (
                <div 
                  key={s} 
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border transition-all hover:shadow-md"
                  style={{ 
                    background: "#FAFAFA",
                    borderColor: `${brandColor}30`,
                  }}
                >
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ background: brandColor }}
                  />
                  <span className="text-sm font-medium" style={{ color: DARK }}>
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: DARK, fontFamily: "var(--font-display)" }}>
              CONNECT
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              {company.facebook && (
                <a
                  href={company.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:opacity-90 transition-opacity text-sm font-medium"
                  aria-label="Facebook"
                >
                  <FacebookIcon size={16} />
                  Facebook
                </a>
              )}
              {company.instagram && (
                <a
                  href={company.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:opacity-90 transition-opacity text-sm font-medium"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={16} />
                  Instagram
                </a>
              )}
              {company.youtube && (
                <a
                  href={company.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:opacity-90 transition-opacity text-sm font-medium"
                  aria-label="YouTube"
                >
                  <YoutubeIcon size={16} />
                  YouTube
                </a>
              )}
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 ml-auto"
                style={{ background: brandColor, fontFamily: "var(--font-display)" }}
              >
                <ExternalLinkIcon size={16} />
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
