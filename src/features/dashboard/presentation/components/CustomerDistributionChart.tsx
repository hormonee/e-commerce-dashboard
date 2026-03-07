'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CustomerDistribution } from '../../domain/entities/dashboard-stats.entity';

interface CustomerDistributionChartProps {
    data: CustomerDistribution;
}

export function CustomerDistributionChart({ data }: CustomerDistributionChartProps) {
    const chartData = [
        { name: '재방문/재구매 고객', value: data.repurchaseCount, color: '#2563eb' },
        { name: '신규 방문 고객', value: data.newVisitorCount, color: '#94a3b8' },
    ];

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col h-full">
            <h3 className="text-[#0F172A] font-bold mb-8 text-lg">고객 분포</h3>
            <div className="flex-1 flex flex-col">
                <div className="h-[200px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                    fontSize: '11px',
                                    fontWeight: 700
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[12px] font-black text-slate-400 uppercase tracking-tighter">재구매</span>
                        <span className="text-3xl font-black text-[#0F172A] tracking-tighter">{data.repurchaseRate}%</span>
                    </div>
                </div>

                <div className="mt-8 space-y-5">
                    {chartData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <span className="text-sm font-black text-slate-500">{item.name}</span>
                            </div>
                            <span className="text-[15px] font-black text-[#0F172A]">{item.value.toLocaleString()}명</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
