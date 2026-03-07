import React from 'react';
import { AtRiskVip } from '../../domain/entities/customer.entity';

interface AtRiskVipAlertProps {
    vips: AtRiskVip[];
}

export function AtRiskVipAlert({ vips }: AtRiskVipAlertProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col h-full shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-rose-50 rounded-xl flex items-center justify-center">
                    <AlertTriangleIcon className="w-4 h-4 text-rose-500" />
                </div>
                <h3 className="text-[#0F172A] font-bold">이탈 위험 VIP 알림</h3>
            </div>

            <p className="text-xs text-slate-500 mb-8 leading-relaxed font-medium">
                최근 30일간 방문이 없는 VIP 고객이 <span className="text-rose-500 font-bold">{vips.length}명</span> 발생했습니다.
            </p>

            <div className="space-y-4 mb-auto">
                {vips.map((vip) => (
                    <div key={vip.id} className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4 transition-all duration-200">
                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center overflow-hidden border border-slate-100 ring-2 ring-slate-50">
                            <img src={vip.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${vip.name}`} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-[#0F172A]">{vip.name}</span>
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">Lv.{vip.grade}</span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                                <p className="text-[10px] text-slate-400 font-bold">마지막 방문: {vip.daysSinceLastVisit}일 전</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-8 py-3.5 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold rounded-2xl transition-all shadow-lg shadow-slate-200 duration-300">
                전체 분석 및 캠페인 실행
            </button>
        </div>
    );
}

function AlertTriangleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    );
}
