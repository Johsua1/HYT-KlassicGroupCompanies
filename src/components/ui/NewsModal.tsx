import { useEffect } from "react";
import { X } from "lucide-react";
import { GOLD_TINT, GOLD_DARK, GOLD, DARK, SLATE, MUTED } from "@/constants/colors";

interface NewsItem {
  id: number;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
}

interface NewsModalProps {
  article: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function NewsModal({ article, isOpen, onClose }: NewsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!article) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      >
        <div
          className={`relative bg-white rounded-2xl max-w-3xl w-full max-h-[92dvh] overflow-y-auto overscroll-contain shadow-2xl transition-all duration-300 ${
            isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-lg"
            style={{ color: DARK }}
            aria-label="Close modal"
          >
            <X size={22} />
          </button>

          {/* Hero Image */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-5 sm:p-8 lg:p-12">
            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              <span
                className="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wide whitespace-nowrap"
                style={{
                  background: GOLD_TINT,
                  color: GOLD_DARK,
                  fontFamily: "var(--font-display)",
                }}
              >
                {article.category}
              </span>
              <span className="text-xs sm:text-sm" style={{ color: MUTED }}>
                {article.date}
              </span>
            </div>

            {/* Title */}
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-5 sm:mb-6 leading-tight text-balance"
              style={{ color: DARK, fontFamily: "var(--font-display)" }}
            >
              {article.title}
            </h2>

            {/* Divider */}
            <div
              className="w-16 h-1 rounded-full mb-5 sm:mb-6"
              style={{ background: GOLD }}
            />

            {/* Article Content */}
            <div className="space-y-4">
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: SLATE }}
              >
                {article.excerpt}
              </p>

              {/* Extended content for demo purposes */}
              <p
                className="text-base leading-relaxed"
                style={{ color: SLATE }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <p
                className="text-base leading-relaxed"
                style={{ color: SLATE }}
              >
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>

              <p
                className="text-base leading-relaxed"
                style={{ color: SLATE }}
              >
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
            </div>

            {/* CTA Section */}
            <div
              className="mt-6 sm:mt-8 p-5 sm:p-6 rounded-xl"
              style={{ background: GOLD_TINT }}
            >
              <p
                className="text-sm font-semibold mb-2"
                style={{ color: GOLD_DARK }}
              >
                Stay Updated
              </p>
              <p className="text-sm" style={{ color: SLATE }}>
                Follow Klassic Group of Companies for more news and updates
                about our initiatives, partnerships, and growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
