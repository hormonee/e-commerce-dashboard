import React from 'react';
import { OrderDetail, OrderStatus } from '../../domain/order.entity';
import { Button } from '@/src/shared/ui/button';
import { cn } from '@/src/shared/lib/utils';

interface OrderDetailHeaderProps {
    orderNumber: string;
    status: OrderStatus;
    orderAt: string;
    onStatusUpdate: (status: OrderStatus) => void;
}

const statusMap: Record<OrderStatus, { label: string; color: string }> = {
    PENDING: { label: '주문 대기', color: 'bg-slate-100 text-slate-600' },
    PREPARING: { label: '상품 준비 중', color: 'bg-amber-100 text-amber-600' },
    SHIPPING: { label: '배송 중', color: 'bg-blue-100 text-blue-600' },
    DELIVERED: { label: '배송 완료', color: 'bg-emerald-100 text-emerald-600' },
    CANCELLED: { label: '주문 취소', color: 'bg-rose-100 text-rose-600' },
};

export function OrderDetailHeader({ orderNumber, status, orderAt, onStatusUpdate }: OrderDetailHeaderProps) {
    const currentStatus = statusMap[status] || { label: status, color: 'bg-slate-100 text-slate-600' };

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                    <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">#{orderNumber}</h2>
                    <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-black",
                        currentStatus.color
                    )}>
                        {currentStatus.label}
                    </span>
                </div>
                <p className="text-xs font-bold text-slate-400">결제 일시: {orderAt}</p>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="outline" className="h-11 px-6 rounded-2xl font-black text-xs border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50 transition-all">
                    ⤴️ 주문 취소
                </Button>
                <Button variant="outline" className="h-11 px-6 rounded-2xl font-black text-xs border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50 transition-all">
                    💳 강제 환불
                </Button>
                <Button className="h-11 px-8 rounded-2xl font-black text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100 transition-all active:scale-95">
                    ⚙️ 상태 업데이트
                </Button>
            </div>
        </div>
    );
}
