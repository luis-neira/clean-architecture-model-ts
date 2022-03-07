import { Result } from '../../lib/result';
import { ValueNotFoundError } from '../../../common/errors';
import { ProductMap } from '../../../common/mappers';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IProductsGateway, IGetProductByIdRequestModel } from '../interfaces';

export default class GetProductByIdUseCase implements IUseCaseInputBoundary {
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
    requestModel: IGetProductByIdRequestModel
  ): Promise<void> {
    const { id } = requestModel;

    try {
      const foundProduct = await this.productsRepository.findOne(id);

      if (foundProduct === null) {
        throw Result.fail(
          new ValueNotFoundError(`Couldn't find product by id=${id}`)
        );
      }

      const foundProductDTO = ProductMap.toDTO(foundProduct);

      this.presenter.execute(foundProductDTO);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
