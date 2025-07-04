import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SingleSelector from "@/components/layout/SingleSelector";
import { useLanguages } from "@/lib/hooks/Languages/useLanguages";
import { toast } from "react-hot-toast";
import { SaveSingleWordDTO } from "@/types/SaveSingleWordDTO";
import { Visibility } from "@/types/Visibility";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CategorySelectorWithCreate from "./CategorySelectorWithCreate";
interface Props {
  onSearch: (data: SaveSingleWordDTO) => void
}

const SaveCustomWordForm: React.FC<Props> = ({ onSearch }) => {
  const [word, setWord] = useState("");
  const [language, setLanguage] = useState(() => localStorage.getItem("custom_selectedLanguage") ?? "");
  const [category, setCategory] = useState<number>(() => {
    const stored = localStorage.getItem("custom_selectedCategory");
    return stored ? parseInt(stored, 10) : 0;
  });
  const [description, setDescription] = useState("");
  const [example, setExample] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.PRIVATE);

  const { languages } = useLanguages();

  const handleSubmit = () => {
    if (!word.trim()) return toast.error("Word is required");
    if (!language) return toast.error("Language is required");
    if (!category) return toast.error("Category is required");
    if (!description) return toast.error("Description is required");
    if (!example) return toast.error("Example is required");

    const user = Number(localStorage.getItem("userId"));
    if (!user) return toast.error("User not found");

    onSearch({
      user,
      word,
      languageCode: language,
      categoryId: category,
      description,
      example,
      visibility,
    });

    setWord("");
    setLanguage("");
    setCategory(0);
    setDescription("");
    setExample("");
    setVisibility(Visibility.PRIVATE);
    localStorage.removeItem("custom_selectedLanguage");
    localStorage.removeItem("custom_selectedCategory");
  };


  return (
    <div className="bg-white p-6 rounded-xl shadow-md  dark:border-gray-100 w-full max-w-[550px] border">
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
          className="w-full "
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

      <div className="grid grid-cols-2 gap-2 mb-2">
        <label className="text-sm self-center text-blue-900">Visibility *</label>
        <RadioGroup
          value={visibility}
          onValueChange={(val) => setVisibility(val as Visibility)}
          className="flex gap-4 w-full"
        >
          {[{ label: "Private", value: Visibility.PRIVATE }, { label: "Public", value: Visibility.PUBLIC }].map((option) => (
            <label
              key={option.value}
              htmlFor={option.value}
              className={`
                flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md
                text-sm font-bold cursor-pointer bg-white text-[#1B3B48] dark:bg-white dark:text-[#1B3B48]
              `}
            >
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="peer hidden"
              />
              <div className="w-4 h-4 rounded-full border-2 border-blue-900 flex items-center justify-center">
                {visibility === option.value && (
                  <div className="w-2 h-2 rounded-full bg-blue-900" />
                )}
              </div>
              {option.label}
            </label>
          ))}
        </RadioGroup>
      </div>

      <div className="mb-2">
        <label className="text-sm mb-1 block text-blue-900">Description *</label>
        <Textarea
          rows={2}
          maxLength={101}
          value={description}
          onChange={(e) => {
            const val = e.target.value;
            if (val.length > 100) {
              toast.error("Description must be 100 characters or less");
              return;
            }
            setDescription(val);
          }}
          className="resize-none dark:text-[#1B3B48] dark:border-[#D9E6E9]"
        />
      </div>

      <div className="mb-2">
        <label className="text-sm mb-1 block text-blue-900">Example *</label>
        <Textarea
          rows={2}
          maxLength={101}
          value={example}
          onChange={(e) => {
            const val = e.target.value;
            if (val.length > 100) {
              toast.error("Example must be 100 characters or less");
              return;
            }
            setExample(val);
          }}
          className="resize-none dark:text-[#1B3B48] dark:border-[#D9E6E9]"
        />
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-[#1B3B48] text-white rounded-full py-2 mb-4 hover:bg-[#162f39] dark:hover:bg-[#10242e]">
        Send
      </Button>
    </div>
  );
};

export default SaveCustomWordForm;
