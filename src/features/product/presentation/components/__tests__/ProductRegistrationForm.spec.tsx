import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductRegistrationForm } from '../ProductRegistrationForm';
import { describe, it, expect, vi } from 'vitest';

describe('ProductRegistrationForm (Validation)', () => {
    it('필수 필드가 비어있을 때 상품명 필드를 건드렸다가 벗어나면 에러 메시지를 표시해야 한다', async () => {
        render(<ProductRegistrationForm />);

        const nameInput = screen.getByLabelText(/상품명/i);
        fireEvent.focus(nameInput);
        fireEvent.blur(nameInput);

        await waitFor(() => {
            expect(screen.getByText('상품명을 입력해주세요.')).toBeInTheDocument();
        });
    });

    it('유효하지 않은 데이터를 입력하고 포커스를 해제하면 에러 메시지를 표시해야 한다', async () => {
        render(<ProductRegistrationForm />);

        const priceInput = screen.getByLabelText(/정상가/i);
        // JSDOM의 valueAsNumber 지원을 위해 명시적으로 설정
        fireEvent.change(priceInput, { target: { value: '-100' } });
        // onChange에서 valueAsNumber를 사용하므로 직접 속성을 흉내내거나
        // fireEvent.change 대신 직접 value를 할당해볼 수도 있음
        // 일단 blur를 확실히 함
        fireEvent.blur(priceInput);

        await waitFor(() => {
            // text content가 포함되어 있는지 유연하게 확인
            const errorElement = screen.queryByText(/정상가는 1원 이상이어야 합니다/);
            expect(errorElement).toBeInTheDocument();
        }, { timeout: 3000 });
    });
});
