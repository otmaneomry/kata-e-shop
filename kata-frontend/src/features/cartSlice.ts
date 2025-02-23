import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartState, Product} from '../types';

const initialState: CartState = {
    items: [],
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                if (existingItem.cartQuantity < action.payload.quantity) {
                    existingItem.cartQuantity += 1;
                }
            } else {
                state.items.push({...action.payload, cartQuantity: 1});
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.cartQuantity = Math.min(action.payload.quantity, item.quantity);
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {addToCart, removeFromCart, updateQuantity, clearCart} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;