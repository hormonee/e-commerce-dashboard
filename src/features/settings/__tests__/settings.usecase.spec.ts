import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSettingsUseCase } from '../application/get-settings.usecase';
import { updateSettingsUseCase } from '../application/update-settings.usecase';
import { SettingsRepository } from '../domain/settings.repository';
import { Settings } from '../domain/settings.entity';
import { UpdateSettingsDto } from '../application/settings.dto';

describe('Settings UseCases', () => {
    let mockRepository: SettingsRepository;
    const mockSettings: Settings = {
        storeName: 'My Awesome Shop',
        contactEmail: 'support@myawesomeshop.com',
        storeDescription: '온라인에서 놀라운 상품을 찾을 수 있는 최고의 장소입니다.',
        addressLine1: '123 Commerce St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        maintenanceMode: false,
        customerAccounts: true,
    };

    beforeEach(() => {
        mockRepository = {
            getSettings: vi.fn().mockResolvedValue(mockSettings),
            updateSettings: vi.fn().mockImplementation((data: Partial<Settings>) => Promise.resolve({ ...mockSettings, ...data })),
        };
    });

    describe('getSettingsUseCase', () => {
        it('설정을 성공적으로 조회해야 한다.', async () => {
            const result = await getSettingsUseCase(mockRepository);

            expect(mockRepository.getSettings).toHaveBeenCalledTimes(1);
            expect(result).toStrictEqual(mockSettings);
        });

        it('리포지토리에서 에러가 발생하면 던져야 한다.', async () => {
            mockRepository.getSettings = vi.fn().mockRejectedValue(new Error('DB Error'));

            await expect(getSettingsUseCase(mockRepository)).rejects.toThrow('DB Error');
        });
    });

    describe('updateSettingsUseCase', () => {
        it('유효한 데이터로 설정을 성공적으로 업데이트해야 한다.', async () => {
            const updateDto: UpdateSettingsDto = {
                storeName: 'New Shop Name',
                contactEmail: 'support@myawesomeshop.com',
                maintenanceMode: true,
            };

            const result = await updateSettingsUseCase(mockRepository, updateDto);

            expect(mockRepository.updateSettings).toHaveBeenCalledWith(updateDto);
            expect(result.storeName).toBe('New Shop Name');
            expect(result.maintenanceMode).toBe(true);
            expect(result.contactEmail).toBe(mockSettings.contactEmail);
        });

        it('리포지토리 업데이트 중 에러가 발생하면 던져야 한다.', async () => {
            const updateDto: UpdateSettingsDto = {
                storeName: 'New Shop Name',
                contactEmail: 'support@myawesomeshop.com',
            };
            mockRepository.updateSettings = vi.fn().mockRejectedValue(new Error('Update failed'));

            await expect(updateSettingsUseCase(mockRepository, updateDto)).rejects.toThrow('Update failed');
        });
    });
});
