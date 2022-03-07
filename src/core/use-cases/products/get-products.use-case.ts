import { Result } from '../../lib/result';
import { ProductMap } from '../../../common/mappers';

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
      const foundProducts = await this.productsRepository.find();

      const foundProductDTOs = foundProducts.map((p) => ProductMap.toDTO(p));

      this.presenter.execute(foundProductDTOs);
    } catch (err: any) {
      if (err.isFailure) throw err;

      throw Result.fail(err);
    }
  }
}
