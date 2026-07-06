import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

export const fetchAllUsersAdmin = createAsyncThunk(
    'adminUsers/fetchAll',
    async (_, thunkAPI) => {
        try {
            const serverResponse = await api.get('/users');
            return serverResponse.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Platform users acquisition cluster route error.");
        }
    }
);

export const deleteUserAccountAdmin = createAsyncThunk(
    'adminUsers/deleteAccount',
    async (targetClientHexId, thunkAPI) => {
        try {
            const serverResponse = await api.delete(`/users/${targetClientHexId}`);
            return { targetClientHexId, data: serverResponse.data };
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Client profile deletion corridor execution failure.");
        }
    }
);

const allUsersSlice = createSlice({
    name: 'adminUsers',
    initialState: {
        allUsersAdmin: [],
        loading: {
            fetchAll: false,
            deleteAction: false
        },
        errors: {
            fetchAll: null,
            deleteAction: null
        },
        actionSuccess: false
    },
    reducers: {
        clearAdminUsersErrors: (state) => {
            state.errors.fetchAll = null;
            state.errors.deleteAction = null;
        },
        resetAdminUsersStatusFlags: (state) => {
            state.actionSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
        
            .addCase(fetchAllUsersAdmin.pending, (state) => {
                state.loading.fetchAll = true;
                state.errors.fetchAll = null;
            })
            .addCase(fetchAllUsersAdmin.fulfilled, (state, action) => {
                state.loading.fetchAll = false;
                state.allUsersAdmin = action.payload.users || [];
            })
            .addCase(fetchAllUsersAdmin.rejected, (state, action) => {
                state.loading.fetchAll = false;
                state.errors.fetchAll = action.payload;
            })

            
            .addCase(deleteUserAccountAdmin.pending, (state) => {
                state.loading.deleteAction = true;
                state.errors.deleteAction = null;
                state.actionSuccess = false;
            })
            .addCase(deleteUserAccountAdmin.fulfilled, (state, action) => {
                state.loading.deleteAction = false;
                state.actionSuccess = true;
                state.allUsersAdmin = state.allUsersAdmin.filter(
                    (userProfileNode) => userProfileNode._id !== action.payload.targetClientHexId
                );
            })
            .addCase(deleteUserAccountAdmin.rejected, (state, action) => {
                state.loading.deleteAction = false;
                state.actionSuccess = false;
                state.errors.deleteAction = action.payload;
            });
    }
});

export const { clearAdminUsersErrors, resetAdminUsersStatusFlags } = allUsersSlice.actions;
export default allUsersSlice.reducer;