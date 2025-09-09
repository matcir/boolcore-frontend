import { useParams } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import ProductsList from "../components/ProductsList";
import slugify from "slugify";

function CategoryPage() {
    const { slug } = useParams();
    const { products } = useData();

    const filteredProducts = products.filter(
        (p) =>
            slugify(p.category_name, { lower: true, strict: true }) === slug
    );

    const categoryName = filteredProducts[0]?.category_name || slug;

    return (
        <>

            <div className="container">
                <div className="p-3">
                    <ProductsList products={filteredProducts} />
                </div>
            </div>


        </>
    );
}

export default CategoryPage;