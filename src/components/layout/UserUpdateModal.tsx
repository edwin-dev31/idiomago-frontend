import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/lib/hooks/Users/useUserInfo";
import { useUpdateUserInfo } from "@/lib/hooks/Users/useUpdateUserInfo";
import { toast } from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
}

const UserUpdateModal: React.FC<Props> = ({ open, onClose }) => {
  const { user } = useUserInfo();
  const { updateUserInfo } = useUpdateUserInfo();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username ?? "");
      setEmail(user.email ?? "");
    }
  }, [user]);

  const handleUpdate = async () => {
    const payload: {
      username?: string;
      email?: string;
      password?: string;
    } = {};

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Username validation
    if (trimmedUsername && trimmedUsername !== user?.username) {
      if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
        toast.error("Username must be between 3 and 20 characters");
        return;
      }
      payload.username = trimmedUsername;
    }

    // Email validation
    if (trimmedEmail && trimmedEmail !== user?.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        toast.error("Email must be valid");
        return;
      }
      payload.email = trimmedEmail;
    }

    // Password validation
    if (trimmedPassword) {
      if (trimmedPassword.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      payload.password = trimmedPassword;
    }

    // No changes
    if (Object.keys(payload).length === 0) {
      toast("No changes made");
      return;
    }

    try {
      await updateUserInfo(payload);
      toast.success("User updated successfully");
      onClose();
    } catch (error) {
      toast.error("Update failed");
      console.error("Update failed", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border bg-white p-6 rounded-xl shadow-md dark:bg-[#1A1A1A] dark:border-gray-900">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-blue-900 dark:text-white">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <label className="text-sm self-center text-blue-900 dark:text-white">Username</label>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <label className="text-sm self-center text-blue-900 dark:text-white">Email</label>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <label className="text-sm self-center text-blue-900 dark:text-white">Password</label>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-sm"
            />
          </div>

          <Button
            onClick={handleUpdate}
            className="w-full bg-[#1B3B48] text-white rounded-full py-2 mb-2 hover:bg-[#162f39] dark:hover:bg-[#10242e]"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserUpdateModal;
