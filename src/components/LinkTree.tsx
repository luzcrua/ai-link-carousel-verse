import React from 'react';
import LinkCarousel from './LinkCarousel';
import { Instagram, Linkedin, Facebook, Twitter, Bookmark, Music, Youtube, Brush, BookOpen, Dumbbell } from 'lucide-react';

// Dados mockados para as diferentes categorias
const socialMediaLinks = [
  {
    id: '1',
    title: 'Instagram',
    url: 'https://instagram.com/arinelson.me',
    imageUrl: 'https://placehold.co/600x400/C13584/FFFFFF/png?text=Instagram',
    description: 'Siga-me no Instagram'
  },
  {
    id: '2',
    title: 'LinkedIn (em breve)',
    url: 'https://linkedin.com/in/seuusuario',
    imageUrl: 'https://placehold.co/600x400/0A66C2/FFFFFF/png?text=LinkedIn',
    description: 'Meu perfil profissional'
  },
  {
    id: '3',
    title: 'TikTok',
    url: 'https://www.tiktok.com/@arinelsonsantoss',
    imageUrl: 'https://placehold.co/600x400/black/FFFFFF/png?text=TikTok',
    description: 'Vídeos curtos e divertidos'
  },
  {
    id: '4',
    title: 'Pinterest',
    url: 'https://br.pinterest.com/arinelsonsnts/',
    imageUrl: 'https://placehold.co/600x400/E60023/FFFFFF/png?text=Pinterest',
    description: 'Minhas inspirações e ideias'
  },
  {
    id: '5',
    title: 'Facebook (em breve)',
    url: 'https://facebook.com/seuusuario',
    imageUrl: 'https://placehold.co/600x400/1877F2/FFFFFF/png?text=Facebook',
    description: 'Minha página no Facebook'
  },
  {
    id: '6',
    title: 'Threads (em breve)',
    url: 'https://www.threads.net/@arinelson.me',
    imageUrl: 'https://placehold.co/600x400/black/FFFFFF/png?text=Threads',
    description: 'Siga-me no Threads'
  },
  {
    id: '7',
    title: 'YouTube',
    url: 'https://www.youtube.com/@arinelsonsnts',
    imageUrl: 'https://placehold.co/600x400/FF0000/FFFFFF/png?text=YouTube',
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
        title="PORTFOLIOS  (ATUALIZANDO)" 
        links={portfolioLinks} 
        autoplayInterval={6000}
      />
      
      <LinkCarousel 
        title="BLOG  (EM BREVE)" 
        links={blogLinks} 
        autoplayInterval={7000}
      />
      
      <LinkCarousel 
        title="DELTA FITNESS BRAZIL (EM BREVE)" 
        links={fitnessLinks} 
        autoplayInterval={5500}
      />
    </div>
  );
};

export default LinkTree;
