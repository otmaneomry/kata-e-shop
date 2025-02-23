import React, { useState } from 'react';
import { ProductCard } from '../components/ui/ProductCard/ProductCard';
import { useProducts } from '../hooks/useProducts';
import {Pagination} from "../components/ui/Pagination.tsx";

const HomePage: React.FC = () => {
    const { products, loading, error } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 2;

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

    // Calcul de la pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Our Products</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {totalPages > 1 && (
                <>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />

                    <div className="text-center text-gray-600 mt-4">
                        Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, products.length)} of {products.length} products
                    </div>
                </>
            )}
        </div>
    );
};

export default HomePage;