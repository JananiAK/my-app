import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=2000&auto=format&fit=crop"
            alt="Men's Tailoring"
            fill
            className="object-cover opacity-70"
            priority
          />
          {/* Subtle Grain/Texture overlay could go here */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container text-center text-white space-y-8 px-4 mt-20">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight animate-fade-in-up">
            Define Your <br /> <span className="text-white italic font-light">Aura</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-white/80 font-light tracking-wide animate-fade-in-up delay-[200ms]">
            Elite craftsmanship meets the raw energy of urban culture.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-[400ms]">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm px-8 h-12 text-base tracking-wide font-medium" asChild>
              <Link href="/shop">Shop Collection</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white hover:text-black rounded-sm px-8 h-12 text-base tracking-wide" asChild>
              <Link href="/story">Our Craft</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block text-white/50">
          <span className="text-xs uppercase tracking-widest font-mono">Explore</span>
        </div>
      </section>

      {/* 2. Editorial Collections (Offset Layout) */}
      <section className="py-24 md:py-32 bg-background border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">The Essentials</h2>
            <div className="w-24 h-[2px] bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Collection 1 */}
            <div className="group cursor-pointer space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden border border-border/50 rounded-sm">
                <Image
                  src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop"
                  alt="Bespoke Suiting"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              </div>
              <div className="flex justify-between items-end border-b border-muted pb-4">
                <div>
                  <h3 className="font-serif text-3xl font-medium text-foreground">Urban Tees</h3>
                  <p className="text-muted-foreground mt-1 text-lg">Heavyweight Organic Cotton</p>
                </div>
                <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 text-primary transition-transform duration-300" />
              </div>
            </div>

            {/* Collection 2 - Offset */}
            <div className="group cursor-pointer space-y-4 md:mt-32">
              <div className="relative aspect-[4/5] overflow-hidden border border-border/50 rounded-sm">
                <Image
                  src="https://images.unsplash.com/photo-1550614000-4b95d4668f12?q=80&w=1000&auto=format&fit=crop"
                  alt="Urban Essentials"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              </div>
              <div className="flex justify-between items-end border-b border-muted pb-4">
                <div>
                  <h3 className="font-serif text-3xl font-medium text-foreground">Street Runners</h3>
                  <p className="text-muted-foreground mt-1 text-lg">Engineered for the Metropolitan Move</p>
                </div>
                <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 text-primary transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Text-First Story Section */}
      <section className="py-24 bg-accent/10 border-t border-border/50">
        <div className="container mx-auto px-4 text-center max-w-4xl space-y-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary font-mono">Our Craft</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-tight text-foreground">
            Mastery in every <span className="text-primary italic">stitch</span>. Confidence in every step.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border/50">
            {[
              { label: "Fabric", value: "Premium" },
              { label: "Fit", value: "Flawless" },
              { label: "Design", value: "Timeless" },
              { label: "Detail", value: "Precise" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <h4 className="font-serif text-3xl font-bold text-foreground">{stat.value}</h4>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">{stat.label}</p>
              </div>
            ))}
          </div>

          <Button variant="link" size="lg" className="text-primary text-lg hover:no-underline hover:text-primary/80 transition-colors" asChild>
            <Link href="/story">Discover our standards &rarr;</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
