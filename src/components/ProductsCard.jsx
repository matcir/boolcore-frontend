import { Link } from "react-router-dom";

export default function ProductsCard({ product, viewMode = 'grid' }) {
    return (
        <div className={viewMode === 'grid' ? 'product-card-grid' : 'product-card-list'}>
            <div className={`card h-100 ${viewMode === 'list' ? 'card-list' : ''}`}>
                <div className={viewMode === 'list' ? 'd-flex' : ''}>
                    <Link
                        to={`/products/${product?.id}`}
                        className={viewMode === 'list' ? 'flex-shrink-0' : ''}
                    >
                        <figure className={`ratio ${viewMode === 'list' ? 'ratio-1x1 list-image' : 'ratio-16x9'}`}>
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
                        <p className="card-text">{product?.description}</p>
                        <p className="card-text">{product?.category_name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}