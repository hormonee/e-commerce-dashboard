import { Bestseller } from "../../domain/entities/sales.entity";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/shared/ui/table";

interface BestsellerTableProps {
    bestsellers: Bestseller[];
}

export function BestsellerTable({ bestsellers }: BestsellerTableProps) {
    const getInventoryBadge = (status: Bestseller['inventoryStatus']) => {
        switch (status) {
            case 'in_stock':
                return <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-extrabold border border-emerald-100 shadow-sm">여유</span>;
            case 'low_stock':
                return <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-extrabold border border-amber-100 shadow-sm">품절임박</span>;
            case 'out_of_stock':
                return <span className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-extrabold border border-rose-100 shadow-sm">품절</span>;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm h-full">
            <div className="flex justify-between items-center p-8 border-b border-slate-50">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M6 9l6 6 6-6" /></svg>
                    </div>
                    <h3 className="text-[#0F172A] font-extrabold tracking-tight">베스트셀러 TOP 10</h3>
                </div>
                <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-all uppercase tracking-widest px-4 py-2 hover:bg-blue-50 rounded-xl">전체보기</button>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-slate-50/30">
                        <TableRow className="hover:bg-transparent border-slate-50">
                            <TableHead className="w-[80px] text-slate-400 font-bold text-[10px] uppercase tracking-widest px-8">Rank</TableHead>
                            <TableHead className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Product Information</TableHead>
                            <TableHead className="text-right text-slate-400 font-bold text-[10px] uppercase tracking-widest">Qty Sold</TableHead>
                            <TableHead className="text-right text-slate-400 font-bold text-[10px] uppercase tracking-widest">Revenue</TableHead>
                            <TableHead className="text-right text-slate-400 font-bold text-[10px] uppercase tracking-widest px-8">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-slate-50">
                        {bestsellers.map((item) => (
                            <TableRow key={item.id} className="group hover:bg-slate-50/30 transition-all duration-200 border-none">
                                <TableCell className="px-8 py-5">
                                    <span className="font-black text-blue-600 text-sm tracking-tighter">
                                        {String(item.rank).padStart(2, '0')}
                                    </span>
                                </TableCell>
                                <TableCell className="py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shadow-inner group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                                            {item.imageUrl ? (
                                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                                            )}
                                        </div>
                                        <span className="font-extrabold text-[#0F172A] tracking-tight truncate max-w-[180px] group-hover:text-blue-600 transition-colors">{item.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right py-5">
                                    <span className="text-[11px] font-bold text-slate-500">{item.salesCount.toLocaleString()} units</span>
                                </TableCell>
                                <TableCell className="text-right py-5">
                                    <span className="font-black text-[#0F172A] tracking-tighter">₩{item.revenue.toLocaleString()}</span>
                                </TableCell>
                                <TableCell className="text-right px-8 py-5">
                                    {getInventoryBadge(item.inventoryStatus)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
