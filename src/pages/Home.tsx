// src/pages/Home.tsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import Login from "@/pages/OAuth/LoginPage";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react"; // ícono de menú

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = React.useState(true);
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
    <div className="flex h-screen bg-[#EBF4F6]">
      {/* Sidebar: Condicional */}
      {showSidebar && <Sidebar onLogout={handleLogout} />}

      <div className="flex-1 flex flex-col">
        {/* Botón para mostrar/ocultar el sidebar */}
        <div className="p-4">
          <Button
            variant="ghost"
            className="mb-4 text-[#1B3B48]"
            onClick={() => setShowSidebar((prev) => !prev)}
          >
            <Menu className="h-6 w-6 mr-2" />
            {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
          </Button>
        </div>

        <main className="flex-1 px-8 overflow-auto">
          <Outlet />
        </main>
      </div>

      <Toaster />
    </div>
  );
};

export default Home;
