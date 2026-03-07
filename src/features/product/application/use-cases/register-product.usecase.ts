import { Product } from '../../domain/entities/product.entity';
import { IProductRepository } from '../../domain/product.repository';

export type RegisterProductCommand = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export class RegisterProductUseCase {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(command: RegisterProductCommand): Promise<Product> {
        // 1. 중복 SKU 체크
        const isExists = await this.productRepository.existsBySku(command.sku);
        if (isExists) {
            throw new Error('이미 존재하는 상품 코드(SKU)입니다.');
        }

        // 2. 상품 저장
        return await this.productRepository.saveProduct(command);
    }
}
