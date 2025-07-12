export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  description?: string;
  rating: number; // 1 a 5
  address: string;
  imageUrl?: string;
  foodTypes?: string[];
}
