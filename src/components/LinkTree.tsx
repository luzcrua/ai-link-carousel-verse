
import React from 'react';
import LinkCarousel from './LinkCarousel';
import { Instagram, LinkedinIcon, Facebook, Twitter, PinterestIcon, TiktokIcon, YoutubeIcon, Brush, BookOpen, Dumbbell } from 'lucide-react';

// Dados mockados para as diferentes categorias
const socialMediaLinks = [
  {
    id: '1',
    title: 'Instagram',
    url: 'https://instagram.com/seuusuario',
    imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Instagram',
    description: 'Siga-me no Instagram'
  },
  {
    id: '2',
    title: 'LinkedIn',
    url: 'https://linkedin.com/in/seuusuario',
    imageUrl: 'https://placehold.co/600x400/7E69AB/FFFFFF/png?text=LinkedIn',
    description: 'Meu perfil profissional'
  },
  {
    id: '3',
    title: 'TikTok',
    url: 'https://tiktok.com/@seuusuario',
    imageUrl: 'https://placehold.co/600x400/6E59A5/FFFFFF/png?text=TikTok',
    description: 'Vídeos curtos e divertidos'
  },
  {
    id: '4',
    title: 'Pinterest',
    url: 'https://pinterest.com/seuusuario',
    imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Pinterest',
    description: 'Minhas inspirações e ideias'
  },
  {
    id: '5',
    title: 'Facebook',
    url: 'https://facebook.com/seuusuario',
    imageUrl: 'https://placehold.co/600x400/7E69AB/FFFFFF/png?text=Facebook',
    description: 'Minha página no Facebook'
  },
  {
    id: '6',
    title: 'Twitter',
    url: 'https://twitter.com/seuusuario',
    imageUrl: 'https://placehold.co/600x400/6E59A5/FFFFFF/png?text=Twitter',
    description: 'Siga-me no Twitter'
  },
  {
    id: '7',
    title: 'YouTube',
    url: 'https://youtube.com/seucanal',
    imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=YouTube',
    description: 'Inscreva-se no meu canal'
  }
];

const portfolioLinks = [
  {
    id: '1',
    title: 'Projeto de Design',
    url: 'https://seusite.com/projeto1',
    imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Design+Projeto',
    description: 'UI/UX para app de fitness'
  },
  {
    id: '2',
    title: 'Website Corporativo',
    url: 'https://seusite.com/projeto2',
    imageUrl: 'https://placehold.co/600x400/7E69AB/FFFFFF/png?text=Website',
    description: 'Redesign de site corporativo'
  },
  {
    id: '3',
    title: 'Branding',
    url: 'https://seusite.com/projeto3',
    imageUrl: 'https://placehold.co/600x400/6E59A5/FFFFFF/png?text=Branding',
    description: 'Identidade visual para startup'
  }
];

const blogLinks = [
  {
    id: '1',
    title: 'Dicas de Produtividade',
    url: 'https://seublog.com/produtividade',
    imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Produtividade',
    description: 'Como ser mais produtivo'
  },
  {
    id: '2',
    title: 'Viagem à Itália',
    url: 'https://seublog.com/viagem-italia',
    imageUrl: 'https://placehold.co/600x400/7E69AB/FFFFFF/png?text=Viagem',
    description: 'Minha experiência na Toscana'
  },
  {
    id: '3',
    title: 'Receitas Saudáveis',
    url: 'https://seublog.com/receitas',
    imageUrl: 'https://placehold.co/600x400/6E59A5/FFFFFF/png?text=Receitas',
    description: 'Alimentação saudável e gostosa'
  }
];

const fitnessLinks = [
  {
    id: '1',
    title: 'Linha de Roupas Fitness',
    url: 'https://sualoja.com/roupas',
    imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Roupas+Fitness',
    description: 'Nova coleção primavera/verão'
  },
  {
    id: '2',
    title: 'Treino para Iniciantes',
    url: 'https://seusite.com/treino-iniciantes',
    imageUrl: 'https://placehold.co/600x400/7E69AB/FFFFFF/png?text=Treino',
    description: 'Comece sua jornada fitness'
  },
  {
    id: '3',
    title: 'Suplementos Recomendados',
    url: 'https://seusite.com/suplementos',
    imageUrl: 'https://placehold.co/600x400/6E59A5/FFFFFF/png?text=Suplementos',
    description: 'Os melhores para seu objetivo'
  },
  {
    id: '4',
    title: 'Dicas de Nutrição',
    url: 'https://seusite.com/nutricao',
    imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Nutrição',
    description: 'Alimente-se bem para resultados'
  }
];

const LinkTree: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <LinkCarousel 
        title="REDES SOCIAIS" 
        links={socialMediaLinks} 
        autoplayInterval={5000}
      />
      
      <LinkCarousel 
        title="PORTFOLIOS" 
        links={portfolioLinks} 
        autoplayInterval={6000}
      />
      
      <LinkCarousel 
        title="BLOG" 
        links={blogLinks} 
        autoplayInterval={7000}
      />
      
      <LinkCarousel 
        title="MODA FITNESS" 
        links={fitnessLinks} 
        autoplayInterval={5500}
      />
    </div>
  );
};

export default LinkTree;
