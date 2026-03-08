import { OrderManagementContent } from "@/src/features/order/presentation/components/OrderManagementContent";
import { Suspense } from "react";
import { SupabaseOrderRepository } from "@/src/features/order/infrastructure/supabase-order.repository";

// Clean Architecture - Infrastructure Root
const orderRepository = new SupabaseOrderRepository();

export default async function OrdersPage() {
    // 실제 데이터 페칭 (추후 UseCase를 통한 검색/필터링 연동 필요)
    const { items, summary, totalCount } = await orderRepository.getOrders({
        page: 1,
        pageSize: 20
    });

    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <OrderManagementContent
                initialItems={items}
                summary={summary as any}
                totalCount={totalCount}
            />
        </Suspense>
    );
}
