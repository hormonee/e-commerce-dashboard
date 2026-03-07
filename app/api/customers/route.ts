import { NextResponse } from 'next/server';
import { CustomerListResponseDto, CustomerStatsResponseDto } from '@/src/features/customer/infrastructure/customer.dto';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const tab = searchParams.get('tab') || 'all';

    const items: CustomerListResponseDto['items'] = [
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
    ];

    return NextResponse.json({
        items,
        pagination: {
            total_items: 1284,
            current_page: 1,
            page_size: 20,
        },
    });
}
