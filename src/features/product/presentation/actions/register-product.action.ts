'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SupabaseProductRepository } from '../../infrastructure/supabase-product.repository';
import { ProductRegistrationData } from '../../domain/product.schema';

export async function registerProductAction(data: ProductRegistrationData) {
    const repository = new SupabaseProductRepository();

    try {
        // 엔티티 구조에 맞게 변환하여 저장
        // (현재 Repository의 saveProduct는 Partial<Product>를 받음)
        await repository.saveProduct({
            name: data.name,
            description: data.description || '',
            category: {
                large: data.category.large,
                medium: data.category.medium,
                small: data.category.small
            },
            price: {
                regular: data.price.regular,
                discountRate: data.price.discountRate,
                final: data.price.final
            },
            stockCount: data.stockCount,
            mainImageUrl: data.mainImageUrl || '',
            additionalImageUrls: data.additionalImageUrls,
            options: data.options.map(opt => ({
                name: opt.name,
                values: opt.values
            })),
            shipping: {
                ...data.shipping,
                isBundleAvailable: data.shipping.isBundleAvailable
            },
            seo: {
                metaTitle: data.seo.metaTitle || '',
                metaDescription: data.seo.metaDescription || '',
                tags: data.seo.tags
            },
            status: data.stockCount > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
            sku: `PROD-${Date.now()}`, // Temporary SKU generation
            variants: []
        });

        revalidatePath('/products');
        return { success: true };
    } catch (error: any) {
        console.error('Failed to register product:', error);
        return { error: '상품 등록에 실패했습니다. 관리자에게 문의하세요.' };
    }
}
