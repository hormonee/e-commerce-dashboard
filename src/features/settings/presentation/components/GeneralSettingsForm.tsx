"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Settings } from '../../domain/settings.entity';
import { updateSettingsSchema, UpdateSettingsDto } from '../../application/settings.dto';
import { Input } from '@/src/shared/ui/input';
import { Button } from '@/src/shared/ui/button';
import { Label } from '@/src/shared/ui/label';
import { Textarea } from '@/src/shared/ui/textarea';
import { Switch } from '@/src/shared/ui/switch';

interface GeneralSettingsFormProps {
    initialSettings: Settings;
    onSubmit: (data: UpdateSettingsDto) => void;
}

export function GeneralSettingsForm({ initialSettings, onSubmit }: GeneralSettingsFormProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<UpdateSettingsDto>({
        resolver: zodResolver(updateSettingsSchema),
        defaultValues: {
            storeName: initialSettings.storeName,
            contactEmail: initialSettings.contactEmail,
            storeDescription: initialSettings.storeDescription,
            addressLine1: initialSettings.addressLine1,
            city: initialSettings.city,
            state: initialSettings.state,
            zipCode: initialSettings.zipCode,
            maintenanceMode: initialSettings.maintenanceMode,
            customerAccounts: initialSettings.customerAccounts,
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* 상점 상세 정보 */}
            <div className="space-y-6">
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-black text-[#0F172A] tracking-tight">상점 상세 정보</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Store Identity Settings</p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
                    <div className="space-y-3">
                        <Label htmlFor="storeName" className="text-slate-500 text-[10px] font-black uppercase tracking-widest pl-1">상점 이름</Label>
                        <Input
                            id="storeName"
                            className="bg-white border-slate-200 text-slate-700 font-bold rounded-xl h-12 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                            {...register('storeName')}
                        />
                        {errors.storeName && (
                            <p className="text-[10px] font-bold text-rose-500 pl-1 uppercase tracking-tight">{errors.storeName.message}</p>
                        )}
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="contactEmail" className="text-slate-500 text-[10px] font-black uppercase tracking-widest pl-1">연락처 이메일</Label>
                        <Input
                            id="contactEmail"
                            type="email"
                            className="bg-white border-slate-200 text-slate-700 font-bold rounded-xl h-12 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                            {...register('contactEmail')}
                        />
                        {errors.contactEmail && (
                            <p className="text-[10px] font-bold text-rose-500 pl-1 uppercase tracking-tight">{errors.contactEmail.message}</p>
                        )}
                    </div>
                    <div className="space-y-3 md:col-span-2">
                        <Label htmlFor="storeDescription" className="text-slate-500 text-[10px] font-black uppercase tracking-widest pl-1">상점 설명</Label>
                        <Textarea
                            id="storeDescription"
                            className="bg-white border-slate-200 text-slate-700 font-bold rounded-xl min-h-[120px] focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm py-4"
                            {...register('storeDescription')}
                        />
                    </div>
                </div>
            </div>

            {/* 상점 주소 */}
            <div className="space-y-6">
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-black text-[#0F172A] tracking-tight">상점 주소</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest pl-1">Billing & Shipping Origin</p>
                </div>
                <div className="space-y-8 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
                    <div className="space-y-3">
                        <Label htmlFor="addressLine1" className="text-slate-500 text-[10px] font-black uppercase tracking-widest pl-1">기본 주소</Label>
                        <Input
                            id="addressLine1"
                            className="bg-white border-slate-200 text-slate-700 font-bold rounded-xl h-12 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                            {...register('addressLine1')}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="space-y-3">
                            <Label htmlFor="city" className="text-slate-500 text-[10px] font-black uppercase tracking-widest pl-1">도시</Label>
                            <Input
                                id="city"
                                className="bg-white border-slate-200 text-slate-700 font-bold rounded-xl h-12 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                                {...register('city')}
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="state" className="text-slate-500 text-[10px] font-black uppercase tracking-widest pl-1">시/도</Label>
                            <Input
                                id="state"
                                className="bg-white border-slate-200 text-slate-700 font-bold rounded-xl h-12 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                                {...register('state')}
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="zipCode" className="text-slate-500 text-[10px] font-black uppercase tracking-widest pl-1">우편번호</Label>
                            <Input
                                id="zipCode"
                                className="bg-white border-slate-200 text-slate-700 font-bold rounded-xl h-12 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                                {...register('zipCode')}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 환경설정 */}
            <div className="space-y-6">
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-black text-[#0F172A] tracking-tight">환경설정</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest pl-1">Operational Configurations</p>
                </div>
                <div className="space-y-4 bg-slate-50/50 p-2 rounded-3xl border border-slate-100">
                    <div className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <div className="space-y-1">
                            <Label htmlFor="maintenanceMode" className="text-sm font-black text-[#0F172A]">유지보수 모드</Label>
                            <p className="text-[11px] text-slate-400 font-bold">변경 사항을 적용하는 동안 상점을 유지보수 모드로 전환합니다.</p>
                        </div>
                        <Controller
                            control={control}
                            name="maintenanceMode"
                            render={({ field }) => (
                                <Switch
                                    id="maintenanceMode"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-blue-600"
                                />
                            )}
                        />
                    </div>
                    <div className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <div className="space-y-1">
                            <Label htmlFor="customerAccounts" className="text-sm font-black text-[#0F172A]">고객 계정 필수 여부</Label>
                            <p className="text-[11px] text-slate-400 font-bold">고객이 결제하려면 계정을 만들도록 요구합니다.</p>
                        </div>
                        <Controller
                            control={control}
                            name="customerAccounts"
                            render={({ field }) => (
                                <Switch
                                    id="customerAccounts"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-blue-600"
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" className="bg-white text-slate-500 hover:text-slate-700 hover:bg-slate-50 font-bold text-xs h-12 px-8 rounded-xl border border-slate-200 transition-all shadow-sm">취소</Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-black text-sm h-12 px-10 rounded-xl transition-all shadow-lg shadow-blue-100 border-none">변경사항 저장</Button>
            </div>
        </form>
    );
}
