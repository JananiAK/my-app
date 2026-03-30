"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-900/20 bg-black/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="text-red-600">Urban</span>Aura
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link href="/shop" className="text-gray-300 hover:text-white transition-colors">Shop</Link>
          <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative text-gray-300 hover:text-red-500 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}