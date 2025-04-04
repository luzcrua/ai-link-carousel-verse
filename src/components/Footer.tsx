
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-8 py-6 text-center text-sm text-gray-400">
      <p>© {new Date().getFullYear()} Seu Nome | Todos os direitos reservados</p>
      <p className="mt-2 text-xs">
        Criado com 
        <span className="mx-1">💜</span> 
        e tecnologia futurista
      </p>
    </footer>
  );
};

export default Footer;
