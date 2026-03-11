import { supabase } from './supabase';

export interface Product {
    id: string; // Actually a UUID in Supabase, but string is fine
    name: string;
    slug: string;
    price: number;
    category: string; // Will need to JOIN with categories table or use category_name
    category_id: string;
    image: string; // Maps to image_url
    image_url: string;
    description: string;
    sizes: string[];
    colors: string[];
    stock: number;
    is_featured: boolean;
    is_active: boolean;
}

// Convert from Supabase row format to frontend format
const mapProduct = (row: any): Product => {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        price: Number(row.price),
        category: row.categories?.name || 'Uncategorized',
        category_id: row.category_id,
        image: row.image_url || '',
        image_url: row.image_url || '',
        description: row.description || '',
        sizes: row.sizes || [],
        colors: row.colors || [],
        stock: row.stock,
        is_featured: row.is_featured,
        is_active: row.is_active,
    };
};

export async function getDb(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            categories ( name )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }
    
    return data.map(mapProduct);
}

export async function getProduct(id: string): Promise<Product | null> {
    const { data, error } = await supabase
        .from('products')
        .select(`*, categories ( name )`)
        .eq('id', id)
        .single();

    if (error || !data) {
        // Fallback or try to find by slug if id is not a UUID
        const { data: slugData, error: slugError } = await supabase
            .from('products')
            .select(`*, categories ( name )`)
            .eq('slug', id)
            .single();
            
        if (slugError || !slugData) return null;
        return mapProduct(slugData);
    }

    return mapProduct(data);
}

export async function createProduct(product: Partial<Product>) {
    // We map frontend Product back to Supabase payload
    const payload = {
        name: product.name,
        slug: product.name?.toLowerCase().replace(/\s+/g, '-'),
        description: product.description,
        price: product.price,
        stock: product.stock || 0,
        image_url: product.image || product.image_url,
        sizes: product.sizes || [],
        colors: product.colors || [],
        category_id: product.category_id, // Ensure this exists if provided
        is_active: product.is_active !== undefined ? product.is_active : true,
        is_featured: product.is_featured || false
    };

    const { data, error } = await supabase
        .from('products')
        .insert([payload])
        .select()
        .single();

    if (error) {
        console.error('Error creating product:', error);
        throw new Error(error.message);
    }
    return data;
}

export async function updateProduct(id: string, updates: Partial<Product>) {
    const payload: any = {};
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.description !== undefined) payload.description = updates.description;
    if (updates.price !== undefined) payload.price = updates.price;
    if (updates.stock !== undefined) payload.stock = updates.stock;
    if (updates.image !== undefined) payload.image_url = updates.image;
    if (updates.image_url !== undefined) payload.image_url = updates.image_url;
    if (updates.sizes !== undefined) payload.sizes = updates.sizes;
    if (updates.colors !== undefined) payload.colors = updates.colors;
    if (updates.category_id !== undefined) payload.category_id = updates.category_id;
    if (updates.is_active !== undefined) payload.is_active = updates.is_active;
    if (updates.is_featured !== undefined) payload.is_featured = updates.is_featured;

    const { data, error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating product:', error);
        throw new Error(error.message);
    }
    return data;
}

export async function deleteProduct(id: string) {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting product:', error);
        return false;
    }
    return true;
}

export async function getCategories(): Promise<string[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('name')
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('Error fetching categories from Supabase:', error);
        // Fallback defaults
        return ["All", "T-shirts", "Shirts", "Slippers", "Shoes", "Watches"];
    }

    const cats = data.map(c => c.name);
    return ["All", ...cats];
}
