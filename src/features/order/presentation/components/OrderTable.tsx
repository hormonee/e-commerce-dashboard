import { Order } from '../../domain/order.entity';
import { Badge } from '@/src/shared/ui/badge';
import { cn } from '@/src/shared/lib/utils';

interface OrderTableProps {
    orders: Order[];
    onSelectChange?: (selectedIds: string[]) => void;
}

export function OrderTable({ orders }: OrderTableProps) {
    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'PENDING': return '결제 대기';
            case 'PREPARING': return '상품 준비중';
            case 'SHIPPING': return '배송 중';
            case 'DELIVERED': return '배송 완료';
            case 'CANCELLED': return '취소/반품/교환';
            case 'WAITING': return '입금 대기';
            case 'COMPLETED': return '결제 완료';
            default: return status;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED':
            case 'DELIVERED':
                return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'WAITING':
            case 'PENDING':
                return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'PREPARING':
            case 'SHIPPING':
                return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'CANCELLED':
                return 'bg-rose-50 text-rose-600 border-rose-100';
            default:
                return 'bg-slate-50 text-slate-400 border-slate-100';
        }
    };

    return (
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/50 text-slate-500 font-black text-xs uppercase tracking-tight border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-5 w-12 text-center">
                            <input type="checkbox" className="rounded-lg border-slate-300 bg-white focus:ring-blue-500/20 text-blue-600 h-4 w-4 transition-all" />
                        </th>
                        <th className="px-6 py-5 text-center">주문 번호</th>
                        <th className="px-6 py-5 text-center">주문자 / 연락처</th>
                        <th className="px-6 py-5 text-center">주문 일시</th>
                        <th className="px-6 py-5 text-center">상품 정보</th>
                        <th className="px-6 py-5 text-center">결제 금액</th>
                        <th className="px-6 py-5 text-center">결제 상태</th>
                        <th className="px-6 py-5 text-center">배송 상태</th>
                        <th className="px-6 py-5 text-center w-20">관리</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {orders.map((order) => (
                        <tr key={order.id} className="group hover:bg-slate-50/30 transition-all duration-200 border-slate-200">
                            <td className="px-6 py-5 text-center">
                                <input type="checkbox" className="rounded-lg border-slate-200 bg-white focus:ring-blue-500/20 text-blue-600 h-4 w-4 cursor-pointer" />
                            </td>
                            <td className="px-6 py-5 text-center">
                                <span className="font-black text-blue-600 text-xs tracking-tighter hover:underline cursor-pointer">
                                    {order.orderNumber}
                                </span>
                            </td>
                            <td className="px-6 py-5 text-center">
                                <div className="font-black text-[#0F172A] tracking-tight text-xs">{order.customerName}</div>
                                <div className="text-[10px] text-slate-400 font-bold">{order.customerPhone}</div>
                            </td>
                            <td className="px-6 py-5 text-center text-slate-500 text-[11px] font-bold">
                                {order.orderAt}
                            </td>
                            <td className="px-6 py-5 text-center text-slate-600 font-black text-xs max-w-[200px] truncate">
                                {order.productInfo}
                            </td>
                            <td className="px-6 py-5 text-center font-black text-[#0F172A] tracking-tighter text-xs">
                                ₩{order.totalAmount.toLocaleString()}
                            </td>
                            <td className="px-6 py-5 text-center whitespace-nowrap">
                                <Badge className={cn("text-[10px] font-black px-2.5 py-1 rounded-lg border shadow-sm", getStatusColor(order.paymentStatus))}>
                                    {getStatusLabel(order.paymentStatus)}
                                </Badge>
                            </td>
                            <td className="px-6 py-5 text-center whitespace-nowrap">
                                <Badge className={cn("text-[10px] font-black px-2.5 py-1 rounded-lg border shadow-sm", getStatusColor(order.deliveryStatus))}>
                                    {getStatusLabel(order.deliveryStatus)}
                                </Badge>
                            </td>
                            <td className="px-6 py-5 text-center">
                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-slate-200 hover:border-blue-200 bg-white shadow-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
