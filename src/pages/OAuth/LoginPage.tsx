import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "@/lib/Hooks/Users/useLogin";
import { toast } from "react-hot-toast";

const Login: React.FC = () => {
  const { login } = useLogin();
  const navigate = useNavigate();

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
        console.log(token)
        navigate("/"); 
      } else {
        toast.error("Token not received");
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Login failed";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl w-96"
      >
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">LOGIN</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="pl-10 h-12 bg-blue-50/50 border-blue-100 rounded-xl"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="pl-10 h-12 bg-blue-50/50 border-blue-100 rounded-xl"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 rounded-xl text-lg font-semibold"
          >
            Login
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-blue-100" />
            </div>
            <div className="relative flex justify-center text-sm uppercase">
              <span className="bg-white px-4 text-blue-400">or</span>
            </div>
          </div>

          {/* OAUTH buttons - aún sin funcionalidad */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl flex items-center justify-center space-x-2"
              onClick={() =>
                (window.location.href = "http://localhost:1731/idiomago/oauth2/authorization/facebook")
              }
            >
              <FaFacebookF className="w-5 h-5 text-blue-600" />
              <span className="text-blue-900">Login with Facebook</span>
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 rounded-xl flex items-center justify-center space-x-2"
              onClick={() =>
                (window.location.href = "http://localhost:1731/idiomago/oauth2/authorization/google")
              }
            >
              <FcGoogle className="w-5 h-5" />
              <span className="text-blue-900">Login with Google</span>
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 rounded-xl flex items-center justify-center space-x-2"
              onClick={() =>
                (window.location.href = "http://localhost:1731/idiomago/oauth2/authorization/github")
              }
            >
              <FaGithub className="w-5 h-5 text-gray-800" />
              <span className="text-blue-900">Login with GitHub</span>
            </Button>

          </div>
        </form>

        <div className="text-center mt-6">
          <span className="text-sm text-blue-700">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline font-semibold">
              Register
            </Link>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
