import { SalesDashboardData } from './entities/sales.entity';

export interface ISalesRepository {
    getSalesDashboardData(period: 'yesterday' | 'last_7_days' | 'this_month'): Promise<SalesDashboardData>;
}
