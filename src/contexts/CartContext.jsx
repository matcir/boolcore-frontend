import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

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
            const existing = state.items.find(i => i.id === action.payload.id);
            if (existing) {
                newState = {
                    ...state,
                    items: state.items.map(i =>
                        i.id === action.payload.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    )
                };
            } else {
                newState = {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }]
                };
            }
            break;
        }
        case "REMOVE_FROM_CART":
            newState = {
                ...state,
                items: state.items.filter(i => i.id !== action.payload)
            };
            break;
        case "CLEAR_CART":
            newState = { items: [] };
            break;
        default:
            newState = state;
    }
    if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newState));
    }

    return newState;
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product) =>
        dispatch({ type: "ADD_TO_CART", payload: product });
    const removeFromCart = (id) =>
        dispatch({ type: "REMOVE_FROM_CART", payload: id });
    const clearCart = () => dispatch({ type: "CLEAR_CART" });

    const total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ ...state, addToCart, removeFromCart, clearCart, total, totalItems }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}