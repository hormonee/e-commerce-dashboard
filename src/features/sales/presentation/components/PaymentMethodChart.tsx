'use client';

import { PaymentMethodShare } from "../../domain/entities/sales.entity";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface PaymentMethodChartProps {
    data: PaymentMethodShare[];
}

export function PaymentMethodChart({ data }: PaymentMethodChartProps) {
    const COLORS = ["#3B82F6", "#10B981", "#FAB005", "#94A3B8"];

    const labels: Record<string, string> = {
        'credit_card': '신용카드',
        'simple_payment': '간편결제',
        'bank_transfer': '실시간이체',
        'others': '기타',
    };

    const formattedData = data.map(item => ({
        name: labels[item.method] || item.method,
        value: item.percentage
    }));

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xl text-[11px]">
                    <span className="font-extrabold text-[#0F172A]">{payload[0].name}: </span>
                    <span className="text-blue-600 font-extrabold">{payload[0].value}%</span>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm h-full flex flex-col min-h-[460px]">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><circle cx="12" cy="12" r="10" /><path d="M16 8l-8 8" /><path d="M12 16c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8z" opacity=".2" /></svg>
                </div>
                <h3 className="text-[#0F172A] font-extrabold tracking-tight">결제 수단 비중</h3>
            </div>

            <div className="flex-1 flex flex-col justify-center">
                <div className="h-[220px] relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                        <span className="text-2xl font-black text-[#0F172A] tracking-tighter">45%</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Credit Card</span>
                    </div>

                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip content={<CustomTooltip />} />
                            <Pie
                                data={formattedData}
                                innerRadius={65}
                                outerRadius={80}
                                stroke="none"
                                paddingAngle={8}
                                dataKey="value"
                            >
                                {formattedData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                    {formattedData.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-white hover:shadow-sm">
                            <div
                                className="w-3 h-3 rounded-md shadow-sm"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-500 tracking-tight">{item.name}</span>
                                <span className="text-xs font-black text-[#0F172A]">{item.value}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
