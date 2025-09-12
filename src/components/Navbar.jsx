import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import CompareIndicator from "../components/CompareIndicator";
import WishlistIndicator from "../components/WishlistIndicatos";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { totalItems } = useCart();
    const { wishlistCount } = useWishlist();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img
                        src="/logo.png"
                        alt="BoolCore Logo"
                        width="80"
                        height="60"
                        className="d-inline-block align-top"
                    />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleMenu}
                    aria-controls="navbarNav"
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                <i className="fas fa-boxes me-1"></i>
                                Tutti i prodotti
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                onClick={toggleDropdown}
                                aria-expanded={isDropdownOpen}
                            >
                                <i className="fas fa-list me-1"></i>
                                Categorie
                            </a>
                            <ul className={`dropdown-menu dropdown-menu-dark ${isDropdownOpen ? 'show' : ''}`}>
                                <li>
                                    <Link className="dropdown-item" to="/categories/pc-fissi">
                                        <i className="fas fa-desktop me-2"></i>
                                        PC Fissi
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/categories/portatili">
                                        <i className="fas fa-laptop me-2"></i>
                                        Portatili
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/categories/accessori">
                                        <i className="fas fa-keyboard me-2"></i>
                                        Accessori
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-2">
                        <CompareIndicator />
                        <WishlistIndicator />
                        <button
                            className="btn btn-outline-light position-relative"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#cartSidebar"
                            aria-controls="cartSidebar"
                        >
                            <i className="fas fa-shopping-cart"></i>
                            <span className="d-none d-sm-inline ms-2">Carrello</span>
                            {totalItems > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {totalItems}
                                    <span className="visually-hidden">prodotti nel carrello</span>
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}