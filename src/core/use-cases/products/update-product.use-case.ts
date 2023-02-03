import { Result } from '@core/lib/result';
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
      const foundProduct = await this.productsRepository.findOne(id);

      if (foundProduct === null) {
        throw new ValueNotFoundError(`productId '${id}' not found`);
      }

      const updatedProduct = this.productsRepository.update(foundProduct, productDetails);

      await this.productsRepository.save(updatedProduct);

      this.presenter.execute(updatedProduct.toJSON());
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
