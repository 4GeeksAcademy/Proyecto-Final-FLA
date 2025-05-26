import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const ProductsTop = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=3") 
            .then(response => response.json())
            .then(data => setProducts(data.products))
            .catch(error => console.error("Error al obtener los productos:", error));

        // Obtener favoritos desde DummyJSON (simulación)
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const toggleFavorite = (product) => {
        let updatedFavorites = [...favorites];

        if (favorites.some(fav => fav.id === product.id)) {
            updatedFavorites = updatedFavorites.filter(fav => fav.id !== product.id);
        } else {
            updatedFavorites.push(product);
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="container-fluid m-4">
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map((product) => (
                    <div className="col" key={product.id}>
                        <div className="card p-3 shadow-sm" style={{ position: "relative" }}>
                            <button 
                                onClick={() => toggleFavorite(product)} 
                                style={{
                                    position: "absolute", 
                                    top: "10px", right: "10px", 
                                    background: "none", border: "none", fontSize: "24px", cursor: "pointer"
                                }}>
                                {favorites.some(fav => fav.id === product.id) ? "❤️" : "🤍"}
                            </button>

                            <div onClick={() => navigate(`/product/${product.id}`, { state: { product } })} style={{ cursor: "pointer" }}>
                                <img src={product.thumbnail} alt={product.title} className="img-fluid" style={{ width: "350px", height: "350px", objectFit: "cover" }} />
                                <h5 className="fw-bold mt-2">{product.title}</h5>
                                <p className="text-primary fw-bold">€{product.price}</p>
                                <div className="text-center mt-2">
                                    <span className="text-warning fs-5">★★★★☆</span>
                                    <p className="text-muted mb-0">Puntuación: {product.rating}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};