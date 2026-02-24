import { products } from "@/lib/data";
import { ProductView } from "@/components/product/ProductView";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
            <ProductView product={product} />
        </div>
    );
}
