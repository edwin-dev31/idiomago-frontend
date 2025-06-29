import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Eye, EyeOff, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "@/lib/hooks/Users/useLogin";
import { toast } from "react-hot-toast";
import ThemeToggle from "@/components/layout/ThemeToggle";

const Login: React.FC = () => {
  const { login } = useLogin();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(form);
      const token = data?.token;

      if (token) {
        localStorage.setItem("token", token);
        toast.success("Login successful!");
        navigate("/home"); 
      } else {
        toast.error("Token not received");
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Login failed";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-black">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-[#191919] dark:border-[#424242] border backdrop-blur-sm p-8 rounded-3xl shadow-xl w-96"
      >
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-8 dark:text-[#38b6ff]">LOGIN</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="pl-10 h-12 rounded-xl bg-blue-50/50 border-blue-100 
                dark:bg-[#2a2a2a] dark:border-[#424242] text-black dark:text-white 
                placeholder:text-gray-400 dark:placeholder:text-gray-500"

              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
            {showPassword ? (
              <EyeOff
                onClick={() => setShowPassword(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 cursor-pointer h-5 w-5"
              />
            ) : (
              <Eye
                onClick={() => setShowPassword(true)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 cursor-pointer h-5 w-5"
              />
            )}
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="pl-10 h-12 rounded-xl bg-blue-50/50 border-blue-100 
                dark:bg-[#2a2a2a] dark:border-[#424242] text-black dark:text-white 
                placeholder:text-gray-400 dark:placeholder:text-gray-500"
              required  
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 rounded-xl text-lg font-semibold dark:text-white "
          >
            Login
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-blue-100" />
            </div>
            <div className="relative flex justify-center text-sm uppercase">
              <span className="bg-white px-4 text-blue-400 dark:bg-[#191919]">or</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl flex items-center justify-center space-x-2 "
              onClick={() =>
                (window.location.href = "http://localhost:1731/idiomago/oauth2/authorization/facebook")
              }
            >
              <FaFacebookF className="w-5 h-5 text-blue-600" />
              <span className="text-blue-900 dark:text-[#38b6ff]">Login with Facebook</span>
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 rounded-xl flex items-center justify-center space-x-2 "
              onClick={() =>
                (window.location.href = "http://localhost:1731/idiomago/oauth2/authorization/google")
              }
            >
              <FcGoogle className="w-5 h-5" />
              <span className="text-blue-900 dark:text-[#38b6ff]">Login with Google</span>
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 rounded-xl flex items-center justify-center space-x-2"
              onClick={() =>
                (window.location.href = "http://localhost:1731/idiomago/oauth2/authorization/github")
              }
            >
              <FaGithub className="w-5 h-5 text-gray-800" />
              <span className="text-blue-900 dark:text-[#38b6ff]">Login with GitHub</span>
            </Button>

          </div>
        </form>

        <div className="text-center mt-6">
          <span className="text-sm text-blue-700 dark:text-[#38b6ff]">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline font-semibold dark:text-[#38b6ff]">
              Register
            </Link>
          </span>
        </div>
      </motion.div>
      
    </div>
  );
};

export default Login;
