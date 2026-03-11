'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Plus, Edit, Trash2, Package, Search, TrendingUp,
    ShoppingBag, AlertCircle, Clock, BarChart3, ArrowUpRight
} from 'lucide-react';
import { Product } from '@/lib/db';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            setProducts(await res.json());
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProducts(prev => prev.filter(p => p.id !== id));
                setDeleteConfirm(null);
            }
        } catch (e) { console.error(e); }
    };

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = [
        {
            label: 'Total Products', value: products.length,
            icon: Package, color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20',
            sub: 'In inventory'
        },
        {
            label: 'Total Revenue', value: 'LKR 4,32,900',
            icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20',
            sub: '+12% this month'
        },
        {
            label: 'Total Orders', value: '142',
            icon: ShoppingBag, color: 'text-primary', bg: 'bg-primary/10 border-primary/20',
            sub: '8 new today'
        },
        {
            label: 'Low Stock', value: loading ? '—' : products.filter(p => p.stock < 5).length,
            icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20',
            sub: 'Needs restock'
        },
    ];

    const categories = ['T-Shirts', 'Shirts', 'Slippers', 'Shoes', 'Watches'];

    const recentLogs = [
        { user: 'Admin', action: 'Added new product', item: 'Classic White Tee', time: '2 mins ago', color: 'text-green-400' },
        { user: 'System', action: 'Low stock alert', item: 'Leather Slippers', time: '1 hr ago', color: 'text-yellow-400' },
        { user: 'Admin', action: 'Price updated', item: 'Sports Shoes', time: '3 hrs ago', color: 'text-blue-400' },
        { user: 'Customer', action: 'New order placed', item: '#ORD-7721', time: '5 hrs ago', color: 'text-primary' },
    ];

    return (
        <div className="space-y-8 pb-12">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage your Urban Aura inventory & orders.
                    </p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-sm font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 uppercase tracking-widest"
                >
                    <Plus size={16} /> Add Product
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, i) => (
                    <div key={i} className={cn(
                        "bg-secondary/20 border rounded-sm p-5 group hover:border-border transition-all",
                        stat.bg
                    )}>
                        <div className="flex items-start justify-between mb-4">
                            <div className={cn("p-2.5 rounded-sm border", stat.bg)}>
                                <stat.icon size={18} className={stat.color} />
                            </div>
                            <ArrowUpRight size={14} className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                        </div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold font-serif text-foreground">{loading && i === 0 ? '…' : stat.value}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* Categories quick view */}
            <div className="bg-secondary/20 border border-border/50 rounded-sm p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Product Categories</h2>
                    <BarChart3 size={14} className="text-muted-foreground" />
                </div>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                        const count = products.filter(p => p.category.toLowerCase().includes(cat.toLowerCase().slice(0, -1))).length;
                        return (
                            <div key={cat} className="flex items-center gap-2 bg-background border border-border/50 rounded-sm px-3 py-2">
                                <span className="text-xs font-bold text-foreground">{cat}</span>
                                <span className="text-[10px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded-sm">{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Product Table */}
                <div className="xl:col-span-2 space-y-5">
                    <div className="flex items-center justify-between">
                        <h2 className="font-serif text-xl font-bold">Inventory</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="bg-secondary/30 border border-border/60 rounded-sm py-2 pl-8 pr-4 text-xs outline-none focus:border-primary transition-all w-56 placeholder:text-muted-foreground"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="bg-secondary/10 border border-border/50 rounded-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-border/50 text-left text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold bg-secondary/20">
                                        <th className="px-5 py-3">Product</th>
                                        <th className="px-5 py-3">Category</th>
                                        <th className="px-5 py-3">Stock</th>
                                        <th className="px-5 py-3">Price</th>
                                        <th className="px-5 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/40">
                                    {loading ? (
                                        [...Array(4)].map((_, i) => (
                                            <tr key={i}>
                                                <td colSpan={5} className="px-5 py-4">
                                                    <div className="h-8 rounded-sm animate-shimmer w-full" />
                                                </td>
                                            </tr>
                                        ))
                                    ) : filtered.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="p-10 text-center text-muted-foreground text-sm italic">
                                                No products found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filtered.map((product) => (
                                            <tr key={product.id} className="hover:bg-secondary/20 transition-colors group">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative w-10 h-10 rounded-sm overflow-hidden bg-secondary/50 border border-border/40 shrink-0">
                                                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                                                        </div>
                                                        <p className="font-medium text-sm text-foreground truncate max-w-[140px]">{product.name}</p>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="text-[9px] uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded-sm font-bold">
                                                        {product.category}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className={cn(
                                                            "w-1.5 h-1.5 rounded-full",
                                                            product.stock > 10 ? "bg-green-400" : product.stock > 0 ? "bg-yellow-400" : "bg-red-400"
                                                        )} />
                                                        <span className={cn(
                                                            "text-[10px] font-bold uppercase tracking-wide",
                                                            product.stock > 10 ? "text-green-400" : product.stock > 0 ? "text-yellow-400" : "text-red-400"
                                                        )}>
                                                            {product.stock}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="font-mono text-sm">LKR {product.price.toLocaleString()}</span>
                                                </td>
                                                <td className="px-5 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Link
                                                            href={`/admin/products/edit/${product.id}`}
                                                            className="p-2 rounded-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
                                                        >
                                                            <Edit size={14} />
                                                        </Link>
                                                        {deleteConfirm === product.id ? (
                                                            <div className="flex items-center gap-1">
                                                                <button
                                                                    onClick={() => handleDelete(product.id)}
                                                                    className="px-2 py-1 rounded-sm bg-red-500 text-white text-[9px] font-bold uppercase hover:bg-red-600 transition-all"
                                                                >
                                                                    Confirm
                                                                </button>
                                                                <button
                                                                    onClick={() => setDeleteConfirm(null)}
                                                                    className="px-2 py-1 rounded-sm bg-secondary/60 text-[9px] font-bold uppercase hover:bg-secondary transition-all"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => setDeleteConfirm(product.id)}
                                                                className="p-2 rounded-sm text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-all"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right panel */}
                <div className="space-y-5">

                    {/* Recent Activity */}
                    <div className="bg-secondary/10 border border-border/50 rounded-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-border/40">
                            <h2 className="text-sm font-bold uppercase tracking-widest">Recent Activity</h2>
                        </div>
                        <div className="p-5 space-y-5">
                            {recentLogs.map((log, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="w-8 h-8 rounded-sm bg-secondary/50 border border-border/40 flex items-center justify-center shrink-0 mt-0.5">
                                        <Clock size={13} className="text-muted-foreground" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-xs">
                                            <span className={cn("font-bold", log.color)}>{log.user}</span>
                                            <span className="text-muted-foreground mx-1">{log.action}</span>
                                            <span className="text-foreground font-medium">{log.item}</span>
                                        </p>
                                        <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono">{log.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="px-5 pb-4">
                            <button className="w-full py-2.5 rounded-sm border border-border/50 text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground hover:bg-secondary/40 hover:text-foreground transition-all">
                                View All Logs
                            </button>
                        </div>
                    </div>

                    {/* Business Info Card */}
                    <div className="bg-primary/5 border border-primary/20 rounded-sm p-5 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-primary rounded-sm flex items-center justify-center">
                                <Package size={14} className="text-white" />
                            </div>
                            <h3 className="font-serif font-bold text-foreground">
                                Urban<span className="text-primary">Aura</span>
                            </h3>
                        </div>
                        <div className="space-y-2 text-xs text-muted-foreground">
                            <p>📞 <span className="text-foreground font-mono">0741560507</span></p>
                            <p>✉ <span className="text-foreground font-mono break-all">Thakshilavidhu@gmail.com</span></p>
                            <p>🚚 <span className="text-foreground">Online Delivery · Sri Lanka</span></p>
                            <p>💳 <span className="text-foreground">Online Payment</span></p>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {['T-Shirts', 'Shirts', 'Slippers', 'Shoes', 'Watches'].map(cat => (
                                <span key={cat} className="text-[9px] uppercase tracking-wide bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-sm font-bold">
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
