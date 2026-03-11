"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Search, User, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Our Story", href: "/story" },
  { name: "Contact", href: "/contact" },
];

const promoMessages = [
  "🚚 FREE SHIPPING on orders above LKR 5,000",
  "🎉 Use code URBAN10 for 10% OFF your first order",
  "⭐ Rated 4.9/5 by 10,000+ happy customers",
  "🔥 New Summer Drop — Limited Stock!",
];

export function Navbar() {
  const { totalItems } = useCart();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const [promoVisible, setPromoVisible] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setPromoVisible(window.scrollY <= 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPromoIndex((i) => (i + 1) % promoMessages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Close drawer on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsOpen(false); setSearchOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const atTop = !isScrolled;

  return (
    <>
      {/* ── Promo Bar ── */}
      <AnimatePresence>
        {promoVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 right-0 z-50 bg-primary overflow-hidden"
          >
            <div className="px-4 py-2 flex items-center justify-center gap-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={promoIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-[11px] font-semibold tracking-[0.12em] text-white uppercase text-center"
                >
                  {promoMessages[promoIndex]}
                </motion.p>
              </AnimatePresence>
              {/* Dots */}
              <div className="hidden sm:flex gap-1">
                {promoMessages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPromoIndex(i)}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all",
                      i === promoIndex ? "bg-white" : "bg-white/30"
                    )}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Navbar ── */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed left-0 right-0 z-40 transition-all duration-300",
          promoVisible ? "top-[34px]" : "top-0",
          isScrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm py-3"
            : "bg-gradient-to-b from-black/50 to-transparent py-5 border-b border-transparent"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-tight shrink-0 group"
          >
            <span className={cn("transition-colors", atTop ? "text-white" : "text-foreground")}>
              Urban
            </span>
            <span className="text-primary">Aura</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium rounded-sm transition-all group",
                    active
                      ? atTop ? "text-white" : "text-foreground"
                      : atTop ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                  {/* Underline for active */}
                  <span className={cn(
                    "absolute bottom-0 left-3 right-3 h-px bg-primary transition-all duration-300",
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                  )} />
                  {/* Active dot */}
                  {active && (
                    <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">

            {/* Expandable Search */}
            <div className="hidden md:flex items-center">
              <AnimatePresence>
                {searchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    autoFocus
                    placeholder="Search..."
                    className="bg-background/80 border border-border/60 rounded-sm px-3 py-1.5 text-xs outline-none focus:border-primary mr-1 text-foreground"
                  />
                )}
              </AnimatePresence>
              <button
                onClick={() => setSearchOpen(s => !s)}
                className={cn(
                  "w-9 h-9 rounded-sm flex items-center justify-center transition-colors",
                  atTop ? "text-white/80 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                  searchOpen && "bg-secondary/60 text-foreground"
                )}
              >
                {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
              </button>
            </div>

            {/* Account (desktop only) */}
            <Link
              href="/auth/login"
              className={cn(
                "hidden md:flex w-9 h-9 rounded-sm items-center justify-center transition-colors",
                atTop ? "text-white/80 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              <User className="h-4 w-4" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className={cn(
                "relative w-9 h-9 rounded-sm flex items-center justify-center transition-colors",
                atTop ? "text-white/80 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              <ShoppingBag className="h-4 w-4" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 leading-none shadow-md shadow-primary/40"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(true)}
              className={cn(
                "md:hidden w-9 h-9 rounded-sm flex items-center justify-center transition-colors",
                atTop ? "text-white/80 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-[49] md:hidden backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-[80vw] max-w-xs bg-background border-l border-border/50 z-50 md:hidden flex flex-col overflow-hidden"
            >
              {/* Drawer header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-border/40">
                <span className="font-serif text-lg font-bold">
                  Urban<span className="text-primary">Aura</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col px-4 py-6 gap-1 overflow-y-auto">
                {navLinks.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-4 py-3.5 rounded-sm text-sm font-medium transition-all",
                          active
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                        )}
                      >
                        <span>{link.name}</span>
                        <ChevronRight className={cn("w-4 h-4 transition-transform", active && "rotate-90")} />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer footer CTAs */}
              <div className="px-4 py-5 border-t border-border/40 space-y-2.5 bg-secondary/10">
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-sm bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Cart
                  </span>
                  {totalItems > 0 && (
                    <span className="bg-white text-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 w-full px-4 py-3 rounded-sm border border-border/60 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
                >
                  <User className="w-4 h-4" />
                  My Account
                </Link>
              </div>

              {/* Contact strip */}
              <div className="px-6 py-3 bg-secondary/20 border-t border-border/40 text-center">
                <p className="text-[10px] text-muted-foreground font-mono">
                  📞 <a href="tel:0741560507" className="text-foreground hover:text-primary transition-colors">0741560507</a>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}