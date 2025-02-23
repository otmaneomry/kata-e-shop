import {CreatedOrder, CreateOrderPayload} from '../../types';
import {API_CONFIG} from '../../config/api.config.ts';
import axios from 'axios';

const api = axios.create({
    baseURL: API_CONFIG.baseUrl
});

export const ordersApi = {
    create: async (payload: CreateOrderPayload): Promise<CreatedOrder> => {
        try {
            const response = await api.post<CreatedOrder>(`/orders`, payload);

            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },
};