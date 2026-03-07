import { cn } from '../../../../shared/lib/utils';
import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    percentageChange?: number;
    isPositive?: boolean;
    subtitle?: string;
    className?: string; // 추가적인 스타일링을 위해 도입
}

export function StatCard({
    title,
    value,
    percentageChange,
    isPositive,
    subtitle,
    className
}: StatCardProps) {
    return (
        <div className={cn("bg-white border border-slate-200 rounded-3xl p-8 flex flex-col shadow-sm hover:shadow-md transition-all duration-300 group min-h-[220px]", className)}>
            <div className="flex justify-between items-start mb-8">
                <h3 className="text-slate-500 font-black text-[13px] uppercase tracking-widest">{title}</h3>
                {percentageChange !== undefined && (
                    <div className={cn(
                        "flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-black shadow-sm ring-1 ring-inset",
                        isPositive
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                            : "bg-rose-50 text-rose-700 ring-rose-100"
                    )}>
                        {isPositive ? '↑' : '↓'} {percentageChange}%
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-3 mt-auto">
                <div className="text-4xl font-black text-[#0F172A] tracking-tighter group-hover:text-blue-600 transition-colors">
                    {value}
                </div>
                {subtitle && (
                    <div className="text-[12px] text-slate-400 font-bold uppercase tracking-tight">{subtitle}</div>
                )}
            </div>
        </div>
    );
}
