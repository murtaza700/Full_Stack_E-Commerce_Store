import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../lib/api'

export const fetchAllSliders = createAsyncThunk(
    'sliders/fetchAllSliders',
    async (_, thunkAPI) => {
        try {
            const res = await api.get('/sliders')
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err?.response?.data?.message || 'Something went wrong. Please try again!')
        }
    }
)

export const createSlider = createAsyncThunk(
    'sliders/createSlider',
    async (data, thunkAPI) => {
        try {
            const res = await api.post('/sliders', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err?.response?.data?.message || 'Something went wrong. Please try again!')
        }
    }
)

export const updateSlider = createAsyncThunk(
    'sliders/updateSlider',
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await api.patch(`/sliders/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err?.response?.data?.message || 'Something went wrong. Please try again!')
        }
    }
)

export const deleteSlider = createAsyncThunk(
    'sliders/deleteSlider',
    async (id, thunkAPI) => {
        try {
            const res = await api.delete(`/sliders/${id}`)
            return { id, data: res.data };
        } catch (err) {
            return thunkAPI.rejectWithValue(err?.response?.data?.message || 'Something went wrong. Please try again!')
        }
    }
)

const initialState = {
    sliders: [],
    loading: {
        fetch: false,
        mutation: false
    },
    btnLoading: {},
    errors: {
        fetch: null,
        mutation: null
    },
    message: null,
    actionSuccess: false
}

const sliderSlice = createSlice({
    name: 'sliders',
    initialState: initialState,
    reducers: {
        clearSliderError: (state, action) => {
            state.errors[action.payload] = null;
        },
        clearSliderMessage: (state) => {
            state.message = null;
        },
        resetSliderStatusFlags: (state) => {
            state.actionSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchAllSliders.pending, (state) => {
                state.loading.fetch = true;
                state.errors.fetch = null;
            })
            .addCase(fetchAllSliders.fulfilled, (state, action) => {
                state.loading.fetch = false;
                state.sliders = action.payload.sliders || []
            })
            .addCase(fetchAllSliders.rejected, (state, action) => {
                state.loading.fetch = false;
                state.errors.fetch = action.payload;
            })


            .addCase(createSlider.pending, (state) => {
                state.loading.mutation = true;
                state.errors.mutation = null;
                state.actionSuccess = false;
            })
            .addCase(createSlider.fulfilled, (state, action) => {
                state.loading.mutation = false;
                state.actionSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(createSlider.rejected, (state, action) => {
                state.loading.mutation = false;
                state.actionSuccess = false;
                state.errors.mutation = action.payload;
            })


            .addCase(updateSlider.pending, (state) => {
                state.loading.mutation = true;
                state.actionSuccess = false;
                state.errors.mutation = null;
            })
            .addCase(updateSlider.fulfilled, (state, action) => {
                state.loading.mutation = false;
                state.actionSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(updateSlider.rejected, (state, action) => {
                state.loading.mutation = false;
                state.actionSuccess = false;
                state.errors.mutation = action.payload;
            })


            .addCase(deleteSlider.pending, (state, action) => {
                const targetId = action.meta.arg;
                state.btnLoading[targetId] = true;
                state.actionSuccess = false;
                state.errors.mutation = null;
            })
            .addCase(deleteSlider.fulfilled, (state, action) => {
                const targetId = action.payload.id || action.meta.arg;
                state.btnLoading[targetId] = false;
                state.actionSuccess = true;
                state.message = action.payload.data?.message;
                state.sliders = state.sliders.filter(slide => slide._id !== targetId);
            })
            .addCase(deleteSlider.rejected, (state, action) => {
                const targetId = action.meta.arg;
                state.btnLoading[targetId] = false;
                state.actionSuccess = false;
                state.errors.mutation = action.payload;
            })
    }
})


export const { clearSliderError, clearSliderMessage, resetSliderStatusFlags } = sliderSlice.actions;
export default sliderSlice.reducer;