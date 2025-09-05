import { createContext, useState, useEffect, useContext } from "react";
import { useLoader } from "./LoaderContext";

const DataContext = createContext()

function DataProvider({ children }) {
    const productsUrl = "http://localhost:3000/api/products"
    const { setLoading } = useLoader()
    const [products, setProducts] = useState([])

    useEffect(() => {
        setLoading(true);
        fetch(productsUrl)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(err => {
                alert("Si è verificato un errore durante il caricamento dei dati")
                setLoading(false)
            })
    }, [productsUrl])

    return (
        <DataContext.Provider
            value={{
                products,
                setProducts,
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

function useData() {
    const context = useContext(DataContext)
    return context;
}

export { DataProvider, useData }