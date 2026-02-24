"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            router.push("/profile");
        }, 500);
    };

    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Left: Image Side */}
            <div className="hidden lg:block w-1/2 relative">
                <Image
                    src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1000&auto=format&fit=crop" // Different image for variety
                    alt="Heritage Fashion"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-12 left-12 text-white max-w-lg">
                    <h2 className="font-serif text-4xl font-bold mb-4">Join Our Community</h2>
                    <p className="text-lg text-white/90">Exclusive access to limited edition handlooms.</p>
                </div>
            </div>

            {/* Right: Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background relative overflow-y-auto">
                <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Home
                </Link>

                <div className="w-full max-w-sm space-y-8 my-auto">
                    <div className="text-center space-y-2">
                        <h1 className="font-serif text-3xl font-bold text-foreground">Create Account</h1>
                        <p className="text-muted-foreground">Begin your journey with us</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleRegister}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                                <Input id="firstName" placeholder="John" required className="h-11" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                                <Input id="lastName" placeholder="Doe" required className="h-11" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input id="email" type="email" placeholder="name@example.com" required className="h-11" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">Password</label>
                            <Input id="password" type="password" required className="h-11" />
                        </div>

                        <Button className="w-full h-11 text-base mt-2" size="lg" type="submit">Create Account</Button>
                    </form>

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link href="/auth/login" className="font-medium text-primary hover:underline underline-offset-4">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
