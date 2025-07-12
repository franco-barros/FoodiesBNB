"use client";

import { useState, FC } from "react";
import { Search, Utensils, List } from "lucide-react";

interface SearchFilters {
  term: string;
  cuisine: string;
  foodType: string;
}

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  cuisines?: string[];
  foodTypes?: string[];
}

const SearchBar: FC<SearchBarProps> = ({
  onSearch,
  cuisines = [],
  foodTypes = [],
}) => {
  const [term, setTerm] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [foodType, setFoodType] = useState("");

  const handleSearch = (updated: Partial<SearchFilters>) => {
    const newFilters = {
      term,
      cuisine,
      foodType,
      ...updated,
    };
    setTerm(newFilters.term);
    setCuisine(newFilters.cuisine);
    setFoodType(newFilters.foodType);
    onSearch({
      term: newFilters.term.toLowerCase(),
      cuisine: newFilters.cuisine,
      foodType: newFilters.foodType,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Búsqueda por nombre */}
      <div className="flex items-center border border-gray-300 rounded-xl shadow-sm px-3 py-2 focus-within:ring-2 focus-within:ring-cyan-600">
        <Search className="text-gray-400 mr-2" size={20} />
        <input
          type="text"
          value={term}
          onChange={(e) => handleSearch({ term: e.target.value })}
          placeholder="Buscar por nombre o especialidad"
          className="w-full focus:outline-none rounded-xl"
        />
      </div>

      {/* Filtro por cocina */}
      <div className="flex items-center border border-gray-300 rounded-xl shadow-sm bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-cyan-600">
        <Utensils className="text-gray-400 mr-2" size={20} />
        <select
          value={cuisine}
          onChange={(e) => handleSearch({ cuisine: e.target.value })}
          className="w-full bg-transparent focus:outline-none cursor-pointer rounded-xl"
        >
          <option value="">Todas las cocinas</option>
          {cuisines.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro por tipo de comida */}
      <div className="flex items-center border border-gray-300 rounded-xl shadow-sm bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-cyan-600">
        <List className="text-gray-400 mr-2" size={20} />
        <select
          value={foodType}
          onChange={(e) => handleSearch({ foodType: e.target.value })}
          className="w-full bg-transparent focus:outline-none cursor-pointer rounded-xl"
        >
          <option value="">Todos los tipos</option>
          {foodTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
