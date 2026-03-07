"use client";

import { OrderStatusTabs } from "@/src/features/order/presentation/components/OrderStatusTabs";
import { OrderFilters } from "@/src/features/order/presentation/components/OrderFilters";
import { OrderTable } from "@/src/features/order/presentation/components/OrderTable";
import { OrderPagination } from "@/src/features/order/presentation/components/OrderPagination";
import { Suspense } from "react";

// Mock Data
const mockOrders = [
    { id: '1', orderNumber: 'ORD-001', customerName: '이하나', customerPhone: '010-1234-5678', orderAt: '2024-03-07 14:20', productInfo: '프리미엄 무선 헤드셋 외 1건', totalAmount: 320000, paymentStatus: 'COMPLETED', deliveryStatus: 'SHIPPING' },
    { id: '2', orderNumber: 'ORD-002', customerName: '김철수', customerPhone: '010-2345-6789', orderAt: '2024-03-07 13:45', productInfo: '기계식 게이밍 키보드', totalAmount: 159000, paymentStatus: 'COMPLETED', deliveryStatus: 'PREPARING' },
];

const orderSummary = {
    total: 1250,
    pendingPayment: 12,
    preparingProduct: 45,
    shipping: 124,
    delivered: 1025,
    cancelled: 36
};

export default function OrdersPage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">주문 관리</h1>
                </div>
                <OrderStatusTabs summary={orderSummary as any} activeStatus="all" onStatusChange={() => { }} />
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                    <OrderFilters onSearch={() => { }} onReset={() => { }} />
                    <OrderTable orders={mockOrders as any} />
                    <div className="p-6 border-t border-slate-100 bg-slate-50/30">
                        <OrderPagination currentPage={1} totalCount={1250} pageSize={20} onPageChange={() => { }} />
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
