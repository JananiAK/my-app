"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/profile");
    }, 800);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">

      {/* Left: Image Side */}
      <div className="hidden lg:flex w-1/2 relative flex-col">
        <Image
          src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1000&auto=format&fit=crop"
          alt="Urban Fashion"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Brand top-left */}
        <div className="relative z-10 p-10">
          <span className="font-serif text-2xl font-bold text-white">
            Urban<span className="text-primary">Aura</span>
          </span>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10 mt-auto p-10 text-white">
          <div className="space-y-3 max-w-sm">
            <div className="w-10 h-0.5 bg-primary" />
            <h2 className="font-serif text-4xl font-bold leading-tight">
              Timeless Elegance,<br />Built for You.
            </h2>
            <p className="text-white/80 text-lg font-light">
              Experience premium men&apos;s fashion crafted for the modern gentleman.
            </p>
            <div className="flex gap-1 mt-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="w-1.5 h-1.5 rounded-full bg-primary" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background relative overflow-y-auto">
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>

        <div className="w-full max-w-sm space-y-8">

          {/* Header */}
          <div className="space-y-2">
            <div className="lg:hidden font-serif text-xl font-bold mb-4">
              Urban<span className="text-primary">Aura</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground text-sm">Sign in to your account to continue shopping.</p>
          </div>

          {/* Google Sign-in (UI only) */}
          <button
            type="button"
            className="w-full h-11 flex items-center justify-center gap-3 border border-border/60 rounded-sm text-sm font-medium hover:border-foreground/40 hover:bg-secondary/30 transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-border/60" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">or</span>
            <div className="flex-1 h-px bg-border/60" />
          </div>

          {/* Email/Password Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={form.email}
                onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full h-11 bg-secondary/20 border border-border/60 rounded-sm px-4 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/60"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full h-11 bg-secondary/20 border border-border/60 rounded-sm px-4 pr-11 text-sm outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm(f => ({ ...f, remember: e.target.checked }))}
                  className="w-3.5 h-3.5 accent-primary cursor-pointer"
                />
                <span className="group-hover:text-foreground transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full h-12 rounded-sm text-xs uppercase tracking-[0.2em] font-bold shadow-xl shadow-primary/20 transition-all",
                loading ? "bg-primary/70" : "bg-primary hover:bg-primary/90"
              )}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : "Sign In"}
            </Button>
          </form>

          {/* Register */}
          <div className="text-center text-sm pt-2">
            <span className="text-muted-foreground">Don&apos;t have an account? </span>
            <Link href="/auth/register" className="font-bold text-primary hover:text-primary/80 transition-colors underline underline-offset-4">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
