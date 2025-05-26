// src/components/CompareModal.jsx
import React, { useEffect, useState } from 'react';

const CompareModal = ({ product, onClose }) => {
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!product) return;

    const fetchComparisons = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/products/search?q=${encodeURIComponent(product.title)}`
        );
        const data = await response.json();
        setComparisons(data);
      } catch (err) {
        console.error('Error fetching comparisons', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComparisons();
  }, [product]);

  const lowestPrice = comparisons.length > 0
    ? Math.min(...comparisons.map(p => p.price))
    : null;

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">
          Comparativa de precios para: <span className="text-blue-600">{product.title}</span>
        </h2>
        {loading ? (
          <p>Cargando comparativas...</p>
        ) : comparisons.length === 0 ? (
          <p>No se encontraron productos similares.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {comparisons.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded border shadow ${
                  item.price === lowestPrice ? 'border-green-500' : 'border-gray-300'
                }`}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-32 object-contain mb-2"
                />
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600">{item.category}</p>
                <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareModal;
