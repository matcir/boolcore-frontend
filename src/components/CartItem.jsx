import { useCart } from "../Context/CartContext";

export default function CartItem({ item }) {
    const { removeFromCart } = useCart();

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <h6 className="mb-1">{item.name}</h6>
                <small>€ {item.price} x {item.quantity}</small>
            </div>
            <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeFromCart(item.id)}
            >
                Rimuovi
            </button>
        </li>
    );
}

