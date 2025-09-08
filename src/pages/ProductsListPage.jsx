import { useData } from "../contexts/DataContext"
import ProductsList from "../components/ProductsList";

export default function Products() {
    const { products } = useData();

    return (
        <>
            <div className="container p-3">
                <ProductsList products={products} />
            </div>
        </>
    )
}