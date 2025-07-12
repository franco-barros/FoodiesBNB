"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"user" | "restaurant">("user");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      if (role === "restaurant") {
        router.push("/restaurant/dashboard");
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, loading, router, role]);

  const handleLogin = async () => {
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = () => {
    alert("Funcionalidad para recuperar contraseña pendiente de implementar");
  };

  const handleApplyNow = () => {
    router.push("/apply");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/images/logo.png"
          alt="Foodies Logo"
          width={150}
          height={150}
          priority
        />
      </div>

      {/* Caja del login */}
      <div className="bg-white p-6 sm:p-8 rounded-md shadow-xl border border-black/10 w-full max-w-[360px] sm:max-w-[420px] md:max-w-[480px]">
        {/* Selector de rol */}
        <div className="mb-6 text-center">
          <span className="block text-black mb-3 font-semibold text-lg">
            Ingresá como
          </span>
          <div className="flex justify-center gap-3 bg-gray-100 rounded-md px-2 py-1 w-fit mx-auto">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`px-4 py-1.5 font-semibold text-sm transition-shadow rounded-md cursor-pointer ${
                role === "user"
                  ? "bg-white text-black shadow-sm"
                  : "bg-transparent text-gray-700 hover:bg-gray-200"
              }`}
            >
              Usuario
            </button>
            <button
              type="button"
              onClick={() => setRole("restaurant")}
              className={`px-4 py-1.5 font-semibold text-sm transition-shadow rounded-md cursor-pointer ${
                role === "restaurant"
                  ? "bg-white text-black shadow-sm"
                  : "bg-transparent text-gray-700 hover:bg-gray-200"
              }`}
            >
              Restaurante
            </button>
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-black mb-2 font-semibold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div className="mb-1 relative">
          <label
            htmlFor="password"
            className="block text-black mb-2 font-semibold"
          >
            Contraseña
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-11 right-4 text-red-600 hover:text-red-800 transition"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm mt-2 mb-4 font-medium">{error}</p>
        )}

        {/* Link olvidaste contraseña */}
        <div className="mb-6 flex justify-end text-sm">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-gray-700 hover:text-gray-900 font-medium cursor-pointer transition"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Botón Entrar */}
        <button
          onClick={handleLogin}
          className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white p-3 font-bold mb-6 transition rounded-xl"
        >
          Entrar
        </button>

        {/* Separador */}
        <hr className="border-red-200 mb-6" />

        {/* Texto aplicar ahora */}
        <div className="text-center text-sm text-gray-700">
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            onClick={handleApplyNow}
            className="text-gray-700 hover:text-red-600 font-semibold cursor-pointer transition"
          >
            Aplicar ahora
          </button>
        </div>
      </div>
    </div>
  );
}
