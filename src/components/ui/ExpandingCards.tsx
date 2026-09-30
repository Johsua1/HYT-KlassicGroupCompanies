import * as React from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  fullDescription?: string;
  services?: string[];
  category?: string;
  brandColor?: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
  onCardClick?: (item: CardItem) => void;
  showVerticalPattern?: boolean;
  showCategoryText?: boolean;
  disableHover?: boolean; // NEW: Disable hover interaction
  defaultExpanded?: boolean; // NEW: All cards expanded by default
}

const DEFAULT_BRAND = "#C9901A";

// Shared timing so the width growth and the content reveal stay in sync.
// (Width growth is 320ms via the `duration-[320ms]` class on the <ul>.)
const REVEAL_DELAY_MS = 60; // small head-start so the card is already opening
const STAGGER_MS = 30;      // quick per-item cascade inside the expanded card

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({
  className,
  items,
  defaultActiveIndex = 0,
  onCardClick,
  showVerticalPattern = false,
  showCategoryText = true,
  disableHover = false, // NEW
  defaultExpanded = false, // NEW
  ...props
}, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [isDesktop, setIsDesktop] = React.useState(false);
  const [imageLoadStates, setImageLoadStates] = React.useState<Record<string | number, boolean>>({});

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    const build = (get: (index: number) => string) =>
      items.map((_, index) => get(index)).join(" ");

    // All cards share space when nothing is hovered or when everything is expanded
    if (defaultExpanded || activeIndex === null) {
      const equal = build(() => "minmax(0, 1fr)");
      return isDesktop
        ? { gridTemplateColumns: equal }
        : { gridTemplateRows: equal };
    }

    // Hovered card expands to 5x while the rest share the remaining space (original proportions)
    const expanding = build((index) =>
      index === activeIndex ? "minmax(0, 5fr)" : "minmax(0, 1fr)"
    );
    return isDesktop
      ? { gridTemplateColumns: expanding }
      : { gridTemplateRows: expanding };
  }, [activeIndex, items, isDesktop, defaultExpanded]);

  const handleInteraction = (index: number) => {
    if (!disableHover) {
      setActiveIndex(index);
    }
  };

  const handleCardClick = (item: CardItem, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a')) return;

    if (onCardClick) {
      onCardClick(item);
    }
  };

  const handleImageLoad = (itemId: string | number) => {
    setImageLoadStates(prev => ({ ...prev, [itemId]: true }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number, item: CardItem) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disableHover) {
        handleInteraction(index);
      }
      if (e.key === 'Enter' && onCardClick) {
        onCardClick(item);
      }
    }
  };

  return (
    <ul
      className={cn(
        "w-full max-w-full gap-2",
        "grid",
        "h-[600px] md:h-[500px]",
        "motion-reduce:transition-none",
        !defaultExpanded && "transition-[grid-template-columns,grid-template-rows] duration-[320ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[grid-template-columns]",
        className,
      )}
      style={{
        ...gridStyle,
        ...(isDesktop
          ? { gridTemplateRows: '1fr' }
          : { gridTemplateColumns: '1fr' }
        )
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => {
        // In defaultExpanded mode, treat all cards as "active"
        const isActive = defaultExpanded ? true : activeIndex === index;
        const brand = item.brandColor || DEFAULT_BRAND;
        const loaded = !!imageLoadStates[item.id];

        // Smart cascade: each element fades + slides in just after the card finishes growing.
        // On collapse it disappears immediately (no delay) so the shrink reads cleanly.
        const revealCls = cn(
          "transition-[opacity,transform] ease-out will-change-transform motion-reduce:transition-none",
          isActive
            ? "opacity-100 translate-y-0 duration-200"
            : "opacity-0 translate-y-2 duration-150"
        );
        const stagger = (order: number): React.CSSProperties => ({
          transitionDelay: isActive && !defaultExpanded
            ? `${REVEAL_DELAY_MS + order * STAGGER_MS}ms`
            : "0ms",
        });

        return (
          <li
            key={item.id}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-2xl border bg-black text-white",
              "min-h-0 min-w-0",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              "transition-[border-color,box-shadow] duration-[320ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
            )}
            style={{
              borderColor: isActive ? `${brand}66` : "rgba(255,255,255,0.06)",
              boxShadow: isActive
                ? `0 24px 60px ${brand}40, 0 0 0 1px ${brand}26`
                : "0 4px 16px rgba(0,0,0,0.12)",
            }}
            onMouseEnter={() => handleInteraction(index)}
            onMouseLeave={() => {
              if (!disableHover) setActiveIndex(null);
            }}
            onFocus={() => handleInteraction(index)}
            onClick={(e) => {
              handleInteraction(index);
              handleCardClick(item, e);
            }}
            onKeyDown={(e) => handleKeyDown(e, index, item)}
            tabIndex={0}
            role="button"
            aria-label={`View ${item.title}`}
            aria-expanded={isActive}
            data-active={isActive}
          >
            {/* Collapsed brand tint — keeps the slim bar from looking flat */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${brand}26 0%, transparent 45%, transparent 55%, ${brand}1f 100%)`,
              }}
            />
            {/* Left accent strip */}
            <div
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-[3px]"
              style={{ background: `linear-gradient(180deg, ${brand}, ${brand}33)` }}
            />

            {/* COLLAPSED STATE - Logo Only (Hidden when defaultExpanded) */}
            {!defaultExpanded && (
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center p-2",
                  "transition-[opacity,transform] ease-out will-change-transform motion-reduce:transition-none",
                  isActive
                    ? "opacity-0 scale-90 duration-150"
                    : "opacity-100 scale-100 duration-200"
                )}
                style={{ transitionDelay: isActive ? "0ms" : "100ms" }}
              >
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  onLoad={() => handleImageLoad(item.id)}
                  className={cn(
                    "w-auto h-auto max-w-full max-h-[42px] object-contain transition-transform duration-300",
                    "group-hover:scale-110",
                    !loaded && "opacity-0"
                  )}
                  style={{
                    filter: `drop-shadow(0 4px 14px ${brand}66)`
                  }}
                  loading="lazy"
                />
              </div>
            )}

            {/* ACTIVE/EXPANDED STATE - Full Content (Always shown when defaultExpanded) */}
            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-5 py-8 text-center",
                isActive ? "pointer-events-auto" : "pointer-events-none"
              )}
            >
              {/* Background Glow */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 transition-opacity ease-out motion-reduce:transition-none",
                  isActive ? "opacity-100 duration-300" : "opacity-0 duration-150"
                )}
                style={{
                  background: `radial-gradient(circle at 50% 28%, ${brand}40 0%, transparent 62%)`,
                }}
              />

              {/* Loading skeleton */}
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-7 h-7 animate-spin text-gray-500" />
                </div>
              )}

              {/* Content Container */}
              <div className="relative z-10 flex w-full flex-col items-center gap-3">
                {/* Company Logo - Large */}
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  onLoad={() => handleImageLoad(item.id)}
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23333' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23999'%3ELogo%3C/text%3E%3C/svg%3E";
                    handleImageLoad(item.id);
                  }}
                  className={cn(
                    revealCls,
                    "w-auto h-auto max-h-[88px] max-w-[190px] object-contain",
                    !loaded && "opacity-0"
                  )}
                  style={{
                    filter: `drop-shadow(0 6px 22px ${brand}80)`,
                    ...stagger(0),
                  }}
                  loading="lazy"
                />

                {/* Company Name */}
                <h3
                  className={cn(
                    revealCls,
                    "text-lg md:text-xl font-bold uppercase leading-tight tracking-wide [text-wrap:balance]"
                  )}
                  style={{
                    color: brand,
                    fontFamily: "var(--font-display)",
                    textShadow: `0 2px 16px ${brand}59`,
                    ...stagger(1),
                  }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className={cn(revealCls, "line-clamp-3 max-w-sm text-sm text-gray-300")}
                  style={{
                    fontFamily: "var(--font-body)",
                    ...stagger(2),
                  }}
                >
                  {item.description}
                </p>

                {/* Social Links */}
                <div className={cn(revealCls, "flex items-center gap-2 pt-1")} style={stagger(3)}>
                  {item.socialLinks?.facebook && (
                    <a
                      href={item.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${item.title} Facebook`}
                    >
                      <FacebookIcon size={16} />
                    </a>
                  )}
                  {item.socialLinks?.instagram && (
                    <a
                      href={item.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${item.title} Instagram`}
                    >
                      <InstagramIcon size={16} />
                    </a>
                  )}
                  {item.socialLinks?.youtube && item.socialLinks.youtube !== "#" && (
                    <a
                      href={item.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${item.title} YouTube`}
                    >
                      <YoutubeIcon size={16} />
                    </a>
                  )}
                  {item.linkHref && item.linkHref !== "#" && (
                    <a
                      href={item.linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Visit ${item.title} website`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  className={cn(
                    revealCls,
                    "mt-2 rounded-lg border px-6 py-2.5 text-sm font-semibold backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
                  )}
                  style={{
                    background: `${brand}26`,
                    color: brand,
                    borderColor: `${brand}59`,
                    boxShadow: `0 4px 14px ${brand}33`,
                    ...stagger(4),
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onCardClick) onCardClick(item);
                  }}
                  aria-label={`View full details for ${item.title}`}
                >
                  View Full Details
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
});

ExpandingCards.displayName = "ExpandingCards";
