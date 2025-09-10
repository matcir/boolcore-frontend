import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "../contexts/CartContext";
import CompareIndicator from "../components/CompareIndicator";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { totalItems } = useCart();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                <button className="navbar-toggler" type="button" onClick={toggleMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/products">Tutti i prodotti</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                onClick={toggleDropdown}
                            >
                                Categorie
                            </a>
                            <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                                <li><Link className="dropdown-item" to="/categories/pc-fissi">PC Fissi</Link></li>
                                <li><Link className="dropdown-item" to="/categories/portatili">Portatili</Link></li>
                                <li><Link className="dropdown-item" to="/categories/accessori">Accessori</Link></li>
                            </ul>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center">
                        <CompareIndicator />
                        <button
                            className="btn btn-outline-light position-relative ms-2"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#cartSidebar"
                            aria-controls="cartSidebar"
                        >
                            <i className="fas fa-shopping-cart"></i>
                            <span className="ms-2">Carrello</span>
                            {totalItems > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
