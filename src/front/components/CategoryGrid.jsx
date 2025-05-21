import React from "react";
import { Link } from "react-router-dom"; // Para manejar navegación

const categories = [
  { id: "electronics", name: "Electrónica" },
  { id: "fashion", name: "Moda" },
  { id: "home", name: "Hogar" },
  { id: "sports", name: "Deportes" },
  { id: "books", name: "Libros" },
  { id: "beauty", name: "Belleza" },
  { id: "toys", name: "Juguetes" },
  { id: "automotive", name: "Automóviles" }
];

const CategoryGrid = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Categorías</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {categories.map((category) => (
          <div className="col" key={category.id}>
            <Link to={`/category/${category.id}`} className="text-decoration-none">
              <div className="card p-3 shadow-sm text-center">
                <h5 className="fw-bold">{category.name}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;