import { IHttpRequestModel } from '../interfaces';

import { AddProductUseCase } from '../../../core/use-cases/products';
import { AddProductPresenter } from '../../../adapters/presenters/products';

import { IProductsGateway } from '../../../core/use-cases/interfaces';
import { IResponder } from '../interfaces';

export default class AddProductController {
  private productsRepository: IProductsGateway;
  private addProductPresenter: AddProductPresenter;

  public constructor(
    productsRepository: IProductsGateway,
    createdResponder: IResponder
  ) {
    this.productsRepository = productsRepository;
    this.addProductPresenter = new AddProductPresenter(createdResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const useCaseRequestModel = req.body;

    const addProductUseCase = new AddProductUseCase(
      this.productsRepository,
      this.addProductPresenter
    );

    await addProductUseCase.execute(useCaseRequestModel);
  }
}
