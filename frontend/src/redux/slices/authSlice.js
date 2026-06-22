import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async (userData, thunkAPI) => {
        try {
            const res = await api.post("/auth/signup", userData);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Signup Error!"
            );
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, thunkAPI) => {
        try {
            const res = await api.post("/auth/login", userData);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Login Error!"
            );
        }
    }
);

export const loadUser = createAsyncThunk(
    "auth/loadUser",
    async (_, thunkAPI) => {
        try {
            const res = await api.get("/auth/getme");
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "You are not logged in!"
            );
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, thunkAPI) => {
        try {
            const res = await api.post("/auth/logout");
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Logout Error!"
            );
        }
    }
);

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    message: "",
    role: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        },

        clearAuthMessage: (state) => {
            state.message = "";
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = "";
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.message = action.payload.message;
                state.role = action.payload.role;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = "";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.message = action.payload.message;
                state.role = action.payload.role;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })

            .addCase(loadUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.message = action.payload.message;
                state.role = action.payload.role;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })

            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.message = action.payload.message;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearAuthError, clearAuthMessage } = authSlice.actions;
export default authSlice.reducer;