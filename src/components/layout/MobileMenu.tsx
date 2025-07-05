import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

interface MobileMenuProps {
  onLogout: () => void;
}

export function MobileMenu({ onLogout }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-3/4 p-0 bg-[#1B3B48] dark:bg-background">
        <Sidebar onLogout={onLogout} />
      </SheetContent>
    </Sheet>
  );
}
