import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react"; 
import { reactionTypes } from "@/types/reactionTypes";

interface Props {
  open: boolean;
  onClose: () => void;
  onReact: (key: string) => void;
  currentReaction?: string;
}

const ReactionPickerModal: React.FC<Props> = ({
  open,
  onClose,
  onReact,
  currentReaction,
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent
      className="max-w-fit p-3 bg-gray-900 text-white rounded-full flex gap-3 items-center border border-white/20">
      {reactionTypes.map(({ emoji, key }) => (
        <button
          key={key}
          onClick={() => onReact(key)}
          className={cn(
            "text-2xl transition-transform hover:scale-125",
            currentReaction === key && "ring-2 ring-white/70 rounded-full"
          )}
          title={key}
        >
          {emoji}
        </button>
      ))}

      <button
        onClick={onClose}
        title="Close"
        className="text-xl hover:text-red-500 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </DialogContent>
  </Dialog>
);

export default ReactionPickerModal;
