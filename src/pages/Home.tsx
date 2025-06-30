import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import Login from "@/pages/OAuth/LoginPage";

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
    <div className="flex h-screen bg-[#EBF4F6] dark:bg-[#1A1A1A]">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 flex flex-col p-4">
        <main className="flex-1 px-8 overflow-auto scrollbar-hide" >
          <Outlet />
        </main>
      </div>

      <Toaster />
    </div>
  );
};

export default Home;
