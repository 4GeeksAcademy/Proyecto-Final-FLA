// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product, isLowest, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border rounded-xl p-4 shadow hover:shadow-md transition-all ${
        isLowest ? 'border-green-500 bg-green-50' : 'border-gray-200'
      }`}
    >
      <img
        src={product.image_url}
        alt={product.title}
        className="w-full h-32 object-contain mb-2"
      />
      <h3 className="text-sm font-semibold truncate">{product.title}</h3>
      <p className="text-xs text-gray-500">{product.category}</p>
      <p className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</p>
      {isLowest && (
        <p className="text-green-600 text-xs font-semibold mt-1">¡Mejor precio!</p>
      )}
    </div>
  );
};

export default ProductCard;
