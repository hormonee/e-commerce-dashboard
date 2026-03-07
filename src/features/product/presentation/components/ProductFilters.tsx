'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { ProductCategory } from "../../domain/entities/product.entity";
import { cn } from "../../../../shared/lib/utils";

interface ProductFiltersProps {
    currentCategory: ProductCategory;
}

export function ProductFilters({ currentCategory }: ProductFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const categories: ProductCategory[] = ['전체', '전자제품', '의류', '가구', '뷰티', '식품', '스포츠/레저', '가정용품'];

    const handleCategoryChange = (category: ProductCategory) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === '전체') {
            params.delete('category');
        } else {
            params.set('category', category);
        }
        params.set('page', '1'); // 필터 변경 시 1페이지로 리셋
        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={cn(
                        "px-5 py-2.5 rounded-xl text-xs font-black transition-all duration-300 whitespace-nowrap",
                        currentCategory === category
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-100 ring-4 ring-blue-50"
                            : "text-slate-400 hover:text-slate-600 hover:bg-slate-50 font-black"
                    )}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
