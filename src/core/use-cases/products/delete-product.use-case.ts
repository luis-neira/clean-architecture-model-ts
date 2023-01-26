import { Result } from '../../lib/result';
import { ValueNotFoundError } from '@common/errors';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IProductsGateway, IDeleteProductRequestModel } from '../interfaces';

export default class DeleteProductUseCase implements IUseCaseInputBoundary {
  private productsRepository: IProductsGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    productsRepository: IProductsGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.productsRepository = productsRepository;
    this.presenter = presenter;
  }

  public async execute(
    requestModel: IDeleteProductRequestModel
  ): Promise<void> {
    const { id } = requestModel;

    try {
      const productIsDeleted = await this.productsRepository.delete(id);

      if (productIsDeleted === null) {
        throw Result.fail(
          new ValueNotFoundError(`Couldn't find product by id=${id}`)
        );
      }

      this.presenter.execute();
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
