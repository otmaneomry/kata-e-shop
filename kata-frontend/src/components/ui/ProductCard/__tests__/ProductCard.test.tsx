import { render, screen } from '@testing-library/react';
import { ProductCard } from '../ProductCard';
import { Provider } from 'react-redux';
import { store } from '../../../../config/store';
import { vi } from 'vitest';

// Mock du hook useCart
vi.mock('../../../../hooks/useCart', () => ({
    useCart: () => ({
        addItem: vi.fn(),
    })
}));

const mockProduct = {
    id: 1,
    code: "test-product",
    name: "Test Product",
    description: "Test Description",
    image: "/test-image.jpg",
    category: "test",
    price: 99.99,
    quantity: 10,
    internalReference: "TEST-001",
    shellId: 1,
    inventoryStatus: "INSTOCK" as const,
    rating: 4.5,
    createdAt: 1708637416000,
    updatedAt: 1708637416000
};

describe('ProductCard', () => {
    const renderWithProvider = (component: React.ReactElement) => {
        return render(
            <Provider store={store}>
                {component}
            </Provider>
        );
    };

    it('renders product basic information', () => {
        renderWithProvider(<ProductCard product={mockProduct} />);

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('$99.99')).toBeInTheDocument();
    });

    it('shows correct status for in-stock product', () => {
        renderWithProvider(<ProductCard product={mockProduct} />);

        expect(screen.getByText('INSTOCK')).toBeInTheDocument();
        const addButton = screen.getByRole('button', { name: /add to cart/i });
        expect(addButton).not.toBeDisabled();
    });
});