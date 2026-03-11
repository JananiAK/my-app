"use client";

import { Button } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, CreditCard, Phone, Truck, CheckCircle2, ChevronRight } from "lucide-react";

type Step = 1 | 2 | 3;
type PaymentMethod = "card" | "cod" | "whatsapp";

const steps = ["Shipping", "Payment", "Confirm"];

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", zip: "", country: "Sri Lanka",
  });
  const [ordered, setOrdered] = useState(false);

  const handleField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleOrder = () => {
    setOrdered(true);
    clearCart();
  };

  if (ordered) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-lg mx-auto py-24">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <div className="space-y-3">
            <h1 className="font-serif text-4xl font-bold text-foreground">Order Confirmed! 🎉</h1>
            <p className="text-muted-foreground text-lg font-light">
              Thank you for your purchase. We&apos;ll send you a confirmation email shortly.
            </p>
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Order #UA-{Math.random().toString(36).slice(2, 8).toUpperCase()}
            </p>
          </div>
          <div className="bg-secondary/20 border border-border/50 rounded-sm p-6 text-left space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">What&apos;s next?</p>
            {["We&apos;re preparing your order", "You&apos;ll get a tracking link via email", "Delivered within 2–5 business days"].map((s, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: s }} />
              </div>
            ))}
          </div>
          <Button className="h-12 px-10 bg-primary text-white rounded-sm uppercase tracking-wider text-xs font-bold" asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 py-10 max-w-5xl">

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-0">
            {steps.map((s, i) => {
              const n = (i + 1) as Step;
              const active = step === n;
              const done = step > n;
              return (
                <div key={s} className="flex items-center">
                  <div className={cn(
                    "flex flex-col items-center gap-1.5 transition-all",
                    active && "scale-105"
                  )}>
                    <div className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all",
                      active ? "border-primary bg-primary text-white shadow-lg shadow-primary/30"
                        : done ? "border-green-500 bg-green-500 text-white"
                          : "border-border text-muted-foreground"
                    )}>
                      {done ? "✓" : n}
                    </div>
                    <span className={cn(
                      "text-[10px] uppercase tracking-widest font-bold hidden sm:block",
                      active ? "text-primary" : done ? "text-green-500" : "text-muted-foreground"
                    )}>{s}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={cn(
                      "h-0.5 w-16 sm:w-24 mx-2 transition-all",
                      done ? "bg-green-500" : "bg-border/60"
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Form Panel */}
          <div className="lg:col-span-7 space-y-6">

            {/* Step 1 — Shipping */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold mb-1">Shipping Information</h2>
                  <p className="text-muted-foreground text-sm">Where should we send your order?</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "firstName", placeholder: "First Name" },
                    { name: "lastName", placeholder: "Last Name" },
                  ].map(({ name, placeholder }) => (
                    <div key={name} className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{placeholder}</label>
                      <input
                        name={name}
                        value={form[name as keyof typeof form]}
                        onChange={handleField}
                        placeholder={placeholder}
                        className="w-full bg-secondary/20 border border-border/60 rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  ))}
                </div>

                {[
                  { name: "email", placeholder: "Email Address", type: "email" },
                  { name: "phone", placeholder: "Phone Number", type: "tel" },
                  { name: "address", placeholder: "Street Address", type: "text" },
                ].map(({ name, placeholder, type }) => (
                  <div key={name} className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{placeholder}</label>
                    <input
                      name={name}
                      type={type}
                      value={form[name as keyof typeof form]}
                      onChange={handleField}
                      placeholder={placeholder}
                      className="w-full bg-secondary/20 border border-border/60 rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                    />
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "city", placeholder: "City" },
                    { name: "zip", placeholder: "Postal Code" },
                  ].map(({ name, placeholder }) => (
                    <div key={name} className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{placeholder}</label>
                      <input
                        name={name}
                        value={form[name as keyof typeof form]}
                        onChange={handleField}
                        placeholder={placeholder}
                        className="w-full bg-secondary/20 border border-border/60 rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full h-13 bg-primary text-white hover:bg-primary/90 rounded-sm uppercase tracking-[0.2em] text-xs font-bold shadow-xl shadow-primary/20"
                  onClick={() => setStep(2)}
                >
                  Continue to Payment <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}

            {/* Step 2 — Payment */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold mb-1">Payment Method</h2>
                  <p className="text-muted-foreground text-sm">Choose how you&apos;d like to pay.</p>
                </div>

                <div className="space-y-3">
                  {([
                    { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, Amex", icon: CreditCard },
                    { id: "cod", label: "Cash on Delivery", sub: "Pay when you receive", icon: Truck },
                    { id: "whatsapp", label: "WhatsApp Order", sub: "Chat with us directly", icon: Phone },
                  ] as const).map(({ id, label, sub, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setPaymentMethod(id)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-sm border-2 text-left transition-all",
                        paymentMethod === id
                          ? "border-primary bg-primary/5"
                          : "border-border/50 hover:border-border"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all",
                        paymentMethod === id ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">{label}</p>
                        <p className="text-xs text-muted-foreground">{sub}</p>
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                        paymentMethod === id ? "border-primary bg-primary" : "border-border"
                      )}>
                        {paymentMethod === id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4 p-4 bg-secondary/20 border border-border/50 rounded-sm">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Card Number</label>
                      <input placeholder="1234 5678 9012 3456" className="w-full bg-background border border-border/60 rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Expiry</label>
                        <input placeholder="MM / YY" className="w-full bg-background border border-border/60 rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors font-mono" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">CVV</label>
                        <input placeholder="•••" type="password" className="w-full bg-background border border-border/60 rounded-sm px-4 py-3 text-sm outline-none focus:border-primary transition-colors font-mono" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 h-12 rounded-sm uppercase tracking-wide text-xs font-bold" onClick={() => setStep(1)}>
                    ← Back
                  </Button>
                  <Button className="flex-1 h-12 bg-primary text-white hover:bg-primary/90 rounded-sm uppercase tracking-wide text-xs font-bold shadow-xl shadow-primary/20" onClick={() => setStep(3)}>
                    Review Order →
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3 — Confirm */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold mb-1">Review & Confirm</h2>
                  <p className="text-muted-foreground text-sm">Almost there — review your order details.</p>
                </div>

                <div className="bg-secondary/10 border border-border/50 rounded-sm p-5 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Shipping To</p>
                  <p className="text-sm">{form.firstName} {form.lastName}</p>
                  <p className="text-sm text-muted-foreground">{form.address}, {form.city} {form.zip}</p>
                  <p className="text-sm text-muted-foreground">{form.email} · {form.phone}</p>
                </div>

                <div className="bg-secondary/10 border border-border/50 rounded-sm p-5 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Payment</p>
                  <p className="text-sm capitalize">{paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "whatsapp" ? "WhatsApp Order" : "Credit / Debit Card"}</p>
                </div>

                <div className="bg-secondary/10 border border-border/50 rounded-sm divide-y divide-border/40">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex items-center gap-4 p-4">
                      <div className="relative w-12 h-16 rounded-sm overflow-hidden shrink-0 border border-border/30">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Size: {item.size} · Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold font-serif shrink-0">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 h-12 rounded-sm uppercase tracking-wide text-xs font-bold" onClick={() => setStep(2)}>
                    ← Back
                  </Button>
                  <Button
                    className="flex-1 h-12 bg-primary text-white hover:bg-primary/90 rounded-sm uppercase tracking-wide text-xs font-bold shadow-xl shadow-primary/20"
                    onClick={handleOrder}
                  >
                    Place Order ✓
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <aside className="lg:col-span-5 sticky top-24">
            <div className="bg-secondary/10 border border-border/60 rounded-sm overflow-hidden">
              <div className="p-5 border-b border-border/50">
                <h3 className="font-serif text-lg font-bold">Your Order ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})</h3>
              </div>
              <div className="p-5 space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center gap-3">
                    <div className="relative w-12 h-16 rounded-sm overflow-hidden border border-border/30 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <div className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">Size: {item.size}</p>
                    </div>
                    <p className="text-xs font-bold font-serif shrink-0">{formatPrice(item.price)}</p>
                  </div>
                ))}

                <div className="border-t border-border/50 pt-4 space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Delivery</span><span className="text-primary font-bold">Free</span>
                  </div>
                  <div className="flex justify-between font-bold mt-2 pt-2 border-t border-border/40">
                    <span className="text-sm">Total</span>
                    <span className="font-serif text-lg">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                  SSL Encrypted · 100% Secure
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
