export type OrderStatus = 'PENDING' | 'PREPARING' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED';
export type PaymentStatus = 'WAITING' | 'COMPLETED' | 'CANCELLED';

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    grade: string;
    totalOrdersCount: number;
    totalOrderAmount: number;
}

export interface OrderItem {
    id: string;
    productId: string;
    name: string;
    imageUrl: string;
    optionName: string;
    price: number;
    quantity: number;
    totalPrice: number;
}

export interface ShippingInfo {
    recipient: string;
    phone: string;
    zipCode: string;
    address: string;
    trackingNumber?: string;
    courier?: string;
}

export interface PaymentInfo {
    method: string;
    totalProductAmount: number;
    shippingFee: number;
    couponDiscount: number;
    pointUsage: number;
    finalAmount: number;
    paidAt: string;
}

export interface TimelineItem {
    id: string;
    status: string;
    timestamp: string;
    description: string;
    managerName?: string;
}

export interface AdminMemo {
    id: string;
    content: string;
    authorName: string;
    createdAt: string;
}

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

export interface OrderDetail extends Order {
    customer: Customer;
    items: OrderItem[];
    shipping: ShippingInfo;
    payment: PaymentInfo;
    timeline: TimelineItem[];
    memos: AdminMemo[];
}

export interface OrderSummary {
    total: number;
    pendingPayment: number;
    preparingProduct: number;
    shipping: number;
    delivered: number;
    cancelled: number;
}
