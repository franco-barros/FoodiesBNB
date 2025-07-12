"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Greeting: React.FC = () => {
  return (
    <motion.div
      className="h-screen flex items-center justify-center bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-semibold text-gray-900 flex items-center gap-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Bienvenidos a{" "}
        <span className="inline-block">
          <Image
            src="/images/logo.png"
            alt="Logo de FoodiesBNB"
            width={150}
            height={50}
            priority
          />
        </span>{" "}
        tu plataforma gastronómica
      </motion.h1>
    </motion.div>
  );
};

export default Greeting;
