import React, { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import Login from "./pages/OAuth/LoginPage";
import Register from "./pages/OAuth/RegisterPage";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import OAuthSuccess from "@/pages/OAuth/OAuthSuccess";
import ProtectedRoute from "@/components/ProtectedRoute";
import HomePage from "@/pages/HomePage/HomePage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import FavoritePage from "@/pages/favorite/FavoritePage";
import FilterPage from "@/pages/filters/FilterPage";
import SavePage from "@/pages/save/SavePage";
import { ThemeProvider } from "@/components/ThemeProvider";
import EmailVerification from "@/pages/OAuth/EmailVerification";

import SearchPage from "@/pages/seachWord/SearchPage";
import MyWordsPage from "@/pages/myWord/MyWordPage";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
   <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth2/success" element={<OAuthSuccess />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />          
          <Route path="search" element={<SearchPage />} />
          <Route path="save" element={<SavePage />} />
          <Route path="filter" element={<FilterPage />} />
          <Route path="favorites" element={<FavoritePage />} />

          <Route path="myWords" element={<MyWordsPage />} />


        </Route>
      </Routes>

      <Toaster position="top-right" />
    </ThemeProvider>
  );
};


export default App;
