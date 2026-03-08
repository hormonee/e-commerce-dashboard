"use client";

import React, { useState } from 'react';
import { OrderStatusTabs } from './OrderStatusTabs';
import { OrderFilters } from './OrderFilters';
import { OrderTable } from './OrderTable';
import { OrderPagination } from './OrderPagination';
import { Order, OrderSummary } from '../../domain/order.entity';

interface OrderManagementContentProps {
    initialItems: Order[];
    summary: OrderSummary;
    totalCount: number;
}

export function OrderManagementContent({ initialItems, summary, totalCount }: OrderManagementContentProps) {
    const [activeStatus, setActiveStatus] = useState('전체');
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">주문 관리</h1>
            </div>

            <OrderStatusTabs
                summary={summary}
                activeStatus={activeStatus}
                onStatusChange={setActiveStatus}
            />

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <OrderFilters
                    onSearch={(params) => console.log('Search with:', params)}
                    onReset={() => console.log('Reset filters')}
                />
                <OrderTable orders={initialItems} />
                <div className="p-6 border-t border-slate-100 bg-slate-50/30">
                    <OrderPagination
                        currentPage={currentPage}
                        totalCount={totalCount}
                        pageSize={20}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
}
