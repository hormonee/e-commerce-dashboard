export type ProductStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
export type SaleStatus = 'ON_SALE' | 'STOPPED' | 'OUT_OF_STOCK';

export interface ProductOption {
    name: string;
    values: string[];
}

export interface ProductVariant {
    id: string;
    optionCombination: string; // e.g., "Black / Large"
    additionalPrice: number;
    stockCount: number;
    status: SaleStatus;
}

export interface ShippingInfo {
    type: 'FREE' | 'PAID' | 'CONDITIONAL_FREE';
    fee: number;
    conditionalMinAmount?: number;
    isBundleAvailable: boolean;
    method: string;
    originAddress: string;
}

export interface SEOInfo {
    metaTitle: string;
    metaDescription: string;
    tags: string[];
}

export interface Product {
    id: string;
    name: string;
    sku: string;
    promotionText?: string;
    category: {
        large: string;
        medium: string;
        small: string;
    };
    manufacturer?: string;
    brand?: string;
    price: {
        regular: number;
        discountRate: number;
        final: number;
    };
    stockCount: number;
    purchaseLimit?: number;
    maxStock?: number;
    mainImageUrl: string;
    additionalImageUrls: string[];
    options: ProductOption[];
    variants: ProductVariant[];
    description: string;
    shipping: ShippingInfo;
    seo: SEOInfo;
    status: ProductStatus;
    createdAt: Date;
    updatedAt: Date;
}

export type ProductCategory = '전체' | '전자제품' | '의류' | '가구' | '뷰티' | '식품' | '스포츠/레저' | '가정용품';

export interface ProductFilter {
    category?: ProductCategory;
    search?: string;
    page?: number;
    pageSize?: number;
}
