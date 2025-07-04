import React, { useState, useRef, useEffect } from "react";
import SingleSelector from "@/components/layout/SingleSelector";
import { useCategories, useSaveCategory } from "@/lib/hooks/Categories/useCategories";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  selected: string;
  onSelect: (val: string) => void;
}

const CategorySelectorWithCreate: React.FC<Props> = ({ selected, onSelect }) => {
  const { categories, refetchCategories } = useCategories();
  const { saveCategory, loading } = useSaveCategory();

  const [showInput, setShowInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [createdId, setCreatedId] = useState<string | null>(null); // ← para forzar selección manual

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  useEffect(() => {
    if (createdId) {
      // Reintentar la selección tras refetch
      const exists = categories.find((c) => c.id.toString() === createdId);
      if (exists) {
        onSelect(createdId);
        localStorage.setItem("custom_selectedCategory", createdId);
        setCreatedId(null); // reset
      }
    }
  }, [categories, createdId, onSelect]);

  const [isClickingSave, setIsClickingSave] = useState(false);

const handleCreate = async () => {
  setIsClickingSave(true); // prevenir blur
  const trimmed = newCategory.trim();

  if (trimmed.length < 3) {
    toast.error("Category must be at least 3 characters");
    setIsClickingSave(false);
    return;
  }

  const result = await saveCategory(trimmed);
  if (result) {
    await refetchCategories();
    onSelect(result.id.toString());
    localStorage.setItem("custom_selectedCategory", result.id.toString());
    setNewCategory("");
    setShowInput(false);
  }
  setIsClickingSave(false);
};

const handleBlur = () => {
  setTimeout(() => {
    if (!isClickingSave) {
      setShowInput(false);
      setNewCategory("");
    }
  }, 3000);
};

  const options = categories.map((cat) => ({
    label: cat.name,
    value: cat.id.toString(),
    color: cat.color,
  }));

  return (
    <div className="flex flex-col gap-2 w-full">
      <SingleSelector
        title="Select Category"
        options={options}
        selected={selected}
        onSelect={onSelect}
        className="w-full"
      />

      {!showInput ? (
        <button
          type="button"
          className="text-sm text-blue-700 underline self-start"
          onClick={() => setShowInput(true)}
        >
          + Create new category
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onBlur={handleBlur}
            className="text-sm py-1 h-8"
          />
          <Button
            size="sm"
            className="bg-[#1B3B48] text-white hover:bg-[#162f39] dark:hover:bg-[#10242e] rounded-full"
            onClick={handleCreate}
            disabled={loading}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategorySelectorWithCreate;
