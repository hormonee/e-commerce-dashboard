import { DashboardStats } from './entities/dashboard-stats.entity';

export interface DashboardRepository {
    getStats(): Promise<DashboardStats>;
}
