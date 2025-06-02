import React, { useEffect } from "react";
import { useState } from "react";

export default function ProductModal({ product, show, onClose, onRemoveFavorite }) {
  if (!product) return null;
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  // Soporte para diferentes fuentes de datos
  const title = product.name || product.title || "Producto sin nombre";
  const price = product.price ?? "N/A";
  const description = product.description || "Sin descripción";
  const imageUrl =
    (product.images && product.images[0]) ||
    product.image ||
    "https://via.placeholder.com/300x300?text=Sin+Imagen";
  // Soporte para rating en diferentes formatos
  const rating =
    typeof product.rating === "object"
      ? product.rating.rate
      : product.rating ?? product.rate ?? 0;
  const ratingCount =
    typeof product.rating === "object" && product.rating.count
      ? product.rating.count
      : product.ratingCount ?? null;

  let tienda = "Desconocida";
  if (product.store_name) tienda = product.store_name;
  else if (product.source === "dummyjson") tienda = "DummyJSON";
  else if (product.source === "fakestore") tienda = "FakeStore";

  // Detectar si el producto ya está en favoritos
  useEffect(() => {
    if (!show || !product) return;
    const checkFavorite = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsFavorite(false);
        setFavoriteId(null);
        return;
      }
      const BACKEND_URL = "https://glowing-engine-g47g9q94v665hpwq5-3001.app.github.dev/";
      try {
        const response = await fetch(`${BACKEND_URL}/api/favorites`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          const found = data.find(fav => fav.product_id === product.id);
          setIsFavorite(!!found);
          setFavoriteId(found ? found.id : null);
        } else {
          setIsFavorite(false);
          setFavoriteId(null);
        }
      } catch (e) {
        setIsFavorite(false);
        setFavoriteId(null);
      }
    };
    checkFavorite();
  }, [show, product]);

  // Detectar clic fuera del modal
  useEffect(() => {
    if (!show) return;

    const handleClickOutside = (e) => {
      const modalContent = document.querySelector(".modal-content");
      if (modalContent && !modalContent.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  const handleToggleFavorite = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para gestionar favoritos.");
      return;
    }
    const BACKEND_URL = "https://glowing-engine-g47g9q94v665hpwq5-3001.app.github.dev/";

    if (isFavorite && favoriteId) {
      // Quitar de favoritos usando el id del favorito
      const response = await fetch(`${BACKEND_URL}/api/favorites/${favoriteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        setIsFavorite(false);
        setFavoriteId(null);
        alert("Producto eliminado de favoritos");
        if (onRemoveFavorite) onRemoveFavorite(favoriteId); // Notifica al padre
        setShowModal(false); // Cierra el modal automáticamente
      } else {
        alert("No se pudo eliminar de favoritos");
      }
    } else {
      // Agregar a favoritos
      const body = {
        product_id: product.id,
        store_id: product.store_id,
        date_ad: new Date().toISOString().slice(0, 10)
      };
      const response = await fetch(`${BACKEND_URL}/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        setIsFavorite(true);
        // Actualiza el favoriteId después de agregar
        const favs = await fetch(`${BACKEND_URL}/api/favorites`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (favs.ok) {
          const data = await favs.json();
          const found = data.find(fav => fav.product_id === product.id);
          setFavoriteId(found ? found.id : null);
        }
        alert("Producto agregado a favoritos");
      } else {
        alert("No se pudo agregar a favoritos");
      }
    }
  };
  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header justify-content-between align-items-center">
            <h5 className="modal-title">{title}</h5>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-danger me-2"
                onClick={handleToggleFavorite}
                title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                style={{ fontSize: "1.5rem" }}
              >
                <i className={isFavorite ? "bi bi-heart-fill" : "bi bi-heart"} style={{ fontSize: "2rem" }}></i>
              </button>
            </div>
          </div>

          <div className="modal-body d-flex flex-column align-items-center">
            <div className="text-center mb-4">
              <img
                src={imageUrl}
                alt={title}
                className="img-fluid rounded"
                style={{ maxWidth: "300px" }}
              />
              <div className="text-warning fw-bold mt-2">
                ⭐ {rating}/5 {ratingCount ? `(${ratingCount} votos)` : ""}
              </div>
            </div>

            <div className="w-100 text-center">
              <p className="mb-4">{description}</p>
              <h4 className="text-success">
                {typeof price === "number" ? `$${price}` : price}
              </h4>
            </div>
          </div>

          <div className="modal-footer justify-content-center">
            <span className="text-muted">Tienda: {tienda}</span>
          </div>
        </div>
      </div>
    </div>
  );
}