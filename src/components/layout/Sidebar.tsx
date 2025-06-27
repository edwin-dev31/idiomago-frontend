// src/components/layout/Sidebar.tsx
import React from "react";
import {
  Home,
  LayoutDashboard,
  Brain,
  DiamondPlus,
  Filter,
  Bookmark,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "home", label: "Home", icon: Home, path: "/home" },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "search", label: "Search word", icon: Brain, path: "/search" },
    { id: "save", label: "Save word", icon: DiamondPlus, path: "/save" },
    { id: "myWords", label: "My words", icon: DiamondPlus, path: "/myWords" },
    { id: "filter", label: "Filter", icon: Filter, path: "/filter" },
    { id: "favorites", label: "Favorite", icon: Bookmark, path: "/favorites" },
  ];

  return (
    <div className="w-64 bg-[#1B3B48] text-white p-6 flex flex-col h-screen">
      <div className="flex items-center gap-3 mb-8">
        <User className="h-8 w-8" />
        <h2 className="text-xl font-semibold">Idiomago</h2>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map(({ id, label, icon: Icon, path }) => (
          <Button
            key={id}
            variant="ghost"
            className={`w-full justify-start text-white hover:bg-white/10 ${
              location.pathname === path ? "bg-white/20" : ""
            }`}
            onClick={() => navigate(path)}
          >
            <Icon className="mr-3 h-5 w-5" />
            {label}
          </Button>
        ))}
      </nav>

      <Separator className="my-4 bg-white/20" />

      <Button
        variant="ghost"
        className="w-full justify-start text-white hover:bg-white/10"
        onClick={onLogout}
      >
        <LogOut className="mr-3 h-5 w-5" />
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
