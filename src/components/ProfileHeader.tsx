
import React, { useEffect, useRef } from 'react';
import { Heart, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  name: string;
  avatarUrl?: string;
  bio?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  avatarUrl = "https://i.pravatar.cc/300",
  bio = "Minha coleção de links importantes"
}) => {
  const { theme, toggleTheme } = useTheme();
  const avatarRef = useRef<HTMLDivElement>(null);
  
  // Emit particles around avatar
  useEffect(() => {
    if (!avatarRef.current) return;
    
    const createParticle = () => {
      const particle = document.createElement('div');
      const size = Math.random() * 6 + 2;
      const avatar = avatarRef.current;
      if (!avatar) return;
      
      const avatarRect = avatar.getBoundingClientRect();
      const centerX = avatarRect.left + avatarRect.width / 2;
      const centerY = avatarRect.top + avatarRect.height / 2;
      
      // Random position around avatar (circular)
      const angle = Math.random() * Math.PI * 2;
      const radius = avatarRect.width / 1.8;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      // Set particle styles
      particle.style.position = 'fixed';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = '50%';
      particle.style.background = theme === 'dark' 
        ? 'rgba(214, 188, 250, 0.6)' 
        : 'rgba(155, 135, 245, 0.6)';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '10';
      particle.style.opacity = '0';
      particle.style.transition = 'all 1.5s ease-out';
      
      document.body.appendChild(particle);
      
      // Animate the particle
      setTimeout(() => {
        particle.style.opacity = '0.7';
        const moveX = Math.random() * 100 - 50;
        const moveY = Math.random() * 100 - 50;
        particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        particle.style.opacity = '0';
      }, 10);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1500);
    };
    
    // Create particles periodically
    const interval = setInterval(() => {
      createParticle();
    }, 500);
    
    return () => clearInterval(interval);
  }, [theme]);

  return (
    <div className="flex flex-col items-center text-center py-6 sm:py-10 mb-6 relative z-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          duration: 0.6 
        }}
        className="w-20 h-20 md:w-24 md:h-24 mb-4 relative"
        ref={avatarRef}
      >
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-futuristic-primary via-futuristic-secondary to-futuristic-accent"
          animate={{ 
            rotate: 360,
          }}
          transition={{ 
            duration: 10, 
            ease: "linear", 
            repeat: Infinity 
          }}
        />
        <Avatar className="w-full h-full relative z-10 border-2 border-futuristic-primary p-0.5">
          <AvatarImage 
            src={avatarUrl} 
            alt={name} 
            className="w-full h-full object-cover" 
          />
          <AvatarFallback className="bg-futuristic-dark">{name.charAt(0)}</AvatarFallback>
        </Avatar>
      </motion.div>
      
      <motion.h1 
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient mb-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {name}
      </motion.h1>
      
      <motion.p 
        className="text-gray-300 text-sm md:text-base max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {bio}
      </motion.p>
      
      <motion.div 
        className="mt-4 flex items-center justify-center text-futuristic-light text-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
       
      </motion.div>
      
      <motion.button
        className="absolute top-0 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-300" />
        ) : (
          <Moon className="w-5 h-5 text-blue-300" />
        )}
      </motion.button>
    </div>
  );
};

export default ProfileHeader;
