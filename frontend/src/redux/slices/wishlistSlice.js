import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/api';

export const getMyWishlist = createAsyncThunk(
    'wishlist/getMyWishlist',
    async (_, thunkAPI) => {
        try {
            const res = await api.get('/wishlist');
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Get Wishlist Error!');
        }
    }
);

export const toggleWishlistAction = createAsyncThunk(
    'wishlist/toggleWishlistAction',
    async (id, thunkAPI) => {
        try {
            const res = await api.post('/wishlist/toggle', { item: id });
            return { ...res.data, productId: id };
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Toggle Wishlist Error!');
        }
    }
);

export const clearWishlist = createAsyncThunk(
    'wishlist/clearWishlist',
    async (_, thunkAPI) => {
        try {
            const res = await api.delete('/wishlist/clear-all');
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Clear Wishlist Error!');
        }
    }
);


const initialState = {
    wishlistItems: [],
    btnLoading: {},
    loading: {
        fetchAll: false,
        toggle: false,
        clearAll: false
    },
    errors: {
        fetchAll: null,
        toggle: null,
        clearAll: null
    },
    messages: {
        toggle: null,
        clearAll: null
    }
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: initialState,
    reducers: {
        clearWishlistError: (state, action) => {
            state.errors[action.payload] = null;
        },
        clearWishlistMessage: (state, action) => {
            state.messages[action.payload] = null;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(getMyWishlist.pending, (state) => {
                state.loading.fetchAll = true;
                state.errors.fetchAll = null;
                state.messages.fetchAll = null;
            })
            .addCase(getMyWishlist.fulfilled, (state, action) => {
                state.wishlistItems = action.payload.allWish || [];
                state.loading.fetchAll = false;
            })
            .addCase(getMyWishlist.rejected, (state, action) => {
                state.loading.fetchAll = false;
                state.errors.fetchAll = action.payload;
            })


            .addCase(toggleWishlistAction.pending, (state, action) => {
                const prodId = action.meta.arg;
                state.btnLoading[prodId] = true;
                state.loading.toggle = true;
                state.errors.toggle = null;
                state.messages.toggle = null;
            })
            .addCase(toggleWishlistAction.fulfilled, (state, action) => {
                const { isWishlisted, productId, item } = action.payload;
                state.btnLoading[productId] = false;
                state.loading.toggle = false;
                state.messages.toggle = action.payload.message || 'Wishlist status shifted successfully!';

                if (!isWishlisted) {
                    state.wishlistItems = state.wishlistItems.filter(el => el._id !== productId && el.item?._id !== productId && el.item !== productId);
                } else {
                    state.wishlistItems.push(item);
                }
            })
            .addCase(toggleWishlistAction.rejected, (state, action) => {
                const prodId = action.meta.arg;
                state.btnLoading[prodId] = false;
                state.loading.toggle = false;
                state.errors.toggle = action.payload;
            })


            .addCase(clearWishlist.pending, (state) => {
                state.loading.clearAll = true;
                state.errors.clearAll = null;
                state.messages.clearAll = null;
            })
            .addCase(clearWishlist.fulfilled, (state, action) => {
                state.wishlistItems = [];
                state.loading.clearAll = false;
                state.messages.clearAll = action.payload.message || 'Wishlist cleared smoothly!';
            })
            .addCase(clearWishlist.rejected, (state, action) => {
                state.loading.clearAll = false;
                state.errors.clearAll = action.payload;
            });
    }
});

export const { clearWishlistMessage, clearWishlistError } = wishlistSlice.actions;
export default wishlistSlice.reducer;