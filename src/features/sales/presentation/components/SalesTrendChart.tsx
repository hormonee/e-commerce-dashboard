'use client';

import { SalesTrend } from "../../domain/entities/sales.entity";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface SalesTrendChartProps {
    trends: SalesTrend[];
}

export function SalesTrendChart({ trends }: SalesTrendChartProps) {
    // Find the max revenue to highlight the highest bar
    const maxRevenue = Math.max(...trends.map(t => t.revenue));

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xl text-[11px]">
                    <p className="font-extrabold text-slate-400 mb-1 uppercase tracking-tighter">{label}</p>
                    <p className="text-blue-600 font-extrabold text-sm tracking-tight">
                        ₩{payload[0].value.toLocaleString()}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm h-full min-h-[460px] flex flex-col">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                    </div>
                    <h3 className="text-[#0F172A] font-extrabold tracking-tight">매출 추이분석</h3>
                </div>
                <div className="flex gap-1.5 p-1 bg-slate-50 rounded-xl border border-slate-100">
                    <button className="px-4 py-1.5 text-[10px] font-bold text-slate-400 hover:text-slate-600 rounded-lg transition-all">일별</button>
                    <button className="px-4 py-1.5 text-[10px] font-bold text-white bg-[#0F172A] rounded-lg shadow-sm">주별</button>
                </div>
            </div>

            <div className="h-[300px] w-full mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trends} margin={{ top: 0, right: 0, left: -40, bottom: 0 }}>
                        <XAxis
                            dataKey="date"
                            stroke="#94a3b8"
                            fontSize={10}
                            fontWeight={700}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis hide />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: '#f8fafc', radius: 4 }}
                        />
                        <Bar
                            dataKey="revenue"
                            radius={[6, 6, 6, 6]}
                            barSize={32}
                        >
                            {trends.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.revenue === maxRevenue ? "#2563eb" : "#e2e8f0"}
                                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
