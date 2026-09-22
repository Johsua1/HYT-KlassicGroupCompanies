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

// Tooltip component for collapsed cards
function CompanyTooltip({ name, isVisible }: { name: string; isVisible: boolean }) {
  if (!isVisible) return null;
  
  return (
    <div 
      className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap pointer-events-none z-50"
      style={{
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      {name}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
    </div>
  );
}

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
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
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
    // If defaultExpanded, all cards get equal width (no collapsing)
    if (defaultExpanded) {
      if (isDesktop) {
        const columns = items.map(() => "1fr").join(" ");
        return { gridTemplateColumns: columns };
      } else {
        const rows = items.map(() => "1fr").join(" ");
        return { gridTemplateRows: rows };
      }
    }
    
    // Original expanding behavior
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
  }, [activeIndex, items.length, isDesktop, defaultExpanded]);
  
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
        "w-full max-w-6xl gap-2",
        "grid",
        "h-[600px] md:h-[500px]",
        !defaultExpanded && "transition-[grid-template-columns,grid-template-rows] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
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
        const isHovered = hoveredIndex === index;
        
        return (
          <li
            key={item.id}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-xl border-2 bg-card text-card-foreground shadow-lg hover:shadow-2xl",
              "md:min-w-[80px]",
              "min-h-0 min-w-0",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              "transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              !isActive && !defaultExpanded && "hover:-translate-y-1"
            )}
            style={{
              borderColor: isActive ? (item.brandColor || "#C9901A") : "#E5E7EB",
              boxShadow: isActive 
                ? `0 20px 50px ${item.brandColor || '#C9901A'}40, 0 0 0 1px ${item.brandColor || '#C9901A'}20`
                : undefined
            }}
            onMouseEnter={() => {
              if (!disableHover) {
                handleInteraction(index);
                setHoveredIndex(index);
              }
            }}
            onMouseLeave={() => {
              if (!disableHover) {
                setActiveIndex(null);
                setHoveredIndex(null);
              }
            }}
            onFocus={() => !disableHover && handleInteraction(index)}
            onClick={(e) => {
              if (!disableHover) {
                handleInteraction(index);
              }
              handleCardClick(item, e);
            }}
            onKeyDown={(e) => handleKeyDown(e, index, item)}
            tabIndex={0}
            role="button"
            aria-label={`View ${item.title}`}
            aria-expanded={isActive}
            data-active={isActive}
          >
            {/* Premium Black Background */}
            <div 
              className="absolute inset-0 transition-all duration-400"
              style={{ background: "#000000" }}
            />
            
            {/* COLLAPSED STATE - Logo Only (Hidden when defaultExpanded) */}
            {!defaultExpanded && (
              <div 
                className={cn(
                  "absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-300",
                  isActive ? "opacity-0 pointer-events-none" : "opacity-100"
                )}
              >
                {/* Brand Color Accent Strip */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
                  style={{ 
                    background: item.brandColor || "#C9901A",
                    opacity: isHovered ? 1 : 0.5
                  }}
                />
                
                {/* Company Logo - Centered */}
                <div className="relative">
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    onLoad={() => handleImageLoad(item.id)}
                    className={cn(
                      "w-full h-auto object-contain transition-all duration-300",
                      "max-w-[120px] max-h-[120px]",
                      isHovered && "scale-110",
                      !imageLoadStates[item.id] && "opacity-0"
                    )}
                    style={{
                      filter: `drop-shadow(0 4px 12px ${item.brandColor || '#C9901A'}40)`
                    }}
                    loading="lazy"
                  />
                  
                  {/* Tooltip on hover */}
                  <CompanyTooltip name={item.title} isVisible={isHovered && !isActive && !disableHover} />
                </div>
              </div>
            )}
            
            {/* ACTIVE/EXPANDED STATE - Full Content (Always shown when defaultExpanded) */}
            <div 
              className={cn(
                "absolute inset-0 flex flex-col justify-center p-6 md:p-8 transition-opacity duration-300",
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              {/* Loading skeleton */}
              {!imageLoadStates[item.id] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
                </div>
              )}
              
              {/* Background Glow */}
              <div 
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 pointer-events-none"
                style={{
                  filter: "blur(60px)",
                  background: `radial-gradient(circle, ${item.brandColor || '#C9901A'}40 0%, transparent 70%)`
                }}
              />
              
              {/* Content Container */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
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
                    "max-w-[180px] max-h-[120px] object-contain mb-2 transition-all duration-500",
                    !imageLoadStates[item.id] && "opacity-0"
                  )}
                  style={{
                    filter: `drop-shadow(0 4px 24px ${item.brandColor || '#C9901A'}80) drop-shadow(0 2px 12px ${item.brandColor || '#C9901A'}60)`,
                    animation: isActive && !defaultExpanded ? 'scaleIn 0.4s ease-out' : undefined
                  }}
                  loading="lazy"
                />
                
                {/* Company Name */}
                <h3 
                  className="text-xl md:text-2xl font-bold uppercase tracking-wide"
                  style={{ 
                    color: item.brandColor || "#C9901A",
                    fontFamily: "var(--font-display)",
                    textShadow: `0 2px 16px ${item.brandColor || '#C9901A'}60`,
                    animation: isActive && !defaultExpanded ? 'fadeInUp 0.5s ease-out 0.1s both' : undefined
                  }}
                >
                  {item.title}
                </h3>
                
                {/* Description */}
                <p 
                  className="text-sm md:text-base text-gray-400 max-w-md px-2"
                  style={{ 
                    fontFamily: "var(--font-body)",
                    animation: isActive && !defaultExpanded ? 'fadeInUp 0.5s ease-out 0.2s both' : undefined
                  }}
                >
                  {item.description}
                </p>
                
                {/* Social Links */}
                <div 
                  className="flex items-center gap-2 pt-2"
                  style={{
                    animation: isActive && !defaultExpanded ? 'fadeInUp 0.5s ease-out 0.3s both' : undefined
                  }}
                >
                  {item.socialLinks?.facebook && (
                    <a
                      href={item.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 shadow-sm border border-white/20"
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
                      className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 shadow-sm border border-white/20"
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
                      className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 shadow-sm border border-white/20"
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
                      className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 shadow-sm border border-white/20"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Visit ${item.title} website`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                
                {/* CTA Button */}
                <button
                  className="mt-4 px-6 py-2.5 rounded-lg text-sm font-semibold backdrop-blur-sm border transition-all hover:scale-105 active:scale-95"
                  style={{ 
                    background: `${item.brandColor || '#C9901A'}20`,
                    color: item.brandColor || "#C9901A",
                    borderColor: `${item.brandColor || '#C9901A'}40`,
                    boxShadow: `0 4px 12px ${item.brandColor || '#C9901A'}30`,
                    animation: isActive && !defaultExpanded ? 'fadeInUp 0.5s ease-out 0.4s both' : undefined
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onCardClick) onCardClick(item);
                  }}
                  aria-label={`View full details for ${item.title}`}
                >
                  Click for Full Details
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
