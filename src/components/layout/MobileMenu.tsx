import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { User } from "@/types/user";

interface MobileMenuProps {
  onLogout: () => void;
  userInfo: User | null;
}

export function MobileMenu({ onLogout, userInfo }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-3/4 p-0 bg-[#1B3B48] dark:bg-background">
        <Sidebar onLogout={onLogout} userInfo={userInfo} />
      </SheetContent>
    </Sheet>
  );
}