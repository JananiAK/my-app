import Image from "next/image";

export default function StoryPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-6">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">Our Story</h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Harahs Threads Thistle is more than a brand; it is a journey back to the roots of Indian craftsmanship.
                    </p>
                </div>

                <div className="relative aspect-video rounded-lg overflow-hidden my-12">
                    <Image
                        src="https://images.unsplash.com/photo-1558697698-93663a8a071c?q=80&w=1000&auto=format&fit=crop"
                        alt="Artisans weaving"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="prose prose-lg mx-auto text-muted-foreground">
                    <p>
                        Founded in 2024, our mission has been simple: to revive the fading art of handloom weaving and bring it to the modern wardrobe. We travel across India, from the ghats of Varanasi to the villages of Kanchipuram, partnering directly with artisan families who have preserved these techniques for generations.
                    </p>
                    <p>
                        Every saree, every kurti, and every piece of fabric you see on our platform is handpicked for its authenticity and quality. We believe in slow fashion—clothing that is made with patience, love, and respect for the environment.
                    </p>
                    <h3 className="font-serif text-2xl font-bold text-foreground mt-8 mb-4">Our Promise</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>100% Authentic Handloom</li>
                        <li>Fair Wages for Artisans</li>
                        <li>Sustainable Packaging</li>
                        <li>Preservation of Heritage Designs</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
