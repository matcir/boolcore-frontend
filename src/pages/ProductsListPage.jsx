import { useData } from "../contexts/DataContext"
import ProductsList from "../components/ProductsList";

export default function Products() {
    const { products } = useData();

    return (
        <>
            <div className="container">


                <div >
                    <ProductsList products={products} />
                </div>

            </div>
        </>
    )
}