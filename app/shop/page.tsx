"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { products, categories as allCategories } from "@/lib/data";
import { Suspense } from "react";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const category = categoryParam || "All";
  
  const displayedProducts = category === "All" 
    ? products 
    : products.filter(p => p.category === category);

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <div className="text-center mb-16 space-y-4">
        <h1 className="font-serif text-5xl md:text-6xl text-white">The Collection</h1>
        <p className="text-red-600 font-mono tracking-widest uppercase text-sm">
          {category}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {allCategories.map(cat => (
          <Link
            key={cat}
            href={`/shop${cat === "All" ? "" : `?category=${cat}`}`}
            className={`px-6 py-2 rounded-full border text-sm font-medium uppercase tracking-widest transition-all ${
              category === cat 
                ? "bg-red-600 text-white border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)]" 
                : "bg-transparent text-gray-400 border-white/10 hover:border-red-600/50 hover:text-white"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {displayedProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 font-mono uppercase tracking-widest">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedProducts.map((p) => (
            <Link href={`/product/${p.id}`} key={p.id} className="group flex flex-col gap-4">
              <div className="relative aspect-[4/5] bg-secondary overflow-hidden rounded-sm border border-white/5 group-hover:border-red-600/30 transition-colors">
                <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80 to-transparent">
                  <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-3 w-full text-center block rounded-sm shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                    View Details
                  </span>
                </div>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-xs text-red-500 uppercase tracking-widest font-mono">{p.category}</p>
                <h3 className="font-serif text-xl text-white group-hover:text-red-400 transition-colors">{p.name}</h3>
                <p className="text-gray-400 font-mono text-sm">LKR {p.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
