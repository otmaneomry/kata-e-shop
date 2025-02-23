export interface Product {
    id: number;
    code: string;
    name: string;
    description: string;
    image: string;
    category: string;
    price: number;
    quantity: number;
    internalReference: string;
    shellId: number;
    inventoryStatus: "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK";
    rating: number;
    createdAt: number;
    updatedAt: number;
}

export interface CartItem extends Product {
    cartQuantity: number;
}

export interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
}

export interface CreateOrderPayload {
    createdAt: string;
    items: OrderItem[];
}

export interface CreatedOrder {
    id: number;
    createdAt: string;
    items: {
        id: number;
        productId: number;
        quantity: number;
        price: number;
    }[];
}

export interface CartState {
    items: CartItem[];
    loading: boolean;
    error: string | null;
}

export interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

export interface PageResponse<T> {
    content: T[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        offset: number;
    };
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    numberOfElements: number;
}