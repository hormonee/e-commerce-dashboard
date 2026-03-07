import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getOrdersUseCase } from '../application/use-cases/get-orders.usecase';
import { OrderRepository } from '../domain/order.repository';
import { GetOrdersResponse } from '../domain/order.repository';

describe('GetOrdersUseCase', () => {
    let mockRepository: OrderRepository;
    const mockResponse: GetOrdersResponse = {
        items: [
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
        ],
        totalCount: 1,
        summary: {
            total: 1,
            pendingPayment: 0,
            preparingProduct: 1,
            shipping: 0,
            delivered: 0,
            cancelled: 0,
        },
    };

    beforeEach(() => {
        mockRepository = {
            getOrders: vi.fn().mockResolvedValue(mockResponse),
        };
    });

    it('파라미터 없이 호출하면 모든 주문 목록을 반환해야 한다.', async () => {
        const result = await getOrdersUseCase(mockRepository, {});

        expect(mockRepository.getOrders).toHaveBeenCalledWith({});
        expect(result).toEqual(mockResponse);
    });

    it('필터 파라미터가 전달되면 리포지토리에 올바르게 전달해야 한다.', async () => {
        const params = { status: 'PREPARING', searchType: 'orderNumber' as const, searchQuery: '001' };
        await getOrdersUseCase(mockRepository, params);

        expect(mockRepository.getOrders).toHaveBeenCalledWith(params);
    });

    it('리포지토리에서 에러 발생 시 예외를 던져야 한다.', async () => {
        mockRepository.getOrders = vi.fn().mockRejectedValue(new Error('DB Error'));

        await expect(getOrdersUseCase(mockRepository, {})).rejects.toThrow('DB Error');
    });
});
