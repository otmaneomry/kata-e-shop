import React from 'react';
import {Link} from 'react-router-dom';
import {useCart} from '../hooks/useCart';
import {CartItem} from '../components/ui/CartItem.tsx';
import {ordersApi} from "../services/api/orders.ts";

const CartPage: React.FC = () => {
    const {items, getTotalPrice, resetCart} = useCart();

    const handleCheckout = async () => {
        try {
            const orderPayload = {
                createdAt: new Date().toISOString(),
                items: items.map(item => ({
                    productId: item.id,
                    quantity: item.cartQuantity,
                    price: item.price
                }))
            };

            const order = await ordersApi.create(orderPayload);
            alert(`Order created with success ${JSON.stringify(order)}`);
            console.log('Order created with success', order);
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order. See console for details.');
        }

        setTimeout(() => {
            resetCart();
        }, 1000)
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Add some products to your cart</p>
                <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {items.map(item => (
                        <CartItem key={item.id} item={item}/>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${getTotalPrice().toFixed(2)}</span>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${getTotalPrice().toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 cursor-pointer"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </button>

                            <Link
                                to="/"
                                className="block text-center text-blue-600 hover:text-blue-800 cursor-pointer"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;