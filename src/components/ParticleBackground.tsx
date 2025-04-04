
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  attractionForce: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const mousePosition = useRef<{x: number, y: number} | null>(null);
  const { theme } = useTheme();
  const [hoverParticle, setHoverParticle] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const getRandomColor = () => {
      // Different color schemes for dark and light modes
      const darkColors = [
        'rgba(155, 135, 245, 0.7)', // Primary
        'rgba(126, 105, 171, 0.7)', // Secondary
        'rgba(110, 89, 165, 0.7)',  // Accent
        'rgba(214, 188, 250, 0.6)', // Light
      ];
      
      const lightColors = [
        'rgba(155, 135, 245, 0.3)', // Primary but lighter
        'rgba(126, 105, 171, 0.3)', // Secondary but lighter
        'rgba(110, 89, 165, 0.3)',  // Accent but lighter
        'rgba(214, 188, 250, 0.2)', // Light but even lighter
      ];
      
      const colors = theme === 'dark' ? darkColors : lightColors;
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const initParticles = () => {
      particles.current = [];
      // Fewer particles in light mode for a cleaner look
      const particleCount = theme === 'dark' 
        ? Math.min(Math.floor(window.innerWidth * 0.05), 120)
        : Math.min(Math.floor(window.innerWidth * 0.03), 80);
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (theme === 'dark' ? 2 : 1.5) + (theme === 'dark' ? 0.5 : 0.3),
          speedX: (Math.random() - 0.5) * (theme === 'dark' ? 0.3 : 0.2),
          speedY: (Math.random() - 0.5) * (theme === 'dark' ? 0.3 : 0.2),
          color: getRandomColor(),
          opacity: Math.random() * (theme === 'dark' ? 0.5 : 0.3) + (theme === 'dark' ? 0.2 : 0.1),
          attractionForce: Math.random() * 0.05 + 0.02
        });
      }
    };

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleMouseLeave = () => {
      mousePosition.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      mousePosition.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        mousePosition.current = null;
      }, 500);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create nebula background effect - different for light/dark mode
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 
        0, 
        canvas.width / 2, 
        canvas.height / 2, 
        canvas.width / 1.5
      );
      
      if (theme === 'dark') {
        gradient.addColorStop(0, 'rgba(40, 30, 60, 0.3)');
        gradient.addColorStop(0.5, 'rgba(25, 20, 35, 0.1)');
        gradient.addColorStop(1, 'rgba(20, 15, 30, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(200, 180, 255, 0.05)');
        gradient.addColorStop(0.5, 'rgba(180, 160, 230, 0.03)');
        gradient.addColorStop(1, 'rgba(160, 140, 210, 0)');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.current.forEach((particle, index) => {
        // Apply mouse attraction if mouse position exists
        if (mousePosition.current) {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const attractionRadius = theme === 'dark' ? 150 : 120;
          
          if (distance < attractionRadius) {
            // Calculate attraction direction
            const angle = Math.atan2(dy, dx);
            const force = (1 - distance / attractionRadius) * particle.attractionForce;
            
            // Apply attraction - stronger in dark mode
            const forceMult = theme === 'dark' ? 2 : 1.5;
            particle.x += Math.cos(angle) * force * forceMult;
            particle.y += Math.sin(angle) * force * forceMult;
            
            // Increase opacity near mouse
            const maxOpacity = theme === 'dark' ? 0.9 : 0.6;
            particle.opacity = Math.min(maxOpacity, particle.opacity + 0.01);
          } else {
            // Gradually return to original opacity
            const minOpacity = theme === 'dark' ? 0.2 : 0.1;
            particle.opacity = Math.max(minOpacity, particle.opacity - 0.005);
          }
        } else {
          // Gradually return to original opacity
          const minOpacity = theme === 'dark' ? 0.2 : 0.1;
          particle.opacity = Math.max(minOpacity, particle.opacity - 0.005);
        }
        
        // Draw particle with current opacity
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(/[\d\.]+\)$/g, `${particle.opacity})`);
        ctx.fill();
        
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges with slight randomization
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
          particle.speedX += (Math.random() - 0.5) * 0.04; // Add slight randomness
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
          particle.speedY += (Math.random() - 0.5) * 0.04; // Add slight randomness
        }

        // Limit max speed
        const maxSpeed = theme === 'dark' ? 0.8 : 0.5;
        const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
        if (currentSpeed > maxSpeed) {
          particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
          particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
        }
      });
      
      // Draw connections between particles that are close - different for light/dark
      particles.current.forEach((particle, index) => {
        for (let j = index + 1; j < particles.current.length; j++) {
          const otherParticle = particles.current[j];
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + 
            Math.pow(particle.y - otherParticle.y, 2)
          );
          
          const connectionDistance = theme === 'dark' ? 100 : 80;
          
          if (distance < connectionDistance) {
            // Average the two particles' opacities for connection
            const connectionOpacity = (particle.opacity + otherParticle.opacity) / 2 * (theme === 'dark' ? 0.5 : 0.3);
            
            ctx.beginPath();
            if (theme === 'dark') {
              ctx.strokeStyle = `rgba(155, 135, 245, ${connectionOpacity - distance/500})`;
            } else {
              ctx.strokeStyle = `rgba(126, 105, 171, ${connectionOpacity * 0.7 - distance/700})`;
            }
            ctx.lineWidth = theme === 'dark' ? 0.5 : 0.3;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
      });
      
      // Create glow effect for hover particle if it exists
      if (hoverParticle) {
        ctx.beginPath();
        const glowRadius = 50 + Math.sin(Date.now() / 300) * 10;
        const gradient = ctx.createRadialGradient(
          hoverParticle.x, hoverParticle.y, 0,
          hoverParticle.x, hoverParticle.y, glowRadius
        );
        
        if (theme === 'dark') {
          gradient.addColorStop(0, 'rgba(155, 135, 245, 0.4)');
          gradient.addColorStop(1, 'rgba(155, 135, 245, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(126, 105, 171, 0.2)');
          gradient.addColorStop(1, 'rgba(126, 105, 171, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.arc(hoverParticle.x, hoverParticle.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Set up event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [theme]);

  // Set hover particle position from LinkCarousel
  const setHoverEffect = (x: number, y: number) => {
    setHoverParticle({x, y});
  };

  const clearHoverEffect = () => {
    setHoverParticle(null);
  };

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;
