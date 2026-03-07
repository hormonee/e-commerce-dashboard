import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetProductsUseCase } from './get-products.usecase';
import { IProductRepository } from '../../domain/product.repository';
import { ProductFilter } from '../../domain/entities/product.entity';

describe('GetProductsUseCase', () => {
    let useCase: GetProductsUseCase;
    let mockRepository: IProductRepository;

    beforeEach(() => {
        mockRepository = {
            getProducts: vi.fn(),
            deleteProduct: vi.fn(),
        };
        useCase = new GetProductsUseCase(mockRepository);
    });

    it('필터 조건 없이 모든 상품 목록을 가져와야 함', async () => {
        // Arrange
        const mockData = {
            items: [
                {
                    id: '1',
                    name: '상품 1',
                    sku: 'SKU-001',
                    category: '전자제품',
                    price: 100,
                    stockCount: 50,
                    maxStock: 100,
                    status: 'IN_STOCK' as const,
                    imageUrl: 'url1',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            totalCount: 1,
            currentPage: 1,
            totalPages: 1,
        };
        (mockRepository.getProducts as any).mockResolvedValue(mockData);

        // Act
        const result = await useCase.execute({});

        // Assert
        expect(result.items).toHaveLength(1);
        expect(result.items[0].name).toBe('상품 1');
        expect(mockRepository.getProducts).toHaveBeenCalledWith({});
    });

    it('카테고리 필터가 적용된 상품 목록을 가져와야 함', async () => {
        // Arrange
        const filter: ProductFilter = { category: '전자제품' };
        (mockRepository.getProducts as any).mockResolvedValue({
            items: [],
            totalCount: 0,
            currentPage: 1,
            totalPages: 0,
        });

        // Act
        await useCase.execute(filter);

        // Assert
        expect(mockRepository.getProducts).toHaveBeenCalledWith(filter);
    });
});
