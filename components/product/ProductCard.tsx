import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils"; // We need this util
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        price: number;
        category: string;
        image: string;
    };
}

import { useCart } from "@/context/CartContext";

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, "M", 1); // Default size 'M' for quick add
        alert(`Added ${product.name} to cart!`);
    };

    return (
        <div className="group relative">
            <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-accent/20">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />

                {/* Overlay Action */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute inset-x-0 bottom-4 px-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                        onClick={handleAddToCart}
                        className="w-full bg-white text-black hover:bg-white/90 shadow-md backdrop-blur-sm"
                    >
                        Quick Add
                    </Button>
                </div>
            </Link>

            <div className="pt-4 text-center space-y-1">
                <p className="text-xs tracking-wider uppercase text-muted-foreground">{product.category}</p>
                <Link href={`/product/${product.id}`} className="block font-serif text-lg font-medium text-foreground hover:text-primary transition-colors">
                    {product.name}
                </Link>
                <p className="text-sm font-medium text-foreground/80">{formatPrice(product.price)}</p>
            </div>
        </div>
    );
}
