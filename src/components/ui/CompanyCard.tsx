import { useState } from "react";
import type { Company } from "@/types";
import { FacebookIcon, InstagramIcon, YoutubeIcon, ArrowRightIcon } from "./Icons";
import { GOLD_TINT, GOLD_DARK, GOLD, DARK, GREEN, SLATE, MUTED, BORDER } from "@/constants/colors";

interface CompanyCardProps {
  company: Company;
  onSelect: (company: Company) => void;
}

export function CompanyCard({ company, onSelect }: CompanyCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden border flex flex-col cursor-pointer transition-all duration-250"
      style={{
        borderColor: BORDER,
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.10)" : "0 2px 12px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(company)}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={company.image}
          alt={company.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 60%)" }} />
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: GOLD_TINT, color: GOLD_DARK, fontFamily: "var(--font-display)" }}
        >
          {company.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-bold text-base leading-snug mb-1" style={{ color: DARK, fontFamily: "var(--font-display)" }}>{company.name}</h3>
          <p className="text-xs italic" style={{ color: GREEN }}>{company.tagline}</p>
        </div>
        <p className="text-sm leading-relaxed flex-1" style={{ color: SLATE }}>
          {company.description.length > 120 ? company.description.slice(0, 120) + "…" : company.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
          <div className="flex items-center gap-2" style={{ color: MUTED }}>
            {company.facebook && (
              <a href={company.facebook} onClick={e => e.stopPropagation()} aria-label="Facebook"
                onMouseEnter={e => (e.currentTarget.style.color = GOLD)} onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
                <FacebookIcon />
              </a>
            )}
            {company.instagram && (
              <a href={company.instagram} onClick={e => e.stopPropagation()} aria-label="Instagram"
                onMouseEnter={e => (e.currentTarget.style.color = GOLD)} onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
                <InstagramIcon />
              </a>
            )}
            {company.youtube && (
              <a href={company.youtube} onClick={e => e.stopPropagation()} aria-label="YouTube"
                onMouseEnter={e => (e.currentTarget.style.color = GOLD)} onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
                <YoutubeIcon />
              </a>
            )}
          </div>
          <button
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
            style={{ color: GOLD_DARK, fontFamily: "var(--font-display)" }}
            onClick={e => { e.stopPropagation(); onSelect(company); }}
          >
            Learn More <ArrowRightIcon size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
