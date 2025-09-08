import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CarouselCard from "../components/CarouselCard"
import { useCart } from "../contexts/CartContext"

export default function SingleProduct() {
    const { id } = useParams()
    const url = `http://localhost:3000/api/products/${id}`
    const [singleProduct, setSingleProduct] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const { addToCart } = useCart()

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setSingleProduct([data])
            })
    }, [url])

    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            product_name: product.product_name,
            price: product.price,
            image: product.images?.[0]
        })

        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 3000)
    }

    return (
        <>
            <div className="container">
                {showAlert && (
                    <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        Prodotto aggiunto al carrello!
                        <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
                    </div>
                )}
                {singleProduct.map((product, index) => (
                    <CarouselCard key={index} product={product} />
                ))}

                <div className="d-flex justify-content-end mt-3 mb-4">
                    {singleProduct.map((product) => (
                        <button
                            key={product.id}
                            className="btn btn-dark"
                            onClick={() => handleAddToCart(product)}
                        >
                            <i className="bi bi-cart-plus me-2"></i>
                            Aggiungi al carrello
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}