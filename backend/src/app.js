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

export default app;