// src/setupTests.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);

// Mock des formats pour éviter les erreurs
vi.mock('./utils', () => ({
    formatPrice: (price: number) => `$${price}`,
    formatDate: (date: number) => new Date(date).toLocaleDateString(),
}));