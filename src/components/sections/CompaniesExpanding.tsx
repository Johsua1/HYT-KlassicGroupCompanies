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
  Globe,
  BookOpen,
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
  "level-up": <Globe size={28} />,
  "hyt-global-institute": <BookOpen size={28} />,
};

// Map company IDs to their brand colors for dynamic glow effects
const companyBrandColors: Record<string, string> = {
  "brains-infinite": "#FF1493",        // Vibrant Hot Pink (matches logo magenta, excellent contrast)
  "klassic-solutions": "#FFB84D",      // Warm Gold (brighter, more premium than original)
  "klassic-marketing": "#FFB84D",      // Warm Gold (consistent with Klassic brand)
  "westwood-development": "#4A9EFF",   // Bright Blue (more vibrant than original, professional)
  "westwood-law": "#6BB6FF",           // Even Brighter Blue (better visibility for dark logo)
  "connector": "#FF6347",              // Tomato Red-Orange (vibrant, energetic)
  "green-oasis": "#4ADE80",            // Bright Green (nature-inspired, great visibility)
  "luxurious-cleaning": "#FFD93D",     // Bright Gold-Yellow (luxury, stands out)
  "hyt-foundation": "#FFB84D",         // Warm Gold (consistent with foundation branding)
  "finest-fit": "#FFFFFF",             // Pure White (replaces black for visibility on black background)
  "level-up": "#38BDF8",               // Sky Blue (global, forward-looking)
  "hyt-global-institute": "#C084FC",   // Purple (academic, premium)
  "kgcc": "#FFB84D",                   // Warm Gold (Klassic brand, premium feel)
};

export function CompaniesExpanding() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null);

  // Filter companies based on selected category
  const filteredCompanies = selectedCategory === "all" 
    ? companies 
    : companies.filter(company => company.categorySlug === selectedCategory);

  // Convert company data to CardItem format with social media links and brand colors
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
    brandColor: companyBrandColors[company.id] || GOLD, // Default to gold if not specified
  }));

  const handleCardClick = (item: CardItem) => {
    // Find the full company data
    const company = companies.find(c => c.id === item.id);
    if (company) {
      // Add brandColor to the company object
      const companyWithBrandColor = {
        ...company,
        brandColor: companyBrandColors[company.id] || GOLD
      };
      setSelectedCompany(companyWithBrandColor);
    }
  };

  const closeModal = () => {
    setSelectedCompany(null);
  };

  return (
    <section id="companies" className="py-24" style={{ background: "#fff" }}>
      <div className="max-w-[1460px] mx-auto px-6 lg:px-8">
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

        {/* Category Filter Buttons - Premium Design */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 px-4">
          {categories.map((category) => {
            const isActive = selectedCategory === category.slug;
            const count = category.slug === "all" 
              ? companies.length 
              : companies.filter(c => c.categorySlug === category.slug).length;
            
            return (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className="group relative px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                style={{
                  background: isActive ? GOLD_GRAD : "#fff",
                  color: isActive ? "#fff" : DARK,
                  borderColor: isActive ? GOLD : BORDER,
                  fontFamily: "var(--font-display)",
                  boxShadow: isActive ? `0 8px 24px ${GOLD}50, 0 4px 12px ${GOLD}30` : "0 2px 8px rgba(0,0,0,0.04)",
                }}
                disabled={count === 0}
                aria-pressed={isActive}
              >
                <span className="flex items-center gap-2.5">
                  {category.label}
                  <span 
                    className="text-xs font-bold px-2.5 py-0.5 rounded-full transition-all duration-300"
                    style={{
                      background: isActive ? "rgba(255,255,255,0.3)" : "rgba(201,144,26,0.12)",
                      color: isActive ? "white" : GOLD_DARK,
                      minWidth: "28px",
                      textAlign: "center"
                    }}
                  >
                    {count}
                  </span>
                </span>
                
                {/* Active indicator dot */}
                {isActive && (
                  <div 
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{ background: "#fff", boxShadow: "0 0 8px rgba(255,255,255,0.8)" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Companies Display - Same Design, Different Behavior */}
        {filteredCompanies.length > 0 ? (
          <>
            {/* Desktop View - Expanding Cards Slider */}
            <div className="hidden md:flex justify-center">
              <ExpandingCards 
                items={cardItems}
                onCardClick={handleCardClick}
                showVerticalPattern={selectedCategory === "all"}
                showCategoryText={selectedCategory === "all"}
                disableHover={selectedCategory !== "all"} // NEW: Disable hover on category filters
                defaultExpanded={selectedCategory !== "all"} // NEW: All cards expanded on category filters
              />
            </div>

            {/* Mobile & Tablet View - Simple Card Grid */}
            <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredCompanies.map((company, index) => {
                const brandColor = companyBrandColors[company.id] || GOLD;
                
                return (
                  <div
                    key={company.id}
                    className="bg-white rounded-xl border-2 shadow-sm hover:shadow-lg active:scale-[0.98] cursor-pointer overflow-hidden transform transition-all duration-300"
                    style={{ 
                      borderColor: BORDER,
                      animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
                    }}
                    onClick={() => {
                      const companyWithBrandColor = {
                        ...company,
                        brandColor: companyBrandColors[company.id] || GOLD
                      };
                      setSelectedCompany(companyWithBrandColor);
                    }}
                  >
                    {/* Category Badge */}
                    <div className="px-4 pt-4 pb-2">
                      <span 
                        className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md"
                        style={{ 
                          background: GOLD_TINT,
                          color: GOLD_DARK
                        }}
                      >
                        {company.category}
                      </span>
                    </div>

                    {/* Company Logo */}
                    <div className="px-4 pb-4 flex items-center justify-center bg-gray-50 py-8">
                      <img
                        src={company.image}
                        alt={company.name}
                        className="h-20 w-auto object-contain transition-transform duration-300 hover:scale-110"
                        style={{
                          filter: `drop-shadow(0 4px 20px ${brandColor}40)`
                        }}
                      />
                    </div>

                    {/* Company Info */}
                    <div className="px-4 pb-4">
                      <h3 
                        className="text-lg font-bold mb-1"
                        style={{ 
                          color: DARK, 
                          fontFamily: "var(--font-display)"
                        }}
                      >
                        {company.name}
                      </h3>
                      <p className="text-sm" style={{ color: SLATE }}>
                        {company.tagline}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12 space-y-3">
              <p className="text-base font-semibold" style={{ color: DARK }}>
                {selectedCategory === "all" 
                  ? `Explore All ${filteredCompanies.length} Companies Across ${categories.length - 1} Industries`
                  : `${filteredCompanies.length} ${filteredCompanies.length === 1 ? 'Company' : 'Companies'} in ${categories.find(c => c.slug === selectedCategory)?.label}`
                }
              </p>
              <p className="text-sm hidden md:block" style={{ color: SLATE }}>
                {selectedCategory === "all"
                  ? "Hover over any company to preview • Click to view full details"
                  : "All companies expanded • Click any card to view full details"
                }
              </p>
              <p className="text-sm md:hidden" style={{ color: SLATE }}>
                Tap any company to view full details
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
        {selectedCompany && (() => {
          // Get brand color for this specific company
          const modalBrandColor = companyBrandColors[selectedCompany.id] || GOLD;
          const modalBrandColorTint = `${modalBrandColor}15`; // 15% opacity for light background
          const modalBrandColorBorder = `${modalBrandColor}30`; // 30% opacity for borders
          
          // Special handling for The Finest Fit (white brand color)
          const isFinestFit = selectedCompany.id === "finest-fit";
          const badgeTextColor = isFinestFit ? DARK : "#FFFFFF"; // Black text for white badge
          const badgeBorderColor = isFinestFit ? BORDER : modalBrandColor; // Gray border for white badge
          const buttonBgColor = isFinestFit ? DARK : modalBrandColor; // Dark button background for white brand
          const buttonTextColor = "#FFFFFF"; // Always white text on buttons
          const taglineColor = isFinestFit ? DARK : modalBrandColor; // Dark tagline for white brand
          const serviceBulletColor = isFinestFit ? DARK : modalBrandColor; // Dark bullets for white brand
          
          return (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={closeModal}
              style={{
                animation: 'modalBackdropFade 0.3s ease-out'
              }}
            >
              <div 
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                style={{
                  boxShadow: `0 0 80px ${modalBrandColor}40, 0 25px 50px -12px rgba(0, 0, 0, 0.4)`,
                  animation: 'modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Modal Header - Responsive height and spacing */}
                <div className="relative h-32 md:h-40 lg:h-48 rounded-t-2xl overflow-hidden" style={{ background: "#FAFAFA" }}>
                  <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
                    <img
                      src={selectedCompany.image}
                      alt={selectedCompany.name}
                      className="max-w-full max-h-full object-contain transition-all"
                      style={{
                        filter: `drop-shadow(0 0 20px ${modalBrandColor}60)`
                      }}
                    />
                  </div>
                  <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 flex items-center justify-center transition-all"
                  >
                    <ExternalLink className="rotate-45" size={18} />
                  </button>
                </div>

                {/* Divider */}
                <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${modalBrandColor}40, transparent)` }} />

                {/* Modal Content - Responsive spacing and typography */}
                <div className="p-5 md:p-7 lg:p-8 space-y-5 md:space-y-6">
                  {/* Company Info */}
                  <div className="text-center">
                    <div 
                      className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-3 transition-all"
                      style={{ 
                        background: modalBrandColor, 
                        color: badgeTextColor,
                        fontFamily: "var(--font-display)",
                        border: `1px solid ${badgeBorderColor}`
                      }}
                    >
                      {selectedCompany.category}
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 px-2" style={{ color: DARK, fontFamily: "var(--font-display)" }}>
                      {selectedCompany.name}
                    </h2>
                    <p className="text-base md:text-lg font-medium italic px-2" style={{ color: taglineColor }}>
                      {selectedCompany.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider mb-3" style={{ color: DARK, fontFamily: "var(--font-display)" }}>
                      ABOUT
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: SLATE }}>
                      {selectedCompany.description}
                    </p>
                  </div>

                  {/* Services */}
                  {selectedCompany.services && selectedCompany.services.length > 0 && (
                    <div>
                      <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider mb-4" style={{ color: DARK, fontFamily: "var(--font-display)" }}>
                        SERVICES
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
                        {selectedCompany.services.map((service, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center gap-2 md:gap-2.5 px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border transition-all hover:shadow-md hover:scale-105"
                            style={{ 
                              background: "#FAFAFA",
                              borderColor: modalBrandColorBorder,
                            }}
                          >
                            <div 
                              className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full flex-shrink-0" 
                              style={{ background: serviceBulletColor }}
                            />
                            <span className="text-xs md:text-sm font-medium leading-tight" style={{ color: DARK }}>
                              {service}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Links & Website - Three Responsive Layouts */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: DARK, fontFamily: "var(--font-display)" }}>
                      CONNECT
                    </h3>
                    
                    {/* Desktop (lg+): Horizontal flex with text labels, auto spacing */}
                    <div className="hidden lg:flex flex-wrap items-center gap-3">
                      {selectedCompany.facebook && (
                        <a
                          href={selectedCompany.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900 text-white hover:opacity-90 hover:scale-105 transition-all text-sm font-medium"
                          aria-label="Facebook"
                        >
                          <FacebookIcon size={18} />
                          <span>Facebook</span>
                        </a>
                      )}
                      {selectedCompany.instagram && (
                        <a
                          href={selectedCompany.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900 text-white hover:opacity-90 hover:scale-105 transition-all text-sm font-medium"
                          aria-label="Instagram"
                        >
                          <InstagramIcon size={18} />
                          <span>Instagram</span>
                        </a>
                      )}
                      {selectedCompany.youtube && selectedCompany.youtube !== "#" && (
                        <a
                          href={selectedCompany.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900 text-white hover:opacity-90 hover:scale-105 transition-all text-sm font-medium"
                          aria-label="YouTube"
                        >
                          <YoutubeIcon size={18} />
                          <span>YouTube</span>
                        </a>
                      )}
                      {selectedCompany.website && selectedCompany.website !== "#" && (
                        <a
                          href={selectedCompany.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 hover:scale-105 ml-auto"
                          style={{ 
                            background: buttonBgColor, 
                            color: buttonTextColor,
                            fontFamily: "var(--font-display)" 
                          }}
                        >
                          <ExternalLink size={16} />
                          Visit Website
                        </a>
                      )}
                    </div>
                    
                    {/* Tablet (md to lg): Professional grid layout with compact buttons */}
                    <div className="hidden md:grid lg:hidden grid-cols-2 gap-3">
                      {/* Social Media Buttons - Grid layout for balance */}
                      <div className="col-span-2 flex items-center gap-3">
                        {selectedCompany.facebook && (
                          <a
                            href={selectedCompany.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900 text-white hover:opacity-90 hover:scale-105 transition-all text-sm font-medium flex-1"
                            aria-label="Facebook"
                          >
                            <FacebookIcon size={18} />
                            <span className="font-semibold">Facebook</span>
                          </a>
                        )}
                        {selectedCompany.instagram && (
                          <a
                            href={selectedCompany.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900 text-white hover:opacity-90 hover:scale-105 transition-all text-sm font-medium flex-1"
                            aria-label="Instagram"
                          >
                            <InstagramIcon size={18} />
                            <span className="font-semibold">Instagram</span>
                          </a>
                        )}
                        {selectedCompany.youtube && selectedCompany.youtube !== "#" && (
                          <a
                            href={selectedCompany.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900 text-white hover:opacity-90 hover:scale-105 transition-all text-sm font-medium flex-1"
                            aria-label="YouTube"
                          >
                            <YoutubeIcon size={18} />
                            <span className="font-semibold">YouTube</span>
                          </a>
                        )}
                      </div>
                      
                      {/* Visit Website Button - Full width, prominent */}
                      {selectedCompany.website && selectedCompany.website !== "#" && (
                        <a
                          href={selectedCompany.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="col-span-2 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-base font-bold transition-all hover:opacity-90 hover:scale-105 hover:shadow-lg"
                          style={{ 
                            background: buttonBgColor, 
                            color: buttonTextColor,
                            fontFamily: "var(--font-display)",
                            boxShadow: `0 4px 12px ${buttonBgColor}30`
                          }}
                        >
                          <ExternalLink size={18} />
                          Visit Website
                        </a>
                      )}
                    </div>
                    
                    {/* Mobile (< md): Compact icon-only layout */}
                    <div className="flex md:hidden justify-between items-center gap-3">
                      {/* Social Icons - Left side, icon-only */}
                      <div className="flex items-center gap-2">
                        {selectedCompany.facebook && (
                          <a
                            href={selectedCompany.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-900 text-white hover:opacity-90 active:scale-95 transition-all"
                            aria-label="Facebook"
                          >
                            <FacebookIcon size={20} />
                          </a>
                        )}
                        {selectedCompany.instagram && (
                          <a
                            href={selectedCompany.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-900 text-white hover:opacity-90 active:scale-95 transition-all"
                            aria-label="Instagram"
                          >
                            <InstagramIcon size={20} />
                          </a>
                        )}
                        {selectedCompany.youtube && selectedCompany.youtube !== "#" && (
                          <a
                            href={selectedCompany.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-900 text-white hover:opacity-90 active:scale-95 transition-all"
                            aria-label="YouTube"
                          >
                            <YoutubeIcon size={20} />
                          </a>
                        )}
                      </div>
                      
                      {/* Visit Website Button - Right side, fixed width */}
                      {selectedCompany.website && selectedCompany.website !== "#" && (
                        <a
                          href={selectedCompany.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold transition-all hover:opacity-90 active:scale-95"
                          style={{ 
                            background: buttonBgColor, 
                            color: buttonTextColor,
                            fontFamily: "var(--font-display)",
                            minWidth: '140px'
                          }}
                        >
                          <ExternalLink size={16} />
                          <span>Visit</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
