import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../config/store.ts';
import {addToCart, removeFromCart, updateQuantity, clearCart} from '../features/cartSlice.ts';
import {Product} from '../types';

export const useCart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);

    const addItem = (product: Product) => {
        dispatch(addToCart(product));
    };

    const removeItem = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    const updateItemQuantity = (id: number, quantity: number) => {
        dispatch(updateQuantity({id, quantity}));
    };

    const getTotalItems = () => {
        return cart.items.reduce((total, item) => total + item.cartQuantity, 0);
    };

    const resetCart = () => {
        dispatch(clearCart());
    };

    const getTotalPrice = () => {
        return cart.items.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
    };

    return {
        items: cart.items,
        loading: cart.loading,
        error: cart.error,
        addItem,
        removeItem,
        updateItemQuantity,
        getTotalItems,
        getTotalPrice,
        resetCart
    };
};