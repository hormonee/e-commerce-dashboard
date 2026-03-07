import { Profitability } from "../../domain/entities/sales.entity";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/ui/card";

interface ProfitabilityAnalysisProps {
    data: Profitability;
}

export function ProfitabilityAnalysis({ data }: ProfitabilityAnalysisProps) {
    const formatCurrency = (val: number) => `₩${val.toLocaleString()}`;

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 className="text-[#0F172A] font-bold mb-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                수익성 및 영업 효율 분석
            </h3>
            <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-10">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none">영업 이익 (Gross Profit)</span>
                            <span className="text-3xl font-black text-emerald-600 tracking-tighter">{formatCurrency(data.grossProfit)}</span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">ROAS (광고 효율)</span>
                                <span className="text-blue-600 font-black text-xl tracking-tighter">{data.roas}%</span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                                <div className="h-full bg-blue-600 rounded-full shadow-sm shadow-blue-100 transition-all duration-1000" style={{ width: `${Math.min(data.roas / 10, 100)}%` }} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">반품/환불 비율</span>
                            <span className="text-lg font-black text-rose-600 tracking-tighter">{data.refundRate}%</span>
                        </div>
                        <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-slate-200/50 mb-6">
                            <div className="h-full bg-rose-500 rounded-full shadow-sm shadow-rose-100 transition-all duration-1000" style={{ width: `${data.refundRate}%` }} />
                        </div>
                        <div className="space-y-3">
                            {data.refundReasons.map((item, i) => (
                                <div key={i} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100 shadow-sm transition-all hover:translate-x-1">
                                    <span className="text-[11px] text-slate-500 font-bold">{item.reason}</span>
                                    <span className="text-[11px] text-[#0F172A] font-black">{item.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
