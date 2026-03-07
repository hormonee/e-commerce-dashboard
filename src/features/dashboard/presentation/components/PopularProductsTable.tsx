import React from 'react';
import { PopularProduct } from '../../domain/entities/dashboard-stats.entity';
import { cn } from '../../../../shared/lib/utils';
import { ArrowRight } from 'lucide-react';

interface PopularProductsTableProps {
    products: PopularProduct[];
}

export function PopularProductsTable({ products }: PopularProductsTableProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 col-span-2 flex flex-col h-full shadow-sm">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-[#0F172A] font-black text-xl">실시간 인기 상품 <span className="text-blue-600">TOP 5</span></h3>
                <button className="text-xs font-black text-slate-400 hover:text-blue-600 transition-all flex items-center gap-1.5 uppercase tracking-widest">
                    전체보기 <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="text-[13px] text-slate-400 font-black border-b border-slate-200 uppercase tracking-tight">
                        <tr>
                            <th scope="col" className="px-4 py-4">상품 정보</th>
                            <th scope="col" className="px-4 py-4 text-right">판매량</th>
                            <th scope="col" className="px-4 py-4 text-right">조회수</th>
                            <th scope="col" className="px-4 py-4 text-right">재고 상태</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {products.map((product) => (
                            <tr key={product.id} className="group hover:bg-slate-50/50 transition-colors duration-200">
                                <td className="px-4 py-5">
                                    <div className="font-black text-[#0F172A] tracking-tight group-hover:text-blue-600 transition-colors">{product.name}</div>
                                    <div className="text-[12px] text-slate-400 font-bold mt-1 uppercase tracking-tight">{product.category}</div>
                                </td>
                                <td className="px-4 py-5 text-right font-black text-slate-600">{product.salesCount.toLocaleString()}</td>
                                <td className="px-4 py-5 text-right text-slate-400 font-bold">{product.viewCount.toLocaleString()}</td>
                                <td className="px-4 py-5 text-right">
                                    {getStatusBadge(product.status)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const getStatusBadge = (status: PopularProduct['status']) => {
    const base = "px-2.5 py-1 rounded-lg text-[10px] font-extrabold shadow-sm ring-1 ring-inset";
    switch (status) {
        case 'IN_STOCK':
            return <span className={cn(base, "bg-emerald-50 text-emerald-700 ring-emerald-100")}>판매중</span>;
        case 'LOW_STOCK':
            return <span className={cn(base, "bg-orange-50 text-orange-700 ring-orange-100")}>품절임박</span>;
        case 'OUT_OF_STOCK':
            return <span className={cn(base, "bg-rose-50 text-rose-700 ring-rose-100")}>품절</span>;
        default:
            return null;
    }
};
