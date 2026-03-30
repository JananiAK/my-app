import Link from "next/link";
import Image from "next/image";
import { products, categories } from "@/lib/data";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function Home() {
  const featured = products.slice(0, 4);

  // Fallback images for category cards
  const catImages: Record<string, string> = {
    "T-shirts": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    "Shirts": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    "Slippers": "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=800&auto=format&fit=crop",
    "Shoes": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    "Watches": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop"
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center text-white space-y-8 mt-16">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none">
            OWN <span className="text-red-600 block md:inline mt-2 md:mt-0">YOUR</span> AURA.
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-2xl text-gray-300 font-light tracking-wide uppercase">
            Redefining streetwear essentials.
          </p>
          <div className="pt-8 flex gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-xs px-10 py-5 rounded-sm transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] flex items-center gap-2"
            >
              Shop Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="py-24 bg-black border-y border-red-900/20">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-red-600 text-xs font-mono uppercase tracking-[0.3em] mb-2">Explore</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white">The Categories</h2>
            </div>
            <Link href="/shop" className="text-red-500 hover:text-red-400 text-sm font-medium uppercase tracking-widest hidden md:flex items-center gap-1 group">
              View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.filter(c => c !== "All").map((cat) => (
              <Link key={cat} href={`/shop?category=${cat}`} className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-zinc-900 border border-white/5 hover:border-red-600/50 transition-colors">
                <Image src={catImages[cat] || products[0].image} alt={cat} fill className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                <div className="absolute inset-0 flex items-end p-6 z-20">
                  <span className="text-white font-serif text-2xl group-hover:text-red-500 transition-colors">{cat}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <p className="text-red-600 text-xs font-mono uppercase tracking-[0.3em]">Curated For You</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">Featured Drops</h2>
            <div className="w-16 h-[2px] bg-red-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((p) => (
              <Link href={`/product/${p.id}`} key={p.id} className="group flex flex-col gap-4">
                <div className="relative aspect-[4/5] bg-secondary overflow-hidden rounded-sm border border-white/5 group-hover:border-red-600/30 transition-colors">
                  <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80 to-transparent">
                    <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 w-full text-center block rounded-sm">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-red-500 uppercase tracking-widest font-mono">{p.category}</p>
                  <h3 className="font-serif text-lg text-white group-hover:text-red-400 transition-colors">{p.name}</h3>
                  <p className="text-gray-400 font-mono">LKR {p.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
