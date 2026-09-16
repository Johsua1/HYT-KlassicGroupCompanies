import { Button } from "@/components/ui/button";
import { GOLD_TINT, GOLD_DARK, GOLD, GOLD_GRAD, DARK, SLATE, MUTED, BORDER } from "@/constants/colors";
import KGCTeamImage from "@/assets/images/KGC.jpg";
import KGCCLogo from "@/assets/images/KGCC.png";
import BrainsLogo from "@/assets/images/Brains.png";
import KlassicSolutionsLogo from "@/assets/images/KlassicSolutions.png";
import KlassicMarketingLogo from "@/assets/images/KlassicMarketing.png";
import WDCLogo from "@/assets/images/WDC.png";
import WestWoodLawLogo from "@/assets/images/WestWoodLawFirm.png";
import { useEffect, useRef, useState } from "react";

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const companies = [
    { src: BrainsLogo, alt: "Brains Infinite Innovations" },
    { src: KlassicSolutionsLogo, alt: "Klassic Solutions" },
    { src: KlassicMarketingLogo, alt: "Klassic Marketing" },
    { src: WDCLogo, alt: "Westwood Development Corporation" },
    { src: WestWoodLawLogo, alt: "Westwood Law Firm" },
  ];

  const achievements = [
    { label: "Companies Under Group", value: "10+", target: 10 },
    { label: "Years of Excellence", value: "5+", target: 5 },
    { label: "Industries Served", value: "8+", target: 8 },
    { label: "Client Satisfaction", value: "99%", target: 99 },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
            // Trigger number counting animation
            animateCounts();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (achievementsRef.current) {
      observer.observe(achievementsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Animate counting numbers
  const animateCounts = () => {
    if (prefersReducedMotion) {
      setCounts(achievements.map(a => a.target));
      return;
    }

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts(achievements.map(a => Math.floor(a.target * easeOut)));

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(achievements.map(a => a.target));
      }
    }, interval);
  };

  return (
    <section id="about" className="py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header with enhanced typography and eyebrow */}
        <div className="mb-20 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 rounded" style={{ background: GOLD }} />
            <span 
              className="text-xs font-bold uppercase tracking-widest" 
              style={{ color: GOLD_DARK }}
            >
              Company Overview
            </span>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
            <h1 
              className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight" 
              style={{ color: DARK, fontFamily: "var(--font-display)" }}
            >
              About Us
            </h1>
            <p 
              style={{ color: SLATE }} 
              className="text-lg lg:text-xl leading-relaxed"
            >
              Klassic Group of Companies is a diversified organization dedicated to creating innovative solutions that empower businesses to thrive across multiple industries in the Philippines.
            </p>
          </div>
        </div>

        {/* Enhanced Image + Mission Card Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-24 lg:mb-32">
          {/* Team Photo with enhanced styling */}
          <div className="lg:col-span-2 group relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-3xl">
            <img
              src={KGCTeamImage}
              alt="Klassic Group of Companies Team showcasing our diverse and talented workforce"
              className="w-full h-full max-h-[620px] object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Enhanced Mission Card */}
          <div className="flex flex-col gap-8 md:flex-row lg:flex-col">
            <div 
              className="flex flex-col justify-between gap-8 rounded-2xl p-8 lg:p-10 md:w-1/2 lg:w-auto shadow-xl h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border"
              style={{ 
                background: `linear-gradient(135deg, ${GOLD_TINT} 0%, #FFFFFF 100%)`,
                borderColor: BORDER
              }}
            >
              {/* Logo Container */}
              <div className="flex items-center justify-center bg-white rounded-xl p-6 shadow-inner" style={{ minHeight: "180px" }}>
                <img
                  src={KGCCLogo}
                  alt="Klassic Group Capital Corporation Logo"
                  className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
                  style={{ maxHeight: "150px" }}
                />
              </div>

              {/* Mission Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full self-start" style={{ background: GOLD, color: 'white' }}>
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">Core Mission</span>
              </div>

              {/* Mission Content */}
              <div className="flex-1 space-y-4">
                <h3 
                  className="text-2xl lg:text-3xl font-bold leading-tight" 
                  style={{ color: DARK, fontFamily: "var(--font-display)" }}
                >
                  Building Businesses, Creating Opportunities
                </h3>
                <p 
                  className="text-base leading-relaxed" 
                  style={{ color: SLATE }}
                >
                  A multi-industry group contributing to national progress through technology, services, and community development.
                </p>
              </div>

              {/* Enhanced CTA Button */}
              <Button 
                className="w-full group/btn font-semibold text-base py-6 rounded-xl transition-all duration-300 hover:shadow-lg"
                style={{ 
                  background: GOLD,
                  color: 'white',
                  border: 'none'
                }}
                asChild
              >
                <a href="#companies" className="flex items-center justify-center gap-2">
                  <span>Explore Our Companies</span>
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Mission & Vision Cards */}
        <div className="mb-24 lg:mb-32">
          <div className="grid sm:grid-cols-2 gap-8">
            <div 
              className="group p-10 lg:p-12 bg-white rounded-2xl border shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" 
              style={{ 
                borderColor: BORDER, 
                borderLeft: `6px solid ${GOLD}` 
              }}
            >
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" 
                style={{ background: GOLD_TINT, color: GOLD_DARK }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wider">Our Mission</span>
              </div>
              <p 
                className="text-lg leading-relaxed" 
                style={{ color: SLATE }}
              >
                To build sustainable businesses and create meaningful opportunities that improve lives and contribute to the nation's development.
              </p>
            </div>

            <div 
              className="group p-10 lg:p-12 bg-white rounded-2xl border shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" 
              style={{ 
                borderColor: BORDER, 
                borderLeft: `6px solid ${GOLD}` 
              }}
            >
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" 
                style={{ background: GOLD_TINT, color: GOLD_DARK }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wider">Our Vision</span>
              </div>
              <p 
                className="text-lg leading-relaxed" 
                style={{ color: SLATE }}
              >
                To be the leading diversified group of companies recognized for innovation, excellence, and lasting positive impact on Philippine society.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Portfolio Section */}
        <div className="mb-24 lg:mb-32 text-center">
          <h2 
            className="text-3xl lg:text-4xl font-bold mb-4" 
            style={{ color: DARK, fontFamily: "var(--font-display)" }}
          >
            Our Portfolio of Companies
          </h2>
          <p className="text-lg mb-12" style={{ color: SLATE }}>
            Leading businesses across diverse industries
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16">
            {companies.map((company, idx) => (
              <div 
                key={company.src + idx}
                className="group relative"
              >
                <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-gold/20">
                  <img
                    src={company.src}
                    alt={company.alt}
                    className="h-14 w-auto md:h-20 object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Achievements Section with Animation */}
        <div 
          ref={achievementsRef}
          className="relative overflow-hidden rounded-3xl p-12 md:p-16 lg:p-20 shadow-2xl"
          style={{ 
            background: `linear-gradient(135deg, #0F172A 0%, #1E293B 100%)`
          }}
        >
          {/* Content */}
          <div className="relative z-10">
            <div className="flex flex-col gap-6 text-center mb-16">
              <h2 
                className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white" 
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our Achievements in Numbers
              </h2>
              <p 
                className="max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed" 
                style={{ color: '#94A3B8' }}
              >
                Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth across the Philippines.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {achievements.map((item, idx) => (
                <div 
                  key={item.label + idx} 
                  className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
                >
                  <div 
                    className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent" 
                    style={{ fontFamily: "var(--font-display)" }}
                    aria-live="polite"
                  >
                    {isVisible ? (
                      idx === 3 ? `${counts[idx]}%` : `${counts[idx]}+`
                    ) : (
                      item.value
                    )}
                  </div>
                  <p 
                    className="text-sm lg:text-base font-medium uppercase tracking-wider text-white/80"
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl opacity-50" />
        </div>
      </div>
    </section>
  );
}
