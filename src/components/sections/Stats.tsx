import { useState, useEffect, useRef } from "react";
import { GOLD_GRAD, GOLD, GOLD_LIGHT, DARK, MUTED } from "@/constants/colors";

// Counter Animation Component
function AnimatedCounter({ 
  value, 
  duration = 2000, 
  color 
}: { 
  value: string; 
  duration?: number; 
  color: string;
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
      className="text-4xl lg:text-5xl font-bold transition-all duration-300"
      style={{ color, fontFamily: "var(--font-display)" }}
    >
      {targetNumber === 0 ? value : `${count}${suffix}`}
    </div>
  );
}

export function Stats() {
  const stats = [
    { value: "10+", label: "Companies Under the Group", sub: "Across diverse industries" },
    { value: "7+",  label: "Industries We Operate In",  sub: "From tech to construction" },
    { value: "100+",label: "Professionals & Counting",  sub: "Skilled, dedicated talent" },
    { value: "PH",  label: "Nationwide Presence",       sub: "Serving communities everywhere" },
  ];
  
  return (
    <section style={{ background: DARK }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* thin gold rule */}
        <div className="w-16 h-0.5 mx-auto mb-12 rounded" style={{ background: GOLD_GRAD }} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <div key={s.label} className="text-center space-y-1.5">
              <AnimatedCounter 
                value={s.value} 
                duration={2000} 
                color={i % 2 === 0 ? GOLD : GOLD_LIGHT}
              />
              <div className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>{s.label}</div>
              <div className="text-xs" style={{ color: MUTED }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
