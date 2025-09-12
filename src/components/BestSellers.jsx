import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import slugify from "slugify";

export default function BestSellers() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/products")
            .then(res => res.json())
            .then(data => {

                const best_sellers = data.sort(
                    (a, b) => b.total_sold - a.total_sold
                );


                setProduct(best_sellers.slice(0, 3));
            })
            .catch(err => console.error(err));
    }, []);

    return (

        <div className="row">
            {product.map((product) => (
                <div key={product.id} className="col-md-4">
                    <div className="card-jumbo rounded-4">
                        <Link to={`/products/${slugify(product.product_name, {
                            lower: true,
                            strict: true,
                        })}`} className="text-decoration-none text-reset" >
                            <img
                                src={`http://localhost:3000/${product.images?.[0]}`}
                                alt={product.name}
                                className="card-img-top"
                            />
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <h3 className="acid-text">{product.product_name}</h3>
                                <p className="gray-text">{product.description}</p>
                                <span className="gray-text ">{product.price} €</span>
                                <span className="btn btn-success m-2">Visualizza dettagli</span>
                            </div>

                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}


