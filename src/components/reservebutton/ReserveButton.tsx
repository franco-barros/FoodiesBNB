"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../hooks/useAuth";

interface ReserveButtonProps {
  restaurantName: string;
}

const MotionDialog = motion.dialog;

const ReserveButton: React.FC<ReserveButtonProps> = ({ restaurantName }) => {
  const { user, loading } = useAuth();
  const userId = user?.id || null;

  const [isOpen, setIsOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [time, setTime] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!time) {
      setError("Por favor selecciona una hora.");
      return;
    }
    if (!userId) {
      setError("No se pudo identificar al usuario.");
      return;
    }
    setLoadingSubmit(true);

    try {
      // Convertir "HH:mm" a timestamp ISO
      const scheduledAt = new Date();
      const [hours, minutes] = time.split(":").map(Number);
      scheduledAt.setHours(hours, minutes, 0, 0);

      const { error: insertError } = await supabase
        .from("appointments")
        .insert({
          user_id: userId,
          scheduled_at: scheduledAt.toISOString(),
          created_at: new Date().toISOString(),
          restaurant_name: restaurantName,
        });

      if (insertError) {
        setError(insertError.message);
      } else {
        setConfirmation(
          `Reserva confirmada en ${restaurantName} a las ${time}`
        );
        setTime("");
        setTimeout(() => {
          setConfirmation("");
          setIsOpen(false);
        }, 2500);
      }
    } catch (unknownError: unknown) {
      console.error(unknownError);
      setError("Error inesperado al agendar cita.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  // Si está cargando sesión, podés mostrar un loader o nada
  if (loading) return null;

  // Extraigo la lógica para el contenido del modal y evitar ternarios anidados
  let modalContent;
  if (!userId) {
    modalContent = (
      <p className="text-red-600 font-medium">
        Debes iniciar sesión para reservar.
      </p>
    );
  } else if (confirmation) {
    modalContent = (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-green-600 font-medium"
      >
        {confirmation}
      </motion.p>
    );
  } else {
    modalContent = (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="hora" className="block">
          <span>Hora aproximada:</span>
          <input
            id="hora"
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
        </label>

        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          disabled={loadingSubmit}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition cursor-pointer disabled:opacity-50"
        >
          {loadingSubmit ? "Agendando..." : "Confirmar reserva"}
        </button>
      </form>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition cursor-pointer"
      >
        Programar visita
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Cerrar modal"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            style={{ border: "none", padding: 0, margin: 0, cursor: "pointer" }}
          />

          <MotionDialog
            open={isOpen}
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 z-50 m-auto max-w-md w-full rounded-xl bg-white shadow-lg p-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 font-bold text-xl"
              aria-label="Cerrar"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4 text-red-600">
              Programar visita en {restaurantName}
            </h2>

            {modalContent}
          </MotionDialog>
        </>
      )}
    </>
  );
};

export default ReserveButton;
