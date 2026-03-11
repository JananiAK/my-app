"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag, Eye } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description?: string;
    sizes?: string[];
    colors?: string[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group relative flex flex-col h-full">

      {/* Product Image */}
      <Link
        href={`/product/${product.id}`}
        className="block relative aspect-[3/4] overflow-hidden bg-secondary/20 rounded-sm border border-border/30"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* "NEW" badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
            New
          </span>
        </div>

        {/* Wishlist heart */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWishlisted(w => !w); }}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 border",
            wishlisted
              ? "bg-primary border-primary text-white"
              : "bg-black/40 border-white/20 text-white hover:bg-primary hover:border-primary"
          )}
        >
          <Heart className={cn("w-4 h-4 transition-all", wishlisted && "fill-current")} />
        </button>

        {/* Hover controls */}
        <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">

          {/* Size selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[9px] uppercase tracking-widest text-white/70 font-bold">Select Size</p>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
                    className={cn(
                      "w-8 h-8 flex items-center justify-center text-[9px] font-bold border rounded-sm transition-all",
                      selectedSize === size
                        ? "bg-primary border-primary text-white"
                        : "bg-black/50 border-white/20 text-white hover:border-white"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Buttons row */}
          <div className="flex gap-2">
            <Button
              onClick={handleAddToCart}
              className={cn(
                "flex-1 h-10 rounded-sm text-[9px] uppercase tracking-[0.15em] font-bold transition-all",
                added
                  ? "bg-green-500 text-white"
                  : "bg-white text-black hover:bg-primary hover:text-white"
              )}
            >
              <ShoppingBag className="w-3 h-3 mr-1" />
              {added ? "Added ✓" : "Add to Bag"}
            </Button>
            <Link
              href={`/product/${product.id}`}
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 rounded-sm bg-black/50 border border-white/20 hover:bg-white hover:text-black flex items-center justify-center text-white transition-all duration-300"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Link>

      {/* Product Details */}
      <div className="pt-4 space-y-2 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <p className="text-[9px] tracking-[0.25em] uppercase text-primary font-bold font-mono">
              {product.category}
            </p>
            <Link
              href={`/product/${product.id}`}
              className="block font-serif text-base font-medium text-foreground hover:text-primary transition-colors leading-tight"
            >
              {product.name}
            </Link>
          </div>
          <p className="font-serif text-base font-semibold text-foreground/90 shrink-0">
            {formatPrice(product.price)}
          </p>
        </div>

        {/* Color options */}
        {product.colors && product.colors.length > 0 && (
          <div className="pt-1 flex items-center gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                title={color}
                className={cn(
                  "w-3.5 h-3.5 rounded-full border transition-all",
                  selectedColor === color
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                    : "hover:scale-110 border-border"
                )}
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}