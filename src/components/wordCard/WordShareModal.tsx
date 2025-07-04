import React, { useState } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Download, ClipboardCopy } from "lucide-react";
import WordCard from "./WordCard";
import { Word } from "@/types/WordView";

interface Props {
    word: Word;
    onClose: () => void;
}

const WordShareModal: React.FC<Props> = ({ word, onClose }) => {
    const [filename, setFilename] = useState(`${word.originalWord}_idiomago`);
    const [scale, setScale] = useState(1);

    // Vista previa escalada
    const previewScaleMap: Record<number, number> = {
        1: 0.6,
        2: 0.8,
        3: 1,
    };

    const captureCard = async (): Promise<Blob | null> => {
        const preview = document.getElementById("word-card-preview");
        if (!preview) return null;

        // Ocultar elementos que no se deben capturar
        const toHide = document.querySelectorAll(".no-capture");
        toHide.forEach((el) => (el as HTMLElement).style.visibility = "hidden");

        const canvas = await html2canvas(preview, {
            scale: scale, // <--- aquí aplicamos el escalado real de render
            useCORS: true,
            backgroundColor: "#ffffff",
            removeContainer: true, // evita artefactos de layout
            logging: false,
        });

        toHide.forEach((el) => (el as HTMLElement).style.visibility = "visible");

        return new Promise((resolve) => {
            canvas.toBlob((blob) => resolve(blob || null));
        });
    };



    const handleDownload = async (type: "png" | "jpeg") => {
        const blob = await captureCard();
        if (blob) saveAs(blob, `${filename}.${type}`);
    };

    const handleCopyToClipboard = async () => {
        const blob = await captureCard();
        if (!blob) return;

        try {
            const clipboardItem = new ClipboardItem({ [blob.type]: blob });
            await navigator.clipboard.write([clipboardItem]);
            toast.success("✅ Copiado al portapapeles!");
        } catch (err) {
            console.error("❌ Error copiando imagen:", err);
            toast.error("❌ No se pudo copiar la imagen");
        }
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-4xl">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Vista previa */}
                    <div className="flex-1 flex items-center justify-center min-h-[360px]">
                        <div
                            id="word-card-preview"
                            className="bg-white rounded-2xl shadow-xl p-4"
                            style={{
                                transform: `scale(${previewScaleMap[scale]})`,
                                transformOrigin: "center",
                                display: "inline-block",
                            }}
                        >
                            <WordCard
                                word={word}
                                onChangeImage={() => { }}
                                onFavoriteToggle={() => { }}
                                hideShare={true}
                            />
                        </div>

                    </div>

                    {/* Controles */}
                    <div className="w-[260px] flex flex-col justify-center gap-4">
                        <h2 className="text-2xl font-bold text-blue-900 text-center dark:text-white">Save word</h2>
                        <div>
                            <Label>Nombre del archivo</Label>
                            <Input
                                value={filename}
                                onChange={(e) => setFilename(e.target.value)}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label>Escalar</Label>
                            <div className="flex gap-2 mt-1">
                                {[1, 2, 3].map((s) => (
                                    <Button
                                        key={s}
                                        variant={scale === s ? "default" : "outline"}
                                        onClick={() => setScale(s)}
                                    >
                                        {s}x
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <Button onClick={() => handleDownload("png")} className="flex-1">
                                    <Download className="w-4 h-4 mr-1" />
                                    PNG
                                </Button>
                                <Button onClick={() => handleDownload("jpeg")} className="flex-1">
                                    <Download className="w-4 h-4 mr-1" />
                                    JPG
                                </Button>
                            </div>
                            <Button onClick={handleCopyToClipboard} >
                                <ClipboardCopy className="w-4 h-4 mr-1 " />
                                Copiar al portapapeles
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WordShareModal;
