'use client';

import React from 'react';
import { Settings, CreditCard, Truck, Receipt, Bell } from 'lucide-react';

export type SettingsTabType = 'general' | 'payments' | 'shipping' | 'taxes' | 'notifications';

interface SettingsTabsProps {
    activeTab: SettingsTabType;
    onChange: (tab: SettingsTabType) => void;
}

export function SettingsTabs({ activeTab, onChange }: SettingsTabsProps) {
    const tabs = [
        { id: 'general', label: '일반', icon: Settings },
        { id: 'payments', label: '결제 수단', icon: CreditCard },
        { id: 'shipping', label: '배송 설정', icon: Truck },
        { id: 'taxes', label: '세금 설정', icon: Receipt },
        { id: 'notifications', label: '알림', icon: Bell },
    ] as const;

    return (
        <div className="flex items-center gap-1 border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id as SettingsTabType)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative whitespace-nowrap ${isActive
                                ? 'text-blue-600'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} strokeWidth={2.5} />
                        {tab.label}
                        {isActive && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
