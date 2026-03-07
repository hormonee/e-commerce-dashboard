import { GetCustomersFilter, CustomerRepository } from '../domain/customer.repository';
import { CustomerListResult, CustomerStats } from '../domain/entities/customer.entity';
import { CustomerMapper } from './customer.mapper';
import { CustomerListResponseDto, CustomerStatsResponseDto } from './customer.dto';

export class CustomerApi implements CustomerRepository {
    async getCustomers(filter: GetCustomersFilter): Promise<CustomerListResult> {
        // SSR 환경에서 /api/customers fetch 시 발생하는 파싱 에러 방지를 위해 Mock 데이터 직접 반환
        const mockListData: CustomerListResponseDto = {
            items: [
                {
                    customer_id: '1',
                    full_name: '강하늘',
                    email_address: 'sky@example.com',
                    member_grade: 'VIP',
                    total_ltv: 2450000,
                    avg_order_value: 188461,
                    order_count: 13,
                    last_visited_at: '2024.03.14',
                },
                {
                    customer_id: '2',
                    full_name: '김민준',
                    email_address: 'mj.kim@domain.co.kr',
                    member_grade: 'Silver',
                    total_ltv: 890000,
                    avg_order_value: 148333,
                    order_count: 6,
                    last_visited_at: '2024.03.18',
                },
                {
                    customer_id: '3',
                    full_name: '이지은',
                    email_address: 'iu_love@naver.com',
                    member_grade: 'Gold',
                    total_ltv: 1670000,
                    avg_order_value: 208750,
                    order_count: 8,
                    last_visited_at: '2024.03.20',
                },
            ],
            pagination: {
                total_items: 1284,
                current_page: 1,
                page_size: 20,
            },
        };

        return CustomerMapper.toListResult(mockListData);
    }

    async getStats(): Promise<CustomerStats> {
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

        return CustomerMapper.toStatsDomain(mockStats);
    }
}

export const customerApi = new CustomerApi();
