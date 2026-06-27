import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import productReducer from './slices/productSlice'
import categoriesReducer from './slices/categorySlice'
import wishlistReducer from './slices/wishlistSlice'
import featuredReducer from './slices/featuredSlice'
import cartReducer from './slices/cartSlice'

const store = configureStore({
    reducer: {
        'auth': authReducer,
        'products': productReducer,
        'categories': categoriesReducer,
        'wishlist': wishlistReducer,
        'featured': featuredReducer,
        'cart': cartReducer
    }
});

export default store;