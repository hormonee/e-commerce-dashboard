import { NextResponse } from 'next/server';
import { DashboardResponseDto } from '@/src/features/dashboard/infrastructure/dashboard.dto';

export async function GET() {
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
            { id: '1', name: '브라운 코튼 셔츠', category: '의류', sales: 1240, views: 3500, stock_status: 'LOW_STOCK' },
            { id: '2', name: '레더 숄더백', category: '가방', sales: 980, views: 2800, stock_status: 'IN_STOCK' },
            { id: '3', name: '클래식 로퍼', category: '신발', sales: 850, views: 2100, stock_status: 'IN_STOCK' },
            { id: '4', name: '실버 진주 목걸이', category: '액세서리', sales: 720, views: 1900, stock_status: 'IN_STOCK' },
            { id: '5', name: '캐시미어 니트', category: '의류', sales: 650, views: 1500, stock_status: 'OUT_OF_STOCK' }
        ],
        customer_distribution: {
            repurchase_rate: 24.5,
            repurchase_count: 1250,
            new_visitor_count: 3420
        },
        recent_orders: [
            { id: '1', order_id: 'ORD-20231107-001', customer_name: '김철수', amount: 45000, status: '결제완료', time: '10분 전' },
            { id: '2', order_id: 'ORD-20231107-002', customer_name: '이영희', amount: 89000, status: '배송중', time: '25분 전' }
        ],
        recent_activities: [
            { id: '1', type: 'Q&A', title: '사이즈 문의', content: '180cm에 75kg인데 L 사이즈 맞을까요?', time: '5분 전' },
            { id: '2', type: 'REVIEW', title: '배송이 빨라요', content: '어제 주문했는데 벌써 왔네요. 만족합니다.', time: '1시간 전', rating: 5 }
        ]
    };

    return NextResponse.json(mockData);
}
