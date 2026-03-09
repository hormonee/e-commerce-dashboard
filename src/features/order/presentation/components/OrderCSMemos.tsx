import React from 'react';
import { AdminMemo } from '../../domain/order.entity';
import { Button } from '@/src/shared/ui/button';

interface OrderCSMemosProps {
    memos: AdminMemo[];
}

export function OrderCSMemos({ memos }: OrderCSMemosProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <span className="text-slate-600">💬</span>
                    </div>
                    <h3 className="text-lg font-black text-[#0F172A]">관리자 CS 메모</h3>
                </div>
                <Button size="sm" variant="outline" className="rounded-xl h-8 px-4 text-[10px] font-black border-slate-100 text-slate-500">메모 추가</Button>
            </div>

            <div className="space-y-4">
                {memos.map((memo) => (
                    <div key={memo.id} className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 relative group">
                        <p className="text-xs font-bold text-slate-600 leading-relaxed mb-3">
                            {memo.content}
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">작성자: {memo.authorName} | {memo.createdAt}</span>
                            <button className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">🗑️</button>
                        </div>
                    </div>
                ))}

                <div className="relative mt-6">
                    <textarea
                        className="w-full h-32 p-5 rounded-3xl bg-slate-50/30 border border-slate-100 text-xs font-bold text-slate-600 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all resize-none"
                        placeholder="새로운 관리자 메모를 입력하세요..."
                    />
                </div>
            </div>
        </div>
    );
}
