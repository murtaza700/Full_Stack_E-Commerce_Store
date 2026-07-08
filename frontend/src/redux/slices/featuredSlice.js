import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../lib/api';

export const getFeaturedProducts = createAsyncThunk(
    'featured/getFeaturedProducts',
    async (_, thunkAPI) => {
        try {
            const res = await api.get('/featured');
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Get Featured Products Error!');
        }
    }
);

export const toggleFeaturedProduct = createAsyncThunk(
    'featured/toggleFeaturedProduct',
    async (id, thunkAPI) => {
        try {
            const res = await api.post(`/featured/toggle`, { product: id });
            return { ...res.data, productId: id };
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Server Error!');
        }
    }
);

const initialState = {
    featured: [],
    count: 0,
    loading: {
        fetch: false,
        toggle: false
    },
    btnLoading: {},
    errors: {
        fetch: null,
        toggle: null
    },
    message: null
}

const featuredSlice = createSlice({
    name: 'featured',
    initialState: initialState,
    reducers: {
        clearFeaturedMessage: (state) => {
            state.message = null;
        },
        clearFeaturedError: (state, action) => {
            state.errors[action.payload] = null;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(getFeaturedProducts.pending, (state) => {
                state.loading.fetch = true;
                state.errors.fetch = null;
            })
            .addCase(getFeaturedProducts.fulfilled, (state, action) => {
                state.loading.fetch = false;
                state.featured = action.payload.featured || [];
            })
            .addCase(getFeaturedProducts.rejected, (state, action) => {
                state.loading.fetch = false;
                state.errors.fetch = action.payload;
            })


            .addCase(toggleFeaturedProduct.pending, (state, action) => {
                state.loading.toggle = true;
                state.errors.toggle = null;
                const targetProductId = action.meta.arg;
                state.btnLoading[targetProductId] = true;
            })
            .addCase(toggleFeaturedProduct.fulfilled, (state, action) => {
                state.loading.toggle = false;
                state.message = action.payload.message || 'Featured list updated successfully!';

                const { productId, newFeatured, message } = action.payload;
                state.btnLoading[productId] = false;

                const isRemoved = message?.toLowerCase().includes('remove') || message?.toLowerCase().includes('deleted');

                if (isRemoved) {
                    state.featured = state.featured.filter(item => item._id !== productId && item.product?._id !== productId);
                } else if (newFeatured) {
                    state.featured.push(newFeatured);
                }
            })
            .addCase(toggleFeaturedProduct.rejected, (state, action) => {
                state.loading.toggle = false;
                state.errors.toggle = action.payload;
                const targetProductId = action.meta.arg;
                state.btnLoading[targetProductId] = false;
            })
    }
})

export const { clearFeaturedError, clearFeaturedMessage } = featuredSlice.actions;
export default featuredSlice.reducer;