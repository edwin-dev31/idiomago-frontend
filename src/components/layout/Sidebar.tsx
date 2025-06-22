import React from "react";
import { LayoutDashboard, Search, Filter, Bookmark, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  filterType: string;
  setFilterType: (type: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filterType, setFilterType, filter, setFilter, onLogout }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "search", label: "Search word", icon: Search },
    { id: "filter", label: "Filter", icon: Filter },
    { id: "favorites", label: "Favorite", icon: Bookmark },
  ];

  return (
    <div className="w-64 bg-[#1B3B48] text-white p-6 flex flex-col h-screen">
      <div className="flex items-center gap-3 mb-8">
        <User className="h-8 w-8" />
        <h2 className="text-xl font-semibold">Language Learning</h2>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start text-white hover:bg-white/10 ${filterType === item.id ? "bg-white/20" : ""}`}
              onClick={() => setFilterType(item.id)}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          );
        })}
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
}

export default Sidebar;
