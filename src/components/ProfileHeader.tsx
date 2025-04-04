
import React from 'react';
import { Heart } from 'lucide-react';

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
  return (
    <div className="flex flex-col items-center text-center py-6 sm:py-10 mb-6 relative z-10">
      <div className="w-20 h-20 md:w-24 md:h-24 mb-4 relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-futuristic-primary via-futuristic-secondary to-futuristic-accent animate-pulse-slow"></div>
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover rounded-full border-2 border-futuristic-primary p-0.5 relative z-10"
        />
      </div>
      
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient mb-2">{name}</h1>
      
      <p className="text-gray-300 text-sm md:text-base max-w-md">{bio}</p>
      
      <div className="mt-4 flex items-center justify-center text-futuristic-light text-sm">
        <span>Feito com</span>
        <Heart className="w-4 h-4 mx-1 text-red-400 animate-pulse" />
        <span>e AI</span>
      </div>
    </div>
  );
};

export default ProfileHeader;
