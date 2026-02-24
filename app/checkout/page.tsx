"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-4xl">
            <h1 className="font-serif text-3xl font-bold mb-8 text-center">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Form */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold">Shipping Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                            <Input id="firstName" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                            <Input id="lastName" placeholder="Doe" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="address" className="text-sm font-medium">Address</label>
                        <Input id="address" placeholder="123 Culture St" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="city" className="text-sm font-medium">City</label>
                            <Input id="city" placeholder="New York" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="zip" className="text-sm font-medium">Zip Code</label>
                            <Input id="zip" placeholder="10001" />
                        </div>
                    </div>

                    <h2 className="text-xl font-bold pt-4">Payment</h2>
                    <div className="p-4 border rounded-md text-sm text-muted-foreground bg-secondary/10">
                        Payment integration is pending (Stripe/Razorpay). This is a mock checkout.
                    </div>
                </div>

                {/* Summary */}
                <div className="space-y-6">
                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                        <h2 className="font-bold text-lg mb-4">Order Summary</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Banarasi Silk Saree (Qty: 1)</span>
                                <span>{formatPrice(12999)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Cotton Kurti (Qty: 2)</span>
                                <span>{formatPrice(2998)}</span>
                            </div>
                            <div className="border-t my-2 pt-2 flex justify-between font-bold">
                                <span>Total</span>
                                <span>{formatPrice(15997)}</span>
                            </div>
                        </div>
                        <Button className="w-full mt-6" size="lg">Place Order</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
