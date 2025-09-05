import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



export default function SingleProduct() {

    const { id } = useParams()
    const url = `http://localhost:3030/products/${id}`
    const [singleProduct, setSingleProduct] = useState([])




    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setSingleProduct(data)
            })
    },[url])

    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-2">
                    {
                    singleProduct.map((product) => 
                        <>
                            <div className="col-6">
                                <img src={product.image} alt="" />
                            </div>
                            <div className="col-6">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                            </div>
                        </>
                        
                    )
                    }
                </div>
            </div>



        </>
    )
}