import { describe, it, expect, vi } from 'vitest';
import { GetCustomersUseCase } from '../application/use-cases/get-customers.usecase';
import { CustomerRepository, GetCustomersFilter } from '../domain/customer.repository';
import { CustomerListResult } from '../domain/entities/customer.entity';

describe('GetCustomersUseCase', () => {
    it('필터 조건에 따라 고객 목록을 정상적으로 반환해야 한다.', async () => {
        // Arrange
        const mockResult: CustomerListResult = {
            customers: [
                {
                    id: '1',
                    name: '강하늘',
                    email: 'sky@example.com',
                    grade: 'VIP',
                    ltv: 2450000,
                    aov: 188461,
                    orderCount: 13,
                    lastVisitDate: '2024.03.14'
                }
            ],
            totalCount: 1284
        };

        const mockRepository: CustomerRepository = {
            getCustomers: vi.fn().mockResolvedValue(mockResult),
            getStats: vi.fn()
        };

        const useCase = new GetCustomersUseCase(mockRepository);
        const filter: GetCustomersFilter = { tab: 'all', page: 1, limit: 20 };

        // Act
        const result = await useCase.execute(filter);

        // Assert
        expect(mockRepository.getCustomers).toHaveBeenCalledWith(filter);
        expect(result).toEqual(mockResult);
        expect(result.customers[0].name).toBe('강하늘');
    });
});
