import Link from "next/link";
import { Instagram, Facebook, Twitter, Truck, RotateCcw, ShieldCheck, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border/50">

      {/* Trust badges row */}
      <div className="border-b border-border/40 py-6 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, label: "Free Shipping", sub: "Orders above LKR 5,000" },
              { icon: RotateCcw, label: "Easy Returns", sub: "15-day return policy" },
              { icon: ShieldCheck, label: "Secure Payment", sub: "SSL encrypted checkout" },
              { icon: MapPin, label: "Sri Lanka Made", sub: "Proudly local brand" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
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
      </div>

      {/* Main footer */}
      <div className="py-14 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-5">
            <h3 className="font-serif text-2xl font-bold">
              Urban<span className="text-primary">Aura</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Modern men&apos;s fashion with a blend of street style and everyday comfort.
            </p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>📞 <a href="tel:0741560507" className="text-foreground hover:text-primary transition-colors font-mono">0741560507</a></p>
              <p>✉ <a href="mailto:Thakshilavidhu@gmail.com" className="text-foreground hover:text-primary transition-colors break-all">Thakshilavidhu@gmail.com</a></p>
              <p>💬 <a href="https://wa.me/94741560507" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp Order</a></p>
            </div>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-5 text-foreground">Shop</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                { label: "T-Shirts", href: "/shop?category=tshirts" },
                { label: "Shirts", href: "/shop?category=shirts" },
                { label: "Slippers", href: "/shop?category=slippers" },
                { label: "Shoes", href: "/shop?category=shoes" },
                { label: "Watches", href: "/shop?category=watches" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-primary transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-5 text-foreground">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                { label: "Our Story", href: "/story" },
                { label: "Contact Us", href: "/contact" },
                { label: "My Account", href: "/auth/login" },
                { label: "Cart", href: "/cart" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-primary transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-5 text-foreground">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Subscribe for exclusive drops, early access, and 15% off your first order.
            </p>
            <div className="flex rounded-sm overflow-hidden border border-border/60 focus-within:border-primary transition-colors">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="bg-primary text-white px-4 text-xs font-bold uppercase tracking-wide shrink-0 hover:bg-primary/90 transition-colors">
                Join
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/40 py-5 container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Urban Aura. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-primary transition-colors">Terms of Use</Link>
          <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
        </div>
      </div>

    </footer>
  );
}