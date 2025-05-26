import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/search?category=${categoryId}`);
  };

  return (
    <div className="d-flex justify-content-center">

      <div className="container-fluid m-4">
        <h2 className="text-center mb-4">Categorías</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4" style={{ cursor: "pointer" }}>
          {categories.map((category) => (
            <div className="col" key={category.id}>
              <div
                className={`card p-3 shadow-sm text-center cursor-pointer category-card ${selectedCategory === category.id ? "clicked" : ""
                  }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <h5 className="fw-bold category-text">{category.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;