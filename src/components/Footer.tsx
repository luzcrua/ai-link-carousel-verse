
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-8 py-6 text-center">
      <div className="max-w-4xl mx-auto px-4">
        {/* Contact Section */}
        <div className="mb-8 glass-card rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gradient-purple">Entre em Contato</h2>
          <p className="text-sm mb-6 dark:text-gray-300 light:text-gray-600">
            Tem alguma pergunta, proposta ou elogio? Preencha o formulário abaixo para entrar em contato.
          </p>
          
          <div className="w-full h-[700px] overflow-hidden rounded-lg">
            <iframe 
              src="https://arinelsonform.netlify.app/" 
              title="Formulário de Contato"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="text-sm dark:text-gray-400 light:text-gray-500">
          <p>© {new Date().getFullYear()} Arinelson Santos | Todos os direitos reservados</p>
          <p className="mt-2 text-xs">
            Idealizado por 
            <span className="mx-1">Arinelson</span> 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
