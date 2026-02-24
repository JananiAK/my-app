"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, ShoppingBag } from "lucide-react";

interface ProductViewProps {
    product: {
        id: string;
        name: string;
        price: number;
        category: string;
        image: string;
        description: string;
    };
}

import { useCart } from "@/context/CartContext";

export function ProductView({ product }: ProductViewProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }
        addToCart(product, selectedSize, quantity);
        alert(`Added ${quantity} x ${product.name} (Size: ${selectedSize}) to cart!`);
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
            {/* Image Gallery (Mock) */}
            <div className="w-full md:w-1/2 space-y-4">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted border">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {/* Mock thumbnails */}
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="relative aspect-square rounded-md overflow-hidden bg-muted cursor-pointer border hover:border-primary">
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

            {/* Product Info */}
            <div className="w-full md:w-1/2 space-y-8">
                <div>
                    <h2 className="text-sm text-primary font-medium tracking-wide uppercase">{product.category}</h2>
                    <h1 className="font-serif text-4xl mt-2 font-bold text-foreground">{product.name}</h1>
                    <p className="text-2xl font-medium mt-4 text-foreground">{formatPrice(product.price)}</p>
                </div>

                <div className="prose prose-sm text-muted-foreground">
                    <p>{product.description}</p>
                    <p>Handcrafted with passion and precision. This piece embodies the rich cultural heritage of Indian craftsmanship.</p>
                </div>

                {/* Size Selector */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Select Size</span>
                        <span className="text-sm text-primary underline cursor-pointer">Size Guide</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`
                    h-10 rounded-md border text-sm font-medium transition-all
                    ${selectedSize === size
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-input bg-background hover:bg-accent hover:text-accent-foreground"}
                  `}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                    <div className="flex items-center border rounded-md w-max">
                        <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 rounded-none">
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                        <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 rounded-none">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button className="flex-1 h-10 gap-2" size="lg" onClick={handleAddToCart}>
                        <ShoppingBag className="h-4 w-4" /> Add to Cart
                    </Button>
                </div>

                {/* Additional Info */}
                <div className="space-y-4 pt-6 text-sm text-muted-foreground">
                    <div className="flex gap-2">
                        <span className="font-medium text-foreground">Delivery:</span>
                        <span>Free shipping on all orders over ₹2000.</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="font-medium text-foreground">Returns:</span>
                        <span>15-day easy returns policy.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
