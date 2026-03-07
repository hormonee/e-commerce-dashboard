import { OrderRepository, GetOrdersParams, GetOrdersResponse } from '../../domain/order.repository';

export async function getOrdersUseCase(
    repository: OrderRepository,
    params: GetOrdersParams
): Promise<GetOrdersResponse> {
    return await repository.getOrders(params);
}
