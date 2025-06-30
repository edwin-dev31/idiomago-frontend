// src/components/layout/ThemeToggle.tsx
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <Button
      variant="ghost"
     className="w-full justify-start text-black hover:bg-black/10 dark:text-white dark:hover:bg-white/10
"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Sun className="mr-3 h-5 w-5" />
      ) : (
        <Moon className="mr-3 h-5 w-5" />
      )}
      {isDark ? "Light Mode" : "Dark Mode"}
    </Button>
  );
};

export default ThemeToggle;
