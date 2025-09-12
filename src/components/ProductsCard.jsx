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
          <i className={`fas ${alertType === 'success' ? 'fa-check-circle' : alertType === 'warning' ? 'fa-exclamation-triangle' : 'fa-times-circle'} me-2`}></i>
          {alertMessage}
          <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
        </div>
      )}

      <div className={
        viewMode === "grid"
          ? "card h-100"
          : "card flex-row w-50 align-items-center mx-auto"
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
          </div>
        </div>
      </div>
    </div>
  );
}