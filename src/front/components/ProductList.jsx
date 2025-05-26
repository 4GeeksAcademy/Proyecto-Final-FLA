// src/components/ProductList.jsx
import React from 'react';

const ProductList = ({ products, onSelectProduct }) => {
  if (!products || products.length === 0) {
    return <p className="p-4">No se encontraron productos.</p>;
  }

  // Determinar el producto con el precio más bajo
  const lowestPrice = Math.min(...products.map(p => p.price));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {products.map(product => (
        <div
          key={product.id}
          onClick={() => onSelectProduct(product)}
          className={`cursor-pointer border rounded-xl p-4 shadow-sm transition hover:shadow-md ${
            product.price === lowestPrice ? 'border-green-500' : 'border-gray-300'
          }`}
        >
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-40 object-contain mb-2"
          />
          <h3 className="text-md font-semibold">{product.title}</h3>
          <p className="text-gray-600 text-sm">{product.category}</p>
          <p className="text-lg font-bold mt-1">${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
