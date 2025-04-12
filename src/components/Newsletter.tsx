
import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { EnvelopeIcon } from "lucide-react";
import { toast } from "./ui/use-toast";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate submission
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá as próximas edições no seu e-mail.",
      });
      setEmail('');
    }, 1500);
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-r from-futuristic-secondary/20 to-futuristic-primary/20 backdrop-blur-sm border border-white/10">
      <div className="px-6 py-8 md:flex md:items-start md:justify-between md:space-x-8">
        {/* Left side - Text content */}
        <div className="md:max-w-[60%]">
          <div className="mb-2 text-sm uppercase tracking-wider text-futuristic-purple font-semibold">
            Newsletter
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight text-gradient-purple">
            Universo Digital
          </h2>
          <div className="space-y-4">
            <p className="text-lg">
              Aprenda a <span className="font-semibold">Viver no Mundo Digital</span>.
            </p>
            <p className="text-white/80">
              Crie, conecte-se e compartilhe suas experiências na 
              <span className="font-semibold text-white"> Nova Era</span> da comunicação 
              usando o poder da Internet.
            </p>
            <p className="text-white/80">
              Uma nova publicação toda semana às 18:18. Cadastre seu 
              <span className="font-semibold text-white"> melhor email abaixo</span> para 
              desbloquear todas as publicações.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="email"
                  placeholder="Coloque aqui seu melhor e-mail"
                  className="pl-10 h-12 bg-black/20 border-white/20 focus:border-futuristic-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit"
                className="bg-futuristic-primary hover:bg-futuristic-primary/80 text-white h-12"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Quero Ler Agora →"}
              </Button>
            </form>

            <p className="text-xs text-white/60 flex items-center mt-2">
              <span className="inline-block mr-2">🔒</span>
              Cadastro Gratuito
            </p>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block relative mt-6 md:mt-0">
          <div className="bg-gradient-to-tr from-black/60 to-transparent absolute inset-0 rounded-xl pointer-events-none"></div>
          <div className="w-80 bg-white rounded-xl overflow-hidden shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="bg-black text-white px-5 py-4">
              <h3 className="font-bold text-lg">O Universo Digital dos Conectados</h3>
              <p className="text-sm text-gray-300">Universo Digital - Edição #029</p>
            </div>
            <div className="p-4">
              <img 
                src="/lovable-uploads/5b49c402-828d-4b5d-971d-19e61b066ac8.png" 
                alt="Newsletter preview" 
                className="w-full h-auto rounded"
              />
              <p className="mt-3 text-sm text-gray-700">
                "Você está conectado? Está tudo bem?"<br/>
                "Você é sempre assim na web?"<br/>
                "Você parece muito fechado. Se abra mais!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
