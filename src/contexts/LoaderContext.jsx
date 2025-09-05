import { createContext, useState, useContext } from "react";

const LoaderContext = createContext();

const LoaderProvider = ({ children }) => {
    const [Loading, setLoading] = useState(false)
    return (
        <LoaderContext.Provider value={{ Loading, setLoading }}>
            {children}
        </LoaderContext.Provider>
    )
}

const useLoader = () => {
    return useContext(LoaderContext)
}

export { LoaderProvider, useLoader }