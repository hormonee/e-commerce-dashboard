import { Product, ProductStatus } from "../domain/entities/product.entity";

export interface SupabaseProductDto {
    id: string;
    name: string;
    description: string | null;
    category_large: string | null;
    category_medium: string | null;
    category_small: string | null;
    manufacturer: string | null;
    brand: string | null;
    regular_price: number;
    discount_rate: number | null;
    final_price: number;
    stock_quantity: number | null;
    purchase_limit: number | null;
    main_image_url: string | null;
    shipping_type: string | null;
    status: string | null;
    meta_title: string | null;
    meta_description: string | null;
    meta_tags: any | null;
    created_at: string;
    updated_at: string;
}

export class ProductMapper {
    static toEntity(dto: SupabaseProductDto): Product {
        return {
            id: dto.id,
            name: dto.name,
            sku: dto.id, // DB에 sku 필드 부재 시 일단 id 활용
            promotionText: dto.description?.slice(0, 50) || "", // 임시 매핑
            category: {
                large: dto.category_large || "미분류",
                medium: dto.category_medium || "",
                small: dto.category_small || "",
            },
            manufacturer: dto.manufacturer || "",
            brand: dto.brand || "",
            price: {
                regular: Number(dto.regular_price),
                discountRate: Number(dto.discount_rate || 0),
                final: Number(dto.final_price),
            },
            stockCount: Number(dto.stock_quantity || 0),
            purchaseLimit: dto.purchase_limit || undefined,
            mainImageUrl: dto.main_image_url || "/images/placeholder-product.png",
            additionalImageUrls: [], // 필요 시 product_images 테이블 조인 데이터 매핑
            options: [], // 필요 시 product_variants 테이블 조인 데이터 매핑
            variants: [], // 필요 시 product_variants 테이블 조인 데이터 매핑
            description: dto.description || "",
            shipping: {
                type: (dto.shipping_type as any) || "FREE",
                fee: 0,
                isBundleAvailable: true,
                method: "택배",
                originAddress: "본사 출고",
            },
            seo: {
                metaTitle: dto.meta_title || dto.name,
                metaDescription: dto.meta_description || "",
                tags: Array.isArray(dto.meta_tags) ? dto.meta_tags : [],
            },
            status: this.mapStatus(dto.status),
            createdAt: new Date(dto.created_at),
            updatedAt: new Date(dto.updated_at),
        };
    }

    private static mapStatus(status: string | null): ProductStatus {
        switch (status) {
            case "ON_SALE": return "IN_STOCK";
            case "SOLD_OUT": return "OUT_OF_STOCK";
            default: return "IN_STOCK";
        }
    }
}
