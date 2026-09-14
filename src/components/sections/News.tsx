import { newsItems } from "@/data";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { GOLD_TINT, GOLD_DARK, DARK, SLATE, MUTED, BORDER, SURFACE } from "@/constants/colors";

export function News() {
  return (
    <section id="news" className="py-24" style={{ background: SURFACE }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-4"
              style={{ background: GOLD_TINT, color: GOLD_DARK, fontFamily: "var(--font-display)" }}
            >
              News & Updates
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: DARK }}>Latest From Klassic Group</h2>
          </div>
          <a href="#" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: GOLD_DARK, fontFamily: "var(--font-display)" }}>
            View All <ArrowRightIcon size={14} />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map(article => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden border flex flex-col hover:-translate-y-1 transition-transform duration-200"
              style={{ borderColor: BORDER, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
            >
              <div className="overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <img src={article.image} alt={article.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5 flex flex-col flex-1 gap-3">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: GOLD_TINT, color: GOLD_DARK, fontFamily: "var(--font-display)" }}>
                    {article.category}
                  </span>
                  <span className="text-xs" style={{ color: MUTED }}>{article.date}</span>
                </div>
                <h3 className="font-bold leading-snug flex-1" style={{ color: DARK, fontFamily: "var(--font-display)" }}>{article.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: SLATE }}>{article.excerpt}</p>
                <a href="#" className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: GOLD_DARK, fontFamily: "var(--font-display)" }}>
                  Read More <ArrowRightIcon size={13} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
