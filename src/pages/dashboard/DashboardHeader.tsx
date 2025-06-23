    // src/components/DashboardHeader.tsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DashboardHeader: React.FC = () => {
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

      <h2 className="text-xl font-semibold text-[#1B3B48] mb-4">Search & Filter</h2>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Word Search", icon: "📚", path: "/word-search" },
          { label: "Word Categories", icon: "🔍", path: "/word-categories" },
          { label: "Word Definition", icon: "📖", path: "/word-definition" },
          { label: "Word Example", icon: "✏️", path: "/word-example" },
        ].map((item) => (
          <Link to={item.path} key={item.label}>
            <Button
              variant="outline"
              className="h-24 w-full flex flex-col items-center justify-center bg-[#D9E6E9] rounded-2xl shadow-lg"
            >
              <span className="text-2xl mb-2">{item.icon}</span>
              <span className="text-[#1B3B48]">{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default DashboardHeader;
