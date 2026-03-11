"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

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

  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0] || "M"
  );

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || ""
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, selectedSize, 1);
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
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover controls */}
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">

          {/* Size selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">

              <p className="text-[10px] uppercase tracking-widest text-white/70 font-bold">
                Select Size
              </p>

              <div className="flex flex-wrap gap-2">

                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSize(size);
                    }}
                    className={cn(
                      "w-8 h-8 flex items-center justify-center text-[10px] font-bold border rounded-sm transition-all",
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

          {/* Add to cart button */}
          <Button
            onClick={handleAddToCart}
            className="w-full bg-white text-black hover:bg-primary hover:text-white shadow-lg rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold h-11"
          >
            Add to Bag
          </Button>

        </div>

      </Link>

      {/* Product Details */}
      <div className="pt-6 space-y-3 flex-1 flex flex-col">

        <div className="flex justify-between items-start gap-4">

          <div className="space-y-1">

            <p className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold font-mono">
              {product.category}
            </p>

            <Link
              href={`/product/${product.id}`}
              className="block font-serif text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              {product.name}
            </Link>

          </div>

          <p className="font-serif text-lg font-semibold text-foreground/90">
            {formatPrice(product.price)}
          </p>

        </div>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Color options */}
        {product.colors && product.colors.length > 0 && (

          <div className="pt-2 flex items-center gap-3">

            {product.colors.map((color) => (

              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                title={color}
                className={cn(
                  "w-4 h-4 rounded-full border border-border transition-all",
                  selectedColor === color
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "hover:scale-110"
                )}
                style={{ backgroundColor: color.toLowerCase() }}
              />

            ))}

            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {selectedColor}
            </span>

          </div>

        )}

      </div>

    </div>
  );
}