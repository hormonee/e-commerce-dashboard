import React from 'react';
import { OrderDetail } from '../../domain/order.entity';
import { Button } from '@/src/shared/ui/button';

interface OrderShippingPaymentProps {
    shipping: OrderDetail['shipping'];
    payment: OrderDetail['payment'];
}

export function OrderShippingPayment({ shipping, payment }: OrderShippingPaymentProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 배송 정보 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center">
                            <span className="text-sky-600">🚚</span>
                        </div>
                        <h3 className="text-lg font-black text-[#0F172A]">배송 정보</h3>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 font-bold text-xs p-0 hover:bg-transparent">주소지 수정</Button>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-400">수령인</span>
                        <span className="text-sm font-black text-slate-700">{shipping.recipient}</span>
                    </div>
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-400">연락처</span>
                        <span className="text-sm font-black text-slate-700">{shipping.phone}</span>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-slate-400 block">배송지</span>
                        <p className="text-sm font-black text-slate-700 leading-relaxed">
                            ({shipping.zipCode}) {shipping.address}
                        </p>
                    </div>
                    <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                        <div className="space-y-0.5">
                            <span className="text-[10px] font-bold text-slate-400">운송장 번호</span>
                            <p className="text-xs font-black text-blue-600">
                                {shipping.courier} {shipping.trackingNumber || '미등록'}
                            </p>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px] font-black border-slate-100 shadow-none">복사</Button>
                    </div>
                </div>
            </div>

            {/* 결제 금액 상세 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <span className="text-indigo-600">🧾</span>
                    </div>
                    <h3 className="text-lg font-black text-[#0F172A]">결제 금액 상세</h3>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400">총 상품 금액</span>
                        <span className="text-sm font-black text-slate-700">{payment.totalProductAmount.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400">배송비</span>
                        <span className="text-sm font-black text-slate-700">+{payment.shippingFee.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400">쿠폰 할인</span>
                        <span className="text-sm font-black text-rose-500">-{payment.couponDiscount.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400">적립금 사용</span>
                        <span className="text-sm font-black text-rose-500">-{payment.pointUsage.toLocaleString()}원</span>
                    </div>

                    <div className="pt-4 border-t-2 border-dashed border-slate-100 flex justify-between items-center">
                        <span className="text-lg font-black text-[#0F172A]">최종 결제 금액</span>
                        <span className="text-2xl font-black text-blue-600">{payment.finalAmount.toLocaleString()}원</span>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50/50 p-3 rounded-xl mt-2">
                        <span className="text-[10px] text-slate-400">💳</span>
                        <p className="text-[11px] font-bold text-slate-500">
                            {payment.method} - {payment.paidAt}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
