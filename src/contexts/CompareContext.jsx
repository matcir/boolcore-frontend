import { createContext, useState, useContext } from "react";

const CompareContext = createContext();

function CompareProvider({ children }) {
    const [compareItems, setCompareItems] = useState([]);

    const addToCompare = (product) => {
        // Controlla se il prodotto è già nella lista
        if (compareItems.find(item => item.id === product.id)) {
            return { success: false, message: "Prodotto già in confronto" };
        }

        // Limite massimo di 3 prodotti
        if (compareItems.length >= 3) {
            return { success: false, message: "Puoi confrontare massimo 3 prodotti" };
        }

        setCompareItems(prev => [...prev, product]);
        return { success: true, message: "Prodotto aggiunto al confronto" };
    };

    const removeFromCompare = (productId) => {
        setCompareItems(prev => prev.filter(item => item.id !== productId));
    };

    const clearCompare = () => {
        setCompareItems([]);
    };

    const isInCompare = (productId) => {
        return compareItems.some(item => item.id === productId);
    };

    return (
        <CompareContext.Provider value={{
            compareItems,
            addToCompare,
            removeFromCompare,
            clearCompare,
            isInCompare,
            compareCount: compareItems.length
        }}>
            {children}
        </CompareContext.Provider>
    );
}

function useCompare() {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error('useCompare must be used within a CompareProvider');
    }
    return context;
}

export { CompareProvider, useCompare };