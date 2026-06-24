import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (productData, thunkAPI) => {
        try {
            const res = await api.post('/products', productData);
            return res.data;
        } catch (err) {
            console.error('Create Product Error!', err);
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Product Publish Error!'
            );
        }
    }
);

export const getAllProducts = createAsyncThunk(
    'products/getAllProducts',
    async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
        try {
            const res = await api.get(`/products?page=${page}&limit=${limit}`);
            return res.data;
        } catch (err) {
            console.error('Get All Products Error!', err);
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Products Fetching Error!'
            );
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
            console.error('Single Product Fetch Error!', err);
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Single Product Fetch Error!'
            );
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
            console.error('Delete Product Error!', err);
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Delete Product Error!'
            );
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
            console.error('Update Product Error!', err);
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Update Product Error!'
            );
        }
    }
);

const initialState = {
    products: [],
    product: null,
    count: 0,
    meta: null,

    loading: {
        create: false,
        fetchAll: false,
        fetchOne: false,
        update: false,
        delete: false,
    },

    errors: {
        create: null,
        fetchAll: null,
        fetchOne: null,
        update: null,
        delete: null,
    },

    messages: {
        create: null,
        update: null,
        delete: null,
    }
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProductError: (state, action) => {
            state.errors[action.payload] = null;
        },

        clearProductMessage: (state, action) => {
            state.messages[action.payload] = null;
        }
    },

    extraReducers: (builder) => {
        builder

            .addCase(createProduct.pending, (state) => {
                state.loading.create = true;
                state.errors.create = null;
                state.messages.create = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading.create = false;
                state.messages.create = action.payload.message;
                state.products.push(action.payload.product);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading.create = false;
                state.errors.create = action.payload;
            })


            .addCase(getAllProducts.pending, (state) => {
                state.loading.fetchAll = true;
                state.errors.fetchAll = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading.fetchAll = false;
                state.products = action.payload.products;
                state.count = action.payload.count;
                state.meta = action.payload.meta;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading.fetchAll = false;
                state.errors.fetchAll = action.payload;
            })


            .addCase(getSingleProduct.pending, (state) => {
                state.loading.fetchOne = true;
                state.errors.fetchOne = null;
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.loading.fetchOne = false;
                state.product = action.payload.product;
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.loading.fetchOne = false;
                state.errors.fetchOne = action.payload;
            })


            .addCase(deleteProduct.pending, (state) => {
                state.loading.delete = true;
                state.errors.delete = null;
                state.messages.delete = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading.delete = false;
                state.messages.delete = action.payload.message;
                state.products = state.products.filter(
                    product => product._id !== action.meta.arg
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading.delete = false;
                state.errors.delete = action.payload;
            })


            .addCase(updateProduct.pending, (state) => {
                state.loading.update = true;
                state.errors.update = null;
                state.messages.update = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading.update = false;
                state.messages.update = action.payload.message;
                state.product = action.payload.product;

                state.products = state.products.map(product =>
                    product._id === action.payload.product._id
                        ? action.payload.product
                        : product
                );
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading.update = false;
                state.errors.update = action.payload;
            });
    }
});

export const { clearProductError, clearProductMessage } = productsSlice.actions;
export default productsSlice.reducer;