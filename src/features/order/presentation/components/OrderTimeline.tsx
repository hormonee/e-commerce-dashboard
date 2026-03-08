import React from 'react';
import { TimelineItem } from '../../domain/order.entity';
import { cn } from '@/src/shared/lib/utils';

interface OrderTimelineProps {
    timeline: TimelineItem[];
}

export function OrderTimeline({ timeline }: OrderTimelineProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-600">📈</span>
                </div>
                <h3 className="text-lg font-black text-[#0F172A]">주문 처리 타임라인</h3>
            </div>

            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-[15px] before:h-full before:w-0.5 before:bg-slate-100">
                {timeline.map((item, index) => (
                    <div key={item.id} className="relative flex items-start gap-4">
                        <div className={cn(
                            "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white shadow-sm",
                            index === 0 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                        )}>
                            <div className="h-2 w-2 rounded-full bg-current" />
                        </div>
                        <div className="flex-1 pt-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <h4 className={cn(
                                    "text-sm font-black",
                                    index === 0 ? "text-[#0F172A]" : "text-slate-500"
                                )}>
                                    {item.description}
                                </h4>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400">{item.timestamp}</p>
                            {item.managerName && (
                                <p className="text-[10px] font-bold text-slate-400">담당자: {item.managerName}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
