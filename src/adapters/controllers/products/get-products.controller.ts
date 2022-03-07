import { IHttpRequestModel } from '../interfaces';

import { GetProductsUseCase } from '../../../core/use-cases/products';
import { GetProductsPresenter } from '../../../adapters/presenters/products';

import { IProductsGateway } from '../../../core/use-cases/interfaces';
import { IResponder } from '../interfaces';

export default class GetProductsController {
  private productsRepository: IProductsGateway;
  private getProductsPresenter: GetProductsPresenter;

  public constructor(
    productsRepository: IProductsGateway,
    okResponder: IResponder
  ) {
    this.productsRepository = productsRepository;
    this.getProductsPresenter = new GetProductsPresenter(okResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const getProductsUseCase = new GetProductsUseCase(
      this.productsRepository,
      this.getProductsPresenter
    );

    await getProductsUseCase.execute();
  }
}
