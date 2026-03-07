export interface CustomerDto {
    customer_id: string;
    full_name: string;
    email_address: string;
    member_grade: 'VIP' | 'Gold' | 'Silver' | 'Bronze' | 'Normal';
    total_ltv: number;
    avg_order_value: number;
    order_count: number;
    last_visited_at: string; // ISO String
}

export interface CohortDto {
    target_month: string;
    cohort_size: number;
    retention_rates: number[];
}

export interface RfmSegmentDto {
    segment_name: string;
    segment_percentage: number;
}

export interface AtRiskVipDto {
    id: string;
    name: string;
    grade: 'VIP' | 'Gold' | 'Silver' | 'Bronze' | 'Normal';
    days_since_visit: number;
    avatar_image_url?: string;
}

export interface CustomerStatsResponseDto {
    cohort_analysis: CohortDto[];
    rfm_segments: RfmSegmentDto[];
    at_risk_vips: AtRiskVipDto[];
}

export interface CustomerListResponseDto {
    items: CustomerDto[];
    pagination: {
        total_items: number;
        current_page: number;
        page_size: number;
    };
}
