import { useCart } from "../contexts/CartContext";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CartSidebar() {
    const { items, total, clearCart, totalItems, totalSaved } = useCart();
    const navigate = useNavigate();
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    const handleCheckout = () => {
        const closeButton = document.querySelector('[data-bs-dismiss="offcanvas"]');
        if (closeButton) {
            closeButton.click();
        }

        setTimeout(() => {
            navigate('/checkout');
        }, 100);
    };

    const confirmClearCart = () => {
        clearCart();
        setShowClearConfirm(false);
    };

    const cancelClearCart = () => {
        setShowClearConfirm(false);
    };

    return (
        <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="cartSidebar"
            aria-labelledby="cartSidebarLabel"
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="cartSidebarLabel">
                    🛒 Carrello
                    {totalItems > 0 && <span className="badge bg-primary ms-2">{totalItems}</span>}
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div className="offcanvas-body d-flex flex-column">
                {items.length === 0 ? (
                    <p className="text-muted">Il carrello è vuoto</p>
                ) : (
                    <>
                        <ul className="list-group mb-3 flex-grow-1 overflow-auto">
                            {items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </ul>
                        <div className="mt-auto">
                            <h6 className="mb-3">Totale: €{total.toFixed(2)}</h6>

                            <button
                                className="btn btn-danger w-100 mb-2"
                                onClick={() => setShowClearConfirm(true)}
                            >
                                Svuota Carrello
                            </button>
                            <button
                                className="btn btn-success w-100"
                                onClick={handleCheckout}
                            >
                                Procedi al checkout
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Modal di conferma per svuotare carrello */}
            <div className={`modal fade ${showClearConfirm ? 'show' : ''}`}
                style={{ display: showClearConfirm ? 'block' : 'none' }}
                tabIndex="-1"
                aria-hidden={!showClearConfirm}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Conferma svuotamento</h5>
                            <button type="button" className="btn-close" onClick={cancelClearCart}></button>
                        </div>
                        <div className="modal-body">
                            Sei sicuro di voler svuotare completamente il carrello?
                            {items.length > 0 && (
                                <p className="text-muted mt-2">
                                    Verranno rimossi {items.length} prodotto{items.length !== 1 ? 'i' : ''}.
                                </p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={cancelClearCart}>
                                Annulla
                            </button>
                            <button type="button" className="btn btn-danger" onClick={confirmClearCart}>
                                Svuota Carrello
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop quando il modal è aperto */}
            {showClearConfirm && (
                <div className="modal-backdrop fade show" onClick={cancelClearCart}></div>
            )}
        </div>
    );
}