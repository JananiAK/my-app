"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, Send, Clock, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => { setLoading(false); setSent(true); }, 1000);
    };

    return (
        <div className="min-h-screen bg-background">

            {/* Header */}
            <div className="relative bg-secondary/20 py-20 border-b border-border/50 overflow-hidden">
                <div className="absolute -right-32 top-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold font-mono mb-3">Reach Out</p>
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">Get in Touch</h1>
                    <p className="text-muted-foreground text-lg font-light mt-4 max-w-lg">
                        Questions about your order, sizing, or collections? We're happy to help.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-14 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12">

                    {/* Contact Info */}
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h2 className="font-serif text-2xl font-bold mb-2">Contact Details</h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Reach us directly — we usually respond within a few hours.
                            </p>
                        </div>

                        <div className="space-y-5">
                            {[
                                {
                                    icon: Phone,
                                    label: "Call / WhatsApp",
                                    value: "0741560507",
                                    href: "tel:0741560507",
                                    note: "Mon–Sat, 9am–7pm"
                                },
                                {
                                    icon: Mail,
                                    label: "Email",
                                    value: "Thakshilavidhu@gmail.com",
                                    href: "mailto:Thakshilavidhu@gmail.com",
                                    note: "Response within 24hrs"
                                },
                                {
                                    icon: MessageCircle,
                                    label: "WhatsApp Order",
                                    value: "Chat with us",
                                    href: "https://wa.me/94741560507",
                                    note: "Direct order via chat"
                                },
                            ].map(({ icon: Icon, label, value, href, note }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-4 p-4 rounded-sm border border-border/50 bg-secondary/10 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-all">
                                        <Icon className="w-4.5 h-4.5 text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold font-mono">{label}</p>
                                        <p className="text-sm font-semibold text-foreground mt-0.5">{value}</p>
                                        <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {note}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Business categories */}
                        <div className="bg-secondary/10 border border-border/50 rounded-sm p-5 space-y-3">
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold font-mono">We Sell</p>
                            <div className="flex flex-wrap gap-2">
                                {["T-Shirts", "Shirts", "Slippers", "Shoes", "Watches"].map(cat => (
                                    <span key={cat} className="text-[9px] uppercase tracking-wide bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-sm font-bold">
                                        {cat}
                                    </span>
                                ))}
                            </div>
                            <p className="text-[10px] text-muted-foreground">🚚 Online delivery · 💳 Online payment</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="md:col-span-3">
                        {sent ? (
                            <div className="flex flex-col items-center justify-center gap-6 h-full min-h-[400px] border border-border/50 rounded-sm bg-secondary/10 text-center px-8">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-2xl font-bold mb-2">Message Sent!</h3>
                                    <p className="text-muted-foreground">
                                        We&apos;ve received your message and will get back to you shortly at{" "}
                                        <strong className="text-primary">Thakshilavidhu@gmail.com</strong>
                                    </p>
                                </div>
                                <button onClick={() => setSent(false)} className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest font-medium">
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { id: "name", label: "Your Name", placeholder: "Full name", type: "text" },
                                        { id: "email", label: "Email Address", placeholder: "email@example.com", type: "email" },
                                    ].map(({ id, label, placeholder, type }) => (
                                        <div key={id} className="space-y-1.5">
                                            <label htmlFor={id} className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground font-mono">
                                                {label}
                                            </label>
                                            <input
                                                id={id}
                                                type={type}
                                                required
                                                placeholder={placeholder}
                                                className="w-full bg-secondary/20 border border-border/60 rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/60"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="phone" className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground font-mono">
                                        Phone Number (optional)
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="Your phone"
                                        className="w-full bg-secondary/20 border border-border/60 rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/60"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="subject" className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground font-mono">
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        className="w-full bg-secondary/20 border border-border/60 rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors text-foreground"
                                    >
                                        <option value="">Select a topic...</option>
                                        <option>Order / Delivery Inquiry</option>
                                        <option>Product Question</option>
                                        <option>Return / Exchange</option>
                                        <option>Payment Issue</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="message" className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground font-mono">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={5}
                                        placeholder="Write your message here..."
                                        className="w-full bg-secondary/20 border border-border/60 rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/60 resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 bg-primary text-white rounded-sm uppercase tracking-[0.2em] text-xs font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
