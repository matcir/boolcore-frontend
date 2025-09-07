import { useData } from "../contexts/DataContext"
import ProductsCard from "../components/ProductsCard";

export default function Products() {

    const { products } = useData();

    return (
        <>
            <div className="container p-3">
                <div className="row row-cols-1 row-cols-md-3 g-3">
                    {products?.map((product, index) => (
                        <ProductsCard key={product?.id ?? index} product={product} />
                    ))}
                </div>
            </div>
        </>
    )
}