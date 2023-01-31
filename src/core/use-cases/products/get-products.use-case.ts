import { Result } from '../../lib/result';
import { Product } from '../../entities';
import { ProductMapper } from '../../mappers/product';
import IEntityMapper from '../../mappers/i-entity-mapper'
import { IProductDto } from '../../dtos/product'

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IProductsGateway } from '../interfaces';

export default class GetProductsUseCase implements IUseCaseInputBoundary {
  private productsRepository: IProductsGateway;
  private presenter: IUseCaseOutputBoundary;
  private dataMapper: IEntityMapper<Product, IProductDto>;

  public constructor(
    productsRepository: IProductsGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.productsRepository = productsRepository;
    this.presenter = presenter;
    this.dataMapper = new ProductMapper();
  }

  public async execute(): Promise<void> {
    try {
      const foundProducts = await this.productsRepository.findAll();

      const foundProductDTOs = foundProducts.map((p) => this.dataMapper.toDTO(p));

      this.presenter.execute(foundProductDTOs);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
