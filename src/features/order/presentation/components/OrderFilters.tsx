"use client";

import React, { useState } from 'react';
import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
import { Label } from '@/src/shared/ui/label';

interface OrderFiltersProps {
    onSearch: (params: any) => void;
    onReset: () => void;
}

export function OrderFilters({ onSearch, onReset }: OrderFiltersProps) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchType, setSearchType] = useState('orderNumber');
    const [searchQuery, setSearchQuery] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('전체');
    const [deliveryCompany, setDeliveryCompany] = useState('전체 택배사');

    const handleSearch = () => {
        onSearch({
            startDate,
            endDate,
            searchType,
            searchQuery,
            paymentMethod,
            deliveryCompany,
        });
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        setSearchQuery('');
        setPaymentMethod('전체');
        setDeliveryCompany('전체 택배사');
        onReset();
    };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1.2fr_128px_128px] gap-8">
                {/* 조회 기간 */}
                <div className="space-y-3 min-w-[320px]">
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest pl-1 whitespace-nowrap">조회 기간</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            type="date"
                            className="bg-slate-50 border-slate-200 text-slate-700 text-xs font-black rounded-xl focus:ring-blue-500/10 focus:border-blue-500 transition-all h-11 min-w-[140px]"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <span className="text-slate-300 font-bold shrink-0">~</span>
                        <Input
                            type="date"
                            className="bg-slate-50 border-slate-200 text-slate-700 text-xs font-black rounded-xl focus:ring-blue-500/10 focus:border-blue-500 transition-all h-11 min-w-[140px]"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                {/* 검색 조건 */}
                <div className="space-y-3">
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest pl-1 whitespace-nowrap">상세 검색</Label>
                    <div className="flex bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all shadow-sm">
                        <select
                            className="bg-transparent border-none text-slate-700 text-xs font-black px-4 py-3 outline-none cursor-pointer border-r border-slate-200 shrink-0"
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                        >
                            <option value="orderNumber">주문 번호</option>
                            <option value="customerName">주문자명</option>
                        </select>
                        <Input
                            placeholder="검색어 입력"
                            className="bg-transparent border-none text-slate-700 text-xs font-black placeholder:text-slate-300 h-11 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* 결제 수단 */}
                <div className="space-y-3 max-w-[128px]">
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest pl-1 whitespace-nowrap">결제 수단</Label>
                    <select
                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-black rounded-xl h-11 px-4 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 shadow-sm cursor-pointer transition-all"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option>전체</option>
                        <option>신용카드</option>
                        <option>계좌이체</option>
                        <option>가상계좌</option>
                    </select>
                </div>

                {/* 택배사 */}
                <div className="space-y-3 max-w-[128px]">
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest pl-1 whitespace-nowrap">택배사 선택</Label>
                    <select
                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-black rounded-xl h-11 px-4 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 shadow-sm cursor-pointer transition-all"
                        value={deliveryCompany}
                        onChange={(e) => setDeliveryCompany(e.target.value)}
                    >
                        <option>전체</option>
                        <option>CJ대한통운</option>
                        <option>한진택배</option>
                        <option>로젠택배</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-all text-[11px] font-black uppercase tracking-widest px-4 py-2 hover:bg-slate-50 rounded-xl"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    필터 초기화
                </button>
                <Button
                    onClick={handleSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-16 h-12 rounded-xl text-sm font-black shadow-lg shadow-blue-100 transition-all border-none"
                >
                    검색 결과 조회
                </Button>
            </div>
        </div>
    );
}
