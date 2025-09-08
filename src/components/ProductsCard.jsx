import { Link } from "react-router-dom";

export default function ProductsCard({ product }) {


    return (
        <div className="col">
            <div className="card h-100">
                <Link to={`/products/${product?.id}`}>
                    <figure className="ratio ratio-16x9">
                        <img
                            src={`http://localhost:3000/${product.images?.[0]}`}
                            alt={product.product_name}
                            className="w-100 h-100 object-fit-cover"
                        />
                    </figure>
                </Link>
                <div className="my-card-body card-body">
                    <h4 className="card-title">{product?.product_name}</h4>
                    <p className="card-text">
                        {product?.price ? `${Number(product.price).toFixed(2)}€` : ""}
                    </p>
                    {/* <p className="card-text">
                        {product?.discount ? `Risparmi: ${Number(product.discount).toFixed(2)}€` : ""}
                    </p> */}
                    <p className="card-text">{product?.description}</p>
                    <p className="card-text">{product?.category_name}</p>
                </div>
            </div>
        </div>
    );
}