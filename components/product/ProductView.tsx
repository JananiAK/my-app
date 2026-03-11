"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductViewProps {
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
    sizes?: string[];
    colors?: string[];
  };
}

export function ProductView({ product }: ProductViewProps) {
  const { addToCart } = useCart();

  const productSizes = product.sizes || ["XS", "S", "M", "L", "XL"];

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(productSizes[0]);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0] || null
  );

  const handleAddToCart = () => {
    if (productSizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart(product, selectedSize || "Standard", quantity);

    alert(`${quantity} × ${product.name} added to cart`);
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = "94770000000"; // replace with business number

    const sizeText = selectedSize ? ` Size: ${selectedSize}` : "";
    const colorText = selectedColor ? ` Color: ${selectedColor}` : "";

    const message = encodeURIComponent(
      `Hello, I would like to order:\n\nProduct: ${product.name}\n${sizeText}\n${colorText}\nQuantity: ${quantity}`
    );

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 lg:gap-16">

      {/* Product Images */}
      <div className="w-full md:w-1/2 space-y-4">

        <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted border">

          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover"
          />

        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-4">

          {[1, 2, 3, 4].map((i) => (

            <div
              key={i}
              className="relative aspect-square rounded-md overflow-hidden bg-muted cursor-pointer border hover:border-primary"
            >

              <Image
                src={product.image}
                alt="Thumbnail"
                fill
                className="object-cover opacity-80 hover:opacity-100"
              />

            </div>

          ))}

        </div>

      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2 space-y-8">

        {/* Title */}
        <div>

          <p className="text-sm text-primary font-medium uppercase tracking-wide">
            {product.category}
          </p>

          <h1 className="font-serif text-4xl font-bold mt-2">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold mt-4">
            {formatPrice(product.price)}
          </p>

        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>

        {/* Size Selector */}
        {productSizes.length > 0 && (

          <div>

            <div className="flex justify-between mb-3">
              <span className="text-sm font-medium">Select Size</span>
              <span className="text-sm text-primary underline cursor-pointer">
                Size Guide
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">

              {productSizes.map((size) => (

                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-10 rounded-md border text-sm font-medium transition-all
                  ${
                    selectedSize === size
                      ? "border-primary bg-primary text-white"
                      : "border-input hover:bg-accent"
                  }`}
                >
                  {size}
                </button>

              ))}

            </div>

          </div>

        )}

        {/* Color Selector */}
        {product.colors && product.colors.length > 0 && (

          <div>

            <span className="text-sm font-medium block mb-3">
              Select Color
            </span>

            <div className="flex gap-3">

              {product.colors.map((color) => (

                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-full border text-xs font-medium transition-all
                  ${
                    selectedColor === color
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input hover:bg-accent"
                  }`}
                >
                  {color}
                </button>

              ))}

            </div>

          </div>

        )}

        {/* Quantity + Add to Cart */}
        <div className="flex flex-col gap-4 pt-4 border-t">

          <div className="flex flex-col sm:flex-row gap-4">

            {/* Quantity */}
            <div className="flex items-center border rounded-md">

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="w-10 text-center text-sm font-medium">
                {quantity}
              </span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>

            </div>

            {/* Add to Cart */}
            <Button
              className="flex-1 gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </Button>

          </div>

          {/* WhatsApp Order */}
          <Button
            variant="outline"
            className="w-full border-green-600 text-green-700 hover:bg-green-50"
            onClick={handleWhatsAppOrder}
          >
            Order via WhatsApp
          </Button>

        </div>

        {/* Extra Info */}
        <div className="space-y-3 pt-6 text-sm text-muted-foreground">

          <p>
            <span className="font-medium text-foreground">
              Delivery:
            </span>{" "}
            Free shipping on orders above LKR 5,000.
          </p>

          <p>
            <span className="font-medium text-foreground">
              Returns:
            </span>{" "}
            15-day easy return policy.
          </p>

        </div>

      </div>

    </div>
  );
}