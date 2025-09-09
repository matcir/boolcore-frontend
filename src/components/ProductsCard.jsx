import { Link } from "react-router-dom";
import slugify from "slugify";

export default function ProductsCard({ product, viewMode = "grid" }) {
  return (
    <div
      className={
        viewMode === "grid"
          ? "card h-100"
          : "card flex-row w-100 align-items-center"
      }
    >
      <Link
        to={`/products/${slugify(product.product_name, {
          lower: true,
          strict: true,
        })}`}
        className={viewMode === "grid" ? "" : "d-flex"}
      >
        <div className="card-img">
          <img
            src={`http://localhost:3000/${product.images?.[0]}`}
            alt={product.product_name}
            className={
              viewMode === "grid" ? "product-img-fixed px-2" : "img-list"
            }
          />
        </div>
      </Link>

      <div className="card-body text-center">
        <h4 className="card-title">{product?.product_name}</h4>
        <p className="card-text">
          {product?.price ? `${parseFloat(product.price).toFixed(2)}€` : ""}
        </p>
        <p className="card-text">{product?.description}</p>
        <p className="card-text">{product?.category_name}</p>
      </div>
    </div>
  );
}
