import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

// Recupera il carrello dal localStorage
const getInitialState = () => {
    if (typeof window !== "undefined") {
        const cartData = localStorage.getItem("cart");
        return cartData ? JSON.parse(cartData) : { items: [] };
    }
    return { items: [] };
};

const initialState = getInitialState();

function cartReducer(state, action) {
    let newState;

    switch (action.type) {
        case "ADD_TO_CART": {
            const existingIndex = state.items.findIndex(item => item.id === action.payload.id);

            if (existingIndex >= 0) {
                // Se l'item esiste, aumenta la quantità
                const updatedItems = [...state.items];
                updatedItems[existingIndex] = {
                    ...updatedItems[existingIndex],
                    quantity: updatedItems[existingIndex].quantity + 1
                };
                newState = { ...state, items: updatedItems };
            } else {
                // Se l'item non esiste, aggiungilo con quantità 1
                // Assicurati che tutti i campi necessari siano presenti
                const newItem = {
                    ...action.payload,
                    quantity: 1,
                    // Assicurati che original_price e discount esistano
                    original_price: action.payload.original_price || action.payload.price,
                    discount: action.payload.discount || 0
                };

                newState = {
                    ...state,
                    items: [...state.items, newItem]
                };
            }
            break;
        }

        case "REMOVE_FROM_CART": {
            newState = {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
            break;
        }

        case "INCREMENT_QUANTITY": {
            const updatedItems = state.items.map(item =>
                item.id === action.payload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            newState = { ...state, items: updatedItems };
            break;
        }

        case "DECREMENT_QUANTITY": {
            const updatedItems = state.items.map(item =>
                item.id === action.payload
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0);

            newState = { ...state, items: updatedItems };
            break;
        }

        case "CLEAR_CART": {
            newState = { items: [] };
            break;
        }

        default:
            newState = state;
    }

    // Salva nel localStorage dopo ogni modifica
    if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newState));
    }

    return newState;
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product) => {
        console.log('Adding to cart:', product); // Debug
        dispatch({ type: "ADD_TO_CART", payload: product });
    };

    const removeFromCart = (id) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: id });
    };

    const incrementQuantity = (id) => {
        dispatch({ type: "INCREMENT_QUANTITY", payload: id });
    };

    const decrementQuantity = (id) => {
        dispatch({ type: "DECREMENT_QUANTITY", payload: id });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    const total = state.items.reduce(
        (sum, item) => sum + (parseFloat(item.price) * item.quantity),
        0
    );

    const totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    // Calcola il totale risparmiato
    const totalSaved = state.items.reduce(
        (sum, item) => {
            if (item.discount && item.discount > 0) {
                const savings = (parseFloat(item.original_price) - parseFloat(item.price)) * item.quantity;
                return sum + savings;
            }
            return sum;
        },
        0
    );

    const value = {
        items: state.items,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        total,
        totalItems,
        totalSaved
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}