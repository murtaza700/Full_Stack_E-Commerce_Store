import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/api'

export const getAllMyCarts = createAsyncThunk(
    'cart/getAllMyCarts',
    async (_, thunkAPI) => {
        try {
            const res = await api.get('/cart');
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Get All Carts Error!');
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ id, quantity }, thunkAPI) => {
        try {
            const res = await api.post('/cart', { item: id, quantity });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Add to Cart Error!');
        }
    }
);

export const deleteSingleCart = createAsyncThunk(
    'cart/deleteSingleCart',
    async (id, thunkAPI) => {
        try {
            const res = await api.delete(`/cart/${id}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Error while removing from cart!');
        }
    }
);

export const updateCartQuantity = createAsyncThunk(
    'cart/updateCartQuantity',
    async ({ id, quantity }, thunkAPI) => {
        try {
            const res = await api.patch(`/cart/${id}`, { quantity });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Update Cart Error!');
        }
    }
);

export const clearAllCart = createAsyncThunk(
    'cart/clearAllCart',
    async (_, thunkAPI) => {
        try {
            const res = await api.delete('/cart/clear-all');
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Clear Cart Error!');
        }
    }
);


const calculateCartTotals = (state) => {
    let subTotalSum = 0;
    let totalPiecesCount = 0;

    state.cartItems.forEach(item => {
        const productPrice = item.item?.price || 0;
        const productQuantity = item.quantity || 1;

        subTotalSum += productPrice * productQuantity;
        totalPiecesCount += productQuantity;
    });

    const calculatedTax = Math.round(subTotalSum * 0.15);
    const shippingFee = subTotalSum > 5000 || subTotalSum === 0 ? 0 : 250;
    const finalGrandTotal = subTotalSum + calculatedTax + shippingFee;


    state.count = totalPiecesCount;
    state.totals.subTotal = subTotalSum;
    state.totals.taxPrice = calculatedTax;
    state.totals.shippingPrice = shippingFee;
    state.totals.grandTotal = finalGrandTotal;
};


const initialState = {
    cartItems: [],
    count: 0,
    totals: {
        subTotal: 0,
        taxPrice: 0,
        shippingPrice: 0,
        grandTotal: 0
    },
    loading: {
        fetchAll: false,
        mutation: false
    },
    btnLoading: {},
    errors: {
        fetchAll: null,
        mutation: null
    },
    messages: {
        mutation: null
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCartError: (state, action) => {
            state.errors[action.payload] = null;
        },
        clearCartMessage: (state) => {
            state.messages.mutation = null;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(getAllMyCarts.pending, (state) => {
                state.loading.fetchAll = true;
                state.errors.fetchAll = null;
            })
            .addCase(getAllMyCarts.fulfilled, (state, action) => {
                state.loading.fetchAll = false;
                state.cartItems = action.payload.allCarts || [];
                state.count = action.payload.count;
                calculateCartTotals(state);
            })
            .addCase(getAllMyCarts.rejected, (state, action) => {
                state.loading.fetchAll = false;
                state.errors.fetchAll = action.payload;
            })


            .addCase(addToCart.pending, (state) => {
                state.loading.mutation = true;
                state.errors.mutation = null;
                state.messages.mutation = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading.mutation = false;
                state.messages.mutation = action.payload.message || 'Product added to cart!';

                if (action.payload.cart) {
                    state.cartItems.push(action.payload.cart);
                }
                calculateCartTotals(state);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading.mutation = false;
                state.errors.mutation = action.payload;
            })


            .addCase(deleteSingleCart.pending, (state, action) => {
                const cartId = action.meta.arg;
                state.btnLoading[cartId] = true;
                state.loading.mutation = true;
                state.errors.mutation = null;
                state.messages.mutation = null;
            })
            .addCase(deleteSingleCart.fulfilled, (state, action) => {
                const cartId = action.meta.arg;
                state.btnLoading[cartId] = false;
                state.loading.mutation = false;
                state.messages.mutation = action.payload.message || 'Item removed from shopping bag.';
                state.cartItems = state.cartItems.filter(item => item._id !== cartId);
                calculateCartTotals(state);
            })
            .addCase(deleteSingleCart.rejected, (state, action) => {
                const cartId = action.meta.arg;
                state.btnLoading[cartId] = false;
                state.loading.mutation = false;
                state.errors.mutation = action.payload;
            })


            .addCase(updateCartQuantity.pending, (state, action) => {
                const { id } = action.meta.arg;
                state.btnLoading[id] = true;
                state.loading.mutation = true;
                state.errors.mutation = null;
                state.messages.mutation = null;
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                const { id } = action.meta.arg;
                state.btnLoading[id] = false;
                state.loading.mutation = false;
                state.messages.mutation = action.payload.message || 'Quantity updated successfully!';

                const updatedCartRecord = action.payload.cart;
                if (updatedCartRecord) {
                    state.cartItems = state.cartItems.map(item =>
                        item._id === updatedCartRecord._id ? updatedCartRecord : item
                    );
                }
                calculateCartTotals(state);
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                const { id } = action.meta.arg;
                state.btnLoading[id] = false;
                state.loading.mutation = false;
                state.errors.mutation = action.payload;
            })


            .addCase(clearAllCart.pending, (state) => {
                state.loading.mutation = true;
                state.errors.mutation = null;
                state.messages.mutation = null;
            })
            .addCase(clearAllCart.fulfilled, (state, action) => {
                state.loading.mutation = false;
                state.cartItems = [];
                state.messages.mutation = action.payload.message || 'Your shopping bag has been cleared.';
                calculateCartTotals(state);
            })
            .addCase(clearAllCart.rejected, (state, action) => {
                state.loading.mutation = false;
                state.errors.mutation = action.payload;
            });
    }
});

export const { clearCartError, clearCartMessage } = cartSlice.actions;
export default cartSlice.reducer;