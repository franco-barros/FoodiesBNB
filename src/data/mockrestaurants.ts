import type { Restaurant } from "../types/restaurant";

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "La Casa del Sabor",
    cuisine: "Argentina",
    rating: 4.5,
    address: "Calle Falsa 123, Buenos Aires",
    imageUrl: "/images/comida1.png",
    foodTypes: ["Parrilla", "Empanadas", "Milanesas"],
    description:
      "Un rincón tradicional argentino con sabores caseros, ideal para los amantes de la parrilla y las empanadas.",
  },
  {
    id: "2",
    name: "Pasta Fresca",
    cuisine: "Italiana",
    rating: 4,
    address: "Av. Siempre Viva 742",
    imageUrl: "/images/comida2.png",
    foodTypes: ["Pasta", "Vegetariano", "Pizzas"],
    description:
      "Deliciosos platos de pasta artesanal y pizzas al horno de piedra en un ambiente acogedor.",
  },
  {
    id: "3",
    name: "Sushi World",
    cuisine: "Japonesa",
    rating: 1,
    address: "Boulevard del Mar 456",
    imageUrl: "/images/comida.png",
    foodTypes: ["Sushi", "Vegano", "Mariscos"],
    description:
      "Sushi fresco, mariscos y opciones veganas con una presentación moderna y sabores auténticos.",
  },
  {
    id: "4",
    name: "Veggie Life",
    cuisine: "Internacional",
    rating: 4.7,
    address: "Ruta Verde 789, Rosario",
    imageUrl: "/images/comida6.png",
    foodTypes: ["Vegano", "Vegetariano", "Pasta"],
    description:
      "Comida saludable y creativa basada en plantas, perfecta para quienes buscan opciones nutritivas y sabrosas.",
  },
  {
    id: "5",
    name: "Pizza Express",
    cuisine: "Italiana",
    rating: 4.1,
    address: "Pizza Street 456, La Plata",
    imageUrl: "/images/comida35.png",
    foodTypes: ["Pizzas"],
    description:
      "Pizzas al estilo clásico italiano listas en minutos, con ingredientes frescos y masa crujiente.",
  },
  {
    id: "6",
    name: "El Gaucho Grill",
    cuisine: "Argentina",
    rating: 5,
    address: "San Martín 155, Mendoza",
    imageUrl: "/images/comida3.png",
    foodTypes: ["Parrilla", "Empanadas"],
    description:
      "Especialistas en carnes a la parrilla y empanadas tradicionales en un entorno rústico y acogedor.",
  },
];
