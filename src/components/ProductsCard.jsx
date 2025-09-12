import { Link } from "react-router-dom";
import slugify from "slugify";
import { useCompare } from "../contexts/CompareContext";
import { useState } from "react";

export default function ProductsCard({ product, viewMode = "grid" }) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const handleCompareToggle = (e) => {
    e.preventDefault();

    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
      setAlertMessage("Prodotto rimosso dal confronto");
      setAlertType("warning");
    } else {
      const result = addToCompare(product);
      setAlertMessage(result.message);
      setAlertType(result.success ? "success" : "danger");
    }

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
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
      {viewMode === 'grid' ? (// GRIGLIA 

        <div className="card h-100">
          <Link
            to={`/products/${slugify(product.product_name, {
              lower: true,
              strict: true,
            })}`}
            className="d-flex"
          >
            <div className="card-img position-relative">
              <img
                src={`http://localhost:3000/${product.images?.[0]}`}
                alt={product.product_name}
                className={
                  viewMode === "grid" ? "product-img-fixed px-2" : "img-list"
                }
              />
              {isInCompare(product.id) && (
                <div className="position-absolute top-0 end-0 m-2">
                  <span className="badge bg-primary">
                    <i className="bi bi-bar-chart-fill"></i>
                  </span>
                </div>
              )}
            </div>
          </Link>

          <div className="card-body text-center">
            <h4 className="card-title">{product?.product_name}</h4>
            <div className="">
              {product?.discount > 0 ?
                <>
                  <span className="badge text-bg-success">
                    -{parseFloat(product?.discount * 100).toFixed(0)}%
                  </span>
                  <p className="card-text text-decoration-line-through">
                    {product?.price ? `${parseFloat(product.price).toFixed(2)}€` : ""}
                  </p>
                  <p className="card-text text-danger fs-5">
                    {product?.price ? `${parseFloat(product.price - (product.price * product.discount)).toFixed(2)}€` : ""}
                  </p>
                </>
                :
                <p className="card-text">
                  {product?.price ? `${parseFloat(product.price).toFixed(2)}€` : ""}
                </p>
              }
            </div>
            <p className="card-text">{product?.description}</p>

            <div>

              <button
                className={`btn btn-sm ${isInCompare(product.id) ? 'btn-warning' : 'btn-outline-primary'} mt-2`}
                onClick={handleCompareToggle}
                disabled={false}
              >
                <i className={`bi ${isInCompare(product.id) ? 'bi-dash-circle' : 'bi-bar-chart'} me-1`}></i>
                {isInCompare(product.id) ? 'Rimuovi confronto' : 'Confronta'}
              </button>

            </div>
          </div>
        </div>


      ) : (//LISTA
        <div className="card">
          <h2 className="card-title py-3 text-center">{product?.product_name}</h2>
          <div className="row">
            {/* IMMAGINE */}
            <div className="col-12 col-md-3 d-flex pb-3">
              <Link
                to={`/products/${slugify(product.product_name, {
                  lower: true,
                  strict: true,
                })}`}
                className="flex-start"
              >
                <div className="card-img position-relative ps-5">
                  <img
                    src={`http://localhost:3000/${product.images?.[0]}`}
                    alt={product.product_name}
                    className={
                      viewMode === "grid" ? "product-img-fixed px-2" : "img-list img-fluid"
                    }
                  />
                  {isInCompare(product.id) && (
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-primary">
                        <i className="bi bi-bar-chart-fill"></i>
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </div>

            {/* DESCRIZIONE, PREZZO E PULSANTI */}
            <div className="col-12 col-md-5 d-flex align-items-center justify-content-center">
              <div className="d-flex flex-column align-items ps-2 gap-3">
                {/* PREZZO */}
                <div className="">
                  {product?.discount > 0 ? (
                    <>
                      <div className="d-flex flex-row justify-content-around align-items-center">
                        <div>
                          <span className="badge text-bg-success">
                            -{parseFloat(product?.discount * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div>
                          <p className="card-text text-decoration-line-through">
                            {product?.price ? `${parseFloat(product.price).toFixed(2)}€` : ""}
                          </p>
                        </div>
                        <p className="card-text text-danger fs-5">
                          {product?.price ? `${parseFloat(product.price - (product.price * product.discount)).toFixed(2)}€` : ""}
                        </p>
                      </div>
                    </>
                  ) : (
                    <p className="card-text">
                      {product?.price ? `${parseFloat(product.price).toFixed(2)}€` : ""}
                    </p>
                  )}
                </div>

                {/* SPEDIZIONE */}
                <p className="small x-2">Spedizione Gratuita con un ordine di 100,00 €</p>

                {/* BOTTONI */}
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    className={`btn btn-sm ${isInCompare(product.id) ? 'btn-warning' : 'btn-outline-primary'} mt-2`}
                    onClick={handleCompareToggle}
                    disabled={false}
                  >
                    <i className={`bi ${isInCompare(product.id) ? 'bi-dash-circle' : 'bi-bar-chart'} me-1`}></i>
                    {isInCompare(product.id) ? 'Rimuovi confronto' : 'Confronta'}
                  </button>
                  <Link
                    to={`/products/${slugify(product.product_name, {
                      lower: true,
                      strict: true,
                    })}`}
                    className="btn btn-sm btn-warning mt-2"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>

            {/* DETTAGLI */}
            <div className="col-12 col-md-4 d-flex justify-content-center">
              <ul className="list-unstyled d-flex flex-column justify-content-center">
                {Object.entries(product.details).map(([key, value]) => (
                  <li key={key}>
                    <strong className="px-1">{key.replaceAll('_', ' ').toUpperCase()}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}