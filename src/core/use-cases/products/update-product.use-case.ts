import { Result } from '../../lib/result';
import { Product } from '../../entities';
import { ValueNotFoundError } from '@common/errors'
import { ProductMapper } from '../../mappers/product';
import IEntityMapper from '../../mappers/i-entity-mapper'
import { IProductDto } from '../../dtos/product'

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import {
  IProductsGateway,
  IUpdateProductRequestModel
} from '../interfaces';

export default class UpdateProductUseCase
  implements IUseCaseInputBoundary
{
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

  public async execute({
    id,
    productDetails
  }: IUpdateProductRequestModel): Promise<void> {
    try {
      const foundProduct = await this.productsRepository.findOne(id);

      if (foundProduct === null) {
        throw new ValueNotFoundError(`productId '${id}' not found`);
      }

      const modifiedProductDetails = Object.assign(
        foundProduct.toJSON(),
        productDetails
      );

      const modifiedProduct = Product.create(modifiedProductDetails, id);

      const updatedProduct = await this.productsRepository.update(
        modifiedProduct,
        { id }
      );

      const updatedProductDTO = this.dataMapper.toDTO(updatedProduct!);

      this.presenter.execute(updatedProductDTO);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
