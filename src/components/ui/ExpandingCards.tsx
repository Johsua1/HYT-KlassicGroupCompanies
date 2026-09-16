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
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, onCardClick, showVerticalPattern = false, showCategoryText = true, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    null,
  );
  
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
    if (activeIndex === null) {
      // All cards equal size when nothing is hovered
      if (isDesktop) {
        const columns = items.map(() => "1fr").join(" ");
        return { gridTemplateColumns: columns };
      } else {
        const rows = items.map(() => "1fr").join(" ");
        return { gridTemplateRows: rows };
      }
    }
    
    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items.length, isDesktop]);
  
  const handleInteraction = (index: number) => {
    setActiveIndex(index);
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
  
  return (
    <ul
      className={cn(
        "w-full max-w-6xl gap-2",
        "grid",
        "h-[600px] md:h-[500px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
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
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "group relative cursor-pointer overflow-hidden rounded-xl border-2 bg-card text-card-foreground shadow-lg hover:shadow-2xl",
            "md:min-w-[80px]",
            "min-h-0 min-w-0",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            "transition-all duration-500 ease-out",
            "hover:-translate-y-1"
          )}
          style={{
            borderColor: activeIndex === index ? (item.brandColor || "#C9901A") : "#E5E7EB",
            boxShadow: activeIndex === index 
              ? `0 20px 50px ${item.brandColor || '#C9901A'}40, 0 0 0 1px ${item.brandColor || '#C9901A'}20`
              : undefined
          }}
          onMouseEnter={() => handleInteraction(index)}
          onMouseLeave={() => setActiveIndex(null)}
          onFocus={() => handleInteraction(index)}
          onClick={(e) => {
            handleInteraction(index);
            handleCardClick(item, e);
          }}
          tabIndex={0}
          role="button"
          aria-label={`View ${item.title}`}
          data-active={activeIndex === index}
        >
          {/* Subtle gradient overlay for depth */}
          <div 
            className="absolute inset-0 opacity-0 group-data-[active=true]:opacity-100 transition-opacity duration-300"
            style={{ 
              background: "linear-gradient(135deg, rgba(201,144,26,0.05) 0%, rgba(201,144,26,0.15) 100%)"
            }}
          />
          
          {/* Company Logo with better presentation and glow effect on hover */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out group-data-[active=true]:p-8 p-6" 
            style={{ background: "#FAFAFA" }}
          >
            {/* Loading skeleton */}
            {!imageLoadStates[item.id] && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            )}
            
            {/* Glow effect behind logo on hover - uses company brand color */}
            <div 
              className="absolute inset-0 flex items-center justify-center opacity-0 group-data-[active=true]:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
              style={{
                filter: "blur(40px)",
                background: `radial-gradient(circle, ${item.brandColor || '#C9901A'}40 0%, transparent 70%)`
              }}
            />
            
            <img
              src={item.imgSrc}
              alt={item.title}
              onLoad={() => handleImageLoad(item.id)}
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23ddd' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23666'%3ELogo%3C/text%3E%3C/svg%3E";
                handleImageLoad(item.id);
              }}
              className={cn(
                "max-w-full max-h-full object-contain transition-all duration-500 ease-out relative z-10",
                "group-data-[active=true]:scale-105 scale-100",
                "group-data-[active=true]:brightness-110",
                !imageLoadStates[item.id] && "opacity-0"
              )}
              style={{
                filter: activeIndex === index 
                  ? `drop-shadow(0 0 20px ${item.brandColor || '#C9901A'}99) drop-shadow(0 0 40px ${item.brandColor || '#C9901A'}66)`
                  : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
              }}
              loading="lazy"
            />
          </div>
          
          {/* Subtle dark overlay when expanded - makes logo pop */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-data-[active=true]:opacity-100 pointer-events-none"
          />
          
          <article
            className="absolute inset-0 flex flex-col justify-end p-4 md:p-6"
          >
            {/* Category name - vertical when "All" filter, hidden when specific category */}
            {showCategoryText && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-100 transition-all duration-300 ease-out group-data-[active=true]:opacity-0">
                <p 
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ 
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    color: "#6B7280",
                    letterSpacing: "0.1em"
                  }}
                >
                  {item.category || 'Company'}
                </p>
              </div>
            )}

            {/* Company name - only visible on hover */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 opacity-0 group-data-[active=true]:opacity-100 transition-all duration-300 ease-out z-10">
              <h3 
                className="text-sm md:text-base font-bold leading-tight line-clamp-2"
                style={{ 
                  color: "#1C1C1E",
                  fontFamily: "var(--font-display)"
                }}
              >
                {item.title}
              </h3>
            </div>

            {/* Social Media Links - show on hover at top-left */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 opacity-0 group-data-[active=true]:opacity-100 transition-all duration-300 ease-out z-10">
              <div className="flex items-center gap-2">
                {item.socialLinks?.facebook && (
                  <a
                    href={item.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm hover:bg-[#C9901A] flex items-center justify-center text-gray-700 hover:text-white transition-all hover:scale-110 shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${item.title} Facebook`}
                  >
                    <FacebookIcon size={14} />
                  </a>
                )}
                {item.socialLinks?.instagram && (
                  <a
                    href={item.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm hover:bg-[#C9901A] flex items-center justify-center text-gray-700 hover:text-white transition-all hover:scale-110 shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${item.title} Instagram`}
                  >
                    <InstagramIcon size={14} />
                  </a>
                )}
                {item.socialLinks?.youtube && item.socialLinks.youtube !== "#" && (
                  <a
                    href={item.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm hover:bg-[#C9901A] flex items-center justify-center text-gray-700 hover:text-white transition-all hover:scale-110 shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${item.title} YouTube`}
                  >
                    <YoutubeIcon size={14} />
                  </a>
                )}
                {item.linkHref && item.linkHref !== "#" && (
                  <a
                    href={item.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm hover:bg-[#C9901A] flex items-center justify-center text-gray-700 hover:text-white transition-all hover:scale-110 shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Visit ${item.title} website`}
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Expanded content - HIDDEN to keep focus on logo */}
            {/* When hovered, only the logo is visible and bright */}
          </article>

          {/* Click for details indicator */}
          <div className="absolute top-4 right-4 opacity-0 group-data-[active=true]:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div 
              className="text-xs font-semibold px-3 py-1.5 rounded-md backdrop-blur-sm"
              style={{ 
                background: "rgba(201,144,26,0.95)",
                color: "white",
                boxShadow: "0 2px 8px rgba(201,144,26,0.3)"
              }}
            >
              Click for details
            </div>
          </div>
          {/* Click indicator removed - keeping focus on logo visibility */}
        </li>
      ))}
    </ul>
  );
});

ExpandingCards.displayName = "ExpandingCards";
