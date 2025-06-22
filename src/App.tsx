import React, { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import Login from "./pages/OAuth/LoginPage";
import Register from "./pages/OAuth/RegisterPage";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import OAuthSuccess from "@/pages/OAuth/OAuthSuccess";
import ProtectedRoute from "@/components/ProtectedRoute";

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
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth/success" element={<OAuthSuccess />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
};


export default App;
