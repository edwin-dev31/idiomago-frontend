import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import Login from "@/pages/OAuth/LoginPage";
import { MobileMenu } from "@/components/layout/MobileMenu";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    return !!localStorage.getItem("token");
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  React.useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (!isAuthenticated) return <Login />;

  return (
    <div className="h-screen flex flex-col md:flex-row bg-[#EBF4F6] dark:bg-[#1A1A1A]">
      <div className="hidden md:block md:fixed md:w-64 md:h-screen">
          <Sidebar onLogout={handleLogout} />
      </div>
      <div className="md:hidden">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4">
          <div /> 
          <MobileMenu onLogout={handleLogout} />
        </header>
      </div>
      <main className="flex-1 md:ml-64 p-4 overflow-y-auto">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default Home;
