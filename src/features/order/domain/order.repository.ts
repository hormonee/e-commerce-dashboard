import { Order, OrderSummary } from './order.entity';

export interface GetOrdersParams {
    startDate?: string;
    endDate?: string;
    searchType?: 'orderNumber' | 'customerName';
    searchQuery?: string;
    paymentMethod?: string;
    deliveryCompany?: string;
    status?: string;
    page?: number;
    pageSize?: number;
}

export interface GetOrdersResponse {
    items: Order[];
    totalCount: number;
    summary: OrderSummary;
}

export interface OrderRepository {
    getOrders(params: GetOrdersParams): Promise<GetOrdersResponse>;
}
