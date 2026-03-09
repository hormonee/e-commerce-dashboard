import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateOrderStatusUseCase } from '../application/use-cases/update-order-status.usecase';
import { OrderRepository } from '../domain/order.repository';

describe('UpdateOrderStatusUseCase', () => {
    let mockRepository: OrderRepository;

    beforeEach(() => {
        mockRepository = {
            getOrders: vi.fn(),
            getOrderDetail: vi.fn(),
            updateOrderStatus: vi.fn().mockResolvedValue(true),
        };
    });

    it('주문 ID와 새로운 상태가 제공되면 리포지토리를 호출하여 상태를 업데이트해야 한다.', async () => {
        const orderId = 'ORD-20231024-001';
        const newStatus = 'DELIVERED';

        const result = await updateOrderStatusUseCase(mockRepository, orderId, newStatus);

        expect(mockRepository.updateOrderStatus).toHaveBeenCalledWith(orderId, newStatus);
        expect(result).toBe(true);
    });

    it('리포지토리 업데이트 실패 시 에러를 던져야 한다.', async () => {
        mockRepository.updateOrderStatus = vi.fn().mockRejectedValue(new Error('Update Failed'));

        await expect(updateOrderStatusUseCase(mockRepository, 'ID', 'SHIPPING')).rejects.toThrow('Update Failed');
    });
});
