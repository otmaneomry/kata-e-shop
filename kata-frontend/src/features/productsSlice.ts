import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productsApi } from '../services/api/products.ts';
import { ProductsState } from "../types";

interface ProductsPageParams {
    page?: number;
    size?: number;
}

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
    pagination: null
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ page = 0, size = 6 }: ProductsPageParams = {}) => {
        return await productsApi.getAll(page, size);
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
                state.items = action.payload.content;
                state.pagination = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export const productsReducer = productsSlice.reducer;