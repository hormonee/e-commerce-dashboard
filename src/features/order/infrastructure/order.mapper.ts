import { OrderDetail, OrderItem, TimelineItem, AdminMemo, Customer, ShippingInfo, PaymentInfo } from '../domain/order.entity';

export interface OrderDetailDto {
    id: string;
    order_number: string;
    order_status: string;
    created_at: string;
    total_product_amount: number;
    shipping_fee: number;
    final_amount: number;
    shipping_recipient_name: string;
    shipping_phone: string;
    shipping_address: string;
    shipping_zipcode: string;
    courier_name: string;
    tracking_number: string;
    payment_method: string;
    coupon_discount: number;
    points_used: number;
    users: {
        id: string;
        email: string;
        full_name: string;
        phone: string;
        tier: string;
        total_orders: number;
        ltv: number;
    };
    order_items: Array<{
        id: string;
        product_id: string;
        quantity: number;
        unit_price: number;
        products: {
            name: string;
            main_image_url: string;
        };
    }>;
    order_history: Array<{
        id: string;
        status: string;
        created_at: string;
        note: string;
    }>;
}

export class OrderMapper {
    static toDetailEntity(dto: OrderDetailDto): OrderDetail {
        return {
            id: dto.id,
            orderNumber: dto.order_number,
            customerName: dto.users.full_name || '이름 없음',
            customerPhone: dto.users.phone || '',
            orderAt: dto.created_at,
            productInfo: dto.order_items[0]?.products.name + (dto.order_items.length > 1 ? ` 외 ${dto.order_items.length - 1}건` : ''),
            totalAmount: dto.final_amount,
            paymentStatus: dto.order_status === 'PAYMENT_PENDING' ? 'WAITING' : 'COMPLETED',
            deliveryStatus: dto.order_status as any,
            customer: {
                id: dto.users.id,
                name: dto.users.full_name || '이름 없음',
                email: dto.users.email,
                phone: dto.users.phone || '',
                grade: dto.users.tier,
                totalOrdersCount: dto.users.total_orders,
                totalOrderAmount: Number(dto.users.ltv)
            },
            items: dto.order_items.map(item => ({
                id: item.id,
                productId: item.product_id,
                name: item.products.name,
                imageUrl: item.products.main_image_url,
                optionName: '',
                price: Number(item.unit_price),
                quantity: item.quantity,
                totalPrice: Number(item.unit_price) * item.quantity
            })),
            shipping: {
                recipient: dto.shipping_recipient_name,
                phone: dto.shipping_phone,
                zipCode: dto.shipping_zipcode,
                address: dto.shipping_address,
                trackingNumber: dto.tracking_number,
                courier: dto.courier_name
            },
            payment: {
                method: dto.payment_method || '알 수 없음',
                totalProductAmount: Number(dto.total_product_amount),
                shippingFee: Number(dto.shipping_fee),
                couponDiscount: Number(dto.coupon_discount),
                pointUsage: Number(dto.points_used),
                finalAmount: Number(dto.final_amount),
                paidAt: dto.created_at // 실제 결제 일시 컬럼이 없으므로 생성일시 활용
            },
            timeline: dto.order_history.map(h => ({
                id: h.id,
                status: h.status,
                timestamp: h.created_at,
                description: h.note
            })),
            memos: [] // customer_notes 테이블이 별도로 있지만 orders와 직접 관계가 스키마에 명시되지 않아 일단 빈 배열로 둠
        };
    }
}
