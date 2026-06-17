import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_API = import.meta.env.VITE_BASE_API;


export const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
    try {
        const response = await axios.get(
            `${BASE_API}/auth/getme`,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || 'Session expired'
        );
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoggedIn: false,
        loading: true,
        error: null
    },
    reducers: {

        setCredentials: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.loading = false;
        },
        clearCredentials: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoggedIn = true;
                state.loading = false;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.user = null;
                state.isLoggedIn = false;
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;