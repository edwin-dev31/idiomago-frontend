import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, Mail } from "lucide-react";
import { useRegister } from "@/lib/Hooks/User/UseRegister";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate(); // ⬅️ para redirigir
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { register } = useRegister(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await register(form);
      const token = data?.token; // asegúrate de que `token` venga en la respuesta

      if (token) {
        localStorage.setItem("token", token);
        toast.success("User registered!");
        navigate("/"); // ⬅️ redirige al home
      } else {
        toast.error("Token not received from server");
      }
    } catch (error: any) {
      const backendMessage = error?.response?.data?.message || "Registration failed. Please try again.";
      toast.error(backendMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl w-96"
      >
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">REGISTER</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
            <Input
              name="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="pl-10 h-12 bg-blue-50/50 border-blue-100 rounded-xl"
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
            Register
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
