import React from "react";
import { useUserInfo } from "@/lib/hooks/Users/useUserInfo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRocket, FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";

const HomePage: React.FC = () => {
  const { user, loading } = useUserInfo();
  const { theme } = useTheme();

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
 
      <div className="flex flex-col items-center md:items-center text-center md:text-left gap-5">
        <div className="flex justify-center w-full md:pl-10">
          <Avatar className="w-40 h-40 ring-4 ring-blue-500 shadow-lg">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${user?.username}`}
              alt={user?.username}
            />
            <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        <h1 className="text-5xl font-extrabold text-[#0D2B3E] text-center leading-tight w-full md:pl-10 dark:text-white">
          Hello, <span className="capitalize">{user?.username}</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 max-w-md md:pl-10 dark:text-white">
          Welcome back! Ready to continue your journey of learning new words and mastering languages? Let’s go!
        </p>

        <div className="flex flex-wrap gap-4 pt-2 md:pl-10">
          <Link to="/dashboard">
            <Button className="bg-blue-600 text-white px-6 py-4 text-lg rounded-xl hover:bg-blue-700 flex items-center gap-2">
              <FaRocket /> Start Learning
            </Button>
          </Link>

          <Link to="/myWords">
            <Button
              variant="outline"
              className="text-blue-600 border-blue-600 px-6 py-4 text-lg rounded-xl flex items-center gap-2 dark:bg-[#B5CFD4] dark:border-[6EA0AB] dark:text-[6EA0AB]"
            >
              <FaBook /> My Words
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
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
