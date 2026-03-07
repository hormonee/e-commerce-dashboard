import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OrderStatusTabs } from '../presentation/components/OrderStatusTabs';

describe('OrderStatusTabs', () => {
    const mockSummary = {
        total: 100,
        pendingPayment: 10,
        preparingProduct: 20,
        shipping: 30,
        delivered: 30,
        cancelled: 10,
    };

    it('각 상태별 주문 수량이 올바르게 렌더링되어야 한다.', () => {
        render(<OrderStatusTabs summary={mockSummary} activeStatus="전체" onStatusChange={vi.fn()} />);

        // '전체' 텍스트를 포함하는 탭을 정규표현식으로 찾습니다 (수량 포함 대응)
        expect(screen.getByRole('tab', { name: /전체/i })).toBeDefined();
        expect(screen.getByText('100')).toBeDefined();
        expect(screen.getByRole('tab', { name: /결제 대기/i })).toBeDefined();
        // 10이라는 숫자는 여러 곳(결제 대기, 취소 등)에서 나타날 수 있으므로 getAllByText를 사용합니다.
        expect(screen.getAllByText('10').length).toBeGreaterThanOrEqual(1);
    });

    it('탭 클릭 시 onStatusChange 핸들러가 올바른 인수와 함께 호출되어야 한다.', () => {
        const handleStatusChange = vi.fn();
        render(<OrderStatusTabs summary={mockSummary} activeStatus="전체" onStatusChange={handleStatusChange} />);

        fireEvent.click(screen.getByText('결제 대기'));
        expect(handleStatusChange).toHaveBeenCalledWith('결제 대기');
    });

    it('활성 상태인 탭은 강조 표시되어야 한다.', () => {
        const { rerender } = render(<OrderStatusTabs summary={mockSummary} activeStatus="전체" onStatusChange={vi.fn()} />);

        // "전체" 탭이 활성화된 스타일을 가지고 있는지 확인 (디자인에 따라 클래스명 등 확인 필요)
        // 여기서는 간단히 텍스트 존재 확인 후, 렌더링 시 시각적 구분은 구현부에서 처리
        expect(screen.getByText('전체').parentElement?.className).toContain('text-blue-500');
    });
});
