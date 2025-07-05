import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Word } from "@/types/WordView";
import { updateTranslation } from "@/lib/hooks/Words/useWordEdit";
import { getAuthHeaders } from "@/lib/hooks/Words/getAuthHeaders";

interface Props {
    word: Word;
    open: boolean;
    onClose: () => void;
    onUpdate?: (updated: Word) => void;
}

const EditTranslationModal: React.FC<Props> = ({ word, onClose, open, onUpdate }) => {
    const [translatedWord, setTranslatedWord] = useState(word.translatedWord);
    const [translatedDescription, setTranslatedDescription] = useState(word.translatedDescription);
    const [translatedExample, setTranslatedExample] = useState(word.translatedExample);

    const handleSubmit = async () => {
        if (!translatedWord.trim()) return alert("Translated word is required");
        if (!translatedDescription.trim()) return alert("Description is required");
        if (!translatedExample.trim()) return alert("Example is required");

        const { userId } = getAuthHeaders();
        if (!userId) return alert("User not authenticated");

        try {
            await updateTranslation(word.wordTranslationId, {
                userId: Number(userId),
                translatedWord,
                translatedDescription,
                translatedExample,
            });

            const updated: Word = {
                ...word,
                translatedWord,
                translatedDescription,
                translatedExample,
            };
            onClose();
            onUpdate?.(updated);
        } catch {
            // Error ya manejado en el hook
        }
    };

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="border dark:border-gray-100 bg-white p-4 md:p-6 rounded-xl shadow-md w-full">
                <h2 className="text-xl font-bold mb-4 text-center text-blue-900">Edit translation</h2>

                <div className="mb-2">
                    <Label className="text-sm text-blue-900">Translated Word *</Label>
                    <Input
                        maxLength={21}
                        value={translatedWord}
                        onChange={(e) => setTranslatedWord(e.target.value.slice(0, 20))}
                    />
                </div>

                <div className="mb-2">
                    <Label className="text-sm text-blue-900">Description *</Label>
                    <Textarea
                        rows={2}
                        maxLength={101}
                        value={translatedDescription}
                        onChange={(e) => setTranslatedDescription(e.target.value.slice(0, 100))}
                        className="resize-none dark:text-[#1B3B48] dark:border-[#D9E6E9]"
                    />
                </div>

                <div className="mb-4">
                    <Label className="text-sm text-blue-900">Example *</Label>
                    <Textarea
                        rows={2}
                        maxLength={101}
                        value={translatedExample}
                        onChange={(e) => setTranslatedExample(e.target.value.slice(0, 100))}
                        className="resize-none dark:text-[#1B3B48] dark:border-[#D9E6E9]"
                    />
                </div>

                <Button
                    onClick={handleSubmit}
                    className="w-full bg-[#1B3B48] text-white rounded-full py-2 hover:bg-[#162f39] dark:hover:bg-[#10242e]"
                >
                    Save Changes
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default EditTranslationModal;
