"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "../modal";

interface ReserveButtonProps {
  restaurantName: string;
}

const ReserveButton: React.FC<ReserveButtonProps> = ({ restaurantName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmation(`Reserva confirmada en ${restaurantName}`);

    setTimeout(() => {
      setConfirmation("");
      setIsOpen(false);
    }, 2500);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition cursor-pointer"
      >
        Programar visita
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Programar visita en {restaurantName}
        </h2>

        {confirmation ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 font-medium"
          >
            {confirmation}
          </motion.p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition cursor-pointer"
            >
              Confirmar reserva
            </button>
          </form>
        )}
      </Modal>
    </>
  );
};

export default ReserveButton;
