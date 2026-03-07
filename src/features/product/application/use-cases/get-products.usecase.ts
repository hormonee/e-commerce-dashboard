import { IProductRepository } from "../../domain/product.repository";
import { ProductFilter } from "../../domain/entities/product.entity";
import { GetProductsResponseDto } from "../dtos/get-products.dto";

export class GetProductsUseCase {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(filter: ProductFilter): Promise<GetProductsResponseDto> {
        return this.productRepository.getProducts(filter);
    }
}
