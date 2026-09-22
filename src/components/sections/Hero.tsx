import { useState, useEffect, useRef } from "react";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { GOLD_TINT, GOLD_DARK, GOLD, GOLD_GRAD, DARK, SLATE, BORDER } from "@/constants/colors";
import KGCCImage from "@/assets/images/KGCC.png";

// Animated Counter Component
function AnimatedCounter({ 
  value, 
  duration = 2000 
}: { 
  value: string; 
  duration?: number; 
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Parse the numeric value and suffix (e.g., "10+" -> 10 and "+")
  const match = value.match(/^(\d+)(.*)$/);
  const targetNumber = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;

  useEffect(() => {
    // Intersection Observer to trigger animation when element is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Easing function for smooth deceleration
          const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);
          
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            
            const currentCount = Math.floor(easedProgress * targetNumber);
            setCount(currentCount);
            
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
  }, [targetNumber, duration, hasAnimated]);

  return (
    <div
      ref={ref}
      className="text-3xl font-bold mb-1 transition-all duration-300"
      style={{ color: GOLD }}
    >
      {targetNumber === 0 ? value : `${count}${suffix}`}
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16" style={{ background: "#fff" }}>
      {/* Beige geometric background - matching KGC.jpg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-3/5 h-full"
          style={{
            background: "linear-gradient(135deg, #F5E6D3 0%, #EDD5B8 50%, #F0DCC0 100%)",
            clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        />
        {/* Decorative dots - subtle like in design */}
        <div className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full opacity-20" style={{ background: "#D4A574" }} />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full opacity-15" style={{ background: "#D4A574" }} />
        <div className="absolute top-1/2 right-1/2 w-2 h-2 rounded-full opacity-20" style={{ background: "#D4A574" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide uppercase"
              style={{ background: GOLD_TINT, color: GOLD_DARK, fontFamily: "var(--font-display)" }}
            >
              Klassic Group of Companies
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight" style={{ color: DARK, fontFamily: "var(--font-display)" }}>
              Building Businesses,{" "}
              <span style={{ color: GOLD }}>Creating</span>{" "}
              Opportunities
            </h1>
            <p className="text-base lg:text-lg leading-relaxed" style={{ color: SLATE }}>
              A diversified group of companies operating across technology, business services, marketing, construction, and professional sectors — contributing to a better future for every Filipino.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href="#companies"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
                style={{ background: GOLD_GRAD, fontFamily: "var(--font-display)", boxShadow: `0 4px 16px ${GOLD}40` }}
              >
                Explore Our Companies <ArrowRightIcon />
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all border hover:-translate-y-0.5"
                style={{ color: DARK, borderColor: BORDER, fontFamily: "var(--font-display)", background: "#fff" }}
              >
                Learn More About Us
              </a>
            </div>
          </div>

          {/* Image with Floating Stats */}
          <div className="relative hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl" style={{ aspectRatio: "4/3" }}>
              <img
                src={KGCCImage}
                alt="Klassic Group of Companies — professional team"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, transparent 50%, rgba(201, 144, 26, 0.1) 100%)" }} />
            </div>
            
            {/* Floating Badge - Top Right - 7+ Industries with animation */}
            <div 
              className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl px-6 py-4 border border-gray-100"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <AnimatedCounter value="7+" duration={2000} />
              <div className="text-xs font-medium text-gray-600">Industries Served</div>
            </div>

            {/* Floating Badge - Bottom Left - 10+ Companies with animation */}
            <div 
              className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-xl px-6 py-4 border border-gray-100"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <AnimatedCounter value="10+" duration={2000} />
              <div className="text-xs font-medium text-gray-600">Companies Nationwide</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
