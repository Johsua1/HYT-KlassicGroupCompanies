import { ArrowRightIcon } from "@/components/ui/Icons";
import { GOLD_TINT, GOLD_DARK, GOLD, GOLD_GRAD, DARK, SLATE, BORDER } from "@/constants/colors";
import KGCCImage from "@/assets/images/KGCC.png";

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
            
            {/* Floating Badge - Top Right - 7+ Industries */}
            <div 
              className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl px-6 py-4 border border-gray-100"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <div className="text-3xl font-bold mb-1" style={{ color: GOLD }}>7+</div>
              <div className="text-xs font-medium text-gray-600">Industries Served</div>
            </div>

            {/* Floating Badge - Bottom Left - 10+ Companies */}
            <div 
              className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-xl px-6 py-4 border border-gray-100"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <div className="text-3xl font-bold mb-1" style={{ color: GOLD }}>10+</div>
              <div className="text-xs font-medium text-gray-600">Companies Nationwide</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
