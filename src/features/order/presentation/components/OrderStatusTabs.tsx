"use client";

import React from 'react';
import { OrderSummary } from '../../domain/order.entity';

interface OrderStatusTabsProps {
    summary: OrderSummary;
    activeStatus: string;
    onStatusChange: (status: string) => void;
}

export function OrderStatusTabs({ summary, activeStatus, onStatusChange }: OrderStatusTabsProps) {
    const tabs = [
        { label: '전체', count: summary.total },
        { label: '결제 대기', count: summary.pendingPayment },
        { label: '상품 준비중', count: summary.preparingProduct },
        { label: '배송 중', count: summary.shipping },
        { label: '배송 완료', count: summary.delivered },
        { label: '취소/반품/교환', count: summary.cancelled },
    ];

    return (
        <div className="flex bg-white border border-slate-200 rounded-2xl p-1 shadow-sm overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
                <button
                    key={tab.label}
                    role="tab"
                    aria-selected={activeStatus === tab.label}
                    onClick={() => onStatusChange(tab.label)}
                    className={`relative flex items-center gap-2 px-6 py-3 text-xs font-extrabold transition-all duration-300 rounded-xl whitespace-nowrap ${activeStatus === tab.label
                        ? 'text-blue-600 bg-blue-50 shadow-sm'
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <span>{tab.label}</span>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${activeStatus === tab.label ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-400'}`}>
                        {tab.count.toLocaleString()}
                    </span>
                </button>
            ))}
        </div>
    );
}
