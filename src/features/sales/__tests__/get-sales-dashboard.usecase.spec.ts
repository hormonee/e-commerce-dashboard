import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetSalesDashboardUseCase } from '../application/use-cases/get-sales-dashboard.usecase';
import { ISalesRepository } from '../domain/sales.repository';
import { SalesDashboardData } from '../domain/entities/sales.entity';

const mockDashboardData: SalesDashboardData = {
    metrics: {
        totalRevenue: 125400000,
        revenueGrowthRate: 12.5,
        netRevenue: 108200000,
        netRevenueGrowthRate: -2.1,
        orderCount: 1240,
        orderCountGrowthRate: 5.4,
        averageOrderValue: 87258,
        aovGrowthRate: 3.2,
    },
    trends: [
        { date: '2023-10-02', revenue: 10000 },
        { date: '2023-10-03', revenue: 15000 },
    ],
    bestsellers: [],
    paymentMethods: [],
    categoryShares: [],
    inventoryRisks: [],
    customerBehavior: {
        conversionRate: 3.4,
        conversionRateGrowth: 0.2,
        cartAbandonmentRate: 62.8,
        cartAbandonmentGrowth: 1.5,
        abandonedCartValue: 18400000,
        newCustomerRevenueShare: 65,
        returningCustomerRevenueShare: 35,
    },
    profitability: {
        grossProfit: 42580000,
        roas: 452,
        refundRate: 4.2,
        refundReasons: [
            { reason: '단순변심', percentage: 48 },
            { reason: '사이즈 미스', percentage: 32 },
            { reason: '배송지연', percentage: 12 }
        ],
    },
    heatmap: []
};

describe('GetSalesDashboardUseCase', () => {
    let mockSalesRepository: ISalesRepository;
    let getSalesDashboardUseCase: GetSalesDashboardUseCase;

    beforeEach(() => {
        mockSalesRepository = {
            getSalesDashboardData: vi.fn(),
        };
        getSalesDashboardUseCase = new GetSalesDashboardUseCase(mockSalesRepository);
    });

    it('리포지토리에서 데이터를 가져와 반환해야 한다 (Period: last_7_days)', async () => {
        vi.spyOn(mockSalesRepository, 'getSalesDashboardData').mockResolvedValue(mockDashboardData);

        const result = await getSalesDashboardUseCase.execute('last_7_days');

        expect(mockSalesRepository.getSalesDashboardData).toHaveBeenCalledWith('last_7_days');
        expect(result).toEqual(mockDashboardData);
    });

    it('리포지토리 계층에서 에러가 발생하면 UseCase가 예외를 던져야 한다', async () => {
        vi.spyOn(mockSalesRepository, 'getSalesDashboardData').mockRejectedValue(new Error('데이터 Fetch 실패'));

        await expect(getSalesDashboardUseCase.execute('this_month')).rejects.toThrow('데이터 Fetch 실패');
    });
});
