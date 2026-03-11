'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, X, Plus, Upload, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProductFormProps {
    productId?: string;
}

export default function ProductForm({ productId }: ProductFormProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!productId);
    const [uploading, setUploading] = useState(false);

    const [categories, setCategories] = useState<string[]>(["T-shirts", "Shirts", "Slippers", "Shoes", "Watches"]);
    const [showNewCategory, setShowNewCategory] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        category: 'T-shirts',
        image: '',
        description: '',
        stock: 10,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White']
    });

    const sizePresets = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
    const colorPresets = ["Black", "White", "Navy", "Red", "Grey", "Beige", "Olive", "Charcoal"];

    useEffect(() => {
        fetchCategories();
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProduct = async () => {
        try {
            const res = await fetch(`/api/products/${productId}`);
            const data = await res.json();
            if (res.ok) {
                setFormData(data);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setFetching(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadData,
            });
            const data = await res.json();
            if (res.ok) {
                setFormData(prev => ({ ...prev, image: data.url }));
            } else {
                alert(data.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const submissionData = { ...formData };
        if (showNewCategory && newCategory) {
            submissionData.category = newCategory;
        }

        try {
            const url = productId ? `/api/products/${productId}` : '/api/products';
            const method = productId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            if (res.ok) {
                router.push('/admin');
                router.refresh();
            }
        } catch (error) {
            console.error('Error saving product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleArrayInput = (field: 'sizes' | 'colors', value: string) => {
        if (!value || formData[field].includes(value)) return;
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], value]
        }));
    };

    const removeArrayItem = (field: 'sizes' | 'colors', index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    if (fetching) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <Loader2 className="animate-spin text-white/50" size={40} />
                <p className="text-white/50">Fetching product details...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight italic uppercase">
                        {productId ? 'Update Asset' : 'New Drop Registration'}
                    </h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Basics */}
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                        <h2 className="text-lg font-semibold border-b border-white/10 pb-4 uppercase tracking-tighter italic">Basic Specifications</h2>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Identifier / Name</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-white/30 transition-all font-medium"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Noir Stealth Tee"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Pricing (LKR)</label>
                                <input
                                    required
                                    type="number"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-white/30 transition-all font-mono"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Inventory Count</label>
                                <input
                                    required
                                    type="number"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-white/30 transition-all font-mono"
                                    value={formData.stock}
                                    onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Category Classification</label>
                            <div className="flex gap-2">
                                {!showNewCategory ? (
                                    <>
                                        <select
                                            className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-white/30 transition-all appearance-none"
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                                            ))}
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() => setShowNewCategory(true)}
                                            className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-white/50"
                                            title="Add New Category"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            autoFocus
                                            type="text"
                                            className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-white/30"
                                            placeholder="Enter new category..."
                                            value={newCategory}
                                            onChange={e => setNewCategory(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowNewCategory(false);
                                                setNewCategory('');
                                            }}
                                            className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-red-400"
                                        >
                                            <X size={20} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-6">
                        <h2 className="text-lg font-semibold border-b border-white/10 pb-4 uppercase tracking-tighter italic">Structural Variants</h2>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Dimensions / Sizes</label>
                                <div className="flex flex-wrap gap-2">
                                    {sizePresets.map(size => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => handleArrayInput('sizes', size)}
                                            className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-bold border transition-all uppercase tracking-widest",
                                                formData.sizes.includes(size)
                                                    ? "bg-white text-black border-white"
                                                    : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                                    {formData.sizes.map((size, i) => (
                                        <span key={i} className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                                            {size}
                                            <button type="button" onClick={() => removeArrayItem('sizes', i)} className="text-white/40 hover:text-red-400">
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        className="bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-widest w-20 placeholder:text-white/10"
                                        placeholder="+ CUSTOM"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleArrayInput('sizes', (e.target as HTMLInputElement).value);
                                                (e.target as HTMLInputElement).value = '';
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-white/10">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Chromatics / Colors</label>
                                <div className="flex flex-wrap gap-2">
                                    {colorPresets.map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => handleArrayInput('colors', color)}
                                            className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-bold border transition-all uppercase tracking-widest",
                                                formData.colors.includes(color)
                                                    ? "bg-white text-black border-white"
                                                    : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                                            )}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                                    {formData.colors.map((color, i) => (
                                        <span key={i} className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                                            {color}
                                            <button type="button" onClick={() => removeArrayItem('colors', i)} className="text-white/40 hover:text-red-400">
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        className="bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-widest w-20 placeholder:text-white/10"
                                        placeholder="+ CUSTOM"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleArrayInput('colors', (e.target as HTMLInputElement).value);
                                                (e.target as HTMLInputElement).value = '';
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Media & Desc */}
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                        <h2 className="text-lg font-semibold border-b border-white/10 pb-4 uppercase tracking-tighter italic">Visual Assets</h2>

                        <div
                            className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-white/10 hover:border-white/20 transition-all flex flex-col items-center justify-center gap-4 cursor-pointer bg-black/40"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {uploading ? (
                                <div className="flex flex-col items-center gap-2">
                                    <Loader2 className="animate-spin text-white/50" size={32} />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 italic">Processing Upload...</span>
                                </div>
                            ) : formData.image ? (
                                <>
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                        <div className="flex flex-col items-center gap-2">
                                            <Upload className="text-white" size={32} />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] italic">Replace Manifest</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-white/40 group-hover:scale-110 transition-all">
                                        <Plus size={32} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] italic">Upload Visual Asset</p>
                                        <p className="text-[8px] uppercase tracking-widest text-white/20 mt-1">RAW / PNG / JPEG / WEBP</p>
                                    </div>
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileUpload}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Manual Manifest URL (Alternative)</label>
                            <div className="relative">
                                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                                <input
                                    type="url"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-10 outline-none focus:border-white/30 transition-all font-mono text-[10px]"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://cloud.urbanaura.com/assets/noir-01.jpg"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                        <h2 className="text-lg font-semibold border-b border-white/10 pb-4 uppercase tracking-tighter italic">Technical Narrative</h2>
                        <textarea
                            required
                            rows={6}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-white/30 transition-all resize-none text-sm leading-relaxed"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Detail the composite materials, architectural fit, and design intent..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-bold text-lg hover:bg-white/90 disabled:opacity-50 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-[0.98] uppercase italic"
                    >
                        {loading ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                        {productId ? 'Execute Manifest Update' : 'Register New Drop'}
                    </button>
                </div>
            </form>
        </div>
    );
}
