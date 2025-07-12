"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CardRestaurant } from "../../components/cardrestaurants";
import { SearchBar } from "../../components/searchbar";
import { mockRestaurants } from "../../data/mockrestaurants";
import { Modal } from "../../components/modal";
import { DashboardHeaderExtras } from "../../components/dashboardheaderextras";
import type { Restaurant } from "../../types/restaurant";

const Dashboard = () => {
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationMsg, setConfirmationMsg] = useState("");

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

  useEffect(() => {
    if (confirmationMsg) {
      const timer = setTimeout(() => setConfirmationMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [confirmationMsg]);

  const handleOpenReserveModal = (restaurant: Restaurant) => {
    setSelected(restaurant);
    setIsModalOpen(true);
    setConfirmationMsg("");
  };

  const handleCloseModal = () => {
    setSelected(null);
    setIsModalOpen(false);
    setConfirmationMsg("");
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

      {/* COMPONENTE NUEVO CON ICONOS */}
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

      {/* Modal solo para reserva */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selected && (
          <>
            <h2 className="text-xl font-bold mb-4">
              Programar visita en {selected.name}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setConfirmationMsg(`Reserva confirmada en ${selected.name}`);
              }}
              className="flex flex-col gap-4"
            >
              <label htmlFor="hora" className="block">
                <span>Hora aproximada:</span>
                <input
                  id="hora"
                  type="time"
                  required
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                />
              </label>
              <button
                type="submit"
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
              >
                Confirmar reserva
              </button>

              {confirmationMsg && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 text-green-600 font-semibold"
                >
                  {confirmationMsg}
                </motion.p>
              )}
            </form>
          </>
        )}
      </Modal>
    </motion.div>
  );
};

export default Dashboard;
