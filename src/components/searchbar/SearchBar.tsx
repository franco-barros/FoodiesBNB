"use client";

import { useState, FC } from "react";

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
      <input
        type="text"
        value={term}
        onChange={(e) => handleSearch({ term: e.target.value })}
        placeholder="Buscar por nombre o especialidad"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
      />

      {/* Filtro por cocina */}
      <select
        value={cuisine}
        onChange={(e) => handleSearch({ cuisine: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
      >
        <option value="">Todas las cocinas</option>
        {cuisines.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Filtro por tipo de comida */}
      <select
        value={foodType}
        onChange={(e) => handleSearch({ foodType: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
      >
        <option value="">Todos los tipos</option>
        {foodTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
