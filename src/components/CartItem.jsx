import { useCart } from "../contexts/CartContext";

export default function CartItem({ item }) {
    const { removeFromCart, incrementQuantity, decrementQuantity } = useCart();

    const handleDecreaseQuantity = () => {
        if (item.quantity <= 1) {
            removeFromCart(item.id);
        } else {
            decrementQuantity(item.id);
        }
    };

    const handleIncreaseQuantity = () => {
        incrementQuantity(item.id);
    };

    // Verifica se il prodotto ha uno sconto
    const hasDiscount = item.discount && item.discount > 0;

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="flex-grow-1">
                <h6 className="mb-1">{item.product_name}</h6>
                <div>
                    {hasDiscount ? (
                        <small>
                            <span className="text-decoration-line-through text-muted me-2">
                                €{item.original_price.toFixed(2)}
                            </span>
                            <span className="text-danger fw-bold">
                                €{item.price.toFixed(2)}
                            </span>
                            <span className="text-muted"> x {item.quantity}</span>
                        </small>
                    ) : (
                        <small>€{item.price.toFixed(2)} x {item.quantity}</small>
                    )}
                </div>
            </div>
            <div className="d-flex align-items-center">
                <div className="btn-group me-2" role="group">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={handleDecreaseQuantity}
                    >
                        -
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary disabled"
                    >
                        {item.quantity}
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={handleIncreaseQuantity}
                    >
                        +
                    </button>
                </div>
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromCart(item.id)}
                >
                    Rimuovi
                </button>
            </div>
        </li>
    );
}