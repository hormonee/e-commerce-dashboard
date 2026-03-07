import { SalesDashboardData } from '../../domain/entities/sales.entity';

export interface GetSalesDashboardResponseDto {
    period: 'yesterday' | 'last_7_days' | 'this_month';
    data: SalesDashboardData;
}
