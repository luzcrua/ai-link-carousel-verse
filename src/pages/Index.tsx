
import React from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import ProfileHeader from '@/components/ProfileHeader';
import LinkTree from '@/components/LinkTree';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen w-full relative overflow-hidden">
        {/* Fundo animado com partículas */}
        <ParticleBackground />
        
        {/* Gradiente overlay para melhorar legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-futuristic-dark/10 via-futuristic-dark/50 to-futuristic-dark/80 pointer-events-none z-1 dark:opacity-100 light:opacity-60"></div>
        
        {/* Conteúdo principal */}
        <div className="relative z-10">
          <ProfileHeader 
            name="Seu Nome"
            avatarUrl="https://i.pravatar.cc/300"
            bio="Designer, Blogger, Fitness Enthusiast & Social Media Creator"
          />
          
          <LinkTree />
          
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
