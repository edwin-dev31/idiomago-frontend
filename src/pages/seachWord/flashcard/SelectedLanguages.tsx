// src/components/FlashCard/SelectedLanguages.tsx
import React from "react";

const languages = [
  { value: "english", label: "English", color: "#8DB7C1" },
  { value: "spanish", label: "Spanish", color: "#5DCAD1" },
  { value: "french", label: "French", color: "#7B88C8" },
  { value: "german", label: "German", color: "#8DB7C1" },
  { value: "chinese", label: "Chinese (Mandarin)", color: "#5DCAD1" },
  { value: "hindi", label: "Hindi", color: "#7B88C8" },
  { value: "arabic", label: "Arabic", color: "#8DB7C1" },
  { value: "portuguese", label: "Portuguese", color: "#5DCAD1" },
];

type Props = {
  selectedLanguages: string[];
};

export const SelectedLanguages: React.FC<Props> = ({ selectedLanguages }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {selectedLanguages.map((lang) => {
        const language = languages.find((l) => l.value === lang);
        return (
          <div
            key={lang}
            className="px-6 py-2 rounded-full text-white text-sm"
            style={{ backgroundColor: language?.color ?? "#5DCAD1" }}
          >
            {language?.label ?? lang}
          </div>
        );
      })}
    </div>
  );
};
