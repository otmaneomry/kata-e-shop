import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
               ERROR 404: PAGE NOT FOUND
            </p>
            <Link
                to="/"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
                Return Home
            </Link>
        </div>
    );
};

export default NotFoundPage;