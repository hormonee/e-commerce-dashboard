import { DashboardStats } from '../../domain/entities/dashboard-stats.entity';
import { DashboardRepository } from '../../domain/dashboard.repository';

export class GetDashboardStatsUseCase {
    constructor(private readonly dashboardRepository: DashboardRepository) { }

    async execute(): Promise<DashboardStats> {
        return this.dashboardRepository.getStats();
    }
}
