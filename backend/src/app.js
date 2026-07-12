import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
import orderRoutes from './routes/order.routes.js';
import cartRoutes from './routes/cart.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';
import featuredRoutes from './routes/featured.routes.js';
import adminUsersRoutes from './routes/adminUsers.routes.js';
import sliderRoutes from './routes/slider.routes.js';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/wishlist', wishlistRoutes);
app.use('/api/v1/featured', featuredRoutes);
app.use('/api/v1/users', adminUsersRoutes);
app.use('/api/v1/sliders', sliderRoutes);

app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Scentsô API is running.'
    });
});

const apiRoutes = {
    apiName: "Scentsô Luxury Boutique E-Commerce API",
    apiVersion: "v1",
    basePath: "/api/v1",
    segments: {
        authentication: [
            {
                method: "POST",
                endpoint: "/api/v1/auth/signup",
                middleware: "None",
                details: "Registers a new user account profile natively inside database registries records."
            },
            {
                method: "POST",
                endpoint: "/api/v1/auth/login",
                middleware: "None",
                details: "Validates password hashes, injects identity parameters, and outputs a secure JWT cookie session tracking profile."
            },
            {
                method: "POST",
                endpoint: "/api/v1/auth/logout",
                middleware: "authMiddleware",
                details: "Clears stateless session cookies, instantly destroying active tokens keys."
            },
            {
                method: "GET",
                endpoint: "/api/v1/auth/getme",
                middleware: "authMiddleware",
                details: "Re-hydrates state initials by reading active user credentials signatures natively out of browser requests."
            }
        ],
        products: [
            {
                method: "GET",
                endpoint: "/api/v1/products",
                middleware: "None",
                details: "Publicly acquires the entire inventory catalogs array records list with built-in pagination meta metadata layers."
            },
            {
                method: "GET",
                endpoint: "/api/v1/products/search",
                middleware: "None",
                details: "Processes dynamic filters, category matching, price limits ranges bounds, and deep title regex search."
            },
            {
                method: "GET",
                endpoint: "/api/v1/products/:id",
                middleware: "None",
                details: "Resolves detailed metadata specifications fields snapshot for any single perfume item profile."
            },
            {
                method: "POST",
                endpoint: "/api/v1/products",
                middleware: "authMiddleware, roleChecker, upload.single('image')",
                details: "[Admin Secured] Uploads a raw media file, processes its buffers natively through sharp to auto-convert to 80% compressed lightweight WebP, and establishes a new catalog product document."
            },
            {
                method: "PATCH",
                endpoint: "/api/v1/products/:id",
                middleware: "authMiddleware, roleChecker, upload.single('image')",
                details: "[Admin Secured] Overwrites or modifies targeted fragrance descriptors fields while utilizing imageDelete helpers to safely drop obsolete cloud storage assets tokens."
            },
            {
                method: "DELETE",
                endpoint: "/api/v1/products/:id",
                middleware: "authMiddleware, roleChecker",
                details: "[Admin Secured] Hard purges a specified product document from system storage entries permanently."
            },
            {
                method: "POST",
                endpoint: "/api/v1/products/:id/reviews",
                middleware: "authMiddleware",
                details: "Submits or updates verified customer comment text blocks logs and aggregates rating scales floating digits."
            }
        ],
        categories: [
            {
                method: "GET",
                endpoint: "/api/v1/categories",
                middleware: "None",
                details: "Publicly pulls the complete categories taxonomies structures lists arrays."
            },
            {
                method: "POST",
                endpoint: "/api/v1/categories",
                middleware: "authMiddleware, roleChecker",
                details: "[Admin Secured] Injects a unique formulations category classification title label."
            },
            {
                method: "PATCH",
                endpoint: "/api/v1/categories/:id",
                middleware: "authMiddleware, roleChecker",
                details: "[Admin Secured] Adjusts names metrics or isActive visibility statuses flags parameters."
            },
            {
                method: "DELETE",
                endpoint: "/api/v1/categories/:id",
                middleware: "authMiddleware, roleChecker",
                details: "[Admin Secured] Wipes category parameters records, applying active blockers if dependency product counts > 0."
            }
        ],
        sliders: [
            {
                method: "GET",
                endpoint: "/api/v1/sliders",
                middleware: "None",
                details: "Loads loop-optimized homepage slideshow configurations frames data rows."
            },
            {
                method: "POST",
                endpoint: "/api/v1/sliders",
                middleware: "authMiddleware, upload.single('image'), roleChecker",
                details: "[Admin Secured] Processes raw banner attachments into light WebP formats, mapping title captions metadata, redirections routes paths, and priority orders indicators."
            },
            {
                method: "PATCH",
                endpoint: "/api/v1/sliders/:id",
                middleware: "authMiddleware, upload.single('image'), roleChecker",
                details: "[Admin Secured] Updates typographical details layouts data shapes, or pushes altered backdrop banner assets while discarding obsolete media nodes."
            },
            {
                method: "DELETE",
                endpoint: "/api/v1/sliders/:id",
                middleware: "authMiddleware, roleChecker",
                details: "[Admin Secured] Hardpurges targeted slideshow promotional billboards from system database indices metrics."
            }
        ],
        orders: [
            {
                method: "POST",
                endpoint: "/api/v1/orders",
                middleware: "authMiddleware",
                details: "Generates checkout datasets tracking mailing destinations, city postal structures, phone rows, and final order items."
            },
            {
                method: "GET",
                endpoint: "/api/v1/orders/my-orders",
                middleware: "authMiddleware",
                details: "Retrieves the full historical transaction invoice logs list corresponding to the logged-in customer."
            },
            {
                method: "GET",
                endpoint: "/api/v1/orders/my-orders/:id",
                middleware: "authMiddleware",
                details: "Inspects an individual purchase receipt snapshot, enforcing strict cross-ownership checks."
            },
            {
                method: "GET",
                endpoint: "/api/v1/orders/admin/all-orders",
                middleware: "authMiddleware, roleChecker",
                details: "[Admin Secured] Accesses master administrative billing tracking grid spreadsheets with cumulative revenue metrics counters."
            },
            {
                method: "GET",
                endpoint: "/api/v1/orders/admin/all-orders/:id",
                middleware: "authMiddleware, roleChecker",
                details: "[Admin Secured] Reviews granular items structures loop data grids, matching addresses metrics, and customer identity handles files."
            },
            {
                method: "PATCH",
                endpoint: "/api/v1/orders/admin/all-orders/:id",
                middleware: "authMiddleware, roleChecker",
                details: "[Admin Secured] Transitions logistics delivery milestones stages values flags smoothly while enforcing strict immutable checks on finished delivered bundles."
            },
            {
                method: "DELETE",
                endpoint: "/api/v1/orders/admin/all-orders/:id",
                middleware: "authMiddleware, roleChecker",
                details: "[Admin Secured] Purges tracking log orders matrices entirely from server indexes logs."
            }
        ],
        cart: [
            {
                method: "GET",
                endpoint: "/api/v1/cart",
                middleware: "authMiddleware",
                details: "Loads active user's unified persistent shopping bag records array layout."
            },
            {
                method: "POST",
                endpoint: "/api/v1/cart",
                middleware: "authMiddleware",
                details: "Appends a formulation token block parameter or manages inline quantity indicators thresholds values."
            },
            {
                method: "PATCH",
                endpoint: "/api/v1/cart/:id",
                middleware: "authMiddleware",
                details: "Mutates custom items counts intervals validation checks with strict limits parameters boundaries tracking."
            },
            {
                method: "DELETE",
                endpoint: "/api/v1/cart/clear-all",
                middleware: "authMiddleware",
                details: "Hard flushes and cleans up the customer shopping bag workspace elements entirely."
            },
            {
                method: "DELETE",
                endpoint: "/api/v1/cart/:id",
                middleware: "authMiddleware",
                details: "Drops a specified standalone item row out of the user's shopping bag data tree."
            }
        ],
        wishlist: [
            {
                method: "GET",
                endpoint: "/api/v1/wishlist",
                middleware: "authMiddleware",
                details: "Fetches favorites items files checklist array entries tracked under active client variables."
            },
            {
                method: "POST",
                endpoint: "/api/v1/wishlist/toggle",
                middleware: "authMiddleware",
                details: "Single-action toggler that intelligently injects or drops product references from customer favorites records tracking grids."
            },
            {
                method: "DELETE",
                endpoint: "/api/v1/wishlist/clear-all",
                middleware: "authMiddleware",
                details: "Clears user private wishlist ledger array rows seamlessly."
            }
        ],
        featured: [
            {
                method: "GET",
                endpoint: "/api/v1/featured",
                middleware: "None",
                details: "Publicly grabs complete nested lists arrays mapping products pinned onto storefront home spotlight rows."
            },
            {
                method: "POST",
                endpoint: "/api/v1/featured/toggle",
                middleware: "authMiddleware, roleChecker",
                details: "[Admin Secured] Administrative state switch mechanism adding or dropping items profiles references out of home promotional sections grid charts."
            }
        ],
        users: [
            {
                method: "GET",
                endpoint: "/api/v1/users",
                middleware: "authMiddleware, roleChecker",
                details: "[Admin Secured] Multi-channel lookup tracking list mapping consumer files matching raw ObjectId, names, or emails strings."
            },
            {
                method: "DELETE",
                endpoint: "/api/v1/users/:id",
                middleware: "authMiddleware, roleChecker",
                details: "[Admin Secured] Purges user database manifest records while running defensive checks against active session destruction."
            }
        ]
    }
};

app.get('/api/v1/docs', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "API routes documentation retrieved successfully.",
        documentation: apiRoutes
    });
});

export default app;