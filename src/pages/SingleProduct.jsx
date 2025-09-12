import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CarouselCard from "../components/CarouselCard"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"
import { useData } from "../contexts/DataContext"
import ProductsCard from "../components/ProductsCard"
import RelatedProductCard from "../components/RelatedProductsCard"

export default function SingleProduct() {
    const { slug } = useParams()
    const url = `http://localhost:3000/api/products/${slug}`
    const [singleProduct, setSingleProduct] = useState(null)
    const [error, setError] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertType, setAlertType] = useState("success")

    const { addToCart } = useCart()
    const { toggleWishlist, isInWishlist } = useWishlist()
    const { products } = useData()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(url)
                if (!response.ok) throw new Error("Prodotto non trovato")
                const data = await response.json()
                setSingleProduct(data)
            } catch (err) {
                setError(err.message)
            }
        }

        fetchProduct()
    }, [url])

    const showAlertMessage = (message, type = "success") => {
        setAlertMessage(message)
        setAlertType(type)
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 3000)
    }

    const discount_price = (price, discount) => {
        const discountValue = discount && !isNaN(discount) ? parseFloat(discount) : 0

        if (discountValue > 0) {
            const discountedPrice = price - (price * discountValue)
            return discountedPrice.toFixed(2)
        }
        return price.toFixed(2)
    }

    const handleAddToCart = (product) => {
        const originalPrice = parseFloat(product.price)
        const discountValue = product.discount && !isNaN(product.discount) ? parseFloat(product.discount) : 0
        const finalPrice = parseFloat(discount_price(originalPrice, discountValue))

        addToCart({
            id: product.id,
            product_name: product.product_name,
            image: product.images?.[0],
            price: finalPrice,
            original_price: originalPrice,
            discount: discountValue,
        })

        showAlertMessage("Prodotto aggiunto al carrello!")
    }

    const handleWishlistToggle = () => {
        if (!singleProduct) return

        const wasInWishlist = isInWishlist(singleProduct.id)

        toggleWishlist({
            id: singleProduct.id,
            product_name: singleProduct.product_name,
            price: singleProduct.price,
            discount: singleProduct.discount,
            description: singleProduct.description,
            images: singleProduct.images,
            image: singleProduct.images?.[0]
        })

        if (wasInWishlist) {
            showAlertMessage("Prodotto rimosso dalla wishlist", "warning")
        } else {
            showAlertMessage("Prodotto aggiunto alla wishlist", "success")
        }
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

    // ---- LOGICA PRODOTTI CORRELATI ----
    let relatedProducts = []
    if (products.length > 0 && singleProduct && singleProduct.category) {
        const category = singleProduct.category.toLowerCase().trim()

        if (category === "accessori") {
            const firstWord = singleProduct.product_name
                .split(" ")[0]
                .toLowerCase()
            relatedProducts = products.filter(
                (p) =>
                    p.id !== singleProduct.id &&
                    p.product_name &&
                    p.product_name.split(" ")[0].toLowerCase() === firstWord
            )
        } else {
            relatedProducts = products.filter(
                (p) =>
                    p.id !== singleProduct.id &&
                    p.category_name &&
                    p.category_name.toLowerCase().trim() === category
            )
        }
    }

    return (
        <>
            <div className="container pb-5">
                {showAlert && (
                    <div
                        className={`alert alert-${alertType} alert-dismissible fade show position-fixed`}
                        role="alert"
                        style={{
                            top: '80px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1050,
                            minWidth: '300px',
                            maxWidth: '500px'
                        }}
                    >
                        <i className={`fas ${alertType === 'success' ? 'fa-check-circle' : alertType === 'warning' ? 'fa-exclamation-triangle' : 'fa-times-circle'} me-2`}></i>
                        {alertMessage}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowAlert(false)}
                        ></button>
                    </div>
                )}

                {/* prodotto principale */}
                <div className="card mt-4">
                    <div className="card-body">
                        <CarouselCard product={singleProduct} />
                        <div className="d-flex justify-content-end gap-2 mt-3 mb-4 flex-wrap">
                            <button
                                className={`btn ${isInWishlist(singleProduct.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                                onClick={handleWishlistToggle}
                            >
                                <i className="fas fa-heart me-2"></i>
                                {isInWishlist(singleProduct.id) ? 'Rimuovi dalla wishlist' : 'Aggiungi alla wishlist'}
                            </button>
                            <button
                                className="btn btn-dark"
                                onClick={() => handleAddToCart(singleProduct)}
                            >
                                <i className="bi bi-cart-plus me-2"></i>
                                Aggiungi al carrello
                            </button>
                        </div>
                    </div>
                </div>

                {/* prodotti correlati */}
                {relatedProducts.length > 0 && (
                    <div className="mt-5">
                        <h4>Prodotti correlati</h4>
                        <div className="row">
                            {relatedProducts.map((product) => (
                                <RelatedProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    </div>
                )}
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