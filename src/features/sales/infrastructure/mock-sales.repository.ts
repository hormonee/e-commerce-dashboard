import { ISalesRepository } from '../domain/sales.repository';
import { SalesDashboardData } from '../domain/entities/sales.entity';

export class MockSalesRepository implements ISalesRepository {
    async getSalesDashboardData(period: 'yesterday' | 'last_7_days' | 'this_month'): Promise<SalesDashboardData> {
        // 네트워크 지연 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 800));

        // 디자인 시안(sales-analysis.png)에 기반한 하드코딩된 Mock 데이터
        return {
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
                { date: 'MON', revenue: 75000000 },
                { date: 'TUE', revenue: 58000000 },
                { date: 'WED', revenue: 50000000 },
                { date: 'THU', revenue: 108200000 }, // Highlighted/max value
                { date: 'FRI', revenue: 70000000 },
                { date: 'SAT', revenue: 85000000 },
                { date: 'SUN', revenue: 65000000 },
            ],
            bestsellers: [
                {
                    id: '1',
                    rank: 1,
                    name: '에센셜 오버핏 티셔츠',
                    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&w=100&fit=crop',
                    salesCount: 432,
                    revenue: 12528000,
                    inventoryStatus: 'in_stock',
                },
                {
                    id: '2',
                    rank: 2,
                    name: '프리미엄 미니멀 워치',
                    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
                    salesCount: 388,
                    revenue: 10864000,
                    inventoryStatus: 'low_stock',
                },
                {
                    id: '3',
                    rank: 3,
                    name: '노이즈 캔슬링 헤드셋',
                    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
                    salesCount: 210,
                    revenue: 8400000,
                    inventoryStatus: 'out_of_stock',
                },
            ],
            paymentMethods: [
                { method: 'credit_card', percentage: 45 },
                { method: 'simple_payment', percentage: 35 },
                { method: 'bank_transfer', percentage: 12 },
                { method: 'others', percentage: 8 },
            ],
            categoryShares: [
                { category: '의류', revenue: 42500000, percentage: 38 },
                { category: '전자기기', revenue: 31200000, percentage: 28 },
                { category: '액세서리', revenue: 20100000, percentage: 18 },
            ],
            inventoryRisks: [
                {
                    id: 'risk-1',
                    productName: '데님 팬츠 S 사이즈',
                    issue: 'low_stock',
                    details: '재고 2개 미만 (예상 품절: 4시간 내)',
                },
                {
                    id: 'risk-2',
                    productName: '코튼 가디건',
                    issue: 'dead_stock',
                    details: '재고 회전율 저하 (30일 이상 미판매)',
                },
            ],
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
                    { reason: '배송지연', percentage: 12 },
                ],
            },
            heatmap: Array.from({ length: 24 * 7 }, (_, i) => ({
                hour: i % 24,
                day: Math.floor(i / 24),
                intensity: Math.random(), // 랜덤 강도로 일시 배치
            })),
        };
    }
}
