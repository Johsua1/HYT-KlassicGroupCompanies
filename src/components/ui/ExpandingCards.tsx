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
  hideTitle?: boolean; // Logo already carries the name (wordmark brands)
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
// (Width growth is 700ms via the `duration-[700ms]` class on the <ul>;
//  the fade itself is 380ms, set on the reveal classes.)
const REVEAL_START_MS = 300; // content starts once the card has opened enough
const REVEAL_STEP_MS = 60;   // gap between the logo / text / actions groups
const HOVER_OUT_DELAY_MS = 140; // grace period so crossing a gap does not collapse

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
  const closeTimer = React.useRef<number | null>(null);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const clearCloseTimer = React.useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  React.useEffect(() => clearCloseTimer, [clearCloseTimer]);

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
      clearCloseTimer();
      setActiveIndex(index);
    }
  };

  // Hover-out uses a short intent delay: crossing the gutter between two cards
  // must not collapse the row, otherwise the neighbour slides away from the
  // cursor. Entering another card cancels the pending shrink.
  const handleCardLeave = () => {
    if (disableHover) return;
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      setActiveIndex(null);
    }, HOVER_OUT_DELAY_MS);
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
        "w-full max-w-full gap-3",
        "grid",
        "h-[500px]",
        // Reduced motion keeps a short, even transition instead of snapping:
        // no abrupt size jump, but far less travel time for motion-sensitive users.
        "motion-reduce:duration-[320ms] motion-reduce:ease-out",
        !defaultExpanded && "transition-[grid-template-columns,grid-template-rows] duration-[700ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[grid-template-columns]",
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
      // Leaving the row (not a single card) collapses immediately — the intent
      // delay is only there to absorb travel across the gutter between cards.
      onMouseLeave={() => {
        if (!disableHover) {
          clearCloseTimer();
          setActiveIndex(null);
        }
      }}
      {...props}
    >
      {items.map((item, index) => {
        // In defaultExpanded mode, treat all cards as "active"
        const isActive = defaultExpanded ? true : activeIndex === index;
        const brand = item.brandColor || DEFAULT_BRAND;
        const loaded = !!imageLoadStates[item.id];

        // Reveal is grouped in three beats (logo → text → actions) instead of
        // one delay per element: fewer steps read calmer and land as the width
        // settles. Ease-out-cubic keeps the fade even — expo curves front-load
        // opacity and leave a long, invisible tail.
        // On collapse everything leaves immediately so the shrink reads cleanly.
        const revealCls = cn(
          "transition-[opacity,transform] will-change-[opacity,transform]",
          "motion-reduce:translate-y-0 motion-reduce:duration-150 motion-reduce:ease-out",
          isActive
            ? "opacity-100 translate-y-0 duration-[380ms] ease-[cubic-bezier(0.33,1,0.68,1)]"
            : "opacity-0 translate-y-3 duration-[180ms] ease-out"
        );
        const revealDelay = (order: number): React.CSSProperties => ({
          transitionDelay: isActive && !defaultExpanded
            ? `${REVEAL_START_MS + order * REVEAL_STEP_MS}ms`
            : "0ms",
        });

        return (
          <li
            key={item.id}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-2xl border bg-black text-white",
              "min-h-0 min-w-0",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              "transition-[border-color,box-shadow] duration-[700ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:duration-[320ms]"
            )}
            style={{
              borderColor: isActive ? `${brand}66` : "rgba(255,255,255,0.06)",
              boxShadow: isActive
                ? `0 24px 60px ${brand}40`
                : "0 4px 16px rgba(0,0,0,0.12)",
            }}
            onMouseEnter={() => handleInteraction(index)}
            onMouseLeave={handleCardLeave}
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
                  "transition-[opacity,transform] ease-out will-change-transform motion-reduce:duration-150",
                  isActive
                    ? "opacity-0 scale-90 duration-200"
                    : "opacity-100 scale-100 duration-300"
                )}
                style={{ transitionDelay: isActive ? "0ms" : "160ms" }}
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
                "absolute inset-0 flex flex-col items-center justify-center overflow-hidden p-6 text-center",
                isActive ? "pointer-events-auto" : "pointer-events-none"
              )}
            >
              {/* Background Glow */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 transition-opacity ease-out motion-reduce:transition-none",
                  isActive ? "opacity-100 duration-[450ms]" : "opacity-0 duration-250"
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

              {/* Content Container — fixed width so the copy does not re-wrap
                  while the card is still animating its width. Every row below is
                  a fixed-height slot, so the logo, name, tagline, socials and CTA
                  sit on the same baseline in all cards regardless of copy length. */}
              <div className="relative z-10 flex w-full max-w-[18rem] flex-col items-center gap-4">
                {/* Company Logo - Large (fixed slot) */}
                <div className="flex h-24 w-full shrink-0 items-center justify-center">
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
                      "max-h-24 max-w-[240px] object-contain",
                      !loaded && "opacity-0"
                    )}
                    style={{
                      filter: `drop-shadow(0 6px 22px ${brand}80)`,
                      ...revealDelay(0),
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Company Name + Description — one beat, so the headline and
                    its tagline arrive together instead of stepping separately.
                    The name slot is reserved even when a wordmark hides it. */}
                <div
                  className={cn(revealCls, "flex w-full shrink-0 flex-col items-center gap-2")}
                  style={revealDelay(1)}
                >
                  <div className="flex h-[3.25rem] w-full items-center justify-center">
                    {!item.hideTitle && (
                      <h3
                        className="line-clamp-2 text-lg md:text-xl font-bold uppercase leading-tight tracking-wide [text-wrap:balance]"
                        style={{
                          color: brand,
                          fontFamily: "var(--font-display)",
                          textShadow: `0 2px 16px ${brand}59`,
                        }}
                      >
                        {item.title}
                      </h3>
                    )}
                  </div>

                  <p
                    className="line-clamp-3 h-[3.75rem] w-full text-sm leading-5 text-gray-300"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Social links + CTA share one reveal wrapper, so the stagger
                    delay only affects the fade-in and not their hover feedback */}
                <div
                  className={cn(revealCls, "flex w-full shrink-0 flex-col items-center gap-4")}
                  style={revealDelay(2)}
                >
                  {/* Social Links */}
                  <div className="flex h-9 items-center justify-center gap-2">
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
                    className="h-10 rounded-lg border px-6 text-sm font-semibold backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: `${brand}26`,
                      color: brand,
                      borderColor: `${brand}59`,
                      boxShadow: `0 4px 14px ${brand}33`,
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
            </div>
          </li>
        );
      })}
    </ul>
  );
});

ExpandingCards.displayName = "ExpandingCards";
