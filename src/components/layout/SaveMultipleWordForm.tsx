import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { toast } from "react-hot-toast";
import CategorySelectorWithCreate from "./CategorySelectorWithCreate";

interface Props {
  onSearch: (word: string, languages: string[], category: number) => void;
}

const SaveMultipleWordForm: React.FC<Props> = ({ onSearch }) => {
  const [word, setWord] = useState("");
  const [languageCodes, setLanguageCodes] = useState<string[]>(() => {
    const stored = localStorage.getItem("multi_selectedLanguageCodes");
    return stored ? JSON.parse(stored) : [];
  });
  const [category, setCategory] = useState<number>(() => {
    const stored = localStorage.getItem("multi_selectedCategory");
    return stored ? parseInt(stored, 10) : 0;
  });



  useEffect(() => {
    const savedWord = localStorage.getItem("multi_searchWord");
    if (savedWord) {
      setWord(savedWord);
      
    }
  }, []);

    const handleSubmit = () => {
    if (!word.trim()) {
        toast.error("Word is required");
        return;
    }

    if (word.length > 20) {
        toast.error("Word must be 20 characters or less");
        return;
    }

    if (languageCodes.length === 0) {
        toast.error("At least one language is required");
        return;
    }

    if (!category) {
        toast.error("Category is required");
        return;
    }

    localStorage.setItem("multi_searchWord", word);
    localStorage.setItem("multi_selectedLanguageCodes", JSON.stringify(languageCodes));
    localStorage.setItem("multi_selectedCategory", category.toString());

  
    onSearch(word, languageCodes, category);
    };



  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full dark:border-gray-100 max-w-[550px] border">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-900">Search or save words with IA</h2>

      <div className="mb-4">
        <label className="text-sm block mb-1 text-blue-900">Word *</label>
        <Input
          maxLength={21}
          value={word}
          onChange={(e) => {
            const val = e.target.value;
            if (val.length > 20) {
              toast.error("Word must be 20 characters or less");
              return;
            }
            setWord(val);
          }}
          placeholder="Enter word"
        />
      </div>

      <div className="mb-4">
        <label className="text-sm block mb-1 text-blue-900">Languages *</label>
        <LanguageSelector
          onLanguageChange={(codes) => {
            setLanguageCodes(codes);
            localStorage.setItem("multi_selectedLanguageCodes", JSON.stringify(codes));
          }}
           className="w-full"
        />
      </div>


        
      <div className="grid grid-cols-2 gap-2 mb-2">
        <label className="text-sm self-center text-blue-900">Category *</label>
        <CategorySelectorWithCreate
          selected={category.toString()}
          onSelect={(val) => {
            const numericVal = parseInt(val, 10);
            setCategory(numericVal);
            localStorage.setItem("custom_selectedCategory", numericVal.toString());
          }}
        />
      </div>


      <Button
        onClick={handleSubmit}
          className="w-full bg-[#1B3B48] text-white rounded-full py-2 mb-4 hover:bg-[#162f39] dark:hover:bg-[#10242e]">
        Search
      </Button>
    </div>
  );
};

export default SaveMultipleWordForm;
