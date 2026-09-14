import { GOLD_GRAD, GOLD, GOLD_LIGHT, DARK, MUTED } from "@/constants/colors";

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
              <div
                className="text-4xl lg:text-5xl font-bold"
                style={{ color: i % 2 === 0 ? GOLD : GOLD_LIGHT, fontFamily: "var(--font-display)" }}
              >
                {s.value}
              </div>
              <div className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>{s.label}</div>
              <div className="text-xs" style={{ color: MUTED }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
