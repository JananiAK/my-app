"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Filter, X, ChevronDown, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/db";

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [categoriesList, setCategoriesList] = useState<string[]>(["All"]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, catsRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/categories')
                ]);

                if (productsRes.ok) {
                    const data = await productsRes.json();
                    setProducts(data);
                }

                if (catsRes.ok) {
                    const data = await catsRes.json();
                    setCategoriesList(["All", ...data]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = products.filter((product) => {
        return selectedCategory === "All" || product.category === selectedCategory;
    });

    return (
        <div className="min-h-screen bg-background border-t border-border/50">
            {/* Page Header */}
            <div className="bg-secondary/10 py-16 md:py-24 border-b border-border/50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4 font-mono">The Collection</p>
                        <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6">Curated Essentials</h1>
                        <p className="text-muted-foreground text-lg font-light leading-relaxed">
                            Explore our range of artisanal tailoring, contemporary streetwear, and timeless accessories designed for the modern gentleman.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12">
                {/* Controls Bar */}
                <div className="flex items-center justify-between mb-12 pb-6 border-b border-border/40">
                    <div className="flex items-center gap-8">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-primary transition-colors"
                        >
                            <Filter className="w-4 h-4" />
                            {isFilterOpen ? "Hide Filters" : "Show Filters"}
                        </button>
                        <p className="hidden md:block text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                            {loading ? "Scanning..." : `Showing ${filteredProducts.length} Results`}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest font-medium border-r border-border/50 pr-6 mr-2">
                            Sort By <ChevronDown className="w-3 h-3" />
                        </div>
                        <p className="md:hidden text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                            {loading ? "..." : `${filteredProducts.length} Results`}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
                    {/* Sidebar Filters */}
                    <AnimatePresence mode="wait">
                        {isFilterOpen && (
                            <motion.aside
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="w-full md:w-64 shrink-0 space-y-10"
                            >
                                <div className="space-y-6">
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground font-mono">Categories</h3>
                                    <div className="space-y-3">
                                        {categoriesList.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={cn(
                                                    "flex items-center gap-3 w-full text-left text-xs uppercase tracking-widest py-1 transition-all group",
                                                    selectedCategory === category
                                                        ? "font-bold text-primary"
                                                        : "text-muted-foreground hover:text-foreground"
                                                )}
                                            >
                                                <span className={cn(
                                                    "w-1.5 h-1.5 rounded-full transition-all",
                                                    selectedCategory === category ? "bg-primary scale-100" : "bg-border scale-0 group-hover:scale-100"
                                                )} />
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6 pt-10 border-t border-border/40">
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground font-mono">Price Range</h3>
                                    <div className="space-y-4">
                                        <div className="h-1 bg-secondary rounded-full relative">
                                            <div className="absolute inset-y-0 left-0 w-2/3 bg-primary rounded-full transition-all" />
                                        </div>
                                        <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                                            <span>LKR 0</span>
                                            <span>LKR 50,000+</span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full text-[10px] uppercase tracking-widest font-bold border-border h-12 rounded-sm"
                                    onClick={() => setSelectedCategory("All")}
                                >
                                    Clear Filters
                                </Button>
                            </motion.aside>
                        )}
                    </AnimatePresence>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-4">
                                <Loader2 className="animate-spin text-primary/50" size={40} />
                                <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Inventory Scanning in Progress...</p>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                                {filteredProducts.map((product, idx) => (
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
                                <p className="text-muted-foreground font-light text-lg italic">We couldn't find any results for this selection.</p>
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
