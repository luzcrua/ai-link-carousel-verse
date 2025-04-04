
import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (autoplay && emblaApi) {
      const autoplayFunc = () => {
        if (document.hidden) return;
        emblaApi.scrollNext();
      };

      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }

      autoplayIntervalRef.current = setInterval(autoplayFunc, autoplayInterval);

      return () => {
        if (autoplayIntervalRef.current) {
          clearInterval(autoplayIntervalRef.current);
        }
      };
    }
  }, [autoplay, autoplayInterval, emblaApi]);

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
      }, autoplayInterval);
    }
  };

  return (
    <div className="mb-12 relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-gradient-purple">{title}</h2>
      
      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {links.map((link) => (
            <div 
              key={link.id} 
              className="flex-[0_0_90%] min-w-0 sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_25%] p-2"
            >
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="glass-card h-full p-3 rounded-lg transition-all duration-300 hover:scale-[1.03] hover:bg-white/15 flex flex-col">
                  <div className="relative aspect-video mb-2 overflow-hidden rounded-md bg-black/20">
                    <img 
                      src={link.imageUrl} 
                      alt={link.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2 flex-1 flex flex-col">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-white">{link.title}</h3>
                      <ExternalLink className="w-4 h-4 text-futuristic-light flex-shrink-0 ml-1" />
                    </div>
                    {link.description && (
                      <p className="text-sm text-gray-300 mt-1">{link.description}</p>
                    )}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Button 
          onClick={scrollPrev} 
          size="icon" 
          variant="outline" 
          className="mx-1 bg-transparent border-white/20 hover:bg-white/10"
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
          className="mx-1 bg-transparent border-white/20 hover:bg-white/10"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LinkCarousel;
