import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import productReducer from './slices/productSlice'
import categoriesReducer from './slices/categorySlice'
import wishlistReducer from './slices/wishlistSlice'

const store = configureStore({
    reducer: {
        'auth': authReducer,
        'products': productReducer,
        'categories': categoriesReducer,
        'wishlist': wishlistReducer
    }
});

export default store;