import { NextResponse } from 'next/server';
import { CustomerStatsResponseDto } from '@/src/features/customer/infrastructure/customer.dto';

export async function GET() {
    const mockStats: CustomerStatsResponseDto = {
        cohort_analysis: [
            { target_month: '2023.10', cohort_size: 1204, retention_rates: [45, 32, 28, 22, 18] },
            { target_month: '2023.11', cohort_size: 985, retention_rates: [48, 36, 25, 19, 0] },
            { target_month: '2023.12', cohort_size: 1420, retention_rates: [52, 30, 15, 0, 0] },
            { target_month: '2024.01', cohort_size: 1110, retention_rates: [42, 22, 0, 0, 0] },
        ],
        rfm_segments: [
            { segment_name: 'VIP', segment_percentage: 12 },
            { segment_name: '충성 고객', segment_percentage: 24 },
            { segment_name: '신규/잠재', segment_percentage: 64 },
        ],
        at_risk_vips: [
            { id: '101', name: '이정우', grade: 'VIP', days_since_visit: 32 },
            { id: '102', name: '박서윤', grade: 'Gold', days_since_visit: 28 },
        ],
    };

    return NextResponse.json(mockStats);
}
