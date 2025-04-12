
import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from './ThemeProvider';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface LinkItem {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  description?: string;
}

interface LinkCarouselProps {
  title: string;
  links: LinkItem[];
  autoplay?: boolean;
  autoplayInterval?: number;
}

const LinkCarousel: React.FC<LinkCarouselProps> = ({
  title,
  links,
  autoplay = true,
  autoplayInterval = 4000
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    dragFree: false, // Disable dragFree for more controlled scrolling
    containScroll: 'keepSnaps', // Ensures the carousel maintains its snap positions
    slidesToScroll: 1 // Explicitly set to scroll one slide at a time
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const [progressWidth, setProgressWidth] = useState(0);
  const [dragFreeEnabled, setDragFreeEnabled] = useState(false);
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
    playClickSound();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
    playClickSound();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
    playClickSound();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const playClickSound = () => {
    const audio = new Audio();
    audio.src = 'data:audio/wav;base64,UklGRl9vAAABAAIAgLgCAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTtvAACBhYqFbF1fdYiVlIFwZGJqeIeRjoZ5cXJ9h46MgHhyfYSOjoJ7eX+EjIyEfXp+g4qLhH58fYKIiYR/fX2BhoeEgH5+gIWFg4B+foGFhYOAfn6AhIWEgX9/gIOEg4F/f4CDhIOBf3+Ag4SDgn+AgIOEg4F/gICChIOCgICAgYODgoGAgICCg4OCgICAgYKDgoGAgICBgoOCgYCAgIGCg4KBgIGAgYKCgYCAgICBgoKBgIGAgYKCgYCAgICBgoKBgIGAgYKCgYGAgICBgYKBgIGAgYGCgYGAgICBgYKBgIGAgIGBgoGAgIGAgYGBgYGAgICBgYGBgICBgIGBgYGAgIGAgYGBgYCAgICBgYGBgICAgIGBgYGAgIGAgYGBgYCAgICBgYGBgICAgIGBgYGAgIGAgYGBgYCAgICBgYGBgICAgIGBgYGAgIGAgYGBgYCAgICBgYGBgICAgIGBgYGAgIGAgYGBgYCAgICBgYGBgICAgIGBgYGAgIGAgYGBgYCAgICBgYGBgICAgIGBgYGAgIGAgYGBgYCAgICBgYGBgICAgIGBgYGAgIGAgYGBgYCAgICBgYGBgICAgIGBgYGAgA==';
    audio.volume = 0.2;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);

    // Configure carousel to prevent accidental multi-slide scrolling on touch devices
    emblaApi.on('pointerDown', () => {
      // We can't use setOptions directly as it doesn't exist in the type
      // Instead we'll use our state variable to control this behavior
      setDragFreeEnabled(false);
    });

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (autoplay && emblaApi) {
      let startTime: number;
      let animationFrameId: number;

      const animateProgress = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / autoplayInterval, 1);
        setProgressWidth(progress * 100);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animateProgress);
        } else {
          startTime = 0;
          emblaApi.scrollNext();
        }
      };

      const startAnimation = () => {
        setProgressWidth(0);
        startTime = 0;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(animateProgress);
      };

      startAnimation();
      autoplayIntervalRef.current = setInterval(startAnimation, autoplayInterval);

      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
      };
    }
  }, [autoplay, autoplayInterval, emblaApi, selectedIndex]);

  const handleMouseEnter = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && emblaApi) {
      autoplayIntervalRef.current = setInterval(() => {
        if (document.hidden) return;
        emblaApi.scrollNext();
        setProgressWidth(0);
      }, autoplayInterval);
    }
  };

  const getCategoryColorClass = () => {
    switch(title) {
      case "REDES SOCIAIS": return "from-futuristic-primary to-futuristic-light";
      case "PORTFOLIOS": return "from-blue-500 to-purple-500"; 
      case "BLOG": return "from-green-500 to-teal-400";
      case "MODA FITNESS": return "from-pink-500 to-red-400";
      default: return "from-futuristic-primary to-futuristic-light";
    }
  };

  return (
    <div 
      className="mb-12 relative" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <h2 className={`text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r ${getCategoryColorClass()} bg-clip-text text-transparent`}>
        {title}
      </h2>
      
      <div className="w-full h-1 bg-gray-700/30 rounded-full mb-4 overflow-hidden">
        <div 
          ref={progressBarRef}
          className={`h-full bg-gradient-to-r ${getCategoryColorClass()} transition-all duration-300`}
          style={{ width: `${progressWidth}%` }}
        />
      </div>
      
      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {links.map((link) => (
            <div 
              key={link.id} 
              className="flex-[0_0_90%] min-w-0 sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_25%] p-2"
            >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block h-full"
                    onClick={playClickSound}
                  >
                    <div 
                      className={`glass-card h-full p-3 rounded-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(155,135,245,0.3)] hover:bg-white/15 flex flex-col transform hover:-translate-y-1 group`}
                    >
                      <div className="relative aspect-video mb-2 overflow-hidden rounded-md bg-black/20">
                        <img 
                          src={link.imageUrl} 
                          alt={link.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-2 flex-1 flex flex-col">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-white group-hover:text-futuristic-primary transition-colors duration-300">{link.title}</h3>
                          <ExternalLink className="w-4 h-4 text-futuristic-light flex-shrink-0 ml-1 group-hover:text-futuristic-primary group-hover:rotate-12 transition-all duration-300" />
                        </div>
                        {link.description && (
                          <p className="text-sm text-gray-300 mt-1 group-hover:text-white/90 transition-colors duration-300">{link.description}</p>
                        )}
                      </div>
                    </div>
                  </a>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-0 border-0 shadow-xl bg-transparent backdrop-blur-xl">
                  <div className="p-4 bg-black/70 border border-white/10 rounded-lg">
                    <img src={link.imageUrl} alt={link.title} className="w-full h-auto rounded-md mb-2" />
                    <h3 className="text-lg font-medium mb-1">{link.title}</h3>
                    <p className="text-sm text-gray-300">{link.description}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Button 
          onClick={scrollPrev} 
          size="icon" 
          variant="outline" 
          className={`mx-1 bg-transparent border-white/20 hover:bg-white/10 transition-transform hover:scale-110 hover:border-futuristic-primary`}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="carousel-dots">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                "carousel-dot",
                selectedIndex === index && "active"
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <Button 
          onClick={scrollNext} 
          size="icon" 
          variant="outline" 
          className={`mx-1 bg-transparent border-white/20 hover:bg-white/10 transition-transform hover:scale-110 hover:border-futuristic-primary`}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LinkCarousel;
