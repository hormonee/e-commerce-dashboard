import { OrderRepository } from '../../domain/order.repository';
import { OrderDetail } from '../../domain/order.entity';

export async function getOrderDetailUseCase(
    orderRepository: OrderRepository,
    orderId: string
): Promise<OrderDetail> {
    return orderRepository.getOrderDetail(orderId);
}
