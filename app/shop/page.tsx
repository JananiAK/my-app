"use client";

import { useState } from "react";
import { products, categories } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState([0, 50000]); // Mock range
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredProducts = products.filter((product) => {
        const matchCategory =
            selectedCategory === "All" || product.category === selectedCategory;
        const matchPrice =
            product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchCategory && matchPrice;
    });

    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className={cn(
                    "w-full md:w-64 space-y-8",
                    isFilterOpen ? "block" : "hidden md:block" // Simple hidden logic for mobile
                )}>
                    <div>
                        <h3 className="font-serif text-xl font-bold mb-4">Categories</h3>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        "block w-full text-left text-sm py-1 transition-colors hover:text-primary",
                                        selectedCategory === category
                                            ? "font-bold text-primary"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-serif text-xl font-bold mb-4">Price</h3>
                        {/* Mock Price Range Slider controls would go here */}
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>Range: ₹0 - ₹50,000</p>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="font-serif text-3xl font-bold">Shop Collection</h1>
                        <Button
                            variant="outline"
                            size="sm"
                            className="md:hidden gap-2"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <Filter className="h-4 w-4" /> Filters
                        </Button>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No products found in this category.</p>
                            <Button
                                variant="link"
                                className="mt-2"
                                onClick={() => setSelectedCategory("All")}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
