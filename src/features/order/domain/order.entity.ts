export type OrderStatus = 'PENDING' | 'PREPARING' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED';
export type PaymentStatus = 'WAITING' | 'COMPLETED' | 'CANCELLED';

export interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    orderAt: string;
    productInfo: string;
    totalAmount: number;
    paymentStatus: PaymentStatus;
    deliveryStatus: OrderStatus;
}

export interface OrderSummary {
    total: number;
    pendingPayment: number;
    preparingProduct: number;
    shipping: number;
    delivered: number;
    cancelled: number;
}
