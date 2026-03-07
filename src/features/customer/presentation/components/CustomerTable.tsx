import React from 'react';
import { Customer } from '../../domain/entities/customer.entity';
import { cn } from '@/src/shared/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomerTableProps {
    customers: Customer[];
    totalCount: number;
}

export function CustomerTable({ customers, totalCount }: CustomerTableProps) {
    const getGradeBadge = (grade: Customer['grade']) => {
        const base = "px-2.5 py-1 rounded-full text-[10px] font-bold";
        switch (grade) {
            case 'VIP': return <span className={cn(base, "bg-[#F59E0B]/20 text-[#D97706]")}>VIP</span>;
            case 'Gold': return <span className={cn(base, "bg-[#3B82F6]/20 text-[#2563EB]")}>Gold</span>;
            case 'Silver': return <span className={cn(base, "bg-slate-400/20 text-slate-400")}>Silver</span>;
            default: return <span className={cn(base, "bg-slate-700 text-slate-400")}>{grade}</span>;
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="overflow-hidden border border-slate-200 rounded-3xl bg-white shadow-sm">
                <table className="w-full text-left text-xs text-slate-500">
                    <thead className="bg-slate-50/50 text-slate-400 font-bold uppercase tracking-widest border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-5 font-medium"><input type="checkbox" className="rounded-md bg-white border-slate-300 text-blue-600 focus:ring-blue-500/20" /></th>
                            <th className="px-6 py-5">고객 정보</th>
                            <th className="px-6 py-5 text-center">등급</th>
                            <th className="px-6 py-5 text-right">LTV</th>
                            <th className="px-6 py-5 text-right">AOV</th>
                            <th className="px-6 py-5 text-center">주문 횟수</th>
                            <th className="px-6 py-5 text-center">최종 방문일</th>
                            <th className="px-6 py-5 text-center tracking-normal normal-case">액션</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {customers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors duration-200 group">
                                <td className="px-6 py-5"><input type="checkbox" className="rounded-md bg-white border-slate-300 text-blue-600" /></td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center font-extrabold text-[#0F172A] text-sm border border-white shadow-sm tracking-tighter ring-4 ring-slate-50/50">
                                            {customer.name.substring(0, 2)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-extrabold text-[#0F172A] tracking-tight">{customer.name}</div>
                                            <div className="text-[10px] text-slate-400 font-medium mt-1">{customer.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">{getGradeBadge(customer.grade)}</td>
                                <td className="px-6 py-5 text-right font-extrabold text-[#0F172A] tracking-tight">₩{customer.ltv.toLocaleString()}</td>
                                <td className="px-6 py-5 text-right text-slate-600 font-bold">₩{customer.aov.toLocaleString()}</td>
                                <td className="px-6 py-5 text-center font-bold">
                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg">{customer.orderCount}회</span>
                                </td>
                                <td className="px-6 py-5 text-center text-slate-500 font-medium">{customer.lastVisitDate}</td>
                                <td className="px-6 py-5 text-center">
                                    <button className="text-blue-600 hover:text-blue-700 text-xs font-bold hover:underline underline-offset-4 decoration-2">상세보기</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 페이지네이션 영역 개편 (조밀하게 최적화) */}
            <div className="flex flex-col gap-4 mt-5 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                {/* 상단 정보 영역 */}
                <div className="flex justify-end border-b border-slate-100 pb-3">
                    <div className="text-[12px] font-black text-slate-400 uppercase tracking-widest">
                        총 <span className="text-blue-600 font-black">{totalCount.toLocaleString()}</span>명의 고객 중 <span className="text-[#0F172A]">1</span> - <span className="text-[#0F172A]">20</span> 표시
                    </div>
                </div>

                {/* 하단 버튼 영역 - 중앙 정렬 */}
                <div className="flex items-center justify-center gap-3">
                    <button className="p-2 text-slate-400 hover:text-blue-600 disabled:opacity-30 hover:bg-blue-50 rounded-xl transition-all border border-slate-100 hover:border-blue-100 shadow-sm">
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5 mx-1">
                        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-black bg-blue-600 text-white shadow-lg shadow-blue-100 ring-4 ring-blue-50">1</button>
                        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-black text-slate-400 hover:bg-slate-50 hover:text-slate-600 border border-transparent hover:border-slate-100">2</button>
                        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-black text-slate-400 hover:bg-slate-50 hover:text-slate-600 border border-transparent hover:border-slate-100">3</button>
                    </div>

                    <button className="p-2 text-slate-400 hover:text-blue-600 disabled:opacity-30 hover:bg-blue-50 rounded-xl transition-all border border-slate-100 hover:border-blue-100 shadow-sm">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
