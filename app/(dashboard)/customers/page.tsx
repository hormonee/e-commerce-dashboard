"use client";

import { CustomerFilterTabs } from "@/src/features/customer/presentation/components/CustomerFilterTabs";
import { CustomerTable } from "@/src/features/customer/presentation/components/CustomerTable";
import { RfmSegmentChart } from "@/src/features/customer/presentation/components/RfmSegmentChart";
import { AtRiskVipAlert } from "@/src/features/customer/presentation/components/AtRiskVipAlert";
import { Suspense } from "react";

// Mock Data
const mockCustomers = [
    { id: '1', name: '이하나', email: 'hana@example.com', grade: 'VIP', ltv: 4250000, aov: 283333, orderCount: 15, lastVisitDate: '2024-03-05' },
];

const mockVips = [
    { id: '1', name: '이하나', grade: 'VIP', daysSinceLastVisit: 2 }
];

const mockSegments = [
    { name: 'VIP', percentage: 15 },
];

export default function CustomersPage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">고객 관리</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <AtRiskVipAlert vips={mockVips as any} />
                        <div className="mt-8 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                            <CustomerFilterTabs activeTab="all" />
                            <CustomerTable customers={mockCustomers as any} totalCount={1250} />
                        </div>
                    </div>
                    <div>
                        <RfmSegmentChart segments={mockSegments as any} />
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
