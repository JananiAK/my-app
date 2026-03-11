"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();

    return (
        <div className="min-h-screen bg-background border-t border-border/50">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
                <div className="flex flex-col gap-1 md:gap-2 mb-10 md:mb-16">
                    <Link href="/shop" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 w-fit mb-4">
                        <ArrowLeft className="w-3 h-3" /> Back to Shop
                    </Link>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">Shopping Bag</h1>
                    <div className="w-16 h-1 bg-primary mt-2" />
                </div>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8 space-y-8 md:space-y-12">
                            <AnimatePresence>
                                {cartItems.map((item, index) => (
                                    <motion.div
                                        key={`${item.id}-${item.size}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative flex flex-col sm:flex-row gap-6 md:gap-10 pb-10 border-b border-border/40 last:border-0"
                                    >
                                        <div className="relative aspect-[3/4] w-full sm:w-48 overflow-hidden bg-secondary/50 rounded-sm border border-border/30">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between py-2">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-serif text-2xl font-medium text-foreground tracking-tight group-hover:text-primary transition-colors">
                                                            {item.name}
                                                        </h3>
                                                        <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Size: {item.size}</p>
                                                    </div>
                                                    <span className="font-serif text-xl font-semibold text-foreground">
                                                        {formatPrice(item.price)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-end justify-between mt-8">
                                                <div className="flex items-center space-x-4 border border-border/50 bg-secondary/20 p-1 rounded-sm">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-9 w-9 text-muted-foreground hover:text-foreground"
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-9 w-9 text-muted-foreground hover:text-foreground"
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.id, item.size)}
                                                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-medium border-b border-transparent hover:border-primary pb-1"
                                                >
                                                    <Trash2 className="h-4 w-4" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary Sidebar */}
                        <aside className="lg:col-span-4 sticky top-32">
                            <div className="bg-secondary/10 border border-border/50 p-8 md:p-10 rounded-sm">
                                <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Summary</h2>

                                <div className="space-y-6 text-sm uppercase tracking-widest font-medium">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span className="text-foreground">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Delivery</span>
                                        <span className="text-primary">Complimentary</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Premium Packaging</span>
                                        <span className="text-primary">Included</span>
                                    </div>

                                    <div className="pt-8 border-t border-border/50 flex justify-between items-baseline">
                                        <span className="text-foreground text-lg font-bold">Total</span>
                                        <span className="text-foreground text-2xl font-bold font-serif">{formatPrice(subtotal)}</span>
                                    </div>
                                </div>

                                <Button className="w-full mt-10 h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-sm uppercase tracking-[0.2em] font-bold rounded-sm shadow-xl shadow-primary/20 group" asChild>
                                    <Link href="/checkout">
                                        Checkout Now
                                    </Link>
                                </Button>

                                <div className="mt-10 space-y-4 pt-8 border-t border-border/30">
                                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                                        <ShieldCheck className="w-4 h-4 text-primary" /> Secure SSL Checkout
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                                        <Truck className="w-4 h-4 text-primary" /> Worldwide Express Delivery
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                                        <RotateCcw className="w-4 h-4 text-primary" /> 30-Day Bespoke Returns
                                    </div>
                                </div>
                            </div>

                            <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground mt-8">
                                VAT and duties calculated at final checkout
                            </p>
                        </aside>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32 md:py-48 max-w-lg mx-auto space-y-8"
                    >
                        <div className="relative w-24 h-24 mx-auto mb-4 opacity-20">
                            <ShoppingBag className="w-full h-full text-foreground" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Your bag is empty</h2>
                            <p className="text-muted-foreground font-light text-lg tracking-wide">
                                Curate your collection from our seasonal essentials and bespoke tailoring.
                            </p>
                        </div>
                        <Button className="h-14 px-12 bg-foreground text-background hover:bg-primary hover:text-primary-foreground text-xs uppercase tracking-[0.2em] font-bold rounded-sm transition-all" asChild>
                            <Link href="/shop">Explore Collection</Link>
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
