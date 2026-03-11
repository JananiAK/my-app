"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ShieldCheck, Truck, RotateCcw, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "URBAN10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try URBAN10");
      setPromoApplied(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">

        {/* Header */}
        <div className="flex flex-col gap-2 mb-10 md:mb-14">
          <Link href="/shop" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 w-fit mb-2">
            <ArrowLeft className="w-3 h-3" /> Back to Shop
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">Shopping Bag</h1>
          <div className="w-12 h-0.5 bg-primary mt-1" />
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-0">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30, height: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="group flex flex-col sm:flex-row gap-6 md:gap-8 py-8 border-b border-border/40 last:border-0"
                  >
                    {/* Image */}
                    <Link href={`/product/${item.id}`} className="relative w-full sm:w-36 aspect-[3/4] overflow-hidden rounded-sm border border-border/30 bg-secondary/20 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <Link href={`/product/${item.id}`}>
                              <h3 className="font-serif text-xl font-medium text-foreground hover:text-primary transition-colors">{item.name}</h3>
                            </Link>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-[10px] uppercase tracking-widest text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-sm">
                                Size: {item.size}
                              </span>
                            </div>
                          </div>
                          <span className="font-serif text-xl font-bold text-foreground shrink-0">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-6">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-border/50 bg-secondary/20 rounded-sm overflow-hidden">
                          <button
                            className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary transition-colors disabled:opacity-40"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                          <button
                            className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary transition-colors"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Subtotal + Remove */}
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground font-mono">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-sm hover:bg-primary/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <aside className="lg:col-span-4 sticky top-32">
              <div className="bg-secondary/10 border border-border/60 rounded-sm overflow-hidden">
                <div className="p-6 border-b border-border/50">
                  <h2 className="font-serif text-2xl font-bold text-foreground">Order Summary</h2>
                </div>

                <div className="p-6 space-y-5">
                  {/* Promo Code */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1.5">
                      <Tag className="w-3 h-3" /> Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="e.g. URBAN10"
                        className="flex-1 bg-background border border-border/60 rounded-sm px-3 py-2 text-xs font-mono uppercase tracking-wide outline-none focus:border-primary transition-colors"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-wide rounded-sm hover:bg-primary/90 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && <p className="text-xs text-red-400">{promoError}</p>}
                    {promoApplied && (
                      <p className="text-xs text-green-400 font-bold">✓ 10% discount applied!</p>
                    )}
                  </div>

                  {/* Amounts */}
                  <div className="space-y-3 text-sm pt-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span className="uppercase tracking-wider text-xs font-medium">Subtotal</span>
                      <span className="text-foreground font-mono">{formatPrice(subtotal)}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-green-400">
                        <span className="uppercase tracking-wider text-xs font-medium">Discount (10%)</span>
                        <span className="font-mono">−{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-muted-foreground">
                      <span className="uppercase tracking-wider text-xs font-medium">Delivery</span>
                      <span className="text-primary text-xs font-bold">Free</span>
                    </div>
                    <div className="pt-4 border-t border-border/50 flex justify-between items-baseline">
                      <span className="text-foreground font-bold uppercase tracking-wider text-sm">Total</span>
                      <span className="text-foreground text-2xl font-bold font-serif">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button className="w-full h-13 bg-primary text-white hover:bg-primary/90 text-xs uppercase tracking-[0.2em] font-bold rounded-sm shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]" asChild>
                    <Link href="/checkout">Proceed to Checkout →</Link>
                  </Button>

                  <Link href="/shop" className="block text-center text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-medium">
                    ← Continue Shopping
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="px-6 pb-6 space-y-3 border-t border-border/30 pt-5">
                  {[
                    { icon: ShieldCheck, text: "Secure SSL Checkout" },
                    { icon: Truck, text: "Worldwide Express Delivery" },
                    { icon: RotateCcw, text: "30-Day Easy Returns" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                      <Icon className="w-3.5 h-3.5 text-primary shrink-0" /> {text}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>

        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 md:py-48 max-w-lg mx-auto space-y-8"
          >
            <div className="w-24 h-24 mx-auto opacity-10">
              <ShoppingBag className="w-full h-full" />
            </div>
            <div className="space-y-4">
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Your bag is empty</h2>
              <p className="text-muted-foreground font-light text-lg">
                Discover our curated collection and find your perfect fit.
              </p>
            </div>
            <Button className="h-13 px-12 bg-primary text-white hover:bg-primary/90 text-xs uppercase tracking-[0.2em] font-bold rounded-sm shadow-xl shadow-primary/20" asChild>
              <Link href="/shop">Explore Collection</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
