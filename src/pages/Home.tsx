import React from "react";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/layout/Sidebar";
import SavePage from "@/pages/seachWord/SavePage";
import Login from "@/pages/OAuth/LoginPage";
import { useNavigate } from "react-router-dom";
import DashboardPage from "./dashboard/DashboardPage";
import FavoritePage from "./favorite/FavoritePage";
import FilterPage from "./filters/FilterPage";

type FilterType = "dashboard" | "search" | "filter" | "favorites";

const Home: React.FC = () => {
const navigate = useNavigate();
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  navigate("/login");
};
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    return !!localStorage.getItem("token");
  });

  React.useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);


  const [filter, setFilter] = React.useState("");
  const [filterType, setFilterType] = React.useState<FilterType>("dashboard");


  if (!isAuthenticated) {
    return <Login  />;
  }

  return (
    <div className="flex h-screen bg-[#EBF4F6]">
      <Sidebar
        filterType={filterType}
        setFilterType={(value) => setFilterType(value as FilterType)}
        filter={filter}
        setFilter={setFilter}
        onLogout={handleLogout}
      />

      <main className="flex-1 p-8 overflow-auto">
        {filterType === "dashboard" && (
          <DashboardPage/>
        )}

        {filterType === "favorites" && (
          <FavoritePage/>
        )}
        {filterType === "filter" && (
          <FilterPage/>
        )}    
        {filterType === "search" && (
          <SavePage/>
        ) }
      </main>

      <Toaster />
    </div>
  );
};


export default Home;