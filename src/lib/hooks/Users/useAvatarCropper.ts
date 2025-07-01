import { useState } from "react";

export function useAvatarCropper() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(selected.type)) {
      alert("Only JPG, PNG and WEBP files are allowed.");
      return;
    }

    setFile(selected);
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(selected);
  };

  return {
    file,
    imageSrc,
    handleFileChange,
    clear: () => {
      setImageSrc(null);
      setFile(null);
    },
  };
}
