import { IProductRepository, PaginatedProducts } from "../domain/product.repository";
import { Product, ProductFilter, ProductCategory } from "../domain/entities/product.entity";

export class MockProductRepository implements IProductRepository {
    private products: Product[] = [
        {
            id: '1',
            name: '프리미엄 무선 헤드폰',
            sku: 'ELEC-001',
            promotionText: '몰입감 넘치는 사운드',
            category: { large: '전자제품', medium: '음향기기', small: '헤드폰' },
            manufacturer: 'SoundMaster',
            brand: 'SonicStream',
            price: { regular: 299000, discountRate: 10, final: 269100 },
            stockCount: 120,
            purchaseLimit: 2,
            mainImageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
            additionalImageUrls: [],
            options: [],
            variants: [],
            description: '프리미엄 노이즈 캔슬링 헤즈폰입니다.',
            shipping: { type: 'FREE', fee: 0, isBundleAvailable: true, method: '택배', originAddress: '경기도 파주시' },
            seo: { metaTitle: '프리미엄 무선 헤드폰', metaDescription: '최고의 사운드', tags: ['헤드폰', '무선'] },
            status: 'IN_STOCK',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
        },
        // ... 생략하거나 일부만 업데이트 (실무에서는 전체 마이그레이션 필요)
    ];

    async getProducts(filter: ProductFilter): Promise<PaginatedProducts> {
        let filtered = [...this.products];

        if (filter.category) {
            // 카테고리 필터링 로직 수정 필요 (객체 구조이므로)
            // 임시로 대분류만 체크
            // filtered = filtered.filter(p => p.category.large === filter.category);
        }

        if (filter.search) {
            const searchLower = filter.search.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchLower) ||
                p.sku.toLowerCase().includes(searchLower)
            );
        }

        const totalCount = filtered.length;
        const page = filter.page || 1;
        const pageSize = filter.pageSize || 10;
        const totalPages = Math.ceil(totalCount / pageSize);
        const start = (page - 1) * pageSize;
        const items = filtered.slice(start, start + pageSize);

        return {
            items,
            totalCount,
            currentPage: page,
            totalPages,
        };
    }

    async saveProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
        const newProduct: Product = {
            ...product,
            id: Math.random().toString(36).substring(7),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.products.push(newProduct);
        return newProduct;
    }

    async existsBySku(sku: string): Promise<boolean> {
        return this.products.some(p => p.sku === sku);
    }

    async deleteProduct(id: string): Promise<void> {
        this.products = this.products.filter(p => p.id !== id);
    }
}
