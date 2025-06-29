import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRegister } from "@/lib/Hooks/Users/UseRegister";
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

import ThemeToggle from "@/components/layout/ThemeToggle";
const Register: React.FC = () => {
  const navigate = useNavigate(); 
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { register } = useRegister(); 
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const result = await register(form);

    if (result.success) {
      toast.success(result.message || "Registration successful. Please check your email.");
      navigate("/login"); 
    } else {
      toast.error(result.message || "Registration failed.");
    }
  } catch (error: any) {
    toast.error("An unexpected error occurred.");
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
        <Link
          to="/login"
          className="absolute top-4 left-4 flex items-center gap-1 text-blue-600 hover:underline text-sm dark:text-[#38b6ff]"
        >
          <RiArrowGoBackFill className="w-4 h-4" />
        </Link>

        <h2 className="text-4xl font-bold text-center text-blue-900 mb-8 dark:text-[#38b6ff]">
          REGISTER
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
            <Input
              name="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="pl-10 h-12 rounded-xl bg-blue-50/50 border-blue-100 
                dark:bg-[#2a2a2a] dark:border-[#424242] text-black dark:text-white 
                placeholder:text-gray-400 dark:placeholder:text-gray-500"
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
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
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 rounded-xl text-lg font-semibold dark:text-white"
          >
            Register
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
