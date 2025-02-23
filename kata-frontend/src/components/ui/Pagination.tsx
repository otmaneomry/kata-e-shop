interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalElements: number;
    pageSize: number;
}

export const Pagination: React.FC<PaginationProps> = ({
                                                          currentPage,
                                                          totalPages,
                                                          onPageChange,
                                                          totalElements,
                                                          pageSize
                                                      }) => {
    const startItem = currentPage * pageSize + 1;
    const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

    return (
        <div className="mt-8">
            <div className="flex justify-center items-center space-x-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className={`px-4 py-2 rounded-md ${
                        currentPage === 0
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                    Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => onPageChange(index)}
                        className={`px-4 py-2 rounded-md ${
                            currentPage === index
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    className={`px-4 py-2 rounded-md ${
                        currentPage === totalPages - 1
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                    Next
                </button>
            </div>
            <div className="text-center text-gray-600 mt-4">
                Showing {startItem} to {endItem} of {totalElements} products
            </div>
        </div>
    );
};