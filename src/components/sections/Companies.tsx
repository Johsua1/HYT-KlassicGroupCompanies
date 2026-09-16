import { useState } from "react";
import { companies, categories } from "@/data";
import type { Company } from "@/types";
import { CompanyCard } from "@/components/ui/CompanyCard";
import { CompanyModal } from "@/components/ui/CompanyModal";
import { GOLD_TINT, GOLD_DARK, GOLD_GRAD, GOLD, DARK, SLATE, MUTED } from "@/constants/colors";

// Map company IDs to their brand colors
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

export function Companies() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const filtered = activeCategory === "all"
    ? companies
    : companies.filter(c => c.categorySlug === activeCategory);

  const handleSelectCompany = (company: Company) => {
    // Add brandColor to the company object
    const companyWithBrandColor = {
      ...company,
      brandColor: company.id === "brains-infinite" ? "#FF1493" : (companyBrandColors[company.id] || GOLD)
    };
    console.log("handleSelectCompany - Setting brandColor:", companyWithBrandColor.brandColor, "for", company.name);
    setSelectedCompany(companyWithBrandColor);
  };

  return (
    <section id="companies" className="py-24" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-4"
            style={{ background: GOLD_TINT, color: GOLD_DARK, fontFamily: "var(--font-display)" }}
          >
            Our Portfolio
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: DARK }}>Companies Under the Group</h2>
          <div className="w-12 h-0.5 mx-auto mb-4 rounded" style={{ background: GOLD_GRAD }} />
          <p style={{ color: SLATE }}>
            A diverse portfolio of companies united by shared values and a common commitment to excellence across industries.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                fontFamily: "var(--font-display)",
                background: activeCategory === cat.slug ? GOLD_GRAD : "#F3F4F6",
                color: activeCategory === cat.slug ? "#fff" : SLATE,
                boxShadow: activeCategory === cat.slug ? `0 4px 12px ${GOLD_DARK}40` : "none",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(company => (
            <CompanyCard key={company.id} company={company} onSelect={handleSelectCompany} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: MUTED }}>No companies in this category yet.</div>
        )}
      </div>

      {selectedCompany && <CompanyModal company={selectedCompany} onClose={() => setSelectedCompany(null)} />}
    </section>
  );
}
