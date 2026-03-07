export interface StatMetric {
    value: number;
    percentageChange: number;
    isPositive: boolean;
    yesterdayValue?: number;
}

export interface TodayOrders extends StatMetric {
    yesterdayValue: number;
}

export interface PendingTasks {
    paymentWaiting: number;
    newOrders: number;
    cancelReturnRequests: number;
}

export interface RevenueGoal {
    monthlyGoal: number;
    currentRevenue: number;
    achievementRate: number; // 0 ~ 100
}

export interface VisitorStats {
    pageViews: number; // PV
    uniqueVisitors: number; // UV
}

export interface ConversionRate extends StatMetric {
    industryAverageDiff: number; // e.g., +0.8
}

export interface PopularProduct {
    id: string;
    name: string;
    category: string;
    salesCount: number;
    viewCount: number;
    status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
}

export interface CustomerDistribution {
    repurchaseRate: number;
    repurchaseCount: number;
    newVisitorCount: number;
}

export interface RecentOrder {
    id: string;
    orderId: string;
    customerName: string;
    amount: number;
    status: string;
    time: string;
}

export interface RecentActivity {
    id: string;
    type: 'Q&A' | 'REVIEW';
    title: string;
    content: string;
    time: string;
    rating?: number; // for REVIEW
}

export interface DashboardStats {
    todayOrders: TodayOrders;
    paymentAmount: StatMetric;
    newSignups: StatMetric;

    pendingTasks: PendingTasks;

    salesChartData: { date: string; amount: number }[];
    revenueGoal: RevenueGoal;

    visitorStats: VisitorStats;
    conversionRate: ConversionRate;
    cartTotalAmount: number;

    alerts: {
        lowStockItemCount: number;
        unansweredInquiries: number;
    };

    popularProducts: PopularProduct[];

    customerDistribution: CustomerDistribution;
    recentOrders: RecentOrder[];
    recentActivities: RecentActivity[];
}
