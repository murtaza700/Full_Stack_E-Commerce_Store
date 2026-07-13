# ⚜️ Scentsô — Luxury Full-Stack E-Commerce Ecosystem ⚜️

An elite, production-ready Full-Stack E-Commerce platform tailored for high-end boutique fragrances, luxury scents, and custom perfume formulations. This application combines a minimalist, responsive luxury storefront for customers with a highly secure, data-driven administrative workspace room for business management.

### Live Preview : [Live Link](https://scentso-full-stack-e-commerce-store.vercel.app) ✨
---

## 🚀 Key Production Capabilities & System Features

### 👤 Storefront & Consumer Space
* **Dynamic Autoplay Hero Carousel Slider:** Fluid, infinite-looping banner system powered by SwiperJS with automated loop protection guards preventing runtime layout shifts when fewer items exist.
* **Responsive Best Sellers Highlights Showcase:** Horizontal touch-swipe product carousel utilizing advanced adaptive breakpoints across mobile, tablet, and desktop monitors viewport grids.
* **Persistent Customer Utility Corridors:** Multi-action shopping bags pipelines, seamless wishlist toggles, stateless account profiles, and clean invoice statements reviews.
* **Scent Profile Lost (404 Fallback Cover):** A beautiful minimalist user-facing 404 page that catches invalid customer URLs, gracefully guiding users back to operational checkout rows.

### 🛡️ Administrative Command Center (Admin Panel Dashboard)
* **Airtight Fixed Workspace Shell:** High-fidelity dashboard shell utilizes rigid height limitations (`h-screen`) and hidden overflows (`overflow-hidden`) preventing page leakage.
* **Mobile Slide-In Navigation Overlay (Drawer Layout):** Synchronized state toggles with native backdrop blurs and floating close parameters enabling 100% full admin control on small smartphone viewports.
* **Promoted Showcases Board (Featured Matrix):** Single-click admin switches mapping products to featured homepage highlights dynamically with zero data duplication.
* **Maison Carousel Slider Manager:** Complete React Hook Form validated dashboard wizard to instantly build, prioritize order weights, or delete media billboards.
* **Clients Vault Search Matrix Spreadsheet:** Advanced dynamic filtration tables pulling consumer accounts by exact MongoDB hexadecimal ObjectId string, full names, or email parameters.
* **Administrative Guardrails Safeguards:** Built-in verification checks that block system administrators from triggering self-destruction patterns on their active sessions.
* **Terminal Route Severed (Admin 404 Intercept Shield):** A separate administrative 404 handler that captures broken admin dashboard links while keeping the main control workspace context running.

### ⚡ Technical Automations & Architecture Perks
* **Modular WebP Compressor Helper Engine:** Backend processing powered by the `Sharp` package. Intercepts incoming single Multer files inside memory storage streams, scaling and converting images automatically to lightweight WebP format at an exact 80% pristine quality compression layer.
* **Decoupled Form State Validations:** Powered by `React Hook Form` to execute instant error feedbacks with zero input latency.
* **Asynchronous Global Cache Stream:** Managed by Redux Toolkit slice thunks, cleanly synchronizing database metrics like items counts, cart updates, and session loads natively.

---

## 🏗️ Detailed Project Architecture Map

```text
📁 Scentso-E-Commerce/
├── 📁 backend/
│   ├── 📁 src/
│   │   ├── 📁 controllers/   # Core endpoint data process controllers
│   │   ├── 📁 middlewares/   # Identity verification & administrative role checkers
│   │   ├── 📁 models/        # Strict Mongoose schema collection schemas
│   │   ├── 📁 routes/        # Isolated REST API endpoint modules
│   │   ├── 📁 utils/         # Sharp WebP image optimization utilities
│   │   └── app.js            # Central routing assembly and middleware mounter
│   ├── package.json          # Server dependencies and terminal run descriptors
│   └── server.js             # Core gateway entry server script listener
│
└── 📁 frontend/
    ├── 📁 src/
    │   ├── 📁 admin/         # Admin dashboards, pages, and components layouts
    │   ├── 📁 components/    # Reusable shared public design widgets
    │   ├── 📁 helper/        # Alert status toast triggers mechanisms
    │   ├── 📁 layouts/       # Fixed administrative and storefront viewport frames
    │   ├── 📁 pages/         # Public customer landing view sheets
    │   └── 📁 redux/         # Slices thunk actions asynchronous storage vault
    ├── App.jsx               # Lazy-loaded master routing matrix configuration tree
    ├── package.json          # Client application packages dependency matrices
    └── vite.config.js        # Extreme compilation optimization instructions
```

---

## 🗃️ Complete Full-Stack API Endpoints Ledger Map

The application ecosystem organizes its data processing flows around 9 isolated API route branches prefix mounters securely managed underneath the `/api/v1` namespace grid.

### 👤 1. Client Identity & Authentication Network (`/api/v1/auth`)
* `POST /signup` — Register verified consumer credentials records inside the database.
* `POST /login` — Authenticate passwords hashes, output JWT tokens, and set secure browser cookies tracking profiles.
* `POST /logout` — Flush stateless cookies tokens destroying user active session.
* `GET /getme` — Re-hydrate state initial parameters variables natively out of browser cookies tracking signatures.

### 🧴 2. Products Management Automation Corridor (`/api/v1/products`)
* `GET /` — Publicly acquire full store formulas directory inventory catalogs array records list.
* `GET /search` — Execute deep regex lookups matching title string inputs on front-end.
* `GET /:id` — Resolve detailed metadata parameters snapshot for any single perfume item profile.
* `POST /` — **[Admin Secured Access]** Upload raw images files converting them via `Sharp` automatic engine into lightweight WebP format saving entries direct inside database records collection.
* `PATCH /:id` — **[Admin Secured Access]** Modify target fragrance attributes schemas properties while safely wiping out obsolete heavy asset tokens profiles out of cloud storage.
* `DELETE /:id` — **[Admin Secured Access]** Remove specified catalog data index records from system storage registries permanently.
* `POST /:id/reviews` — Submit verified customer text feedbacks reviews and stars counters indicators.

### 📂 3. Inventory Categories Hub Desk (`/api/v1/categories`)
* `GET /` — Publicly pull complete categories taxonomies structures lists arrays.
* `POST /` — **[Admin Secured Access]** Establish brand new formulations category labels records.
* `PATCH /:id` — **[Admin Secured Access]** Update specific category metadata identifiers or names fields parameters.
* `DELETE /:id` — **[Admin Secured Access]** Clean wipe category definitions out of system database logs.

### 📦 4. Invoices & Logistics Order Pipelines (`/api/v1/orders`)
* `POST /` — Generate full checkout order datasets mapping address properties and totals values.
* `GET /my-orders` — Pull comprehensive chronological orders records sheet for the active user.
* `GET /my-orders/:id` — Inspect individual historical invoice statement details parameters.
* `GET /admin/all-orders` — **[Admin Secured Access]** Load master data spreadsheet grid tracking global boutique client orders.
* `GET /admin/all-orders/:id` — **[Admin Secured Access]** Access granular customer contact files, full itemized inventories loop registry arrays, and ledger valuations summaries.
* `PATCH /admin/all-orders/:id` — **[Admin Secured Access]** Dynamically alter logistics data milestones flags states (*Pending, Processing, Shipped, Delivered, Cancelled*).
* `DELETE /admin/all-orders/:id` — **[Admin Secured Access]** Hard purge transaction document registries logs.











### 🛒 5. Shopping Cart Operations Desk (`/api/v1/cart`)
* `GET /` — Fetch the active customer's persistent luxury shopping bag items array layout.
* `POST /` — Add a specified fragrance formulation unit with selected quantity counts to the cart.
* `PATCH /:id` — Modify precise product quantity intervals on active shopping bag nodes.
* `DELETE /:id` — Remove an individual item block from the current cart collection.
* `DELETE /clear-all` — Hard flush and wipe out all items from the customer's shopping cart.

### 💖 6. Wishlist Vault Directories (`/api/v1/wishlist`)
* `GET /` — Retrieve verified customer custom favorites fragrances checklist records.
* `POST /toggle` — Single-action router endpoint that dynamically injects or drops product references from wishlist arrays.
* `DELETE /clear-all` — Wipe out the active customer's entire wishlist records ledger.

### ✨ 7. Featured Promoted Showcases Corridor (`/api/v1/featured`)
* `GET /` — Publicly fetch all products currently pinned onto home spotlights grid rows.
* `POST /toggle` — **[Admin Secured Access]** Administrative state switch that adds or filters out a product from home highlighted zones.

### 👥 8. Administrative Consumer Directory Room (`/api/v1/users`)
* `GET /` — **[Admin Secured Access]** Multi-channel lookup tracking list mapping consumer files matching raw ObjectId, names, or emails strings.
* `DELETE /:id` — **[Admin Secured Access]** Purge user database manifest records while running defensive checks against active session destruction.

### Image 9. Homepage Media Carousels Manager (`/api/v1/sliders`)
* `GET /` — General public route loading loop-optimized banner slideshow slides configurations frames.
* `POST /` — **[Admin Secured Access]** Create dynamic high-resolution background hero sliders assets automatically processed buffer into pure light `.webp` extensions layers.
* `PATCH /:id` — **[Admin Secured Access]** Adjust specific slideshow slider title headers typographic content, redirect links paths, or order rendering weights priority indices.
* `DELETE /:id` — **[Admin Secured Access]** Hardcore record deletion clean wipe purging media buffer layers from both server collections and cloud cloud storage accounts safely.

---

## 🔀 Frontend Client Navigation Configuration Tree (`App.jsx`)

The frontend routing infrastructure maps complex layouts and dynamic data streams smoothly using lazy-loaded code-splitting chunks optimized with fallback loaders.

### 👤 Customer Public Storefront Tracks (`/` -> UserLayout Wrapper)
* `Route index` — High-fidelity premium homepage featuring the automated `HeroSlider` and `FeaturedProducts` carousel slider layouts.
* `Route path="products"` — Comprehensive catalogue viewport enabling advanced search keywords text mapping filters checking.
* `Route path="products/:id"` — Detailed formulation inspection workspace rendering notes, pricing weights, and reviews elements.
* `Route path="about"` — Brand heritage statement sheet.
* `Route path="contact"` — Corporate communications customer contact panel desk.
* `Route path="cart"` — Itemized luxury shopping bag inventory tracker with real-time totalizers calculations.
* `Route path="wishlist"` — Client personalized fragrances collection track table.
* `Route path="checkout"` — Secure transacting data entry wizard managing mailing destinations mapping details.
* `Route path="profile"` — Client private center showing credentials tokens logs.
* `Route path="order/:id"` — Completed client transactional layout tracking receipt manifest profiles fields.
* `Route path="signup"` — Brand collector registration form deck.
* `Route path="login"` — Account authorization gateway corridor.
* `Route path="*"` — **Public Fallback** -> Triggers user `NotFound` view on invalid paths.

### 🛡️ Administrative Secured Console Tracks (`/admin` -> AdminLayout Shell)
* `Route index` — Main operations statistics control panel display widgets (`DashboardHome`).
* `Route path="products"` — Master table spreadsheet managing formulas library data logs items.
* `Route path="products/add"` — Validated document entry wizards form generating catalog products items.
* `Route path="products/edit/:id"` — Product data sheets overrides editor interface.
* `Route path="categories"` — Single-page categories hub running unified dynamic create/edit layouts.
* `Route path="orders"` — Global transaction log tracking operational logistics flows.
* `Route path="orders/:id"` — Critical admin inspection panel displaying dynamic consignee metadata, exact delivery lines, and status milestones switches.
* `Route path="users"` — Administrative clients index search grid tracking hard deletion purges.
* `Route path="featured"` — Marketing dashboard spotlight toggles grid canvas view.
* `Route path="sliders"` — React Hook Form automated home carousel banner creation workspace.
* `Route path="*"` — **Admin Fallback** -> Triggers administrative `AdminNotFound` view catching invalid inside link sub-paths.

---

## 📦 Dynamic Technologies Stack & Package Registry

### 💻 Client-Side Architecture Packages
* **Core Runtime UI Engine:** `React (v19.2.6)` & `React-DOM (v19.2.6)`
* **Global State Hydration Stores:** `@reduxjs/toolkit (v2.12.0)` & `react-redux`
* **Single-Page Application Routing Grid:** `react-router-dom (v7.18.0)`
* **Aesthetics Framework Engine Compilation:** `TailwindCSS (v4.3.1)` & `@tailwindcss/vite`
* **Microphysics Physics-based Transitions Animation:** `motion (v12.40.0)`
* **Zero-Lag Input Forms Validation Validation:** `react-hook-form (v7.79.0)`
* **Responsive Touch Carousel Canvas Carousels Slider:** `swiper (v12.2.0)`
* **Invoices Generation Document Statement Engines:** `jspdf` & `jspdf-autotable`
* **Telemetry Data Visual Vectors Graphs:** `recharts`
* **Semantic Rich Content Editing Tool:** `react-quill-new`
* **System Status Feedbacks Alert Toast Hooks:** `react-hot-toast`

### 🗄️ Server-Side Architecture Packages
* **Gateway REST Applications Framework API:** `Express (v5.2.1)`
* **ODM Database Modeling Layers Engine:** `Mongoose (v9.7.0)`
* **Binary Streams Multi-Part File Parsers:** `Multer (v2.1.1)`
* **Image Processing & Buffer Optimizations Pipeline:** `sharp (v0.35.3)`
* **Cloud Storage Directories SDK Connection:** `@imagekit/nodejs (v7.7.0)`
* **Stateless Authorization Tokens Tracker Cipher:** `jsonwebtoken (v9.0.3)`
* **Credentials Multi-Round Password Hashes Encoder:** `bcryptjs (v3.0.3)`
* **Stateless Tracking Cookie Parsers Handlers:** `cookie-parser (v1.4.7)`

---

## 💻 Local Installation & Terminal Boot Scripts

Follow this sequential development execution plan to launch both server branches and client bundles locally.

### 🛡️ Set Environment Parameter Profiles (`.env` files setups)
Create a `.env` file within your server root (`backend/`) matching these precise configurations variables keys:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<codePass>@cluster.mongodb.net/Scentso
JWT_SECRET=YOUR_CORE_JWT_HIGH_SECURE_CIPHER_STRING_TOKEN_KEY
TOKEN_EXPIRY_AT=7d
IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
IMAGE_KIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://imagekit.io
```

Create a client `.env` file within your web layout root (`frontend/`):
```env
VITE_BASE_API=http://localhost:5000/api/v1
```

### 🚀 Boot Up Terminal Step 1: Start The Express Backend Server
```bash
cd backend
npm install
npm run dev
```
*Console verifies server connection parameters fields:*  
`App is listening on http://localhost:5000 ✅`  
`MongoDB Connected Successfully! ✅`

### 🚀 Boot Up Terminal Step 2: Start The Frontend Client Bundle
```bash
cd frontend
npm install
npm run dev
```
*Vite compiles and spins up hot-reloading development channels onto:*  
`➜  Local:   http://localhost:5173/`

---

## 📜 System Production Compliance Notice & Quality Seal
This repository ecosystem stands meticulously verified under stringent operational testing benchmarks. All backend file buffers compression sharp pipelines, decoupling react-hook-form input elements trackers, client asynchronous selectors, and state hydrations layers function flawlessly in high-performance coordination grids matching ultra-premium e-commerce product architecture standards.