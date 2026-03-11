import { getProduct } from "@/lib/db";
import { ProductView } from "@/components/product/ProductView";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const product = getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
            <ProductView product={product} />
        </div>
    );
}
