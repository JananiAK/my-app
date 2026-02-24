import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
    return (
        <footer className="bg-secondary/10 border-t">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-2xl font-bold text-primary">Harahs Threads Thistle</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Celebrating heritage through timeless elegance. Handcrafted traditional wear for the modern soul.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </div>
                    </div>

                    {/* Shop */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Shop</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/shop/sarees" className="hover:text-primary transition-colors">Sarees</Link></li>
                            <li><Link href="/shop/kurtis" className="hover:text-primary transition-colors">Kurtis</Link></li>
                            <li><Link href="/shop/lehengas" className="hover:text-primary transition-colors">Lehengas</Link></li>
                            <li><Link href="/shop/suits" className="hover:text-primary transition-colors">Salwar Suits</Link></li>
                            <li><Link href="/shop/new-arrivals" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                            <li><Link href="/sustainability" className="hover:text-primary transition-colors">Sustainability</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Stay Connected</h4>
                        <p className="text-sm text-muted-foreground">
                            Subscribe to our newsletter for exclusive offers and updates.
                        </p>
                        <div className="flex flex-col gap-2">
                            <Input type="email" placeholder="Enter your email" className="bg-background" />
                            <Button>Subscribe</Button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Harahs Threads Thistle. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
