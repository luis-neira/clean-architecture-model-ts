import { Result } from '../../lib/result';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { IProductsGateway } from '../interfaces';

export default class GetProductsUseCase implements IUseCaseInputBoundary {
  private productsRepository: IProductsGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    productsRepository: IProductsGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.productsRepository = productsRepository;
    this.presenter = presenter;
  }

  public async execute(): Promise<void> {
    try {
      const foundProducts = await this.productsRepository.findAll();

      const foundProductDTOs = foundProducts.map((p) => p.toJSON());

      this.presenter.execute(foundProductDTOs);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
