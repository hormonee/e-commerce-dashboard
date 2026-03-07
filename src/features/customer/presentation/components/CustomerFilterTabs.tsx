"use client";

import Link from 'next/link';
import { cn } from '@/src/shared/lib/utils';

interface CustomerFilterTabsProps {
    activeTab: string;
}

export function CustomerFilterTabs({ activeTab }: CustomerFilterTabsProps) {
    const tabs = [
        { id: 'all', label: '전체 고객' },
        { id: 'new', label: '신규 가입' },
        { id: 'first_purchase', label: '첫 구매' },
        { id: 'repeat', label: '재구매' },
        { id: 'vip', label: 'VIP' },
        { id: 'at_risk', label: '이탈 위험' },
    ];

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
            <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <Link
                        key={tab.id}
                        href={`/customers?tab=${tab.id}`}
                        className={cn(
                            "px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap",
                            activeTab === tab.id
                                ? "bg-[#0F172A] text-white shadow-md shadow-slate-200"
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                        )}
                    >
                        {tab.label}
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    쿠폰 발송
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    알림톡 발송
                </button>
                <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    전체 등급 변경
                </button>
            </div>
        </div>
    );
}
