import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrderTable } from '../presentation/components/OrderTable';
import { Order } from '../domain/order.entity';

describe('OrderTable', () => {
    const mockOrders: Order[] = [
        {
            id: '1',
            orderNumber: 'ORD-001',
            customerName: '홍길동',
            customerPhone: '010-1234-5678',
            orderAt: '2023.11.24 14:22:31',
            productInfo: '상품 A 외 2건',
            totalAmount: 100000,
            paymentStatus: 'COMPLETED',
            deliveryStatus: 'PREPARING',
        },
    ];

    it('주문 목록이 테이블에 올바르게 렌더링되어야 한다.', () => {
        render(<OrderTable orders={mockOrders} onSelectChange={vi.fn()} />);

        expect(screen.getByText('ORD-001')).toBeDefined();
        expect(screen.getByText('홍길동')).toBeDefined();
        expect(screen.getByText('상품 A 외 2건')).toBeDefined();
        expect(screen.getByText('₩100,000')).toBeDefined();
    });

    it('주문 상태에 따른 배지가 올바르게 표시되어야 한다.', () => {
        render(<OrderTable orders={mockOrders} onSelectChange={vi.fn()} />);

        expect(screen.getByText('결제 완료')).toBeDefined();
        expect(screen.getByText('상품 준비중')).toBeDefined();
    });
});
