import React from 'react';
import { RecentOrder } from '../../domain/entities/dashboard-stats.entity';

interface RecentOrdersWidgetProps {
    orders: RecentOrder[];
}

export function RecentOrdersWidget({ orders }: RecentOrdersWidgetProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm h-full">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-[#0F172A] font-black text-xl">최근 주문 내역</h3>
                <button className="text-[14px] font-black text-blue-600 hover:underline tracking-tight uppercase">관리 페이지 이동</button>
            </div>
            <div className="space-y-5">
                {orders.map((order) => (
                    <div key={order.id} className="group flex items-center justify-between p-5 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                <UserIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-black text-[#0F172A] tracking-tight">{order.customerName}</span>
                                    <span className="text-[13px] text-slate-400 font-bold uppercase tracking-tighter">({order.orderId})</span>
                                </div>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <span className="text-[13px] text-slate-400 font-bold">{order.time}</span>
                                    <span className="text-slate-200">|</span>
                                    <span className="text-[13px] text-slate-500 font-black">₩{order.amount.toLocaleString()}</span>
                                    <span className="text-slate-200">|</span>
                                    <span className="text-[13px] text-blue-600 font-black">{order.status}</span>
                                </div>
                            </div>
                        </div>
                        <button className="px-5 py-2.5 bg-slate-100 text-[#0F172A] text-[13px] font-black rounded-xl hover:bg-[#0F172A] hover:text-white transition-all shadow-sm">
                            상세보기
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}
