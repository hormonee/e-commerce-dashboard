'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, Image as ImageIcon, Search, Info, HelpCircle, ShoppingCart } from 'lucide-react';
import { productRegistrationSchema, ProductRegistrationData } from '../../application/dtos/register-product.dto';
import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
import { Label } from '@/src/shared/ui/label';
import { cn } from '@/src/shared/lib/utils';

export function ProductRegistrationForm() {
    const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProductRegistrationData>({
        resolver: zodResolver(productRegistrationSchema),
        defaultValues: {
            name: '',
            promotionText: '',
            category: { large: '', medium: '', small: '' },
            price: { regular: 0, discountRate: 0, final: 0 },
            stockCount: 0,
            purchaseLimit: 0,
            mainImageUrl: '',
            additionalImageUrls: [],
            options: [{ name: '', values: [] }],
            variants: [],
            description: '',
            shipping: { type: 'FREE', fee: 0, method: '', originAddress: '', isBundleAvailable: true },
            seo: { metaTitle: '', metaDescription: '', tags: [] }
        }
    });

    const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
        control,
        name: 'options'
    });

    const onSubmit = (data: ProductRegistrationData) => {
        console.log('Submitting Product:', data);
    };

    const regularPrice = watch('price.regular') || 0;
    const discountRate = watch('price.discountRate') || 0;

    React.useEffect(() => {
        const finalPrice = regularPrice * (1 - discountRate / 100);
        setValue('price.final', Math.floor(finalPrice));
    }, [regularPrice, discountRate, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
            {/* 상단 액션바 */}
            <div className="flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10 py-4 -mt-2 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-black text-[#0F172A] tracking-tight">상품 등록</h2>
                    <span className="text-slate-400 text-xs font-medium">새로운 상품을 등록하고 판매를 시작하세요.</span>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" type="button" className="rounded-xl font-bold h-11 px-6">임시 저장</Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold h-11 px-8 shadow-lg shadow-blue-200">등록 완료</Button>
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
                    <div className="space-y-2">
                        <Label className="text-slate-500 font-bold flex items-center gap-1">상품명 <span className="text-rose-500">*</span></Label>
                        <Input {...register('name')} placeholder="상품명을 입력하세요 (최대 100자)" className="h-12 rounded-xl bg-slate-50/50 border-slate-200 font-bold" />
                        {errors.name && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-slate-500 font-bold">홍보 문구</Label>
                        <Input {...register('promotionText')} placeholder="상품 리스트에 노출될 짧은 홍보 문구" className="h-12 rounded-xl bg-slate-50/50 border-slate-200 font-bold" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label className="text-slate-500 font-bold flex items-center gap-1">카테고리 선택 <span className="text-rose-500">*</span></Label>
                            <select {...register('category.large')} className="w-full h-12 rounded-xl bg-slate-50/50 border border-slate-200 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/10 transition-all">
                                <option value="">대분류 선택</option>
                                <option value="전자제품">전자제품</option>
                                <option value="의류">의류</option>
                            </select>
                            {errors.category?.large && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.category.large.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <select {...register('category.medium')} className="w-full h-12 rounded-xl bg-slate-50/50 border border-slate-200 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/10 transition-all mt-6 md:mt-8">
                                <option value="">중분류 선택</option>
                            </select>
                            {errors.category?.medium && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.category.medium.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <select {...register('category.small')} className="w-full h-12 rounded-xl bg-slate-50/50 border border-slate-200 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/10 transition-all mt-6 md:mt-8">
                                <option value="">소분류 선택</option>
                            </select>
                            {errors.category?.small && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.category.small.message}</p>}
                        </div>
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
                    <div className="space-y-2">
                        <Label className="text-slate-500 font-bold flex items-center gap-1">정상가 <span className="text-rose-500">*</span></Label>
                        <div className="relative">
                            <Input type="number" {...register('price.regular', { valueAsNumber: true })} className="h-12 rounded-xl bg-slate-50/50 border-slate-200 pr-10 font-black" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">원</span>
                        </div>
                        {errors.price?.regular && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.price.regular.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-500 font-bold">할인율</Label>
                        <div className="relative">
                            <Input type="number" {...register('price.discountRate', { valueAsNumber: true })} className="h-12 rounded-xl bg-slate-50/50 border-slate-200 pr-10 font-black" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">%</span>
                        </div>
                        {errors.price?.discountRate && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.price.discountRate.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className="text-blue-600 font-black">최종 판매가</Label>
                        <div className="relative">
                            <Input type="number" {...register('price.final', { valueAsNumber: true })} readOnly className="h-12 rounded-xl bg-blue-50/30 border-blue-100 pr-10 font-black text-blue-600" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 font-bold text-xs">원</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-500 font-bold flex items-center gap-1">재고 수량 <span className="text-rose-500">*</span></Label>
                        <div className="relative">
                            <Input type="number" {...register('stockCount', { valueAsNumber: true })} className="h-12 rounded-xl bg-slate-50/50 border-slate-200 pr-10 font-black" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">개</span>
                        </div>
                        {errors.stockCount && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.stockCount.message}</p>}
                    </div>
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
                    <div className="space-y-4">
                        <Label className="text-slate-500 font-bold flex items-center gap-1">대표 이미지 <span className="text-rose-500">*</span></Label>
                        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center bg-slate-50/30 hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer group">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                <Plus className="w-6 h-6 text-slate-400 group-hover:text-blue-500" />
                            </div>
                            <p className="mt-4 text-xs font-black text-slate-400 group-hover:text-blue-600">이미지 업로드 (Click or Drag)</p>
                            <p className="mt-1 text-[10px] text-slate-300">권장 사이즈: 1000x1000px</p>
                            <input type="hidden" {...register('mainImageUrl')} />
                        </div>
                        {errors.mainImageUrl && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.mainImageUrl.message}</p>}
                    </div>

                    <div className="space-y-4">
                        <Label className="text-slate-500 font-bold">추가 이미지 (최대 10장)</Label>
                        <div className="grid grid-cols-3 gap-3">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="aspect-square border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center bg-slate-50/20 hover:border-blue-100 hover:bg-blue-50/10 cursor-pointer transition-all">
                                    <Plus className="w-4 h-4 text-slate-200" />
                                </div>
                            ))}
                        </div>
                    </div>
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
                    <Button variant="outline" type="button" onClick={() => appendOption({ name: '', values: [] })} className="h-9 rounded-xl text-xs px-4 font-black">
                        <Plus className="w-3 h-3 mr-1.5" /> 옵션 추가
                    </Button>
                </div>

                <div className="space-y-6">
                    {optionFields.map((field, index) => (
                        <div key={field.id} className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 relative group animate-in fade-in slide-in-from-top-2">
                            <button
                                type="button"
                                onClick={() => removeOption(index)}
                                className="absolute -right-2 -top-2 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-sm transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 z-10"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-500 font-bold text-xs uppercase tracking-wider">옵션명</Label>
                                    <Input placeholder="예: 색상, 사이즈" className="h-11 rounded-xl bg-white border-slate-200 text-xs font-black" {...register(`options.${index}.name` as const)} />
                                </div>
                                <div className="md:col-span-3 space-y-2">
                                    <Label className="text-slate-500 font-bold text-xs uppercase tracking-wider">옵션값 (쉼표로 구분)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="예: 블랙, 화이트 (입력 후 Enter)"
                                            className="h-11 rounded-xl bg-white border-slate-200 text-xs font-black"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    const val = e.currentTarget.value.trim();
                                                    if (val) {
                                                        const currentValues = watch(`options.${index}.values`) || [];
                                                        if (!currentValues.includes(val)) {
                                                            setValue(`options.${index}.values`, [...currentValues, val]);
                                                            e.currentTarget.value = '';
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {(watch(`options.${index}.values`) || []).map((val, vIdx) => (
                                            <span key={vIdx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 shadow-sm transition-all hover:border-blue-200 hover:text-blue-600 group/tag">
                                                {val}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const currentValues = watch(`options.${index}.values`);
                                                        if (currentValues) {
                                                            setValue(`options.${index}.values`, currentValues.filter((_, i) => i !== vIdx));
                                                        }
                                                    }}
                                                    className="text-slate-300 hover:text-rose-500 transition-colors"
                                                >
                                                    <Plus className="w-3 h-3 rotate-45" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {optionFields.length === 0 && (
                        <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/10">
                            <p className="text-slate-400 text-xs font-black">등록된 옵션이 없습니다.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* 5. 상세 설명 */}
            <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
                <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                    <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-black text-[#0F172A]">상세 설명</h3>
                </div>
                <div className="border border-slate-200 rounded-2xl min-h-[300px] bg-slate-50/20 p-6 flex items-center justify-center">
                    <div className="text-center">
                        < ImageIcon className="w-10 h-10 text-slate-200 mx-auto" />
                        <p className="mt-4 text-slate-400 text-xs font-bold font-medium tracking-tight">상세 설명 에디터 영역</p>
                    </div>
                    <textarea {...register('description')} className="hidden" />
                </div>
                {errors.description && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.description.message}</p>}
            </section>

            {/* 6. 배송 정보 */}
            <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
                <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                    <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 text-sky-600" />
                    </div>
                    <h3 className="text-lg font-black text-[#0F172A]">배송 정보</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-slate-500 font-bold flex items-center gap-1 text-xs">배송비 유형 <span className="text-rose-500">*</span></Label>
                            <div className="flex gap-2">
                                {['FREE', 'PAID', 'CONDITIONAL_FREE'].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setValue('shipping.type', type as any)}
                                        className={cn(
                                            "flex-1 h-11 rounded-xl text-[11px] font-black border transition-all",
                                            watch('shipping.type') === type
                                                ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100"
                                                : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
                                        )}
                                    >
                                        {type === 'FREE' ? '무료 배송' : type === 'PAID' ? '유료 배송' : '조건부 무료'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {watch('shipping.type') !== 'FREE' && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-left-2">
                                <Label className="text-slate-500 font-bold text-xs uppercase tracking-tight">배송비</Label>
                                <div className="relative">
                                    <Input type="number" {...register('shipping.fee', { valueAsNumber: true })} className="h-11 rounded-xl bg-slate-50/50 border-slate-200 pr-10 font-black text-xs" />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[10px]">원</span>
                                </div>
                                {errors.shipping?.fee && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.shipping.fee.message}</p>}
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-slate-500 font-bold text-xs uppercase tracking-tight">배송 방법</Label>
                            <select {...register('shipping.method')} className="w-full h-11 rounded-xl bg-slate-50/50 border border-slate-200 px-4 text-xs font-black outline-none focus:ring-2 focus:ring-blue-500/10 transition-all">
                                <option value="">배송 방법 선택</option>
                                <option value="택배">택배</option>
                                <option value="직접수령">직접수령</option>
                            </select>
                            {errors.shipping?.method && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.shipping.method.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-500 font-bold text-xs uppercase tracking-tight">출고지 주소</Label>
                            <div className="flex gap-2">
                                <Input {...register('shipping.originAddress')} placeholder="기본 출고지 주소" className="h-11 rounded-xl bg-slate-50/50 border-slate-200 text-xs font-black flex-1" />
                                <Button variant="outline" type="button" className="h-11 rounded-xl px-4 text-xs font-black shrink-0">주소록</Button>
                            </div>
                            {errors.shipping?.originAddress && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.shipping.originAddress.message}</p>}
                        </div>
                    </div>
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
                        <div className="space-y-2">
                            <Label className="text-slate-500 font-bold text-xs uppercase tracking-wider">메타 타이틀</Label>
                            <Input {...register('seo.metaTitle')} placeholder="검색 엔진 노출용 제목" className="h-11 rounded-xl bg-slate-50/50 border-slate-200 text-xs font-black" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-500 font-bold text-xs uppercase tracking-wider">메타 설명</Label>
                            <textarea {...register('seo.metaDescription')} placeholder="검색 엔진 노출용 설명" className="w-full h-24 rounded-xl bg-slate-50/50 border border-slate-200 p-4 text-xs font-black outline-none focus:ring-2 focus:ring-blue-500/10 transition-all resize-none" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-slate-500 font-bold text-xs uppercase tracking-wider">검색 태그 (최대 10개)</Label>
                        <Input
                            placeholder="태그 입력 후 Enter"
                            className="h-11 rounded-xl bg-slate-50/50 border-slate-200 text-xs font-black"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    const val = e.currentTarget.value.trim();
                                    if (val) {
                                        const currentTags = watch('seo.tags') || [];
                                        if (currentTags.length < 10 && !currentTags.includes(val)) {
                                            setValue('seo.tags', [...currentTags, val]);
                                            e.currentTarget.value = '';
                                        }
                                    }
                                }
                            }}
                        />
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {(watch('seo.tags') || []).map((tag, i) => (
                                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 transition-all hover:bg-white hover:shadow-sm">
                                    #{tag}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const currentTags = watch('seo.tags');
                                            if (currentTags) {
                                                setValue('seo.tags', currentTags.filter((_, idx) => idx !== i));
                                            }
                                        }}
                                        className="text-slate-300 hover:text-rose-500"
                                    >
                                        <Plus className="w-3 h-3 rotate-45" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 최종 액션 버튼 */}
            <div className="flex justify-center gap-4 pt-10 border-t border-slate-100">
                <Button variant="outline" type="button" className="rounded-2xl font-black h-14 px-12 text-slate-500 hover:bg-white hover:border-slate-300 transition-all shadow-none">취소</Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black h-14 px-24 shadow-xl shadow-blue-200 transition-all active:scale-95">상품 등록 완료</Button>
            </div>
        </form>
    );
}
