// src/features/products/productsSlice.ts
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {productsApi} from '../services/api/products.ts';
import {ProductsState} from "../types";

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        return await productsApi.getAll();
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export const productsReducer = productsSlice.reducer;