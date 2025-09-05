import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CarouselCard from "../components/CarouselCard"



export default function SingleProduct() {

    const { id } = useParams()
    const url = `http://localhost:3000/api/products/${id}`
    const [singleProduct, setSingleProduct] = useState([])

    


    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(url)
                console.log(data)
                setSingleProduct([data])
            })
    }, [url])

    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 m-4">
                    {
                        singleProduct.map((product) =>
                            <CarouselCard key={product.id} product={product} />
                        )
                    }
                </div>
            </div>



        </>
    )
}