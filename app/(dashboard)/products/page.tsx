"use client";

import { ProductHeader } from "@/src/features/product/presentation/components/ProductHeader";
import { ProductFilters } from "@/src/features/product/presentation/components/ProductFilters";
import { ProductTable } from "@/src/features/product/presentation/components/ProductTable";
import { Pagination } from "@/src/features/product/presentation/components/Pagination";
import { Suspense } from "react";

// Mock Data
const mockProducts = [
    { id: '1', name: '프리미엄 무선 헤드셋', category: { large: '전자기기' }, price: { final: 299000 }, stockCount: 45, status: 'IN_STOCK', sku: 'HD-001' },
    { id: '2', name: '기계식 게이밍 키보드', category: { large: '전자기기' }, price: { final: 159000 }, stockCount: 12, status: 'LOW_STOCK', sku: 'KB-002' },
];

export default function ProductsPage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <div className="space-y-6">
                <ProductHeader />
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                    <ProductFilters currentCategory="전체" />
                    <ProductTable products={mockProducts as any} onDelete={async () => { }} />
                    <div className="p-6 border-t border-slate-100 bg-slate-50/30">
                        <Pagination currentPage={1} totalPages={10} totalCount={100} />
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
