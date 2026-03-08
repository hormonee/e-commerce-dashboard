import React from 'react';
import { Customer } from '../../domain/order.entity';
import { Button } from '@/src/shared/ui/button';

interface OrderCustomerSidebarProps {
    customer: Customer;
}

export function OrderCustomerSidebar({ customer }: OrderCustomerSidebarProps) {
    return (
        <div className="space-y-6">
            {/* 주문 고객 정보 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600">👤</span>
                    </div>
                    <h3 className="text-lg font-black text-[#0F172A]">주문 고객 정보</h3>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shadow-inner">👤</div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-black text-[#0F172A]">{customer.name}</span>
                            <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-500">{customer.grade} 등급</span>
                        </div>
                        <p className="text-xs font-bold text-slate-400">ID: {customer.email.split('@')[0]}</p>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-3">
                        <span className="text-sm">📧</span>
                        <span className="text-xs font-bold text-slate-600">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm">📞</span>
                        <span className="text-xs font-bold text-slate-600">{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm">🔄</span>
                        <span className="text-xs font-bold text-slate-600">총 누적 주문: <span className="text-blue-600 font-black">{customer.totalOrdersCount}회</span> / {customer.totalOrderAmount.toLocaleString()}원</span>
                    </div>
                </div>

                <Button variant="outline" className="w-full h-12 rounded-2xl font-black text-xs border-slate-100 text-slate-500 shadow-none hover:bg-slate-50 mt-2">
                    고객 상세 보기
                </Button>
            </div>
        </div>
    );
}
