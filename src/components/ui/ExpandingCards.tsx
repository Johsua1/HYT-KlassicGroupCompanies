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
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
  onCardClick?: (item: CardItem) => void;
  showVerticalPattern?: boolean;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, onCardClick, showVerticalPattern = false, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex,
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
    if (activeIndex === null) return {};
    
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
            "group relative cursor-pointer overflow-hidden rounded-xl border-2 bg-card text-card-foreground shadow-lg hover:shadow-xl",
            "md:min-w-[80px]",
            "min-h-0 min-w-0",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            "transition-shadow duration-300"
          )}
          style={{
            borderColor: activeIndex === index ? "#C9901A" : "#E5E7EB"
          }}
          onMouseEnter={() => handleInteraction(index)}
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
          
          {/* Company Logo with better presentation */}
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
            
            <img
              src={item.imgSrc}
              alt={item.title}
              onLoad={() => handleImageLoad(item.id)}
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23ddd' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23666'%3ELogo%3C/text%3E%3C/svg%3E";
                handleImageLoad(item.id);
              }}
              className={cn(
                "max-w-full max-h-full object-contain transition-all duration-300 ease-out",
                "group-data-[active=true]:scale-95 scale-100",
                "drop-shadow-sm",
                !imageLoadStates[item.id] && "opacity-0"
              )}
              loading="lazy"
            />
          </div>
          
          {/* Dark overlay when expanded - improved gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 opacity-0 transition-opacity duration-300 group-data-[active=true]:opacity-100 pointer-events-none"
          />
          
          <article
            className="absolute inset-0 flex flex-col justify-end p-4 md:p-6"
          >
            {/* Category badge - fixed at top */}
            <div className="absolute top-4 left-4 opacity-100 transition-all duration-300 ease-out group-data-[active=true]:opacity-0">
              <span 
                className="text-[10px] md:text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md inline-block"
                style={{ 
                  background: "rgba(201,144,26,0.15)",
                  color: "#A67C15",
                  backdropFilter: "blur(4px)"
                }}
              >
                {item.category?.split(' ')[0] || 'Company'}
              </span>
            </div>

            {/* Company name - absolute positioned at fixed distance from bottom */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 opacity-100 transition-all duration-300 ease-out group-data-[active=true]:opacity-0">
              <h3 
                className="text-sm md:text-base font-bold leading-tight line-clamp-2"
                style={{ 
                  color: "#1C1C1E",
                  textShadow: "0 2px 8px rgba(255,255,255,0.9), 0 0 16px rgba(255,255,255,0.7)",
                  fontFamily: "var(--font-display)"
                }}
              >
                {item.title}
              </h3>
            </div>

            {/* Expanded content */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 opacity-0 transition-all duration-300 delay-75 ease-out group-data-[active=true]:opacity-100 space-y-3">
                {/* Icon */}
                <div className="text-white/90">
                  {item.icon}
                </div>
                
                {/* Company Name in expanded state */}
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  {item.title}
                </h3>
                
                {/* Tagline */}
                <p className="text-sm text-white/90 leading-relaxed max-w-xs">
                  {item.description}
                </p>
                
                {/* Social Media Links */}
                {item.socialLinks && (
                  <div className="flex items-center gap-2 pt-2">
                    {item.socialLinks.facebook && (
                      <a
                        href={item.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`${item.title} Facebook`}
                      >
                        <FacebookIcon size={16} />
                      </a>
                    )}
                    {item.socialLinks.instagram && (
                      <a
                        href={item.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`${item.title} Instagram`}
                      >
                        <InstagramIcon size={16} />
                      </a>
                    )}
                    {item.socialLinks.youtube && item.socialLinks.youtube !== "#" && (
                      <a
                        href={item.socialLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
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
                        className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Visit ${item.title} website`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                )}
              </div>
          </article>

          {/* Click indicator */}
          <div className="absolute top-4 right-4 opacity-0 group-data-[active=true]:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div 
              className="text-xs font-semibold px-2 py-1 rounded-md backdrop-blur-sm"
              style={{ 
                background: "rgba(201,144,26,0.9)",
                color: "white"
              }}
            >
              Click for details
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
});

ExpandingCards.displayName = "ExpandingCards";
