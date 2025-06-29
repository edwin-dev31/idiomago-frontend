import React from "react";
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
import { useLanguages } from "@/lib/hooks/Languages/useLanguages";

type Props = {
  selectedLanguages: string[];
  onLanguageSelect?: (language: string) => void;
};

export const LanguageSelector: React.FC<Props> = ({
  selectedLanguages,
  onLanguageSelect,
}) => {
  const [open, setOpen] = React.useState(false);
  const { languages, loading } = useLanguages();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="bg-[#D9E6E9] text-[#1B3B48] rounded-full px-6 py-3 flex items-center gap-2 w-[250px] justify-between hover:bg-[#c8d5d8]">
          <span>Languages Selected</span>
          <ChevronsUpDown className="h-5 w-5 text-[#1B3B48] opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" align="end">
        <Command>
          <CommandInput placeholder="Search languages..." className="h-9" />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            {loading ? (
              <div className="text-sm text-center py-4">Loading...</div>
            ) : (
              languages.map((language) => (
                <CommandItem
                  key={language.id}
                  onSelect={() => {
                    onLanguageSelect?.(language.name);
                    setOpen(false);
                  }}
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
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
