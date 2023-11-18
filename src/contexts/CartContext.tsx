import { ReactNode, createContext, useState } from "react";

export interface IProduct {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    numberPrice: number;
    description: string;
    defaultPriceId: string;
}

interface CartContextData {
    cartItems: IProduct[];
    addToCart: (newProduct: IProduct) => void;
    removeCartItem: (productId: string) => void;
    cartTotalPrice: number;
    checkIfProductExistsInCart: (productId: string) => boolean;
}

interface CartContextProviderProps {
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export function CartContextProvider({ children }: CartContextProviderProps) {
    const [cartItems, setCartItems] = useState<IProduct[]>([]);

    const cartTotalPrice = cartItems.reduce((total, cartItem) => {
        return total + cartItem.numberPrice;
    }, 0);

    function addToCart(newProduct: IProduct) {
        setCartItems(state => [...state, newProduct]);
    }

    function removeCartItem(productId: string) {
        setCartItems(state => state.filter(product => product.id !== productId));
    }
    function checkIfProductExistsInCart(productId: string) {
        return cartItems.some(product => product.id === productId);
    }


    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeCartItem,
                cartTotalPrice,
                checkIfProductExistsInCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}