# Project Folder Structure

## 📁 Root (project) files

- `package.json` — **npm/Yarn dependencies & scripts** (how to run/build the app).
- `next.config.ts` — **Next.js configuration** (custom behavior, rewrites, image domains, etc.).
- `tsconfig.json` — **TypeScript config** (compiler options, path aliases).
- `eslint.config.mjs` — **ESLint rules** for linting/formatting.
- `postcss.config.mjs` — **PostCSS setup** (Tailwind, autoprefixer, etc. if used).
- `next-env.d.ts` — **TypeScript environment definitions** injected by Next.js.

---

## 📂 `app/` — Next.js App Router (Pages + Layouts)

This is where your UI route structure lives. Each folder maps to a route.

### Top-level routes

- `app/page.tsx` — **Home page** (`/`)
- `app/layout.tsx` — **Root layout** (common `<head>` + wrappers for all pages)
- `app/globals.css` — **Global styles** applied app-wide

### Authentication

- `app/auth/login/page.tsx` — Login page (`/auth/login`)
- `app/auth/register/page.tsx` — Register page (`/auth/register`)

### Shop / Product pages

- `app/shop/page.tsx` — Shop listing (`/shop`)
- `app/product/[id]/page.tsx` — Product detail page (`/product/:id`)
- `app/cart/page.tsx` — Cart page (`/cart`)
- `app/checkout/page.tsx` — Checkout page (`/checkout`)
- `app/profile/page.tsx` — User profile (`/profile`)
- `app/contact/page.tsx` — Contact page (`/contact`)
- `app/story/page.tsx` — Story page (`/story`)

### Admin area

- `app/admin/page.tsx` — Admin dashboard (`/admin`)
- `app/admin/layout.tsx` — Admin layout wrapper (typically nav/sidebar for admin screens)
- `app/admin/settings/page.tsx` — Settings (`/admin/settings`)
- `app/admin/products/new/page.tsx` — Create new product (`/admin/products/new`)
- `app/admin/products/edit/[id]/page.tsx` — Edit existing product (`/admin/products/edit/:id`)

### API Routes (`app/api/`)

These are serverless route handlers (Next.js “Route Handlers”).

- `app/api/products/route.ts` — `GET/POST` for products collection (likely).
- `app/api/products/[id]/route.ts` — `GET/PUT/DELETE` for a single product.
- `app/api/categories/route.ts` — Category endpoints.
- `app/api/upload/route.ts` — Upload handler (images/files).

---

## 📂 `components/` — UI Components

Reusable pieces of UI used across pages.

### `components/layout/`

- `Navbar.tsx` — Site navigation bar
- `Footer.tsx` — Footer layout

### `components/product/`

- `ProductCard.tsx` — Product listing card (used in shop grids, etc.)
- `ProductView.tsx` — Full product detail view component

### `components/admin/`

- `ProductForm.tsx` — Form used in admin create/edit product pages

### `components/ui/`

- `button.tsx` — Reusable button component
- `input.tsx` — Reusable input component

---

## 📂 `context/`

- `CartContext.tsx` — React context/provider for cart state (adding/removing items, totals, etc.)

---

## 📂 `lib/`

Utility + data layer items.

- `db.ts` — Likely contains database connection / persistence logic (e.g., Prisma, SQLite, JSON file access).
- `data.ts` — Seed data / helper data structures.
- `products.json` — Static JSON dataset for products (used for mock data or local storage).
- `utils.ts` — Helper utility functions used across the app.
