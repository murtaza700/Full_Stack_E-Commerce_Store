import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

export const getAllCategories = createAsyncThunk(
    'categories/getAllCategories',
    async (_, thunkAPI) => {
        try {
            const res = await api.get('/categories');
            return res.data;
        } catch (err) {
            console.error('Get all Categories error!', err);

            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Get all Categories error!'
            );
        }
    }
);

export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (data, thunkAPI) => {
        try {
            const res = await api.post('/categories', data);
            return res.data;
        } catch (err) {
            console.error('Error While Creating Category! ', err);

            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Error While Creating Category!'
            );
        }
    }
);

export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await api.patch(`/categories/${id}`, data);
            return res.data;
        } catch (err) {
            console.error('Error While Updating Category! ', err);

            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Error While Updating Category!'
            );
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (id, thunkAPI) => {
        try {
            const res = await api.delete(`/categories/${id}`);
            return res.data;
        } catch (err) {
            console.error('Error While Deleting Category! ', err);

            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Error While Deleting Category!'
            );
        }
    }
);

const initialState = {
    categories: [],

    loading: {
        fetchAll: false,
        create: false,
        update: false,
        delete: false
    },

    errors: {
        fetchAll: null,
        create: null,
        update: null,
        delete: null
    },

    messages: {
        fetchAll: null,
        create: null,
        update: null,
        delete: null
    }
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,

    reducers: {
        clearCategoryError: (state, action) => {
            state.errors[action.payload] = null;
        },

        clearCategoryMessage: (state, action) => {
            state.messages[action.payload] = null;
        }
    },

    extraReducers: (builder) => {
        builder

            .addCase(getAllCategories.pending, (state) => {
                state.loading.fetchAll = true;
                state.errors.fetchAll = null;
                state.messages.fetchAll = null;
            })

            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading.fetchAll = false;
                state.categories = action.payload.categories;
                state.messages.fetchAll = action.payload.message;
            })

            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading.fetchAll = false;
                state.errors.fetchAll = action.payload;
            })


            .addCase(createCategory.pending, (state) => {
                state.loading.create = true;
                state.errors.create = null;
                state.messages.create = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading.create = false;
                state.messages.create = action.payload.message;
                state.categories.push(action.payload.category);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading.create = false;
                state.errors.create = action.payload;
            })


            .addCase(updateCategory.pending, (state) => {
                state.loading.update = true;
                state.errors.update = null;
                state.messages.update = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading.update = false;
                state.messages.update = action.payload.message;
                state.categories = state.categories.map(category =>
                    category._id === action.payload.category._id
                        ? action.payload.category
                        : category
                );
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading.update = false;
                state.errors.update = action.payload;
            })


            .addCase(deleteCategory.pending, (state) => {
                state.loading.delete = true;
                state.errors.delete = null;
                state.messages.delete = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading.delete = false;
                state.messages.delete = action.payload.message;
                state.categories = state.categories.filter(category => category._id !== action.meta.arg);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading.delete = false;
                state.errors.delete = action.payload;
            })
    }
});

export const { clearCategoryError, clearCategoryMessage } = categoriesSlice.actions;
export default categoriesSlice.reducer;