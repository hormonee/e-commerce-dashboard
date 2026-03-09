import React from 'react';
import { OrderDetail } from '../../domain/order.entity';
import { cn } from '@/src/shared/lib/utils';

interface OrderItemsTableProps {
    items: OrderDetail['items'];
}

export function OrderItemsTable({ items }: OrderItemsTableProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600">🛒</span>
                    </div>
                    <h3 className="text-lg font-black text-[#0F172A]">주문 상품 ({items.length})</h3>
                </div>
            </div>
            <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <tr>
                        <th className="px-8 py-4">상품 정보</th>
                        <th className="px-6 py-4 text-center">단가</th>
                        <th className="px-6 py-4 text-center">수량</th>
                        <th className="px-8 py-4 text-right">소계</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {items.map((item) => (
                        <tr key={item.id} className="group hover:bg-slate-50/30 transition-colors">
                            <td className="px-8 py-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-black text-[#0F172A] leading-tight text-sm">{item.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400">옵션: {item.optionName || '없음'}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5 text-center font-bold text-slate-600 text-sm">
                                {item.price.toLocaleString()}원
                            </td>
                            <td className="px-6 py-5 text-center font-black text-[#0F172A] text-sm">
                                {item.quantity}
                            </td>
                            <td className="px-8 py-5 text-right font-black text-blue-600 text-sm">
                                {item.totalPrice.toLocaleString()}원
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
