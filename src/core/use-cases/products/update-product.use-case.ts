import { Result } from '../../lib/result';
import { ValueNotFoundError } from '@common/errors'

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

  public constructor(
    productsRepository: IProductsGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.productsRepository = productsRepository;
    this.presenter = presenter;
  }

  public async execute({
    id,
    productDetails
  }: IUpdateProductRequestModel): Promise<void> {
    try {
      const updatedProduct = await this.productsRepository.update(
        productDetails,
        { id }
      );

      if (updatedProduct === null) {
        throw new ValueNotFoundError(`productId '${id}' not found`);
      }

      this.presenter.execute(updatedProduct.toJSON());
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
