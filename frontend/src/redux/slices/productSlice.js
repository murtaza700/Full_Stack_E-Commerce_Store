import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/api'

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (productData, thunkAPI) => {
        try {
            const res = await api.post('/products', productData);
            return res.data;

        } catch (err) {
            console.error('Create Product Error! ', err);
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Product Publish Error!');
        }
    }
);

export const getAllProducts = createAsyncThunk(
    'products/getAllProducts',
    async (_, thunkAPI) => {
        try {
            const res = await api.get('/products');
            return res.data;

        } catch (err) {
            console.error('Get All Products Error! ', err);
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Products Fetching Error!');
        }
    }
);

export const getSingleProduct = createAsyncThunk(
    'products/getSingleProduct',
    async (id, thunkAPI) => {
        try {
            const res = await api.get(`/products/${id}`);
            return res.data;

        } catch (err) {
            console.error(`Single Product Fetch Error! `, err);
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Single Product Fetch Error!');
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, thunkAPI) => {
        try {
            const res = await api.delete(`/products/${id}`);
            return res.data;

        } catch (err) {
            console.error('Delete Product Error! ', err);
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Delete Product Error!');
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, updatedData }, thunkAPI) => {
        try {
            const res = await api.patch(`/products/${id}`, updatedData);
            return res.data;

        } catch (err) {
            console.error('Update Product Error! ', err);
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Update Product Error!');
        }
    }
)

const initialState = {
    products: [],
    product: null,
    count: 0,
    error: null,
    message: null,
    loading: false,
    meta: null
}

const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.products.push(action.payload.product);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.count = action.payload.count;
                state.products = action.payload.products;
                state.meta = action.payload.meta;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(getSingleProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload.product;
                state.message = action.payload.message;
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.products = state.products.filter(product => product._id !== action.meta.arg);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.product = action.payload.product;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { clearError, clearMessage } = productsSlice.actions;
export default productsSlice.reducer;