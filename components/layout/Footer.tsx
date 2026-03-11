import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-background border-t py-16">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-5">
            <h3 className="font-serif text-2xl font-bold">Urban Aura</h3>

            <p className="text-sm text-muted-foreground">
              Urban Aura brings modern men's fashion with a blend of street style
              and everyday comfort.
            </p>

            <p className="text-sm text-muted-foreground">
              WhatsApp Orders: +94 77 123 4567
            </p>

            <div className="flex gap-4">
              <Instagram className="cursor-pointer hover:text-primary" />
              <Facebook className="cursor-pointer hover:text-primary" />
              <Twitter className="cursor-pointer hover:text-primary" />
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Shop</h4>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop?category=tshirts">T-Shirts</Link></li>
              <li><Link href="/shop?category=shirts">Shirts</Link></li>
              <li><Link href="/shop?category=jeans">Jeans</Link></li>
              <li><Link href="/shop?category=sneakers">Sneakers</Link></li>
              <li><Link href="/shop?category=accessories">Accessories</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/story">Our Story</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/auth/login">My Account</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Newsletter</h4>

            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive updates about new arrivals and exclusive offers.
            </p>

            <div className="flex flex-col gap-3">
              <Input placeholder="Email Address" type="email" />
              <Button>Subscribe</Button>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Urban Aura. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="#">Terms</Link>
            <Link href="#">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}