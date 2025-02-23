import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../config/store.ts';
import {fetchProducts} from '../features/productsSlice.ts';

export const useProducts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.products);

    useEffect(() => {
        if (products.items.length === 0 && !products.loading) {
            dispatch(fetchProducts());
        }
    }, [dispatch]);

    return {
        products: products.items,
        loading: products.loading,
        error: products.error,
    };
};