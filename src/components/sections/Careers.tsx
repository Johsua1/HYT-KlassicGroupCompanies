import { ArrowRightIcon } from "@/components/ui/Icons";
import { GOLD, GOLD_LIGHT, GOLD_GRAD, DARK_GRAD, MUTED } from "@/constants/colors";

export function Careers() {
  const perks = [
    { icon: "🚀", title: "Career Growth",   desc: "Structured development paths across 10+ companies and 7 industries." },
    { icon: "🌍", title: "Nationwide Reach", desc: "Work with teams and clients from across the Philippines." },
    { icon: "💼", title: "Diverse Roles",    desc: "Openings in technology, marketing, legal, operations, and more." },
    { icon: "🎓", title: "Learning Culture", desc: "Training programs, mentorships, and internship opportunities for students." },
  ];

  return (
    <section id="careers" style={{ background: DARK_GRAD }} className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide"
              style={{ background: `${GOLD}20`, color: GOLD_LIGHT, fontFamily: "var(--font-display)" }}
            >
              Careers
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Grow Your Career With Klassic Group
            </h2>
            <p className="leading-relaxed" style={{ color: MUTED }}>
              Explore career and internship opportunities across the Klassic Group's portfolio of companies. Whether you are a fresh graduate, a seasoned professional, or a student looking for hands-on experience — there is a place for you here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
                style={{ background: GOLD_GRAD, fontFamily: "var(--font-display)", boxShadow: `0 4px 20px ${GOLD}50` }}
              >
                View Job Opportunities <ArrowRightIcon />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border transition-all hover:-translate-y-0.5"
                style={{ color: "#fff", borderColor: "#374151", fontFamily: "var(--font-display)" }}
              >
                Internship Opportunities
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {perks.map(p => (
              <div key={p.title} className="p-5 rounded-xl space-y-3" style={{ background: "#1F2937", border: "1px solid #2D3748" }}>
                <div className="text-2xl">{p.icon}</div>
                <div className="font-semibold text-white text-sm" style={{ fontFamily: "var(--font-display)" }}>{p.title}</div>
                <p className="text-xs leading-relaxed" style={{ color: MUTED }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
