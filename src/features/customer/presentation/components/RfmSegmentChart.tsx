import React from 'react';
import { RfmSegment } from '../../domain/entities/customer.entity';
import { cn } from '@/src/shared/lib/utils';

interface RfmSegmentChartProps {
    segments: RfmSegment[];
}

export function RfmSegmentChart({ segments }: RfmSegmentChartProps) {
    // Simple Donut chart visualization logic
    const mainSegment = segments.find(s => s.name === '우량 고객') || { percentage: 68 };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col items-center shadow-sm h-full">
            <div className="w-full flex items-center gap-3 mb-8">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                    <PieChartIcon className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-[#0F172A] font-bold">RFM 세그먼트 비중</h3>
            </div>

            <div className="relative w-44 h-44 mb-10 mt-2">
                {/* 트렌디한 도넛 차트 구현 */}
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 filter drop-shadow-sm">
                    <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="transparent"
                        stroke="#f1f5f9"
                        strokeWidth="10"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="transparent"
                        stroke="#2563eb"
                        strokeWidth="10"
                        strokeDasharray={`${mainSegment.percentage * 2.639} 263.9`}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-[#0F172A] tracking-tighter">{mainSegment.percentage}%</span>
                    <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">우량 고객</span>
                </div>
            </div>

            <div className="w-full space-y-4 px-2">
                {segments.map((s, idx) => (
                    <div key={idx} className="flex justify-between items-center group cursor-default">
                        <div className="flex items-center gap-3">
                            <span className={cn(
                                "w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm transition-transform duration-300 group-hover:scale-125",
                                idx === 0 ? 'bg-blue-600' : idx === 1 ? 'bg-blue-300' : 'bg-slate-200'
                            )}></span>
                            <span className="text-slate-500 text-xs font-semibold group-hover:text-slate-900 transition-colors">{s.name}</span>
                        </div>
                        <span className="text-[#0F172A] font-bold text-xs tracking-tight">{s.percentage}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PieChartIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
            <path d="M22 12A10 10 0 0 0 12 2v10z" />
        </svg>
    );
}
