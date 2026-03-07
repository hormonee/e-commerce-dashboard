import { Order, OrderSummary } from '../domain/order.entity';
import { OrderRepository, GetOrdersParams, GetOrdersResponse } from '../domain/order.repository';

export class MockOrderRepository implements OrderRepository {
    private orders: Order[] = [
        {
            id: '1',
            orderNumber: 'ORD-20231124-001',
            customerName: '홍길동',
            customerPhone: '010-1234-5678',
            orderAt: '2023.11.24 14:22:31',
            productInfo: '프리미엄 무선 헤드폰 PRO 외 2건',
            totalAmount: 324000,
            paymentStatus: 'COMPLETED',
            deliveryStatus: 'PREPARING',
        },
        {
            id: '2',
            orderNumber: 'ORD-20231124-002',
            customerName: '이순신',
            customerPhone: '010-9876-5432',
            orderAt: '2023.11.24 13:05:12',
            productInfo: '미니멀 디자인 세라믹 화병 3종 세트',
            totalAmount: 45900,
            paymentStatus: 'WAITING',
            deliveryStatus: 'PENDING',
        },
        {
            id: '3',
            orderNumber: 'ORD-20231124-003',
            customerName: '강감찬',
            customerPhone: '010-5555-4444',
            orderAt: '2023.11.24 12:45:55',
            productInfo: '데스크테리어 원목 모니터 받침대',
            totalAmount: 89000,
            paymentStatus: 'COMPLETED',
            deliveryStatus: 'SHIPPING',
        },
        {
            id: '4',
            orderNumber: 'ORD-20231124-004',
            customerName: '장영실',
            customerPhone: '010-3333-2222',
            orderAt: '2023.11.24 10:30:00',
            productInfo: '울트라 슬림 기계식 키보드 V2',
            totalAmount: 129000,
            paymentStatus: 'CANCELLED',
            deliveryStatus: 'CANCELLED',
        },
    ];

    async getOrders(params: GetOrdersParams): Promise<GetOrdersResponse> {
        // 필터링 시뮬레이션
        let filtered = [...this.orders];

        if (params.searchQuery) {
            filtered = filtered.filter(o =>
                o.orderNumber.includes(params.searchQuery!) ||
                o.customerName.includes(params.searchQuery!)
            );
        }

        if (params.status && params.status !== '전체') {
            // 탭 번역 등의 이유로 추후 정교화 필요
        }

        const summary: OrderSummary = {
            total: 1284,
            pendingPayment: 12,
            preparingProduct: 84,
            shipping: 156,
            delivered: 982,
            cancelled: 50,
        };

        return {
            items: filtered,
            totalCount: summary.total,
            summary,
        };
    }
}
