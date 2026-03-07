"use client";

import { GeneralSettingsForm } from "@/src/features/settings/presentation/components/GeneralSettingsForm";
import { SettingsSidebar } from "@/src/features/settings/presentation/components/SettingsSidebar";

const initialSettings = {
    storeName: '마이 이커머스',
    adminEmail: 'admin@example.com',
    phoneNumber: '010-1234-5678',
    businessNumber: '123-45-67890',
};

export default function SettingsPage() {
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64 flex-shrink-0">
                <SettingsSidebar />
            </aside>
            <main className="flex-1 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">일반 설정</h1>
                <GeneralSettingsForm initialSettings={initialSettings as any} onSubmit={async () => { }} />
            </main>
        </div>
    );
}
