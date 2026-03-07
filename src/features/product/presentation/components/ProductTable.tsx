'use client';

import { Product } from "../../domain/entities/product.entity";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/shared/ui/table";
import { Badge } from "@/src/shared/ui/badge";
import { Edit2, LayoutGrid, Trash2 } from "lucide-react";
import { cn } from "../../../../shared/lib/utils";

interface ProductTableProps {
    products: Product[];
    onDelete: (id: string) => Promise<void>;
}

export function ProductTable({ products, onDelete }: ProductTableProps) {
    const getStatusColor = (status: Product['status']) => {
        switch (status) {
            case 'IN_STOCK': return 'bg-emerald-500';
            case 'LOW_STOCK': return 'bg-[#FAB005]';
            case 'OUT_OF_STOCK': return 'bg-rose-500';
            default: return 'bg-slate-500';
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <Table>
                <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent border-slate-200">
                        <TableHead className="w-[100px] text-slate-500 font-black text-xs uppercase tracking-tight px-6 py-4 text-center">썸네일</TableHead>
                        <TableHead className="text-slate-500 font-black text-xs uppercase tracking-tight py-4 text-center">상품명</TableHead>
                        <TableHead className="text-slate-500 font-black text-xs uppercase tracking-tight py-4 text-center">상품 코드</TableHead>
                        <TableHead className="text-slate-500 font-black text-xs uppercase tracking-tight py-4 text-center">카테고리</TableHead>
                        <TableHead className="text-slate-500 font-black text-xs uppercase tracking-tight py-4 text-center">가격</TableHead>
                        <TableHead className="text-slate-500 font-black text-xs uppercase tracking-tight py-4 text-center">재고 상태</TableHead>
                        <TableHead className="text-slate-500 font-black text-xs uppercase tracking-tight px-6 py-4 text-center">관리</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-slate-200">
                    {products.map((product) => (
                        <TableRow key={product.id} className="group hover:bg-slate-50/30 transition-all duration-200 border-slate-200">
                            <TableCell className="px-6 py-5 text-center">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shadow-inner group-hover:scale-105 transition-transform duration-300 mx-auto flex items-center justify-center">
                                    {product.mainImageUrl ? (
                                        <img src={product.mainImageUrl} alt={product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <LayoutGrid className="w-5 h-5 text-slate-300" />
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className="py-5 text-center">
                                <span className="font-black text-[#0F172A] tracking-tight group-hover:text-blue-600 transition-colors text-xs">{product.name}</span>
                            </TableCell>
                            <TableCell className="py-5 text-center">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">{product.sku}</span>
                            </TableCell>
                            <TableCell className="py-5 text-center">
                                <Badge className="bg-blue-50 text-blue-600 border-blue-100 px-2 py-0.5 rounded-lg text-[10px] font-extrabold shadow-sm mx-auto">
                                    {product.category.large}
                                </Badge>
                            </TableCell>
                            <TableCell className="py-5 text-center text-[#0F172A] font-extrabold tracking-tight text-xs">₩{product.price.final.toLocaleString()}</TableCell>
                            <TableCell className="py-5">
                                <div className="flex flex-col gap-2 min-w-[140px] items-center mx-auto">
                                    <div className="flex items-center justify-between text-[10px] font-bold w-full max-w-[120px]">
                                        <span className={cn(
                                            "uppercase tracking-tight",
                                            product.status === 'OUT_OF_STOCK' ? 'text-rose-500' : 'text-slate-500'
                                        )}>
                                            {product.status === 'IN_STOCK' ? '재고 있음' : product.status === 'LOW_STOCK' ? '재고 부족' : '품절'}
                                        </span>
                                        <span className="text-[#0F172A]">{product.stockCount} / {product.maxStock || 500}</span>
                                    </div>
                                    <div className="w-full max-w-[120px] h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                        <div
                                            className={cn("h-full rounded-full transition-all duration-1000 shadow-sm", getStatusColor(product.status))}
                                            style={{ width: `${Math.min((product.stockCount / (product.maxStock || 500)) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="px-6 py-5 text-center">
                                <div className="flex justify-center gap-2">
                                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all border border-slate-200 hover:border-blue-200 bg-white shadow-sm">
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm('정말 삭제하시겠습니까?')) {
                                                onDelete(product.id);
                                            }
                                        }}
                                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all border border-slate-200 hover:border-rose-200 bg-white shadow-sm"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
