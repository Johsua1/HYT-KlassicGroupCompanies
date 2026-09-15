import { useState } from "react";
import { 
  BrainCircuit, 
  Users, 
  TrendingUp, 
  Building2, 
  Scale, 
  Network,
  Leaf,
  Sparkles,
  GraduationCap,
  Shirt,
  ExternalLink
} from "lucide-react";
import { ExpandingCards, type CardItem } from "@/components/ui/ExpandingCards";
import { companies, categories } from "@/data";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/Icons";
import { GOLD_TINT, GOLD_DARK, GOLD_GRAD, GOLD, DARK, SLATE, BORDER } from "@/constants/colors";

// Map company IDs to lucide-react icons
const companyIcons: Record<string, React.ReactNode> = {
  "brains-infinite": <BrainCircuit size={28} />,
  "klassic-solutions": <Users size={28} />,
  "klassic-marketing": <TrendingUp size={28} />,
  "westwood-development": <Building2 size={28} />,
  "westwood-law": <Scale size={28} />,
  "connector": <Network size={28} />,
  "green-oasis": <Leaf size={28} />,
  "luxurious-cleaning": <Sparkles size={28} />,
  "hyt-foundation": <GraduationCap size={28} />,
  "finest-fit": <Shirt size={28} />,
};

export function CompaniesExpanding() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null);

  // Filter companies based on selected category
  const filteredCompanies = selectedCategory === "all" 
    ? companies 
    : companies.filter(company => company.categorySlug === selectedCategory);

  // Convert company data to CardItem format with social media links
  const cardItems: CardItem[] = filteredCompanies.map((company) => ({
    id: company.id,
    title: company.name,
    description: company.tagline,
    imgSrc: company.image,
    icon: companyIcons[company.id] || <Building2 size={28} />,
    linkHref: company.website || "#",
    socialLinks: {
      facebook: company.facebook,
      instagram: company.instagram,
      youtube: company.youtube,
    },
    fullDescription: company.description,
    services: company.services,
    category: company.category,
  }));

  const handleCardClick = (item: CardItem) => {
    // Find the full company data
    const company = companies.find(c => c.id === item.id);
    if (company) {
      setSelectedCompany(company);
    }
  };

  const closeModal = () => {
    setSelectedCompany(null);
  };

  return (
    <section id="companies" className="py-24" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-4"
            style={{ background: GOLD_TINT, color: GOLD_DARK, fontFamily: "var(--font-display)" }}
          >
            Our Portfolio
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: DARK }}>
            Companies Under the Klassic Group
          </h2>
          <div className="w-12 h-0.5 mx-auto mb-6 rounded" style={{ background: GOLD_GRAD }} />
          <p className="text-lg" style={{ color: SLATE }}>
            Discover our diversified portfolio of companies spanning technology, business services, marketing, construction, and professional excellence across industries.
          </p>
        </div>

        {/* Category Filter Buttons - Improved Design */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 px-4">
          {categories.map((category) => {
            const isActive = selectedCategory === category.slug;
            const count = category.slug === "all" 
              ? companies.length 
              : companies.filter(c => c.categorySlug === category.slug).length;
            
            return (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className="group px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                style={{
                  background: isActive ? GOLD_GRAD : "#fff",
                  color: isActive ? "#fff" : DARK,
                  borderColor: isActive ? GOLD : BORDER,
                  fontFamily: "var(--font-display)",
                  boxShadow: isActive ? `0 4px 16px ${GOLD}40` : "0 2px 8px rgba(0,0,0,0.05)",
                }}
                disabled={count === 0}
              >
                <span className="flex items-center gap-2">
                  {category.label}
                  <span 
                    className="text-xs px-2 py-0.5 rounded-full transition-colors"
                    style={{
                      background: isActive ? "rgba(255,255,255,0.25)" : "rgba(201,144,26,0.1)",
                      color: isActive ? "white" : GOLD_DARK
                    }}
                  >
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Expanding Cards */}
        {filteredCompanies.length > 0 ? (
          <>
            <div className="flex justify-center">
              <ExpandingCards 
                items={cardItems} 
                defaultActiveIndex={0}
                onCardClick={handleCardClick}
                showVerticalPattern={selectedCategory === "all"}
              />
            </div>

            {/* Call to Action - Improved messaging */}
            <div className="text-center mt-12 space-y-2">
              <p className="text-sm font-medium" style={{ color: DARK }}>
                {selectedCategory === "all" 
                  ? `Viewing all ${filteredCompanies.length} companies across ${categories.length - 1} industries`
                  : `${filteredCompanies.length} ${filteredCompanies.length === 1 ? 'company' : 'companies'} in ${categories.find(c => c.slug === selectedCategory)?.label}`
                }
              </p>
              <p className="text-xs" style={{ color: SLATE }}>
                Hover to preview • Click any card to view full details and social links
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg" style={{ color: SLATE }}>
              No companies found in this category.
            </p>
          </div>
        )}

        {/* Company Modal */}
        {selectedCompany && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div 
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-48 rounded-t-2xl overflow-hidden" style={{ background: "#F9FAFB" }}>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <img
                    src={selectedCompany.image}
                    alt={selectedCompany.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-700 transition-colors"
                >
                  <ExternalLink className="rotate-45" size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Company Info */}
                <div>
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-3"
                    style={{ background: GOLD_TINT, color: GOLD_DARK }}
                  >
                    {selectedCompany.category}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: DARK }}>
                    {selectedCompany.name}
                  </h2>
                  <p className="text-lg" style={{ color: GOLD }}>
                    {selectedCompany.tagline}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: DARK }}>About</h3>
                  <p className="leading-relaxed" style={{ color: SLATE }}>
                    {selectedCompany.description}
                  </p>
                </div>

                {/* Services */}
                {selectedCompany.services && selectedCompany.services.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: DARK }}>Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedCompany.services.map((service, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2 p-3 rounded-lg border"
                          style={{ borderColor: BORDER }}
                        >
                          <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
                          <span className="text-sm" style={{ color: SLATE }}>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Links & Website */}
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: DARK }}>Connect</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    {selectedCompany.facebook && (
                      <a
                        href={selectedCompany.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors hover:-translate-y-0.5"
                        style={{ borderColor: BORDER }}
                      >
                        <FacebookIcon size={18} />
                        <span className="text-sm" style={{ color: SLATE }}>Facebook</span>
                      </a>
                    )}
                    {selectedCompany.instagram && (
                      <a
                        href={selectedCompany.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors hover:-translate-y-0.5"
                        style={{ borderColor: BORDER }}
                      >
                        <InstagramIcon size={18} />
                        <span className="text-sm" style={{ color: SLATE }}>Instagram</span>
                      </a>
                    )}
                    {selectedCompany.youtube && selectedCompany.youtube !== "#" && (
                      <a
                        href={selectedCompany.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors hover:-translate-y-0.5"
                        style={{ borderColor: BORDER }}
                      >
                        <YoutubeIcon size={18} />
                        <span className="text-sm" style={{ color: SLATE }}>YouTube</span>
                      </a>
                    )}
                    {selectedCompany.website && selectedCompany.website !== "#" && (
                      <a
                        href={selectedCompany.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-3 rounded-lg font-semibold text-white transition-all hover:-translate-y-0.5"
                        style={{ background: GOLD_GRAD, boxShadow: `0 4px 12px ${GOLD}30` }}
                      >
                        <ExternalLink size={18} />
                        <span className="text-sm">Visit Website</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
