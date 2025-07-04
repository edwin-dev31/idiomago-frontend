import React from "react";
import {
  MoreVertical, ImageIcon,
  Pencil, Trash2,
} from "lucide-react";
import { FaShareAlt } from "react-icons/fa";
import {
  DropdownMenu, DropdownMenuTrigger,
  DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Word } from "@/types/WordView";
import { Button } from "@/components/ui/button";

interface Props {
  onChangeImage: () => void;
  onEditTranslation?: () => void;
  onDeleteCard?: () => void;
  onShare?: (word: Word) => void;
  word: Word;
}

const WordCardOptionsDropdown: React.FC<Props> = ({
  onChangeImage,
  onEditTranslation,
  onDeleteCard,
  onShare,
  word
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuItem onClick={onChangeImage}>
          <ImageIcon className="mr-2 h-4 w-4" />
          Change Image
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onEditTranslation}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Translation
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onShare?.(word)}>
          <FaShareAlt className="mr-2 h-4 w-4" />
          Share word card
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onDeleteCard}>
          <Trash2 className="mr-2 h-4 w-4 text-red-500" />
          Delete Card
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WordCardOptionsDropdown;
