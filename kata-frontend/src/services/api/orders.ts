import {CreatedOrder, CreateOrderPayload} from '../../types';
import {apiInstance} from "../../config/api.config.ts";

export const ordersApi = {
    create: async (payload: CreateOrderPayload): Promise<CreatedOrder> => {
        try {
            const response = await apiInstance.post<CreatedOrder>(`/orders`, payload);

            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },
};