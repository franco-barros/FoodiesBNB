"use client";

import React from "react";
import { motion } from "framer-motion";

const AboutUs: React.FC = () => {
  return (
    <motion.section
      className="max-w-4xl mx-auto px-6 py-16 bg-white rounded-lg shadow-md text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        className="text-4xl font-bold text-red-600 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Sobre Nosotros
      </motion.h2>

      <motion.p
        className="text-gray-700 text-lg leading-relaxed mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        En Foodies, nuestra misión es conectar a las personas con los mejores
        restaurantes de la ciudad, ofreciendo una plataforma sencilla y
        confiable para descubrir, reservar y disfrutar experiencias
        gastronómicas únicas.
      </motion.p>

      <motion.p
        className="text-gray-700 text-lg leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        Nos apasiona la buena comida y trabajamos constantemente para brindar un
        servicio de calidad, promoviendo la cultura culinaria local y
        facilitando el acceso a opciones variadas y deliciosas para todos los
        gustos.
      </motion.p>
    </motion.section>
  );
};

export default AboutUs;
