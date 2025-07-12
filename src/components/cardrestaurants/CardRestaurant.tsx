import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Restaurant } from "../../types/restaurant";

interface CardRestaurantProps {
  restaurant: Restaurant;
  onReserve?: (restaurant: Restaurant) => void;
}

export const CardRestaurant: React.FC<CardRestaurantProps> = ({
  restaurant,
  onReserve,
}) => {
  const { id, name, cuisine, rating, address, imageUrl } = restaurant;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-[320px] hover:shadow-xl transition-shadow flex flex-col">
      {/* Imagen */}
      <div className="relative w-full h-40">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            loading="lazy"
          />
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="text-xl font-semibold text-red-600 mb-1">{name}</h2>
        <p className="text-gray-700 mb-1">{cuisine}</p>
        <p className="text-yellow-500 font-semibold mb-2">
          {"★".repeat(Math.floor(rating))}
          <span className="text-gray-400">
            {"☆".repeat(5 - Math.floor(rating))}
          </span>
        </p>
        <p className="text-gray-600 text-sm mb-4">{address}</p>

        {/* Botones */}
        <div className="mt-auto flex flex-col gap-2">
          <Link
            href={`/restaurants/${id}`}
            className="w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
          >
            Ver restaurante
          </Link>
          <button
            type="button"
            onClick={() => onReserve && onReserve(restaurant)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition"
          >
            Programar visita
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardRestaurant;
