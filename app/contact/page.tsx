import Link from "next/link";
import { ArrowRight, Phone, Instagram } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <p className="text-red-600 text-xs font-mono uppercase tracking-[0.3em]">Reach Out</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white">Contact Us</h1>
          <div className="w-16 h-[2px] bg-red-600 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Details */}
          <div className="bg-zinc-900 border border-white/5 p-10 rounded-sm space-y-8">
            <h2 className="font-serif text-3xl text-white">Get in touch</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Have questions about our upcoming drops, need help with sizes, or checking on an order? We&apos;re here for you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-black flex items-center justify-center rounded-full border border-white/10 shrink-0">
                  <Phone className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-mono text-gray-500 mb-1">WhatsApp Support</p>
                  <a href="https://wa.me/94770000000" className="text-white hover:text-red-500 transition-colors text-lg">+94 77 000 0000</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-black flex items-center justify-center rounded-full border border-white/10 shrink-0">
                  <Instagram className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-mono text-gray-500 mb-1">Follow Us</p>
                  <a href="https://instagram.com/urbanaura" target="_blank" rel="noreferrer" className="text-white hover:text-red-500 transition-colors text-lg">@urbanaura</a>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-zinc-900 border border-red-900/30 p-10 rounded-sm flex flex-col justify-center space-y-6">
            <h2 className="font-serif text-3xl text-white">The Brand</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Urban Aura is more than a clothing line; it&apos;s a lifestyle. Born from the streets and elevated by meticulous craftsmanship, our collections are strictly curated.
            </p>
            <p className="text-gray-400 font-light leading-relaxed">
              By fulfilling orders directly via WhatsApp, we maintain a personal connection with our community. Exclusive drops, immediate support, and absolute authenticity.
            </p>
            <Link href="/shop" className="inline-flex items-center gap-2 text-red-500 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest mt-4">
              Explore Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
