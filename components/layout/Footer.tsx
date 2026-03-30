import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-red-900/20 text-gray-400 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif text-2xl font-bold text-white mb-4"><span className="text-red-600">Urban</span>Aura</h3>
          <p className="text-sm leading-relaxed max-w-sm">
            Own Your Aura. Premium quality fashion for the modern individual. Experience seamless shopping delivered straight to your door.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-red-500 transition">Home</Link>
            <Link href="/shop" className="hover:text-red-500 transition">Shop</Link>
            <Link href="/contact" className="hover:text-red-500 transition">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-4">Support</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/contact" className="hover:text-red-500 transition">Contact Us</Link>
            <a href="https://wa.me/94770000000" className="hover:text-red-500 transition">WhatsApp Support</a>
            <a href="https://instagram.com" className="hover:text-red-500 transition">Instagram</a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 text-center mt-12 pt-8 border-t border-white/5 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Urban Aura. All rights reserved.
      </div>
    </footer>
  );
}