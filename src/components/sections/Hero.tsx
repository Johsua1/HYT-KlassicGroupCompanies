import { ArrowRightIcon } from "@/components/ui/Icons";
import { GOLD_TINT, GOLD_DARK, GOLD, GOLD_GRAD, GREEN_TINT, GREEN, DARK, SLATE, BORDER } from "@/constants/colors";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16" style={{ background: "#fff" }}>
      {/* Gold/green geometric background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-2/3 h-full"
          style={{
            background: `linear-gradient(135deg, ${GOLD_TINT} 0%, #FAECC4 45%, #F5E1A0 100%)`,
            clipPath: "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        />
        {/* Green laurel accent strip */}
        <div
          className="absolute bottom-0 right-0 w-1/2 h-1/3"
          style={{
            background: `linear-gradient(135deg, ${GREEN_TINT}80 0%, ${GREEN_TINT}30 100%)`,
            clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        />
        {/* Decorative dots */}
        <div className="absolute top-28 right-1/3 w-3 h-3 rounded-full opacity-25" style={{ background: GOLD }} />
        <div className="absolute bottom-36 right-1/4 w-5 h-5 rounded-full opacity-15" style={{ background: GREEN }} />
        <div className="absolute top-1/2 right-1/2 w-2 h-2 rounded-full opacity-20" style={{ background: GOLD_DARK }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div className="space-y-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase"
              style={{ background: GOLD_TINT, color: GOLD_DARK, fontFamily: "var(--font-display)" }}
            >
              Klassic Group of Companies
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight" style={{ color: DARK }}>
              Building Businesses,{" "}
              <span style={{ color: GOLD }}>Creating</span>{" "}
              Opportunities
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: SLATE }}>
              A diversified group of companies operating across technology, business services, marketing, construction, and professional sectors — contributing to a better future for every Filipino.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="#companies"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
                style={{ background: GOLD_GRAD, fontFamily: "var(--font-display)", boxShadow: `0 4px 20px ${GOLD}45` }}
              >
                Explore Our Companies <ArrowRightIcon />
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all border hover:-translate-y-0.5"
                style={{ color: DARK, borderColor: BORDER, fontFamily: "var(--font-display)" }}
              >
                Learn More About Us
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl" style={{ aspectRatio: "5/4" }}>
              <img
                src="./assets/images/KGC.jpg"
                alt="Klassic Group of Companies — professional team"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, transparent 60%, ${GOLD}15 100%)` }} />
            </div>
            {/* Floating badges */}
            <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg px-5 py-4 border" style={{ borderColor: BORDER }}>
              <div className="text-2xl font-bold" style={{ color: GOLD, fontFamily: "var(--font-display)" }}>10+</div>
              <div className="text-xs font-medium" style={{ color: SLATE, fontFamily: "var(--font-display)" }}>Companies Nationwide</div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-5 py-4 border" style={{ borderColor: BORDER }}>
              <div className="text-2xl font-bold" style={{ color: GREEN, fontFamily: "var(--font-display)" }}>7+</div>
              <div className="text-xs font-medium" style={{ color: SLATE, fontFamily: "var(--font-display)" }}>Industries Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
