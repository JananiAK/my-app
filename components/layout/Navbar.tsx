"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Story", href: "/story" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const { totalItems } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
                    isScrolled
                        ? "bg-background/95 backdrop-blur-md shadow-sm border-border py-2"
                        : "py-6 bg-transparent" // Transparent on top
                )}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    {/* Logo (Centered in desktop via flex logic, left on mobile) */}
                    <div className="flex-1 md:flex-none flex items-center gap-2">
                        <Link href="/" className="font-serif text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2 group">
                            <Sparkles className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className={cn(
                                "transition-colors",
                                !isScrolled && "md:text-white md:mix-blend-difference" // White on hero, dark elsewhere
                            )}>
                                Harahs
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav - Centered */}
                    <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "relative text-sm font-medium tracking-wide transition-colors hover:text-primary py-2 group",
                                    !isScrolled ? "text-white/90 hover:text-white" : "text-foreground/80"
                                )}
                            >
                                {link.name}
                                <span className={cn(
                                    "absolute -bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full",
                                    !isScrolled ? "bg-white" : "bg-primary"
                                )} />
                            </Link>
                        ))}
                    </nav>

                    {/* Actions - Right Aligned */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "hidden md:flex transition-colors",
                                !isScrolled ? "text-white hover:bg-white/20 hover:text-white" : "hover:text-primary"
                            )}
                        >
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Search</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className={cn(
                                "hidden md:flex transition-colors",
                                !isScrolled ? "text-white hover:bg-white/20 hover:text-white" : "hover:text-primary"
                            )}
                        >
                            <Link href="/auth/login">
                                <User className="h-5 w-5" />
                                <span className="sr-only">Account</span>
                            </Link>
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "relative transition-colors",
                                !isScrolled ? "text-white hover:bg-white/20 hover:text-white" : "hover:text-primary"
                            )}
                            asChild
                        >
                            <Link href="/cart">
                                <ShoppingBag className="h-5 w-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground animate-in zoom-in">
                                        {totalItems}
                                    </span>
                                )}
                                <span className="sr-only">Cart</span>
                            </Link>
                        </Button>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "md:hidden",
                                !isScrolled ? "text-white hover:bg-white/20 hover:text-white" : "hover:text-primary"
                            )}
                            onClick={() => setIsOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col md:hidden"
                    >
                        <div className="flex items-center justify-between p-6">
                            <span className="font-serif text-2xl font-bold text-primary">Menu</span>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                <X className="h-6 w-6" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </div>
                        <nav className="flex-1 flex flex-col items-center justify-center gap-8 p-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-3xl font-serif font-medium text-foreground hover:text-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex gap-4 mt-8"
                            >
                                <Button variant="outline" size="lg" className="w-full gap-2" asChild>
                                    <Link href="/auth/login">
                                        <User className="h-4 w-4" /> Account
                                    </Link>
                                </Button>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
