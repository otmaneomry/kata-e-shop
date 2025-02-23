import React from 'react';
import { ProductCard } from '../components/ui/ProductCard/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { Pagination } from '../components/ui/Pagination';

const HomePage: React.FC = () => {
    const { products, loading, error, pagination, onPageChange } = useProducts();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 py-8">
                {error}
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Our Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {pagination && (
                <Pagination
                    currentPage={pagination.number}
                    totalPages={pagination.totalPages}
                    onPageChange={onPageChange}
                    totalElements={pagination.totalElements}
                    pageSize={pagination.size}
                />
            )}
        </div>
    );
};

export default HomePage;