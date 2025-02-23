import {Product} from "../../types";

export const mockProducts: Product[] = [
    {
        id: 1,
        code: "product-1",
        name: "Gaming Laptop",
        description: "High-performance gaming laptop with RTX 3080",
        image: "https://picsum.photos/id/1/300/200",
        category: "electronics",
        price: 1999.99,
        quantity: 10,
        internalReference: "LAP-001",
        shellId: 1,
        inventoryStatus: "INSTOCK", // Now properly typed
        rating: 4.5,
        createdAt: 1708637416000,
        updatedAt: 1708637416000
    },
    {
        id: 2,
        code: "product-2",
        name: "Wireless Headphones",
        description: "Noise-cancelling Bluetooth headphones",
        image: "https://picsum.photos/id/2/300/200",
        category: "accessories",
        price: 299.99,
        quantity: 3,
        internalReference: "HEAD-002",
        shellId: 2,
        inventoryStatus: "LOWSTOCK", // Now properly typed
        rating: 4.8,
        createdAt: 1708637416000,
        updatedAt: 1708637416000
    },
    {
        id: 3,
        code: "product-3",
        name: "4K Monitor",
        description: "32-inch 4K Ultra HD Monitor",
        image: "https://picsum.photos/id/3/300/200",
        category: "electronics",
        price: 599.99,
        quantity: 0,
        internalReference: "MON-003",
        shellId: 3,
        inventoryStatus: "OUTOFSTOCK", // Now properly typed
        rating: 4.6,
        createdAt: 1708637416000,
        updatedAt: 1708637416000
    }
];
