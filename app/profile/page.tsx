"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import {
    Package, ShoppingBag, CreditCard, Heart,
    Clock, ChevronRight, LayoutDashboard, LogOut, User, Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Tab = "overview" | "orders" | "wishlist";

const orders = [
    { id: "#UA-3829", date: "Mar 09, 2026", status: "Processing", total: 12999, items: ["Noir Stealth Tee", "Classic Watches"] },
    { id: "#UA-3810", date: "Feb 25, 2026", status: "Delivered", total: 5499, items: ["Casual Shirt"] },
    { id: "#UA-3801", date: "Jan 15, 2026", status: "Delivered", total: 8990, items: ["Running Shoes"] },
];

const statusStyle: Record<string, string> = {
    Processing: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    Delivered: "bg-green-400/10 text-green-400 border-green-400/20",
    Shipped: "bg-blue-400/10 text-blue-400 border-blue-400/20",
};

export default function ProfilePage() {
    const [tab, setTab] = useState<Tab>("overview");

    const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "orders", label: "My Orders", icon: ShoppingBag },
        { id: "wishlist", label: "Wishlist", icon: Heart },
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center">
                            <User className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="font-serif text-3xl font-bold text-foreground">My Account</h1>
                            <p className="text-muted-foreground text-sm">Urban Aura Shopper</p>
                        </div>
                    </div>
                    <Link href="/" className="flex items-center gap-2 text-xs text-red-400/70 hover:text-red-400 transition-colors font-medium uppercase tracking-widest">
                        <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Sidebar */}
                    <aside className="w-full md:w-52 shrink-0 space-y-1 bg-secondary/10 border border-border/50 rounded-sm p-3">
                        {navItems.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setTab(id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all",
                                    tab === id
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                            </button>
                        ))}
                        <div className="pt-2 border-t border-border/40 mt-2">
                            <Link href="/shop" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all">
                                <Package className="w-4 h-4" />
                                Shop
                            </Link>
                        </div>
                    </aside>

                    {/* Main */}
                    <div className="flex-1 space-y-6">

                        {/* Overview */}
                        {tab === "overview" && (
                            <div className="space-y-6">
                                {/* Stats */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { icon: ShoppingBag, label: "Total Orders", value: orders.length, color: "text-primary", bg: "bg-primary/10 border-primary/20" },
                                        { icon: Clock, label: "Pending", value: orders.filter(o => o.status !== "Delivered").length, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
                                        { icon: CreditCard, label: "Total Spent", value: formatPrice(orders.reduce((s, o) => s + o.total, 0)), color: "text-green-400", bg: "bg-green-400/10 border-green-400/20" },
                                    ].map(({ icon: Icon, label, value, color, bg }) => (
                                        <div key={label} className={cn("border rounded-sm p-5", bg)}>
                                            <Icon className={cn("w-5 h-5 mb-3", color)} />
                                            <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">{label}</p>
                                            <p className="text-2xl font-bold font-serif text-foreground mt-1">{value}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Recent Order */}
                                <div className="bg-secondary/10 border border-border/50 rounded-sm">
                                    <div className="px-5 py-4 border-b border-border/40 flex items-center justify-between">
                                        <h2 className="font-serif text-lg font-bold">Latest Order</h2>
                                        <button onClick={() => setTab("orders")} className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 uppercase tracking-wider">
                                            View All <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <div className="p-5 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-mono text-sm font-bold text-foreground">{orders[0].id}</span>
                                            <span className={cn("text-[9px] uppercase tracking-widest border px-2 py-1 rounded-sm font-bold", statusStyle[orders[0].status])}>
                                                {orders[0].status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{orders[0].items.join(", ")}</span>
                                            <span className="font-bold font-serif">{formatPrice(orders[0].total)}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{orders[0].date}</p>
                                    </div>
                                </div>

                                {/* Business contact */}
                                <div className="bg-secondary/10 border border-border/50 rounded-sm p-5 space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Need Help?</h3>
                                    <p className="text-sm text-foreground">Contact Urban Aura support:</p>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <p>📞 <span className="text-foreground font-mono">0741560507</span></p>
                                        <p>✉ <a href="mailto:Thakshilavidhu@gmail.com" className="text-primary hover:underline">Thakshilavidhu@gmail.com</a></p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {tab === "orders" && (
                            <div className="space-y-4">
                                <h2 className="font-serif text-xl font-bold">My Orders</h2>
                                {orders.map((order) => (
                                    <div key={order.id} className="bg-secondary/10 border border-border/50 rounded-sm overflow-hidden">
                                        <div className="px-5 py-4 border-b border-border/40 flex items-center justify-between bg-secondary/20">
                                            <span className="font-mono text-sm font-bold text-foreground">{order.id}</span>
                                            <span className={cn("text-[9px] uppercase tracking-widest border px-2 py-1 rounded-sm font-bold", statusStyle[order.status])}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="space-y-1">
                                                <p className="text-sm text-foreground font-medium">{order.items.join(", ")}</p>
                                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {order.date}
                                                </p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="font-serif text-lg font-bold">{formatPrice(order.total)}</p>
                                                {order.status === "Delivered" && (
                                                    <div className="flex items-center gap-0.5 justify-end mt-1">
                                                        {[1,2,3,4,5].map(s => (
                                                            <Star key={s} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Wishlist Tab */}
                        {tab === "wishlist" && (
                            <div className="space-y-4">
                                <h2 className="font-serif text-xl font-bold">Wishlist</h2>
                                <div className="text-center py-16 border border-dashed border-border/50 rounded-sm space-y-4">
                                    <Heart className="w-12 h-12 mx-auto text-muted-foreground/20" />
                                    <p className="text-muted-foreground font-light">Your wishlist is empty.</p>
                                    <Button className="bg-primary text-white rounded-sm uppercase tracking-widest text-xs font-bold" asChild>
                                        <Link href="/shop">Browse Collection</Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}