import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData, thunkAPI) => {
        try {
            const response = await api.post('/orders', orderData);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Something went wrong. Please try again!'
            );
        }
    }
);

export const getMyAllOrders = createAsyncThunk(
    'orders/getMyAllOrders',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/orders/my-orders');
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Something went wrong. Please try again!'
            );
        }
    }
);

export const getMySingleOrder = createAsyncThunk(
    'orders/getMySingleOrder',
    async (id, thunkAPI) => {
        try {
            const response = await api.get(`/orders/my-orders/${id}`);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Something went wrong. Please try again!'
            );
        }
    }
);

export const getAllOrdersAdmin = createAsyncThunk(
    'orders/getAllOrdersAdmin',
    async ({ page = 1, limit = 10, search = '', status = '', sort = '-createdAt' } = {}, thunkAPI) => {
        try {
            const response = await api.get(
                `/orders/admin/all-orders?page=${page}&limit=${limit}&search=${search}&status=${status}&sort=${sort}`
            );
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Something went wrong. Please try again!'
            );
        }
    }
);

export const updateOrderStatusAdmin = createAsyncThunk(
    'orders/updateOrderStatusAdmin',
    async ({ id, status }, thunkAPI) => {
        try {
            const response = await api.patch(`/orders/admin/all-orders/${id}`, { status });
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Something went wrong. Please try again!'
            );
        }
    }
);

export const deleteOrderAdmin = createAsyncThunk(
    'orders/deleteOrderAdmin',
    async (id, thunkAPI) => {
        try {
            const response = await api.delete(`/orders/admin/all-orders/${id}`);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Something went wrong. Please try again!'
            );
        }
    }
);

export const getOrderDetailsAdminThunk = createAsyncThunk(
    'orders/getOrderDetailsAdminThunk',
    async (targetOrderIdToken, thunkAPI) => {
        try {
            const response = await api.get(`/orders/admin/all-orders/${targetOrderIdToken}`);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Something went wrong. Please try again!'
            );
        }
    }
);


const initialState = {
    orders: [],
    adminOrders: [],
    currentOrder: null,
    totalRevenue: 0,
    count: 0,
    meta: null,
    loading: {
        fetchAll: false,
        fetchOne: false,
        mutation: false
    },
    btnLoading: {},
    errors: {
        fetchAll: null,
        fetchOne: null,
        mutation: null
    },
    messages: {
        mutation: null
    }
};
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrderError: (state, action) => {
            state.errors[action.payload] = null;
        },
        clearOrderMessage: (state) => {
            state.messages.mutation = null;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(createOrder.pending, (state) => {
                state.loading.mutation = true;
                state.errors.mutation = null;
                state.messages.mutation = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading.mutation = false;
                state.messages.mutation = action.payload.message;
                state.currentOrder = action.payload.order || action.payload;

                if (action.payload.order) {
                    state.orders.unshift(action.payload.order);
                }
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading.mutation = false;
                state.errors.mutation = action.payload;
            })


            .addCase(getMyAllOrders.pending, (state) => {
                state.loading.fetchAll = true;
                state.errors.fetchAll = null;
            })
            .addCase(getMyAllOrders.fulfilled, (state, action) => {
                state.loading.fetchAll = false;
                state.orders = action.payload.orders || [];
                state.count = action.payload.count || action.payload.orders?.length || 0;
            })
            .addCase(getMyAllOrders.rejected, (state, action) => {
                state.loading.fetchAll = false;
                state.errors.fetchAll = action.payload;
            })


            .addCase(getMySingleOrder.pending, (state) => {
                state.loading.fetchOne = true;
                state.errors.fetchOne = null;
                state.currentOrder = null;
            })
            .addCase(getMySingleOrder.fulfilled, (state, action) => {
                state.loading.fetchOne = false;
                state.currentOrder = action.payload.order || action.payload;
            })
            .addCase(getMySingleOrder.rejected, (state, action) => {
                state.loading.fetchOne = false;
                state.errors.fetchOne = action.payload;
            })


            .addCase(getAllOrdersAdmin.pending, (state) => {
                state.loading.fetchAll = true;
                state.errors.fetchAll = null;
            })
            .addCase(getAllOrdersAdmin.fulfilled, (state, action) => {
                state.loading.fetchAll = false;
                state.adminOrders = action.payload.orders || [];
                state.totalRevenue = action.payload.totalRevenue || 0;
                state.meta = action.payload.meta || { totalPages: 1, currentPage: 1 };
            })
            .addCase(getAllOrdersAdmin.rejected, (state, action) => {
                state.loading.fetchAll = false;
                state.errors.fetchAll = action.payload;
            })


            .addCase(updateOrderStatusAdmin.pending, (state, action) => {
                const { id } = action.meta.arg;
                state.btnLoading[id] = true;
                state.loading.mutation = true;
                state.errors.mutation = null;
                state.messages.mutation = null;
            })
            .addCase(updateOrderStatusAdmin.fulfilled, (state, action) => {
                const { id } = action.meta.arg;
                state.btnLoading[id] = false;
                state.loading.mutation = false;
                state.messages.mutation = action.payload.message;

                const fullyUpdatedOrder = action.payload.updatedOrder;
                if (fullyUpdatedOrder) {

                    state.adminOrders = state.adminOrders.map(order =>
                        order._id === fullyUpdatedOrder._id ? fullyUpdatedOrder : order
                    );

                    if (state.currentOrder?._id === fullyUpdatedOrder._id) {
                        state.currentOrder = fullyUpdatedOrder;
                    }
                }
            })
            .addCase(updateOrderStatusAdmin.rejected, (state, action) => {
                const { id } = action.meta.arg;
                state.btnLoading[id] = false;
                state.loading.mutation = false;
                state.errors.mutation = action.payload;
            })


            .addCase(deleteOrderAdmin.pending, (state, action) => {
                const id = action.meta.arg;
                state.btnLoading[id] = true;
                state.loading.mutation = true;
                state.errors.mutation = null;
                state.messages.mutation = null;
            })
            .addCase(deleteOrderAdmin.fulfilled, (state, action) => {
                const id = action.meta.arg;
                state.btnLoading[id] = false;
                state.loading.mutation = false;
                state.messages.mutation = action.payload.message;

                state.adminOrders = state.adminOrders.filter(order => order._id !== id);

                if (state.currentOrder?._id === id) {
                    state.currentOrder = null;
                }
            })
            .addCase(deleteOrderAdmin.rejected, (state, action) => {
                const id = action.meta.arg;
                state.btnLoading[id] = false;
                state.loading.mutation = false;
                state.errors.mutation = action.payload;
            })


            .addCase(getOrderDetailsAdminThunk.pending, (state) => {
                state.loading.fetchOne = true;
                state.errors.fetchOne = null;
                state.currentOrder = null;
            })
            .addCase(getOrderDetailsAdminThunk.fulfilled, (state, action) => {
                state.loading.fetchOne = false;
                state.currentOrder = action.payload.order || action.payload;
            })
            .addCase(getOrderDetailsAdminThunk.rejected, (state, action) => {
                state.loading.fetchOne = false;
                state.errors.fetchOne = action.payload;
            })
    }
});


export const { clearOrderError, clearOrderMessage } = orderSlice.actions;
export default orderSlice.reducer;