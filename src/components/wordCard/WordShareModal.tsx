import React, { useState } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Download, ClipboardCopy } from "lucide-react";
import WordCard from "./WordCard";
import { Word } from "@/types/WordView";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
  word: Word;
  onClose: () => void;
  open: boolean;
}

const WordShareModal: React.FC<Props> = ({ word, onClose, open }) => {
  const [filename, setFilename] = useState(`${word.originalWord}_idiomago`);
  const [scale, setScale] = useState(1);

  const previewScaleMap: Record<number, number> = {
    1: 0.8,
    2: 1.0,
    3: 1.2,
  };

  const captureCard = async (): Promise<Blob | null> => {
    const preview = document.getElementById("word-card-preview");
    if (!preview) return null;

    const toHide = document.querySelectorAll(".no-capture");
    toHide.forEach((el) => (el as HTMLElement).style.visibility = "hidden");

    const canvas = await html2canvas(preview, {
      scale,
      useCORS: true,
      backgroundColor: null, // <--- clave para fondo transparente
      removeContainer: true,
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
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>



      <DialogContent className="max-w-xs mx-auto p-4 md:p-6 md:max-w-4xl">
        <DialogTitle>
          <VisuallyHidden>Share Word</VisuallyHidden>
        </DialogTitle>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="flex-1 flex items-center justify-center">
            <div
              id="word-card-preview-wrapper"
              style={{
                padding: "32px",
                backgroundColor: "transparent",
              }}
            >
              <div
                id="word-card-preview"
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
                  onDelete={() => { }}
                  onUpdate={() => { }}
                  hideShape={true}
                  hideReactions={true}
                />
              </div>
            </div>

          </div>

          <div className="w-full md:w-[260px] flex flex-col justify-center gap-4">
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
              <div className="flex gap-2 mt-1 w-full">
                {[1, 2, 3].map((s) => (
                  <Button
                    key={s}
                    variant={scale === s ? "default" : "outline"}
                    onClick={() => setScale(s)}
                    className="flex-1"
                  >
                    {s}x
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 items-center">
              <div className="flex gap-2 w-full">
                <Button onClick={() => handleDownload("png")} className="flex-1">
                  <Download className="w-4 h-4 mr-1" />
                  PNG
                </Button>
                <Button onClick={() => handleDownload("jpeg")} className="flex-1">
                  <Download className="w-4 h-4 mr-1" />
                  JPG
                </Button>
              </div>

              <Button onClick={handleCopyToClipboard} className="w-full">
                <ClipboardCopy className="w-4 h-4 mr-1" />
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
