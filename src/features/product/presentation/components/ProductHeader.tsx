import { Plus } from "lucide-react";
import Link from "next/link";

export function ProductHeader() {
    return (
        <div className="flex flex-col gap-1 mb-2">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">상품 관리</h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                        전체 상품의 재고 상태와 상세 정보를 한눈에 관리하세요.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                        엑셀 내보내기
                    </button>
                    <Link
                        href="/products/register"
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                    >
                        <Plus className="w-4 h-4" />
                        새 상품 등록
                    </Link>
                </div>
            </div>
        </div>
    );
}
