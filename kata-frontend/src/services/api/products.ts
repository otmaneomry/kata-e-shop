import { PageResponse, Product } from '../../types';
import {apiInstance} from "../../config/api.config.ts";


export const productsApi = {
    getAll: async (page: number = 0, size: number = 3): Promise<PageResponse<Product>> => {
        try {
            const response = await apiInstance.get<PageResponse<Product>>(`/products`, {
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