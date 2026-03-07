import { CustomerBehavior } from "../../domain/entities/sales.entity";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CustomerBehaviorAnalysisProps {
    data: CustomerBehavior;
}

export function CustomerBehaviorAnalysis({ data }: CustomerBehaviorAnalysisProps) {
    const formatPercent = (val: number) => `${val}%`;
    const formatCurrency = (val: number) => `₩${(val / 1000000).toFixed(1)}M`;

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 className="text-[#0F172A] font-bold mb-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                고객 행동 및 유입 분석
            </h3>
            <div className="space-y-10">
                <div className="grid grid-cols-3 gap-6">
                    <div className="flex flex-col items-center justify-center p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-blue-50/30 transition-all group">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2 group-hover:text-blue-600">전환율(CVR)</span>
                        <span className="text-2xl font-black text-blue-600 tracking-tighter">{formatPercent(data.conversionRate)}</span>
                        <div className={`flex items-center text-[11px] font-black mt-2 px-2 py-0.5 rounded-lg ${data.conversionRateGrowth > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                            {data.conversionRateGrowth > 0 ? '▲' : '▼'} {Math.abs(data.conversionRateGrowth)}%pt
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-rose-50/30 transition-all group">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2 group-hover:text-rose-600">이탈률</span>
                        <span className="text-2xl font-black text-rose-600 tracking-tighter">{formatPercent(data.cartAbandonmentRate)}</span>
                        <div className={`flex items-center text-[11px] font-black mt-2 px-2 py-0.5 rounded-lg ${data.cartAbandonmentGrowth > 0 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                            {data.cartAbandonmentGrowth > 0 ? '▲' : '▼'} {Math.abs(data.cartAbandonmentGrowth)}%pt
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-slate-100/50 transition-all">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">이탈 가치</span>
                        <span className="text-xl font-black text-[#0F172A] tracking-tighter">{formatCurrency(data.abandonedCartValue)}</span>
                        <div className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tighter">Potential recovery</div>
                    </div>
                </div>

                <div className="pt-4 space-y-4">
                    <div className="flex justify-between items-end">
                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Revenue Share: New vs Returning</span>
                        <div className="flex gap-4 text-[10px] font-black uppercase tracking-tighter">
                            <span className="flex items-center gap-1.5 text-blue-600"><div className="w-2 h-2 rounded-full bg-blue-600"></div> New</span>
                            <span className="flex items-center gap-1.5 text-slate-400"><div className="w-2 h-2 rounded-full bg-slate-300"></div> Returning</span>
                        </div>
                    </div>
                    <div className="flex h-10 rounded-2xl overflow-hidden shadow-inner border border-slate-100 font-black text-[11px] text-white">
                        <div style={{ width: `${data.newCustomerRevenueShare}%` }} className="bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-100 transition-all duration-1000">
                            {data.newCustomerRevenueShare}%
                        </div>
                        <div style={{ width: `${data.returningCustomerRevenueShare}%` }} className="bg-slate-200 text-slate-500 flex items-center justify-center transition-all duration-1000">
                            {data.returningCustomerRevenueShare}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
