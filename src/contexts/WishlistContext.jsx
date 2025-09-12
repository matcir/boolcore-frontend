import { createContext, useContext, useReducer } from "react";

const WishlistContext = createContext();

// Recupera la wishlist dal localStorage
const getInitialState = () => {
    if (typeof window !== "undefined") {
        const wishlistData = localStorage.getItem("wishlist");
        return wishlistData ? JSON.parse(wishlistData) : { items: [] };
    }
    return { items: [] };
};

const initialState = getInitialState();

function wishlistReducer(state, action) {
    let newState;

    switch (action.type) {
        case "ADD_TO_WISHLIST": {
            const exists = state.items.some(item => item.id === action.payload.id);

            if (!exists) {
                newState = {
                    ...state,
                    items: [...state.items, action.payload]
                };
            } else {
                newState = state; // Non aggiungere se già presente
            }
            break;
        }

        case "REMOVE_FROM_WISHLIST": {
            newState = {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
            break;
        }

        case "CLEAR_WISHLIST": {
            newState = { items: [] };
            break;
        }

        case "TOGGLE_WISHLIST": {
            const exists = state.items.some(item => item.id === action.payload.id);

            if (exists) {
                newState = {
                    ...state,
                    items: state.items.filter(item => item.id !== action.payload.id)
                };
            } else {
                newState = {
                    ...state,
                    items: [...state.items, action.payload]
                };
            }
            break;
        }

        default:
            newState = state;
    }

    // Salva nel localStorage dopo ogni modifica
    if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(newState));
    }

    return newState;
}

export function WishlistProvider({ children }) {
    const [state, dispatch] = useReducer(wishlistReducer, initialState);

    const addToWishlist = (product) => {
        dispatch({ type: "ADD_TO_WISHLIST", payload: product });
    };

    const removeFromWishlist = (id) => {
        dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
    };

    const toggleWishlist = (product) => {
        dispatch({ type: "TOGGLE_WISHLIST", payload: product });
    };

    const clearWishlist = () => {
        dispatch({ type: "CLEAR_WISHLIST" });
    };

    const isInWishlist = (productId) => {
        return state.items.some(item => item.id === productId);
    };

    const wishlistCount = state.items.length;

    const value = {
        items: state.items,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        isInWishlist,
        wishlistCount
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}