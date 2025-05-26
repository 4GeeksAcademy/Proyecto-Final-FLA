import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error("Error al obtener el producto:", error));
    }, [id]);

    if (!product) return <h2>Producto no encontrado</h2>;

    return (
        <div className="container text-center mt-5">
            <div className="card p-4 shadow-lg">
                <img src={product.thumbnail} alt={product.title} className="img-fluid" style={{ maxWidth: "500px", objectFit: "cover" }} />
                <h2 className="fw-bold mt-3">{product.title}</h2>
                <p className="text-primary fs-3">€{product.price}</p>
                <p className="text-muted">{product.description}</p>
            </div>
        </div>
    );
};