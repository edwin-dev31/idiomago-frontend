import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, BookMarked, Book, Search, PenSquare } from "lucide-react";

const FilterAndSearchHeader: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold text-[#1B3B48] dark:text-white mb-6 ">Featured Words</h1>
      <div className="flex flex-wrap gap-4 mb-8">
        {["Spanish", "English", "German"].map((lang) => (
          <motion.div
            key={lang}
            whileHover={{ scale: 1.05 }}
            className="bg-[#D9E6E9] dark:text-white rounded-2xl shadow-lg px-6 py-3"
          >
            <span className="text-[#1B3B48] font-medium">{lang}</span>
          </motion.div>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-[#1B3B48] dark:text-white mb-4">Search & Filter</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
      {[
        { label: "Search with IA", icon: Bot, path: "/search" },
        { label: "Save Personal word", icon: BookMarked, path: "/save" },

        { label: "By Language", icon: Book, path: "/filter?type=language" },
        { label: "By Categories", icon: Search, path: "/filter?type=category" },
        { label: "By Example", icon: PenSquare, path: "/filter?type=example" },
      ].map((item) => (
        <Link to={item.path} key={item.label}>
          <Button
            variant="outline"
            className="h-20 w-full flex flex-col items-center justify-center bg-[#D9E6E9] rounded-2xl shadow-lg hover:bg-[#B5CFD4] transition-colors duration-200"
          >
            <item.icon className="w-6 h-6 mb-2" />
            <span className="text-[#1B3B48] text-center text-sm" >{item.label}</span>
          </Button>
        </Link>
      ))}

      </div>
    </>
  );
};

export default FilterAndSearchHeader;
