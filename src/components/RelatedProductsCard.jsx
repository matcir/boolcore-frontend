export default function RelatedProductsCard({ product, onAddToCart }) {
    return (
        <div className="col-6 col-md-3 mb-4">
            <div className="card h-100 text-center">
                <img
                    src={`http://localhost:3000/${product.images?.[0]}`}
                    className="card-img-top p-3"
                    alt={product.product_name}
                    style={{
                        maxHeight: "150px",
                        objectFit: "contain",
                    }}
                />
                <div className="card-body p-2">
                    <h6 className="card-title">{product.product_name}</h6>
                    {product?.discount > 0 ?
                        <>
                            <span className="badge text-bg-success">
                                -{parseFloat(product?.discount * 100).toFixed(0)}%
                            </span>
                            <p className="card-text text-decoration-line-through">
                                {product?.price ? `${parseFloat(product.price).toFixed(2)}€` : ""}
                            </p>
                            <p className="card-text text-danger fs-5">
                                {product?.price ? `${parseFloat(product.price - (product.price * product.discount)).toFixed(2)}€` : ""}
                            </p>
                        </>
                        :
                        <p className="card-text">
                            {product?.price ? `${parseFloat(product.price).toFixed(2)}€` : ""}
                        </p>
                    }
                    <button
                        className="btn btn-outline-dark btn-sm w-100 mt-2"
                        onClick={() => onAddToCart(product)}
                    >
                        <i className="bi bi-cart-plus me-2"></i>
                        Aggiungi
                    </button>
                </div>
            </div>
        </div>
    )
}

