import { createClient } from "../../../shared/api/supabase/server";
import { IProductRepository, PaginatedProducts } from "../domain/product.repository";
import { Product, ProductFilter } from "../domain/entities/product.entity";
import { ProductMapper, SupabaseProductDto } from "./product.mapper";
import { inspect } from "util";

export class SupabaseProductRepository implements IProductRepository {
    async getProducts(filter: ProductFilter): Promise<PaginatedProducts> {
        try {
            const supabase = await createClient();
            const page = filter.page || 1;
            const pageSize = filter.pageSize || 10;
            const offset = (page - 1) * pageSize;

            let query = supabase
                .from("products")
                .select("*", { count: "exact" });

            // 카테고리 필터링
            if (filter.category && filter.category !== "전체") {
                query = query.eq("category_large", filter.category);
            }

            // 검색어 필터링
            if (filter.search) {
                query = query.ilike("name", `%${filter.search}%`);
            }

            const { data, error, count } = await query
                .order("created_at", { ascending: false })
                .range(offset, offset + pageSize - 1);

            if (error) {
                console.error("SupabaseProductRepository.getProducts error detail:", inspect(error, { depth: null, colors: true }));
                throw error;
            }

            const items = (data || []).map(dto => ProductMapper.toEntity(dto as unknown as SupabaseProductDto));
            const totalCount = count || 0;
            const totalPages = Math.ceil(totalCount / pageSize);

            return {
                items,
                totalCount,
                currentPage: page,
                totalPages,
            };
        } catch (error: any) {
            console.error("SupabaseProductRepository.getProducts fatal error (direct throw):", inspect(error, { depth: null, colors: true }));
            throw error;
        }
    }

    async saveProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
        const supabase = await createClient();

        // Product Entity -> Supabase Table DTO 변환
        const dbProduct = {
            sku: product.sku || `PROD-${Date.now()}`,
            name: product.name,
            description: product.description,
            category_large: product.category.large,
            category_medium: product.category.medium,
            category_small: product.category.small,
            manufacturer: product.manufacturer,
            brand: product.brand,
            regular_price: product.price.regular,
            discount_rate: product.price.discountRate,
            stock_quantity: product.stockCount,
            main_image_url: product.mainImageUrl,
            status: product.status === 'OUT_OF_STOCK' ? 'SOLD_OUT' : 'ON_SALE',
            meta_title: product.seo.metaTitle,
            meta_description: product.seo.metaDescription,
            meta_tags: product.seo.tags, // JSONB 저장 위해 배열 그대로 전달
            shipping_type: product.shipping.type, // CONDITIONAL_FREE 등 DB 체크 제약조건과 일치
            shipping_fee: product.shipping.fee,
        };

        const { data, error } = await supabase
            .from("products")
            .insert(dbProduct)
            .select()
            .single();

        if (error) {
            console.error("SupabaseProductRepository.saveProduct error detail:", inspect(error, { depth: null, colors: true }));
            console.error("Attempted DB Product:", inspect(dbProduct, { depth: null, colors: true }));
            throw error;
        }

        const productId = data.id;

        // 추가 이미지 저장
        if (product.additionalImageUrls && product.additionalImageUrls.length > 0) {
            const imageRecords = product.additionalImageUrls.map((url, index) => ({
                product_id: productId,
                image_url: url,
                display_order: index
            }));

            const { error: imageError } = await supabase
                .from("product_images")
                .insert(imageRecords);

            if (imageError) {
                console.error("SupabaseProductRepository.saveProduct images error:", inspect(imageError, { depth: null, colors: true }));
                // 상품은 저장되었으므로 에러를 던질지 말지 결정 (여기서는 정합성을 위해 던짐)
                throw imageError;
            }
        }

        return ProductMapper.toEntity(data as unknown as SupabaseProductDto);
    }

    async existsBySku(sku: string): Promise<boolean> {
        // DB에 sku 필드가 없으므로 일단 false (필요 시 id 등으로 체크)
        return false;
    }

    async deleteProduct(id: string): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("products")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("SupabaseProductRepository.deleteProduct error:", error);
            throw error;
        }
    }
}
