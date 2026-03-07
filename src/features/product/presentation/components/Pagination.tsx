'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../../../shared/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalCount: number;
}

export function Pagination({ currentPage, totalPages, totalCount }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`/products?${params.toString()}`);
    };

    const startRange = (currentPage - 1) * 10 + 1;
    const endRange = Math.min(currentPage * 10, totalCount);

    return (
        <div className="flex flex-col gap-4 mt-8 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
            {/* 상단 정보 영역 */}
            <div className="flex justify-end border-b border-slate-100 pb-3">
                <div className="text-[12px] font-black text-slate-400 uppercase tracking-widest">
                    총 <span className="text-blue-600 font-black">{totalCount}</span>개의 상품 중 <span className="text-[#0F172A]">{startRange}</span> - <span className="text-[#0F172A]">{endRange}</span> 표시
                </div>
            </div>

            {/* 하단 버튼 영역 - 중앙 정렬 */}
            <div className="flex items-center justify-center gap-3">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 text-slate-400 hover:text-blue-600 disabled:opacity-30 hover:bg-blue-50 rounded-xl transition-all border border-slate-100 hover:border-blue-100 shadow-sm"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 mx-1">
                    {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        return (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={cn(
                                    "w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-black transition-all",
                                    currentPage === page
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-100 ring-4 ring-blue-50"
                                        : "text-slate-400 hover:bg-slate-50 hover:text-slate-600 border border-transparent hover:border-slate-100"
                                )}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 text-slate-400 hover:text-blue-600 disabled:opacity-30 hover:bg-blue-50 rounded-xl transition-all border border-slate-100 hover:border-blue-100 shadow-sm"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
