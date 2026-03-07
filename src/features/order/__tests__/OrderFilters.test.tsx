import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OrderFilters } from '../presentation/components/OrderFilters';

describe('OrderFilters', () => {
    it('필터 항목들이 올바르게 렌더링되어야 한다.', () => {
        render(<OrderFilters onSearch={vi.fn()} onReset={vi.fn()} />);

        expect(screen.getByText('조회 기간')).toBeDefined();
        expect(screen.getByText('검색 조건')).toBeDefined();
        expect(screen.getByText('결제 수단')).toBeDefined();
        expect(screen.getByText('택배사')).toBeDefined();
        expect(screen.getByRole('button', { name: /검색 결과 조회/i })).toBeDefined();
        expect(screen.getByRole('button', { name: /초기화/i })).toBeDefined();
    });

    it('검색 버튼 클릭 시 입력된 필터 값들과 함께 onSearch가 호출되어야 한다.', () => {
        const handleSearch = vi.fn();
        render(<OrderFilters onSearch={handleSearch} onReset={vi.fn()} />);

        // 주문 번호 입력 시뮬레이션
        const searchInput = screen.getByPlaceholderText(/검색어 입력/i);
        fireEvent.change(searchInput, { target: { value: 'ORD-001' } });

        fireEvent.click(screen.getByRole('button', { name: /검색 결과 조회/i }));

        expect(handleSearch).toHaveBeenCalledWith(expect.objectContaining({
            searchQuery: 'ORD-001'
        }));
    });

    it('초기화 버튼 클릭 시 onReset 핸들러가 호출되어야 한다.', () => {
        const handleReset = vi.fn();
        render(<OrderFilters onSearch={vi.fn()} onReset={handleReset} />);

        fireEvent.click(screen.getByRole('button', { name: /초기화/i }));
        expect(handleReset).toHaveBeenCalled();
    });
});
