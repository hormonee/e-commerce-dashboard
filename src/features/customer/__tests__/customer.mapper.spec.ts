import { describe, it, expect } from 'vitest';
import { CustomerMapper } from '../infrastructure/customer.mapper';
import { CustomerDto, CustomerListResponseDto } from '../infrastructure/customer.dto';

describe('CustomerMapper', () => {
    it('CustomerDto를 Customer 엔티티로 올바르게 변환해야 한다.', () => {
        const dto: CustomerDto = {
            customer_id: 'C1',
            full_name: '강하늘',
            email_address: 'sky@example.com',
            member_grade: 'VIP',
            total_ltv: 2450000,
            avg_order_value: 188461,
            order_count: 13,
            last_visited_at: '2024.03.14',
        };

        const entity = CustomerMapper.toDomain(dto);

        expect(entity.id).toBe(dto.customer_id);
        expect(entity.name).toBe(dto.full_name);
        expect(entity.grade).toBe(dto.member_grade);
    });

    it('CustomerListResponseDto를 CustomerListResult로 올바르게 변환해야 한다.', () => {
        const dto: CustomerListResponseDto = {
            items: [
                {
                    customer_id: 'C1',
                    full_name: '강하늘',
                    email_address: 'sky@example.com',
                    member_grade: 'VIP',
                    total_ltv: 2450000,
                    avg_order_value: 188461,
                    order_count: 13,
                    last_visited_at: '2024.03.14',
                }
            ],
            pagination: {
                total_items: 1284,
                current_page: 1,
                page_size: 20
            }
        };

        const result = CustomerMapper.toListResult(dto);

        expect(result.totalCount).toBe(1284);
        expect(result.customers[0].name).toBe('강하늘');
    });
});
