import React from 'react';
import {Product} from '../../../types';
import {useCart} from '../../../hooks/useCart.ts';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    const {addItem} = useCart();

    const getStockBadge = () => {
        const variants = {
            INSTOCK: 'bg-green-100 text-green-800',
            LOWSTOCK: 'bg-yellow-100 text-yellow-800',
            OUTOFSTOCK: 'bg-red-100 text-red-800',
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${variants[product.inventoryStatus]}`}>
                {product.inventoryStatus}
            </span>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    {getStockBadge()}
                </div>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-bold">${product.price}</span>
                    <button
                        onClick={() => addItem(product)}
                        disabled={product.inventoryStatus === 'OUTOFSTOCK'}
                        className={`
                            px-4 py-2 rounded-md
                            ${product.inventoryStatus === 'OUTOFSTOCK'
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                        }
                        `}
                    >
                        Add to Cart
                    </button>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                    <span className="block">Added: {new Date(product.createdAt).toLocaleString()}</span>
                    {product.updatedAt > product.createdAt && (
                        <span className="block">Updated: {new Date(product.updatedAt).toLocaleString()}</span>
                    )}
                </div>
            </div>
        </div>
    );
};