import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";

export default function CartItem({ item, onCloseCart }) {
    const { removeFromCart, incrementQuantity, decrementQuantity } = useCart();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const navigate = useNavigate();

    const NavigateToProduct = () => {
        const slug = slugify(item.product_name, { lower: true });
        navigate(`/products/${slugify(item.product_name, {
            lower: true,
            strict: true,
        })}`);
        if (onCloseCart) onCloseCart();
    };

    const handleDecreaseQuantity = () => {
        if (item.quantity <= 1) {
            setShowConfirmModal(true);
        } else {
            decrementQuantity(item.id);
        }
    };

    const handleIncreaseQuantity = () => {
        incrementQuantity(item.id);
    };

    const confirmRemove = () => {
        removeFromCart(item.id);
        setShowConfirmModal(false);
    };

    const cancelRemove = () => {
        setShowConfirmModal(false);
    };

    const hasDiscount = item.discount && item.discount > 0;

    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="flex-grow-1" style={{ cursor: "pointer" }} onClick={NavigateToProduct}>
                    <h6 className="mb-1">{item.product_name}</h6>
                    <div>
                        {hasDiscount ? (
                            <small>
                                <span className="text-decoration-line-through text-muted me-2">
                                    €{parseFloat(item.original_price || item.price).toFixed(2)}
                                </span>
                                <span className="text-danger fw-bold">
                                    €{parseFloat(item.price).toFixed(2)}
                                </span>
                                <span className="text-muted"> x {item.quantity}</span>
                            </small>
                        ) : (
                            <small>€{parseFloat(item.price).toFixed(2)} x {item.quantity}</small>
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
                        onClick={() => setShowConfirmModal(true)}
                    >
                        Rimuovi
                    </button>
                </div>
            </li>
            <div className={`modal fade ${showConfirmModal ? 'show' : ''}`}
                style={{ display: showConfirmModal ? 'block' : 'none' }}
                tabIndex="-1"
                aria-hidden={!showConfirmModal}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Conferma eliminazione</h5>
                            <button type="button" className="btn-close" onClick={cancelRemove}></button>
                        </div>
                        <div className="modal-body">
                            Sei sicuro di voler eliminare "{item.product_name}" dal carrello?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={cancelRemove}>
                                Annulla
                            </button>
                            <button type="button" className="btn btn-danger" onClick={confirmRemove}>
                                Elimina
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showConfirmModal && (
                <div className="modal-backdrop fade show" onClick={cancelRemove}></div>
            )}
        </>
    );
}