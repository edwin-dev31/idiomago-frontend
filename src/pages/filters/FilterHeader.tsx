import React from "react";
import { motion } from "framer-motion";

const FilterHeader: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold text-[#1B3B48] mb-6">Featured Words</h1>

      <div className="flex gap-4 mb-8">
        {["Spanish", "English", "German"].map((lang) => (
          <motion.div
            key={lang}
            whileHover={{ scale: 1.05 }}
            className="bg-[#D9E6E9] rounded-2xl shadow-lg px-6 py-3"
          >
            <span className="text-[#1B3B48] font-medium">{lang}</span>
          </motion.div>
        ))}
      </div>
        
    </>
  );
};

export default FilterHeader;
