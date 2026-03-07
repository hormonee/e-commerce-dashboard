import React from 'react';
import { RecentActivity } from '../../domain/entities/dashboard-stats.entity';

interface RecentActivityWidgetProps {
    activities: RecentActivity[];
}

export function RecentActivityWidget({ activities }: RecentActivityWidgetProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm h-full">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-[#0F172A] font-black text-xl">최근 문의 및 리뷰</h3>
                <button className="text-[14px] font-black text-blue-600 hover:underline tracking-tight uppercase">전체 답변하기</button>
            </div>
            <div className="space-y-8">
                {activities.map((activity) => (
                    <div key={activity.id} className="space-y-3 pb-8 border-b border-slate-50 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center">
                            <span className={clsx(
                                "px-3 py-1 rounded-lg text-[12px] font-black uppercase tracking-widest",
                                activity.type === 'Q&A' ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"
                            )}>
                                {activity.type}
                            </span>
                            <span className="text-[13px] text-slate-400 font-bold">{activity.time}</span>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-[17px] font-black text-[#0F172A] tracking-tight leading-snug">{activity.title}</h4>
                            {activity.type === 'REVIEW' && typeof activity.rating === 'number' && (
                                <div className="flex gap-1 text-orange-400">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon key={i} className={clsx("w-4 h-4", i < (activity.rating as number) ? "fill-orange-400" : "fill-slate-100 text-slate-100")} />
                                    ))}
                                </div>
                            )}
                            <p className="text-[15px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                                {activity.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

function clsx(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
