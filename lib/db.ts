import fs from 'fs';
import path from 'path';
import { products as initialProducts } from './data';

const DB_PATH = path.join(process.cwd(), 'lib', 'products.json');

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
    sizes: string[];
    colors: string[];
    stock: number;
}

export function getDb() {
    if (!fs.existsSync(DB_PATH)) {
        // Initialize with data from lib/data.ts if JSON doesn't exist
        const productsWithStock = initialProducts.map(p => ({
            ...p,
            stock: 10 // Default stock
        }));
        fs.writeFileSync(DB_PATH, JSON.stringify(productsWithStock, null, 2));
        return productsWithStock;
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data) as Product[];
}

export function saveDb(products: Product[]) {
    fs.writeFileSync(DB_PATH, JSON.stringify(products, null, 2));
}

export function getProduct(id: string) {
    const products = getDb();
    return products.find(p => p.id === id);
}

export function createProduct(product: Omit<Product, 'id'>) {
    const products = getDb();
    const newProduct = {
        ...product,
        id: Math.max(0, ...products.map(p => parseInt(p.id) || 0)) + 1 + ""
    };
    products.push(newProduct as Product);
    saveDb(products);
    return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>) {
    const products = getDb();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updates };
    saveDb(products);
    return products[index];
}

export function deleteProduct(id: string) {
    const products = getDb();
    const filtered = products.filter(p => p.id !== id);
    if (filtered.length === products.length) return false;
    saveDb(filtered);
    return true;
}

export function getCategories() {
    const products = getDb();
    const categories = Array.from(new Set(products.map(p => p.category)));
    // Ensure default categories exist if not in products
    const defaults = ["T-shirts", "Shirts", "Slippers", "Shoes", "Watches"];
    return Array.from(new Set([...defaults, ...categories]));
}
