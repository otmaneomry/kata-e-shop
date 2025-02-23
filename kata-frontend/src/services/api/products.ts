import {mockApi} from '../mock/mockApi.ts';
import {Product} from '../../types';
import {API_CONFIG} from '../../config/api.config.ts';
import axios from 'axios';

const api = axios.create({
    baseURL: API_CONFIG.baseUrl
});

export const productsApi = {
    getAll: async (): Promise<Product[]> => {
        try {
            if (API_CONFIG.useMockApi) {
                return await mockApi.products.getAll();
            }

            const response = await api.get<Product[]>('/products');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
};