import React, { useEffect, useState } from 'react';
import SearchBox from '../components/SearchBox';
import FiltersSidebar from '../components/FiltersSidebar';
import ProductList from '../components/ProductList';
import CompareModal from '../components/CompareModal';

const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '' });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;  
  
useEffect(() => {
  // Evitar buscar si no hay búsqueda ni filtros aplicados
  if (!search && !filters.category && !filters.minPrice && !filters.maxPrice) {
    setProducts([]);
    return;
  }

  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (filters.category) params.append('category', filters.category);
  if (filters.minPrice) params.append('min_price', filters.minPrice);
  if (filters.maxPrice) params.append('max_price', filters.maxPrice);

  console.log("Fetch URL:", `${backendUrl}/api/products?${params.toString()}`);

const fetchProducts = async () => {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl) throw new Error("VITE_BACKEND_URL no está definido");

    const res = await fetch(`${backendUrl}/api/products?${params.toString()}`);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Error HTTP: ${res.status} - ${text}`);
    }

    const data = await res.json();
    setProducts(data);
  } catch (err) {
    console.error('Error al buscar productos', err);
  }
};

  fetchProducts();
}, [search, filters]);

  return (
    <div className="flex min-h-screen p-4 gap-6">
      <div className="w-64">
        {/* Prop correcto para actualizar filtros */}
        <FiltersSidebar filters={filters} setFilters={setFilters} />
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <SearchBox onSearch={setSearch} />
        <ProductList products={products} onSelectProduct={setSelectedProduct} />
      </div>

      {selectedProduct && (
        <CompareModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default SearchPage;
