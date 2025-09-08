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

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="flex-grow-1">
                <h6 className="mb-1">{item.product_name}</h6>
                <small>€ {item.price} x {item.quantity}</small>
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