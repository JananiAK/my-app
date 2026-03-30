"use client";

import Image from "next/image";
import { useState, use } from "react";
import { products } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import Link from "next/link";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white font-mono">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }
    addToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-6 py-16 min-h-screen">
      <Link href="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        {/* IMAGE */}
        <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-white/5 bg-zinc-900 shadow-[0_0_30px_rgba(220,38,38,0.05)]">
          <Image src={product.image} alt={product.name} fill className="object-cover" priority />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-center space-y-10">
          <div className="space-y-4">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white">{product.name}</h1>
            <p className="text-xl text-red-500 font-mono tracking-wider">LKR {product.price.toLocaleString()}</p>
          </div>

          <p className="text-gray-400 leading-relaxed font-light text-lg">
            {product.description}
          </p>

          {/* SIZES */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs text-white uppercase tracking-widest font-mono">Select Size</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 border rounded-sm flex items-center justify-center font-mono text-sm transition-all ${
                    selectedSize === size 
                      ? "bg-red-600 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]" 
                      : "bg-transparent border-white/20 text-gray-300 hover:border-red-600/50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="space-y-4">
            <p className="text-xs text-white uppercase tracking-widest font-mono">Quantity</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-white/20 rounded-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-12 h-12 flex items-center justify-center text-white font-mono">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            size="lg"
            className={`w-full h-16 rounded-sm uppercase tracking-[0.2em] font-bold text-sm transition-all ${
              added 
                ? "bg-green-600 hover:bg-green-700 text-white shadow-[0_0_20px_rgba(22,163,74,0.4)]" 
                : "bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
            }`}
          >
            {added ? "Added To Cart" : "ADD TO CART"}
          </Button>
          
        </div>
      </div>
    </div>
  );
}
