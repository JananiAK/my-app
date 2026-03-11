-- ==============================================================================
-- URBAN AURA E-COMMERCE - SUPABASE SCHEMA STARTUP SCRIPT
-- ==============================================================================

-- 1. EXTENSIONS
-- Required for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABLES AND RELATIONS
-- ==============================================================================

-- =========================================
-- PROFILES (Linked to Supabase Auth)
-- =========================================
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    is_admin BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger to automate profile creation from Auth
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, first_name, last_name, is_admin)
    VALUES (
        new.id, 
        new.email, 
        new.raw_user_meta_data->>'first_name', 
        new.raw_user_meta_data->>'last_name',
        -- Allow the first user or specific emails to be admin
        CASE WHEN new.email IN ('thakshilavidhu@gmail.com') THEN true ELSE false END
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =========================================
-- CATEGORIES
-- =========================================
CREATE TABLE public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================
-- PRODUCTS
-- =========================================
CREATE TABLE public.products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    image_url TEXT,
    sizes TEXT[] DEFAULT '{}'::TEXT[],
    colors TEXT[] DEFAULT '{}'::TEXT[],
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================
-- ORDERS
-- =========================================
-- Type for order status
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');

CREATE TABLE public.orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_number TEXT UNIQUE NOT NULL, -- e.g. UA-3829
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Nullable for guest checkouts
    
    -- Customer Info (Locked at time of order)
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    customer_first_name TEXT NOT NULL,
    customer_last_name TEXT NOT NULL,
    
    -- Shipping Info
    shipping_address TEXT NOT NULL,
    shipping_city TEXT NOT NULL,
    shipping_zip TEXT NOT NULL,
    shipping_country TEXT NOT NULL DEFAULT 'Sri Lanka',
    
    -- Financials
    subtotal DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0.00,
    shipping_fee DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    
    -- Status
    status order_status DEFAULT 'pending' NOT NULL,
    payment_method TEXT NOT NULL, -- 'cod', 'card', 'whatsapp'
    payment_status TEXT DEFAULT 'pending',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Function to generate order number before insert
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.order_number IS NULL THEN
        -- Generates UA-XXXXXX (6 random uppercase alphanumeric)
        NEW.order_number := 'UA-' || upper(substr(md5(random()::text), 1, 6));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number
    BEFORE INSERT ON public.orders
    FOR EACH ROW EXECUTE PROCEDURE generate_order_number();

-- =========================================
-- ORDER ITEMS
-- =========================================
CREATE TABLE public.order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL, -- Snapshot of name
    size TEXT NOT NULL,
    color TEXT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL
);

-- =========================================
-- CONTACT MESSAGES
-- =========================================
CREATE TABLE public.contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 3. STORAGE BUCKETS
-- ==============================================================================

-- Create bucket for product images (assuming it doesn't exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_admin = true
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------
-- PROFILES POLICIES
-- -----------------------------------------
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (public.is_admin());

-- Admins can update all profiles
CREATE POLICY "Admins can update all profiles" ON public.profiles
    FOR UPDATE USING (public.is_admin());

-- -----------------------------------------
-- CATEGORIES POLICIES
-- -----------------------------------------
-- Anyone can read categories
CREATE POLICY "Categories are viewable by everyone" ON public.categories
    FOR SELECT USING (true);

-- Only admins can manage categories
CREATE POLICY "Admins can insert categories" ON public.categories FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update categories" ON public.categories FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete categories" ON public.categories FOR DELETE USING (public.is_admin());

-- -----------------------------------------
-- PRODUCTS POLICIES
-- -----------------------------------------
-- Anyone can read active products. Admins can read all products.
CREATE POLICY "Active products viewable by everyone" ON public.products
    FOR SELECT USING (is_active = true OR public.is_admin());

-- Only admins can manage products
CREATE POLICY "Admins can insert products" ON public.products FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE USING (public.is_admin());

-- -----------------------------------------
-- ORDERS POLICIES
-- -----------------------------------------
-- Anyone can insert an order (Guest checkout support)
CREATE POLICY "Anyone can insert orders" ON public.orders
    FOR INSERT WITH CHECK (true);

-- Users can view their own orders
CREATE POLICY "Users can view own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

-- Admins can view and manage all orders
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update all orders" ON public.orders FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete all orders" ON public.orders FOR DELETE USING (public.is_admin());

-- -----------------------------------------
-- ORDER ITEMS POLICIES
-- -----------------------------------------
-- Anyone can insert order items
CREATE POLICY "Anyone can insert order items" ON public.order_items
    FOR INSERT WITH CHECK (true);

-- Users can view items of their own orders
CREATE POLICY "Users can view own order items" ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

-- Admins can view all order items
CREATE POLICY "Admins can view all order items" ON public.order_items FOR SELECT USING (public.is_admin());

-- -----------------------------------------
-- CONTACT MESSAGES POLICIES
-- -----------------------------------------
-- Anyone can insert contact messages
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
    FOR INSERT WITH CHECK (true);

-- Only admins can view and manage contact messages
CREATE POLICY "Admins can view contact messages" ON public.contact_messages FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update contact messages" ON public.contact_messages FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete contact messages" ON public.contact_messages FOR DELETE USING (public.is_admin());


-- -----------------------------------------
-- STORAGE POLICIES
-- -----------------------------------------
-- Anyone can view product images
CREATE POLICY "Product images are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'product-images');

-- Only admins can upload product images
CREATE POLICY "Admins can upload product images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

-- Only admins can update product images
CREATE POLICY "Admins can update product images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'product-images' AND public.is_admin());

-- Only admins can delete product images
CREATE POLICY "Admins can delete product images" ON storage.objects
    FOR DELETE USING (bucket_id = 'product-images' AND public.is_admin());

-- ==============================================================================
-- 5. FUNCTION: UPDATE TIMESTAMP
-- ==============================================================================
-- Automatically updates updated_at columns
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_products_modtime BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_orders_modtime BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
