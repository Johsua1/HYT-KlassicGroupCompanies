import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { GOLD_TINT, GOLD_DARK, GOLD, GOLD_GRAD, DARK, SLATE, MUTED, BORDER } from "@/constants/colors";
import KGCTeamImage from "@/assets/images/KGC.jpg";
import KGCBackground from "@/assets/images/KGCbg.jpg";
import BrainsLogo from "@/assets/images/Brains.png";
import KlassicSolutionsLogo from "@/assets/images/KlassicSolutions.png";
import KlassicMarketingLogo from "@/assets/images/KlassicMarketing.png";
import WDCLogo from "@/assets/images/WDC.png";
import WestWoodLawLogo from "@/assets/images/WestWoodLawFirm.png";
import HYTLogo from "@/assets/images/HYT.png";
import LuxuriousCleaningLogo from "@/assets/images/LuxuriousCleaningCo.png";
import LevelUpLogo from "@/assets/images/LEVELUPLOGO.png";
import HYTGlobalInstituteLogo from "@/assets/images/HGI.png";
import MillenniumLogo from "@/assets/images/MillenniumLogo.png";

// Animated Counter Component
function AnimatedCounter({ 
  value, 
  duration = 2000 
}: { 
  value: string; 
  duration?: number; 
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Parse the numeric value and suffix (e.g., "10+" -> 10 and "+", "99%" -> 99 and "%")
  const match = value.match(/^(\d+)(.*)$/);
  const targetNumber = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;

  useEffect(() => {
    // Intersection Observer to trigger animation when element is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          if (targetNumber === 0) {
            // Non-numeric value, just show it
            setDisplayValue(value);
            return;
          }
          
          // Easing function for smooth deceleration
          const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);
          
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            
            const currentCount = Math.floor(easedProgress * targetNumber);
            setDisplayValue(`${currentCount}${suffix}`);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of element is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [targetNumber, duration, hasAnimated, value, suffix]);

  return (
    <span 
      ref={ref}
      className="text-4xl font-bold md:text-5xl transition-all duration-300"
      style={{ 
        color: DARK,
        fontFamily: "var(--font-display)"
      }}
    >
      {displayValue}
    </span>
  );
}

export function About() {
  const companies: { src: string; alt: string; link: string; tile?: boolean; emblem?: boolean }[] = [
    { src: BrainsLogo, alt: "Brains Infinite Innovations", link: "https://www.brains.asia/" },
    { src: KlassicSolutionsLogo, alt: "Klassic Solutions", link: "https://klassic-attendance.vercel.app/" },
    { src: KlassicMarketingLogo, alt: "Klassic Marketing", link: "https://connectorcore.com/Klassic-Marketing-Inc-Website-master" },
    { src: WDCLogo, alt: "Westwood Development Corporation", link: "https://connectorcore.com/Westwood-Development-Corp-Website-master/" },
    { src: WestWoodLawLogo, alt: "Westwood Law Firm", link: "https://westwood-law-firm.vercel.app/" },
    { src: HYTLogo, alt: "HYT Foundation", link: "https://hyt-foundation-inc.vercel.app/" },
    { src: LuxuriousCleaningLogo, alt: "Luxurious Cleaning Co.", link: "https://luxurious-cleaning-co.vercel.app/" },
    { src: LevelUpLogo, alt: "Level Up", link: "https://hyt-lvlup-efms.vercel.app/" },
    { src: HYTGlobalInstituteLogo, alt: "HYT Global Institute Inc.", link: "https://hyt-global-visitor-authenticator.vercel.app/", tile: true, emblem: true },
    { src: MillenniumLogo, alt: "Millennium", link: "https://millennium-brains.hytfoundationinterns-dreamacademy.workers.dev/", tile: true },
  ];

  const achievements = [
    { label: "Companies Under Group", value: "10+" },
    { label: "Years of Excellence", value: "5+" },
    { label: "Industries Served", value: "8+" },
    { label: "Client Satisfaction", value: "99%" },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-14 grid gap-4 sm:gap-5 text-center md:grid-cols-2 md:items-end md:text-left">
          <h1 className="text-fluid-h2 font-bold" style={{ color: DARK, fontFamily: "var(--font-display)" }}>
            About Us
          </h1>
          <p style={{ color: SLATE }} className="text-fluid-lead md:pb-1">
            Klassic Group of Companies is a diversified organization dedicated to creating innovative solutions that empower businesses to thrive across multiple industries in the Philippines.
          </p>
        </div>

        {/* Image Grid — 2 columns from tablet up so the gold card never
            strands half a row, then the 3-column editorial split on desktop. */}
        <div className="grid gap-5 sm:gap-7 md:grid-cols-5 lg:grid-cols-3">
          <img
            src={KGCTeamImage}
            alt="Klassic Group of Companies Team"
            className="w-full aspect-[4/3] sm:aspect-[16/10] md:col-span-3 md:aspect-auto md:h-full md:max-h-[620px] lg:col-span-2 rounded-xl object-cover shadow-xl"
          />
          <div className="md:col-span-2 lg:col-span-1">
            {/* Breakout Card */}
            <div 
              className="flex h-full flex-col justify-between gap-5 sm:gap-6 rounded-xl p-5 sm:p-7 shadow-lg"
              style={{ background: GOLD_TINT }}
            >
              <div className="flex items-center justify-center bg-white/50 rounded-lg p-3 sm:p-4" style={{ minHeight: "140px" }}>
                <img
                  src={KGCBackground}
                  alt="Klassic Group of Companies team"
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: "140px" }}
                />
              </div>
              <div>
                <p className="mb-2 text-base sm:text-lg font-bold" style={{ color: DARK }}>
                  Building Businesses, Creating Opportunities
                </p>
                <p className="text-sm sm:text-base" style={{ color: SLATE }}>
                  A multi-industry group contributing to national progress through technology, services, and community development.
                </p>
              </div>
              <Button 
                variant="outline" 
                className="mr-auto h-auto py-2.5 font-semibold"
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
        <div className="py-14 sm:py-20">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div 
              className="p-6 sm:p-8 bg-white rounded-xl border shadow-lg hover:-translate-y-1 transition-transform duration-200"
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
              className="p-6 sm:p-8 bg-white rounded-xl border shadow-lg hover:-translate-y-1 transition-transform duration-200"
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
        <div className="pb-14 sm:pb-16">
          <p className="text-center text-base sm:text-lg font-semibold" style={{ color: DARK }}>
            Our Portfolio of Companies
          </p>
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center items-center gap-x-5 sm:gap-x-6 gap-y-6 sm:gap-y-8">
            {companies.map((company, idx) => (
              <a
                key={company.src + idx}
                href={company.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group cursor-pointer"
                aria-label={`Visit ${company.alt}`}
              >
                {company.tile ? (
                  // Platinum/silver marks (wordmark or emblem) read as a thin
                  // grey line on white, so they sit on a dark tile at the same
                  // row height. Hover: lift, platinum edge, metallic sheen sweep.
                  <span
                    className={`relative flex items-center overflow-hidden rounded-xl bg-[#0F1115] shadow-sm ring-1 ring-white/10 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.03] group-hover:shadow-[0_10px_24px_-8px_rgba(15,17,21,0.55)] group-hover:ring-white/30 motion-reduce:transition-none ${
                      company.emblem
                        ? "h-11 sm:h-12 md:h-14 px-1.5"
                        : "h-10 sm:h-11 md:h-12 px-3.5 sm:px-4"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[300%] motion-reduce:hidden"
                    />
                    <img
                      src={company.src}
                      alt={company.alt}
                      className={`relative w-auto object-contain transition-[filter] duration-300 group-hover:brightness-125 ${
                        company.emblem ? "h-9 sm:h-10 md:h-12" : "h-[14px] md:h-[15px]"
                      }`}
                    />
                  </span>
                ) : (
                  <img
                    src={company.src}
                    alt={company.alt}
                    className="h-9 sm:h-12 md:h-16 w-auto max-w-full object-contain opacity-70 hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                  />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div 
          className="relative overflow-hidden rounded-xl p-6 sm:p-10 md:p-16 shadow-xl"
          style={{ background: GOLD_TINT }}
        >
          <div className="flex flex-col gap-3 sm:gap-4 text-center">
            <h2 className="text-fluid-h2 font-bold" style={{ color: DARK, fontFamily: "var(--font-display)" }}>
              Our Achievements in Numbers
            </h2>
            <p className="max-w-screen-sm mx-auto text-sm sm:text-base" style={{ color: SLATE }}>
              Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth across the Philippines.
            </p>
          </div>
          <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-10 text-center">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-2 sm:gap-4" key={item.label + idx}>
                <p className="text-sm sm:text-base font-medium text-balance" style={{ color: SLATE }}>{item.label}</p>
                <AnimatedCounter value={item.value} duration={2000} />
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
