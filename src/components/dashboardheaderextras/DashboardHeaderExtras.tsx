"use client";

import React from "react";
import { MapPin, Heart, Star } from "lucide-react";

const DashboardHeaderExtras: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mb-4 px-4 sm:px-0 flex flex-wrap justify-center gap-6 text-gray-700">
      <div className="bg-red-100 text-red-700 rounded-lg px-4 py-2 font-semibold cursor-pointer hover:bg-red-200 transition flex items-center gap-2">
        <MapPin size={18} />
        Explorar Restaurantes
      </div>
      <div className="bg-red-100 text-red-700 rounded-lg px-4 py-2 font-semibold cursor-pointer hover:bg-red-200 transition flex items-center gap-2">
        <Star size={18} />
        Mis Visitas Favoritas
      </div>
      <div className="bg-red-100 text-red-700 rounded-lg px-4 py-2 font-semibold cursor-pointer hover:bg-red-200 transition flex items-center gap-2">
        <Heart size={18} />
        Mis Favoritos
      </div>
    </div>
  );
};

export default DashboardHeaderExtras;
