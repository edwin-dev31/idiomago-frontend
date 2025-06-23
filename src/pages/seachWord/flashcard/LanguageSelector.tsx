import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useLanguages } from "@/lib/Hooks/Languages/useLanguages";
import { toast } from "react-hot-toast";

export const LanguageSelector: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { languages } = useLanguages();

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(() => {
    const saved = localStorage.getItem("selectedLanguages");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("selectedLanguages", JSON.stringify(selectedLanguages));
  }, [selectedLanguages]);

  const toggleLanguage = (langName: string) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(langName)) {
        return prev.filter((l) => l !== langName); 
      } else {
        if (prev.length > 3) {
          toast.error("❌Just its allow select 4 language");
          return prev;
        }
        return [...prev, langName]; // Add
      }
    });
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="bg-[#D9E6E9] text-[#1B3B48] rounded-full px-6 py-3 flex items-center gap-2 w-[250px] justify-between hover:bg-[#c8d5d8]">
            <span>Languages Selected</span>
            <ChevronsUpDown className="h-5 w-5 text-[#1B3B48] opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[250px] p-0 max-h-60 overflow-y-auto"
          align="end"
        >
          <Command>
            <CommandInput placeholder="Search languages..." className="h-9" />
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.name}
                  value={language.name} 
                  onSelect={() => toggleLanguage(language.name)}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: language.color }}
                  />
                  {language.label}
                  <Check
                    className={`ml-auto h-4 w-4 ${
                      selectedLanguages.includes(language.name)
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedLanguages.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {languages
            .filter((lang) => selectedLanguages.includes(lang.name))
            .map((lang) => (
              <div
                key={lang.name}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: lang.color, color: "white" }}
              >
                {lang.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
