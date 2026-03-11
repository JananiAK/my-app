'use client';

import { useState } from 'react';
import { Settings, User, Bell, Shield, Palette, Globe, Save } from 'lucide-react';

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState('General');

    const tabs = [
        { name: 'General', icon: Settings },
        { name: 'Profile', icon: User },
        { name: 'Notifications', icon: Bell },
        { name: 'Security', icon: Shield },
        { name: 'Appearance', icon: Palette },
        { name: 'Regional', icon: Globe },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-white/50 mt-1">Manage your store configuration and administrative preferences.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Tabs */}
                <aside className="lg:w-64 shrink-0 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium whitespace-nowrap ${activeTab === tab.name
                                    ? "bg-white text-black"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.name}
                        </button>
                    ))}
                </aside>

                {/* Content */}
                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8">
                    <div className="border-b border-white/10 pb-6">
                        <h2 className="text-xl font-bold">{activeTab} Settings</h2>
                        <p className="text-sm text-white/50 mt-1 italic">Configure the core aspects of your administrative interface.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/50">Store Name</label>
                                <input
                                    type="text"
                                    defaultValue="Urban Aura"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-white/30 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/50">Support Email</label>
                                <input
                                    type="email"
                                    defaultValue="admin@urbanaura.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-white/30 transition-all font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/50">Store Description</label>
                            <textarea
                                rows={4}
                                defaultValue="Premium streetwear and experimental silhouettes for the modern vanguard."
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-white/30 transition-all resize-none"
                            ></textarea>
                        </div>

                        <div className="pt-6 border-t border-white/10 flex justify-end">
                            <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                <Save size={20} />
                                Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Placeholder for other tabs */}
                    {activeTab !== 'General' && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                            <div className="text-center space-y-2">
                                <p className="text-xl font-bold italic tracking-tighter uppercase">Module Under Construction</p>
                                <p className="text-white/50 text-sm">This setting tab will be functional in the next drop.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
