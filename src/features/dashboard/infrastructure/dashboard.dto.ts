export interface DashboardResponseDto {
    today_orders: {
        count: number;
        yesterday_count: number;
        growth_rate: number;
    };
    payment_amount: {
        total: number;
        yesterday_total: number;
        growth_rate: number;
    };
    new_signups: {
        count: number;
        yesterday_count: number;
        growth_rate: number;
    };
    pending_tasks: {
        payment_waiting: number;
        new_orders: number;
        cancel_return_requests: number;
    };
    sales_chart_7d: Array<{
        date: string; // ISO String
        amount: number;
    }>;
    revenue_goal: {
        monthly_goal: number;
        current_revenue: number;
    };
    visitor_stats: {
        pv: number;
        uv: number;
    };
    conversion_rate: {
        current: number;
        industry_diff: number;
    };
    cart_total_amount: number;
    alerts: {
        low_stock_items: number;
        unanswered_inquiries: number;
    };
    popular_products: Array<{
        id: string;
        name: string;
        category: string;
        sales: number;
        views: number;
        stock_status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
    }>;
    customer_distribution: {
        repurchase_rate: number;
        repurchase_count: number;
        new_visitor_count: number;
    };
    recent_orders: Array<{
        id: string;
        order_id: string;
        customer_name: string;
        amount: number;
        status: string;
        time: string;
    }>;
    recent_activities: Array<{
        id: string;
        type: 'Q&A' | 'REVIEW';
        title: string;
        content: string;
        time: string;
        rating?: number;
    }>;
}
