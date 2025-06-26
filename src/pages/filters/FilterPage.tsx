import React, { useEffect, useState } from "react";
import FilterHeader from "./FilterHeader";
import { Input } from "@/components/ui/input";
import WordCardPaginator from "@/components/WordCardPaginator";
import { Button } from "@/components/ui/button";
import FilterButtonOptions from "./FilterButtonOptions";
import SingleSelector from "@/components/layout/SingleSelector";

import {
  useFilterByLanguage,
  useFilterByCategories,
  useFilterByDescription,
  useFilterByExample,
} from "@/lib/Hooks/Filters/useFilter";
import { useLanguages } from "@/lib/Hooks/Languages/useLanguages";
import { useCategories } from "@/lib/Hooks/Categories/useCategories";
import { useUserFavorites } from "@/lib/Hooks/Favorites/useUserFavorites";
import { addFavorite, deleteFavorite } from "@/lib/Hooks/Favorites/useFavoriteActions";
import { Word } from "@/lib/WordView";
import { changeImage } from "@/lib/Hooks/Words/useChangeImage"; 

type FilterType = "language" | "category" | "description" | "example";

const FilterPage: React.FC = () => {
  const [filterType, setFilterType] = useState<FilterType>(
    () => (localStorage.getItem("filterType") as FilterType) || "language"
  );
  const [inputValue, setInputValue] = useState(
    () => localStorage.getItem("filterInput") || ""
  );
  const [selectedLang, setSelectedLang] = useState(
    () => localStorage.getItem("filterSelectedLang") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    () => localStorage.getItem("filterSelectedCategory") || ""
  );

  const [results, setResults] = useState<Word[]>([]);

  const userId = localStorage.getItem("userId");

  const { languages } = useLanguages();
  const { categories } = useCategories();
  const { favorites } = useUserFavorites(); // traer favoritos reales
  const [inputDraft, setInputDraft] = useState(inputValue);

  const { filter: filterLang } = useFilterByLanguage();
  const { filter: filterCat } = useFilterByCategories();
  const { filter: filterDef } = useFilterByDescription();
  const { filter: filterEx } = useFilterByExample();

  const applyFavoritesToWords = (words: Word[]): Word[] => {
    const favIds = new Set(favorites.map((f) => f.wordTranslationId));
    return words.map((word) => ({
      ...word,
      isFavorite: favIds.has(word.wordTranslationId),
    }));
  };

const handleChangeImage = async (wordTranslationId: number) => {
  const newImageUrl = await changeImage(wordTranslationId);

  if (newImageUrl) {
    setResults((prevWords) =>
      prevWords.map((word) =>
        word.wordTranslationId === wordTranslationId
          ? { ...word, imageUrl: newImageUrl }
          : word
      )
    );
  }
};


  const handleSubmit = async () => {
    try {
      // Guardar la búsqueda
      localStorage.setItem("filterType", filterType);
      localStorage.setItem("filterInput", inputValue);
      localStorage.setItem("filterSelectedLang", selectedLang);
      localStorage.setItem("filterSelectedCategory", selectedCategory);

      let filtered: Word[] = [];

      if (filterType === "language" && selectedLang) {
        filtered = await filterLang([selectedLang]);
      } else if (filterType === "category" && selectedCategory) {
        filtered = await filterCat(Number(selectedCategory));
      } else if (filterType === "description" && inputValue) {
        filtered = await filterDef(inputValue);
      } else if (filterType === "example" && inputValue) {
        filtered = await filterEx(inputValue);
      }

      setResults(applyFavoritesToWords(filtered));
    } catch (err) {
      console.error("❌ Error filtering:", err);
    }
  };

  const handleFavoriteToggle = async (id: number, isFavorite: boolean) => {
    if (!userId) return;

    try {
      if (isFavorite) {
        await deleteFavorite(Number(userId), id);
      } else {
        await addFavorite(Number(userId), id);
      }

      setResults((prev) =>
        prev.map((word) =>
          word.wordTranslationId === id
            ? { ...word, isFavorite: !isFavorite }
            : word
        )
      );
    } catch (err) {
      console.error("❌ Error toggling favorite:", err);
    }
  };


  useEffect(() => {
    // Si la opción activa es 'language' y hay lenguajes cargados
    if (filterType === "language" && languages.length > 0 && !selectedLang) {
      setSelectedLang(languages[0].code); // Primer idioma como default
    }

    // Si la opción activa es 'category' y hay categorías cargadas
    if (filterType === "category" && categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id.toString()); 
    }

    if (filterType === "description" && !inputValue) {
      setInputValue("Astro");
    }
    if (filterType === "example" && !inputValue) {
      setInputValue("sol");
    }

    const shouldSearch =
    (["description", "example"].includes(filterType) && inputValue);

    if (shouldSearch) {
      handleSubmit();
    }
  }, [filterType, languages, categories, inputValue]);


  useEffect(() => {
    if (filterType === "language" && selectedLang) {
      handleSubmit();
    }
  }, [selectedLang]);

  useEffect(() => {
    if (filterType === "category" && selectedCategory) {
      handleSubmit();
    }
  }, [selectedCategory]);

  return (
    <div className="p-6">
      <FilterHeader />
      <FilterButtonOptions
        onFilterChange={(type) => {
        setFilterType(type);
        setResults([]);
        setInputValue("");
        setSelectedLang("");
        setSelectedCategory("");

        localStorage.setItem("filterType", type);
        localStorage.removeItem("filterInput");
        localStorage.removeItem("filterSelectedLang");
        localStorage.removeItem("filterSelectedCategory");

        const storedInput = localStorage.getItem("filterInput") || "";
        if (type === "description" || type === "example") {
          setInputDraft(storedInput);
        } else {
          setInputDraft("");
        }
      }}

        activeFilter={filterType}
      />

      <div className="mb-8 flex flex-col items-center gap-4">
        {filterType === "language" && (
          <SingleSelector
            title="Select Language"
            options={languages.map((lang) => ({
              label: lang.label,
              value: lang.code,
              color: lang.color,
            }))}
            selected={selectedLang}
            onSelect={setSelectedLang}
          />
        )}

        {filterType === "category" && (
          <SingleSelector
            title="Select Category"
            options={categories.map((cat) => ({
              label: cat.name,
              value: cat.id.toString(),
              color: cat.color,
            }))}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        )}

        {["description", "example"].includes(filterType) && (
          <div className="flex items-center gap-4 mt-2 w-full max-w-md">
            <Input
              placeholder={`Enter ${filterType}`}
              value={inputDraft}
              onChange={(e) => setInputDraft(e.target.value)}
              className="flex-1"
            />

            <Button
              className="bg-[#1B3B48] text-white px-6 py-2 rounded-full"
              onClick={() => {
                if (inputDraft.trim() !== "") {
                  setInputValue(inputDraft);
                }
              }}
            >
              Search
            </Button>
          </div>
        )}

        {results.length === 0 && (
          <p className="mt-6 text-gray-500 italic">
            No words found for the selected filter.
          </p>
        )}
      </div>

      {results.length > 0 && (
        <WordCardPaginator
          words={results}
          onFavoriteToggle={handleFavoriteToggle}
          onChangeImage={handleChangeImage}
        />
      )}
    </div>
  );
};

export default FilterPage;
