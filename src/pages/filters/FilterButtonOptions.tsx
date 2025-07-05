import React from "react";
import { Button } from "@/components/ui/button";

type FilterType = "language" | "category" | "description" | "example";

interface Props {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const options: { label: string; icon: string; type: FilterType }[] = [
  { label: "Word Language", icon: "📚", type: "language" },
  { label: "Word Categories", icon: "🔍", type: "category" },
  { label: "Word Description", icon: "📖", type: "description" },
  { label: "Word Example", icon: "✏️", type: "example" },
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
            className={`h-20 w-full flex flex-col items-center justify-center rounded-2xl shadow-lg hover:bg-[#B5CFD4] transition-colors duration-200 ${
              activeFilter === item.type ? "bg-[#1B3B48] text-white" : "bg-[#D9E6E9] text-[#1B3B48]"
            }`}
            onClick={() => onFilterChange(item.type)}
          >
            <span className="text-xl md:text-2xl mb-2">{item.icon}</span>
            <span className="text-center text-sm">{item.label}</span>
          </Button>
        ))}
      </div>
    </>
  );
};

export default FilterButtonOptions;
