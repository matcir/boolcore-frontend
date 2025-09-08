import { useCart } from "../contexts/CartContext";

export default function CartItem({ item }) {
    const { removeFromCart, addToCart } = useCart();

    const decreaseQuantity = () => {
        if (item.quantity > 1) {
            removeFromCart(item.id);
            addToCart({ ...item, quantity: item.quantity - 1 });
        } else {
            removeFromCart(item.id);
        }
    };

    const increaseQuantity = () => {
        removeFromCart(item.id);
        addToCart({ ...item, quantity: item.quantity + 1 });
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
                        onClick={decreaseQuantity}
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
                        onClick={increaseQuantity}
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