"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  children?: React.ReactNode;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: "-10%" },
  visible: { opacity: 1, y: "0" },
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, userId, children }) => {
  const [datetime, setDatetime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    if (!datetime) {
      setError("Por favor selecciona una fecha y hora.");
      return;
    }

    if (!userId) {
      setError("No se pudo identificar al usuario para agendar.");
      return;
    }

    setLoading(true);

    try {
      const { error: insertError } = await supabase
        .from("appointments")
        .insert({
          user_id: userId,
          scheduled_at: datetime,
          created_at: new Date().toISOString(),
        });

      if (insertError) {
        setError("Error al guardar cita: " + insertError.message);
      } else {
        setSuccess(true);
        setDatetime("");
      }
    } catch {
      setError("Ocurrió un error inesperado al agendar la cita.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 font-bold text-xl"
              aria-label="Cerrar"
            >
              ×
            </button>

            {userId ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Agendar cita</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <label htmlFor="datetime" className="font-medium">
                    Fecha y hora
                  </label>
                  <input
                    id="datetime"
                    type="datetime-local"
                    value={datetime}
                    onChange={(e) => setDatetime(e.target.value)}
                    className="border border-gray-300 rounded p-2"
                    required
                  />

                  {error && (
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  )}
                  {success && (
                    <p className="text-green-600 text-sm font-medium">
                      Cita agendada correctamente.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold disabled:opacity-50 transition"
                  >
                    {loading ? "Agendando..." : "Agendar"}
                  </button>
                </form>
              </>
            ) : (
              children
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
