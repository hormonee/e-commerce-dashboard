'use client';

import { SalesHeatmapData } from "../../domain/entities/sales.entity";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/ui/card";

interface SalesHeatmapProps {
    data: SalesHeatmapData[];
}

export function SalesHeatmap({ data }: SalesHeatmapProps) {
    const hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const getIntensityColor = (intensity: number) => {
        if (intensity < 0.2) return 'bg-slate-100';
        if (intensity < 0.4) return 'bg-blue-200 text-transparent';
        if (intensity < 0.6) return 'bg-blue-400 text-transparent';
        if (intensity < 0.8) return 'bg-blue-600 text-transparent';
        return 'bg-blue-800 text-transparent';
    };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                    <h3 className="text-xl font-black text-[#0F172A] tracking-tight">시간대별 매출 히트맵 (피크 타임)</h3>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 uppercase tracking-widest">
                    <span>Low</span>
                    <div className="flex gap-[3px]">
                        <div className="w-3.5 h-3.5 rounded-sm bg-slate-100"></div>
                        <div className="w-3.5 h-3.5 rounded-sm bg-blue-200"></div>
                        <div className="w-3.5 h-3.5 rounded-sm bg-blue-400"></div>
                        <div className="w-3.5 h-3.5 rounded-sm bg-blue-600"></div>
                        <div className="w-3.5 h-3.5 rounded-sm bg-blue-800"></div>
                    </div>
                    <span>High</span>
                </div>
            </div>

            <div className="overflow-x-auto pb-4 no-scrollbar">
                <div className="min-w-[800px]">
                    <div className="flex mb-4">
                        <div className="w-12"></div>
                        <div className="flex-1 grid grid-cols-12 gap-1.5">
                            {hours.map(hour => (
                                <div key={hour} className="text-[10px] font-black text-center text-slate-400 uppercase tracking-tighter">{hour}</div>
                            ))}
                        </div>
                    </div>

                    {days.map((day, dIdx) => (
                        <div key={day} className="flex items-center mb-1.5 group">
                            <div className="w-12 text-[10px] font-black text-slate-400 text-right pr-4 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                                {day}
                            </div>
                            <div className="flex-1 grid grid-cols-24 gap-1.5">
                                {Array.from({ length: 24 }).map((_, h) => {
                                    const point = data.find(p => p.day === dIdx && p.hour === h) || { intensity: 0 };
                                    return (
                                        <div
                                            key={`${dIdx}-${h}`}
                                            className={`h-9 rounded-md transition-all duration-300 hover:scale-[1.15] hover:z-10 cursor-pointer shadow-sm ${getIntensityColor(point.intensity)}`}
                                            title={`${day} ${String(h).padStart(2, '0')}:00 -强度: ${point.intensity.toFixed(2)}`}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
