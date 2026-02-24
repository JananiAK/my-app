import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Heritage Textile"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle Grain/Texture overlay could go here */}
          <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container text-center text-white space-y-8 px-4">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight animate-fade-in-up">
            Resurrecting <br /> <span className="text-white italic font-light">Heritage</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-white/90 font-light tracking-wide animate-fade-in-up delay-[200ms]">
            Where centuries of craftsmanship meet contemporary grace.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-[400ms]">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-none px-8 h-12 text-base tracking-wide" asChild>
              <Link href="/shop">Explore Collection</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-none px-8 h-12 text-base tracking-wide" asChild>
              <Link href="/story">Our Philosophy</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block text-white/50">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* 2. Editorial Collections (Offset Layout) */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Curated Editions</h2>
            <div className="w-24 h-[1px] bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Collection 1 */}
            <div className="group cursor-pointer space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop"
                  alt="Royal Silk"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-end border-b border-muted pb-4">
                <div>
                  <h3 className="font-serif text-3xl font-medium">The Royal Silk</h3>
                  <p className="text-muted-foreground mt-1 text-lg">Banarasi & Kanchipuram</p>
                </div>
                <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>

            {/* Collection 2 - Offset */}
            <div className="group cursor-pointer space-y-4 md:mt-32">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1000&auto=format&fit=crop"
                  alt="Festive Glamour"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-end border-b border-muted pb-4">
                <div>
                  <h3 className="font-serif text-3xl font-medium">Festive Aura</h3>
                  <p className="text-muted-foreground mt-1 text-lg">Hand-embroidered Lehengas</p>
                </div>
                <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Text-First Story Section */}
      <section className="py-24 bg-accent/30">
        <div className="container mx-auto px-4 text-center max-w-4xl space-y-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">The Philosophy</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-tight text-foreground">
            We believe in the quiet dignity of <span className="text-primary italic">slow fashion</span>. Every thread tells a story of a village, a family, and a tradition.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border/50">
            {[
              { label: "Artisans", value: "50+" },
              { label: "Villages", value: "12" },
              { label: "Sourcing", value: "100%" },
              { label: "Quality", value: "Premium" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <h4 className="font-serif text-3xl font-bold">{stat.value}</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          <Button variant="link" size="lg" className="text-primary text-lg hover:no-underline hover:opacity-80" asChild>
            <Link href="/story">Read our full story &rarr;</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
