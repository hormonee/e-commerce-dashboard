'use client';

import React, { useState, useRef } from 'react';
import { useForm } from '@tanstack/react-form';
import {
    Plus,
    Trash2,
    Image as ImageIcon,
    Search,
    Info,
    X,
    Truck,
    HelpCircle,
    Copy,
    Eye
} from 'lucide-react';
import { productRegistrationSchema, ProductRegistrationData } from '../../domain/product.schema';
import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
import { Label } from '@/src/shared/ui/label';
import { cn } from '@/src/shared/lib/utils';
import { SupabaseStorageService } from '@/src/shared/api/supabase/storage';
import { registerProductAction } from '../actions/register-product.action';

const statusMap = {
    FREE: '무료',
    PAID: '유료',
    CONDITIONAL_FREE: '조건부 무료'
} as const;

export function ProductRegistrationForm() {
    const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
    const [mainImageFile, setMainImageFile] = useState<File | null>(null);
    const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);
    const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);
    const [isDraggingMain, setIsDraggingMain] = useState(false);
    const [isDraggingAdditional, setIsDraggingAdditional] = useState(false);
    const mainImageInputRef = useRef<HTMLInputElement>(null);
    const additionalImagesInputRef = useRef<HTMLInputElement>(null);

    const form = useForm({
        defaultValues: {
            name: '',
            promotionText: '',
            category: { large: '', medium: '', small: '' },
            price: { regular: 0, discountRate: 0, final: 0 },
            stockCount: 0,
            purchaseLimit: 0,
            mainImageUrl: '',
            additionalImageUrls: [] as string[],
            options: [] as { name: string; values: string[] }[],
            description: '',
            shipping: { type: 'FREE', fee: 0, method: '', originAddress: '', isBundleAvailable: true },
            seo: { metaTitle: '', metaDescription: '', tags: [] as string[] },
        } as ProductRegistrationData,
        onSubmit: async ({ value }: { value: ProductRegistrationData }) => {
            try {
                let mainImageUrl = value.mainImageUrl;
                let additionalImageUrls = value.additionalImageUrls;

                // 1. 대표 이미지 업로드
                if (mainImageFile) {
                    const { url, error } = await SupabaseStorageService.uploadImage(
                        mainImageFile,
                        `products/main/${mainImageFile.name}`
                    );
                    if (error) throw new Error('대표 이미지 업로드 실패');
                    mainImageUrl = url || '';
                }

                // 2. 추가 이미지 업로드
                if (additionalImageFiles.length > 0) {
                    const uploadPromises = additionalImageFiles.map(file =>
                        SupabaseStorageService.uploadImage(file, `products/additional/${file.name}`)
                    );
                    const results = await Promise.all(uploadPromises);
                    const failed = results.filter(r => r.error);
                    if (failed.length > 0) throw new Error('일부 추가 이미지 업로드 실패');
                    additionalImageUrls = results.map(r => r.url || '').filter(url => url !== '');
                }

                // 3. 서버 액션 호출
                const result = await registerProductAction({
                    ...value,
                    mainImageUrl,
                    additionalImageUrls
                });

                if (result?.error) {
                    alert(result.error);
                }
            } catch (error: any) {
                console.error('Submit error:', error);
                alert(error.message || '상품 등록 중 오류가 발생했습니다.');
            }
        },
    });

    const FieldInfo = ({ field }: { field: any }) => {
        const errors = field.state.meta.errors;
        const errorMap = field.state.meta.errorMap;
        // errorMap(현재 유효성 검사 결과)를 우선시하여, 입력 중인 상태를 즉각 반영함
        const displayError = errorMap?.onChange || errorMap?.onBlur || errors?.[0];

        return (
            <>
                {displayError ? (
                    <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1" role="alert">
                        {String(displayError)}
                    </p>
                ) : null}
            </>
        );
    };

    const labelClass = "text-slate-600 font-semibold pl-1 flex items-center gap-1 mb-1.5";

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="space-y-8 pb-20"
        >
            {/* 상단 액션바 */}
            <div className="flex justify-between items-center sticky top-0 z-10 pb-2 pt-2 -mt-2 px-1">
                <div className="flex flex-col">
                    <h2 className="text-[24px] font-black text-[#0F172A] tracking-tight">상품 등록</h2>
                    <span className="text-slate-400 text-[10px] font-bold mt-0.5">새로운 상품을 등록하고 판매를 시작하세요.</span>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" type="button" className="rounded-xl font-black h-11 px-6 text-slate-600 bg-white hover:bg-slate-50 border-slate-200 shadow-sm transition-all flex items-center gap-2">
                        <Copy className="w-4 h-4 text-slate-400" />
                        상품 복사 등록
                    </Button>
                    <Button variant="outline" type="button" className="rounded-xl font-black h-11 px-6 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border-indigo-100 shadow-sm transition-all flex items-center gap-2">
                        <Eye className="w-4 h-4 text-indigo-500" />
                        실시간 미리보기
                    </Button>
                </div>
            </div>

            {/* 1. 기본 정보 */}
            <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
                <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Info className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-black text-[#0F172A]">기본 정보</h3>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <form.Field
                        name="name"
                        validators={{
                            onChange: ({ value }) => {
                                const result = productRegistrationSchema.shape.name.safeParse(value);
                                return result.success ? undefined : result.error.errors[0].message;
                            },
                            onBlur: ({ value }) => {
                                const result = productRegistrationSchema.shape.name.safeParse(value);
                                return result.success ? undefined : result.error.errors[0].message;
                            }
                        }}
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name} className={labelClass}>상품명 <span className="text-rose-500">*</span></Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="상품명을 입력하세요 (최대 100자)"
                                    className="h-12 rounded-xl bg-slate-50/50 border-slate-200 font-bold"
                                />
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />

                    <form.Field
                        name="promotionText"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name} className={labelClass}>홍보 문구</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="상품 리스트에 노출될 짧은 홍보 문구"
                                    className="h-12 rounded-xl bg-slate-50/50 border-slate-200 font-bold"
                                />
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <form.Field
                            name="category.large"
                            validators={{
                                onChange: ({ value }) => {
                                    const result = productRegistrationSchema.shape.category.shape.large.safeParse(value);
                                    return result.success ? undefined : result.error.errors[0].message;
                                },
                                onBlur: ({ value }) => {
                                    const result = productRegistrationSchema.shape.category.shape.large.safeParse(value);
                                    return result.success ? undefined : result.error.errors[0].message;
                                }
                            }}
                            children={(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name} className={labelClass}>카테고리 선택 <span className="text-rose-500">*</span></Label>
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="w-full h-12 rounded-xl bg-slate-50/50 border border-slate-200 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                                    >
                                        <option value="">대분류 선택</option>
                                        <option value="전자제품">전자제품</option>
                                        <option value="의류">의류</option>
                                    </select>
                                    <FieldInfo field={field} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="category.medium"
                            validators={{
                                onChange: ({ value }) => {
                                    const result = productRegistrationSchema.shape.category.shape.medium.safeParse(value);
                                    return result.success ? undefined : result.error.errors[0].message;
                                },
                                onBlur: ({ value }) => {
                                    const result = productRegistrationSchema.shape.category.shape.medium.safeParse(value);
                                    return result.success ? undefined : result.error.errors[0].message;
                                }
                            }}
                            children={(field) => (
                                <div className="space-y-2 flex flex-col justify-end">
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="w-full h-12 rounded-xl bg-slate-50/50 border border-slate-200 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                                    >
                                        <option value="">중분류 선택</option>
                                        <option value="디스플레이">디스플레이</option>
                                        <option value="스마트폰">스마트폰</option>
                                    </select>
                                    <FieldInfo field={field} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="category.small"
                            validators={{
                                onChange: ({ value }) => {
                                    const result = productRegistrationSchema.shape.category.shape.small.safeParse(value);
                                    return result.success ? undefined : result.error.errors[0].message;
                                },
                                onBlur: ({ value }) => {
                                    const result = productRegistrationSchema.shape.category.shape.small.safeParse(value);
                                    return result.success ? undefined : result.error.errors[0].message;
                                }
                            }}
                            children={(field) => (
                                <div className="space-y-2 flex flex-col justify-end">
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="w-full h-12 rounded-xl bg-slate-50/50 border border-slate-200 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                                    >
                                        <option value="">소분류 선택</option>
                                        <option value="모니터">모니터</option>
                                        <option value="키링">키링</option>
                                    </select>
                                    <FieldInfo field={field} />
                                </div>
                            )}
                        />
                    </div>
                </div>
            </section>

            {/* 2. 판매가 및 재고 */}
            <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
                <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <Plus className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-black text-[#0F172A]">판매가 및 재고</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <form.Field
                        name="price.regular"
                        validators={{
                            onChange: ({ value }) => (value < 1 ? '정상가는 1원 이상이어야 합니다' : undefined),
                            onBlur: ({ value }) => (value < 1 ? '정상가는 1원 이상이어야 합니다' : undefined),
                        }}
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name} className={labelClass}>정상가 <span className="text-rose-500">*</span></Label>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            const safeVal = isNaN(val) ? 0 : val;
                                            field.handleChange(safeVal);
                                            // 최종 판매가 자동 계산
                                            const priceData = form.getFieldValue('price') as any;
                                            const discount = priceData?.discountRate || 0;
                                            form.setFieldValue('price.final', Math.round(safeVal * (1 - discount / 100)));
                                        }}
                                        className="h-12 rounded-xl bg-slate-50/50 border-slate-200 pr-10 font-black"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">원</span>
                                </div>
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />
                    <form.Field
                        name="price.discountRate"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name} className={labelClass}>할인율</Label>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const val = Number(e.target.value);
                                            const safeVal = isNaN(val) ? 0 : val;
                                            field.handleChange(safeVal);
                                            // 최종 판매가 자동 계산
                                            const priceData = form.getFieldValue('price') as any;
                                            const regular = priceData?.regular || 0;
                                            form.setFieldValue('price.final', Math.round(regular * (1 - safeVal / 100)));
                                        }}
                                        className="h-12 rounded-xl bg-slate-50/50 border-slate-200 pr-10 font-black"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">%</span>
                                </div>
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />
                    <form.Field
                        name="price.final"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label className="text-blue-600 font-black pl-1 flex items-center gap-1 mb-1.5">최종 판매가</Label>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        readOnly
                                        className="h-12 rounded-xl bg-blue-50/30 border-blue-100 pr-10 font-black text-blue-600"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 font-bold text-xs">원</span>
                                </div>
                            </div>
                        )}
                    />
                    <form.Field
                        name="stockCount"
                        validators={{
                            onChange: ({ value }) => {
                                const result = productRegistrationSchema.shape.stockCount.safeParse(value);
                                return result.success ? undefined : result.error.errors[0].message;
                            },
                            onBlur: ({ value }) => {
                                const result = productRegistrationSchema.shape.stockCount.safeParse(value);
                                return result.success ? undefined : result.error.errors[0].message;
                            }
                        }}
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name} className={labelClass}>재고 수량 <span className="text-rose-500">*</span></Label>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.valueAsNumber || 0)}
                                        className="h-12 rounded-xl bg-slate-50/50 border-slate-200 pr-10 font-black"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">개</span>
                                </div>
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />
                </div>
            </section>

            {/* 3. 이미지 등록 */}
            <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
                <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-black text-[#0F172A]">이미지 등록</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <form.Field
                        name="mainImageUrl"
                        validators={{
                            onChange: ({ value }) => {
                                const result = productRegistrationSchema.shape.mainImageUrl.safeParse(value);
                                return result.success ? undefined : result.error.errors[0].message;
                            },
                            onBlur: ({ value }) => {
                                const result = productRegistrationSchema.shape.mainImageUrl.safeParse(value);
                                return result.success ? undefined : result.error.errors[0].message;
                            }
                        }}
                        children={(field) => (
                            <div className="space-y-4">
                                <Label htmlFor={field.name} className={labelClass}>대표 이미지 <span className="text-rose-500">*</span></Label>
                                <input
                                    type="file"
                                    id={field.name}
                                    accept="image/*"
                                    ref={mainImageInputRef}
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setMainImageFile(file);
                                            const url = URL.createObjectURL(file);
                                            setMainImagePreview(url);
                                            field.handleChange(url);
                                            field.validate('change');
                                        }
                                    }}
                                />
                                <div
                                    onClick={() => mainImageInputRef.current?.click()}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDraggingMain(true);
                                    }}
                                    onDragLeave={(e) => {
                                        e.preventDefault();
                                        setIsDraggingMain(false);
                                    }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setIsDraggingMain(false);
                                        const file = e.dataTransfer.files?.[0];
                                        if (file && file.type.startsWith('image/')) {
                                            setMainImageFile(file);
                                            const url = URL.createObjectURL(file);
                                            setMainImagePreview(url);
                                            field.handleChange(url);
                                            field.validate('change');
                                        }
                                    }}
                                    className={cn(
                                        "relative border-2 border-dashed rounded-3xl p-0 h-[280px] flex flex-col items-center justify-center transition-all cursor-pointer group overflow-hidden",
                                        isDraggingMain
                                            ? "border-blue-500 bg-blue-50/50 scale-[1.02]"
                                            : "border-slate-200 bg-slate-50/30 hover:bg-blue-50/30 hover:border-blue-200"
                                    )}
                                >
                                    {mainImagePreview ? (
                                        <>
                                            <img src={mainImagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="flex flex-col items-center gap-2 text-white font-bold">
                                                    <ImageIcon className="w-8 h-8 mb-2" />
                                                    <span>이미지 변경</span>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setMainImagePreview(null);
                                                    setMainImageFile(null);
                                                    field.handleChange('');
                                                    if (mainImageInputRef.current) mainImageInputRef.current.value = '';
                                                }}
                                                className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-rose-500 shadow-lg hover:bg-rose-500 hover:text-white transition-all z-20"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className={cn(
                                                "w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border transition-all",
                                                isDraggingMain ? "bg-blue-500 border-blue-400 scale-110" : "bg-white border-slate-100 group-hover:scale-110"
                                            )}>
                                                <Plus className={cn("w-6 h-6 transition-colors", isDraggingMain ? "text-white" : "text-slate-400 group-hover:text-blue-500")} />
                                            </div>
                                            <p className={cn("mt-4 text-xs font-black transition-colors", isDraggingMain ? "text-blue-600" : "text-slate-400 group-hover:text-blue-600")}>이미지 업로드 (Click or Drag)</p>
                                            <p className="mt-1 text-[10px] text-slate-300">권장 사이즈: 1000x1000px</p>
                                        </>
                                    )}
                                </div>
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />

                    <form.Field
                        name="additionalImageUrls"
                        children={(field) => (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-1.5">
                                    <Label className={labelClass}>추가 이미지 (최대 10장)</Label>
                                    <span className="text-[10px] font-black text-blue-600">{field.state.value.length}/10</span>
                                </div>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    ref={additionalImagesInputRef}
                                    className="hidden"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files || []);
                                        if (files.length > 0) {
                                            setAdditionalImageFiles(prev => [...prev, ...files].slice(0, 10));
                                            const newUrls = files.map(file => URL.createObjectURL(file)).slice(0, 10 - field.state.value.length);
                                            const totalPreviews = [...additionalPreviews, ...newUrls].slice(0, 10);
                                            setAdditionalPreviews(totalPreviews);
                                            field.handleChange(totalPreviews);
                                        }
                                    }}
                                />
                                <div className="grid grid-cols-3 gap-3">
                                    {field.state.value.map((url, i) => (
                                        <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group border border-slate-100 shadow-sm animate-in zoom-in-95 duration-200">
                                            <img src={url} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newUrls = field.state.value.filter((_, idx) => idx !== i);
                                                    setAdditionalPreviews(newUrls);
                                                    setAdditionalImageFiles(prev => prev.filter((_, idx) => idx !== i));
                                                    field.handleChange(newUrls);
                                                }}
                                                className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/40 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                    {field.state.value.length < 10 && (
                                        <div
                                            onClick={() => additionalImagesInputRef.current?.click()}
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                                setIsDraggingAdditional(true);
                                            }}
                                            onDragLeave={(e) => {
                                                e.preventDefault();
                                                setIsDraggingAdditional(false);
                                            }}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                setIsDraggingAdditional(false);
                                                const files = Array.from(e.dataTransfer.files || []).filter(file => file.type.startsWith('image/'));
                                                if (files.length > 0) {
                                                    const availableCount = 10 - field.state.value.length;
                                                    const validFiles = files.slice(0, availableCount);

                                                    setAdditionalImageFiles(prev => [...prev, ...validFiles]);
                                                    const newUrls = validFiles.map(file => URL.createObjectURL(file));
                                                    const totalPreviews = [...additionalPreviews, ...newUrls];
                                                    setAdditionalPreviews(totalPreviews);
                                                    field.handleChange(totalPreviews);
                                                }
                                            }}
                                            className={cn(
                                                "aspect-square border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer group",
                                                isDraggingAdditional
                                                    ? "border-blue-500 bg-blue-50/50 scale-105"
                                                    : "border-slate-100 bg-slate-50/20 hover:border-blue-100 hover:bg-blue-50/10"
                                            )}
                                        >
                                            <Plus className={cn("w-5 h-5 transition-colors", isDraggingAdditional ? "text-blue-500" : "text-slate-200 group-hover:text-blue-400")} />
                                            <span className={cn("text-[8px] font-black mt-2 transition-colors", isDraggingAdditional ? "text-blue-600" : "text-slate-300 group-hover:text-blue-500")}>
                                                {isDraggingAdditional ? "Drop Here" : "Add More"}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />
                </div>
            </section>

            {/* 4. 옵션 설정 */}
            <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
                            <Plus className="w-4 h-4 text-violet-600" />
                        </div>
                        <h3 className="text-lg font-black text-[#0F172A]">옵션 설정</h3>
                    </div>
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => form.pushFieldValue('options', { name: '', values: [] })}
                        className="h-9 rounded-xl text-xs px-4 font-black"
                    >
                        <Plus className="w-3 h-3 mr-1.5" /> 옵션 추가
                    </Button>
                </div>

                <div className="space-y-6">
                    <form.Field
                        name="options"
                        mode="array"
                        children={(field) => (
                            <>
                                {field.state.value.map((_, index) => (
                                    <div key={index} className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 relative group animate-in fade-in slide-in-from-top-2">
                                        <button
                                            type="button"
                                            onClick={() => field.removeValue(index)}
                                            className="absolute -right-2 -top-2 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-sm transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 z-10"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                            <form.Field
                                                name={`options[${index}].name`}
                                                children={(subField) => (
                                                    <div className="space-y-2">
                                                        <Label className="text-slate-600 font-semibold pl-1 flex items-center gap-1 mb-1.5 text-xs uppercase tracking-wider">옵션명</Label>
                                                        <Input
                                                            placeholder="예: 색상, 사이즈"
                                                            className="h-11 rounded-xl bg-white border-slate-200 text-sm font-bold"
                                                            value={subField.state.value}
                                                            onBlur={subField.handleBlur}
                                                            onChange={(e) => subField.handleChange(e.target.value)}
                                                        />
                                                        <FieldInfo field={subField} />
                                                    </div>
                                                )}
                                            />
                                            <form.Field
                                                name={`options[${index}].values`}
                                                children={(subField) => (
                                                    <div className="md:col-span-3 space-y-2">
                                                        <Label className="text-slate-600 font-semibold pl-1 flex items-center gap-1 mb-1.5 text-xs uppercase tracking-wider">옵션값 (쉼표로 구분)</Label>
                                                        <div className="flex gap-2">
                                                            <Input
                                                                placeholder="예: 블랙, 화이트 (입력 후 Enter)"
                                                                className="h-11 rounded-xl bg-white border-slate-200 text-sm font-bold"
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        e.preventDefault();
                                                                        const val = e.currentTarget.value.trim();
                                                                        if (val) {
                                                                            const currentValues = subField.state.value || [];
                                                                            if (!currentValues.includes(val)) {
                                                                                subField.handleChange([...currentValues, val]);
                                                                                e.currentTarget.value = '';
                                                                            }
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                                            {(subField.state.value || []).map((val: string, vIdx: number) => (
                                                                <span key={vIdx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 shadow-sm transition-all hover:border-blue-200 hover:text-blue-600 group/tag">
                                                                    {val}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            subField.handleChange(subField.state.value.filter((_: string, i: number) => i !== vIdx));
                                                                        }}
                                                                        className="text-slate-300 hover:text-rose-500 transition-colors"
                                                                    >
                                                                        <Plus className="w-3 h-3 rotate-45" />
                                                                    </button>
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <FieldInfo field={subField} />
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {field.state.value.length === 0 && (
                                    <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/10">
                                        <p className="text-slate-400 text-sm font-bold">등록된 옵션이 없습니다.</p>
                                    </div>
                                )}
                            </>
                        )}
                    />
                </div>
            </section>

            {/* 5. 상세 설명 */}
            <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
                <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                    <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                        <Plus className="w-4 h-4 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-black text-[#0F172A]">상세 설명</h3>
                </div>

                <form.Field
                    name="description"
                    validators={{
                        onChange: ({ value }) => {
                            const result = productRegistrationSchema.shape.description.safeParse(value);
                            return result.success ? undefined : result.error.errors[0].message;
                        },
                        onBlur: ({ value }) => {
                            const result = productRegistrationSchema.shape.description.safeParse(value);
                            return result.success ? undefined : result.error.errors[0].message;
                        }
                    }}
                    children={(field) => (
                        <div className="space-y-4">
                            <Label htmlFor={field.name} className={labelClass}>상품 상세 설명 <span className="text-rose-500">*</span></Label>
                            <textarea
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full min-h-[300px] rounded-2xl bg-slate-50/50 border border-slate-200 p-6 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/10 transition-all resize-none font-bold"
                                placeholder="상품의 특징, 장점 등을 상세하게 입력해주세요."
                            />
                            <FieldInfo field={field} />
                        </div>
                    )}
                />
            </section>

            {/* 6. 배송 정보 */}
            <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
                <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                    <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center">
                        <Truck className="w-4 h-4 text-sky-600" />
                    </div>
                    <h3 className="text-lg font-black text-[#0F172A]">배송 정보</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <form.Field
                        name="shipping.type"
                        validators={{
                            onChange: ({ value }) => {
                                const result = productRegistrationSchema.shape.shipping.shape.type.safeParse(value);
                                return result.success ? undefined : result.error.errors[0].message;
                            },
                            onBlur: ({ value }) => {
                                const result = productRegistrationSchema.shape.shipping.shape.type.safeParse(value);
                                return result.success ? undefined : result.error.errors[0].message;
                            }
                        }}
                        children={(field) => (
                            <div className="space-y-4">
                                <Label className={labelClass}>배송비 정책 <span className="text-rose-500">*</span></Label>
                                <div className="grid grid-cols-3 gap-3">
                                    {(['FREE', 'PAID', 'CONDITIONAL_FREE'] as const).map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => {
                                                field.handleChange(type as any);
                                                if (type === 'FREE') {
                                                    form.setFieldValue('shipping.fee', 0);
                                                }
                                            }}
                                            className={cn(
                                                "h-12 rounded-xl text-[11px] font-black transition-all border",
                                                field.state.value === type
                                                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100"
                                                    : "bg-white text-slate-400 border-slate-100 hover:border-slate-200"
                                            )}
                                        >
                                            {statusMap[type]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    />

                    <form.Field
                        name="shipping.fee"
                        children={(field) => (
                            <form.Subscribe
                                selector={(state) => state.values.shipping.type}
                                children={(shippingType) => (
                                    <div className="space-y-2">
                                        <Label htmlFor={field.name} className={labelClass}>기본 배송비 <span className="text-rose-500">*</span></Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.valueAsNumber || 0)}
                                                disabled={shippingType === 'FREE'}
                                                className="h-12 rounded-xl bg-slate-50/50 border-slate-200 pr-10 font-bold"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">원</span>
                                        </div>
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            />
                        )}
                    />

                    <form.Field
                        name="shipping.method"
                        validators={{
                            onChange: ({ value }) => {
                                const result = productRegistrationSchema.shape.shipping.shape.method.safeParse(value);
                                return result.success ? undefined : result.error.errors[0].message;
                            },
                            onBlur: ({ value }) => {
                                const result = productRegistrationSchema.shape.shipping.shape.method.safeParse(value);
                                return result.success ? undefined : result.error.errors[0].message;
                            }
                        }}
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name} className={labelClass}>배송 방법 <span className="text-rose-500">*</span></Label>
                                <select
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full h-12 rounded-xl bg-slate-50/50 border border-slate-200 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                                >
                                    <option value="">배송 방법 선택</option>
                                    <option value="택배">택배</option>
                                    <option value="직접수령">직접수령</option>
                                </select>
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />

                    <form.Field
                        name="shipping.originAddress"
                        validators={{
                            onChange: ({ value }) => {
                                const result = productRegistrationSchema.shape.shipping.shape.originAddress.safeParse(value);
                                return result.success ? undefined : result.error.errors[0].message;
                            },
                            onBlur: ({ value }) => {
                                const result = productRegistrationSchema.shape.shipping.shape.originAddress.safeParse(value);
                                return result.success ? undefined : result.error.errors[0].message;
                            }
                        }}
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name} className={labelClass}>출고지 주소 <span className="text-rose-500">*</span></Label>
                                <div className="flex gap-2">
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="기본 출고지 주소"
                                        className="h-12 rounded-xl bg-slate-50/50 border-slate-200 font-bold flex-1"
                                    />
                                    <Button variant="outline" type="button" className="h-12 rounded-xl px-4 text-xs font-black shrink-0">주소록</Button>
                                </div>
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />
                </div>
            </section>

            {/* 7. 검색 최적화(SEO) */}
            <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
                <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                        <Search className="w-4 h-4 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-black text-[#0F172A]">검색 최적화(SEO)</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <form.Field
                            name="seo.metaTitle"
                            validators={{
                                onChange: ({ value }) => {
                                    const result = productRegistrationSchema.shape.seo.shape.metaTitle.safeParse(value);
                                    return result.success ? undefined : result.error.errors[0].message;
                                },
                                onBlur: ({ value }) => {
                                    const result = productRegistrationSchema.shape.seo.shape.metaTitle.safeParse(value);
                                    return result.success ? undefined : result.error.errors[0].message;
                                }
                            }}
                            children={(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name} className={labelClass}>메타 타이틀</Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="검색 엔진 노출용 제목"
                                        className="h-12 rounded-xl bg-slate-50/50 border-slate-200 font-bold"
                                    />
                                    <FieldInfo field={field} />
                                </div>
                            )}
                        />
                        <form.Field
                            name="seo.metaDescription"
                            validators={{
                                onChange: ({ value }) => {
                                    const result = productRegistrationSchema.shape.seo.shape.metaDescription.safeParse(value);
                                    return result.success ? undefined : result.error.errors[0].message;
                                },
                                onBlur: ({ value }) => {
                                    const result = productRegistrationSchema.shape.seo.shape.metaDescription.safeParse(value);
                                    return result.success ? undefined : result.error.errors[0].message;
                                }
                            }}
                            children={(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name} className={labelClass}>메타 설명</Label>
                                    <textarea
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="검색 엔진 노출용 설명"
                                        className="w-full h-24 rounded-xl bg-slate-50/50 border border-slate-200 p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/10 transition-all resize-none placeholder:text-slate-400"
                                    />
                                    <FieldInfo field={field} />
                                </div>
                            )}
                        />
                    </div>

                    <form.Field
                        name="seo.tags"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label className={labelClass}>검색 태그 (최대 10개)</Label>
                                <Input
                                    placeholder="태그 입력 후 Enter"
                                    className="h-12 rounded-xl bg-slate-50/50 border-slate-200 font-bold"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            const val = e.currentTarget.value.trim();
                                            if (val) {
                                                const currentTags = field.state.value || [];
                                                if (currentTags.length < 10 && !currentTags.includes(val)) {
                                                    field.handleChange([...currentTags, val]);
                                                    e.currentTarget.value = '';
                                                }
                                            }
                                        }
                                    }}
                                />
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {(field.state.value || []).map((tag: string, i: number) => (
                                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 transition-all hover:bg-white hover:border-blue-200 hover:text-blue-600 hover:shadow-sm group">
                                            #{tag}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    field.handleChange(field.state.value.filter((_: string, idx: number) => idx !== i));
                                                }}
                                                className="text-slate-300 hover:text-rose-500 transition-colors"
                                            >
                                                <Plus className="w-3 h-3 rotate-45" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />
                </div>
            </section>

            {/* 최종 액션 버튼 */}
            <div className="flex justify-center gap-4 pt-4 border-t border-slate-100">
                <Button variant="outline" type="button" className="rounded-2xl font-black h-12 w-[150px] bg-white text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-none">취소</Button>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button
                            type="submit"
                            disabled={!canSubmit}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black h-12 w-[150px] shadow-xl shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {isSubmitting ? '처리 중...' : '상품 등록'}
                        </Button>
                    )}
                />
            </div>
        </form>
    );
}
