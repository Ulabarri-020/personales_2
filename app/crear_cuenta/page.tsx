"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmarPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    alert("¡Registro exitoso!");
    router.push("/"); // Redirige al inicio
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
      >
         <Link href="/" className="flex items-center text-green-700 hover:text-green-800 mb-4">
    <ArrowLeft className="w-5 h-5 mr-1" />
    Volver al inicio
  </Link>
        <h2 className="text-2xl font-bold mb-6 text-center text-[#16A24B]">
          Registro - Finanzas Educativas
        </h2>

        <label className="block mb-2 text-sm font-medium">Nombre completo</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block mb-2 text-sm font-medium">Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block mb-2 text-sm font-medium">Contraseña</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <label className="block mb-2 text-sm font-medium">Confirmar Contraseña</label>
        <div className="relative mb-6">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmarPassword"
            value={formData.confirmarPassword}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#16A24B] text-white p-2 rounded hover:bg-green-700 transition-colors"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
