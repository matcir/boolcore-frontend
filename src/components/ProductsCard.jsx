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

      <div className={
        viewMode === "grid"
          ? "card h-100"
          : "card flex-row w-100 align-items-center"
      }>
        <Link
          to={`/products/${slugify(product.product_name, {
            lower: true,
            strict: true,
          })}`}
          className={viewMode === "grid" ? "" : "d-flex"}
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
          <p className="card-text">
            {product?.price ? `${parseFloat(product.price).toFixed(2)}€` : ""}
          </p>
          <p className="card-text">{product?.description}</p>
          <p className="card-text">{product?.category_name}</p>

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
  );
}