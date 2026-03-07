import { describe, it, expect } from 'vitest';
import { mapToDashboardStatsDomain } from '../infrastructure/dashboard.mapper';
import { DashboardResponseDto } from '../infrastructure/dashboard.dto';

describe('dashboard.mapper', () => {
    it('DTO를 도메인 객체로 올바르게 변환해야 한다.', () => {
        // Arrange
        const mockDto: DashboardResponseDto = {
            today_orders: { count: 128, yesterday_count: 114, growth_rate: 12.5 },
            payment_amount: { total: 4250000, growth_rate: -2.1 },
            new_signups: { count: 42, growth_rate: 8.3 },
            pending_tasks: { payment_waiting: 12, new_orders: 45, cancel_return_requests: 8 },
            sales_chart_7d: [
                { date: '2023-11-01', amount: 1000000 }
            ],
            revenue_goal: { monthly_goal: 150000000, current_revenue: 117000000 },
            visitor_stats: { pv: 12405, uv: 8920 },
            conversion_rate: { current: 3.24, industry_diff: 0.8 },
            cart_total_amount: 28450000,
            alerts: { low_stock_items: 3, unanswered_inquiries: 12 },
            popular_products: []
        };

        // Act
        const result = mapToDashboardStatsDomain(mockDto);

        // Assert
        expect(result.todayOrders.value).toBe(128);
        expect(result.todayOrders.yesterdayValue).toBe(114);
        expect(result.todayOrders.percentageChange).toBe(12.5);
        expect(result.todayOrders.isPositive).toBe(true);

        expect(result.paymentAmount.value).toBe(4250000);
        expect(result.paymentAmount.isPositive).toBe(false);

        expect(result.revenueGoal.achievementRate).toBe(78); // 117M / 150M * 100

        expect(result.conversionRate.value).toBe(3.24);
        expect(result.conversionRate.industryAverageDiff).toBe(0.8);
    });
});
