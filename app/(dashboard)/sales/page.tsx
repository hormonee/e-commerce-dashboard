"use client";

import { KPICardsList } from "@/src/features/sales/presentation/components/KPICardsList";
import { SalesTrendChart } from "@/src/features/sales/presentation/components/SalesTrendChart";
import { BestsellerTable } from "@/src/features/sales/presentation/components/BestsellerTable";
import { CategorySalesChart } from "@/src/features/sales/presentation/components/CategorySalesChart";
import { Suspense } from "react";

// Mock Data matching Domain Entities
const mockMetrics = {
    totalRevenue: 124500000,
    revenueGrowthRate: 12.5,
    netRevenue: 112000000,
    netRevenueGrowthRate: 10.2,
    orderCount: 1450,
    orderCountGrowthRate: 8.3,
    averageOrderValue: 85860,
    aovGrowthRate: 2.1,
};

const mockTrends = [
    { date: '2024-03-01', revenue: 3500000 },
    { date: '2024-03-02', revenue: 4200000 },
    { date: '2024-03-03', revenue: 3800000 },
    { date: '2024-03-04', revenue: 4900000 },
    { date: '2024-03-05', revenue: 5200000 },
    { date: '2024-03-06', revenue: 4100000 },
    { date: '2024-03-07', revenue: 4250000 },
];

const mockCategoryData = [
    { category: '전자기기', revenue: 45000000, percentage: 35 },
    { category: '의류', revenue: 32000000, percentage: 25 },
    { category: '뷰티', revenue: 19000000, percentage: 15 },
    { category: '기타', revenue: 28500000, percentage: 25 },
];

const mockBestsellers = [
    { id: '1', rank: 1, name: '프리미엄 무선 헤드셋', imageUrl: '', salesCount: 124, revenue: 42500000, inventoryStatus: 'in_stock' },
    { id: '2', rank: 2, name: '기계식 게이밍 키보드', imageUrl: '', salesCount: 89, revenue: 15900000, inventoryStatus: 'low_stock' },
    { id: '3', rank: 3, name: '고해상도 4K 모니터', imageUrl: '', salesCount: 56, revenue: 25400000, inventoryStatus: 'out_of_stock' },
];

export default function SalesPage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <div className="space-y-8">
                <h1 className="text-2xl font-bold text-gray-900">매출 분석</h1>
                <KPICardsList metrics={mockMetrics as any} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <SalesTrendChart trends={mockTrends as any} />
                    </div>
                    <div>
                        <CategorySalesChart data={mockCategoryData as any} />
                    </div>
                </div>

                <BestsellerTable bestsellers={mockBestsellers as any} />
            </div>
        </Suspense>
    );
}
