import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RegisterProductUseCase } from './register-product.usecase';
import { IProductRepository } from '../../domain/product.repository';
import { Product } from '../../domain/entities/product.entity';

describe('RegisterProductUseCase', () => {
    let useCase: RegisterProductUseCase;
    let mockRepository: any;

    const validProductData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
        name: '테스트 상품',
        sku: 'TEST-SKU-001',
        promotionText: '최고의 상품',
        category: { large: '의류', medium: '상의', small: '셔츠' },
        manufacturer: '제조사A',
        brand: '브랜드B',
        price: { regular: 10000, discountRate: 10, final: 9000 },
        stockCount: 100,
        purchaseLimit: 5,
        mainImageUrl: 'main.jpg',
        additionalImageUrls: ['sub1.jpg'],
        options: [],
        variants: [],
        description: '상품 설명입니다.',
        shipping: {
            type: 'PAID',
            fee: 3000,
            isBundleAvailable: true,
            method: '택배',
            originAddress: '서울시'
        },
        seo: { metaTitle: '제목', metaDescription: '설명', tags: ['태그'] },
        status: 'IN_STOCK'
    };

    beforeEach(() => {
        mockRepository = {
            getProducts: vi.fn(),
            saveProduct: vi.fn(),
            existsBySku: vi.fn(),
            deleteProduct: vi.fn(),
        };
        useCase = new RegisterProductUseCase(mockRepository);
    });

    it('상품을 성공적으로 등록해야 한다', async () => {
        const savedProduct: Product = { ...validProductData, id: 'gen-id', createdAt: new Date(), updatedAt: new Date() };
        mockRepository.existsBySku.mockResolvedValue(false);
        mockRepository.saveProduct.mockResolvedValue(savedProduct);

        const result = await useCase.execute(validProductData);

        expect(result).toEqual(savedProduct);
        expect(mockRepository.saveProduct).toHaveBeenCalledWith(validProductData);
    });

    it('SKU가 중복될 경우 에러를 던져야 한다', async () => {
        mockRepository.existsBySku.mockResolvedValue(true);

        await expect(useCase.execute(validProductData)).rejects.toThrow('이미 존재하는 상품 코드(SKU)입니다.');
        expect(mockRepository.saveProduct).not.toHaveBeenCalled();
    });
});
