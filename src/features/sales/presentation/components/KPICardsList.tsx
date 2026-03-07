import { SalesMetrics } from "../../domain/entities/sales.entity";
import { cn } from "../../../../shared/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardsListProps {
    metrics: SalesMetrics;
}

export function KPICardsList({ metrics }: KPICardsListProps) {
    const formatCurrency = (value: number) => `₩${value.toLocaleString()}`;
    const formatGrowth = (value: number) => `${value > 0 ? '+' : ''}${value}%`;

    const kpiItems = [
        {
            title: "총 거래액 (GMV)",
            value: formatCurrency(metrics.totalRevenue),
            growth: metrics.revenueGrowthRate,
            description: "전월 대비 ₩14.2M 증가", // 하드코딩된 mock description based on image
        },
        {
            title: "순매출액",
            value: formatCurrency(metrics.netRevenue),
            growth: metrics.netRevenueGrowthRate,
            description: "반품/취소 제외 금액",
        },
        {
            title: "주문 수",
            value: `${metrics.orderCount.toLocaleString()}건`,
            growth: metrics.orderCountGrowthRate,
            description: "일평균 177건 발생",
        },
        {
            title: "평균 주문 금액 (AOV)",
            value: formatCurrency(metrics.averageOrderValue),
            growth: metrics.aovGrowthRate,
            description: "장바구니 객단가 상승",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiItems.map((item, index) => {
                const isPositive = item.growth > 0;
                return (
                    <div key={index} className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col shadow-sm hover:shadow-md transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                                {item.title}
                            </h3>
                            <div className={cn(
                                "flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold shadow-sm ring-1 ring-inset",
                                isPositive
                                    ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                                    : "bg-rose-50 text-rose-700 ring-rose-100"
                            )}>
                                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {formatGrowth(item.growth)}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-auto">
                            <div className="text-3xl font-extrabold text-[#0F172A] tracking-tighter group-hover:text-blue-600 transition-colors">
                                {item.value}
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                {item.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
