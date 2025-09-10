import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CarouselCard from "../components/CarouselCard"
import { useCart } from "../contexts/CartContext"

export default function SingleProduct() {
    const { slug } = useParams()
    const url = `http://localhost:3000/api/products/${slug}`
    const [singleProduct, setSingleProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const { addToCart } = useCart()

    useEffect(() => {

        const fetchProduct = async () => {
            try {
                setLoading(true)
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error('Prodotto non trovato')
                }
                const data = await response.json()
                setSingleProduct(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [url])

    const discount_price = (price, discount) => {

        let p
        if (discount > 0) {
            p = price - (price * discount)
            return p.toFixed(2)
        }
        return price.toFixed(2)
    }

    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            product_name: product.product_name,
            price: discount_price(product.price, product.discount),
            image: product.images?.[0]
        })

        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 3000)
    }

    if (loading) {
        return (
            <div className="container">
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Caricamento...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container">
                <div className="alert alert-danger mt-3" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Errore: {error}
                </div>
            </div>
        )
    }

    if (!singleProduct) {
        return (
            <div className="container">
                <div className="alert alert-warning mt-3" role="alert">
                    Prodotto non trovato
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="container pb-5">
                {showAlert && (
                    <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        Prodotto aggiunto al carrello!
                        <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
                    </div>
                )}
                <CarouselCard product={singleProduct} />
                <div className="d-flex justify-content-end mt-3 mb-4">
                    <button
                        className="btn btn-dark"
                        onClick={() => handleAddToCart(singleProduct)}
                    >
                        <i className="bi bi-cart-plus me-2"></i>
                        Aggiungi al carrello
                    </button>
                </div>
                <div className=" text-center mt-4 bg-light p-4 rounded">
                    <h2>Dettagli del prodotto</h2>
                    {singleProduct.details ? (
                        <ul className="list-unstyled">
                            {Object.entries(singleProduct.details).map(([key, value]) => (
                                <li key={key}><strong className="px-1">{key.replaceAll('_', ' ').toUpperCase()}:</strong> {value}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nessun dettaglio disponibile.</p>
                    )}
                </div>
            </div>
        </>
    )
}