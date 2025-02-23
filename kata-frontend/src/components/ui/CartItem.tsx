import React from 'react';
import {CartItem as CartItemType} from '../../types';
import {useCart} from '../../hooks/useCart.ts';
import {TrashIcon} from '@heroicons/react/24/outline';

interface CartItemProps {
    item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({item}) => {
    const {updateItemQuantity, removeItem} = useCart();

    return (
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow mb-4">
            <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                    <button
                        onClick={() => updateItemQuantity(item.id, Math.max(1, item.cartQuantity - 1))}
                        className="px-2 py-1 bg-gray-100 rounded"
                    >
                        -
                    </button>
                    <span className="px-2">{item.cartQuantity}</span>
                    <button
                        onClick={() => updateItemQuantity(item.id, item.cartQuantity + 1)}
                        className="px-2 py-1 bg-gray-100 rounded"
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="text-right">
                <p className="font-semibold">
                    ${item.price * item.cartQuantity}
                </p>
                <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800 mt-2"
                >
                    <TrashIcon className="h-5 w-5"/>
                </button>
            </div>
        </div>
    );
};
