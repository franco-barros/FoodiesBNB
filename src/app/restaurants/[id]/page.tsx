import { notFound } from "next/navigation";
import { mockRestaurants } from "../../../data/mockrestaurants";
import Image from "next/image";
import { ReserveButton } from "../../../components/reservebutton";

type PageProps = Readonly<{ params: Promise<{ id: string }> }>;

export default async function RestaurantDetailPage({ params }: PageProps) {
  const { id } = await params; // await porque es Promise

  const restaurant = mockRestaurants.find((r) => r.id === id);

  if (!restaurant) return notFound();

  return (
    <div className="min-h-screen px-4 sm:px-8 pt-28 pb-16 max-w-4xl mx-auto bg-white text-black">
      {restaurant.imageUrl && (
        <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden shadow">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl font-bold text-red-600 mb-4">
        {restaurant.name}
      </h1>
      <p className="text-gray-700 mb-2">
        <strong>Cocina:</strong> {restaurant.cuisine}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Dirección:</strong> {restaurant.address}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Rating:</strong> {restaurant.rating} estrellas
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Comidas:</strong> {restaurant.foodTypes?.join(", ") || "N/A"}
      </p>
      <p className="text-gray-700 mt-4 mb-6">
        <strong>Descripción:</strong>{" "}
        {restaurant.description || "No disponible"}
      </p>

      <ReserveButton restaurantName={restaurant.name} />
    </div>
  );
}
