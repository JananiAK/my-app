"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <h1 className="font-serif text-4xl font-bold text-center mb-12">Get in Touch</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div>
                        <h2 className="font-serif text-2xl font-bold mb-4">We'd love to hear from you</h2>
                        <p className="text-muted-foreground">
                            Have a question about our collections, shipping, or just want to say hello? Fill out the form or reach out to us directly.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-medium">Visit Us</h3>
                                <p className="text-muted-foreground">123 Heritage Lane, Textile District<br />New Delhi, India 110001</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-medium">Email Us</h3>
                                <p className="text-muted-foreground">hello@harahsthradsthistle.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-medium">Call Us</h3>
                                <p className="text-muted-foreground">+91 98765 43210</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-card p-8 rounded-lg border shadow-sm">
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <Input id="name" placeholder="Your name" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <Input id="email" type="email" placeholder="Your email" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                            <Input id="subject" placeholder="How can we help?" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">Message</label>
                            <textarea
                                id="message"
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Write your message here..."
                            />
                        </div>
                        <Button className="w-full" size="lg">Send Message</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
