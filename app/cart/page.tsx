"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });

  const handleOrder = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all delivery details.");
      return;
    }

    const businessPhone = "94770000000"; // Replace with actual number
    
    let message = `*NEW ORDER - URBAN AURA*\n\n`;
    message += `*Customer Details*\n`;
    message += `- Name: ${formData.name}\n`;
    message += `- Phone: ${formData.phone}\n`;
    message += `- Address: ${formData.address}\n\n`;
    
    message += `*Order Items*\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.size}) x${item.quantity} = LKR ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    message += `\n*TOTAL: LKR ${subtotal.toLocaleString()}*`;

    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/${businessPhone}?text=${encodedMessage}`;
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-6">
        <ShoppingCartIcon className="w-16 h-16 text-gray-600" />
        <h1 className="font-serif text-3xl">Your Cart is Empty</h1>
        <Link href="/shop" className="text-red-500 hover:text-red-400 flex items-center gap-2 font-mono uppercase tracking-widest text-sm">
          <ArrowLeft className="w-4 h-4" /> Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <h1 className="font-serif text-4xl md:text-5xl text-white mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex gap-6 bg-zinc-900 border border-white/10 p-4 rounded-sm">
              <div className="relative w-24 h-32 md:w-32 md:h-40 shrink-0 bg-secondary rounded-sm overflow-hidden border border-white/5">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-between flex-1 py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-white">{item.name}</h3>
                    <p className="text-xs text-gray-400 font-mono uppercase tracking-widest mt-1">Size: {item.size}</p>
                    <p className="text-red-500 font-mono mt-2">LKR {item.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id, item.size)} className="text-gray-500 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center border border-white/20 rounded-sm">
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <div className="w-10 h-10 flex items-center justify-center text-white font-mono text-sm">
                      {item.quantity}
                    </div>
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-white font-mono text-sm hidden md:block">
                    Total: LKR {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY & CHECKOUT */}
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-red-900/30 p-8 rounded-sm">
            <h2 className="font-serif text-2xl text-white mb-6">Delivery Details</h2>
            <div className="space-y-4 font-mono text-sm">
              <div>
                <label className="block text-gray-400 mb-1">Full Name *</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black border border-white/10 text-white p-3 rounded-sm focus:border-red-600 focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Phone Number *</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-black border border-white/10 text-white p-3 rounded-sm focus:border-red-600 focus:outline-none transition-colors"
                  placeholder="+94 7X XXX XXXX"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Delivery Address *</label>
                <textarea 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-black border border-white/10 text-white p-3 rounded-sm focus:border-red-600 focus:outline-none transition-colors min-h-[100px]"
                  placeholder="Street Address, City, Region"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/10 p-8 rounded-sm">
            <h2 className="font-serif text-2xl text-white mb-6">Order Summary</h2>
            <div className="flex justify-between items-center mb-6 text-xl">
              <span className="text-gray-400 font-mono tracking-widest uppercase text-sm">Total</span>
              <span className="text-white font-bold font-mono">LKR {subtotal.toLocaleString()}</span>
            </div>
            <Button
              onClick={handleOrder}
              size="lg"
              className="w-full h-14 bg-red-600 hover:bg-red-700 text-white uppercase tracking-[0.2em] font-bold text-xs rounded-sm shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] flex items-center justify-center gap-2 transition-all"
            >
              Order via WhatsApp <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="text-center text-gray-500 text-[10px] mt-4 font-mono tracking-widest uppercase">
              You will be redirected to WhatsApp to confirm your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
