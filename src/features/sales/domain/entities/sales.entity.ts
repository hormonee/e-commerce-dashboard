export interface SalesMetrics {
    totalRevenue: number;         // 총 거래액 (GMV)
    revenueGrowthRate: number;    // 전월 대비 증가율 (%)
    netRevenue: number;           // 순매출액
    netRevenueGrowthRate: number; // 순매출액 증감율 (%)
    orderCount: number;           // 주문 수
    orderCountGrowthRate: number; // 주문 수 증감율 (%)
    averageOrderValue: number;    // 평균 주문 금액 (AOV)
    aovGrowthRate: number;        // AOV 증감율 (%)
}

export interface SalesTrend {
    date: string;       // YYYY-MM-DD
    revenue: number;    // 해당 일자 매출
}

export interface Bestseller {
    id: string;
    rank: number;
    name: string;
    imageUrl: string;
    salesCount: number;
    revenue: number;
    inventoryStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface PaymentMethodShare {
    method: 'credit_card' | 'simple_payment' | 'bank_transfer' | 'others';
    percentage: number;
}

export interface CategorySalesShare {
    category: string;
    revenue: number;
    percentage: number;
}

export interface InventoryRisk {
    id: string;
    productName: string;
    issue: 'low_stock' | 'dead_stock';
    details: string;    // 예: "재고 2개 미만 (예상 품절: 4시간 내)"
}

export interface CustomerBehavior {
    conversionRate: number;         // 구매 전환율
    conversionRateGrowth: number;   // 구매 전환율 증감
    cartAbandonmentRate: number;    // 장바구니 이탈률
    cartAbandonmentGrowth: number;  // 장바구니 이탈률 증감
    abandonedCartValue: number;     // 이탈 가치 (회수 가능 추정액)
    newCustomerRevenueShare: number; // 신규 방문 매출 비중
    returningCustomerRevenueShare: number; // 재방문 매출 비중
}

export interface Profitability {
    grossProfit: number;            // 영업 이익
    roas: number;                   // ROAS (광고 효율 %)
    refundRate: number;             // 반품/환불 비율
    refundReasons: {
        reason: string;
        percentage: number;
    }[];
}

export interface SalesHeatmapData {
    hour: number;  // 0-23
    day: number;   // 0 (Sun) - 6 (Sat)
    intensity: number; // 0.0 - 1.0 (매출 강도)
}

export interface SalesDashboardData {
    metrics: SalesMetrics;
    trends: SalesTrend[];
    bestsellers: Bestseller[];
    paymentMethods: PaymentMethodShare[];
    categoryShares: CategorySalesShare[];
    inventoryRisks: InventoryRisk[];
    customerBehavior: CustomerBehavior;
    profitability: Profitability;
    heatmap: SalesHeatmapData[];
}
