import { Link } from "react-router-dom";
import slugify from "slugify";
import { useCompare } from "../contexts/CompareContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useState } from "react";

export default function ProductsCard({ product, viewMode = "grid" }) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const showAlertMessage = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleCompareToggle = (e) => {
    e.preventDefault();

    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
      showAlertMessage("Prodotto rimosso dal confronto", "warning");
    } else {
      const result = addToCompare(product);
      showAlertMessage(result.message, result.success ? "success" : "danger");
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();

    const wasInWishlist = isInWishlist(product.id);

    toggleWishlist({
      id: product.id,
      product_name: product.product_name,
      price: product.price,
      discount: product.discount,
      description: product.description,
      images: product.images,
      image: product.images?.[0]
    });

    if (wasInWishlist) {
      showAlertMessage("Prodotto rimosso dalla wishlist", "warning");
    } else {
      showAlertMessage("Prodotto aggiunto alla wishlist", "success");
    }
  };

  return (
    <div className="container">
      {showAlert && (
        <div className={`alert alert-${alertType} alert-dismissible fade show position-fixed`}
          style={{ top: '80px', right: '20px', zIndex: 9999 }}>
          <i className={`bi ${alertType === 'success' ? 'bi-check-circle-fill' : alertType === 'warning' ? 'bi-exclamation-triangle-fill' : 'bi-x-circle-fill'} me-2`}></i>
          {alertMessage}
          <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
        </div>
      )}

      {viewMode === 'grid' ? (
        // VISUALIZZAZIONE GRIGLIA - Card con altezza fissa
        <div className="card h-100 d-flex flex-column">
          <Link
            to={`/products/${slugify(product.product_name, {
              lower: true,
              strict: true,
            })}`}
            className="d-block"
          >
            <div className="card-img position-relative" style={{ height: '250px', overflow: 'hidden' }}>
              <img
                src={`http://localhost:3000/${product.images?.[0]}`}
                alt={product.product_name}
                className="w-100 h-100 px-2"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
              <div className="position-absolute top-0 end-0 m-2 d-flex flex-column gap-1">
                {isInCompare(product.id) && (
                  <span className="badge bg-primary">
                    <i className="bi bi-bar-chart-fill"></i>
                  </span>
                )}
                {isInWishlist(product.id) && (
                  <span className="badge bg-danger">
                    <i className="fas fa-heart"></i>
                  </span>
                )}
              </div>
            </div>
          </Link>

          <div className="card-body text-center d-flex flex-column flex-grow-1">
            <h4 className="card-title" style={{ minHeight: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {product?.product_name}
            </h4>

            {/* Contenitore per il prezzo con altezza fissa */}
            <div className="mb-3" style={{ minHeight: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {product?.discount > 0 ? (
                <>
                  <span className="badge text-bg-success mb-1">
                    -{parseFloat(product?.discount * 100).toFixed(0)}%
                  </span>
                  <p className="card-text text-decoration-line-through mb-1 small">
                    {product?.price ? `${parseFloat(product.price).toFixed(2)}€` : ""}
                  </p>
                  <p className="card-text text-danger fs-5 mb-0">
                    {product?.price ? `${parseFloat(product.price - (product.price * product.discount)).toFixed(2)}€` : ""}
                  </p>
                </>
              ) : (
                <p className="card-text fs-5 mb-0">
                  {product?.price ? `${parseFloat(product.price).toFixed(2)}€` : ""}
                </p>
              )}
            </div>

            {/* Descrizione con altezza limitata */}
            <p className="card-text flex-grow-1" style={{
              maxHeight: '4rem',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}>
              {product?.description}
            </p>

            {/* Pulsanti sempre in fondo */}
            <div className="d-flex gap-2 justify-content-center flex-wrap mt-auto">
              <button
                className={`btn btn-sm ${isInWishlist(product.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={handleWishlistToggle}
                title={isInWishlist(product.id) ? 'Rimuovi dalla wishlist' : 'Aggiungi alla wishlist'}
              >
                <i className={`fas fa-heart me-1`}></i>
                {isInWishlist(product.id) ? 'Rimuovi' : 'Wishlist'}
              </button>

              <button
                className={`btn btn-sm ${isInCompare(product.id) ? 'btn-warning' : 'btn-outline-primary'}`}
                onClick={handleCompareToggle}
              >
                <i className={`bi ${isInCompare(product.id) ? 'bi-dash-circle' : 'bi-bar-chart'} me-1`}></i>
                {isInCompare(product.id) ? 'Rimuovi confronto' : 'Confronta'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        // VISUALIZZAZIONE LISTA - Layout migliorato
        <div className="card mb-3">
          <h2 className="card-title py-3 text-center mb-0">{product?.product_name}</h2>
          <div className="row g-0 align-items-center">

            {/* IMMAGINE - Dimensioni fisse */}
            <div className="col-12 col-md-3">
              <Link
                to={`/products/${slugify(product.product_name, {
                  lower: true,
                  strict: true,
                })}`}
                className="d-block p-3"
              >
                <div className="position-relative" style={{ height: '200px' }}>
                  <img
                    src={`http://localhost:3000/${product.images?.[0]}`}
                    alt={product.product_name}
                    className="w-100 h-100"
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                  />
                  <div className="position-absolute top-0 end-0 m-2 d-flex flex-column gap-1">
                    {isInCompare(product.id) && (
                      <span className="badge bg-primary">
                        <i className="bi bi-bar-chart-fill"></i>
                      </span>
                    )}
                    {isInWishlist(product.id) && (
                      <span className="badge bg-danger">
                        <i className="fas fa-heart"></i>
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>

            {/* DESCRIZIONE, PREZZO E PULSANTI */}
            <div className="col-12 col-md-5 p-3">
              <div className="d-flex flex-column h-100 gap-3">

                {/* PREZZO */}
                <div className="text-center">
                  {product?.discount > 0 ? (
                    <div className="d-flex flex-row justify-content-center align-items-center gap-3">
                      <span className="badge text-bg-success">
                        -{parseFloat(product?.discount * 100).toFixed(0)}%
                      </span>
                      <span className="text-decoration-line-through text-muted">
                        {product?.price ? `${parseFloat(product.price).toFixed(2)}€` : ""}
                      </span>
                      <span className="text-danger fs-4 fw-bold">
                        {product?.price ? `${parseFloat(product.price - (product.price * product.discount)).toFixed(2)}€` : ""}
                      </span>
                    </div>
                  ) : (
                    <span className="fs-4 fw-bold">
                      {product?.price ? `${parseFloat(product.price).toFixed(2)}€` : ""}
                    </span>
                  )}
                </div>

                {/* SPEDIZIONE */}
                <p className="small text-center text-muted mb-0">
                  Spedizione Gratuita con un ordine di 100,00 €
                </p>

                {/* BOTTONI */}
                <div className="d-flex gap-2 justify-content-center flex-wrap">
                  <button
                    className={`btn btn-sm ${isInWishlist(product.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                    onClick={handleWishlistToggle}
                    title={isInWishlist(product.id) ? 'Rimuovi dalla wishlist' : 'Aggiungi alla wishlist'}
                  >
                    <i className={`fas fa-heart me-1`}></i>
                    {isInWishlist(product.id) ? 'Rimuovi' : 'Wishlist'}
                  </button>

                  <button
                    className={`btn btn-sm ${isInCompare(product.id) ? 'btn-warning' : 'btn-outline-primary'}`}
                    onClick={handleCompareToggle}
                  >
                    <i className={`bi ${isInCompare(product.id) ? 'bi-dash-circle' : 'bi-bar-chart'} me-1`}></i>
                    {isInCompare(product.id) ? 'Rimuovi confronto' : 'Confronta'}
                  </button>

                  <Link
                    to={`/products/${slugify(product.product_name, {
                      lower: true,
                      strict: true,
                    })}`}
                    className="btn btn-sm btn-warning"
                  >
                    Visualizza Prodotto
                  </Link>
                </div>
              </div>
            </div>

            {/* DETTAGLI */}
            <div className="col-12 col-md-4 p-3 border-start">
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <h6 className="text-muted mb-3">Dettagli prodotto:</h6>
                <ul className="list-unstyled">
                  {Object.entries(product.details || {}).map(([key, value]) => (
                    <li key={key} className="mb-1">
                      <strong className="text-capitalize">
                        {key.replaceAll('_', ' ')}:
                      </strong>{' '}
                      <span className="text-muted">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}