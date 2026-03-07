"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    Settings,
    LogOut,
    TrendingUp,
    LayoutGrid,
    ChevronRight,
    PlusCircle
} from "lucide-react";
import { cn } from "@/src/shared/lib/utils";
import { logoutAction } from "@/src/features/auth/presentation/actions/logout.action";

export function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        { href: "/", label: "대시보드", icon: LayoutDashboard },
        { href: "/products", label: "상품 관리", icon: Package },
        { href: "/orders", label: "주문 관리", icon: ShoppingCart },
        { href: "/customers", label: "고객 관리", icon: Users },
        { href: "/sales", label: "매출 분석", icon: TrendingUp },
        { href: "/settings", label: "시스템 설정", icon: Settings },
    ];

    return (
        <aside className="fixed left-0 top-0 flex flex-col w-[260px] h-screen bg-white text-slate-600 overflow-y-auto z-10 border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            {/* 브랜드 로고 영역 */}
            <div className="flex items-center gap-3 p-8 shrink-0">
                <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <LayoutGrid className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="font-extrabold text-lg text-slate-900 leading-tight tracking-tight">Admin</h1>
                    <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">E-Commerce</p>
                </div>
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="flex-1 px-4 py-4 space-y-1.5">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 group",
                                isActive
                                    ? "bg-blue-50 text-blue-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/80"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={cn(
                                    "w-5 h-5 transition-all duration-300",
                                    isActive ? "text-blue-600 scale-110" : "text-slate-400 group-hover:text-slate-600"
                                )} />
                                {item.label}
                            </div>
                            {isActive && <ChevronRight className="w-4 h-4 text-blue-400" />}
                        </Link>
                    );
                })}
            </nav>

            {/* 하단 프로필 영역 */}
            <div className="p-6 mt-auto border-t border-slate-50 shrink-0">
                <div className="bg-slate-50/50 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                            JD
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-900">John Doe</p>
                            <p className="text-[10px] text-slate-400 font-medium">Super Admin</p>
                        </div>
                    </div>
                    <button
                        onClick={() => logoutAction()}
                        className="text-slate-400 hover:text-rose-500 transition-colors p-2 rounded-lg hover:bg-white shadow-sm duration-200"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
