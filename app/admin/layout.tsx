'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, ShoppingBag, PlusCircle,
    Settings, LogOut, Package, Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products/new', label: 'Add Product', icon: PlusCircle },
    { href: '/shop', label: 'View Store', icon: ShoppingBag },
];

const bottomLinks = [
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

function SidebarContent({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
    const isLinkActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Brand */}
            <div className="px-5 py-5 border-b border-border/50 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group" onClick={onClose}>
                    <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center shadow-lg shadow-primary/30 shrink-0">
                        <Package size={16} className="text-white" />
                    </div>
                    <div>
                        <span className="font-serif text-base font-bold tracking-tight text-foreground">
                            Urban<span className="text-primary">Aura</span>
                        </span>
                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-mono leading-none mt-0.5">Admin Panel</p>
                    </div>
                </Link>
                {/* Close button – only shown on mobile */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all lg:hidden"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
                <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-bold px-2 mb-2 mt-1 font-mono">Management</p>
                {navLinks.map((link) => {
                    const active = isLinkActive(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all text-sm font-medium",
                                active
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                            )}
                        >
                            <link.icon size={16} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="p-4 border-t border-border/50 space-y-1">
                {bottomLinks.map((link) => {
                    const active = pathname.startsWith(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all",
                                active ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                            )}
                        >
                            <link.icon size={16} />
                            {link.label}
                        </Link>
                    );
                })}
                <Link
                    href="/"
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all"
                >
                    <LogOut size={16} />
                    Exit Admin
                </Link>

                {/* Business info */}
                <div className="mt-3 pt-3 border-t border-border/40 px-2 space-y-1">
                    <p className="text-[9px] text-muted-foreground font-mono">📞 0741560507</p>
                    <p className="text-[9px] text-muted-foreground font-mono truncate">✉ Thakshilavidhu@gmail.com</p>
                </div>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Close drawer on route change
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setDrawerOpen(false); }, [pathname]);

    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* ── Desktop Sidebar (fixed, visible ≥ lg) ── */}
            <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-60 border-r border-border/60 bg-secondary/30 backdrop-blur-xl z-20">
                <SidebarContent pathname={pathname} />
            </aside>

            {/* ── Mobile Drawer ── */}
            <AnimatePresence>
                {drawerOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDrawerOpen(false)}
                            className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
                        />
                        {/* Panel */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 280 }}
                            className="fixed top-0 left-0 bottom-0 w-64 bg-background border-r border-border/50 z-40 lg:hidden"
                        >
                            <SidebarContent pathname={pathname} onClose={() => setDrawerOpen(false)} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ── Main ── */}
            <div className="lg:ml-60 flex flex-col min-h-screen">

                {/* Top bar */}
                <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-md border-b border-border/50 px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {/* Hamburger – mobile only */}
                        <button
                            onClick={() => setDrawerOpen(true)}
                            className="lg:hidden w-9 h-9 rounded-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all"
                        >
                            <Menu size={18} />
                        </button>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono hidden sm:block">
                            Urban Aura — Admin
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-xs text-muted-foreground font-mono">Live</span>
                        </div>
                        <Link
                            href="/"
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1.5 bg-secondary/40 px-3 py-1.5 rounded-sm border border-border/40 hover:border-border"
                        >
                            ← Storefront
                        </Link>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1 p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
