import { useState } from "react"

export default function CarouselCard({ product }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % product.images.length)
    }

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        )
    }

    return (
        <section className="bg-carousel">


            <div className="container">
                <div className="row w-100 mb-4">
                    <div className="col-6 position-relative">
                        <img
                            src={`http://localhost:3000/${product.images[currentIndex]}`}
                            alt={product.name}
                            className="img-car rounded m-3" />
                        <button
                            className="btn position-absolute top-50 start-0 translate-middle-y"
                            onClick={handlePrev}>
                            ◀
                        </button>
                        <button
                            className="btn position-absolute top-50 end-0 translate-middle-y"
                            onClick={handleNext}>
                            ▶
                        </button>


                        <div className="d-flex justify-content-center gap-2">
                            {product.images.map((img, index) => {
                                return (
                                    <img
                                        key={index}
                                        src={`http://localhost:3000/${img}`}
                                        alt={`thumb-${index}`}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`img-thumbnail thumb ${index === currentIndex ? "border border-primary" : ""
                                            }`}
                                    />
                                )
                            })

                            }
                        </div>
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                        <div className="text-light text-center">
                            <h1>{product.product_name}</h1>
                            <p>{product.description}</p>
                            <div className="">
                                {product?.discount > 0 ?
                                    <>
                                        <span className="badge text-bg-success">
                                            -{parseFloat(product?.discount * 100).toFixed(0)}%
                                        </span>
                                        <p className="card-text text-decoration-line-through">
                                            {product?.price ? `${parseFloat(product.price).toFixed(2)}€` : ""}
                                        </p>
                                        <p className="card-text text-danger fs-5">
                                            {product?.price ? `${parseFloat(product.price - (product.price * product.discount)).toFixed(2)}€` : ""}
                                        </p>
                                    </>
                                    :
                                    <p className="card-text">
                                        {product?.price ? `${parseFloat(product.price).toFixed(2)}€` : ""}
                                    </p>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}