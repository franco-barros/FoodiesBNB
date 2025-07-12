"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CardRestaurant } from "../../components/cardrestaurants";
import { SearchBar } from "../../components/searchbar";
import { mockRestaurants } from "../../data/mockrestaurants";
import { Modal } from "../../components/modal";
import { DashboardHeaderExtras } from "../../components/dashboardheaderextras";
import { useAuth } from "../../hooks/useAuth";
import type { Restaurant } from "../../types/restaurant";

const Dashboard = () => {
  const { user } = useAuth();
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    term: "",
    cuisine: "",
    foodType: "",
  });

  const filteredRestaurants = mockRestaurants.filter((restaurant) => {
    const nameMatch = restaurant.name
      .toLowerCase()
      .includes(filters.term.toLowerCase());

    const cuisineMatch = filters.cuisine
      ? restaurant.cuisine === filters.cuisine
      : true;

    const foodMatch = filters.foodType
      ? restaurant.foodTypes?.includes(filters.foodType)
      : true;

    return nameMatch && cuisineMatch && foodMatch;
  });

  const handleOpenReserveModal = (restaurant: Restaurant) => {
    setSelected(restaurant);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelected(null);
    setIsModalOpen(false);
  };

  return (
    <motion.div
      className="w-full min-h-screen pt-20 px-4 sm:px-8 pb-12 bg-white text-black flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Encabezado */}
      <motion.div
        className="mb-4 w-full max-w-4xl"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold text-red-600">
          Panel de <span className="text-black">Foodies</span>
        </h1>
        <p className="text-gray-700 text-base mt-2">
          Gestioná y visualizá los mejores restaurantes desde un solo lugar.
        </p>
      </motion.div>

      <DashboardHeaderExtras />

      {/* Filtros */}
      <SearchBar
        onSearch={(newFilters) => setFilters(newFilters)}
        cuisines={[...new Set(mockRestaurants.map((r) => r.cuisine))]}
        foodTypes={[
          ...new Set(mockRestaurants.flatMap((r) => r.foodTypes || [])),
        ]}
      />

      {/* Cards */}
      <motion.div
        className="w-full max-w-4xl bg-gray-100 p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredRestaurants.map((restaurant) => (
          <CardRestaurant
            key={restaurant.id}
            restaurant={restaurant}
            onReserve={() => handleOpenReserveModal(restaurant)}
          />
        ))}
      </motion.div>

      {/* Modal con lógica de agendar cita */}
      {selected && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          userId={user?.id}
        />
      )}
    </motion.div>
  );
};

export default Dashboard;
