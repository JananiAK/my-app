'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Package, Search, TrendingUp, ShoppingBag, AlertCircle, Clock } from 'lucide-react';
import { Product } from '@/lib/db';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProducts(products.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = [
        { label: 'Total Products', value: products.length, icon: Package, color: 'text-blue-400' },
        { label: 'Total Revenue', value: 'LKR 4,32,900', icon: TrendingUp, color: 'text-green-400' },
        { label: 'Total Orders', value: '142', icon: ShoppingBag, color: 'text-purple-400' },
        { label: 'Low Stock', value: products.filter(p => p.stock < 5).length, icon: AlertCircle, color: 'text-red-400' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tighter uppercase italic">Control Center</h1>
                    <p className="text-white/50 mt-1 font-medium">Manage your architectural drops and global inventory.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                    <Plus size={20} />
                    New Drop
                </Link>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl group hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                                <stat.icon size={20} className={stat.color} />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Live Data</span>
                        </div>
                        <p className="text-sm text-white/50 font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold tracking-tighter mt-1">{loading ? '...' : stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* Product Inventory Table */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold tracking-tight">Active Inventory</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                            <input
                                type="text"
                                placeholder="Search inventory..."
                                className="bg-white/5 border border-white/10 rounded-full py-2 pl-9 pr-4 text-sm outline-none focus:border-white/30 transition-all w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 text-left text-xs text-white/30 uppercase tracking-widest font-bold">
                                        <th className="p-6">Product</th>
                                        <th className="p-6">Stock Status</th>
                                        <th className="p-6">Details</th>
                                        <th className="p-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {loading ? (
                                        <tr><td colSpan={4} className="p-12 text-center text-white/20 italic">Scanning inventory...</td></tr>
                                    ) : filteredProducts.length === 0 ? (
                                        <tr><td colSpan={4} className="p-12 text-center text-white/20 italic">No assets located.</td></tr>
                                    ) : (
                                        filteredProducts.map((product) => (
                                            <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="p-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 border border-white/10 p-1">
                                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-md" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm tracking-tight">{product.name}</p>
                                                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{product.category}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex items-center gap-2">
                                                        <div className={cn(
                                                            "w-1.5 h-1.5 rounded-full animate-pulse",
                                                            product.stock > 10 ? "bg-green-400" : product.stock > 0 ? "bg-yellow-400" : "bg-red-400"
                                                        )} />
                                                        <span className={cn(
                                                            "text-xs font-bold uppercase tracking-widest",
                                                            product.stock > 10 ? "text-green-400/80" : product.stock > 0 ? "text-yellow-400/80" : "text-red-400/80"
                                                        )}>
                                                            {product.stock > 10 ? 'Healthy' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                                                        </span>
                                                        <span className="text-[10px] text-white/30 ml-1">({product.stock})</span>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <p className="font-mono text-sm">LKR {product.price.toLocaleString()}</p>
                                                </td>
                                                <td className="p-6 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                        <Link
                                                            href={`/admin/products/edit/${product.id}`}
                                                            className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"
                                                        >
                                                            <Edit size={16} />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(product.id)}
                                                            className="p-2 hover:bg-red-400/10 rounded-lg text-white/40 hover:text-red-400 transition-all"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
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

                {/* Recent Activity */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold tracking-tight">System Logs</h2>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="space-y-6">
                            {[
                                { user: 'Admin', action: 'Created new drop', item: 'Noir Stealth Tee', time: '2 mins ago' },
                                { user: 'System', action: 'Low stock alert', item: 'Aura Utility Shirt', time: '1 hour ago' },
                                { user: 'Admin', action: 'Updated price', item: 'Urban Velocity Runners', time: '3 hours ago' },
                                { user: 'Customer', action: 'New order placed', item: '#ORD-7721', time: '5 hours ago' },
                            ].map((log, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="p-2 bg-white/5 rounded-lg h-fit">
                                        <Clock size={16} className="text-white/30" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium">
                                            <span className="text-white/90">{log.user}</span>
                                            <span className="text-white/40 mx-1.5">{log.action}</span>
                                            <span className="text-white/90 italic">{log.item}</span>
                                        </p>
                                        <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">{log.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 rounded-xl border border-white/5 text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 hover:bg-white/5 transition-all">
                            View All Logs
                        </button>
                    </div>

                    {/* Rebranding Notice */}
                    <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Plus size={80} strokeWidth={1} />
                        </div>
                        <h3 className="font-bold italic uppercase tracking-tighter">Urban Aura v1.2</h3>
                        <p className="text-xs text-white/50 mt-2 leading-relaxed">System core is now optimized for mobile inventory management and ultra-low latency response.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
