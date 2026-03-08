import { OrderRepository } from '../../domain/order.repository';
import { OrderStatus } from '../../domain/order.entity';

export async function updateOrderStatusUseCase(
    orderRepository: OrderRepository,
    orderId: string,
    status: OrderStatus
): Promise<boolean> {
    return orderRepository.updateOrderStatus(orderId, status);
}
