import { GOLD_TINT, GOLD_DARK, GOLD, GOLD_GRAD, GREEN, GREEN_TINT, DARK, SLATE, MUTED, BORDER, SURFACE } from "@/constants/colors";
import KGCTeamImage from "@/assets/images/KGC.jpg";

export function About() {
  const values = [
    { title: "Innovation",    desc: "We embrace change and leverage technology to craft forward-thinking solutions.", icon: "💡" },
    { title: "Integrity",     desc: "We conduct business with the highest ethical standards and transparency.",       icon: "🤝" },
    { title: "Excellence",    desc: "We commit to delivering quality in everything we do, without compromise.",       icon: "⭐" },
    { title: "Collaboration", desc: "We believe in the power of teamwork and partnerships to achieve greater impact.",icon: "🔗" },
    { title: "Service",       desc: "We exist to serve our clients, our people, and our communities with purpose.",   icon: "🌟" },
  ];

  return (
    <section id="about" className="py-24" style={{ background: SURFACE }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl" style={{ aspectRatio: "4/3" }}>
              <img
                src={KGCTeamImage}
                alt="Klassic Group team collaboration"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10" style={{ background: GOLD_GRAD, opacity: 0.18 }} />
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-xl -z-10" style={{ background: GREEN_TINT, border: `2px solid ${GREEN}30` }} />
          </div>

          {/* Text */}
          <div className="space-y-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide"
              style={{ background: GOLD_TINT, color: GOLD_DARK, fontFamily: "var(--font-display)" }}
            >
              Who We Are
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight" style={{ color: DARK }}>
              A Group Built on Purpose and Passion
            </h2>
            <p className="leading-relaxed" style={{ color: SLATE }}>
              Klassic Group of Companies is a diversified organization with subsidiaries operating across technology, business services, marketing, construction, professional services, and community development.
            </p>
            <p className="leading-relaxed" style={{ color: SLATE }}>
              Founded with a clear mission to contribute to national progress, we have grown into a multi-industry group that creates opportunities for professionals, businesses, and communities across the Philippines.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-white rounded-xl border" style={{ borderColor: BORDER, borderLeft: `3px solid ${GOLD}` }}>
                <div className="text-sm font-semibold mb-2" style={{ color: GOLD_DARK, fontFamily: "var(--font-display)" }}>Our Mission</div>
                <p className="text-sm leading-relaxed" style={{ color: SLATE }}>
                  To build sustainable businesses and create meaningful opportunities that improve lives and contribute to the nation's development.
                </p>
              </div>
              <div className="p-5 bg-white rounded-xl border" style={{ borderColor: BORDER, borderLeft: `3px solid ${GREEN}` }}>
                <div className="text-sm font-semibold mb-2" style={{ color: GREEN, fontFamily: "var(--font-display)" }}>Our Vision</div>
                <p className="text-sm leading-relaxed" style={{ color: SLATE }}>
                  To be the leading diversified group of companies recognized for innovation, excellence, and lasting positive impact on Philippine society.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core values */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold" style={{ color: DARK }}>Our Core Values</h3>
          <div className="w-12 h-0.5 mx-auto mt-3 rounded" style={{ background: GOLD_GRAD }} />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-6 bg-white rounded-xl border text-center space-y-3 hover:-translate-y-1 transition-transform duration-200"
              style={{ borderColor: BORDER }}
            >
              <div className="text-3xl">{v.icon}</div>
              <div className="font-semibold text-sm" style={{ color: DARK, fontFamily: "var(--font-display)" }}>{v.title}</div>
              <p className="text-xs leading-relaxed" style={{ color: MUTED }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
