import { CategorySalesShare } from "../../domain/entities/sales.entity";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/ui/card";

interface CategorySalesChartProps {
    data: CategorySalesShare[];
}

export function CategorySalesChart({ data }: CategorySalesChartProps) {
    const formatValue = (value: number) => {
        return `₩${(value / 1000000).toFixed(1)}M`;
    };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 className="text-[#0F172A] font-bold mb-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                카테고리별 매출 기여도
            </h3>
            <div className="space-y-6">
                {data.map((item) => (
                    <div key={item.category} className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 font-extrabold uppercase tracking-tight">{item.category}</span>
                            <span className="text-[#0F172A] font-black">{formatValue(item.revenue)} <span className="text-slate-400 font-bold ml-1">({item.percentage}%)</span></span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                            <div
                                className="h-full bg-blue-600 rounded-full shadow-sm shadow-blue-100 transition-all duration-1000"
                                style={{ width: `${item.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
