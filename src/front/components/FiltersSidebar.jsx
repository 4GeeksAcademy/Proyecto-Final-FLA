import React, { useEffect, useState } from 'react';

const FiltersSidebar = ({ filters, setFilters }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
        const res = await fetch(`${backendUrl}/api/products/categories`);
        if (!res.ok) throw new Error('Error al obtener categorías');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Error cargando categorías:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-64 p-4 bg-gray-50 border border-gray-200 rounded-xl h-fit shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Categoría</label>
        <select
          className="w-full p-2 border rounded"
          value={filters.category}
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
        >
          <option value="">Todas</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Precio mínimo</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={filters.minPrice || ''}
          min={0}
          onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Precio máximo</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={filters.maxPrice || ''}
          min={0}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
        />
      </div>
    </div>
  );
};

export default FiltersSidebar;
