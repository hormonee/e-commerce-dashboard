import { DashboardRepository } from '../domain/dashboard.repository';
import { DashboardStats } from '../domain/entities/dashboard-stats.entity';
import { DashboardResponseDto } from './dashboard.dto';
import { mapToDashboardStatsDomain } from './dashboard.mapper';

export class DashboardApi implements DashboardRepository {
    async getStats(): Promise<DashboardStats> {
        // Server Component(SSR) 렌더링 시점에 /api/dashboard/stats Fetch를 시도하면
        // 포트 문제나 서버 미기동으로 HTML(404)이 떨어져 JSON parse 에러가 발생하는 것을 방지하기 위해 Mock 객체 직접 리턴
        const mockData: DashboardResponseDto = {
            today_orders: { count: 128, yesterday_count: 114, growth_rate: 12.5 },
            payment_amount: { total: 4250000, yesterday_total: 4340000, growth_rate: -2.1 },
            new_signups: { count: 42, yesterday_count: 38, growth_rate: 8.3 },
            pending_tasks: { payment_waiting: 12, new_orders: 45, cancel_return_requests: 8 },
            sales_chart_7d: [
                { date: '2023-11-01', amount: 3500000 },
                { date: '2023-11-02', amount: 4100000 },
                { date: '2023-11-03', amount: 4800000 },
                { date: '2023-11-04', amount: 3900000 },
                { date: '2023-11-05', amount: 5200000 },
                { date: '2023-11-06', amount: 6100000 },
                { date: '2023-11-07', amount: 4250000 }
            ],
            revenue_goal: { monthly_goal: 150000000, current_revenue: 117000000 },
            visitor_stats: { pv: 12405, uv: 8920 },
            conversion_rate: { current: 3.24, industry_diff: 0.8 },
            cart_total_amount: 28450000,
            alerts: { low_stock_items: 3, unanswered_inquiries: 12 },
            popular_products: [
                { id: '1', name: '브라운 코튼 셔츠', category: '의류 > 상의', sales: 452, views: 2841, stock_status: 'IN_STOCK' },
                { id: '2', name: '와이드 핏 데님 팬츠', category: '의류 > 하의', sales: 312, views: 1950, stock_status: 'IN_STOCK' },
                { id: '3', name: '레더 숄더백', category: '가방', sales: 245, views: 1200, stock_status: 'IN_STOCK' },
                { id: '4', name: '클래식 로퍼', category: '신발', sales: 180, views: 950, stock_status: 'LOW_STOCK' },
                { id: '5', name: '실버 진주 목걸이', category: '액세서리', sales: 120, views: 800, stock_status: 'IN_STOCK' }
            ],
            customer_distribution: {
                repurchase_rate: 65,
                repurchase_count: 2140,
                new_visitor_count: 1152
            },
            recent_orders: [
                { id: '1', order_id: 'ORD-20240523-01', customer_name: '이민수', amount: 124000, status: '배송준비중', time: '오후 2:45' },
                { id: '2', order_id: 'ORD-20240523-02', customer_name: '박지은', amount: 45500, status: '결제완료', time: '오후 2:32' },
                { id: '3', order_id: 'ORD-20240523-03', customer_name: '김철수', amount: 89000, status: '배송중', time: '오후 1:15' }
            ],
            recent_activities: [
                { id: '1', type: 'Q&A', title: '사이즈 문의드립니다.', content: '175/70인데 L 사이즈가 적당할까요? 좀 오버핏으로 입고 싶은데...', time: '10분 전' },
                { id: '2', type: 'REVIEW', title: '매우 만족합니다!', content: '배송도 빠르고 상품 질도 너무 좋아요! 다음에 또 구매할게요.', time: '1시간 전', rating: 5 }
            ]
        };

        return mapToDashboardStatsDomain(mockData);
    }
}

// 싱글톤 인스턴스 (혹은 DI Container 사용)
export const dashboardApi = new DashboardApi();
