import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook para volver atrás

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Categoría: {id}</h2>
      
      {/* Botón para regresar a la vista anterior */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="row">
        {/* Filtros */}
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h5 className="fw-bold">Filtros</h5>
            <input type="range" className="form-range" />
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="offer" />
              <label className="form-check-label" htmlFor="offer">Solo ofertas</label>
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="col-md-9">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {[...Array(6)].map((_, index) => (
              <div className="col" key={index}>
                <div className="card p-3 shadow-sm text-center">
                  <img src="https://via.placeholder.com/150" alt="Producto" className="img-fluid mb-2" />
                  <h5 className="fw-bold">Producto {index + 1}</h5>
                  <p>$99.99</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;