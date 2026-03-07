import { SettingsRepository } from '../domain/settings.repository';
import { Settings } from '../domain/settings.entity';

export class MockSettingsRepository implements SettingsRepository {
    private data: Settings = {
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

    async getSettings(): Promise<Settings> {
        // 네트워크 딜레이 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 500));
        return this.data;
    }

    async updateSettings(data: Partial<Settings>): Promise<Settings> {
        await new Promise((resolve) => setTimeout(resolve, 500));
        this.data = { ...this.data, ...data };
        return this.data;
    }
}
