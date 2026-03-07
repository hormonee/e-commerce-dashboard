import { Customer, CustomerListResult, CustomerStats } from './entities/customer.entity';

export interface GetCustomersFilter {
    tab?: 'all' | 'new' | 'first' | 'repeat' | 'vip' | 'at_risk';
    search?: string;
    page?: number;
    limit?: number;
}

export interface CustomerRepository {
    getCustomers(filter: GetCustomersFilter): Promise<CustomerListResult>;
    getStats(): Promise<CustomerStats>;
}
