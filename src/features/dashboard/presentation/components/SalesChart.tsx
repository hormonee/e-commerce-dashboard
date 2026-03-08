'use client';

import React, { useState, useEffect } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface SalesChartProps {
    data: { date: string; amount: number }[];
    goalAmount: number;
    currentAmount: number;
    achievementRate: number;
}

export function SalesChart({ data, goalAmount, currentAmount, achievementRate }: SalesChartProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Format YAxis labels (e.g. 5,000,000 -> 5M for simplicity or keep raw)
    const formatYAxis = (tickItem: number) => {
        if (tickItem === 0) return '0';
        return (tickItem / 10000).toLocaleString() + '만'; // e.g. 100만
    };

    // 7일간의 데이터의 날짜를 간단하게 변환
    const chartData = data.map(d => {
        const dateObj = new Date(d.date);
        return {
            name: `${dateObj.getMonth() + 1}/${dateObj.getDate()}`,
            amount: d.amount
        };
    });

    if (!mounted) {
        return <div className="bg-white border border-slate-200 rounded-3xl p-8 col-span-2 shadow-sm h-[400px] animate-pulse" />;
    }

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 col-span-2 shadow-sm h-full">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                        <TrendingUpIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-[#0F172A] font-bold">주간 매출 분석</h3>
                </div>
                <div className="relative">
                    <select className="appearance-none bg-slate-50 border border-slate-200 text-slate-600 rounded-xl px-4 py-1.5 text-xs font-bold pr-8 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer">
                        <option value="7d">최근 7일</option>
                        <option value="30d">최근 30일</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            <div className="h-[220px] w-full mb-10 min-h-[0] min-w-[0]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} fontWeight={700} tickLine={false} axisLine={false} tickMargin={12} />
                        <YAxis stroke="#94a3b8" fontSize={11} fontWeight={700} tickLine={false} axisLine={false} tickFormatter={formatYAxis} />
                        <Tooltip
                            cursor={{ fill: '#f8fafc', radius: 4 }}
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                padding: '12px'
                            }}
                            itemStyle={{ color: '#2563eb', fontWeight: 800, fontSize: '12px' }}
                            labelStyle={{ color: '#64748b', fontWeight: 600, fontSize: '10px', marginBottom: '4px' }}
                            formatter={(value: any) => [`₩${Number(value).toLocaleString()}`, '일간 매출']}
                        />
                        <Bar dataKey="amount" fill="#2563eb" radius={[6, 6, 6, 6]} barSize={32} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-bold uppercase tracking-tight">이달 목표 달성률</span>
                        <span className="text-slate-300 font-medium">/ ₩{goalAmount.toLocaleString()}</span>
                    </div>
                    <span className="text-blue-600 font-extrabold text-sm">{achievementRate}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-1000 shadow-sm"
                        style={{ width: `${Math.min(achievementRate, 100)}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    )
}
