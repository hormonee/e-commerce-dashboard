import React from 'react';
import { notFound } from 'next/navigation';
import { OrderDetailHeader } from '@/src/features/order/presentation/components/OrderDetailHeader';
import { OrderItemsTable } from '@/src/features/order/presentation/components/OrderItemsTable';
import { OrderShippingPayment } from '@/src/features/order/presentation/components/OrderShippingPayment';
import { OrderCustomerSidebar } from '@/src/features/order/presentation/components/OrderCustomerSidebar';
import { OrderTimeline } from '@/src/features/order/presentation/components/OrderTimeline';
import { OrderCSMemos } from '@/src/features/order/presentation/components/OrderCSMemos';
import { Button } from '@/src/shared/ui/button';

// Clean Architecture - Application Layer (Use Cases)
import { getOrderDetailUseCase } from '@/src/features/order/application/use-cases/get-order-detail.usecase';
// Clean Architecture - Infrastructure Layer (Repository)
import { SupabaseOrderRepository } from '@/src/features/order/infrastructure/supabase-order.repository';

interface OrderDetailPageProps {
    params: {
        id: string;
    };
}

// Composition Root
const orderRepository = new SupabaseOrderRepository();

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
    const { id } = await params;

    try {
        const order = await getOrderDetailUseCase(orderRepository, id);

        return (
            <div className="max-w-[1400px] mx-auto p-8 space-y-10 animate-in fade-in duration-700">
                {/* 상단 헤더 */}
                <OrderDetailHeader
                    orderNumber={order.orderNumber}
                    status={order.deliveryStatus}
                    orderAt={order.orderAt}
                    onStatusUpdate={async (status) => {
                        'use server';
                        // 실제 구현 시 Server Action으로 분리 필요
                        console.log('Update status to:', status);
                    }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* 메인 콘텐츠 (좌측 8) */}
                    <div className="lg:col-span-8 space-y-8">
                        <OrderItemsTable items={order.items} />
                        <OrderShippingPayment shipping={order.shipping} payment={order.payment} />
                        <OrderCSMemos memos={order.memos} />
                    </div>

                    {/* 사이드바 (우측 4) */}
                    <div className="lg:col-span-4 space-y-8">
                        <OrderCustomerSidebar customer={order.customer} />
                        <OrderTimeline timeline={order.timeline} />

                        {/* 하단 액션 버튼 */}
                        <div className="flex flex-col gap-3 pt-4">
                            <Button variant="outline" className="w-full h-12 rounded-2xl font-black text-xs border-slate-100 text-slate-500 hover:bg-slate-50 shadow-none">
                                주문 확인서 출력
                            </Button>
                            <Button variant="outline" className="w-full h-12 rounded-2xl font-black text-xs border-slate-100 text-slate-500 hover:bg-slate-50 shadow-none">
                                거래 명세서 다운로드
                            </Button>
                        </div>
                    </div>
                </div>

                <footer className="pt-10 pb-6 text-center">
                    <p className="text-[10px] font-bold text-slate-300">© 2023 E-Commerce Admin System. All rights reserved.</p>
                </footer>
            </div>
        );
    } catch (error) {
        console.error('Failed to load order detail:', error);
        return notFound();
    }
}
