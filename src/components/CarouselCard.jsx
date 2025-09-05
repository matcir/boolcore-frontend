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
        <div className="row w-100 mb-4">
            <div className="col-6 position-relative">
                <img
                    src={product.images[currentIndex]}
                    alt={product.name}
                    className="img-fluid rounded" />
                <button
                    className="btn btn-light position-absolute top-50 start-0 translate-middle-y"
                    onClick={handlePrev}>
                    ◀
                </button>
                <button
                    className="btn btn-light position-absolute top-50 end-0 translate-middle-y"
                    onClick={handleNext}>
                    ▶
                </button>
            </div>

            <div className="col-6">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.price}</p>
            </div>
        </div>
    )
}