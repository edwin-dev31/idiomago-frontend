import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  isLoggedIn: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isLoggedIn }) => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const textColorClass = isLoggedIn ? "text-white" : (isDark ? "text-white" : "text-black");

  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${textColorClass} hover:bg-accent hover:text-accent-foreground`}
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