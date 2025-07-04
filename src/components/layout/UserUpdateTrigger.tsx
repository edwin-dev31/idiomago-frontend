import React, { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserUpdateModal from "./UserUpdateModal";

const UserUpdateTrigger: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        className="w-full justify-start text-white hover:bg-white/10"
        onClick={() => setOpen(true)}
      >
        <Settings className="mr-3 h-5 w-5" />
        Update Info
      </Button>
      <UserUpdateModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default UserUpdateTrigger;
