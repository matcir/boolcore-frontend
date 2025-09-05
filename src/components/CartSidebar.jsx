import { useCart } from "../Context/CartContext";
import CartItem from "./CartItem";

export default function CartSidebar() {
    const { items, total, clearCart } = useCart();

    return (
        <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="cartSidebar"
            aria-labelledby="cartSidebarLabel"
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="cartSidebarLabel">🛒 Carrello</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
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
                            <h6 className="mb-3">Totale: € {total}</h6>
                            <button className="btn btn-danger w-100 mb-2" onClick={clearCart}>
                                Svuota Carrello
                            </button>
                            <button className="btn btn-success w-100">
                                Procedi al checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
