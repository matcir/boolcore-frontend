import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { useState } from "react";

export default function WishlistPage() {
    const { items, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");

    const showAlertMessage = (message, type = "success") => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const handleAddToCart = (product) => {
        const originalPrice = parseFloat(product.price);
        const discountValue = product.discount && !isNaN(product.discount) ? parseFloat(product.discount) : 0;
        const finalPrice = discountValue > 0
            ? originalPrice - (originalPrice * discountValue)
            : originalPrice;

        addToCart({
            id: product.id,
            product_name: product.product_name,
            image: product.images?.[0] || product.image,
            price: finalPrice,
            original_price: originalPrice,
            discount: discountValue,
        });

        showAlertMessage("Prodotto aggiunto al carrello!");
    };

    const handleRemoveFromWishlist = (id, productName) => {
        removeFromWishlist(id);
        showAlertMessage(`${productName} rimosso dalla wishlist`, "warning");
    };

    const handleClearWishlist = () => {
        if (window.confirm("Sei sicuro di voler svuotare la wishlist?")) {
            clearWishlist();
            showAlertMessage("Wishlist svuotata", "info");
        }
    };

    const calculateDiscountedPrice = (price, discount) => {
        const originalPrice = parseFloat(price);
        const discountValue = discount && !isNaN(discount) ? parseFloat(discount) : 0;

        if (discountValue > 0) {
            return (originalPrice - (originalPrice * discountValue)).toFixed(2);
        }
        return originalPrice.toFixed(2);
    };

    if (items.length === 0) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <i className="fas fa-heart text-muted" style={{ fontSize: '4rem' }}></i>
                    <h2 className="mt-3 text-light">La tua wishlist è vuota</h2>
                    <p className="text-muted">Aggiungi i tuoi prodotti preferiti alla wishlist per trovarli facilmente!</p>
                    <Link to="/products" className="btn btn-primary mt-3">
                        <i className="fas fa-shopping-bag me-2"></i>
                        Scopri i prodotti
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            {showAlert && (
                <div
                    className={`alert alert-${alertType} alert-dismissible fade show position-fixed`}
                    style={{ top: '80px', right: '20px', zIndex: 1000 }}
                >
                    <i className={`fas ${alertType === 'success' ? 'fa-check-circle' : alertType === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'} me-2`}></i>
                    {alertMessage}
                    <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
                </div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-light">
                    <i className="fas fa-heart text-danger me-2"></i>
                    La mia Wishlist ({items.length})
                </h1>
                {items.length > 0 && (
                    <button
                        className="btn btn-outline-danger"
                        onClick={handleClearWishlist}
                    >
                        <i className="fas fa-trash me-1"></i>
                        Svuota wishlist
                    </button>
                )}
            </div>

            <div className="row">
                {items.map((product) => (
                    <div key={product.id} className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card h-100 bg-dark border-secondary">
                            <Link
                                to={`/products/${slugify(product.product_name, {
                                    lower: true,
                                    strict: true,
                                })}`}
                            >
                                <div className="card-img-top position-relative">
                                    <img
                                        src={`http://localhost:3000/${product.images?.[0] || product.image}`}
                                        alt={product.product_name}
                                        className="img-fluid"
                                        style={{
                                            height: '200px',
                                            objectFit: 'contain',
                                            width: '100%'
                                        }}
                                    />
                                    {product.discount > 0 && (
                                        <div className="position-absolute top-0 start-0 m-2">
                                            <span className="badge bg-success">
                                                -{(parseFloat(product.discount * 100)).toFixed(0)}%
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </Link>

                            <div className="card-body text-center text-light d-flex flex-column">
                                <h5 className="card-title">{product.product_name}</h5>

                                <div className="mb-3">
                                    {product.discount > 0 ? (
                                        <>
                                            <p className="card-text text-decoration-line-through text-muted mb-1">
                                                {parseFloat(product.price).toFixed(2)}€
                                            </p>
                                            <p className="card-text text-danger fs-5 mb-0">
                                                {calculateDiscountedPrice(product.price, product.discount)}€
                                            </p>
                                        </>
                                    ) : (
                                        <p className="card-text fs-5">
                                            {parseFloat(product.price).toFixed(2)}€
                                        </p>
                                    )}
                                </div>

                                <p className="card-text text-muted small mb-3">
                                    {product.description || "Nessuna descrizione disponibile"}
                                </p>

                                <div className="mt-auto">
                                    <div className="d-grid gap-2">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            <i className="fas fa-cart-plus me-1"></i>
                                            Aggiungi al carrello
                                        </button>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => handleRemoveFromWishlist(product.id, product.product_name)}
                                        >
                                            <i className="fas fa-heart-broken me-1"></i>
                                            Rimuovi dalla wishlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 text-center">
                <Link to="/products" className="btn btn-outline-light me-3">
                    <i className="fas fa-arrow-left me-1"></i>
                    Continua lo shopping
                </Link>
            </div>
        </div>
    );
}