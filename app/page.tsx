"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, RotateCcw, ShieldCheck, Star, Truck } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// ── Countdown Timer hook ──────────────────────────────────────────────
function useCountdown(targetHours = 8) {
  const [time, setTime] = useState({ h: targetHours, m: 0, s: 0 });
  useEffect(() => {
    const end = Date.now() + targetHours * 3600 * 1000;
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [targetHours]);
  return time;
}

// ── Animated counter hook ─────────────────────────────────────────────
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return { count, ref };
}

// ── Category data ─────────────────────────────────────────────────────
const categories = [
  { name: "T-Shirts", href: "/shop?category=tshirts", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", span: "col-span-1" },
  { name: "Shirts", href: "/shop?category=shirts", img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop", span: "col-span-1" },
  { name: "Jeans", href: "/shop?category=jeans", img: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=800&auto=format&fit=crop", span: "col-span-1 md:col-span-2" },
  { name: "Sneakers", href: "/shop?category=sneakers", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop", span: "col-span-1" },
  { name: "Accessories", href: "/shop?category=accessories", img: "https://images.unsplash.com/photo-1611010344444-5f9e4d86a6d8?q=80&w=800&auto=format&fit=crop", span: "col-span-1" },
];

const trustFeatures = [
  { icon: Truck, label: "Free Delivery", sub: "Orders above LKR 5,000" },
  { icon: RotateCcw, label: "Easy Returns", sub: "15-day return policy" },
  { icon: ShieldCheck, label: "Secure Checkout", sub: "SSL encrypted payments" },
  { icon: Star, label: "4.9 / 5 Rating", sub: "From 10,000+ customers" },
];

const stats = [
  { value: 500, suffix: "+", label: "Products" },
  { value: 10000, suffix: "+", label: "Customers" },
  { value: 5, suffix: "★", label: "Rating" },
  { value: 2, suffix: " Days", label: "Delivery" },
];

const marqueeItems = [
  "🔥 NEW DROP", "URBAN TEES", "STREET RUNNERS", "EXCLUSIVE FITS",
  "🔥 NEW DROP", "URBAN TEES", "STREET RUNNERS", "EXCLUSIVE FITS",
];

// ── Stat counter component ────────────────────────────────────────────
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="text-center space-y-1">
      <span ref={ref} className="font-serif text-4xl md:text-5xl font-bold text-foreground">
        {count.toLocaleString()}{suffix}
      </span>
      <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">{label}</p>
    </div>
  );
}

export default function Home() {
  const countdown = useCountdown(8);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=2000&auto=format&fit=crop"
            alt="Men's Tailoring"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container text-center text-white space-y-8 px-4 mt-16">
          {/* "NEW DROP" badge */}
          <div className="animate-fade-in flex justify-center">
            <span className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-primary/50">
              <Zap className="w-3 h-3" /> Summer Drop 2026 — Now Live
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-none">
            <span className="block animate-fade-in-up">Define Your</span>
            <span className="block text-white italic font-light animate-fade-in-up delay-200">Aura.</span>
          </h1>

          <p className="max-w-xl mx-auto text-lg md:text-xl text-white/80 font-light tracking-wide animate-fade-in-up delay-400">
            Elite craftsmanship meets the raw energy of urban culture.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 h-13 text-sm tracking-[0.15em] uppercase font-bold shadow-2xl shadow-primary/40 transition-all hover:scale-105"
              asChild
            >
              <Link href="/shop">Shop Collection</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white/40 hover:bg-white hover:text-black rounded-full px-10 h-13 text-sm tracking-[0.15em] uppercase backdrop-blur-sm transition-all hover:scale-105"
              asChild
            >
              <Link href="/story">Our Craft</Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce-y">
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll</span>
        </div>
      </section>

      {/* ── 2. TRUST STRIP ──────────────────────────────────── */}
      <section className="py-5 bg-secondary/80 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-border/50">
            {trustFeatures.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 justify-center px-4">
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground tracking-wide">{label}</p>
                  <p className="text-[10px] text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SHOP BY CATEGORY ─────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Explore</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Shop by Category</h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                href={cat.href}
                className={`group relative overflow-hidden rounded-sm bg-secondary/50 ${cat.span} ${i === 0 ? "row-span-2 md:row-span-1" : ""}`}
              >
                <div className={`relative w-full overflow-hidden ${i === 2 ? "aspect-[2/1]" : "aspect-[4/5]"}`}>
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-white">{cat.name}</h3>
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white text-xs group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. MARQUEE TICKER ───────────────────────────────── */}
      <div className="py-4 bg-primary overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="flex gap-12 animate-marquee shrink-0">
            {marqueeItems.map((item, i) => (
              <span key={i} className="text-white text-sm font-bold uppercase tracking-[0.3em] font-mono">{item}</span>
            ))}
          </div>
          <div className="flex gap-12 animate-marquee shrink-0" aria-hidden>
            {marqueeItems.map((item, i) => (
              <span key={i} className="text-white text-sm font-bold uppercase tracking-[0.3em] font-mono">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. FLASH SALE / FEATURED DROP ───────────────────── */}
      <section className="py-24 bg-secondary/30 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm group">
              <Image
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop"
                alt="Limited Drop"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-white text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                  🔥 Limited Drop
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Flash Sale</p>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  The Urban<br />
                  <span className="text-primary italic">Essentials</span><br />
                  Collection
                </h2>
                <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-md">
                  Premium heavyweight tees, crafted from 300gsm organic cotton. Built for the streets, designed for life.
                </p>
              </div>

              {/* Countdown */}
              <div className="space-y-3">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Sale Ends In:</p>
                <div className="flex items-center gap-3">
                  {[
                    { val: pad(countdown.h), label: "HRS" },
                    { val: pad(countdown.m), label: "MIN" },
                    { val: pad(countdown.s), label: "SEC" },
                  ].map(({ val, label }, i) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="bg-secondary border border-border/60 rounded-sm w-16 h-16 flex flex-col items-center justify-center">
                        <span className="font-mono text-2xl font-bold text-foreground">{val}</span>
                        <span className="text-[9px] text-muted-foreground uppercase tracking-widest">{label}</span>
                      </div>
                      {i < 2 && <span className="text-primary font-bold text-xl">:</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 h-13 uppercase tracking-[0.2em] text-xs font-bold shadow-2xl shadow-primary/30 transition-all hover:scale-105"
                  asChild
                >
                  <Link href="/shop">Grab It Now <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </div>

              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
                ⚡ Only 24 units left — Don&apos;t miss out
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. EDITORIAL COLLECTIONS ────────────────────────── */}
      <section className="py-24 md:py-32 bg-background border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Collections</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">The Essentials</h2>
            <div className="w-24 h-[2px] bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Collection 1 */}
            <Link href="/shop?category=tshirts" className="group cursor-pointer space-y-4 block">
              <div className="relative aspect-[4/5] overflow-hidden border border-border/50 rounded-sm">
                <Image
                  src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop"
                  alt="Bespoke Suiting"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="bg-primary text-white text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                    Shop Now
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-end border-b border-muted pb-4">
                <div>
                  <h3 className="font-serif text-3xl font-medium text-foreground">Urban Tees</h3>
                  <p className="text-muted-foreground mt-1 text-lg">Heavyweight Organic Cotton</p>
                </div>
                <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 text-primary transition-transform duration-300" />
              </div>
            </Link>

            {/* Collection 2 */}
            <Link href="/shop?category=sneakers" className="group cursor-pointer space-y-4 md:mt-32 block">
              <div className="relative aspect-[4/5] overflow-hidden border border-border/50 rounded-sm">
                <Image
                  src="https://images.unsplash.com/photo-1550614000-4b95d4668f12?q=80&w=1000&auto=format&fit=crop"
                  alt="Urban Essentials"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="bg-primary text-white text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                    Shop Now
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-end border-b border-muted pb-4">
                <div>
                  <h3 className="font-serif text-3xl font-medium text-foreground">Street Runners</h3>
                  <p className="text-muted-foreground mt-1 text-lg">Engineered for the Metropolitan Move</p>
                </div>
                <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 text-primary transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. OUR CRAFT / STATS ─────────────────────────────── */}
      <section className="py-24 bg-secondary/20 border-t border-border/50">
        <div className="container mx-auto px-4 text-center max-w-4xl space-y-14">
          <div className="space-y-6">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Our Craft</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-tight text-foreground">
              Mastery in every <span className="text-primary italic">stitch</span>.<br />
              Confidence in every step.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border/50">
            {stats.map(({ value, suffix, label }) => (
              <StatCounter key={label} value={value} suffix={suffix} label={label} />
            ))}
          </div>

          <Link
            href="/story"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium uppercase tracking-[0.2em] transition-colors group"
          >
            Discover our standards
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
}
