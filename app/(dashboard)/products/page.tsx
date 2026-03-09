import { ProductHeader } from "@/src/features/product/presentation/components/ProductHeader";
import { ProductFilters } from "@/src/features/product/presentation/components/ProductFilters";
import { ProductTable } from "@/src/features/product/presentation/components/ProductTable";
import { Pagination } from "@/src/features/product/presentation/components/Pagination";
import { Suspense } from "react";
import { SupabaseProductRepository } from "@/src/features/product/infrastructure/supabase-product.repository";
import { ProductCategory } from "@/src/features/product/domain/entities/product.entity";
import { deleteProductAction } from "@/src/features/product/presentation/actions/delete-product.action";

const productRepository = new SupabaseProductRepository();

interface ProductsPageProps {
    searchParams: Promise<{
        category?: string;
        page?: string;
        search?: string;
    }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const params = await searchParams;
    const category = (params.category as ProductCategory) || "전체";
    const page = Number(params.page) || 1;
    const search = params.search || "";

    const { items, totalCount, totalPages } = await productRepository.getProducts({
        category,
        page,
        pageSize: 10,
        search
    });

    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <div className="space-y-6">
                <ProductHeader />
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                    <ProductFilters currentCategory={category} />
                    <ProductTable
                        products={items}
                        onDelete={deleteProductAction}
                    />
                    <div className="p-6 border-t border-slate-100 bg-slate-50/30">
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            totalCount={totalCount}
                        />
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
