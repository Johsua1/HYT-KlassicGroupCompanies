import { Button } from "@/components/ui/button";
import { GOLD_TINT, GOLD_DARK, GOLD, GOLD_GRAD, DARK, SLATE, MUTED, BORDER } from "@/constants/colors";
import KGCTeamImage from "@/assets/images/KGC.jpg";
import KGCCLogo from "@/assets/images/KGCC.png";
import BrainsLogo from "@/assets/images/Brains.png";
import KlassicSolutionsLogo from "@/assets/images/KlassicSolutions.png";
import KlassicMarketingLogo from "@/assets/images/KlassicMarketing.png";
import WDCLogo from "@/assets/images/WDC.png";
import WestWoodLawLogo from "@/assets/images/WestWoodLawFirm.png";

export function About() {
  const companies = [
    { src: BrainsLogo, alt: "Brains Infinite Innovations" },
    { src: KlassicSolutionsLogo, alt: "Klassic Solutions" },
    { src: KlassicMarketingLogo, alt: "Klassic Marketing" },
    { src: WDCLogo, alt: "Westwood Development Corporation" },
    { src: WestWoodLawLogo, alt: "Westwood Law Firm" },
  ];

  const achievements = [
    { label: "Companies Under Group", value: "10+" },
    { label: "Years of Excellence", value: "5+" },
    { label: "Industries Served", value: "8+" },
    { label: "Client Satisfaction", value: "99%" },
  ];

  return (
    <section id="about" className="py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-bold" style={{ color: DARK, fontFamily: "var(--font-display)" }}>
            About Us
          </h1>
          <p style={{ color: SLATE }} className="text-lg">
            Klassic Group of Companies is a diversified organization dedicated to creating innovative solutions that empower businesses to thrive across multiple industries in the Philippines.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid gap-7 lg:grid-cols-3">
          <img
            src={KGCTeamImage}
            alt="Klassic Group of Companies Team"
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2 shadow-xl"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            {/* Breakout Card */}
            <div 
              className="flex flex-col justify-between gap-6 rounded-xl p-7 md:w-1/2 lg:w-auto shadow-lg h-full"
              style={{ background: GOLD_TINT }}
            >
              <div className="flex items-center justify-center bg-white/50 rounded-lg p-4" style={{ minHeight: "160px" }}>
                <img
                  src={KGCCLogo}
                  alt="Klassic Group Capital Corporation"
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: "140px" }}
                />
              </div>
              <div>
                <p className="mb-2 text-lg font-bold" style={{ color: DARK }}>
                  Building Businesses, Creating Opportunities
                </p>
                <p style={{ color: SLATE }}>
                  A multi-industry group contributing to national progress through technology, services, and community development.
                </p>
              </div>
              <Button 
                variant="outline" 
                className="mr-auto font-semibold"
                style={{ 
                  borderColor: GOLD,
                  color: GOLD_DARK
                }}
                asChild
              >
                <a href="#companies">Explore Our Companies</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="py-20">
          <div className="grid sm:grid-cols-2 gap-6">
            <div 
              className="p-8 bg-white rounded-xl border shadow-lg hover:-translate-y-1 transition-transform duration-200" 
              style={{ borderColor: BORDER, borderLeft: `4px solid ${GOLD}` }}
            >
              <div className="text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: GOLD_DARK, fontFamily: "var(--font-display)" }}>
                Our Mission
              </div>
              <p className="text-base leading-relaxed" style={{ color: SLATE }}>
                To build sustainable businesses and create meaningful opportunities that improve lives and contribute to the nation's development.
              </p>
            </div>
            <div 
              className="p-8 bg-white rounded-xl border shadow-lg hover:-translate-y-1 transition-transform duration-200" 
              style={{ borderColor: BORDER, borderLeft: `4px solid ${GOLD}` }}
            >
              <div className="text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: GOLD_DARK, fontFamily: "var(--font-display)" }}>
                Our Vision
              </div>
              <p className="text-base leading-relaxed" style={{ color: SLATE }}>
                To be the leading diversified group of companies recognized for innovation, excellence, and lasting positive impact on Philippine society.
              </p>
            </div>
          </div>
        </div>

        {/* Companies Section */}
        <div className="py-16">
          <p className="text-center text-lg font-semibold" style={{ color: DARK }}>
            Our Portfolio of Companies
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {companies.map((company, idx) => (
              <div className="flex items-center gap-3" key={company.src + idx}>
                <img
                  src={company.src}
                  alt={company.alt}
                  className="h-12 w-auto md:h-16 object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div 
          className="relative overflow-hidden rounded-xl p-10 md:p-16 shadow-xl"
          style={{ background: GOLD_TINT }}
        >
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-4xl font-bold" style={{ color: DARK, fontFamily: "var(--font-display)" }}>
              Our Achievements in Numbers
            </h2>
            <p className="max-w-screen-sm mx-auto" style={{ color: SLATE }}>
              Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth across the Philippines.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-10 text-center">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-4" key={item.label + idx}>
                <p className="font-medium" style={{ color: SLATE }}>{item.label}</p>
                <span 
                  className="text-4xl font-bold md:text-5xl"
                  style={{ 
                    color: DARK,
                    fontFamily: "var(--font-display)"
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          
          {/* Grid Pattern Overlay */}
          <div 
            className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:80px_80px] opacity-15 [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] md:block"
          />
        </div>
      </div>
    </section>
  );
}
