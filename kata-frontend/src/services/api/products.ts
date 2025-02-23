import { PageResponse, Product } from '../../types';
import { mockApi } from '../../services/mock/mockApi';
import { API_CONFIG } from '../../config/api.config';
import axios from 'axios';

const api = axios.create({
    baseURL: API_CONFIG.baseUrl
});

export const productsApi = {
    getAll: async (page: number = 0, size: number = 3): Promise<PageResponse<Product>> => {
        try {
            if (API_CONFIG.useMockApi) {
                return await mockApi.products.getAll();
            }

            const response = await api.get<PageResponse<Product>>(`/products`, {
                params: {
                    page,
                    size
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
};