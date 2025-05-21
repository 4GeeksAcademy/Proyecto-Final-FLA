export const ProductsTop = () => {
    return (
        <div className="container m-auto">
            <div className="row row-cols-1 row-cols-md-3 g-4">

                <div className="col">
                    <div className="card p-3 shadow-sm">
                        <div className="row">

                            <div className="col-md-6 d-flex flex-column align-items-center">
                                <img
                                    src="src/front/assets/img/rigo-baby.jpg"
                                    alt="Imagen del producto"
                                    className="img-fluid"
                                    style={{ width: "350px", height: "350px", objectFit: "cover" }}
                                />

                                <div className="mt-2 text-center">
                                    <span className="text-warning fs-5">★★★★☆</span>
                                    <p className="text-muted mb-0">Puntuación media: 4.5</p>
                                </div>

                                <div className="mt-2">
                                    <p className="text-muted fw-bold">Tienda: Nombre de la tienda</p>
                                </div>
                            </div>


                            <div className="col-md-6 d-flex flex-column justify-content-between">
                                <div>
                                    <h5 className="fw-bold">Nombre del producto</h5>
                                    <p className="text-muted">
                                        Descripción breve del producto. Este espacio contiene información sobre
                                        características y detalles relevantes.
                                    </p>
                                </div>

                                <div className="text-end">
                                    <h4 className="fw-bold text-primary">€99.99</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col">
                    <div className="card p-3 shadow-sm">
                        <div className="row">
                            <div className="col-md-6 d-flex flex-column align-items-center">
                                <img
                                    src="src/front/assets/img/rigo-baby.jpg"
                                    alt="Imagen del producto"
                                    className="img-fluid"
                                    style={{ width: "350px", height: "350px", objectFit: "cover" }}
                                />
                                <div className="mt-2 text-center">
                                    <span className="text-warning fs-5">★★★☆☆</span>
                                    <p className="text-muted mb-0">Puntuación media: 3.8</p>
                                </div>
                                <div className="mt-2">
                                    <p className="text-muted fw-bold">Tienda:Nombre de la Tienda</p>
                                </div>
                            </div>

                            <div className="col-md-6 d-flex flex-column justify-content-between">
                                <div>
                                    <h5 className="fw-bold">Otro producto</h5>
                                    <p className="text-muted">
                                        Este es otro artículo que sigue el mismo formato.
                                    </p>
                                </div>
                                <div className="text-end">
                                    <h4 className="fw-bold text-primary">€49.99</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col">
                    <div className="card p-3 shadow-sm">
                        <div className="row">
                            <div className="col-md-6 d-flex flex-column align-items-center">
                                <img
                                    src="src/front/assets/img/rigo-baby.jpg"
                                    alt="Imagen del producto"
                                    className="img-fluid"
                                    style={{ width: "350px", height: "350px", objectFit: "cover" }}
                                />
                                <div className="mt-2 text-center">
                                    <span className="text-warning fs-5">★★★★☆</span>
                                    <p className="text-muted mb-0">Puntuación media: 4.2</p>
                                </div>
                                <div className="mt-2">
                                    <p className="text-muted fw-bold">Tienda: Nombre de la tienda</p>
                                </div>
                            </div>

                            <div className="col-md-6 d-flex flex-column justify-content-between">
                                <div>
                                    <h5 className="fw-bold">Tercer producto</h5>
                                    <p className="text-muted">
                                        Última tarjeta de ejemplo con mismo formato.
                                    </p>
                                </div>
                                <div className="text-end">
                                    <h4 className="fw-bold text-primary">€79.99</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};


