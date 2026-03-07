import React from 'react';
import Link from 'next/link';

export function SettingsSidebar() {
    const navItems = [
        { label: '일반', href: '/settings', active: true },
        { label: '결제 수단', href: '/settings/payments', active: false },
        { label: '배송 설정', href: '/settings/shipping', active: false },
        { label: '세금 설정', href: '/settings/taxes', active: false },
        { label: '알림', href: '/settings/notifications', active: false },
    ];

    return (
        <aside className="w-64 shrink-0">
            <h2 className="mb-6 font-semibold text-lg text-white px-3">상점 설정</h2>
            <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${item.active
                                ? 'bg-blue-600/10 text-blue-500'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        {/* 임시 아이콘 */}
                        <div className="h-5 w-5 bg-current opacity-70" style={{ maskImage: 'linear-gradient(black, black)', WebkitMaskImage: 'linear-gradient(black, black)' }}></div>
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
