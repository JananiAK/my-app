"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";
import { Minus, Plus, ShoppingBag, Heart, Share2, ShieldCheck, Truck, RotateCcw, Star, ChevronRight } from "lucide-react";
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
  const [selectedColor, setSelectedColor] = useState<string | null>(product.colors?.[0] || null);
  const [activeThumb, setActiveThumb] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string }>({ visible: false, message: "" });

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 2500);
  };

  const handleAddToCart = () => {
    if (productSizes.length > 0 && !selectedSize) {
      showToast("⚠ Please select a size first");
      return;
    }
    addToCart(product, selectedSize || "Standard", quantity);
    showToast(`✓ ${quantity} × ${product.name} added to cart!`);
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = "94770000000";
    const sizeText = selectedSize ? ` Size: ${selectedSize}` : "";
    const colorText = selectedColor ? ` Color: ${selectedColor}` : "";
    const message = encodeURIComponent(
      `Hello, I would like to order:\n\nProduct: ${product.name}\n${sizeText}\n${colorText}\nQuantity: ${quantity}`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="relative">

      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed top-24 right-6 z-50 animate-toast-in">
          <div className="bg-secondary border border-border/60 text-foreground text-sm font-medium px-5 py-3 rounded-sm shadow-xl flex items-center gap-3 max-w-xs">
            <span className="text-primary text-base">▲</span>
            {toast.message}
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8 font-mono uppercase tracking-wide">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-primary transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground truncate max-w-[120px]">{product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-10 lg:gap-16">

        {/* ── Product Images ── */}
        <div className="w-full md:w-1/2 space-y-3">
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-secondary/30 border border-border/40">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover"
            />
            {/* In Stock badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-green-500/90 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                ● In Stock
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                className={cn(
                  "relative aspect-square rounded-sm overflow-hidden bg-secondary/30 border-2 transition-all duration-200",
                  activeThumb === i ? "border-primary" : "border-border/40 hover:border-border"
                )}
              >
                <Image
                  src={product.image}
                  alt="Thumbnail"
                  fill
                  className={cn("object-cover transition-opacity", activeThumb === i ? "opacity-100" : "opacity-60")}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── Product Details ── */}
        <div className="w-full md:w-1/2 space-y-7">

          {/* Category + Name + Price */}
          <div className="space-y-3">
            <p className="text-xs text-primary font-bold uppercase tracking-[0.3em] font-mono">{product.category}</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">{product.name}</h1>

            {/* Star rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <Star className="w-4 h-4 fill-amber-400/50 text-amber-400" />
              </div>
              <span className="text-xs text-muted-foreground font-mono">(4.5) · 128 reviews</span>
            </div>

            <p className="text-3xl font-bold font-serif text-foreground">{formatPrice(product.price)}</p>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-4">
            {product.description}
          </p>

          {/* Size Selector */}
          {productSizes.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold uppercase tracking-widest">Select Size</span>
                <button className="text-xs text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {productSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "h-11 rounded-sm border text-xs font-bold uppercase tracking-wide transition-all duration-200",
                      selectedSize === size
                        ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                        : "border-border/60 text-muted-foreground hover:border-foreground hover:text-foreground"
                    )}
                  >
                    {size}
                    {selectedSize === size && <span className="block text-[8px] mt-0.5 opacity-80">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <span className="text-sm font-bold uppercase tracking-widest block">
                Color: <span className="text-primary font-mono capitalize">{selectedColor}</span>
              </span>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all duration-200",
                      selectedColor === color
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110 border-transparent"
                        : "border-border/50 hover:scale-110"
                    )}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="space-y-3 pt-2 border-t border-border/40">
            <div className="flex items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center border border-border/60 rounded-sm bg-secondary/20 overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 rounded-none hover:bg-primary hover:text-white transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>
                <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 rounded-none hover:bg-primary hover:text-white transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>

              {/* Wishlist */}
              <button
                onClick={() => setWishlisted(w => !w)}
                className={cn(
                  "w-11 h-11 rounded-sm border flex items-center justify-center transition-all duration-200",
                  wishlisted ? "bg-primary border-primary text-white" : "border-border/60 hover:border-primary hover:text-primary"
                )}
              >
                <Heart className={cn("w-5 h-5", wishlisted && "fill-current")} />
              </button>

              {/* Share */}
              <button className="w-11 h-11 rounded-sm border border-border/60 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-200">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart CTA */}
            <Button
              className="w-full h-13 bg-primary text-white hover:bg-primary/90 text-xs uppercase tracking-[0.25em] font-bold rounded-sm shadow-2xl shadow-primary/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart — {formatPrice(product.price * quantity)}
            </Button>

            {/* WhatsApp Order */}
            <Button
              variant="outline"
              className="w-full h-12 rounded-sm border-green-500/50 text-green-500 hover:bg-green-500 hover:text-white text-xs uppercase tracking-[0.2em] font-bold transition-all"
              onClick={handleWhatsAppOrder}
            >
              📱 Order via WhatsApp
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/40">
            {[
              { icon: Truck, text: "Free Shipping", sub: "above LKR 5,000" },
              { icon: RotateCcw, text: "Easy Returns", sub: "15-day policy" },
              { icon: ShieldCheck, text: "Secure Pay", sub: "SSL encrypted" },
            ].map(({ icon: Icon, text, sub }) => (
              <div key={text} className="flex flex-col items-center text-center gap-1.5 p-2">
                <Icon className="w-4 h-4 text-primary" />
                <p className="text-[10px] font-bold text-foreground uppercase tracking-wide">{text}</p>
                <p className="text-[9px] text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-background/95 backdrop-blur-md border-t border-border/50 p-4 z-40">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-foreground truncate">{product.name}</p>
            <p className="text-primary font-bold text-sm">{formatPrice(product.price)}</p>
          </div>
          <Button
            className="shrink-0 bg-primary text-white h-11 px-6 rounded-sm text-xs uppercase tracking-[0.2em] font-bold shadow-lg shadow-primary/30"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}