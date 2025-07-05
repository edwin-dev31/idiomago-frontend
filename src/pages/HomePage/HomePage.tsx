import React, { useRef, useState } from "react";
import { useUserInfo, useUpdateUserAvatar } from "@/lib/hooks/Users/useUserInfo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRocket, FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import toast from "react-hot-toast";
import { useAvatarCropper } from "@/lib/hooks/Users/useAvatarCropper";

const HomePage: React.FC = () => {
  const { user, loading } = useUserInfo();
  const { uploadAvatar } = useUpdateUserAvatar();
  const { theme } = useTheme();

  const { file, imageSrc, handleFileChange, clear } = useAvatarCropper();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => inputRef.current?.click();

  const handleSubmit = async () => {
    if (!file) return;
    try {
      setUploading(true);
      await uploadAvatar(file);
      toast.success("Avatar updated!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-xl font-medium text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center px-6 py-12 md:px-16 lg:px-24 bg-[#edf6f9] min-h-[80vh] dark:bg-[#1A1A1A]">

      <div className="flex flex-col items-center text-center gap-5 w-full">
        <div className="flex flex-col items-center gap-3">
          <Avatar className="w-40 h-40 ring-4 ring-blue-500 shadow-lg">
            <AvatarImage
              src={
                imageSrc ||
                user?.imageUrl ||
                `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${user?.username}`
              }
              alt={user?.username}
            />
            <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
          </Avatar>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex gap-2">
            <Button onClick={openFileDialog} variant="outline">Select Image</Button>
            {file && (
              <Button onClick={handleSubmit} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            )}
            {imageSrc && <Button variant="ghost" onClick={clear}>Cancel</Button>}
          </div>
        </div>

        <h1 className="text-5xl font-extrabold text-[#0D2B3E] leading-tight dark:text-white">
          Hello, <span className="capitalize">{user?.username}</span>
        </h1>

        <p className="text-lg text-justify  md:text-xl text-gray-700 max-w-md dark:text-white">
          Welcome back! Ready to continue your journey of learning new words and mastering languages? Let’s go!
        </p>

        <div className="flex flex-wrap gap-4 pt-2 justify-center">
          <Link to="/dashboard">
            <Button className="bg-blue-600 text-white px-4 py-2 h-10 text-base rounded-xl hover:bg-blue-700 flex items-center gap-2 md:px-6 md:py-4 md:text-lg">
              <FaRocket /> Start Learning
            </Button>
          </Link>

          <Link to="/myWords">
            <Button
              variant="outline"
              className="text-blue-600 border-blue-600 px-4 py-2 h-10 text-base rounded-xl flex items-center gap-2 dark:bg-[#B5CFD4] dark:border-[6EA0AB] dark:text-[6EA0AB] md:px-6 md:py-4 md:text-lg"
            >
              <FaBook /> My Words
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex justify-center mt-10 md:mt-0 hidden md:block">
        <img
          src={isDark ? "/idiomago-dark.svg" : "/idiomago-white.svg"}
          alt="Idiomago Logo"
          className="max-w-[420px] md:max-w-[500px] w-full h-auto drop-shadow-xl"
        />
      </div>
    </div>

  );
};

export default HomePage;
