"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { products } from "@/lib/data";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();

    return (
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
            <h1 className="font-serif text-3xl font-bold mb-8">Your Cart</h1>

            {cartItems.length > 0 ? (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-6">
                        {cartItems.map((item) => (
                            <div
                                key={`${item.id}-${item.size}`}
                                className="flex gap-4 md:gap-6 items-start border-b pb-6"
                            >
                                <div className="relative w-24 h-32 flex-shrink-0 rounded-md overflow-hidden bg-muted border">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <Link
                                        href={`/product/${item.id}`}
                                        className="font-medium hover:text-primary transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                    <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                                    <p className="font-semibold">{formatPrice(item.price)}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center border rounded-md">
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90" onClick={() => removeFromCart(item.id, item.size)}>
                                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Summary */}
                    <div className="w-full lg:w-96 rounded-lg border bg-card p-6 shadow-sm h-fit">
                        <h2 className="font-serif text-xl font-bold mb-4">Order Summary</h2>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="font-medium text-green-600">Free</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <Button className="w-full" size="lg" asChild>
                                <Link href="/checkout">Proceed to Checkout</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-16 space-y-4">
                    <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground" />
                    <p className="text-xl font-medium">Your cart is empty</p>
                    <Button asChild>
                        <Link href="/shop">Start Shopping</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
