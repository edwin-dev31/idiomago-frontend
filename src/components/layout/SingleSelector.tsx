import React, { useState } from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface Option {
  label: string;
  value: string;
  color?: string;
}

interface Props {
  title: string;
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
  className?: string; 
}

const SingleSelector: React.FC<Props> = ({
  title,
  options,
  selected,
  onSelect,
  className = "",
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === selected);

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
              className="bg-[#D9E6E9] text-[#1B3B48] rounded-full px-6 py-3 flex items-center gap-2 w-full justify-between hover:bg-[#c8d5d8]">
            <span>{selectedOption ? selectedOption.label : title}</span>
            <ChevronsUpDown className="h-5 w-5 text-[#1B3B48] opacity-50" />
          </Button>
          

        </PopoverTrigger>
        <PopoverContent
          className="w-[350px] p-0 max-h-60 overflow-y-auto"
          align="end">
          <Command>
            <CommandInput placeholder={`Search ${title.toLowerCase()}...`} />
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.label}
                  value={opt.label}
                  onSelect={() => handleSelect(opt.value)}
                  className="flex items-center gap-2"
                >
                  {opt.color && (
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: opt.color }}
                    />
                  )}
                  {opt.label}
                  <Check
                    className={`ml-auto h-4 w-4 ${
                      selected === opt.value ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SingleSelector;
