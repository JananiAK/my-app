"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Filter, SlidersHorizontal, Grid3X3, List, Loader2, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/db";

type SortOption = "default" | "price-asc" | "price-desc";

// Skeleton placeholder
function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-[3/4] rounded-sm animate-shimmer" />
      <div className="space-y-2">
        <div className="h-3 w-16 rounded animate-shimmer" />
        <div className="h-4 w-3/4 rounded animate-shimmer" />
        <div className="h-3 w-1/4 rounded animate-shimmer" />
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoriesList, setCategoriesList] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, catsRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ]);
        if (productsRes.ok) setProducts(await productsRes.json());
        if (catsRes.ok) setCategoriesList(["All", ...(await catsRes.json())]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = products.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  const sortLabels: Record<SortOption, string> = {
    default: "Featured",
    "price-asc": "Price: Low → High",
    "price-desc": "Price: High → Low",
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Page Header */}
      <div className="relative bg-secondary/20 py-20 md:py-28 border-b border-border/50 overflow-hidden">
        {/* Background accent */}
        <div className="absolute -right-40 top-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold font-mono">The Collection</p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground">Curated<br />Essentials</h1>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Explore our range of artisanal tailoring, contemporary streetwear, and timeless accessories.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide -mx-1 px-1">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide border transition-all duration-200",
                selectedCategory === cat
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "border-border/60 text-muted-foreground hover:border-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "flex items-center gap-2 text-xs uppercase tracking-widest font-bold transition-colors px-4 py-2 rounded-sm border",
                isFilterOpen ? "bg-primary text-white border-primary" : "border-border/60 hover:border-primary hover:text-primary"
              )}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </button>
            <p className="hidden md:block text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
              {loading ? "Loading..." : `${sorted.length} Products`}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(s => !s)}
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium border border-border/60 px-4 py-2 rounded-sm hover:border-primary transition-colors"
            >
              Sort: {sortLabels[sortBy]} <ChevronDown className={cn("w-3 h-3 transition-transform", sortOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-full mt-2 bg-secondary border border-border/60 rounded-sm shadow-xl z-20 min-w-[180px]"
                >
                  {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => { setSortBy(key); setSortOpen(false); }}
                      className={cn(
                        "flex items-center w-full px-4 py-3 text-xs font-medium uppercase tracking-wide hover:bg-primary/10 hover:text-primary transition-colors",
                        sortBy === key && "text-primary"
                      )}
                    >
                      {sortLabels[key]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-14">

          {/* Sidebar Filters */}
          <AnimatePresence mode="wait">
            {isFilterOpen && (
              <motion.aside
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "auto" }}
                exit={{ opacity: 0, x: -20, width: 0 }}
                className="w-full md:w-56 shrink-0 space-y-8 overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold font-mono">Categories</h3>
                    {selectedCategory !== "All" && (
                      <button onClick={() => setSelectedCategory("All")} className="text-[9px] text-primary uppercase tracking-wide font-bold flex items-center gap-1">
                        <X className="w-3 h-3" /> Clear
                      </button>
                    )}
                  </div>
                  <div className="space-y-1">
                    {categoriesList.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          "flex items-center gap-3 w-full text-left text-xs uppercase tracking-widest py-2 px-3 rounded-sm transition-all",
                          selectedCategory === category
                            ? "font-bold text-white bg-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-border/40">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold font-mono">Price Range</h3>
                  <div className="space-y-3">
                    <div className="h-1 bg-border rounded-full relative">
                      <div className="absolute inset-y-0 left-0 w-2/3 bg-primary rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                      <span>LKR 0</span><span>LKR 50K+</span>
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : sorted.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                {sorted.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 space-y-6 border border-dashed border-border/60 rounded-sm"
              >
                <div className="text-5xl">🔍</div>
                <p className="text-muted-foreground font-light text-lg">No results for this selection.</p>
                <Button
                  variant="link"
                  className="text-primary uppercase tracking-[0.2em] text-xs font-bold"
                  onClick={() => setSelectedCategory("All")}
                >
                  View All Products
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
