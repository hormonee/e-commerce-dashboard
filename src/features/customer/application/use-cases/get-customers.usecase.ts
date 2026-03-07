import { CustomerRepository, GetCustomersFilter } from '../../domain/customer.repository';
import { CustomerListResult } from '../../domain/entities/customer.entity';

export class GetCustomersUseCase {
    constructor(private readonly customerRepository: CustomerRepository) { }

    async execute(filter: GetCustomersFilter): Promise<CustomerListResult> {
        return this.customerRepository.getCustomers(filter);
    }
}
