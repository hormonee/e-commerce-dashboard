import { StatCard } from "@/src/features/dashboard/presentation/components/StatCard";
import { SalesChart } from "@/src/features/dashboard/presentation/components/SalesChart";
import { RecentOrdersWidget } from "@/src/features/dashboard/presentation/components/RecentOrdersWidget";
import { PopularProductsTable } from "@/src/features/dashboard/presentation/components/PopularProductsTable";

// Mock Data with 'as any' to avoid strict type mismatch during restoration
const salesTrendData = [
    { date: '2024-03-01', amount: 3500000 },
    { date: '2024-03-02', amount: 4200000 },
    { date: '2024-03-03', amount: 3800000 },
    { date: '2024-03-04', amount: 4900000 },
    { date: '2024-03-05', amount: 5200000 },
    { date: '2024-03-06', amount: 4100000 },
    { date: '2024-03-07', amount: 4250000 },
];

const popularProducts = [
    { id: '1', name: '프리미엄 무선 헤드셋', category: '전자기기', price: 299000, salesCount: 124, viewCount: 1540, status: 'IN_STOCK' },
    { id: '2', name: '기계식 게이밍 키보드', category: '전자기기', price: 159000, salesCount: 89, viewCount: 890, status: 'LOW_STOCK' },
    { id: '3', name: '초고해상도 4K 모니터', category: '전자기기', price: 549000, salesCount: 56, viewCount: 420, status: 'OUT_OF_STOCK' },
];

const recentOrders = [
    { id: '1', orderId: 'ORD-001', customerName: '이하나', amount: 299000, status: 'SHIPPING', time: '14:20' },
    { id: '2', orderId: 'ORD-002', customerName: '김철수', amount: 159000, status: 'COMPLETED', time: '13:45' },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="오늘 주문건수" value="128" percentageChange={12.5} isPositive={true} subtitle="어제 대비" />
                <StatCard title="오늘 결제금액" value="₩4,250,000" percentageChange={2.1} isPositive={false} subtitle="어제 대비" />
                <StatCard title="신규 가입자" value="42" percentageChange={8.3} isPositive={true} subtitle="어제 대비" />
                <StatCard title="배송 대기" value="12" subtitle="처리 필요" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <SalesChart
                        data={salesTrendData as any}
                        goalAmount={150000000}
                        currentAmount={112500000}
                        achievementRate={75}
                    />
                </div>
                <div>
                    <PopularProductsTable products={popularProducts as any} />
                </div>
            </div>

            <RecentOrdersWidget orders={recentOrders as any} />
        </div>
    );
}
