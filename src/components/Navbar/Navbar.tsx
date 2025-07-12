"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkAuthentication();
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, [pathname]);

  const checkAuthentication = async () => {
    try {
      const res = await fetch("/api/auth/verify", {
        method: "GET",
        credentials: "include",
      });
      setIsLoggedIn(res.ok);
    } catch {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setIsLoggedIn(false);
        router.push("/login");
      }
    } catch (error) {
      console.error("Error al hacer logout:", error);
    }
  };

  if (!mounted || pathname === "/" || pathname.startsWith("/login"))
    return null;

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
    >
      <div className="container mx-auto px-6 md:px-10 flex justify-between items-center h-14 md:h-16">
        <button
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <Image
            src="/images/logo.png"
            alt="Equilibra"
            width={120}
            height={120}
          />
        </button>

        {/* Menu Desktop */}
        <motion.ul
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hidden md:flex space-x-6"
        >
          {[
            { label: "Inicio", href: "/dashboard" },
            { label: "Acerca de", href: "/aboutus" },
            { label: "Perfil", href: "/profile" },
          ].map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                  isActive(href)
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-red-100 hover:text-red-600"
                }`}
              >
                {label}
              </a>
            </li>
          ))}

          {isLoggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full font-semibold text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors duration-300"
              >
                Cerrar sesión
              </button>
            </li>
          ) : (
            <li>
              <a
                href="/login"
                className="px-4 py-2 rounded-full font-semibold text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors duration-300"
              >
                Iniciar Sesión
              </a>
            </li>
          )}
        </motion.ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
            aria-label="Toggle menu"
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              initial={false}
              animate={isOpen ? "open" : "closed"}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                variants={{
                  closed: { d: "M4 6h16M4 12h16M4 18h16" },
                  open: { d: "M6 18L18 6M6 6l12 12" },
                }}
              />
            </motion.svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-md rounded-b-md"
        >
          <ul className="flex flex-col space-y-2 px-6 py-4">
            {[
              { label: "Inicio", href: "/dashboard" },
              { label: "Acerca de", href: "/aboutus" },
              { label: "Perfil", href: "/profile" },
            ].map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
                    isActive(href)
                      ? "bg-red-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-red-100 hover:text-red-600"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
            {isLoggedIn ? (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded-full font-semibold text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors duration-300"
                >
                  Cerrar sesión
                </button>
              </li>
            ) : (
              <li>
                <a
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-2 rounded-full font-semibold text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors duration-300"
                >
                  Iniciar Sesión
                </a>
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
