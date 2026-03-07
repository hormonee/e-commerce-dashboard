import React from 'react';
import { CohortData } from '../../domain/entities/customer.entity';

interface CohortAnalysisProps {
    data: CohortData[];
}

export function CohortAnalysis({ data }: CohortAnalysisProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm h-full min-h-[350px]">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-slate-900 font-bold flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                        <CalendarIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    코호트 유지율 분석
                </h3>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animte-pulse"></span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">최근 6개월</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-500 border-separate border-spacing-y-1">
                    <thead>
                        <tr className="text-slate-400 font-bold uppercase tracking-wider">
                            <th className="pb-4 pl-2 font-bold">코호트</th>
                            <th className="pb-4 font-bold text-right">규모</th>
                            <th className="pb-4 font-bold text-right">M1</th>
                            <th className="pb-4 font-bold text-right">M2</th>
                            <th className="pb-4 font-bold text-right">M3</th>
                            <th className="pb-4 font-bold text-right">M4</th>
                            <th className="pb-4 font-bold text-right">M5</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.month} className="group hover:bg-slate-50 transition-colors duration-200">
                                <td className="py-4 pl-2 text-[#0F172A] font-extrabold">{row.month}</td>
                                <td className="py-4 text-right text-slate-600 font-semibold">{row.size.toLocaleString()}</td>
                                {row.retention.map((rate, idx) => (
                                    <td key={idx} className="py-4 text-right pr-1">
                                        {rate > 0 ? (
                                            <div
                                                className="inline-block px-3 py-1.5 rounded-lg text-blue-700 font-bold text-[10px] ring-1 ring-blue-100 shadow-sm"
                                                style={{
                                                    backgroundColor: `rgba(37, 99, 235, ${rate / 100})`,
                                                    color: rate > 40 ? 'white' : '#1d4ed8'
                                                }}
                                            >
                                                {rate}%
                                            </div>
                                        ) : (
                                            <span className="text-slate-200">-</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    );
}
