'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, PlusCircle, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navLinks = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/products/new', label: 'Add Product', icon: PlusCircle },
        { href: '/shop', label: 'View Store', icon: ShoppingBag },
    ];

    const bottomLinks = [
        { href: '/admin/settings', label: 'Settings', icon: Settings },
    ];

    const isLinkActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    return (
        <div className="flex min-h-screen bg-[#0a0a0a] text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl p-6 flex flex-col gap-8 fixed h-full z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-xl uppercase italic">U</span>
                    </div>
                    <span className="text-xl font-bold tracking-tighter uppercase italic">Urban Aura</span>
                </div>

                <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-white/5",
                                isLinkActive(link.href)
                                    ? "bg-white/10 text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] border border-white/5"
                                    : "text-white/60 hover:text-white"
                            )}
                        >
                            <link.icon size={20} className={isLinkActive(link.href) ? "text-white" : "text-white/40"} />
                            <span className="font-medium">{link.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto flex flex-col gap-2 pt-6 border-t border-white/10">
                    {bottomLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-white/5",
                                isLinkActive(link.href)
                                    ? "bg-white/10 text-white"
                                    : "text-white/60 hover:text-white"
                            )}
                        >
                            <link.icon size={20} className={isLinkActive(link.href) ? "text-white" : "text-white/40"} />
                            <span className="font-medium">{link.label}</span>
                        </Link>
                    ))}
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400/60 transition-all hover:bg-red-400/10 hover:text-red-400">
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
