import { describe, it, expect, vi } from 'vitest';
import { GetDashboardStatsUseCase } from '../application/use-cases/get-dashboard-stats.usecase';
import { DashboardRepository } from '../domain/dashboard.repository';
import { DashboardStats } from '../domain/entities/dashboard-stats.entity';

describe('GetDashboardStatsUseCase', () => {
    it('레포지토리를 통해 대시보드 통계 데이터를 정상적으로 반환해야 한다.', async () => {
        // Arrange
        const mockStats: DashboardStats = {
            todayOrders: { value: 128, percentageChange: 12.5, isPositive: true, yesterdayValue: 114 },
            paymentAmount: { value: 4250000, percentageChange: 2.1, isPositive: false },
            newSignups: { value: 42, percentageChange: 8.3, isPositive: true },
            pendingTasks: { paymentWaiting: 12, newOrders: 45, cancelReturnRequests: 8 },
            salesChartData: [
                { date: '2023-10-01', amount: 1000000 },
                { date: '2023-10-02', amount: 1200000 }
            ],
            revenueGoal: { monthlyGoal: 150000000, currentRevenue: 117000000, achievementRate: 78 },
            visitorStats: { pageViews: 12405, uniqueVisitors: 8920 },
            conversionRate: { value: 3.24, percentageChange: 0, isPositive: true, industryAverageDiff: 0.8 },
            cartTotalAmount: 28450000,
            alerts: { lowStockItemCount: 3, unansweredInquiries: 12 },
            popularProducts: []
        };

        const mockRepository: DashboardRepository = {
            getStats: vi.fn().mockResolvedValue(mockStats)
        };

        const useCase = new GetDashboardStatsUseCase(mockRepository);

        // Act
        const result = await useCase.execute();

        // Assert
        expect(mockRepository.getStats).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockStats);
        expect(result.todayOrders.value).toBe(128);
    });
});
