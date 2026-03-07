import { CustomerDto, CustomerListResponseDto, CustomerStatsResponseDto } from './customer.dto';
import { Customer, CustomerListResult, CustomerStats } from '../domain/entities/customer.entity';

export class CustomerMapper {
    static toDomain(dto: CustomerDto): Customer {
        return {
            id: dto.customer_id,
            name: dto.full_name,
            email: dto.email_address,
            grade: dto.member_grade,
            ltv: dto.total_ltv,
            aov: dto.avg_order_value,
            orderCount: dto.order_count,
            lastVisitDate: dto.last_visited_at,
        };
    }

    static toListResult(dto: CustomerListResponseDto): CustomerListResult {
        return {
            customers: dto.items.map(this.toDomain),
            totalCount: dto.pagination.total_items,
        };
    }

    static toStatsDomain(dto: CustomerStatsResponseDto): CustomerStats {
        return {
            cohortData: dto.cohort_analysis.map((c) => ({
                month: c.target_month,
                size: c.cohort_size,
                retention: c.retention_rates,
            })),
            rfmSegments: dto.rfm_segments.map((s) => ({
                name: s.segment_name,
                percentage: s.segment_percentage,
            })),
            atRiskVips: dto.at_risk_vips.map((v) => ({
                id: v.id,
                name: v.name,
                grade: v.grade,
                daysSinceLastVisit: v.days_since_visit,
                avatarUrl: v.avatar_image_url,
            })),
        };
    }
}
