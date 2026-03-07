import { ISalesRepository } from '../../domain/sales.repository';
import { SalesDashboardData } from '../../domain/entities/sales.entity';

export class GetSalesDashboardUseCase {
    constructor(private readonly salesRepository: ISalesRepository) { }

    async execute(period: 'yesterday' | 'last_7_days' | 'this_month'): Promise<SalesDashboardData> {
        return this.salesRepository.getSalesDashboardData(period);
    }
}
