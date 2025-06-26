import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SingleSelector from "@/components/layout/SingleSelector";
import { useLanguages } from "@/lib/Hooks/Languages/useLanguages";
import { useCategories } from "@/lib/Hooks/Categories/useCategories";
import { toast } from "react-hot-toast";

interface Props {
  onSearch: (word: string, languages: string[], category: string) => void;
}

const SaveCustomWordForm: React.FC<Props> = ({ onSearch }) => {
  const [word, setWord] = useState("");
  const [language, setLanguage] = useState(() => localStorage.getItem("custom_selectedLanguage") ?? "");
  const [category, setCategory] = useState(() => localStorage.getItem("custom_selectedCategory") ?? "");
  const [description, setDescription] = useState("");
  const [example, setExample] = useState("");

  const { languages } = useLanguages();
  const { categories } = useCategories();

  const handleSubmit = () => {
    if (!word.trim()) {
      toast.error("Word is required");
      return;
    }

    if (!language) {
      toast.error("Language is required");
      return;
    }

    if (!category) {
      toast.error("Category is required");
      return;
    }


    onSearch(word, [language], category);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-[550px] border">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-900">Save personal word</h2>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <label className="text-sm self-center text-blue-900">Word *</label>
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
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <label className="text-sm self-center text-blue-900">Language *</label>
        <SingleSelector
          title="Select Language"
          options={languages.map((lang) => ({
            label: lang.label,
            value: lang.code,
            color: lang.color,
          }))}
          selected={language}
          onSelect={(val) => {
            setLanguage(val);
            localStorage.setItem("custom_selectedLanguage", val);
          }}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <label className="text-sm self-center text-blue-900">Category *</label>
        <SingleSelector
          title="Select Category"
          options={categories.map((cat) => ({
            label: cat.name,
            value: cat.id.toString(),
            color: cat.color,
          }))}
          selected={category}
          onSelect={(val) => {
            setCategory(val);
            localStorage.setItem("custom_selectedCategory", val);
          }}
          className="w-full"
        />
      </div>

      <div className="mb-2">
        <label className="text-sm mb-1 block text-blue-900">Description</label>
        <Textarea
          rows={2}
          maxLength={51}
          value={description}
          onChange={(e) => {
            const val = e.target.value;
            if (val.length > 50) {
              toast.error("Description must be 50 characters or less");
              return;
            }
            setDescription(val);
          }}
          className="resize-none"
        />
      </div>

      <div className="mb-2">
        <label className="text-sm mb-1 block text-blue-900">Example</label>
        <Textarea
          rows={2}
          maxLength={51}
          value={example}
          onChange={(e) => {
            const val = e.target.value;
            if (val.length > 50) {
              toast.error("Example must be 50 characters or less");
              return;
            }
            setExample(val);
          }}
          className="resize-none"
        />
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-[#1B3B48] text-white rounded-full py-2 mb-4"
      >
        Send
      </Button>
    </div>
  );
};

export default SaveCustomWordForm;
