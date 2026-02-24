"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login delay
        setTimeout(() => {
            router.push("/profile");
        }, 500);
    };

    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Left: Image Side */}
            <div className="hidden lg:block w-1/2 relative">
                <Image
                    src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1000&auto=format&fit=crop"
                    alt="Traditional Weaving"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-12 left-12 text-white max-w-lg">
                    <h2 className="font-serif text-4xl font-bold mb-4">Timeless Elegance,</h2>
                    <h2 className="font-serif text-4xl font-bold mb-6">Woven for You.</h2>
                    <p className="text-lg text-white/90">Experience the finest handloom collection.</p>
                </div>
            </div>

            {/* Right: Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background relative">
                <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Home
                </Link>

                <div className="w-full max-w-sm space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="font-serif text-3xl font-bold text-foreground">Welcome Back</h1>
                        <p className="text-muted-foreground">Sign in to your account to continue</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                                <Input id="email" type="email" placeholder="name@example.com" required className="h-11" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                                <Input id="password" type="password" required className="h-11" />
                            </div>
                        </div>
                        <Button className="w-full h-11 text-base" size="lg" type="submit">Sign In</Button>
                    </form>

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Don't have an account? </span>
                        <Link href="/auth/register" className="font-medium text-primary hover:underline underline-offset-4">
                            Register now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
