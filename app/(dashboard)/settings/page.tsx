"use client";

import { useState } from "react";
import { GeneralSettingsForm } from "@/src/features/settings/presentation/components/GeneralSettingsForm";
import { SettingsTabs, SettingsTabType } from "@/src/features/settings/presentation/components/SettingsTabs";

const initialSettings = {
    storeName: '마이 이커머스',
    adminEmail: 'admin@example.com',
    phoneNumber: '010-1234-5678',
    businessNumber: '123-45-67890',
};

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTabType>('general');

    const tabTitles: Record<SettingsTabType, string> = {
        general: '일반 설정',
        payments: '결제 수단 설정',
        shipping: '배송 설정',
        taxes: '세금 설정',
        notifications: '알림 설정',
    };

    return (
        <div className="flex flex-col">
            <SettingsTabs activeTab={activeTab} onChange={setActiveTab} />

            <main className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <header className="mb-8 p-1 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">{tabTitles[activeTab]}</h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">상점의 기본적인 정보를 관리하고 설정합니다.</p>
                    </div>
                </header>

                {activeTab === 'general' ? (
                    <GeneralSettingsForm initialSettings={initialSettings as any} onSubmit={async () => { }} />
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
                            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">준비 중인 기능입니다.</h3>
                        <p className="text-slate-400 text-sm font-medium">해당 설정 페이지는 현재 구현 중입니다.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
