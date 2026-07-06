import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import productReducer from './slices/productSlice'
import categoriesReducer from './slices/categorySlice'
import wishlistReducer from './slices/wishlistSlice'
import featuredReducer from './slices/featuredSlice'
import cartReducer from './slices/cartSlice'
import orderReducer from './slices/orderSlice'
import allUsersReducer from './slices/allUsersSlice'

const store = configureStore({
    reducer: {
        'auth': authReducer,
        'products': productReducer,
        'categories': categoriesReducer,
        'wishlist': wishlistReducer,
        'featured': featuredReducer,
        'cart': cartReducer,
        'orders': orderReducer,
        'adminUsers': allUsersReducer
    }
});

export default store;