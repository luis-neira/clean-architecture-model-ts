import { Result } from '../../lib/result';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IProductsGateway, IAddProductRequestModel } from '../interfaces';

export default class AddProductUseCase implements IUseCaseInputBoundary {
  private productsRepository: IProductsGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    productsRepository: IProductsGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.productsRepository = productsRepository;
    this.presenter = presenter;
  }

  async execute(requestModel: IAddProductRequestModel): Promise<void> {
    try {
      const product = await this.productsRepository.create(requestModel);

      await this.productsRepository.save(product);

      this.presenter.execute(product.toJSON());
    } catch (err) {
      throw Result.fail(err);
    }
  }
}
