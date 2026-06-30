import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Book, PenSquare } from "lucide-react";

type FilterType = "language" | "category" | "description" | "example";

interface Props {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const options: { label: string; icon: typeof BookOpen; type: FilterType }[] = [
  { label: "Word Language", icon: BookOpen, type: "language" },
  { label: "Word Categories", icon: Search, type: "category" },
  { label: "Word Description", icon: Book, type: "description" },
  { label: "Word Example", icon: PenSquare, type: "example" },
];

const FilterButtonOptions: React.FC<Props> = ({ activeFilter, onFilterChange }) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-[#1B3B48] dark:text-white mb-4">Search & Filter</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {options.map((item) => (
          <Button
            key={item.type}
            variant="outline"
            className={`h-20 w-full flex flex-col items-center justify-center rounded-2xl shadow-lg transition-colors duration-200 ${
              activeFilter === item.type ? "bg-[#B5CFD4] text-[#1B3B48]" : "bg-[#D9E6E9] text-[#1B3B48]"
            }`}
            onClick={() => onFilterChange(item.type)}
          >
            <item.icon className="w-8 h-8 mb-2 text-[#1B3B48]" />
            <span className="text-center text-sm text-[#1B3B48]">{item.label}</span>
          </Button>
        ))}
      </div>
    </>
  );
};

export default FilterButtonOptions;
