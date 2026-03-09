"use server";

import { revalidatePath } from "next/cache";
import { SupabaseProductRepository } from "../../infrastructure/supabase-product.repository";

const productRepository = new SupabaseProductRepository();

export async function deleteProductAction(id: string) {
    try {
        await productRepository.deleteProduct(id);
        revalidatePath("/products");
        return { success: true };
    } catch (error) {
        console.error("deleteProductAction error:", error);
        return { success: false, error: "상품 삭제에 실패했습니다." };
    }
}
