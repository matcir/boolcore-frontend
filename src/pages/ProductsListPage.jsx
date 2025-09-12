import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductsList from "../components/ProductsList";

export default function ProductsListPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Inizializza gli stati dai parametri URL
    const [search, setSearch] = useState(searchParams.get('search') || "");
    const [query, setQuery] = useState(searchParams.get('search') || "");
    const [priceFilter, setPriceFilter] = useState(searchParams.get('price') || "");
    const [showPromo, setShowPromo] = useState(searchParams.get('promo') === "true");
    const [showRecent, setShowRecent] = useState(searchParams.get('recent') === "true");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (priceFilter) params.append("price", priceFilter);
        if (showPromo) params.append("promo", "true");
        if (showRecent) params.append("recent", "true");

        // Aggiorna l'URL
        navigate(`?${params.toString()}`, { replace: true });

        fetch(`http://localhost:3000/api/products?${params.toString()}`)
            .then(res => {
                if (!res.ok) throw new Error("Errore nel caricamento dei prodotti");
                return res.json();
            })
            .then(data => setProducts(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [search, priceFilter, showPromo, showRecent, navigate]);

    return (
        <div className="container">
            <div className="row py-4 align-items-center">
                <div className="col-md-4 mb-2 d-flex">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Cerca prodotto..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                setSearch(query);
                            }
                        }}

                    />
                    <button button onClick={() => setSearch(query)} className="btn btn-light mx-1">
                        Cerca
                    </button>
                </div>
                <div className="col-md-2 mb-2">
                    <select
                        className="form-select"
                        value={priceFilter}
                        onChange={e => setPriceFilter(e.target.value)}
                    >
                        <option value="">Ordina per prezzo</option>
                        <option value="asc">Prezzo crescente</option>
                        <option value="desc">Prezzo decrescente</option>
                    </select>
                </div>
                <div className="col-md-2 mb-2">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="promoCheck"
                            checked={showPromo}
                            onChange={() => setShowPromo(p => !p)}
                        />
                        <label className="form-check-label text-light" htmlFor="promoCheck">
                            In promozione
                        </label>
                    </div>
                </div>
                <div className="col-md-2 mb-2">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="recentCheck"
                            checked={showRecent}
                            onChange={() => setShowRecent(r => !r)}
                        />
                        <label className="form-check-label text-light" htmlFor="recentCheck">
                            Più recenti
                        </label>
                    </div>
                </div>
            </div>
            {
                loading && (
                    <div className="d-flex justify-content-center my-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Caricamento...</span>
                        </div>
                    </div>
                )
            }
            {
                error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )
            }
            {!loading && !error && <ProductsList products={products} />}
        </div >
    );
}