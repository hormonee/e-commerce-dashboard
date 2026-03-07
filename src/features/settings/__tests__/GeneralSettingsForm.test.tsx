import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GeneralSettingsForm } from '../presentation/components/GeneralSettingsForm';

describe('GeneralSettingsForm', () => {
    const mockSettings = {
        storeName: 'My Shop',
        contactEmail: 'test@shop.com',
        storeDescription: 'A test shop',
        addressLine1: 'Test St',
        city: 'Test City',
        state: 'TS',
        zipCode: '12345',
        maintenanceMode: false,
        customerAccounts: false,
    };

    it('초기 설정 데이터가 폼에 올바르게 렌더링되어야 한다.', () => {
        render(<GeneralSettingsForm initialSettings={mockSettings} onSubmit={vi.fn()} />);

        expect(screen.getByLabelText(/상점 이름/i)).toHaveValue('My Shop');
        expect(screen.getByLabelText(/연락처 이메일/i)).toHaveValue('test@shop.com');
        expect(screen.getByLabelText(/주소 1/i)).toHaveValue('Test St');

        // Switch 역할(role) 확인
        const maintenanceToggle = screen.getByLabelText(/유지보수 모드/i);
        expect(maintenanceToggle).not.toBeChecked();
    });

    it('폼 제출 시 onSubmit 핸들러가 호출되어야 한다.', async () => {
        const handleSubmit = vi.fn();
        render(<GeneralSettingsForm initialSettings={mockSettings} onSubmit={handleSubmit} />);

        // 변경사항 저장 버튼 클릭
        fireEvent.click(screen.getByRole('button', { name: /변경사항 저장/i }));

        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalled();
        });
    });
});
