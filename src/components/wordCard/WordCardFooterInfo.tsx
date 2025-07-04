// src/components/WordCardFooterInfo.tsx
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface FooterInfoProps {
  imageUrl: string;
  username: string;
  language: string;
  postedAt: string;
}

const WordCardFooterInfo: React.FC<FooterInfoProps> = ({
  imageUrl,
  username,
  language,
  postedAt,
}) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src={imageUrl} alt={username} />
        <AvatarFallback>{username[0]}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col justify-center text-xs leading-tight text-gray-600 dark:text-gray-400">
        <span className="text-sm font-semibold text-blue-900 dark:text-gray-600">{username}</span>
        <div className="flex items-center gap-1">
          <span>🌐 {language.toUpperCase()}</span>
          <span>· {postedAt}</span>
        </div>
      </div>
    </div>
  );
};

export default WordCardFooterInfo;
