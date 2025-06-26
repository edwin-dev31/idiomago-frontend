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

interface Props {
  onLanguageChange: (codes: string[]) => void;
  className?: string; 
}

export const LanguageSelector: React.FC<Props> = ({ onLanguageChange,  className = "", }) => {
  const [open, setOpen] = useState(false);
  const { languages } = useLanguages();

  const [selectedCodes, setSelectedCodes] = useState<string[]>(() => {
    const saved = localStorage.getItem("selectedLanguageCodes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("selectedLanguageCodes", JSON.stringify(selectedCodes));
    onLanguageChange(selectedCodes); // Notify parent
  }, [selectedCodes]);

  const toggleCode = (code: string) => {
    setSelectedCodes((prev) => {
      if (prev.includes(code)) {
        return prev.filter((c) => c !== code);
      } else {
        if (prev.length >= 4) {
          toast.error("❌ Only 4 languages max");
          return prev;
        }
        return [...prev, code];
      }
    });
  };

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="bg-[#D9E6E9] text-[#1B3B48] rounded-full px-6 py-3 flex items-center gap-2 w-full justify-between hover:bg-[#c8d5d8]">
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
              {languages.map((lang) => (
                <CommandItem
                  key={lang.code}
                  value={lang.code}
                  onSelect={() => toggleCode(lang.code)}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  {lang.label}
                  <Check
                    className={`ml-auto h-4 w-4 ${
                      selectedCodes.includes(lang.code)
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

      {selectedCodes.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedCodes.map((code) => {
            const lang = languages.find((l) => l.code === code);
            if (!lang) return null;
            return (
              <div
                key={code}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: lang.color, color: "white" }}
              >
                {lang.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
