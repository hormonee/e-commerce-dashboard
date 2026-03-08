import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getOrderDetailUseCase } from '../application/use-cases/get-order-detail.usecase';
import { OrderRepository } from '../domain/order.repository';
import { OrderDetail } from '../domain/order.entity';

describe('GetOrderDetailUseCase', () => {
    let mockRepository: OrderRepository;
    const mockOrderDetail: OrderDetail = {
        id: 'ORD-20231024-001',
        orderNumber: 'ORD-20231024-001',
        customerName: '홍길동',
        customerPhone: '010-1234-5678',
        orderAt: '2023-10-24 14:30:22',
        productInfo: '프리미엄 울트라 슬림 노트북 외 2건',
        totalAmount: 1325500,
        paymentStatus: 'COMPLETED',
        deliveryStatus: 'SHIPPING',
        customer: {
            id: 'cust-001',
            name: '홍길동',
            email: 'gildong@example.com',
            phone: '010-1234-5678',
            grade: 'Silver',
            totalOrdersCount: 12,
            totalOrderAmount: 5230000,
        },
        items: [
            {
                id: 'item-001',
                productId: 'prod-001',
                name: '프리미엄 울트라 슬림 노트북',
                imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
                optionName: '스페이스 그레이 / 512GB',
                price: 1250000,
                quantity: 1,
                totalPrice: 1250000,
            },
            {
                id: 'item-002',
                productId: 'prod-002',
                name: '무선 저소음 마우스',
                imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46',
                optionName: '매트 블랙',
                price: 45000,
                quantity: 2,
                totalPrice: 90000,
            }
        ],
        shipping: {
            recipient: '홍길동',
            phone: '010-1234-5678',
            zipCode: '06159',
            address: '서울특별시 강남구 삼성동 123-45 테헤란로 빌딩 12층 1205호',
            trackingNumber: '56829402231',
            courier: 'CJ대한통운',
        },
        payment: {
            method: '현대카드 (일시불)',
            totalProductAmount: 1340000,
            shippingFee: 3000,
            couponDiscount: 15000,
            pointUsage: 2500,
            finalAmount: 1325500,
            paidAt: '2023-10-24 14:31:05',
        },
        timeline: [
            { id: 't1', status: 'SHIPPING', timestamp: '2023-10-25 09:12:44', description: '배송 시작', managerName: '김물류 (물류팀)' },
            { id: 't2', status: 'COMPLETED', timestamp: '2023-10-24 14:31:05', description: '결제 확인' },
            { id: 't3', status: 'PENDING', timestamp: '2023-10-24 14:30:22', description: '주문 생성' },
        ],
        memos: [
            { id: 'm1', content: '누락 방지를 위해 사은품(마우스패드) 동봉하여 출고 부탁드립니다.', authorName: '최지우 과장', createdAt: '2023.10.24 15:05' }
        ]
    };

    beforeEach(() => {
        mockRepository = {
            getOrders: vi.fn(),
            getOrderDetail: vi.fn().mockResolvedValue(mockOrderDetail),
        };
    });

    it('주문 ID가 제공되면 해당 주문의 상세 정보를 반환해야 한다.', async () => {
        const result = await getOrderDetailUseCase(mockRepository, 'ORD-20231024-001');

        expect(mockRepository.getOrderDetail).toHaveBeenCalledWith('ORD-20231024-001');
        expect(result).toEqual(mockOrderDetail);
    });

    it('리포지토리에서 에러 발생 시 예외를 던져야 한다.', async () => {
        mockRepository.getOrderDetail = vi.fn().mockRejectedValue(new Error('Order Not Found'));

        await expect(getOrderDetailUseCase(mockRepository, 'INVALID-ID')).rejects.toThrow('Order Not Found');
    });
});
