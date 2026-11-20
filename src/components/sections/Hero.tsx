import { useState, useEffect, useRef } from "react";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { GOLD_DARK, GOLD, GOLD_LIGHT, DARK } from "@/constants/colors";
import KGCBackground from "@/assets/images/KGCbg.jpg";

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
    <section id="home" className="relative flex min-h-svh items-center overflow-hidden pt-16 lg:pt-18" style={{ background: "#fff" }}>
      {/* Warm light band — no diagonal, no hard shape. A soft golden haze
          crosses the middle of the hero and fades back to white at the top
          (so it melts into the navbar) and at the bottom. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="hero-wash absolute inset-0" />

        {/* Grain — makes the gradient feel printed rather than flat */}
        <div className="hero-grain absolute inset-0" />

        {/* Floating gold dust */}
        <div className="hero-dot" style={{ top: "20%", right: "24%", width: 10, height: 10, animationDelay: "0s" }} />
        <div className="hero-dot" style={{ top: "44%", right: "12%", width: 7, height: 7, animationDelay: "-5s" }} />
        <div className="hero-dot" style={{ bottom: "26%", right: "31%", width: 8, height: 8, animationDelay: "-9s" }} />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-10 lg:gap-12 xl:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] xl:gap-14">
          {/* Text Content */}
          <div className="space-y-5 sm:space-y-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-semibold tracking-wide uppercase"
              style={{
                background: "#FFFCF4",
                color: GOLD_DARK,
                fontFamily: "var(--font-display)",
                border: "1px solid rgba(201,144,26,0.28)",
                boxShadow: "0 1px 2px rgba(201,144,26,0.10)",
              }}
            >
              Klassic Group of Companies
            </div>
            <h1 className="text-fluid-hero font-bold" style={{ color: DARK, fontFamily: "var(--font-display)" }}>
              Building Businesses,{" "}
              <span
                style={{
                  backgroundImage: `linear-gradient(96deg, ${GOLD_DARK} 0%, ${GOLD} 42%, ${GOLD_LIGHT} 100%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Creating
              </span>{" "}
              Opportunities
            </h1>
            <p className="text-fluid-lead max-w-3xl" style={{ color: "#4B5563" }}>
              A diversified group of companies operating across technology, business services, marketing, construction, and professional sectors — contributing to a better future for every Filipino.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:pt-4">
              <a
                href="#companies"
                className="inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:brightness-[1.06]"
                style={{
                  background: "linear-gradient(135deg, #B8811A 0%, #CE9820 48%, #E3B23C 100%)",
                  fontFamily: "var(--font-display)",
                  boxShadow: `0 8px 20px -6px ${GOLD}66, inset 0 1px 0 rgba(255,255,255,0.34)`,
                }}
              >
                Explore Our Companies <ArrowRightIcon />
              </a>
              <a
                href="#about"
                className="inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all border hover:-translate-y-0.5"
                style={{
                  color: DARK,
                  borderColor: "rgba(28,28,30,0.10)",
                  fontFamily: "var(--font-display)",
                  background: "#fff",
                  boxShadow: "0 4px 14px -6px rgba(28,28,30,0.16)",
                }}
              >
                Learn More About Us
              </a>
            </div>
          </div>

          {/* Image with Floating Stats — only once there is room for two columns */}
          <div className="relative hidden xl:block">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl" style={{ aspectRatio: "16/9" }}>
              <img
                src={KGCBackground}
                alt="Klassic Group of Companies — professional team"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, transparent 50%, rgba(201, 144, 26, 0.1) 100%)" }} />
            </div>
            
            {/* Floating Badge - Top Right - 7+ Industries with animation */}
            <div 
              className="absolute bottom-full right-0 translate-y-2 bg-white rounded-xl shadow-xl px-5 py-3.5 xl:px-6 xl:py-4 border border-gray-100"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <AnimatedCounter value="7+" duration={2000} />
              <div className="text-xs font-medium text-gray-600">Industries Served</div>
            </div>

            {/* Floating Badge - Bottom Left - 10+ Companies with animation */}
            <div 
              className="absolute top-full -translate-y-2 -left-4 xl:-left-5 bg-white rounded-xl shadow-xl px-5 py-3.5 xl:px-6 xl:py-4 border border-gray-100"
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
