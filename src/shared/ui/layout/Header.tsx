'use client';

import { Bell, LayoutGrid, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/src/features/auth/presentation/actions/logout.action";

export interface HeaderProps {
    isPublic?: boolean;
}

export function Header({ isPublic = false }: HeaderProps) {
    const pathname = usePathname();

    const getPageTitle = (path: string) => {
        if (path === '/') return { title: '대시보드', subtitle: '관리자 센터 / 실시간 모니터링' };
        if (path.startsWith('/products')) return { title: '상품 관리', subtitle: '관리자 센터 / 재고 및 가격 관리' };
        if (path.startsWith('/orders')) return { title: '주문 관리', subtitle: '관리자 센터 / 주문 및 배송 현황' };
        if (path.startsWith('/customers')) return { title: '고객 관리', subtitle: '관리자 센터 / CRM 및 회원 관리' };
        if (path.startsWith('/sales')) return { title: '매출 분석', subtitle: '관리자 센터 / 데이터 기반 성과 분석' };
        if (path.startsWith('/settings')) return { title: '시스템 설정', subtitle: '관리자 센터 / 환경 설정 및 보안' };
        if (path === '/login') return { title: '로그인', subtitle: '관리자 인증 시스템' };
        return { title: '관리 센터', subtitle: '이커머스 운영 대시보드' };
    };

    const { title, subtitle } = getPageTitle(pathname);

    return (
        <header className="h-[72px] bg-white flex items-center justify-between px-12 text-slate-800 border-b border-slate-200 sticky top-0 z-10 w-full shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <LayoutGrid className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                    <h2 className="text-base font-bold text-slate-900">{title}</h2>
                    <p className="text-[10px] text-slate-400 font-medium">{subtitle}</p>
                </div>
            </div>

            {!isPublic && (
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs ring-2 ring-white">
                            </div>
                            <button
                                onClick={() => logoutAction()}
                                className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-lg text-[11px] font-bold transition-all border border-slate-200 hover:border-rose-100 group"
                            >
                                <LogOut className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                로그아웃
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
