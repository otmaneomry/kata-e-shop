import {Product} from '../../types';
import {mockProducts} from './products.ts';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
    products: {
        getAll: async (): Promise<Product[]> => {
            await delay(500);
            return mockProducts;
        },

        getById: async (id: number): Promise<Product | null> => {
            await delay(300);
            const product = mockProducts.find(p => p.id === id);
            if (!product) return null;
            return product;
        },
    },
};