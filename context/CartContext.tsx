"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { products } from "@/lib/data";

// Define Cart Item Type
export type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size: string;
};

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: any, size: string, quantity?: number) => void;
    removeFromCart: (id: string, size: string) => void; // Remove specific size variant
    updateQuantity: (id: string, size: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: any, size: string, quantity = 1) => {
        setCartItems((prev) => {
            const existingItem = prev.find(
                (item) => item.id === product.id && item.size === size
            );

            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id && item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [
                    ...prev,
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity,
                        size,
                    },
                ];
            }
        });
    };

    const removeFromCart = (id: string, size: string) => {
        setCartItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
    };

    const updateQuantity = (id: string, size: string, quantity: number) => {
        if (quantity < 1) return;
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id && item.size === size ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
