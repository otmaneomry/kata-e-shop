import { useState, useEffect } from 'react';
import { Product, PageResponse } from '../types';
import {productsApi} from "../services/api/products.ts";

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<PageResponse<Product> | null>(null);

    const fetchProducts = async (page: number = 0) => {
        try {
            setLoading(true);
            const response = await productsApi.getAll(page);
            setProducts(response.content);
            setPagination(response);
            setError(null);
        } catch (err) {
            setError('Failed to fetch products');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const onPageChange = (page: number) => {
        fetchProducts(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return {
        products,
        loading,
        error,
        pagination,
        onPageChange
    };
};