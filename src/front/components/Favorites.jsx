import { useState, useEffect } from "react";

export const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const removeFavorite = (productId) => {
        const updatedFavorites = favorites.filter(product => product.id !== productId);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="container m-4">
            <h2 className="fw-bold text-center">Mis Favoritos ❤️</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {favorites.length === 0 ? (
                    <p className="text-center text-muted">No tienes productos favoritos aún.</p>
                ) : (
                    favorites.map((product) => (
                        <div className="col" key={product.id}>
                            <div className="card p-3 shadow-sm">
                                <img src={product.thumbnail} alt={product.title} className="img-fluid" style={{ width: "350px", height: "350px", objectFit: "cover" }} />
                                <h5 className="fw-bold mt-2">{product.title}</h5>
                                <p className="text-primary fw-bold">€{product.price}</p>
                                <button className="btn btn-danger mt-2" onClick={() => removeFavorite(product.id)}>Eliminar</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};