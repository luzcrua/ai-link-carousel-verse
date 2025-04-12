
import React from 'react';
import { useEffect, useRef } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import ProfileHeader from '@/components/ProfileHeader';
import LinkTree from '@/components/LinkTree';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { ThemeProvider } from '@/components/ThemeProvider';

const Index = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create and play background audio with low volume
    if (audioRef.current) {
      audioRef.current.volume = 0.1; // Set volume to 10%
      audioRef.current.play().catch(error => {
        console.log("Audio autoplay was prevented:", error);
      });
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full relative overflow-hidden">
        {/* Background audio */}
        <audio 
          ref={audioRef} 
          loop 
          preload="auto"
          src="/background-music.mp3" 
        />
        
        {/* Fundo animado com partículas */}
        <ParticleBackground />
        
        {/* Gradiente overlay para melhorar legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-futuristic-dark/10 via-futuristic-dark/50 to-futuristic-dark/80 pointer-events-none z-1 dark:opacity-100 light:opacity-60"></div>
        
        {/* Conteúdo principal */}
        <div className="relative z-10">
          <ProfileHeader 
            name="Arinelson Santos"
            avatarUrl="/fotoDePerfil.jpg"
            bio="Criador de conteúdo e resolvedor de problemas digitais.
            O digital é um meio, não um fim."
          />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <Newsletter />
          </div>
          
          <LinkTree />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
