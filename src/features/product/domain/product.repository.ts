import { Product, ProductFilter } from "./entities/product.entity";

export interface PaginatedProducts {
    items: Product[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
}

export interface IProductRepository {
    getProducts(filter: ProductFilter): Promise<PaginatedProducts>;
    saveProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product>;
    existsBySku(sku: string): Promise<boolean>;
    deleteProduct(id: string): Promise<void>;
}
