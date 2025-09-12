import { Link } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";

export default function WishlistIndicator() {
    const { wishlistCount } = useWishlist();

    return (
        <Link
            to="/wishlist"
            className="btn btn-outline-light position-relative me-2"
            title="Vai alla wishlist"
        >
            <i className="fas fa-heart"></i>
            {wishlistCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                    {wishlistCount}
                </span>
            )}
        </Link>
    );
}