import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
    items: []
};

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existing = state.items.find(i => i.id === action.payload.id);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map(i =>
                        i.id === action.payload.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    )
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }]
            };
        }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                items: state.items.filter(i => i.id !== action.payload)
            };
        case "CLEAR_CART":
            return initialState;
        default:
            return state;
    }
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
