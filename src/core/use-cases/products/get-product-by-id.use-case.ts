import { Result } from '../../lib/result';
import { ValueNotFoundError } from '@common/errors';
import { Product } from '../../entities';
import { ProductMapper } from '../../mappers/product';
import IEntityMapper from '../../mappers/i-entity-mapper'
import { IProductDto } from '../../dtos/product'

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IProductsGateway, IGetProductByIdRequestModel } from '../interfaces';

export default class GetProductByIdUseCase implements IUseCaseInputBoundary {
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

  public async execute({ id }: IGetProductByIdRequestModel
  ): Promise<void> {
    try {
      const foundProduct = await this.productsRepository.findOne(id);

      if (foundProduct === null) {
        throw Result.fail(
          new ValueNotFoundError(`Couldn't find product by id=${id}`)
        );
      }

      const foundProductDto = this.dataMapper.toDTO(foundProduct)

      this.presenter.execute(foundProductDto);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
