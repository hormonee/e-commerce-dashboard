import { DashboardResponseDto } from './dashboard.dto';
import { DashboardStats } from '../domain/entities/dashboard-stats.entity';

export function mapToDashboardStatsDomain(dto: DashboardResponseDto): DashboardStats {
    const isPositiveGrowth = (rate: number) => rate >= 0;

    return {
        todayOrders: {
            value: dto.today_orders.count,
            yesterdayValue: dto.today_orders.yesterday_count,
            percentageChange: dto.today_orders.growth_rate,
            isPositive: isPositiveGrowth(dto.today_orders.growth_rate),
        },
        paymentAmount: {
            value: dto.payment_amount.total,
            yesterdayValue: dto.payment_amount.yesterday_total,
            percentageChange: dto.payment_amount.growth_rate,
            isPositive: isPositiveGrowth(dto.payment_amount.growth_rate),
        },
        newSignups: {
            value: dto.new_signups.count,
            yesterdayValue: dto.new_signups.yesterday_count,
            percentageChange: dto.new_signups.growth_rate,
            isPositive: isPositiveGrowth(dto.new_signups.growth_rate),
        },
        pendingTasks: {
            paymentWaiting: dto.pending_tasks.payment_waiting,
            newOrders: dto.pending_tasks.new_orders,
            cancelReturnRequests: dto.pending_tasks.cancel_return_requests,
        },
        salesChartData: dto.sales_chart_7d.map(item => ({
            date: item.date,
            amount: item.amount,
        })),
        revenueGoal: {
            monthlyGoal: dto.revenue_goal.monthly_goal,
            currentRevenue: dto.revenue_goal.current_revenue,
            achievementRate: dto.revenue_goal.monthly_goal > 0
                ? Math.floor((dto.revenue_goal.current_revenue / dto.revenue_goal.monthly_goal) * 100)
                : 0,
        },
        visitorStats: {
            pageViews: dto.visitor_stats.pv,
            uniqueVisitors: dto.visitor_stats.uv,
        },
        conversionRate: {
            value: dto.conversion_rate.current,
            percentageChange: dto.conversion_rate.industry_diff, // using diff as percentage change for simplicity
            isPositive: isPositiveGrowth(dto.conversion_rate.industry_diff),
            industryAverageDiff: dto.conversion_rate.industry_diff,
        },
        cartTotalAmount: dto.cart_total_amount,
        alerts: {
            lowStockItemCount: dto.alerts.low_stock_items,
            unansweredInquiries: dto.alerts.unanswered_inquiries,
        },
        popularProducts: dto.popular_products.map(product => ({
            id: product.id,
            name: product.name,
            category: product.category,
            salesCount: product.sales,
            viewCount: product.views,
            status: product.stock_status,
        })),
        customerDistribution: {
            repurchaseRate: dto.customer_distribution.repurchase_rate,
            repurchaseCount: dto.customer_distribution.repurchase_count,
            newVisitorCount: dto.customer_distribution.new_visitor_count,
        },
        recentOrders: dto.recent_orders.map(order => ({
            id: order.id,
            orderId: order.order_id,
            customerName: order.customer_name,
            amount: order.amount,
            status: order.status,
            time: order.time,
        })),
        recentActivities: dto.recent_activities.map(activity => ({
            id: activity.id,
            type: activity.type,
            title: activity.title,
            content: activity.content,
            time: activity.time,
            rating: activity.rating,
        })),
    };
}
