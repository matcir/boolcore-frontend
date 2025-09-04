import React, { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center" href="#home">
                    <img
                        src="/logo.png"
                        alt="BoolCore Logo"
                        width="80"
                        height="60"
                        className="d-inline-block align-top"
                    />
                </a>
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
                            <a className="nav-link active" aria-current="page" href="#home">
                                Home
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                onClick={toggleDropdown}
                                aria-expanded={isDropdownOpen}
                            >
                                Categorie
                            </a>
                            <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                                <li><a className="dropdown-item" href="#prodotto1">PC Fissi</a></li>
                                <li><a className="dropdown-item" href="#prodotto2">Portatili</a></li>
                                <li><a className="dropdown-item" href="#prodotto3">Accessori</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <a href="#carrello" className="btn btn-outline-light position-relative">
                            <i className="fas fa-shopping-cart"></i>
                            <span className="ms-2">Carrello</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}